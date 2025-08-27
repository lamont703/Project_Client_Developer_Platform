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
        const job = jobs.find(j => j.id === jobId);
        alert(`🚀 Applied to "${job?.title}"! This feature will be implemented soon.`);
        
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

    const truncateText = (text: string | null | undefined, maxLength: number = 150) => {
        if (!text) return '';
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    };

    const LoadingSpinner = () => (
        <div className="job-listing-container">
            <h1>💼 Available Jobs</h1>
            <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                minHeight: '300px',
                flexDirection: 'column',
                gap: '20px'
            }}>
                <div className="loading-spinner"></div>
                <p>Loading amazing opportunities for you...</p>
            </div>
        </div>
    );

    if (loading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return (
            <div className="job-listing-container">
                <h1>💼 Available Jobs</h1>
                <div className="error">
                    <h3>😞 Oops! Something went wrong</h3>
                    <p>{error}</p>
                    <button 
                        onClick={() => {
                            setError(null);
                            setLoading(true);
                            fetchJobs();
                        }}
                        style={{
                            marginTop: '16px',
                            padding: '12px 24px',
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '25px',
                            cursor: 'pointer',
                            fontWeight: '600'
                        }}
                    >
                        🔄 Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="job-listing-container">
            <h1>💼 Available Jobs</h1>
            
            {jobs.length === 0 ? (
                <div style={{
                    textAlign: 'center',
                    padding: '60px 20px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '20px',
                    margin: '40px auto',
                    maxWidth: '600px'
                }}>
                    <div style={{ fontSize: '64px', marginBottom: '20px' }}>🎯</div>
                    <h2 style={{ 
                        color: 'white', 
                        marginBottom: '16px',
                        fontSize: '24px',
                        fontWeight: '700'
                    }}>
                        No Jobs Available Yet
                    </h2>
                    <p style={{ 
                        color: 'rgba(255, 255, 255, 0.8)', 
                        fontSize: '18px',
                        lineHeight: '1.6',
                        margin: '0'
                    }}>
                        Be the first to post an amazing project! Use our AI Project Assistant to create your job posting.
                    </p>
                </div>
            ) : (
                <>
                    <div style={{
                        textAlign: 'center',
                        marginBottom: '30px',
                        color: 'rgba(255, 255, 255, 0.9)',
                        fontSize: '18px',
                        fontWeight: '500'
                    }}>
                        🌟 Discover {jobs.length} amazing project{jobs.length !== 1 ? 's' : ''} waiting for talented developers
                    </div>
                    
                    <div className="jobs-grid">
                        {jobs.map((job) => (
                            <div key={job.id} className="job-card">
                                <div className="job-header">
                                    <h2>{job.title}</h2>
                                    <span className="job-category">{job.category}</span>
                                </div>
                                
                                <div className="job-details">
                                    <div className="job-field">
                                        <strong>Target Audience</strong>
                                        <p>{truncateText(job.target_audience, 100)}</p>
                                    </div>
                                    
                                    <div className="job-field">
                                        <strong>Description</strong>
                                        <p>{truncateText(job.description, 120)}</p>
                                    </div>
                                    
                                    <div className="job-field">
                                        <strong>Key Features</strong>
                                        <p>{truncateText(job.key_features, 100)}</p>
                                    </div>
                                    
                                    <div className="job-field">
                                        <strong>Technology Stack</strong>
                                        <p>{job.technology_stack}</p>
                                    </div>
                                    
                                    <div className="job-field">
                                        <strong>Budget</strong>
                                        <p>{job.budget}</p>
                                    </div>
                                    
                                    <div className="job-field">
                                        <strong>Timeline</strong>
                                        <p>{job.timeline}</p>
                                    </div>
                                    
                                    <div className="job-field">
                                        <strong>Success Criteria</strong>
                                        <p>{truncateText(job.success_criteria, 100)}</p>
                                    </div>
                                    
                                    <div className="job-field">
                                        <strong>Potential Challenges</strong>
                                        <p>{truncateText(job.potential_challenges, 100)}</p>
                                    </div>
                                </div>
                                
                                <div className="job-footer">
                                    <p className="job-date">Posted: {formatDate(job.created_at)}</p>
                                    <button 
                                        className="apply-button"
                                        onClick={() => handleApply(job.id)}
                                    >
                                        🚀 Apply Now
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default JobListing; 