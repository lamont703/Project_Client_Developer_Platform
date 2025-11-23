import React from 'react';
import '../../styles/Webinar Workshop/BonusSection.css';

const BonusSection: React.FC = () => {
  return (
    <section className="webinar-bonus">
      <div className="bonus-container">
        <div className="bonus-header">
          <div className="bonus-badge">🎁 Exclusive Workshop Bonus</div>
          <h2 className="bonus-title">Special Bonus for Workshop Attendees</h2>
          <p className="bonus-subtitle">
            As a thank you for attending our live workshop, you'll receive an exclusive bonus that 
            perfectly complements the 10-Day AI Freelance Kickstart
          </p>
        </div>
        
        <div className="bonus-content">
          <div className="bonus-card featured-bonus">
            <div className="bonus-card-icon">🎯</div>
            <h3 className="bonus-card-title">Workshop Attendee Exclusive Bonus</h3>
            <p className="bonus-card-description">
              Attendees of this live workshop will receive a special bonus package designed to 
              accelerate their AI freelance journey. This bonus is only available to those who 
              attend the live session.
            </p>
            <div className="bonus-features">
              <div className="bonus-feature">
                <span className="feature-check">✓</span>
                <span className="feature-text">Exclusive resource library</span>
              </div>
              <div className="bonus-feature">
                <span className="feature-check">✓</span>
                <span className="feature-text">Priority access to community</span>
              </div>
              <div className="bonus-feature">
                <span className="feature-check">✓</span>
                <span className="feature-text">Special pricing on the 10-Day Kickstart</span>
              </div>
              <div className="bonus-feature">
                <span className="feature-check">✓</span>
                <span className="feature-text">Bonus materials and templates</span>
              </div>
            </div>
            <div className="bonus-note">
              <p>✨ Bonus details will be revealed during the live workshop ✨</p>
            </div>
          </div>
        </div>
        
        <div className="bonus-cta-note">
          <p>
            <strong>Important:</strong> To claim your bonus, you must attend the live workshop. 
            The bonus will be provided at the end of the session.
          </p>
        </div>
      </div>
    </section>
  );
};

export default BonusSection;


