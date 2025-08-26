// jobController.js

const { sendDataToGoHighLevel } = require('../goHighLevelService');
const { insertJobDraft } = require('../db');

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

    // Send job data to GoHighLevel
    try {
        await sendDataToGoHighLevel(jobData);
    } catch (error) {
        console.error('Failed to send job data to GoHighLevel:', error);
    }
}; 