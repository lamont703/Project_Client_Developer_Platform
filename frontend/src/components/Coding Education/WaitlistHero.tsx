import React from 'react';
import '../../styles/Coding Education/WaitlistHero.css';

const WaitlistHero: React.FC = () => {
  return (
    <section className="waitlist-hero">
      <div className="hero-container">
        <div className="hero-badge">
          <span className="badge-icon">🎓</span>
          <span className="badge-text">1-on-1 AI Coding Education</span>
        </div>
        
        <h1 className="hero-title">
          Master Full-Stack Development
          <span className="hero-highlight"> with AI Guidance</span>
        </h1>
        
        <p className="hero-subtitle">
          Learn frontend, backend, and deployment from industry experts with personalized AI assistance. 
          Get hands-on experience building real projects while receiving 1-on-1 mentorship.
        </p>
        
        <div className="hero-features">
          <div className="feature-item">
            <span className="feature-icon">🎯</span>
            <span>Personalized Learning Path</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">🤖</span>
            <span>AI-Powered Assistance</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">🚀</span>
            <span>Real Project Experience</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">👨‍🏫</span>
            <span>1-on-1 Mentorship</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WaitlistHero;
