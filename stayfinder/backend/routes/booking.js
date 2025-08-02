const express = require('express');
const { createBooking, getUserBookings } = require('../controllers/bookingController');
const router = express.Router();

router.post('/', createBooking);
router.get('/:userId', getUserBookings);

module.exports = router;
