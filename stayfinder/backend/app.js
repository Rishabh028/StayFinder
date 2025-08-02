// backend/app.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors'); // Import cors

// Load environment variables from .env file
dotenv.config();

const app = express();

// Middleware
app.use(cors({ origin: ['https://zippy-gumdrop-c1bd83.netlify.app'] })); // Enable CORS for all routes
app.use(express.json()); // Body parser for JSON requests

// Database Connection
const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI)
    .then(() => console.log('MongoDB connected successfully!'))
    .catch(err => console.error('MongoDB connection error:', err));

// Import Routes
const authRoutes = require('./routes/auth');
const bookingRoutes = require('./routes/booking');

// Use Routes
app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);

// Basic route for testing
app.get('/', (req, res) => {
    res.send('StayFinder Backend API is running!');
});

// Error handling middleware (optional, but good practice)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
