import React, { useState, useEffect } from 'react';
import '../styles/JobListing.css';

interface Job {
    id: number;
    title: string;
    category: string;
    target_audience: string;
    description: string;
    key_features: string;
    technology_stack: string;
    budget: string;
    timeline: string;
    success_criteria: string;
    potential_challenges: string;
    created_at: string;
}

const JobListing: React.FC = () => {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/jobs');
            if (!response.ok) {
                throw new Error('Failed to fetch jobs');
            }
            const data = await response.json();
            setJobs(data);
        } catch (err) {
            setError('Error fetching jobs. Please try again later.');
            console.error('Error fetching jobs:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleApply = (jobId: number) => {
        // Placeholder for apply functionality
        alert(`Applied to job ${jobId}! This feature will be implemented soon.`);
        
        // Send Google Analytics event for job application
        if (window.gtag) {
            window.gtag('event', 'job_application', {
                event_category: 'Job Listing',
                event_label: `Applied to job ${jobId}`
            });
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    if (loading) {
        return <div className="job-listing-container"><p>Loading jobs...</p></div>;
    }

    if (error) {
        return <div className="job-listing-container"><p className="error">{error}</p></div>;
    }

    return (
        <div className="job-listing-container">
            <h1>Available Jobs</h1>
            {jobs.length === 0 ? (
                <p>No jobs available at the moment.</p>
            ) : (
                <div className="jobs-grid">
                    {jobs.map((job) => (
                        <div key={job.id} className="job-card">
                            <div className="job-header">
                                <h2>{job.title}</h2>
                                <span className="job-category">{job.category}</span>
                            </div>
                            
                            <div className="job-details">
                                <div className="job-field">
                                    <strong>Target Audience:</strong>
                                    <p>{job.target_audience}</p>
                                </div>
                                
                                <div className="job-field">
                                    <strong>Description:</strong>
                                    <p>{job.description}</p>
                                </div>
                                
                                <div className="job-field">
                                    <strong>Key Features:</strong>
                                    <p>{job.key_features}</p>
                                </div>
                                
                                <div className="job-field">
                                    <strong>Technology Stack:</strong>
                                    <p>{job.technology_stack}</p>
                                </div>
                                
                                <div className="job-field">
                                    <strong>Budget:</strong>
                                    <p>{job.budget}</p>
                                </div>
                                
                                <div className="job-field">
                                    <strong>Timeline:</strong>
                                    <p>{job.timeline}</p>
                                </div>
                                
                                <div className="job-field">
                                    <strong>Success Criteria:</strong>
                                    <p>{job.success_criteria}</p>
                                </div>
                                
                                <div className="job-field">
                                    <strong>Potential Challenges:</strong>
                                    <p>{job.potential_challenges}</p>
                                </div>
                            </div>
                            
                            <div className="job-footer">
                                <p className="job-date">Posted: {formatDate(job.created_at)}</p>
                                <button 
                                    className="apply-button"
                                    onClick={() => handleApply(job.id)}
                                >
                                    Apply Now
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default JobListing; 