require('dotenv').config();

const axios = require('axios');
const qs = require('qs'); // Import qs to format the request body

// Base URL for GoHighLevel API
const BASE_URL = 'https://api.leadconnectorhq.com';

// Function to send data to GoHighLevel
async function sendDataToGoHighLevel(data) {
    try {
        const response = await axios.post(`${BASE_URL}/your-endpoint`, data, {
            headers: {
                'Authorization': `Bearer ${process.env.GHL_API_KEY}`, // Use environment variable for API key
                'Content-Type': 'application/json'
            }
        });
        console.log('Data sent successfully:', response.data);
    } catch (error) {
        console.error('Error sending data to GoHighLevel:', error);
    }
}

// Function to exchange authorization code for tokens
async function exchangeCodeForTokens(code) {
    try {
        const response = await axios.post('https://services.leadconnectorhq.com/oauth/token', qs.stringify({
            client_id: process.env.GHL_CLIENT_ID,
            client_secret: process.env.GHL_CLIENT_SECRET,
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: process.env.GHL_REDIRECT_URI
        }), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error exchanging code for tokens:', error.response.data);
        throw error;
    }
}

module.exports = {
    sendDataToGoHighLevel,
    exchangeCodeForTokens
}; 