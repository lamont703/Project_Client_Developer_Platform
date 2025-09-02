const express = require('express');
const router = express.Router();
const { TokenService } = require('../services/tokenService');
const logger = require('../config/logger');

// Example: Get opportunities directly from GoHighLevel API
router.get('/ghl-opportunities', async (req, res) => {
    try {
        logger.info('Fetching opportunities directly from GoHighLevel API');
        
        // Use the new TokenService - automatic token refresh included!
        const opportunities = await TokenService.get('/opportunities/', {
            locationId: process.env.GHL_LOCATION_ID
        });
        
        logger.info(`Successfully fetched ${opportunities.length} opportunities from GoHighLevel`);
        
        res.json({
            success: true,
            opportunities: opportunities,
            count: opportunities.length,
            source: 'GoHighLevel API',
            timestamp: new Date().toISOString()
        });
        
    } catch (error) {
        logger.error('Error fetching opportunities from GoHighLevel:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch opportunities from GoHighLevel',
            message: error.message,
            timestamp: new Date().toISOString()
        });
    }
});

// Example: Update opportunity status in GoHighLevel
router.put('/opportunities/:id/status', async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        
        logger.info(`Updating opportunity ${id} status to ${status} in GoHighLevel`);
        
        // Use the new TokenService - automatic token refresh included!
        const updatedOpportunity = await TokenService.put(`/opportunities/${id}`, {
            status: status
        });
        
        logger.info(`Successfully updated opportunity ${id} status`);
        
        res.json({
            success: true,
            opportunity: updatedOpportunity,
            message: 'Opportunity status updated successfully',
            timestamp: new Date().toISOString()
        });
        
    } catch (error) {
        logger.error('Error updating opportunity status:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to update opportunity status',
            message: error.message,
            timestamp: new Date().toISOString()
        });
    }
});

// Example: Get token status (useful for debugging)
router.get('/token-status', async (req, res) => {
    try {
        const tokenStatus = TokenService.getTokenStatus();
        
        res.json({
            success: true,
            tokenStatus: tokenStatus,
            timestamp: new Date().toISOString()
        });
        
    } catch (error) {
        logger.error('Error getting token status:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to get token status',
            message: error.message,
            timestamp: new Date().toISOString()
        });
    }
});

// Example: Manually refresh token
router.post('/refresh-token', async (req, res) => {
    try {
        logger.info('Manually refreshing access token');
        
        const newToken = await TokenService.refreshToken();
        
        logger.info('Token refreshed successfully');
        
        res.json({
            success: true,
            message: 'Token refreshed successfully',
            timestamp: new Date().toISOString()
        });
        
    } catch (error) {
        logger.error('Error refreshing token:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to refresh token',
            message: error.message,
            timestamp: new Date().toISOString()
        });
    }
});

module.exports = router; 