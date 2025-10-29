import React, { useState } from 'react';
import '../../styles/Coding Education/HeroVideo.css';

interface HeroVideoProps {
  videoId?: string; // YouTube video ID or URL
}

const HeroVideo: React.FC<HeroVideoProps> = ({ videoId = 'YOUR_HERO_VIDEO_ID' }) => {
  const [showVideo, setShowVideo] = useState(false);
  const [watched, setWatched] = useState(false);

  // Handle if videoId is a YouTube URL or just an ID
  const getVideoEmbedUrl = (id: string) => {
    // If it's already a full URL, extract the ID
    if (id.includes('youtube.com/watch?v=')) {
      const urlParams = new URL(id).searchParams;
      return `https://www.youtube.com/embed/${urlParams.get('v')}`;
    }
    if (id.includes('youtu.be/')) {
      const videoId = id.split('youtu.be/')[1].split('?')[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    // Assume it's just the ID
    return `https://www.youtube.com/embed/${id}`;
  };

  const handleVideoClose = () => {
    setShowVideo(false);
    setWatched(true);
  };

  // Topics covered in the video (3 slides covering the 4 hero features)
  const videoTopics = [
    { icon: '✋', title: 'Complete Beginners Welcome', description: 'No experience needed' },
    { icon: '👨‍🏫', title: 'Personal 1-on-1 Coaching', description: 'Tailored to your pace' },
    { icon: '⏰', title: 'Short Sessions & Real Results', description: '5-10 min daily + Live Deployed Project' }
  ];

  return (
    <div className="hero-video-container">
      <div className="hero-video-preview" onClick={() => setShowVideo(true)}>
        <div className="hero-video-thumbnail">
          <div className="hero-play-button">
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
              <circle cx="32" cy="32" r="32" fill="white" fillOpacity="0.95"/>
              <path d="M24 18L46 32L24 46V18Z" fill="#667eea"/>
            </svg>
          </div>
          <div className="video-overlay">
            <span className="video-badge">Watch Introduction</span>
          </div>
        </div>
        <div className="hero-video-content">
          <h3 className="hero-video-title">What Makes This Program Different?</h3>
          <p className="hero-video-description">
            Learn about our approach to teaching complete beginners and how we help you build real projects.
          </p>
          <div className="video-topics-preview">
            {videoTopics.map((topic, index) => (
              <div key={index} className="topic-preview-item">
                <span className="topic-icon">{topic.icon}</span>
                <span className="topic-text">{topic.title}</span>
              </div>
            ))}
          </div>
          <p className="video-duration-hint">⏱️ ~5 minutes • 3 slides</p>
        </div>
      </div>

      {showVideo && (
        <div className="hero-video-modal-overlay" onClick={handleVideoClose}>
          <div className="hero-video-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="hero-video-close-button" onClick={handleVideoClose}>×</button>
            <div className="hero-video-wrapper">
              <iframe
                src={`${getVideoEmbedUrl(videoId)}?autoplay=1`}
                title="Program Introduction"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="hero-video-iframe"
              />
            </div>
            <div className="hero-video-cta">
              <p className="hero-video-cta-text">
                Ready to start your journey? Schedule your first 1-on-1 session with Lamont.
              </p>
              <a 
                href="https://calendly.com/lamont-evans" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hero-video-cta-button"
                onClick={(e) => e.stopPropagation()}
              >
                Schedule Your First Session →
              </a>
            </div>
          </div>
        </div>
      )}

      {watched && (
        <div className="hero-video-watched-badge">
          <span>✓ Introduction watched</span>
        </div>
      )}
    </div>
  );
};

export default HeroVideo;

