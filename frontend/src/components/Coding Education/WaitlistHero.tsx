import React from 'react';
import '../../styles/Coding Education/WaitlistHero.css';
import HeroVideo from './HeroVideo';

const WaitlistHero: React.FC = () => {
  return (
    <section className="waitlist-hero">
      <div className="hero-container">
        <h1 className="hero-title">
          From Zero to Deployed App
          <span className="hero-highlight"> in 8 Weeks</span>
        </h1>
        
        <p className="hero-subtitle">
          Take complete beginners from zero coding experience to deploying their own live web application. 
          Hands-on instruction, real-world projects, and modern development tools with personalized 1-on-1 coaching.
        </p>
        
        <HeroVideo />
      </div>
    </section>
  );
};

export default WaitlistHero;
