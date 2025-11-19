import React from 'react';
import '../../styles/Book/HeroSection.css';
import PaymentButton from './PaymentButton';

interface HeroSectionProps {
  onOpenPaymentModal: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onOpenPaymentModal }) => {
  return (
    <section className="book-hero">
      <div className="hero-container">
        <div className="book-cover-hero">
          <img 
            src="/Book Cover.PNG" 
            alt="Blueprint To Freelance Freedom Book Cover" 
            className="book-cover-main"
          />
        </div>
        
        <h1 className="hero-title">
          Blueprint To Freelance Freedom: Breaking Free From Platforms And Landing Premium Clients Using AI Systems
        </h1>
        
        <p className="hero-subtitle">
          Learn the proven system to escape platforms like Fiverr and Upwork, attract premium clients, and build a thriving freelance business using AI-powered tools and strategies.
        </p>
        
        <p className="hero-description">
          Discover how to close $5K+ projects without relying on platforms. Get the complete blueprint to build a real online service business that works for you.
        </p>
        
        <PaymentButton onClick={onOpenPaymentModal} />
        
        <div className="hero-features">
          <div className="feature-item">
            <span className="feature-icon">🚀</span>
            <span className="feature-text">Break Free From Platforms</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">💰</span>
            <span className="feature-text">Land Premium Clients</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">🤖</span>
            <span className="feature-text">AI-Powered Systems</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">📈</span>
            <span className="feature-text">Scale Your Business</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

