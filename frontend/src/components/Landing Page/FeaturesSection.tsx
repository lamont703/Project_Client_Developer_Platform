import React from 'react';

const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: '🎯',
      title: 'Professional Prototype',
      description: 'Get a fully functional prototype that demonstrates your idea\'s core value proposition and user experience.',
      benefits: ['Interactive UI/UX', 'Core functionality', 'User testing ready', 'Technical specifications']
    },
    {
      icon: '📊',
      title: 'Investor-Ready Pitch Deck',
      description: 'Receive a compelling pitch deck that tells your story and convinces investors to fund your vision.',
      benefits: ['Market analysis', 'Financial projections', 'Competitive landscape', 'Funding requirements']
    },
    {
      icon: '⚡',
      title: 'Fast Delivery',
      description: 'Get your prototype and pitch deck delivered in just 2-3 weeks, not months.',
      benefits: ['2-3 week turnaround', 'Regular updates', 'Unlimited revisions', 'Direct communication']
    },
    {
      icon: '🎨',
      title: 'Design Excellence',
      description: 'Professional design that makes your idea stand out from the competition.',
      benefits: ['Modern UI design', 'Brand identity', 'Visual storytelling', 'Professional polish']
    },
    {
      icon: '💡',
      title: 'Strategic Guidance',
      description: 'Expert advice on positioning your idea for maximum market impact and investor appeal.',
      benefits: ['Market positioning', 'Value proposition', 'Go-to-market strategy', 'Investor insights']
    },
    {
      icon: '🔄',
      title: 'Iterative Process',
      description: 'Collaborative approach with regular feedback loops to ensure your vision is perfectly captured.',
      benefits: ['Weekly check-ins', 'Feedback integration', 'Flexible scope', 'Continuous improvement']
    }
  ];

  return (
    <div className="features-section">
      <div className="features-container">
        <div className="features-header">
          <h2 className="features-title">Why Choose Our Prototype + Pitch Deck Service?</h2>
          <p className="features-subtitle">
            We're the first essential step for anyone with a tech idea. Our comprehensive service transforms your concept into a professional, fundable reality.
          </p>
        </div>
        
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
              <ul className="feature-benefits">
                {feature.benefits.map((benefit, benefitIndex) => (
                  <li key={benefitIndex} className="benefit-item">
                    <span className="benefit-icon">✓</span>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="features-cta">
          <div className="cta-content">
            <h3>Ready to Transform Your Idea?</h3>
            <p>Join our exclusive waitlist and be among the first to experience our prototype + pitch deck service.</p>
            <button 
              onClick={() => document.getElementById('waitlist-form')?.scrollIntoView({ behavior: 'smooth' })}
              className="cta-button"
            >
              Join Waitlist Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
