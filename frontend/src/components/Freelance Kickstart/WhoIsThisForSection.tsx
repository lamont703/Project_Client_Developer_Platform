import React from 'react';
import '../../styles/Freelance Kickstart/WhoIsThisForSection.css';

const WhoIsThisForSection: React.FC = () => {
  const targetAudiences = [
    'A freelancer stuck on Fiverr or Upwork',
    'A beginner wanting to use AI for income',
    'A creator who wants a monetizable skill',
    'A 9–5 worker wanting freelance freedom',
    'A developer wanting to offer AI services',
    'Anyone wanting to build a real online service business'
  ];

  return (
    <section className="who-is-this-for">
      <div className="who-is-this-for-container">
        <div className="section-header">
          <h2 className="section-title">Who Is This For?</h2>
          <p className="section-subtitle">
            This is for you if you are:
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

