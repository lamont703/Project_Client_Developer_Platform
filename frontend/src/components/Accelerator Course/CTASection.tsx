import React from 'react';
import '../../styles/Accelerator Course/CTASection.css';

interface CTASectionProps {
  onOpenPaymentModal?: () => void;
}

const CTASection: React.FC<CTASectionProps> = ({ onOpenPaymentModal }) => {
  const handleClick = () => {
    if (onOpenPaymentModal) {
      onOpenPaymentModal();
    } else {
      // Default behavior: navigate to checkout
      window.location.href = '/checkout?product=accelerator-course';
    }
  };

  return (
    <section className="accelerator-cta">
      <div className="cta-container">
        <div className="cta-content">
          <h2 className="cta-title">Ready to Scale Your Freelance Business to $50K+ Monthly?</h2>
          <p className="cta-subtitle">
            Join the Accelerator Course and get the advanced strategies, systems, and 1-on-1 coaching you need to take your business to the next level
          </p>
          <div className="cta-features">
            <div className="cta-feature">✓ Advanced course modules</div>
            <div className="cta-feature">✓ 1-on-1 coaching sessions</div>
            <div className="cta-feature">✓ AI automation systems</div>
            <div className="cta-feature">✓ Premium client strategies</div>
            <div className="cta-feature">✓ Business scaling frameworks</div>
            <div className="cta-feature">✓ Exclusive community access</div>
            <div className="cta-feature">✓ 100% money-back guarantee</div>
          </div>
          <button className="cta-button" onClick={handleClick}>
            Enroll in AI Freelance Accelerator for $1997
          </button>
          <p className="cta-guarantee">30-day money-back guarantee • Instant access • Lifetime updates</p>
        </div>
      </div>
    </section>
  );
};

export default CTASection;

