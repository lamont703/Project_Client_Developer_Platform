// jobController.js

// In-memory job data storage
let jobs = [];

// Controller to handle job creation
exports.createJob = (req, res) => {
    const jobData = req.body;
    jobs.push(jobData);
    console.log('Job created:', jobData);
    res.status(201).json({ message: 'Job created successfully', jobData });
}; 