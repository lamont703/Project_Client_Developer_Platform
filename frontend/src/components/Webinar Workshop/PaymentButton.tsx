import React from 'react';
import '../../styles/Webinar Workshop/PaymentButton.css';

interface PaymentButtonProps {
  onClick: () => void;
}

const PaymentButton: React.FC<PaymentButtonProps> = ({ onClick }) => {
  return (
    <div className="payment-button-container" onClick={onClick}>
      <div className="payment-button-content">
        <div className="payment-badge">🎓 Live Workshop</div>
        
        <div className="payment-header">
          <div className="payment-price-section">
            <div className="price-wrapper">
              <span className="price-currency">Free</span>
            </div>
            <span className="price-label">Live Webinar Workshop</span>
          </div>
        </div>

        <button className="payment-cta-button">
          <div className="cta-content">
            <span className="cta-text">Reserve Your Spot</span>
            <span className="cta-subtext">Join the Workshop</span>
          </div>
        </button>

        <div className="payment-features">
          <div className="payment-feature">
            <span className="feature-check">✓</span>
            <span className="feature-text">Live Interactive Session</span>
          </div>
          <div className="payment-feature">
            <span className="feature-check">✓</span>
            <span className="feature-text">Exclusive Bonus for Attendees</span>
          </div>
          <div className="payment-feature">
            <span className="feature-check">✓</span>
            <span className="feature-text">Workshop Recording Included</span>
          </div>
        </div>

        <div className="payment-security">
          <span className="security-icon">🎯</span>
          <span className="security-text">Limited Spots Available • Reserve Now</span>
        </div>
      </div>
      <div className="payment-button-glow"></div>
      <div className="payment-shine"></div>
    </div>
  );
};

export default PaymentButton;


