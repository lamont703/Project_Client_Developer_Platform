import React from 'react';
import { useNavigate } from 'react-router-dom';

const HeroSection: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigation = (route: string) => {
    try {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      navigate(route);
    } catch (error) {
      console.error('HeroSection navigation error:', error);
      window.location.hash = `#${route}`;
    }
  };

  return (
    <div className="hero-section">
      <div className="hero-content">
        <div className="hero-badge">
          <span className="badge-text">🚀 Limited Launch</span>
          <span className="badge-subtext">Only 10 projects per month</span>
        </div>
        
        <h1 className="hero-title">
          Turn Your Tech Idea Into Reality
        </h1>
        
        <p className="hero-subtitle">
          The first essential step for anyone with a tech idea. Get a professional prototype and investor-ready pitch deck to validate and fund your vision.
        </p>
        
        <div className="hero-features">
          <div className="feature-item">
            <span className="feature-icon">🎯</span>
            <span className="feature-text">Professional Prototype</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">📊</span>
            <span className="feature-text">Investor-Ready Pitch Deck</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">⚡</span>
            <span className="feature-text">Fast Turnaround</span>
          </div>
        </div>
        
        <div className="hero-cta">
          <button 
            onClick={() => document.getElementById('waitlist-form')?.scrollIntoView({ behavior: 'smooth' })}
            className="cta-button primary"
          >
            Join Waitlist
          </button>
          <button 
            onClick={() => handleNavigation('/proto-hub')}
            className="cta-button secondary"
          >
            See Examples
          </button>
        </div>
        
        <div className="hero-guarantee">
          <span className="guarantee-text">✅ 100% Satisfaction Guarantee</span>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
