import React from 'react';
import '../../styles/Coding Education/WaitlistHero.css';
import HeroVideo from './HeroVideo';

interface WaitlistHeroProps {
  onScheduleClick?: () => void;
}

const WaitlistHero: React.FC<WaitlistHeroProps> = ({ onScheduleClick }) => {
  return (
    <section className="waitlist-hero">
      <div className="hero-container">
        <h1 className="hero-title">
          AI-Powered Full-Stack Freelancer Accelerator
          <span className="hero-highlight"> (8 Weeks)</span>
        </h1>
        
        <p className="hero-subtitle">
          Learn to code, ship, and sell full-stack software solutions with AI as your teammate. Most "AI-powered coding bootcamps" teach you how to code, but not how to make money as a developer. We produce independent, income-ready devs, not just job seekers.
        </p>
        
        <HeroVideo onScheduleClick={onScheduleClick} />
      </div>
    </section>
  );
};

export default WaitlistHero;
