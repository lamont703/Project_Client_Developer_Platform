import React, { useState } from 'react';
import '../../styles/Coding Education/WaitlistHero.css';
import WaitlistForm from './WaitlistForm';

interface WaitlistHeroProps {
  showWaitlistModal?: boolean;
  handleOpenWaitlist?: () => void;
  handleCloseWaitlist?: () => void;
}

const WaitlistHero: React.FC<WaitlistHeroProps> = ({ 
  showWaitlistModal: externalShowWaitlistModal,
  handleOpenWaitlist: externalHandleOpenWaitlist,
  handleCloseWaitlist: externalHandleCloseWaitlist
}) => {
  const [internalShowWaitlistModal, setInternalShowWaitlistModal] = useState(false);

  const handleOpenWaitlist = () => {
    if (externalHandleOpenWaitlist) {
      externalHandleOpenWaitlist();
    } else {
      setInternalShowWaitlistModal(true);
    }
  };

  const handleCloseWaitlist = () => {
    if (externalHandleCloseWaitlist) {
      externalHandleCloseWaitlist();
    } else {
      setInternalShowWaitlistModal(false);
    }
  };

  const isModalOpen = externalShowWaitlistModal !== undefined ? externalShowWaitlistModal : internalShowWaitlistModal;

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
        
        <div className="hero-features">
          <div className="feature-item">
            <span className="feature-icon">✋</span>
            <span>Complete Beginners Welcome</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">👨‍🏫</span>
            <span>Personal 1-on-1 Coaching</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">⏰</span>
            <span>Short 5-10 Min Sessions</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">🚀</span>
            <span>Live Deployed Project</span>
          </div>
        </div>
        
        <button className="hero-cta-button" onClick={handleOpenWaitlist}>
          Join the Waitlist
        </button>
      </div>
      
      {isModalOpen && (
        <div className="modal-overlay" onClick={handleCloseWaitlist}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={handleCloseWaitlist}>×</button>
            <WaitlistForm />
          </div>
        </div>
      )}
    </section>
  );
};

export default WaitlistHero;
