const express = require('express');
const router = express.Router();
const { getAllOpportunities } = require('../controllers/opportunityController');
const logger = require('../config/logger');

// Get all opportunities from GoHighLevel pipeline
router.get('/', async (req, res) => {
    try {
        logger.info('Fetching all opportunities from database');
        const opportunities = await getAllOpportunities();
        
        res.status(200).json({
            success: true,
            opportunities,
            count: opportunities.length,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        logger.error('Error fetching opportunities:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch opportunities',
            message: error.message,
            timestamp: new Date().toISOString()
        });
    }
});

// Get opportunity by ID
router.get('/:id', async (req, res) => {
    try {
        const { getOpportunityById } = require('../controllers/opportunityController');
        const opportunity = await getOpportunityById(req.params.id);
        
        if (!opportunity) {
            return res.status(404).json({
                success: false,
                error: 'Opportunity not found',
                timestamp: new Date().toISOString()
            });
        }
        
        res.status(200).json({
            success: true,
            opportunity,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        logger.error('Error fetching opportunity by ID:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch opportunity',
            message: error.message,
            timestamp: new Date().toISOString()
        });
    }
});

module.exports = router; 