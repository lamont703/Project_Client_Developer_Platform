import React from 'react';
import '../../styles/GHL Activation/GHLSignupCTA.css';

const GHLSignupCTA: React.FC = () => {
  const affiliateLink = 'https://www.gohighlevel.com/?fp_ref=ai-freelance-community';

  const handleSignupClick = () => {
    // Open in new tab to preserve the current page
    window.open(affiliateLink, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="ghl-signup-cta-section">
      <div className="ghl-signup-container">
        <div className="ghl-signup-content">
          <div className="ghl-signup-badge">✨ Limited Time Offer</div>
          
          <h2 className="ghl-signup-title">Start Your 14-Day Free Trial</h2>
          <p className="ghl-signup-subtitle">
            No credit card required • Cancel anytime • Full platform access
          </p>
          
          <div className="ghl-signup-features">
            <div className="ghl-signup-feature">
              <span className="ghl-feature-check">✓</span>
              <span>All-in-one CRM and marketing platform</span>
            </div>
            <div className="ghl-signup-feature">
              <span className="ghl-feature-check">✓</span>
              <span>Unlimited contacts and users</span>
            </div>
            <div className="ghl-signup-feature">
              <span className="ghl-feature-check">✓</span>
              <span>Website and funnel builder included</span>
            </div>
            <div className="ghl-signup-feature">
              <span className="ghl-feature-check">✓</span>
              <span>24/7 support and community access</span>
            </div>
          </div>
          
          <button 
            className="ghl-signup-button"
            onClick={handleSignupClick}
            aria-label="Start your GoHighLevel free trial"
          >
            <span className="ghl-button-text">Start Your Free Trial Now</span>
            <span className="ghl-button-subtext">No Credit Card Required</span>
          </button>
          
          <p className="ghl-signup-note">
            By clicking above, you'll be taken to GoHighLevel's signup page. 
            Your trial starts immediately after registration.
          </p>
          
          <div className="ghl-security-badge">
            <span className="ghl-security-icon">🔒</span>
            <span className="ghl-security-text">Secure Signup • Trusted by 2M+ Businesses</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GHLSignupCTA;

