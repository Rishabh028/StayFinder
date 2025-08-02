// backend/controllers/bookingController.js
const Booking = require('../models/Booking');
const User = require('../models/User');
const Property = require('../models/Property');

// @desc    Create a new booking
// @route   POST /api/bookings
// @access  Private
const createBooking = async (req, res) => {
    const { propertyId, checkin, checkout, guests, nights, totalPrice } = req.body;
    const userId = req.user._id; // From auth middleware

    if (!propertyId || !checkin || !checkout || !guests || !nights || !totalPrice) {
        return res.status(400).json({ message: 'Please provide all booking details' });
    }

    try {
        const property = await Property.findById(propertyId);
        if (!property) {
            return res.status(404).json({ message: 'Property not found' });
        }

        // Create the booking
        const booking = await Booking.create({
            userId,
            propertyId,
            propertyTitle: property.title,
            propertyImage: property.images[0], // Use the first image for the booking record
            checkin: new Date(checkin),
            checkout: new Date(checkout),
            guests,
            nights,
            totalPrice,
        });

        // Add booking to user's profile
        const user = await User.findById(userId);
        if (user) {
            user.bookings.unshift({ // Add to the beginning of the array
                propertyId: booking.propertyId,
                propertyTitle: booking.propertyTitle,
                propertyImage: booking.propertyImage,
                checkin: booking.checkin,
                checkout: booking.checkout,
                guests: booking.guests,
                nights: booking.nights,
                totalPrice: booking.totalPrice,
                bookingDate: booking.bookingDate,
                status: booking.status
            });
            await user.save();
        }

        res.status(201).json({ message: 'Booking created successfully', booking });
    } catch (error) {
        console.error('Error creating booking:', error.message);
        if (error.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid property ID' });
        }
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Get bookings for the logged-in user
// @route   GET /api/bookings/user
// @access  Private
const getUserBookings = async (req, res) => {
    try {
        // Fetch bookings directly from the Booking collection
        const bookings = await Booking.find({ userId: req.user._id }).sort({ bookingDate: -1 });

        res.json(bookings);
    } catch (error) {
        console.error('Error fetching user bookings:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    createBooking,
    getUserBookings
};
