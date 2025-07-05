// Imports
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const logger = require('./customLogger');

// Load environment variables
require('dotenv').config();

// Import database connection
const connectDB = require('./config/db');

// Import routes
const postRouter = require('./routes/postRoute');
const userRouter = require('./routes/authRoute');
const categoryRouter = require('./routes/categoryRoute');

const PORT = process.env.PORT || 5000;

// Initializa app
const app = express();

app.use(cors()); // Establish communicatuion with frontend(client)
app.use(express.json()); // Pass json bodies
app.use(logger); // Logging
app.use(helmet()); // Security add-ons

// Routes
app.use('/api/user', userRouter);
app.use('/api/post', postRouter);
app.use('/api/category', categoryRouter);

// Database connection
connectDB()
.then(() => {
    // Listen to server
    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`)
    })
}

).catch((err) => {
    console.error('Error: ', err);
    process.exit(1);
})

