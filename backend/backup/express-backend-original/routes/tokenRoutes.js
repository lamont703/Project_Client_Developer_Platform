const express = require('express');
const router = express.Router();
const { getTokenStatus, refreshAccessToken } = require('../goHighLevelService');

// Get current token status
router.get('/status', (req, res) => {
    try {
        const status = getTokenStatus();
        res.json({
            success: true,
            tokenStatus: status,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
            timestamp: new Date().toISOString()
        });
    }
});

// Manually refresh token
router.post('/refresh', async (req, res) => {
    try {
        const newToken = await refreshAccessToken();
        const status = getTokenStatus();
        
        res.json({
            success: true,
            message: 'Token refreshed successfully',
            newToken: newToken.substring(0, 20) + '...', // Only show first 20 chars for security
            tokenStatus: status,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
            timestamp: new Date().toISOString()
        });
    }
});

// Test GoHighLevel API connection
router.get('/test-connection', async (req, res) => {
    try {
        const { getValidAccessToken } = require('../goHighLevelService');
        const token = await getValidAccessToken();
        
        res.json({
            success: true,
            message: 'Token is valid and ready for API calls',
            tokenStatus: getTokenStatus(),
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
            timestamp: new Date().toISOString()
        });
    }
});

module.exports = router; 