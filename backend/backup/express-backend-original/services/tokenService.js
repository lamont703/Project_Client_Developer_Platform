const axios = require('axios');
const qs = require('qs');

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

// Centralized TokenService class
class TokenService {
    /**
     * Get a valid access token (refreshes if needed)
     * @returns {Promise<string>} Valid access token
     */
    static async getToken() {
        return await getValidAccessToken();
    }
    
    /**
     * Manually refresh the access token
     * @returns {Promise<string>} New access token
     */
    static async refreshToken() {
        return await refreshAccessToken();
    }
    
    /**
     * Make an authenticated request to GoHighLevel API with automatic token refresh
     * @param {string} url - Full URL or endpoint path
     * @param {Object} options - Axios request options
     * @returns {Promise<Object>} Axios response
     */
    static async makeAuthenticatedRequest(url, options = {}) {
        try {
            const token = await this.getToken();
            
            // Ensure URL is complete
            const fullUrl = url.startsWith('http') ? url : `${BASE_URL}${url}`;
            
            const response = await axios({
                ...options,
                url: fullUrl,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Version': '2021-07-28',
                    'Authorization': `Bearer ${token}`,
                    ...options.headers
                }
            });
            
            return response;
        } catch (error) {
            console.error('Error in authenticated request:', error.message);
            throw error;
        }
    }
    
    /**
     * Make a GET request to GoHighLevel API
     * @param {string} endpoint - API endpoint (e.g., '/opportunities/')
     * @param {Object} params - Query parameters
     * @returns {Promise<Object>} Response data
     */
    static async get(endpoint, params = {}) {
        try {
            const response = await this.makeAuthenticatedRequest(endpoint, {
                method: 'GET',
                params
            });
            return response.data;
        } catch (error) {
            console.error(`Error in GET request to ${endpoint}:`, error.message);
            throw error;
        }
    }
    
    /**
     * Make a POST request to GoHighLevel API
     * @param {string} endpoint - API endpoint (e.g., '/opportunities/')
     * @param {Object} data - Request body data
     * @returns {Promise<Object>} Response data
     */
    static async post(endpoint, data = {}) {
        try {
            const response = await this.makeAuthenticatedRequest(endpoint, {
                method: 'POST',
                data
            });
            return response.data;
        } catch (error) {
            console.error(`Error in POST request to ${endpoint}:`, error.message);
            throw error;
        }
    }
    
    /**
     * Make a PUT request to GoHighLevel API
     * @param {string} endpoint - API endpoint (e.g., '/opportunities/{id}')
     * @param {Object} data - Request body data
     * @returns {Promise<Object>} Response data
     */
    static async put(endpoint, data = {}) {
        try {
            const response = await this.makeAuthenticatedRequest(endpoint, {
                method: 'PUT',
                data
            });
            return response.data;
        } catch (error) {
            console.error(`Error in PUT request to ${endpoint}:`, error.message);
            throw error;
        }
    }
    
    /**
     * Make a DELETE request to GoHighLevel API
     * @param {string} endpoint - API endpoint (e.g., '/opportunities/{id}')
     * @returns {Promise<Object>} Response data
     */
    static async delete(endpoint) {
        try {
            const response = await this.makeAuthenticatedRequest(endpoint, {
                method: 'DELETE'
            });
            return response.data;
        } catch (error) {
            console.error(`Error in DELETE request to ${endpoint}:`, error.message);
            throw error;
        }
    }
    
    /**
     * Get current token status
     * @returns {Object} Token status information
     */
    static getTokenStatus() {
        return {
            hasToken: !!currentAccessToken,
            isExpired: isTokenExpired(currentAccessToken),
            expiresAt: tokenExpiryTime ? new Date(tokenExpiryTime).toISOString() : null,
            timeUntilExpiry: tokenExpiryTime ? Math.max(0, tokenExpiryTime - Date.now()) : null
        };
    }
    
    /**
     * Exchange authorization code for tokens
     * @param {string} code - Authorization code from OAuth flow
     * @returns {Promise<Object>} Token response
     */
    static async exchangeCodeForTokens(code) {
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
}

// Legacy functions for backward compatibility (don't break existing code)
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

async function createOpportunityInPipeline(jobData) {
    // First, let's get the pipeline stage name
    let pipelineStageName = "Discovery Call"; // Default name
    
    try {
        // Use the new TokenService for the stage lookup
        const stageData = await TokenService.get(`/pipelines/${process.env.GHL_PIPELINE_ID}/stages/${process.env.GHL_PIPELINE_STAGE_ID}`);
        
        if (stageData && stageData.name) {
            pipelineStageName = stageData.name;
            console.log('Pipeline stage name:', pipelineStageName);
        }
    } catch (error) {
        console.log('Could not fetch pipeline stage name, using default:', error.message);
    }

    const opportunityData = {
        pipelineId: process.env.GHL_PIPELINE_ID,
        locationId: process.env.GHL_LOCATION_ID,
        name: jobData.title || jobData.name,
        pipelineStageId: process.env.GHL_PIPELINE_STAGE_ID,
        status: "open",
        contactId: "X9BZelkJiMRBoBfQ2exx", // You might want to make this dynamic
        monetaryValue: jobData.salary || jobData.monetary_value || 0,
        assignedTo: ""
    };

    try {
        // Use the new TokenService for creating the opportunity
        const response = await TokenService.post('/opportunities/', opportunityData);
        console.log('Opportunity created successfully:', response);
        return response;
    } catch (error) {
        console.error('Error creating opportunity in pipeline:', error);
        throw error;
    }
}

// Export both the new TokenService and legacy functions
module.exports = {
    // New centralized TokenService
    TokenService,
    
    // Legacy functions for backward compatibility
    sendDataToGoHighLevel,
    exchangeCodeForTokens: TokenService.exchangeCodeForTokens,
    createOpportunityInPipeline,
    getValidAccessToken,
    getTokenStatus: TokenService.getTokenStatus,
    refreshAccessToken
}; 