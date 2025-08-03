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
            // Ensure propertyTypes is an array before using $in
            const typesArray = Array.isArray(propertyTypes) ? propertyTypes : propertyTypes.split(',');
            query.type = { $in: typesArray };
        }

        if (amenities) {
            // Find properties that have ALL specified amenities
            const amenitiesArray = Array.isArray(amenities) ? amenities : amenities.split(',');
            query.amenities = { $all: amenitiesArray };
        }

        if (rating) {
            // Convert rating string to number and apply logic similar to frontend
            const minRating = parseFloat(rating);
            if (minRating === 5) {
                query.rating = { $gte: 4.8 };
            } else if (minRating === 4) {
                query.rating = { $gte: 4.0 };
            } else if (minRating === 3) {
                query.rating = { $gte: 3.0 };
            } else {
                // If a specific rating is passed, ensure it's handled
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
        const property = await Property.findById(req.params.id);
        if (!property) {
            return res.status(404).json({ message: 'Property not found' });
        }
        res.json(property);
    } catch (error) {
        console.error('Error fetching property by ID:', error.message);
        // Handle CastError for invalid ObjectId
        if (error.name === 'CastError') {
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
    const propertyId = req.params.id;
    const userId = req.user._id; // From auth middleware
    const userName = req.user.name; // From auth middleware

    if (!rating || !text) {
        return res.status(400).json({ message: 'Please provide rating and text for the review' });
    }

    try {
        const property = await Property.findById(propertyId);
        if (!property) {
            return res.status(404).json({ message: 'Property not found' });
        }

        // Check if user has already reviewed this property (optional, but good practice)
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

        property.userReviews.unshift(review); // Add to the beginning
        property.updateAverageRating(); // Recalculate average rating

        await property.save();

        // Also add review to user's profile (optional, for user history)
        const user = await User.findById(userId);
        if (user) {
            user.reviews.unshift({
                propertyId: property._id,
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
        // Find property by its numeric ID field, not _id
        const property = await Property.findOne({ id: propertyId });
        if (!property) {
            return res.status(404).json({ message: 'Property not found' });
        }

        const property = await Property.findById(propertyId);
        if (!property) {
            return res.status(404).json({ message: 'Property not found' });
        }

        // Convert propertyId to string for comparison in array
        const propertyIdString = propertyId.toString();
        const index = user.wishlist.findIndex(id => id.toString() === propertyIdString);

        if (index > -1) {
            // Property is in wishlist, remove it
            user.wishlist.splice(index, 1);
            await user.save();
            res.json({ message: 'Property removed from wishlist', wishlist: user.wishlist });
        } else {
            // Property is not in wishlist, add it
            user.wishlist.push(propertyId);
            await user.save();
            res.json({ message: 'Property added to wishlist', wishlist: user.wishlist });
        }
   } catch (error) {
        console.error('Error toggling wishlist:', error.message);
        if (error.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid property ID' });
        }
        res.status(500).json({ message: 'Server error' });
    }
};

// Console log to verify function type before export
console.log('propertyController.js: typeof addReview before export:', typeof addReview);

module.exports = {
    getAllProperties,
    getPropertyById,
    addReview,
    toggleWishlist
};
