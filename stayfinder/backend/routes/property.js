const express = require('express');
const router = express.Router();
const { getAllProperties, getPropertyById, addReview, toggleWishlist } = require('../controllers/propertyController');
const { protect } = require('../middleware/auth');

router.get('/', getAllProperties);
router.get('/:id', getPropertyById);
router.post('/:id/review', protect, addReview); // This is the line causing the error in your trace
router.post('/:id/wishlist', protect, toggleWishlist);

module.exports = router;