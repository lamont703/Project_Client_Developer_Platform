require('dotenv').config();

const express = require('express');
const cors = require('cors');
const jobRoutes = require('./routes/jobRoutes');
const analyticsMiddleware = require('./middleware/analytics');
const logger = require('./config/logger');
const oauthRoutes = require('./routes/oauthRoutes');
const webhookRoutes = require('./routes/webhookRoutes');
const tokenRoutes = require('./routes/tokenRoutes');
const opportunityRoutes = require('./routes/opportunityRoutes');

const app = express();
const port = 3001;

// Allow all origins temporarily
app.use(cors());

// Middleware to parse JSON requests
app.use(express.json());

// Use analytics middleware
app.use(analyticsMiddleware);

// Use OAuth routes.
app.use('/api', oauthRoutes);

// Use job routes. This is being requested from our Post Job Wizard component. This route saves jobs to the database and then creates the opportunity in GoHighLevel and sends it to GitHub Repo and Pages. Once the project is added to the opportunity pipeline, the webhook is triggered and the opportunity is updated in the database under ghl_opportunities.
app.use('/api/jobs', jobRoutes);

// Use opportunity routes. This is being requested from our Job Listing page component. This route gets the opportunities from the database and sends them to the frontend.
app.use('/api/opportunities', opportunityRoutes);

// Use webhook routes for GoHighLevel. This is being requested directly in our GoHighLevel account automation.
app.use('/api/webhooks', webhookRoutes);

// Use token management routes. This is used to get the access token for the GoHighLevel API. It does not have any frontend requests.
app.use('/api/tokens', tokenRoutes);

// Start the server
app.listen(port, () => {
    logger.info(`Server is running on http://localhost:${port}`);
}); 