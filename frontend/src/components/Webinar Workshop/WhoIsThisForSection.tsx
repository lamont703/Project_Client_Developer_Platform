import React from 'react';
import '../../styles/Webinar Workshop/WhoIsThisForSection.css';

const WhoIsThisForSection: React.FC = () => {
  const targetAudiences = [
    'Someone considering the 10-Day AI Freelance Kickstart',
    'A freelancer who wants to understand the "why" behind strategies',
    'A beginner who needs foundational concepts before implementation',
    'Someone who learns better by understanding principles first',
    'A freelancer stuck on platforms wanting to understand alternatives',
    'Anyone who wants to make informed decisions about their freelance career',
    'Someone who values strategic understanding over just tactics',
    'A freelancer ready to think bigger about their business'
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


