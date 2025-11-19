import React from 'react';
import '../../styles/Book/WhoIsThisForSection.css';

const WhoIsThisForSection: React.FC = () => {
  const targetAudiences = [
    'Freelancers stuck on Fiverr or Upwork',
    'Beginners wanting to start freelancing the right way',
    'Creators looking to monetize their skills',
    '9–5 workers wanting freelance freedom',
    'Developers wanting to offer premium AI services',
    'Anyone wanting to build a real online service business'
  ];

  return (
    <section className="who-is-this-for">
      <div className="who-is-this-for-container">
        <div className="section-header">
          <h2 className="section-title">Who Is This For?</h2>
          <p className="section-subtitle">
            This blueprint is perfect for you if you are:
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

