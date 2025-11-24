import React from 'react';
import '../../styles/Webinar Workshop/WhoIsThisForSection.css';

const WhoIsThisForSection: React.FC = () => {
  const targetAudiences = [
    'Tired of lowball clients who don\'t value your work',
    'Sick of paying 20% platform fees on every project',
    'Stuck on Fiverr or Upwork competing on price',
    'Ready to attract clients who pay $5K or higher per project',
    'Want to escape the race to the bottom',
    'Looking for a system that gets $5K+ clients fast',
    'A freelancer ready to break free from platforms',
    'Someone who wants to build a real freelance business with premium clients'
  ];

  return (
    <section className="webinar-who-is-this-for">
      <div className="who-is-this-for-container">
        <div className="section-header">
          <h2 className="section-title">Who Is This For?</h2>
          <p className="section-subtitle">
            This workshop is perfect for you if you are:
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


