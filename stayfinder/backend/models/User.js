// backend/models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    phone: {
        type: String,
        trim: true,
        default: ''
    },
    address: {
        type: String,
        trim: true,
        default: ''
    },
    bookings: [
        {
            propertyId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Property'
            },
            propertyTitle: String,
            propertyImage: String,
            checkin: Date,
            checkout: Date,
            guests: Number,
            nights: Number,
            totalPrice: Number,
            bookingDate: {
                type: Date,
                default: Date.now
            },
            status: {
                type: String,
                enum: ['pending', 'confirmed', 'cancelled', 'completed'],
                default: 'confirmed'
            }
        }
    ],
    wishlist: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Property'
        }
    ],
    reviews: [
        {
            propertyId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Property'
            },
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

// Hash password before saving the user
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Method to compare passwords
UserSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);
