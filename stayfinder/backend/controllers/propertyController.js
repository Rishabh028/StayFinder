// backend/controllers/propertyController.js
const Property = require('../models/Property');
const User = require('../models/User'); // Needed to update user's wishlist

// @desc    Get all properties
// @route   GET /api/properties
// @access  Public
const getAllProperties = async (req, res) => {
    try {
        // Implement filtering logic based on req.query
        const { location, propertyTypes, amenities, rating, minPrice, maxPrice, guests } = req.query;
        let query = {};

        if (location && location !== 'Anywhere') {
            query.location = location;
        }

        if (propertyTypes) {
            const typesArray = Array.isArray(propertyTypes) ? propertyTypes : propertyTypes.split(',');
            query.type = { $in: typesArray };
        }

        if (amenities) {
            const amenitiesArray = Array.isArray(amenities) ? amenities : amenities.split(',');
            query.amenities = { $all: amenitiesArray };
        }

        if (rating) {
            const minRating = parseFloat(rating);
            if (minRating === 5) {
                query.rating = { $gte: 4.8 };
            } else if (minRating === 4) {
                query.rating = { $gte: 4.0 };
            } else if (minRating === 3) {
                query.rating = { $gte: 3.0 };
            } else {
                query.rating = { $gte: minRating };
            }
        }

        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = parseFloat(minPrice);
            if (maxPrice) query.price.$lte = parseFloat(maxPrice);
        }

        if (guests) {
            query['specs.maxGuests'] = { $gte: parseInt(guests) };
        }

        const properties = await Property.find(query);
        res.json(properties);
    } catch (error) {
        console.error('Error fetching properties:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Get single property by ID
// @route   GET /api/properties/:id
// @access  Public
const getPropertyById = async (req, res) => {
    try {
        // Assuming property IDs are numeric as per front-end sample data
        const propertyId = parseInt(req.params.id);
        const property = await Property.findOne({ id: propertyId }); // Find by 'id' field
        if (!property) {
            return res.status(404).json({ message: 'Property not found' });
        }
        res.json(property);
    } catch (error) {
        console.error('Error fetching property by ID:', error.message);
        if (error.name === 'CastError') { // This might still occur if req.params.id is not a valid number
            return res.status(400).json({ message: 'Invalid property ID' });
        }
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Add a review to a property
// @route   POST /api/properties/:id/review
// @access  Private
const addReview = async (req, res) => {
    const { rating, text } = req.body;
    const propertyId = parseInt(req.params.id); // Parse to integer
    const userId = req.user._id;
    const userName = req.user.name;

    if (!rating || !text) {
        return res.status(400).json({ message: 'Please provide rating and text for the review' });
    }

    try {
        // Ensure 'property' is declared only once here
        const property = await Property.findOne({ id: propertyId }); // Find by 'id' field
        if (!property) {
            return res.status(404).json({ message: 'Property not found' });
        }

        const alreadyReviewed = property.userReviews.find(
            (r) => r.userId && r.userId.toString() === userId.toString()
        );

        if (alreadyReviewed) {
            return res.status(400).json({ message: 'You have already reviewed this property' });
        }

        const review = {
            userId,
            userName,
            rating: Number(rating),
            text,
            date: new Date(),
        };

        property.userReviews.unshift(review);
        // Assuming property has an updateAverageRating method or similar logic
        // If not, you might need to implement it here or in the model
        // property.updateAverageRating(); // Uncomment if this method exists in your Property model

        await property.save();

        const user = await User.findById(userId);
        if (user) {
            user.reviews.unshift({
                propertyId: property.id, // Use numeric ID
                rating: Number(rating),
                text,
                date: new Date(),
            });
            await user.save();
        }

        res.status(201).json({ message: 'Review added successfully', property });
    } catch (error) {
        console.error('Error adding review:', error.message);
        if (error.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid property ID' });
        }
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Toggle property in user's wishlist
// @route   POST /api/properties/:id/wishlist
// @access  Private
const toggleWishlist = async (req, res) => {
    const propertyId = parseInt(req.params.id); // Parse to integer
    const userId = req.user._id;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Ensure 'property' is declared only once here
        const property = await Property.findOne({ id: propertyId }); // Find by 'id' field
        if (!property) {
            return res.status(404).json({ message: 'Property not found' });
        }

        const propertyIdString = property.id.toString(); // Use the property's numeric ID as string
        const index = user.wishlist.findIndex(id => id.toString() === propertyIdString);

        if (index > -1) {
            user.wishlist.splice(index, 1);
            await user.save();
            res.json({ message: 'Property removed from wishlist', wishlist: user.wishlist });
        } else {
            user.wishlist.push(property.id); // Push the numeric ID
            await user.save();
            res.json({ message: 'Property added to wishlist', wishlist: user.wishlist });
        }
    } catch (error) {
        console.error('Error toggling wishlist:', error.message);
        if (error.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid property ID or User ID' });
        }
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    getAllProperties,
    getPropertyById,
    addReview,
    toggleWishlist
};
