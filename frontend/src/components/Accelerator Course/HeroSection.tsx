import React from 'react';
import '../../styles/Accelerator Course/HeroSection.css';
import PaymentButton from './PaymentButton';

interface HeroSectionProps {
  onOpenPaymentModal: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onOpenPaymentModal }) => {
  return (
    <section className="accelerator-hero">
      <div className="hero-container">
        <h1 className="hero-title">
          AI Freelance Accelerator Course
        </h1>
        
        <p className="hero-subtitle">
          The Complete System to Scale Your Freelance Business from $5K to $50K+ Monthly Using AI-Powered Strategies, Advanced Client Acquisition, and Proven Business Systems
        </p>
        
        <p className="hero-description">
          This comprehensive course builds on the 10-Day Kickstart and Blueprint book, taking you from beginner to high-earning freelancer with advanced strategies, personalized coaching, and proven systems that work.
        </p>
        
        <PaymentButton onClick={onOpenPaymentModal} />
        
        <div className="hero-features">
          <div className="feature-item">
            <span className="feature-icon">🚀</span>
            <span className="feature-text">Scale to $50K+ Monthly</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">🎯</span>
            <span className="feature-text">Advanced Client Systems</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">🤖</span>
            <span className="feature-text">AI Automation Mastery</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">💼</span>
            <span className="feature-text">1-on-1 Coaching</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

