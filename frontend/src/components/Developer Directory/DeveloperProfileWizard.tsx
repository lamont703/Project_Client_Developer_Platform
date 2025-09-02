import React, { useState, useEffect } from 'react';
import '../../styles/DeveloperProfileWizard.css';

interface DeveloperProfileData {
    name: string;
    title: string;
    avatar: string;
    location: string;
    hourlyRate: string;
    skills: string[];
    experience: string;
    bio: string;
    portfolio: string;
    github: string;
    linkedin: string;
    languages: string[];
    timezone: string;
    availability: 'Available' | 'Busy' | 'Unavailable';
}

const DeveloperProfileWizard: React.FC = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [profileData, setProfileData] = useState<DeveloperProfileData>({
        name: '',
        title: '',
        avatar: '',
        location: '',
        hourlyRate: '',
        skills: [],
        experience: '',
        bio: '',
        portfolio: '',
        github: '',
        linkedin: '',
        languages: [],
        timezone: '',
        availability: 'Available'
    });

    const [tempSkill, setTempSkill] = useState('');
    const [tempLanguage, setTempLanguage] = useState('');

    useEffect(() => {
        // Load profile data from localStorage if available
        const savedProfile = localStorage.getItem('developerProfileDraft');
        if (savedProfile) {
            setProfileData(JSON.parse(savedProfile));
        }
    }, []);

    useEffect(() => {
        // Save profile data to localStorage
        localStorage.setItem('developerProfileDraft', JSON.stringify(profileData));
    }, [profileData]);

    const addSkill = () => {
        if (tempSkill.trim() && !profileData.skills.includes(tempSkill.trim())) {
            setProfileData({
                ...profileData,
                skills: [...profileData.skills, tempSkill.trim()]
            });
            setTempSkill('');
        }
    };

    const removeSkill = (skillToRemove: string) => {
        setProfileData({
            ...profileData,
            skills: profileData.skills.filter(skill => skill !== skillToRemove)
        });
    };

    const addLanguage = () => {
        if (tempLanguage.trim() && !profileData.languages.includes(tempLanguage.trim())) {
            setProfileData({
                ...profileData,
                languages: [...profileData.languages, tempLanguage.trim()]
            });
            setTempLanguage('');
        }
    };

    const removeLanguage = (languageToRemove: string) => {
        setProfileData({
            ...profileData,
            languages: profileData.languages.filter(language => language !== languageToRemove)
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
        // Save final profile
        localStorage.setItem('developerProfile', JSON.stringify(profileData));
        // You could also send this to your backend API here
        alert('Profile created successfully! 🎉');
    };

    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return (
                    <div className="wizard-step">
                        <h2>👤 Basic Information</h2>
                        <label>
                            Full Name
                            <input
                                type="text"
                                value={profileData.name}
                                onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                                placeholder="e.g., Alex Chen"
                            />
                        </label>
                        <label>
                            Professional Title
                            <input
                                type="text"
                                value={profileData.title}
                                onChange={(e) => setProfileData({...profileData, title: e.target.value})}
                                placeholder="e.g., Full-Stack Developer"
                            />
                        </label>
                        <label>
                            Location
                            <input
                                type="text"
                                value={profileData.location}
                                onChange={(e) => setProfileData({...profileData, location: e.target.value})}
                                placeholder="e.g., San Francisco, CA"
                            />
                        </label>
                        <label>
                            Timezone
                            <input
                                type="text"
                                value={profileData.timezone}
                                onChange={(e) => setProfileData({...profileData, timezone: e.target.value})}
                                placeholder="e.g., PST (UTC-8)"
                            />
                        </label>
                    </div>
                );
            case 2:
                return (
                    <div className="wizard-step">
                        <h2>🚀 Skills & Experience</h2>
                        <label>
                            Years of Experience
                            <input
                                type="text"
                                value={profileData.experience}
                                onChange={(e) => setProfileData({...profileData, experience: e.target.value})}
                                placeholder="e.g., 5+ years"
                            />
                        </label>
                        <label>
                            Skills & Technologies
                            <div className="skills-input">
                                <input
                                    type="text"
                                    value={tempSkill}
                                    onChange={(e) => setTempSkill(e.target.value)}
                                    placeholder="e.g., React, Node.js, Python"
                                    onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                                />
                                <button type="button" onClick={addSkill} className="add-button">+</button>
                            </div>
                            <div className="tags-container">
                                {profileData.skills.map((skill, index) => (
                                    <span key={index} className="tag">
                                        {skill}
                                        <button onClick={() => removeSkill(skill)} className="remove-tag">×</button>
                                    </span>
                                ))}
                            </div>
                        </label>
                        <label>
                            Professional Bio
                            <textarea
                                value={profileData.bio}
                                onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                                placeholder="Tell us about your background, passion for development, and what makes you unique..."
                                rows={4}
                            />
                        </label>
                    </div>
                );
            case 3:
                return (
                    <div className="wizard-step">
                        <h2>🌍 Languages & Availability</h2>
                        <label>
                            Languages You Speak
                            <div className="skills-input">
                                <input
                                    type="text"
                                    value={tempLanguage}
                                    onChange={(e) => setTempLanguage(e.target.value)}
                                    placeholder="e.g., English, Spanish"
                                    onKeyPress={(e) => e.key === 'Enter' && addLanguage()}
                                />
                                <button type="button" onClick={addLanguage} className="add-button">+</button>
                            </div>
                            <div className="tags-container">
                                {profileData.languages.map((language, index) => (
                                    <span key={index} className="tag">
                                        {language}
                                        <button onClick={() => removeLanguage(language)} className="remove-tag">×</button>
                                    </span>
                                ))}
                            </div>
                        </label>
                        <label>
                            Hourly Rate
                            <input
                                type="text"
                                value={profileData.hourlyRate}
                                onChange={(e) => setProfileData({...profileData, hourlyRate: e.target.value})}
                                placeholder="e.g., $75-120"
                            />
                        </label>
                        <label>
                            Availability Status
                            <select
                                value={profileData.availability}
                                onChange={(e) => setProfileData({...profileData, availability: e.target.value as any})}
                            >
                                <option value="Available">Available for new projects</option>
                                <option value="Busy">Currently busy but open to opportunities</option>
                                <option value="Unavailable">Not available at the moment</option>
                            </select>
                        </label>
                    </div>
                );
            case 4:
                return (
                    <div className="wizard-step">
                        <h2>🔗 Portfolio & Links</h2>
                        <label>
                            Portfolio Website
                            <input
                                type="url"
                                value={profileData.portfolio}
                                onChange={(e) => setProfileData({...profileData, portfolio: e.target.value})}
                                placeholder="https://yourportfolio.com"
                            />
                        </label>
                        <label>
                            GitHub Profile
                            <input
                                type="url"
                                value={profileData.github}
                                onChange={(e) => setProfileData({...profileData, github: e.target.value})}
                                placeholder="https://github.com/username"
                            />
                        </label>
                        <label>
                            LinkedIn Profile
                            <input
                                type="url"
                                value={profileData.linkedin}
                                onChange={(e) => setProfileData({...profileData, linkedin: e.target.value})}
                                placeholder="https://linkedin.com/in/username"
                            />
                        </label>
                        <div className="profile-preview">
                            <h3>Profile Preview</h3>
                            <div className="preview-card">
                                <h4>{profileData.name || 'Your Name'}</h4>
                                <p className="title">{profileData.title || 'Professional Title'}</p>
                                <p className="location">{profileData.location || 'Location'}</p>
                                <div className="skills-preview">
                                    {profileData.skills.slice(0, 5).map((skill, index) => (
                                        <span key={index} className="skill-tag">{skill}</span>
                                    ))}
                                    {profileData.skills.length > 5 && <span className="more-skills">+{profileData.skills.length - 5} more</span>}
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
        <div className="developer-profile-wizard">
            <h1>🎯 Create Your Developer Profile</h1>
            
            {/* Step Progress Indicator */}
            <div className="wizard-progress">
                <div className={`progress-step ${currentStep >= 1 ? 'active' : ''} ${currentStep > 1 ? 'completed' : ''}`}>
                    <div className="step-number">1</div>
                    <div className="step-info">
                        <div className="step-title">Basic Info</div>
                        <div className="step-description">Name & Location</div>
                    </div>
                </div>
                <div className={`step-connector ${currentStep > 1 ? 'completed' : ''}`}></div>
                <div className={`progress-step ${currentStep >= 2 ? 'active' : ''} ${currentStep > 2 ? 'completed' : ''}`}>
                    <div className="step-number">2</div>
                    <div className="step-info">
                        <div className="step-title">Skills</div>
                        <div className="step-description">Experience & Bio</div>
                    </div>
                </div>
                <div className={`step-connector ${currentStep > 2 ? 'completed' : ''}`}></div>
                <div className={`progress-step ${currentStep >= 3 ? 'active' : ''} ${currentStep > 3 ? 'completed' : ''}`}>
                    <div className="step-number">3</div>
                    <div className="step-info">
                        <div className="step-title">Languages</div>
                        <div className="step-description">Availability & Rates</div>
                    </div>
                </div>
                <div className={`step-connector ${currentStep > 3 ? 'completed' : ''}`}></div>
                <div className={`progress-step ${currentStep >= 4 ? 'active' : ''}`}>
                    <div className="step-number">4</div>
                    <div className="step-info">
                        <div className="step-title">Portfolio</div>
                        <div className="step-description">Links & Preview</div>
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
                        🎉 Create Profile
                    </button>
                )}
            </div>
        </div>
    );
};

export default DeveloperProfileWizard; 