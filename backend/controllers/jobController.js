// jobController.js

const { createOpportunityInPipeline } = require('../goHighLevelService');
const { insertJobDraft, getAllJobs } = require('../db');
const { createWireFrame } = require('../wireFrameService');

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
        await createOpportunityInPipeline(jobData);
        console.log('Opportunity created successfully in GoHighLevel pipeline');
    } catch (error) {
        console.error('Failed to create opportunity in GoHighLevel pipeline:', error);
    }

    // Generate wireframe and prototype for the job
    try {
        console.log('Initiating wireframe generation for job:', jobData.title);
        const wireframeResult = await createWireFrame(jobData);
        console.log('Wireframe generation completed successfully!');
        console.log('Repository URL:', wireframeResult.repo_url);
        console.log('Live Site URL:', wireframeResult.pages_url);
        
        // Optionally, you could save the wireframe URLs back to the database
        // This would allow you to associate the generated wireframes with the job
        
    } catch (error) {
        console.error('Failed to generate wireframe for job:', error.message);
        // Note: We don't throw the error here to avoid disrupting the main job creation flow
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