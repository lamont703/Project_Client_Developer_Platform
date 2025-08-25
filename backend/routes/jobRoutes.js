const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');

// Route to handle job postings
router.post('/', jobController.createJob);

module.exports = router; 