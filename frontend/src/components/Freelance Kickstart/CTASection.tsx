import React from 'react';
import '../../styles/Freelance Kickstart/CTASection.css';

interface CTASectionProps {
  onOpenPaymentModal?: () => void;
}

const CTASection: React.FC<CTASectionProps> = ({ onOpenPaymentModal }) => {
  const handleClick = () => {
    if (onOpenPaymentModal) {
      onOpenPaymentModal();
    } else {
      // Default behavior: navigate to checkout
      // You can replace this with your actual checkout URL
      window.location.href = '/checkout?product=10day-kickstart';
    }
  };

  return (
    <section className="kickstart-cta">
      <div className="cta-container">
        <div className="cta-content">
          <h2 className="cta-title">Ready to Launch Your AI Freelance Career?</h2>
          <p className="cta-subtitle">
            Join hundreds of freelancers who are already using AI tools to work smarter and grow their businesses
          </p>
          <div className="cta-features">
            <div className="cta-feature">✓ 10 days of theory + practical lessons</div>
            <div className="cta-feature">✓ Live screen share demonstrations</div>
            <div className="cta-feature">✓ Worksheets & checklists</div>
            <div className="cta-feature">✓ Private freelancer community</div>
            <div className="cta-feature">✓ Tech support included</div>
            <div className="cta-feature">✓ 14-day GoHighLevel trial</div>
          </div>
          <button className="cta-button" onClick={handleClick}>
            Join the 10-Day AI Freelance Kickstart for $497
          </button>
          <p className="cta-guarantee">30-day money-back guarantee • Cancel anytime</p>
        </div>
      </div>
    </section>
  );
};

export default CTASection;

