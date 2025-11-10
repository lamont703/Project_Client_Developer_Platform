import React from 'react';
import '../../styles/Freelance Kickstart/HeroSection.css';
import PaymentButton from './PaymentButton';

interface HeroSectionProps {
  onOpenPaymentModal: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onOpenPaymentModal }) => {
  return (
    <section className="freelance-kickstart-hero">
      <div className="hero-container">
        <h1 className="hero-title">
          Live anywhere, work anytime, afford anything, while using A.I. for everything! Start an A.I. Freelance Business in 10 days and join the modern day A.I. revolution.
        </h1>
        
        <p className="hero-subtitle">
          If you complete it and you're not satisfied, we'll give you 100% of your money back.
        </p>
        
        <div className="hero-video-section">
          <div className="hero-video-placeholder">
            {/* Video will be embedded here */}
            <div className="video-placeholder-content">
              <div className="play-icon">▶</div>
              <p className="video-placeholder-text">Video Coming Soon</p>
            </div>
          </div>
        </div>
        
        <PaymentButton onClick={onOpenPaymentModal} />
        
        <div className="hero-features">
          <div className="feature-item">
            <span className="feature-icon">🤖</span>
            <span className="feature-text">AI Tools Mastery</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">💼</span>
            <span className="feature-text">Freelance Guidance</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">⚡</span>
            <span className="feature-text">14-Day Trial</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">👥</span>
            <span className="feature-text">Supportive Community</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

