require('dotenv').config();

const axios = require('axios');
const qs = require('qs'); // Import qs to format the request body

// Base URL for GoHighLevel API
const BASE_URL = 'https://services.leadconnectorhq.com';

// Token management
let currentAccessToken = process.env.GHL_ACCESS_TOKEN;
let currentRefreshToken = process.env.GHL_REFRESH_TOKEN;
let tokenExpiryTime = null;

// Function to decode JWT and get expiration time
function getTokenExpiry(token) {
    try {
        const payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
        return payload.exp * 1000; // Convert to milliseconds
    } catch (error) {
        console.error('Error decoding token:', error);
        return null;
    }
}

// Function to check if token is expired or will expire soon (within 5 minutes)
function isTokenExpired(token) {
    if (!token) return true;
    
    const expiry = getTokenExpiry(token);
    if (!expiry) return true;
    
    // Consider token expired if it expires within 5 minutes
    const bufferTime = 5 * 60 * 1000; // 5 minutes in milliseconds
    return Date.now() + bufferTime >= expiry;
}

// Function to refresh the access token
async function refreshAccessToken() {
    try {
        console.log('Refreshing access token...');
        
        const response = await axios.post('https://services.leadconnectorhq.com/oauth/token', qs.stringify({
            client_id: process.env.GHL_CLIENT_ID,
            client_secret: process.env.GHL_CLIENT_SECRET,
            grant_type: 'refresh_token',
            refresh_token: currentRefreshToken
        }), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
            }
        });

        const { access_token, refresh_token, expires_in } = response.data;
        
        // Update tokens
        currentAccessToken = access_token;
        if (refresh_token) {
            currentRefreshToken = refresh_token;
        }
        
        // Calculate expiry time
        tokenExpiryTime = Date.now() + (expires_in * 1000);
        
        console.log('Token refreshed successfully');
        return access_token;
        
    } catch (error) {
        console.error('Error refreshing token:', error.response?.data || error.message);
        throw new Error('Failed to refresh access token');
    }
}

// Function to get a valid access token (refreshes if needed)
async function getValidAccessToken() {
    if (isTokenExpired(currentAccessToken)) {
        console.log('Token expired, refreshing...');
        await refreshAccessToken();
    }
    return currentAccessToken;
}

// Function to send data to GoHighLevel
async function sendDataToGoHighLevel(data) {
    try {
        const token = await getValidAccessToken();
        const response = await axios.post(`${BASE_URL}/your-endpoint`, data, {
            headers: {
                'Authorization': `Bearer ${token}`,
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

        const { access_token, refresh_token, expires_in } = response.data;
        
        // Update tokens
        currentAccessToken = access_token;
        if (refresh_token) {
            currentRefreshToken = refresh_token;
        }
        tokenExpiryTime = Date.now() + (expires_in * 1000);

        return response.data;
    } catch (error) {
        console.error('Error exchanging code for tokens:', error.response?.data);
        throw error;
    }
}

// Function to create an opportunity in the pipeline
async function createOpportunityInPipeline(jobData) {
    // First, let's get the pipeline stage name
    let pipelineStageName = "New Lead"; // Default name
    
    try {
        const token = await getValidAccessToken();
        
        // Fetch pipeline stage details to get the name
        const stageResponse = await axios.get(`${BASE_URL}/pipelines/${process.env.GHL_PIPELINE_ID}/stages/${process.env.GHL_PIPELINE_STAGE_ID}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Version': '2021-07-28',
                'Authorization': `Bearer ${token}`
            }
        });
        
        if (stageResponse.data && stageResponse.data.name) {
            pipelineStageName = stageResponse.data.name;
        }
    } catch (error) {
        console.log('Could not fetch pipeline stage name, using default:', error.message);
    }

    const opportunityData = {
        pipelineId: process.env.GHL_PIPELINE_ID,
        locationId: process.env.GHL_LOCATION_ID,
        name: jobData.title || jobData.name,
        pipelineStageId: process.env.GHL_PIPELINE_STAGE_ID,
        pipelineStageName: pipelineStageName, // Include the stage name
        status: "open",
        contactId: "X9BZelkJiMRBoBfQ2exx", // You might want to make this dynamic
        monetaryValue: jobData.salary || jobData.monetary_value || 0,
        assignedTo: ""
    };

    try {
        // Get a valid token before making the request
        const token = await getValidAccessToken();
        
        const response = await axios.post(`${BASE_URL}/opportunities/`, opportunityData, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Version': '2021-07-28',
                'Authorization': `Bearer ${token}`
            },
            maxBodyLength: Infinity
        });
        console.log('Opportunity created successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error creating opportunity in pipeline:', error);
        throw error;
    }
}

// Function to get current token status
function getTokenStatus() {
    return {
        hasToken: !!currentAccessToken,
        isExpired: isTokenExpired(currentAccessToken),
        expiresAt: tokenExpiryTime ? new Date(tokenExpiryTime).toISOString() : null,
        timeUntilExpiry: tokenExpiryTime ? Math.max(0, tokenExpiryTime - Date.now()) : null
    };
}

module.exports = {
    sendDataToGoHighLevel,
    exchangeCodeForTokens,
    createOpportunityInPipeline,
    getValidAccessToken,
    getTokenStatus,
    refreshAccessToken
}; 