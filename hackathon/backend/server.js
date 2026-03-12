require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

// Debug: Log environment setup
console.log('[DEBUG] GEMINI_API_KEY loaded:', process.env.GEMINI_API_KEY ? 'YES' : 'NO');
console.log('[DEBUG] MONGO_URI loaded:', process.env.MONGO_URI ? 'YES' : 'NO');

// Middleware with increased timeout for PDF uploads
app.use(cors());
app.use(express.json({ timeout: 120000 })); // 2 minutes
app.use(express.urlencoded({ extended: true, timeout: 120000 })); // 2 minutes

// Set request timeout
app.use((req, res, next) => {
    req.setTimeout(300000); // 5 minutes for PDF processing
    res.setTimeout(300000);
    next();
});

// Database connection
if (process.env.MONGO_URI && process.env.MONGO_URI !== 'your_mongodb_cluster_uri_here') {
    mongoose.connect(process.env.MONGO_URI)
        .then(() => console.log('MongoDB connected successfully'))
        .catch(err => console.error('MongoDB connection error:', err));
} else {
    console.warn('MongoDB URI not provided in .env. Skipping database connection for now.');
}

// Routes
app.use('/api', require('./routes/api'));

// Health check route
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Niti-Setu API is running' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
