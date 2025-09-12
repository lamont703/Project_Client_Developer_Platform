import React from 'react';

const StatsSection: React.FC = () => {
  const stats = [
    {
      number: '500+',
      label: 'Ideas Validated',
      description: 'Successful project validations'
    },
    {
      number: '95%',
      label: 'Success Rate',
      description: 'Projects that secured funding'
    },
    {
      number: '2-3',
      label: 'Weeks Delivery',
      description: 'Average turnaround time'
    },
    {
      number: '24/7',
      label: 'Support',
      description: 'Dedicated project support'
    }
  ];

  return (
    <div className="stats-section">
      <div className="stats-container">
        <div className="stats-header">
          <h2 className="stats-title">Trusted by Innovators Worldwide</h2>
          <p className="stats-subtitle">
            Our track record speaks for itself. Join hundreds of successful entrepreneurs who transformed their ideas into reality.
          </p>
        </div>
        
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-number">{stat.number}</div>
              <div className="stat-label">{stat.label}</div>
              <div className="stat-description">{stat.description}</div>
            </div>
          ))}
        </div>
        
        <div className="testimonials">
          <h3 className="testimonials-title">What Our Clients Say</h3>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-content">
                "The prototype and pitch deck they created helped me secure $500K in seed funding. Absolutely worth every penny!"
              </div>
              <div className="testimonial-author">
                <div className="author-name">Sarah Chen</div>
                <div className="author-title">Founder, TechStart</div>
              </div>
            </div>
            
            <div className="testimonial-card">
              <div className="testimonial-content">
                "Professional, fast, and incredibly detailed. They understood my vision better than I did!"
              </div>
              <div className="testimonial-author">
                <div className="author-name">Marcus Rodriguez</div>
                <div className="author-title">CEO, InnovateLab</div>
              </div>
            </div>
            
            <div className="testimonial-card">
              <div className="testimonial-content">
                "From idea to investor-ready presentation in just 3 weeks. The quality exceeded all my expectations."
              </div>
              <div className="testimonial-author">
                <div className="author-name">Emily Johnson</div>
                <div className="author-title">Founder, FutureTech</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="cta-section">
          <div className="cta-content">
            <h3>Don't Miss Your Chance</h3>
            <p>Only 10 spots available each month. Join our waitlist today and be the first to know when spots open up.</p>
            <button 
              onClick={() => document.getElementById('waitlist-form')?.scrollIntoView({ behavior: 'smooth' })}
              className="cta-button"
            >
              Secure Your Spot
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsSection;
