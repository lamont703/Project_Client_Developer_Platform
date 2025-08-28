import React, { useState, useEffect } from 'react';
import '../styles/JobListing.css';

interface Opportunity {
    id: number;
    opportunity_id: string;
    name: string;
    status: string;
    monetary_value: number;
    contact_id?: string;
    pipeline_id?: string;
    pipeline_stage_id?: string;
    pipeline_stage_name?: string;
    assigned_to?: string;
    created_at: string;
    updated_at: string;
}

const OpportunityListing: React.FC = () => {
    const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchOpportunities();
    }, []);

    const fetchOpportunities = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/opportunities');
            if (!response.ok) {
                throw new Error('Failed to fetch opportunities');
            }
            const data = await response.json();
            if (data.success) {
                console.log('Opportunities fetched:', data.opportunities);
                console.log('First opportunity pipeline stage name:', data.opportunities[0]?.pipeline_stage_name);
                setOpportunities(data.opportunities);
            } else {
                throw new Error(data.error || 'Failed to fetch opportunities');
            }
        } catch (err) {
            setError('Error fetching opportunities. Please try again later.');
            console.error('Error fetching opportunities:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleApply = (opportunityId: string) => {
        // Placeholder for apply functionality
        const opportunity = opportunities.find(o => o.opportunity_id === opportunityId);
        alert(`🚀 Applied to "${opportunity?.name}"! This feature will be implemented soon.`);
        
        // Send Google Analytics event for opportunity application
        if (window.gtag) {
            window.gtag('event', 'opportunity_application', {
                event_category: 'Opportunity Listing',
                event_label: `Applied to opportunity ${opportunityId}`
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

    const formatCurrency = (amount: number) => {
        if (!amount) return 'Not specified';
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    };

    const getStatusColor = (status: string) => {
        switch (status?.toLowerCase()) {
            case 'open':
                return '#10b981'; // Green
            case 'qualified':
                return '#3b82f6'; // Blue
            case 'proposal':
                return '#f59e0b'; // Yellow
            case 'closed won':
                return '#059669'; // Dark green
            case 'closed lost':
                return '#dc2626'; // Red
            default:
                return '#6b7280'; // Gray
        }
    };

    const LoadingSpinner = () => (
        <div className="job-listing-container">
            <h1>💼 Pipeline Opportunities</h1>
            <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                minHeight: '300px',
                flexDirection: 'column',
                gap: '20px'
            }}>
                <div className="loading-spinner"></div>
                <p>Loading opportunities from your pipeline...</p>
            </div>
        </div>
    );

    if (loading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return (
            <div className="job-listing-container">
                <h1>💼 Pipeline Opportunities</h1>
                <div className="error">
                    <h3>😞 Oops! Something went wrong</h3>
                    <p>{error}</p>
                    <button 
                        onClick={() => {
                            setError(null);
                            setLoading(true);
                            fetchOpportunities();
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
            <h1>💼 Pipeline Opportunities</h1>
            
            {opportunities.length === 0 ? (
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
                        No Opportunities Yet
                    </h2>
                    <p style={{ 
                        color: 'rgba(255, 255, 255, 0.8)', 
                        fontSize: '18px',
                        lineHeight: '1.6',
                        margin: '0'
                    }}>
                        Opportunities will appear here as they're created in your GoHighLevel pipeline. 
                        Create a new job posting to see it appear here!
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
                        🌟 {opportunities.length} opportunity{opportunities.length !== 1 ? 's' : ''} in your pipeline
                    </div>
                    
                    <div className="jobs-grid">
                        {opportunities.map((opportunity) => {
                            console.log('Rendering opportunity:', opportunity.name, 'Stage name:', opportunity.pipeline_stage_name);
                            return (
                            <div key={opportunity.id} className="job-card">
                                <div className="job-header">
                                    <h2>{opportunity.name || 'Untitled Opportunity'}</h2>
                                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                        <span 
                                            className="job-category"
                                            style={{
                                                backgroundColor: getStatusColor(opportunity.status),
                                                color: 'white',
                                                padding: '4px 12px',
                                                borderRadius: '12px',
                                                fontSize: '12px',
                                                fontWeight: '600',
                                                textTransform: 'uppercase'
                                            }}
                                        >
                                            {opportunity.status || 'Unknown Status'}
                                        </span>
                                        {/* Debug: Always show the stage name for testing */}
                                        <span style={{
                                            backgroundColor: '#8b5cf6',
                                            color: 'white',
                                            padding: '4px 12px',
                                            borderRadius: '12px',
                                            fontSize: '12px',
                                            fontWeight: '600',
                                            textTransform: 'uppercase',
                                            border: '2px solid red' // Debug border to make it visible
                                        }}>
                                            {opportunity.pipeline_stage_name || 'No Stage'}
                                        </span>
                                    </div>
                                </div>
                                
                                <div className="job-details">
                                    {/* Debug: Show pipeline stage name prominently */}
                                    <div className="job-field" style={{ 
                                        backgroundColor: 'rgba(139, 92, 246, 0.1)', 
                                        padding: '10px', 
                                        borderRadius: '8px',
                                        border: '1px solid #8b5cf6'
                                    }}>
                                        <strong>Pipeline Stage</strong>
                                        <p style={{ 
                                            fontSize: '16px', 
                                            fontWeight: '600',
                                            color: '#8b5cf6',
                                            margin: '5px 0'
                                        }}>
                                            {opportunity.pipeline_stage_name || 'No Stage Name'}
                                        </p>
                                    </div>
                                    
                                    <div className="job-field">
                                        <strong>Opportunity ID</strong>
                                        <p style={{ fontFamily: 'monospace', fontSize: '14px' }}>
                                            {opportunity.opportunity_id}
                                        </p>
                                    </div>
                                    
                                    <div className="job-field">
                                        <strong>Value</strong>
                                        <p style={{ 
                                            fontSize: '18px', 
                                            fontWeight: '600',
                                            color: '#10b981'
                                        }}>
                                            {formatCurrency(opportunity.monetary_value)}
                                        </p>
                                    </div>
                                    
                                    {opportunity.contact_id && (
                                        <div className="job-field">
                                            <strong>Contact ID</strong>
                                            <p style={{ fontFamily: 'monospace', fontSize: '14px' }}>
                                                {opportunity.contact_id}
                                            </p>
                                        </div>
                                    )}
                                    
                                    {opportunity.pipeline_id && (
                                        <div className="job-field">
                                            <strong>Pipeline ID</strong>
                                            <p style={{ fontFamily: 'monospace', fontSize: '14px' }}>
                                                {opportunity.pipeline_id}
                                            </p>
                                        </div>
                                    )}
                                    
                                    {opportunity.assigned_to && (
                                        <div className="job-field">
                                            <strong>Assigned To</strong>
                                            <p>{opportunity.assigned_to}</p>
                                        </div>
                                    )}
                                </div>
                                
                                <div className="job-footer">
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                        <p className="job-date">Created: {formatDate(opportunity.created_at)}</p>
                                        {opportunity.updated_at !== opportunity.created_at && (
                                            <p className="job-date" style={{ fontSize: '12px', opacity: 0.7 }}>
                                                Updated: {formatDate(opportunity.updated_at)}
                                            </p>
                                        )}
                                    </div>
                                    <button 
                                        className="apply-button"
                                        onClick={() => handleApply(opportunity.opportunity_id)}
                                    >
                                        🚀 View Details
                                    </button>
                                </div>
                            </div>
                        );
                        })}
                    </div>
                </>
            )}
        </div>
    );
};

export default OpportunityListing; 