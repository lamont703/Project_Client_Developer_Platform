const express = require('express');
const axios = require('axios');
const router = express.Router();
const { saveTokensToDatabase } = require('../db');

// Load environment variables
require('dotenv').config();

// OAuth callback route
router.get('/oauth/callback', async (req, res) => {
    const { code } = req.query;
    if (!code) {
        return res.status(400).send('Authorization code is missing');
    }

    try {
        // Exchange authorization code for access token
        const response = await axios.post('https://api.gohighlevel.com/v1/oauth/token', {
            client_id: process.env.GHL_CLIENT_ID,
            client_secret: process.env.GHL_CLIENT_SECRET,
            redirect_uri: process.env.GHL_REDIRECT_URI,
            code,
            grant_type: 'authorization_code'
        });

        const { access_token, refresh_token, expires_in } = response.data;

        // Save tokens to database
        await saveTokensToDatabase('location_id_placeholder', access_token, refresh_token, expires_in);

        res.send('OAuth flow completed successfully');
    } catch (error) {
        console.error('Error during OAuth token exchange:', error);
        res.status(500).send('Failed to exchange authorization code for tokens');
    }
});

module.exports = router; 