import React from 'react';
import '../../styles/Webinar Workshop/HowItWorksSection.css';

const HowItWorksSection: React.FC = () => {
  const steps = [
    {
      number: 1,
      title: 'Register for the Workshop',
      description: 'Secure your spot in our live webinar workshop. You\'ll receive confirmation and calendar reminders to ensure you don\'t miss it.',
      icon: '📝'
    },
    {
      number: 2,
      title: 'Attend the Live Workshop',
      description: 'Join us live for an interactive session where we dive deep into the "what" and "why" of AI freelancing. Participate in Q&A and engage with the community.',
      icon: '🎓'
    },
    {
      number: 3,
      title: 'Claim Your Special Bonus',
      description: 'As a workshop attendee, you\'ll receive an exclusive bonus that complements the 10-Day AI Freelance Kickstart. Details revealed during the workshop!',
      icon: '🎁'
    },
    {
      number: 4,
      title: 'Apply What You Learned',
      description: 'Use your new understanding of concepts and strategies to maximize your success with the 10-Day AI Freelance Kickstart or start your freelance journey.',
      icon: '🚀'
    }
  ];

  return (
    <section className="webinar-how-it-works">
      <div className="how-it-works-container">
        <div className="section-header">
          <h2 className="section-title">How It Works</h2>
          <p className="section-subtitle">
            Join our workshop in four simple steps
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











