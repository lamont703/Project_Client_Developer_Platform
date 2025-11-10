import React from 'react';
import '../../styles/GHL Activation/GHLBenefits.css';

const GHLBenefits: React.FC = () => {
  return (
    <section className="ghl-benefits-section">
      <div className="ghl-benefits-container">
        <h2 className="ghl-section-title">What You'll Get with GoHighLevel</h2>
        <p className="ghl-section-subtitle">
          Everything you need to automate and scale your freelance business
        </p>
        
        <div className="ghl-benefits-grid">
          <div className="ghl-benefit-card">
            <div className="ghl-benefit-icon">📧</div>
            <h3 className="ghl-benefit-title">Multi-Channel Messaging</h3>
            <p className="ghl-benefit-description">
              Connect with clients via SMS, email, Facebook Messenger, and more—all in one place.
            </p>
          </div>
          
          <div className="ghl-benefit-card">
            <div className="ghl-benefit-icon">📅</div>
            <h3 className="ghl-benefit-title">Automated Booking</h3>
            <p className="ghl-benefit-description">
              Let clients book appointments automatically without any manual scheduling.
            </p>
          </div>
          
          <div className="ghl-benefit-card">
            <div className="ghl-benefit-icon">🌐</div>
            <h3 className="ghl-benefit-title">Website & Funnel Builder</h3>
            <p className="ghl-benefit-description">
              Create stunning landing pages, websites, and sales funnels without coding.
            </p>
          </div>
          
          <div className="ghl-benefit-card">
            <div className="ghl-benefit-icon">📊</div>
            <h3 className="ghl-benefit-title">Pipeline Management</h3>
            <p className="ghl-benefit-description">
              Track leads, manage deals, and close more clients with visual pipeline tools.
            </p>
          </div>
          
          <div className="ghl-benefit-card">
            <div className="ghl-benefit-icon">💰</div>
            <h3 className="ghl-benefit-title">Payment Collection</h3>
            <p className="ghl-benefit-description">
              Accept payments directly through your website, funnels, and booking system.
            </p>
          </div>
          
          <div className="ghl-benefit-card">
            <div className="ghl-benefit-icon">🤝</div>
            <h3 className="ghl-benefit-title">Community Access</h3>
            <p className="ghl-benefit-description">
              Join thousands of successful marketers and freelancers in the HighLevel community.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GHLBenefits;

