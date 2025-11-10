import React from 'react';
import '../../styles/GHL Activation/GHLActivationHero.css';

const GHLActivationHero: React.FC = () => {
  return (
    <section className="ghl-activation-hero">
      <div className="ghl-hero-container">
        <div className="ghl-hero-content">
          <div className="ghl-success-badge">
            <span className="ghl-check-icon">✓</span>
            <span className="ghl-badge-text">Payment Successful!</span>
          </div>
          
          <h1 className="ghl-hero-title">
            Welcome to Your 10-Day AI Freelance Kickstart!
          </h1>
          
          <p className="ghl-hero-subtitle">
            You're just one step away from accessing your GoHighLevel trial and starting your AI freelance journey. 
            Activate your 14-day free trial below to get started.
          </p>
          
          <div className="ghl-hero-features">
            <div className="ghl-feature-item">
              <span className="ghl-feature-icon">🎯</span>
              <span className="ghl-feature-text">14-Day Free Trial</span>
            </div>
            <div className="ghl-feature-item">
              <span className="ghl-feature-icon">🚀</span>
              <span className="ghl-feature-text">Full Platform Access</span>
            </div>
            <div className="ghl-feature-item">
              <span className="ghl-feature-icon">💼</span>
              <span className="ghl-feature-text">All-in-One CRM</span>
            </div>
            <div className="ghl-feature-item">
              <span className="ghl-feature-icon">🤖</span>
              <span className="ghl-feature-text">AI-Powered Tools</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GHLActivationHero;

