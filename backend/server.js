require('dotenv').config();

const express = require('express');
const cors = require('cors');
const jobRoutes = require('./routes/jobRoutes');
const analyticsMiddleware = require('./middleware/analytics');
const logger = require('./config/logger');
const oauthRoutes = require('./routes/oauthRoutes');

const app = express();
const port = 3001;

// Allow all origins temporarily
app.use(cors());

// Middleware to parse JSON requests
app.use(express.json());

// Use analytics middleware
app.use(analyticsMiddleware);

// Use job routes
app.use('/api/jobs', jobRoutes);

// Use OAuth routes
app.use('/api', oauthRoutes);

// Start the server
app.listen(port, () => {
    logger.info(`Server is running on http://localhost:${port}`);
}); 