import React from 'react';
import '../../styles/Freelance Kickstart/HowItWorksSection.css';

const HowItWorksSection: React.FC = () => {
  const steps = [
    {
      number: 1,
      title: 'Sign Up',
      description: 'Join the 10-day Kickstart for $497 and get instant access to all materials and the GoHighLevel trial.',
      icon: '📝'
    },
    {
      number: 2,
      title: 'Follow Daily Lessons',
      description: 'Complete daily lessons, set up your GoHighLevel account, and learn to use AI tools effectively in your freelance work.',
      icon: '📖'
    },
    {
      number: 3,
      title: 'Start Freelancing',
      description: 'Apply what you learn and see real results in 10 days. Begin taking on clients with confidence using your new AI-powered skills.',
      icon: '🚀'
    }
  ];

  return (
    <section className="how-it-works">
      <div className="how-it-works-container">
        <div className="section-header">
          <h2 className="section-title">How It Works</h2>
          <p className="section-subtitle">
            Get started in three simple steps and begin your AI freelance journey today
          </p>
        </div>
        
        <div className="steps-container">
          {steps.map((step, index) => (
            <div key={step.number} className="step-card">
              <div className="step-number">{step.number}</div>
              <div className="step-icon">{step.icon}</div>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-description">{step.description}</p>
              {index < steps.length - 1 && <div className="step-connector">→</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;

