import React from 'react';
import '../../styles/Webinar Workshop/CTASection.css';

interface CTASectionProps {
  onOpenPaymentModal?: () => void;
}

const CTASection: React.FC<CTASectionProps> = ({ onOpenPaymentModal }) => {
  const handleClick = () => {
    if (onOpenPaymentModal) {
      onOpenPaymentModal();
    } else {
      // Default behavior: navigate to checkout
      window.location.href = '/checkout?product=webinar-workshop';
    }
  };

  return (
    <section className="webinar-cta">
      <div className="cta-container">
        <div className="cta-content">
          <h2 className="cta-title">Ready to Master AI Freelance Concepts?</h2>
          <p className="cta-subtitle">
            Join our live workshop and understand the "what" and "why" that will transform your freelance career
          </p>
          <div className="cta-features">
            <div className="cta-feature">✓ Live interactive workshop</div>
            <div className="cta-feature">✓ Learn core concepts and strategies</div>
            <div className="cta-feature">✓ Understand the "what" and "why"</div>
            <div className="cta-feature">✓ Live Q&A session</div>
            <div className="cta-feature">✓ Workshop recording included</div>
            <div className="cta-feature">✓ Exclusive bonus for attendees</div>
          </div>
          <button className="cta-button" onClick={handleClick}>
            Reserve Your Spot Now
          </button>
          <p className="cta-guarantee">Limited spots available • Don't miss out on the bonus</p>
        </div>
      </div>
    </section>
  );
};

export default CTASection;


