const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

// Enable CORS for all routes
app.use(cors());

// Middleware to parse JSON requests
app.use(express.json());

// Route to handle job postings
app.post('/api/jobs', (req, res) => {
    const jobData = req.body;
    console.log('Received job data:', jobData);
    // Here you would typically save the job data to a database
    res.status(201).json({ message: 'Job created successfully', jobData });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
}); 