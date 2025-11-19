import React from 'react';
import '../../styles/Book/CTASection.css';

interface CTASectionProps {
  onOpenPaymentModal?: () => void;
}

const CTASection: React.FC<CTASectionProps> = ({ onOpenPaymentModal }) => {
  const handleClick = () => {
    if (onOpenPaymentModal) {
      onOpenPaymentModal();
    } else {
      // Default behavior: navigate to checkout
      window.location.href = '/checkout?product=blueprint-book';
    }
  };

  return (
    <section className="book-cta">
      <div className="cta-container">
        <div className="cta-content">
          <h2 className="cta-title">Ready to Break Free From Platforms?</h2>
          <p className="cta-subtitle">
            Join hundreds of freelancers who are already using this blueprint to build premium freelance businesses
          </p>
          <div className="cta-features">
            <div className="cta-feature">✓ Complete step-by-step blueprint</div>
            <div className="cta-feature">✓ AI systems & tools guide</div>
            <div className="cta-feature">✓ Premium client strategies</div>
            <div className="cta-feature">✓ Ready-to-use templates</div>
            <div className="cta-feature">✓ Lifetime updates included</div>
            <div className="cta-feature">✓ 100% money-back guarantee</div>
          </div>
          <button className="cta-button" onClick={handleClick}>
            Get Blueprint To Freelance Freedom for $29
          </button>
          <p className="cta-guarantee">30-day money-back guarantee • Instant access</p>
        </div>
      </div>
    </section>
  );
};

export default CTASection;

