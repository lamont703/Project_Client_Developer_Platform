const express = require('express');
const router = express.Router();
const { 
    getAllOpportunitiesController, 
    getOpportunityByIdController 
} = require('../controllers/opportunityController');

// Get all opportunities from the database
router.get('/', getAllOpportunitiesController);

// Get opportunity by ID
router.get('/:id', getOpportunityByIdController);

module.exports = router; 