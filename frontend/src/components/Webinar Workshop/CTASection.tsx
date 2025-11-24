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
          <h2 className="cta-title">Ready to Escape Lowball Clients and Platform Fees?</h2>
          <p className="cta-subtitle">
            Join our live workshop and learn the AI-freelancing system that gets you $5K+ clients — fast. Stop competing on price and start attracting clients who pay $5K or higher per project.
          </p>
          <div className="cta-features">
            <div className="cta-feature">✓ Learn to escape 20% platform fees</div>
            <div className="cta-feature">✓ Attract $5K+ clients who pay premium rates</div>
            <div className="cta-feature">✓ Get results fast with proven system</div>
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


