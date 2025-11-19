import React from 'react';
import '../../styles/Book/HowItWorksSection.css';

const HowItWorksSection: React.FC = () => {
  const steps = [
    {
      number: 1,
      title: 'Purchase & Download',
      description: 'Get instant access to your digital copy of Blueprint To Freelance Freedom. Download immediately after purchase.',
      icon: '📥'
    },
    {
      number: 2,
      title: 'Read & Learn',
      description: 'Follow the step-by-step blueprint to understand how to break free from platforms and attract premium clients.',
      icon: '📚'
    },
    {
      number: 3,
      title: 'Implement & Succeed',
      description: 'Use the templates, checklists, and strategies to build your premium freelance business and start landing $5K+ projects.',
      icon: '🚀'
    }
  ];

  return (
    <section className="how-it-works">
      <div className="how-it-works-container">
        <div className="section-header">
          <h2 className="section-title">How It Works</h2>
          <p className="section-subtitle">
            Get started in three simple steps and begin your journey to freelance freedom
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

