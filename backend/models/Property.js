// backend/models/Property.js
const mongoose = require('mongoose');

const PropertySchema = new mongoose.Schema({
    // Frontend's 'id' will map to MongoDB's default '_id'
    title: {
        type: String,
        required: true,
        trim: true
    },
    location: {
        type: String,
        required: true,
        trim: true
    },
    type: {
        type: String,
        required: true,
        enum: ['apartment', 'hotel', 'villa', 'studio'] // Based on frontend filters
    },
    price: { // This seems to be the total price for 'nights'
        type: Number,
        required: true
    },
    basePrice: { // Price per night
        type: Number,
        required: true
    },
    nights: { // Number of nights used in frontend sample data for price calculation
        type: Number,
        default: 1
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0
    },
    reviews: { // Count of reviews (could be initial system reviews)
        type: Number,
        default: 0
    },
    images: [
        {
            type: String // URLs to images
        }
    ],
    description: {
        type: String,
        required: true
    },
    host: {
        name: String,
        since: String, // Year
        avatar: String // Initials
    },
    coordinates: { // [latitude, longitude]
        type: [Number],
        required: true
    },
    amenities: [
        {
            type: String // e.g., "WiFi", "Pool", "Gym"
        }
    ],
    specs: {
        bedrooms: Number,
        beds: Number,
        baths: Number,
        maxGuests: Number
    },
    fees: {
        cleaning: {
            type: Number,
            default: 0
        },
        service: {
            type: Number,
            default: 0
        }
    },
    userReviews: [ // Reviews submitted by users
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            userName: String,
            rating: Number,
            text: String,
            date: {
                type: Date,
                default: Date.now
            }
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Method to update average rating
PropertySchema.methods.updateAverageRating = function() {
    if (this.userReviews.length === 0) {
        this.rating = 0;
        this.reviews = 0; // If no user reviews, reset count
        return;
    }

    const totalRatingSum = this.userReviews.reduce((sum, r) => sum + r.rating, 0);
    const totalReviewCount = this.userReviews.length;

    // Assuming 'reviews' and 'rating' fields are for initial/seed data.
    // If they represent all reviews, then this calculation needs to be adjusted
    // to include previous reviews. For simplicity, we'll assume 'userReviews'
    // is the primary source for dynamic rating calculation here.
    this.rating = parseFloat((totalRatingSum / totalReviewCount).toFixed(2));
    this.reviews = totalReviewCount; // Update total review count
};


module.exports = mongoose.model('Property', PropertySchema);
