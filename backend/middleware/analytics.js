const logger = require('../config/logger');
const ua = require('universal-analytics');

// Google Analytics property ID
const visitor = ua('502445924');

// Middleware to log requests and analytics events
function analyticsMiddleware(req, res, next) {
    const event = req.headers['x-analytics-event'];
    if (event) {
        logger.info(`Analytics Event: ${event}`, {
            path: req.path,
            method: req.method,
            userAgent: req.headers['user-agent'],
        });

        // Send event to Google Analytics
        visitor.event("Backend", event, req.path).send();
    }
    next();
}

module.exports = analyticsMiddleware; 