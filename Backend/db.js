// Initialize Mongoose
const mongoose = require('mongoose');

// Database URL Initialization
const mongoURI = "mongodb://localhost:27017/inotebook"

// Connect Database URL with Mongoose
const connectToMongo = () => {
    mongoose.connect(mongoURI)
}

// Global Export to make connectToMongo Function Avaiable Everwhere.
module.exports = connectToMongo;