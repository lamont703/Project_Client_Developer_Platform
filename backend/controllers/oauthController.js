const axios = require('axios');
const { saveTokensToDatabase } = require('../db');
const qs = require('qs');
require('dotenv').config();

// Controller function to handle OAuth callback
exports.handleOAuthCallback = async (req, res) => {
    const { code } = req.query;
    if (!code) {
        return res.status(400).send('Authorization code is missing');
    }

    try {
        // Exchange authorization code for access token
        const response = await axios.post('https://services.leadconnectorhq.com/oauth/token', qs.stringify({
            client_id: process.env.GHL_CLIENT_ID,
            client_secret: process.env.GHL_CLIENT_SECRET,
            redirect_uri: process.env.GHL_REDIRECT_URI,
            code,
            grant_type: 'authorization_code'
        }), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        const { access_token, refresh_token, expires_in } = response.data;

        // Save tokens to database
        await saveTokensToDatabase(process.env.GHL_LOCATION_ID, access_token, refresh_token, expires_in);

        res.send('OAuth flow completed successfully');
    } catch (error) {
        console.error('Error during OAuth token exchange:', error);
        res.status(500).send('Failed to exchange authorization code for tokens');
    }
}; 