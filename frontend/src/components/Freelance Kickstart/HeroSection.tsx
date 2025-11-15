import React, { useState, useRef } from 'react';
import '../../styles/Freelance Kickstart/HeroSection.css';
import PaymentButton from './PaymentButton';

interface HeroSectionProps {
  onOpenPaymentModal: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onOpenPaymentModal }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
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
    <section className="freelance-kickstart-hero">
      <div className="hero-container">
        <h1 className="hero-title">
          Live anywhere, work anytime, afford anything, while using A.I. for everything! Start an A.I. Freelance Business in 10 days and join the modern day A.I. revolution.
        </h1>
        
        <p className="hero-subtitle">
          If you complete it and you're not satisfied, we'll give you 100% of your money back.
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
                  <p className="video-overlay-text">Watch Introduction</p>
                </div>
              </div>
            )}
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

