import React from 'react';
import '../../styles/Accelerator Course/WhoIsThisForSection.css';

const WhoIsThisForSection: React.FC = () => {
  const targetAudiences = [
    'Freelancers who completed the 10-Day Kickstart',
    'Freelancers already earning $5K+ monthly',
    'Those ready to scale to $50K+ monthly',
    'Freelancers wanting 1-on-1 coaching support',
    'Business owners ready to systematize operations',
    'Anyone serious about building a premium freelance business'
  ];

  return (
    <section className="who-is-this-for">
      <div className="who-is-this-for-container">
        <div className="section-header">
          <h2 className="section-title">Who Is This For?</h2>
          <p className="section-subtitle">
            This accelerator course is perfect for you if you are:
          </p>
        </div>
        
        <div className="audience-list">
          {targetAudiences.map((audience, index) => (
            <div key={index} className="audience-item">
              <div className="audience-icon">✓</div>
              <p className="audience-text">{audience}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhoIsThisForSection;

