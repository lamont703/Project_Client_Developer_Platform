// jobController.js

const { createOpportunityInPipeline } = require('../goHighLevelService');
const { insertJobDraft, getAllJobs } = require('../db');

// In-memory job data storage
let jobs = [];

// Controller to handle job creation
exports.createJob = async (req, res) => {
    const jobData = req.body;
    jobs.push(jobData);
    console.log('Received job data:', jobData);
    res.status(201).json({ message: 'Job created successfully', jobData });

    // Insert job data into Supabase
    try {
        console.log('Attempting to insert job draft into Supabase...');
        const data = await insertJobDraft(jobData);
        console.log('Job draft saved to Supabase:', data);
    } catch (error) {
        console.error('Error saving job draft to Supabase:', error);
    }

    // Create opportunity in GoHighLevel pipeline
    try {
        await createOpportunityInPipeline(jobData.title);
        console.log('Opportunity created successfully in GoHighLevel pipeline');
    } catch (error) {
        console.error('Failed to create opportunity in GoHighLevel pipeline:', error);
    }
};

// Controller to handle fetching all jobs
exports.getAllJobs = async (req, res) => {
    try {
        console.log('Fetching all jobs from database...');
        const jobs = await getAllJobs();
        res.status(200).json(jobs);
    } catch (error) {
        console.error('Error fetching jobs:', error);
        res.status(500).json({ error: 'Failed to fetch jobs' });
    }
}; 