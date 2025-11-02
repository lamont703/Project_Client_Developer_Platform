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
          From Zero to Freelance Full-Stack Developer
          <span className="hero-highlight"> in 8 Weeks</span>
        </h1>
        
        <p className="hero-subtitle">
          Learn the full-stack skills that clients actually hire for. Build a real, deployed application you can showcase to potential clients—while getting personalized 1-on-1 coaching designed to prepare you for freelance success.
        </p>
        
        <HeroVideo onScheduleClick={onScheduleClick} />
      </div>
    </section>
  );
};

export default WaitlistHero;
