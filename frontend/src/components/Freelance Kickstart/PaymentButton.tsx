import React from 'react';
import '../../styles/Freelance Kickstart/PaymentButton.css';

interface PaymentButtonProps {
  onClick: () => void;
}

const PaymentButton: React.FC<PaymentButtonProps> = ({ onClick }) => {
  return (
    <div className="payment-button-container" onClick={onClick}>
      <div className="payment-button-content">
        <div className="payment-badge">✨ Limited Time Offer</div>
        
        <div className="payment-header">
          <div className="payment-price-section">
            <div className="original-price-wrapper">
              <span className="original-price">$197</span>
            </div>
            <div className="price-wrapper">
              <span className="price-currency">$</span>
              <span className="price-amount">50</span>
            </div>
            <span className="price-label">One-Time Payment</span>
          </div>
        </div>

        <button className="payment-cta-button">
          <div className="cta-content">
            <span className="cta-text">Start Your 10-Day Journey Now</span>
            <span className="cta-subtext">Start Here</span>
          </div>
        </button>

        <div className="payment-features">
          <div className="payment-feature">
            <span className="feature-check">✓</span>
            <span className="feature-text">10-Day Kickstart</span>
          </div>
          <div className="payment-feature">
            <span className="feature-check">✓</span>
            <span className="feature-text">14-Day GoHighLevel Trial</span>
          </div>
          <div className="payment-feature">
            <span className="feature-check">✓</span>
            <span className="feature-text">100% Money-Back Guarantee</span>
          </div>
        </div>

        <div className="payment-security">
          <span className="security-icon">🔒</span>
          <span className="security-text">Secure Payment • Instant Access</span>
        </div>
      </div>
      <div className="payment-button-glow"></div>
      <div className="payment-shine"></div>
    </div>
  );
};

export default PaymentButton;

