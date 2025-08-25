import React, { useState, useEffect } from 'react';
import '../styles/PostJobWizard.css';

const PostJobWizard: React.FC = () => {
    const [step, setStep] = useState(0);
    const [jobDraft, setJobDraft] = useState<any>(null);

    useEffect(() => {
        // Load job draft from local storage
        const draft = localStorage.getItem('jobDraft');
        if (draft) {
            setJobDraft(JSON.parse(draft));
        }
    }, []);

    const handleNext = () => {
        setStep((prevStep) => prevStep + 1);
    };

    const handlePrevious = () => {
        setStep((prevStep) => prevStep - 1);
    };

    const handlePublish = () => {
        if (jobDraft) {
            // Log the updated project data
            console.log('Updated Project Data:', jobDraft);

            const isAuthenticated = true; // Replace with actual authentication check

            if (isAuthenticated) {
                fetch('http://localhost:3001/api/jobs', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(jobDraft),
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log('Job published:', data);
                        console.log('Analytics: post_published');
                    })
                    .catch(error => {
                        console.error('Error publishing job:', error);
                    });
            } else {
                console.log('Simulating job publish for unauthenticated user');
                console.log('Analytics: post_published (mock)');
            }
        }
    };

    const handleInputChange = (field: string, value: string) => {
        const updatedDraft = { ...jobDraft, [field]: value };
        setJobDraft(updatedDraft);
        localStorage.setItem('jobDraft', JSON.stringify(updatedDraft));
    };

    return (
        <div className="post-job-wizard">
            <h1>Post Job Wizard</h1>
            <div className="wizard-steps">
                {step === 0 && (
                    <div className="wizard-step">
                        <h2>Basics</h2>
                        <label>
                            Title:
                            <input
                                type="text"
                                value={jobDraft?.title || ''}
                                onChange={(e) => handleInputChange('title', e.target.value)}
                            />
                        </label>
                        <label>
                            Category:
                            <input
                                type="text"
                                value={jobDraft?.category || ''}
                                onChange={(e) => handleInputChange('category', e.target.value)}
                            />
                        </label>
                        <label>
                            Target Audience:
                            <input
                                type="text"
                                value={jobDraft?.targetAudience || ''}
                                onChange={(e) => handleInputChange('targetAudience', e.target.value)}
                            />
                        </label>
                    </div>
                )}
                {step === 1 && (
                    <div className="wizard-step">
                        <h2>Details</h2>
                        <label>
                            Description:
                            <textarea
                                value={jobDraft?.description || ''}
                                onChange={(e) => handleInputChange('description', e.target.value)}
                            />
                        </label>
                        <label>
                            Key Features:
                            <textarea
                                value={jobDraft?.keyFeatures || ''}
                                onChange={(e) => handleInputChange('keyFeatures', e.target.value)}
                            />
                        </label>
                        <label>
                            Technology Stack:
                            <input
                                type="text"
                                value={jobDraft?.technologyStack || ''}
                                onChange={(e) => handleInputChange('technologyStack', e.target.value)}
                            />
                        </label>
                    </div>
                )}
                {step === 2 && (
                    <div className="wizard-step">
                        <h2>Budget</h2>
                        <label>
                            Budget:
                            <input
                                type="text"
                                value={jobDraft?.budget || ''}
                                onChange={(e) => handleInputChange('budget', e.target.value)}
                            />
                        </label>
                        <label>
                            Timeline:
                            <input
                                type="text"
                                value={jobDraft?.timeline || ''}
                                onChange={(e) => handleInputChange('timeline', e.target.value)}
                            />
                        </label>
                    </div>
                )}
                {step === 3 && (
                    <div className="wizard-step">
                        <h2>Review</h2>
                        <label>
                            Success Criteria:
                            <textarea
                                value={jobDraft?.successCriteria || ''}
                                onChange={(e) => handleInputChange('successCriteria', e.target.value)}
                            />
                        </label>
                        <label>
                            Potential Challenges:
                            <textarea
                                value={jobDraft?.potentialChallenges || ''}
                                onChange={(e) => handleInputChange('potentialChallenges', e.target.value)}
                            />
                        </label>
                    </div>
                )}
            </div>
            <div className="wizard-navigation">
                {step > 0 && <button onClick={handlePrevious}>Previous</button>}
                {step < 3 && <button onClick={handleNext}>Next</button>}
                {step === 3 && <button onClick={handlePublish}>Publish</button>}
            </div>
        </div>
    );
};

export default PostJobWizard; 