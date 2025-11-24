import React, { useState, useRef } from 'react';
import '../../styles/Webinar Workshop/HeroSection.css';
import PaymentButton from './PaymentButton';

interface HeroSectionProps {
  onOpenPaymentModal: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onOpenPaymentModal }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoUrl = 'https://storage.googleapis.com/msgsndr/QLyYYRoOhCg65lKW9HDX/media/6923b1284da788e40dbb258a.mp4';
  const thumbnailUrl = 'https://storage.googleapis.com/msgsndr/QLyYYRoOhCg65lKW9HDX/media/6923b4bec7f3f5226ecd9561.png';

  const handlePlayClick = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
      setShowControls(true);
    }
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handlePlay = () => {
    setIsPlaying(true);
  };

  return (
    <section className="webinar-workshop-hero">
      <div className="hero-container">
        <div className="hero-badge">🎓 Live Interactive Workshop</div>
        
        <h1 className="hero-title">
          Tired of Lowball Clients and 20% Platform Fees?
        </h1>
        
        <p className="hero-subtitle">
          Learn the AI-Freelancing System That Gets You $5K+ Clients — Fast. Join our live workshop and discover how to escape platforms like Fiverr and Upwork, eliminate fees, and attract clients who pay $5K or higher per project.
        </p>
        
        <div className="hero-video-section">
          <div className="hero-video-wrapper">
            <video
              ref={videoRef}
              src={videoUrl}
              poster={thumbnailUrl}
              className="hero-video"
              controls={showControls}
              onPause={handlePause}
              onPlay={handlePlay}
              playsInline
              preload="metadata"
            >
              Your browser does not support the video tag.
            </video>
            {!isPlaying && (
              <div className="hero-video-overlay" onClick={handlePlayClick}>
                <div className="video-overlay-content">
                  <div className="play-icon">▶</div>
                  <p className="video-overlay-text">Watch Workshop Preview</p>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <p className="hero-description">
          Stop competing on price. Stop paying platform fees. Start attracting clients who pay $5K or higher per project. This workshop reveals the AI-freelancing system that gets you $5K+ clients — fast.
        </p>
        
        <PaymentButton onClick={onOpenPaymentModal} />
        
        <div className="hero-features">
          <div className="feature-item">
            <span className="feature-icon">💰</span>
            <span className="feature-text">Escape 20% Platform Fees</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">🎯</span>
            <span className="feature-text">Attract $5K+ Clients</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">⚡</span>
            <span className="feature-text">Get Results Fast</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">🤖</span>
            <span className="feature-text">AI-Freelancing System</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;


