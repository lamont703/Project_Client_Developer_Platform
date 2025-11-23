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
  // You can update these URLs with your webinar video
  const videoUrl = 'https://storage.googleapis.com/msgsndr/QLyYYRoOhCg65lKW9HDX/media/691808c861d44d48969d1e89.mov';
  const thumbnailUrl = 'https://storage.googleapis.com/msgsndr/QLyYYRoOhCg65lKW9HDX/media/69180aa3964b865ac7beeb45.jpg';

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
          Master the "What" and "Why" Behind AI Freelancing
        </h1>
        
        <p className="hero-subtitle">
          Join our live webinar workshop and discover the foundational concepts that make the 10-Day AI Freelance Kickstart so powerful. Understand the principles before you implement them.
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
          Learn the core concepts, strategies, and mindset shifts that separate successful AI freelancers from those stuck on platforms like Fiverr and Upwork.
        </p>
        
        <PaymentButton onClick={onOpenPaymentModal} />
        
        <div className="hero-features">
          <div className="feature-item">
            <span className="feature-icon">🎯</span>
            <span className="feature-text">Understand Core Concepts</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">💡</span>
            <span className="feature-text">Learn the "Why" Behind Strategies</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">🎁</span>
            <span className="feature-text">Exclusive Bonus for Attendees</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">🤝</span>
            <span className="feature-text">Live Q&A Session</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;


