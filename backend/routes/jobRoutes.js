const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');

// POST route to create a job
router.post('/', jobController.createJob);

// GET route to fetch all jobs
router.get('/', jobController.getAllJobs);

module.exports = router; 