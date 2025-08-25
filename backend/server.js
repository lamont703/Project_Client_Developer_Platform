const express = require('express');
const cors = require('cors');
const jobRoutes = require('./routes/jobRoutes');
const analyticsMiddleware = require('./middleware/analytics');
const logger = require('./config/logger');

const app = express();
const port = 3001;

const corsOptions = {
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204
};

// Enable CORS for all routes with specific options
app.use(cors(corsOptions));

// Middleware to parse JSON requests
app.use(express.json());

// Use analytics middleware
app.use(analyticsMiddleware);

// Use job routes
app.use('/api/jobs', jobRoutes);

// Start the server
app.listen(port, () => {
    logger.info(`Server is running on http://localhost:${port}`);
}); 