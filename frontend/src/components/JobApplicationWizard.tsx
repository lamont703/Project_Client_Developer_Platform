import React, { useState, useEffect } from 'react';
import '../styles/JobApplicationWizard.css';

interface JobApplicationData {
    jobTitle: string;
    companyName: string;
    jobDescription: string;
    relevantSkills: string[];
    relevantExperience: string[];
    coverLetter: string;
    resumeHighlights: string[];
    interviewPrep: string[];
}

const JobApplicationWizard: React.FC = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [applicationData, setApplicationData] = useState<JobApplicationData>({
        jobTitle: '',
        companyName: '',
        jobDescription: '',
        relevantSkills: [],
        relevantExperience: [],
        coverLetter: '',
        resumeHighlights: [],
        interviewPrep: []
    });

    const [tempSkill, setTempSkill] = useState('');
    const [tempExperience, setTempExperience] = useState('');
    const [tempHighlight, setTempHighlight] = useState('');
    const [tempPrep, setTempPrep] = useState('');

    useEffect(() => {
        // Load application data from localStorage if available
        const savedApplication = localStorage.getItem('jobApplicationDraft');
        if (savedApplication) {
            setApplicationData(JSON.parse(savedApplication));
        }
    }, []);

    useEffect(() => {
        // Save application data to localStorage
        localStorage.setItem('jobApplicationDraft', JSON.stringify(applicationData));
    }, [applicationData]);

    const addSkill = () => {
        if (tempSkill.trim() && !applicationData.relevantSkills.includes(tempSkill.trim())) {
            setApplicationData({
                ...applicationData,
                relevantSkills: [...applicationData.relevantSkills, tempSkill.trim()]
            });
            setTempSkill('');
        }
    };

    const removeSkill = (skillToRemove: string) => {
        setApplicationData({
            ...applicationData,
            relevantSkills: applicationData.relevantSkills.filter(skill => skill !== skillToRemove)
        });
    };

    const addExperience = () => {
        if (tempExperience.trim() && !applicationData.relevantExperience.includes(tempExperience.trim())) {
            setApplicationData({
                ...applicationData,
                relevantExperience: [...applicationData.relevantExperience, tempExperience.trim()]
            });
            setTempExperience('');
        }
    };

    const removeExperience = (experienceToRemove: string) => {
        setApplicationData({
            ...applicationData,
            relevantExperience: applicationData.relevantExperience.filter(exp => exp !== experienceToRemove)
        });
    };

    const addHighlight = () => {
        if (tempHighlight.trim() && !applicationData.resumeHighlights.includes(tempHighlight.trim())) {
            setApplicationData({
                ...applicationData,
                resumeHighlights: [...applicationData.resumeHighlights, tempHighlight.trim()]
            });
            setTempHighlight('');
        }
    };

    const removeHighlight = (highlightToRemove: string) => {
        setApplicationData({
            ...applicationData,
            resumeHighlights: applicationData.resumeHighlights.filter(highlight => highlight !== highlightToRemove)
        });
    };

    const addPrep = () => {
        if (tempPrep.trim() && !applicationData.interviewPrep.includes(tempPrep.trim())) {
            setApplicationData({
                ...applicationData,
                interviewPrep: [...applicationData.interviewPrep, tempPrep.trim()]
            });
            setTempPrep('');
        }
    };

    const removePrep = (prepToRemove: string) => {
        setApplicationData({
            ...applicationData,
            interviewPrep: applicationData.interviewPrep.filter(prep => prep !== prepToRemove)
        });
    };

    const nextStep = () => {
        if (currentStep < 4) {
            setCurrentStep(currentStep + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleSubmit = () => {
        // Save final application
        localStorage.setItem('jobApplication', JSON.stringify(applicationData));
        // You could also send this to your backend API here
        alert('Job application prepared successfully! 🎯');
    };

    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return (
                    <div className="wizard-step">
                        <h2>💼 Job Information</h2>
                        <label>
                            Job Title
                            <input
                                type="text"
                                value={applicationData.jobTitle}
                                onChange={(e) => setApplicationData({...applicationData, jobTitle: e.target.value})}
                                placeholder="e.g., Senior Frontend Developer"
                            />
                        </label>
                        <label>
                            Company Name
                            <input
                                type="text"
                                value={applicationData.companyName}
                                onChange={(e) => setApplicationData({...applicationData, companyName: e.target.value})}
                                placeholder="e.g., TechCorp Inc."
                            />
                        </label>
                        <label>
                            Job Description
                            <textarea
                                value={applicationData.jobDescription}
                                onChange={(e) => setApplicationData({...applicationData, jobDescription: e.target.value})}
                                placeholder="Paste the job description here to help tailor your application..."
                                rows={6}
                            />
                        </label>
                    </div>
                );
            case 2:
                return (
                    <div className="wizard-step">
                        <h2>🎯 Relevant Skills & Experience</h2>
                        <label>
                            Skills That Match This Job
                            <div className="skills-input">
                                <input
                                    type="text"
                                    value={tempSkill}
                                    onChange={(e) => setTempSkill(e.target.value)}
                                    placeholder="e.g., React, TypeScript, AWS"
                                    onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                                />
                                <button type="button" onClick={addSkill} className="add-button">+</button>
                            </div>
                            <div className="tags-container">
                                {applicationData.relevantSkills.map((skill, index) => (
                                    <span key={index} className="tag">
                                        {skill}
                                        <button onClick={() => removeSkill(skill)} className="remove-tag">×</button>
                                    </span>
                                ))}
                            </div>
                        </label>
                        <label>
                            Relevant Experience to Highlight
                            <div className="skills-input">
                                <input
                                    type="text"
                                    value={tempExperience}
                                    onChange={(e) => setTempExperience(e.target.value)}
                                    placeholder="e.g., Built scalable React applications"
                                    onKeyPress={(e) => e.key === 'Enter' && addExperience()}
                                />
                                <button type="button" onClick={addExperience} className="add-button">+</button>
                            </div>
                            <div className="tags-container">
                                {applicationData.relevantExperience.map((exp, index) => (
                                    <span key={index} className="tag">
                                        {exp}
                                        <button onClick={() => removeExperience(exp)} className="remove-tag">×</button>
                                    </span>
                                ))}
                            </div>
                        </label>
                    </div>
                );
            case 3:
                return (
                    <div className="wizard-step">
                        <h2>📝 Application Materials</h2>
                        <label>
                            Resume Highlights
                            <div className="skills-input">
                                <input
                                    type="text"
                                    value={tempHighlight}
                                    onChange={(e) => setTempHighlight(e.target.value)}
                                    placeholder="e.g., Led team of 5 developers"
                                    onKeyPress={(e) => e.key === 'Enter' && addHighlight()}
                                />
                                <button type="button" onClick={addHighlight} className="add-button">+</button>
                            </div>
                            <div className="tags-container">
                                {applicationData.resumeHighlights.map((highlight, index) => (
                                    <span key={index} className="tag">
                                        {highlight}
                                        <button onClick={() => removeHighlight(highlight)} className="remove-tag">×</button>
                                    </span>
                                ))}
                            </div>
                        </label>
                        <label>
                            Cover Letter
                            <textarea
                                value={applicationData.coverLetter}
                                onChange={(e) => setApplicationData({...applicationData, coverLetter: e.target.value})}
                                placeholder="Write a compelling cover letter explaining why you're perfect for this role..."
                                rows={8}
                            />
                        </label>
                    </div>
                );
            case 4:
                return (
                    <div className="wizard-step">
                        <h2>🎤 Interview Preparation</h2>
                        <label>
                            Key Talking Points
                            <div className="skills-input">
                                <input
                                    type="text"
                                    value={tempPrep}
                                    onChange={(e) => setTempPrep(e.target.value)}
                                    placeholder="e.g., Discuss my React optimization experience"
                                    onKeyPress={(e) => e.key === 'Enter' && addPrep()}
                                />
                                <button type="button" onClick={addPrep} className="add-button">+</button>
                            </div>
                            <div className="tags-container">
                                {applicationData.interviewPrep.map((prep, index) => (
                                    <span key={index} className="tag">
                                        {prep}
                                        <button onClick={() => removePrep(prep)} className="remove-tag">×</button>
                                    </span>
                                ))}
                            </div>
                        </label>
                        <div className="application-preview">
                            <h3>Application Summary</h3>
                            <div className="preview-card">
                                <h4>{applicationData.jobTitle || 'Job Title'}</h4>
                                <p className="company">{applicationData.companyName || 'Company Name'}</p>
                                <div className="skills-preview">
                                    <strong>Key Skills:</strong>
                                    {applicationData.relevantSkills.slice(0, 3).map((skill, index) => (
                                        <span key={index} className="skill-tag">{skill}</span>
                                    ))}
                                    {applicationData.relevantSkills.length > 3 && <span className="more-skills">+{applicationData.relevantSkills.length - 3} more</span>}
                                </div>
                                <div className="cover-letter-preview">
                                    <strong>Cover Letter Preview:</strong>
                                    <p>{applicationData.coverLetter.substring(0, 150) || 'Your cover letter will appear here...'}...</p>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="job-application-wizard">
            <h1>🎯 Prepare Your Job Application</h1>
            
            {/* Step Progress Indicator */}
            <div className="wizard-progress">
                <div className={`progress-step ${currentStep >= 1 ? 'active' : ''} ${currentStep > 1 ? 'completed' : ''}`}>
                    <div className="step-number">1</div>
                    <div className="step-info">
                        <div className="step-title">Job Details</div>
                        <div className="step-description">Title & Description</div>
                    </div>
                </div>
                <div className={`step-connector ${currentStep > 1 ? 'completed' : ''}`}></div>
                <div className={`progress-step ${currentStep >= 2 ? 'active' : ''} ${currentStep > 2 ? 'completed' : ''}`}>
                    <div className="step-number">2</div>
                    <div className="step-info">
                        <div className="step-title">Skills</div>
                        <div className="step-description">Relevant Experience</div>
                    </div>
                </div>
                <div className={`step-connector ${currentStep > 2 ? 'completed' : ''}`}></div>
                <div className={`progress-step ${currentStep >= 3 ? 'active' : ''} ${currentStep > 3 ? 'completed' : ''}`}>
                    <div className="step-number">3</div>
                    <div className="step-info">
                        <div className="step-title">Materials</div>
                        <div className="step-description">Resume & Cover Letter</div>
                    </div>
                </div>
                <div className={`step-connector ${currentStep > 3 ? 'completed' : ''}`}></div>
                <div className={`progress-step ${currentStep >= 4 ? 'active' : ''}`}>
                    <div className="step-number">4</div>
                    <div className="step-info">
                        <div className="step-title">Interview</div>
                        <div className="step-description">Preparation & Preview</div>
                    </div>
                </div>
            </div>

            <div className="wizard-steps">
                {renderStep()}
            </div>

            <div className="wizard-navigation">
                {currentStep > 1 && (
                    <button onClick={prevStep}>
                        ← Previous
                    </button>
                )}
                {currentStep < 4 ? (
                    <button onClick={nextStep}>
                        Next →
                    </button>
                ) : (
                    <button onClick={handleSubmit} className="submit-button">
                        🎯 Complete Application
                    </button>
                )}
            </div>
        </div>
    );
};

export default JobApplicationWizard; 