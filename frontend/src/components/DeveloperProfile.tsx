import React, { useState } from 'react';
import '../styles/DeveloperProfile.css';

interface DeveloperProfileProps {
    developer?: {
        id: string;
        name: string;
        title: string;
        avatar?: string;
        location: string;
        hourlyRate: string;
        skills: string[];
        experience: string;
        bio: string;
        portfolio?: string;
        github?: string;
        linkedin?: string;
        rating: number;
        completedProjects: number;
        availability: 'Available' | 'Busy' | 'Unavailable';
        languages: string[];
        timezone: string;
    };
}

const DeveloperProfile: React.FC<DeveloperProfileProps> = ({ developer }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [showContact, setShowContact] = useState(false);

    // Default developer data if none provided
    const defaultDeveloper = {
        id: '1',
        name: 'Alex Chen',
        title: 'Full-Stack Developer',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        location: 'San Francisco, CA',
        hourlyRate: '$75-120',
        skills: ['React', 'Node.js', 'Python', 'AWS', 'Docker', 'MongoDB'],
        experience: '5+ years',
        bio: 'Passionate full-stack developer with expertise in modern web technologies. I specialize in building scalable applications and have a proven track record of delivering high-quality solutions for startups and enterprise clients.',
        portfolio: 'https://alexchen.dev',
        github: 'https://github.com/alexchen',
        linkedin: 'https://linkedin.com/in/alexchen',
        rating: 4.8,
        completedProjects: 47,
        availability: 'Available' as const,
        languages: ['English', 'Mandarin'],
        timezone: 'PST (UTC-8)'
    };

    const dev = developer || defaultDeveloper;

    const renderStars = (rating: number) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        for (let i = 0; i < fullStars; i++) {
            stars.push(<span key={i} className="star full">⭐</span>);
        }
        
        if (hasHalfStar) {
            stars.push(<span key="half" className="star half">⭐</span>);
        }
        
        const emptyStars = 5 - Math.ceil(rating);
        for (let i = 0; i < emptyStars; i++) {
            stars.push(<span key={`empty-${i}`} className="star empty">☆</span>);
        }
        
        return stars;
    };

    const getAvailabilityColor = (status: string) => {
        switch (status) {
            case 'Available': return '#4ade80';
            case 'Busy': return '#f59e0b';
            case 'Unavailable': return '#ef4444';
            default: return '#6b7280';
        }
    };

    return (
        <div className="developer-profile">
            <div className="profile-header">
                <div className="profile-avatar">
                    <img src={dev.avatar} alt={dev.name} />
                    <div 
                        className="availability-badge"
                        style={{ backgroundColor: getAvailabilityColor(dev.availability) }}
                    >
                        {dev.availability}
                    </div>
                </div>
                
                <div className="profile-info">
                    <h1>{dev.name}</h1>
                    <h2>{dev.title}</h2>
                    
                    <div className="profile-meta">
                        <div className="meta-item">
                            <span className="meta-icon">📍</span>
                            <span>{dev.location}</span>
                        </div>
                        <div className="meta-item">
                            <span className="meta-icon">💰</span>
                            <span>{dev.hourlyRate}/hr</span>
                        </div>
                        <div className="meta-item">
                            <span className="meta-icon">⏰</span>
                            <span>{dev.timezone}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="profile-stats">
                <div className="stat-item">
                    <div className="stat-value">{dev.rating}</div>
                    <div className="stat-label">Rating</div>
                    <div className="stat-stars">
                        {renderStars(dev.rating)}
                    </div>
                </div>
                <div className="stat-item">
                    <div className="stat-value">{dev.completedProjects}</div>
                    <div className="stat-label">Projects</div>
                </div>
                <div className="stat-item">
                    <div className="stat-value">{dev.experience}</div>
                    <div className="stat-label">Experience</div>
                </div>
            </div>

            <div className="profile-section">
                <h3>🚀 Skills & Technologies</h3>
                <div className="skills-grid">
                    {dev.skills.map((skill, index) => (
                        <span key={index} className="skill-tag">{skill}</span>
                    ))}
                </div>
            </div>

            <div className="profile-section">
                <h3>🌍 Languages</h3>
                <div className="languages-list">
                    {dev.languages.map((language, index) => (
                        <span key={index} className="language-tag">{language}</span>
                    ))}
                </div>
            </div>

            <div className="profile-section">
                <h3>📖 About</h3>
                <p className="bio-text">
                    {isExpanded ? dev.bio : `${dev.bio.substring(0, 150)}...`}
                </p>
                <button 
                    className="expand-button"
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    {isExpanded ? 'Show Less' : 'Read More'}
                </button>
            </div>

            <div className="profile-section">
                <h3>🔗 Links</h3>
                <div className="social-links">
                    {dev.portfolio && (
                        <a href={dev.portfolio} target="_blank" rel="noopener noreferrer" className="social-link portfolio">
                            <span className="link-icon">🌐</span>
                            Portfolio
                        </a>
                    )}
                    {dev.github && (
                        <a href={dev.github} target="_blank" rel="noopener noreferrer" className="social-link github">
                            <span className="link-icon">📚</span>
                            GitHub
                        </a>
                    )}
                    {dev.linkedin && (
                        <a href={dev.linkedin} target="_blank" rel="noopener noreferrer" className="social-link linkedin">
                            <span className="link-icon">💼</span>
                            LinkedIn
                        </a>
                    )}
                </div>
            </div>

            <div className="profile-actions">
                <button 
                    className="contact-button primary"
                    onClick={() => setShowContact(!showContact)}
                >
                    {showContact ? 'Hide Contact' : 'Contact Developer'}
                </button>
                
                {showContact && (
                    <div className="contact-info">
                        <div className="contact-item">
                            <span className="contact-icon">📧</span>
                            <span>alex.chen@email.com</span>
                        </div>
                        <div className="contact-item">
                            <span className="contact-icon">📱</span>
                            <span>+1 (555) 123-4567</span>
                        </div>
                        <div className="contact-item">
                            <span className="contact-icon">💬</span>
                            <span>Available for chat on Slack/Discord</span>
                        </div>
                    </div>
                )}
                
                <button className="hire-button">
                    💼 Hire Developer
                </button>
            </div>
        </div>
    );
};

export default DeveloperProfile; 