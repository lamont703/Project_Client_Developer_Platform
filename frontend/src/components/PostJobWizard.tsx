import React, { useState, useEffect } from 'react';
import '../styles/PostJobWizard.css';

interface StepConfig {
    title: string;
    description: string;
}

const PostJobWizard: React.FC = () => {
    const [step, setStep] = useState(0);
    const [jobDraft, setJobDraft] = useState<any>(null);
    const [isPublishing, setIsPublishing] = useState(false);

    const steps: StepConfig[] = [
        { title: 'Basics', description: 'Project fundamentals' },
        { title: 'Details', description: 'Technical specifications' },
        { title: 'Budget', description: 'Timeline & budget' },
        { title: 'Review', description: 'Final review' }
    ];

    useEffect(() => {
        // Load job draft from local storage
        const draft = localStorage.getItem('jobDraft');
        if (draft) {
            setJobDraft(JSON.parse(draft));
        }
    }, []);

    const StepProgressIndicator = () => (
        <div className="wizard-progress">
            {steps.map((stepConfig, index) => (
                <React.Fragment key={index}>
                    <div className={`progress-step ${
                        index < step ? 'completed' : 
                        index === step ? 'active' : ''
                    }`}>
                        <div className="step-number">
                            {index < step ? '' : index + 1}
                        </div>
                        <div className="step-info">
                            <div className="step-title">{stepConfig.title}</div>
                            <div className="step-description">{stepConfig.description}</div>
                        </div>
                    </div>
                    {index < steps.length - 1 && (
                        <div className={`step-connector ${index < step ? 'completed' : ''}`}></div>
                    )}
                </React.Fragment>
            ))}
        </div>
    );

    const handleNext = () => {
        if (validateCurrentStep()) {
            setStep((prevStep) => prevStep + 1);
        }
    };

    const handlePrevious = () => {
        setStep((prevStep) => prevStep - 1);
    };

    const validateCurrentStep = (): boolean => {
        if (!jobDraft) return false;
        
        switch (step) {
            case 0:
                return !!(jobDraft.title && jobDraft.category && jobDraft.targetAudience);
            case 1:
                return !!(jobDraft.description && jobDraft.keyFeatures && jobDraft.technologyStack);
            case 2:
                return !!(jobDraft.budget && jobDraft.timeline);
            case 3:
                return !!(jobDraft.successCriteria && jobDraft.potentialChallenges);
            default:
                return true;
        }
    };

    const handlePublish = async () => {
        if (jobDraft) {
            setIsPublishing(true);
            
            try {
                // Log the updated project data
                console.log('Updated Project Data:', jobDraft);

                const isAuthenticated = true; // Replace with actual authentication check

                if (isAuthenticated) {
                    const response = await fetch('http://localhost:3001/api/jobs', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(jobDraft),
                    });
                    
                    const data = await response.json();
                    console.log('Job published:', data);
                    console.log('Analytics: post_published');

                    // Send Google Analytics event for post published
                    if (window.gtag) {
                        window.gtag('event', 'post_published', {
                            event_category: 'Post Job Wizard',
                            event_label: 'User published job post'
                        });
                    }

                    // Show success message and redirect
                    alert('🎉 Job published successfully! Your project is now live.');
                    
                } else {
                    console.log('Simulating job publish for unauthenticated user');
                    console.log('Analytics: post_published (mock)');

                    // Send Google Analytics event for post published (mock)
                    if (window.gtag) {
                        window.gtag('event', 'post_published', {
                            event_category: 'Post Job Wizard',
                            event_label: 'User published job post (mock)'
                        });
                    }
                    
                    alert('🎉 Job published successfully! (Demo mode)');
                }
            } catch (error) {
                console.error('Error publishing job:', error);
                alert('❌ Error publishing job. Please try again.');
            } finally {
                setIsPublishing(false);
            }
        }
    };

    const handleInputChange = (field: string, value: string) => {
        const updatedDraft = { ...jobDraft, [field]: value };
        setJobDraft(updatedDraft);
        localStorage.setItem('jobDraft', JSON.stringify(updatedDraft));
    };

    const getFieldPlaceholder = (field: string): string => {
        const placeholders: { [key: string]: string } = {
            title: "e.g., 'E-commerce Mobile App' or 'Company Website Redesign'",
            category: "e.g., 'Web Development', 'Mobile App', 'UI/UX Design'",
            targetAudience: "e.g., 'Small businesses', 'E-commerce retailers', 'Startups'",
            description: "Describe your project vision, goals, and requirements in detail...",
            keyFeatures: "List the main features and functionality you need...",
            technologyStack: "e.g., 'React, Node.js, MongoDB' or 'Flutter, Firebase'",
            budget: "e.g., '$5,000 - $10,000' or 'Open to discussion'",
            timeline: "e.g., '2-3 months', '6 weeks', 'ASAP'",
            successCriteria: "How will you measure the success of this project?",
            potentialChallenges: "What challenges or constraints should developers be aware of?"
        };
        return placeholders[field] || "Enter details here...";
    };

    if (!jobDraft) {
        return (
            <div className="post-job-wizard">
                <h1>📝 Post Job Wizard</h1>
                <div className="wizard-steps">
                    <div className="wizard-step">
                        <p>Loading your project draft...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="post-job-wizard">
            <h1>📝 Post Job Wizard</h1>
            
            <StepProgressIndicator />
            
            <div className="wizard-steps">
                {step === 0 && (
                    <div className="wizard-step">
                        <h2>🚀 Project Basics</h2>
                        <label>
                            Project Title *
                            <input
                                type="text"
                                value={jobDraft?.title || ''}
                                onChange={(e) => handleInputChange('title', e.target.value)}
                                placeholder={getFieldPlaceholder('title')}
                                required
                            />
                        </label>
                        <label>
                            Category *
                            <input
                                type="text"
                                value={jobDraft?.category || ''}
                                onChange={(e) => handleInputChange('category', e.target.value)}
                                placeholder={getFieldPlaceholder('category')}
                                required
                            />
                        </label>
                        <label>
                            Target Audience *
                            <input
                                type="text"
                                value={jobDraft?.targetAudience || ''}
                                onChange={(e) => handleInputChange('targetAudience', e.target.value)}
                                placeholder={getFieldPlaceholder('targetAudience')}
                                required
                            />
                        </label>
                    </div>
                )}
                
                {step === 1 && (
                    <div className="wizard-step">
                        <h2>⚙️ Technical Details</h2>
                        <label>
                            Project Description *
                            <textarea
                                value={jobDraft?.description || ''}
                                onChange={(e) => handleInputChange('description', e.target.value)}
                                placeholder={getFieldPlaceholder('description')}
                                required
                            />
                        </label>
                        <label>
                            Key Features *
                            <textarea
                                value={jobDraft?.keyFeatures || ''}
                                onChange={(e) => handleInputChange('keyFeatures', e.target.value)}
                                placeholder={getFieldPlaceholder('keyFeatures')}
                                required
                            />
                        </label>
                        <label>
                            Technology Stack *
                            <input
                                type="text"
                                value={jobDraft?.technologyStack || ''}
                                onChange={(e) => handleInputChange('technologyStack', e.target.value)}
                                placeholder={getFieldPlaceholder('technologyStack')}
                                required
                            />
                        </label>
                    </div>
                )}
                
                {step === 2 && (
                    <div className="wizard-step">
                        <h2>💰 Budget & Timeline</h2>
                        <label>
                            Budget Range *
                            <input
                                type="text"
                                value={jobDraft?.budget || ''}
                                onChange={(e) => handleInputChange('budget', e.target.value)}
                                placeholder={getFieldPlaceholder('budget')}
                                required
                            />
                        </label>
                        <label>
                            Timeline *
                            <input
                                type="text"
                                value={jobDraft?.timeline || ''}
                                onChange={(e) => handleInputChange('timeline', e.target.value)}
                                placeholder={getFieldPlaceholder('timeline')}
                                required
                            />
                        </label>
                    </div>
                )}
                
                {step === 3 && (
                    <div className="wizard-step">
                        <h2>✅ Final Review</h2>
                        <label>
                            Success Criteria *
                            <textarea
                                value={jobDraft?.successCriteria || ''}
                                onChange={(e) => handleInputChange('successCriteria', e.target.value)}
                                placeholder={getFieldPlaceholder('successCriteria')}
                                required
                            />
                        </label>
                        <label>
                            Potential Challenges *
                            <textarea
                                value={jobDraft?.potentialChallenges || ''}
                                onChange={(e) => handleInputChange('potentialChallenges', e.target.value)}
                                placeholder={getFieldPlaceholder('potentialChallenges')}
                                required
                            />
                        </label>
                        
                        <div style={{ 
                            marginTop: '24px', 
                            padding: '20px', 
                            background: 'rgba(102, 126, 234, 0.1)', 
                            borderRadius: '12px',
                            border: '1px solid rgba(102, 126, 234, 0.2)'
                        }}>
                            <h3 style={{ 
                                margin: '0 0 12px 0', 
                                color: '#667eea',
                                fontSize: '18px'
                            }}>
                                🎯 Ready to Publish?
                            </h3>
                            <p style={{ 
                                margin: '0',
                                color: '#4a5568',
                                lineHeight: '1.5'
                            }}>
                                Your project details look great! Once published, developers will be able to see your project and apply. You can always edit details later.
                            </p>
                        </div>
                    </div>
                )}
            </div>
            
            <div className="wizard-navigation">
                {step > 0 && (
                    <button onClick={handlePrevious}>
                        ← Previous
                    </button>
                )}
                
                {step < 3 ? (
                    <button 
                        onClick={handleNext}
                        disabled={!validateCurrentStep()}
                        style={{ marginLeft: 'auto' }}
                    >
                        Next →
                    </button>
                ) : (
                    <button 
                        onClick={handlePublish}
                        disabled={!validateCurrentStep() || isPublishing}
                        style={{ marginLeft: 'auto' }}
                    >
                        {isPublishing ? '🚀 Publishing...' : '🚀 Publish Job'}
                    </button>
                )}
            </div>
        </div>
    );
};

export default PostJobWizard; 