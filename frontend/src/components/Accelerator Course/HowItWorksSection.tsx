import React from 'react';
import '../../styles/Accelerator Course/HowItWorksSection.css';

const HowItWorksSection: React.FC = () => {
  const steps = [
    {
      number: 1,
      title: 'Enroll & Get Access',
      description: 'Enroll in the Accelerator Course and get immediate access to all course materials, community, and schedule your first coaching session.',
      icon: '🎓'
    },
    {
      number: 2,
      title: 'Complete Modules & Implement',
      description: 'Work through the advanced course modules at your own pace while implementing strategies in your business. Get support from coaches and community.',
      icon: '📖'
    },
    {
      number: 3,
      title: 'Scale Your Business',
      description: 'Apply the advanced systems, automation, and strategies to scale your freelance business to $50K+ monthly with ongoing coaching support.',
      icon: '🚀'
    }
  ];

  return (
    <section className="how-it-works">
      <div className="how-it-works-container">
        <div className="section-header">
          <h2 className="section-title">How It Works</h2>
          <p className="section-subtitle">
            Your path to scaling your freelance business to $50K+ monthly
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

