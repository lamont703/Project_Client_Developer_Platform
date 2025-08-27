const express = require('express');
const router = express.Router();
const oauthController = require('../controllers/oauthController');

// Load environment variables
require('dotenv').config();

// OAuth callback route
router.get('/oauth/callback', oauthController.handleOAuthCallback);

module.exports = router; 