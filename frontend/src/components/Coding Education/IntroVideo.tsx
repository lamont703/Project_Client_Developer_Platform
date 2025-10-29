import React, { useState } from 'react';
import '../../styles/Coding Education/IntroVideo.css';

interface IntroVideoProps {
  videoId: string;
  title: string;
  onScheduleClick?: () => void;
}

const IntroVideo: React.FC<IntroVideoProps> = ({ videoId, title, onScheduleClick }) => {
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

  return (
    <div className="intro-video-container">
      <div className="video-preview" onClick={() => setShowVideo(true)}>
        <div className="video-thumbnail">
          <div className="play-button">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <circle cx="24" cy="24" r="24" fill="white" fillOpacity="0.9"/>
              <path d="M18 14L34 24L18 34V14Z" fill="#667eea"/>
            </svg>
          </div>
        </div>
        <div className="video-info">
          <h4 className="video-title">{title}</h4>
          <p className="video-duration">⏱️ ~5 minutes • 3 slides</p>
          <p className="video-description">
            Watch this short intro to understand the topic, then schedule a call with Lamont to dive deeper.
          </p>
        </div>
      </div>

      {showVideo && (
        <div className="video-modal-overlay" onClick={handleVideoClose}>
          <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="video-close-button" onClick={handleVideoClose}>×</button>
            <div className="video-wrapper">
              <iframe
                src={`${getVideoEmbedUrl(videoId)}?autoplay=1`}
                title={title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="video-iframe"
              />
            </div>
            <div className="video-cta">
              <p className="video-cta-text">
                After watching, schedule a call with Lamont to discuss this topic and plan your next steps.
              </p>
              <button 
                className="video-cta-button"
                onClick={(e) => {
                  e.stopPropagation();
                  if (onScheduleClick) onScheduleClick();
                }}
              >
                Schedule a Call with Lamont →
              </button>
            </div>
          </div>
        </div>
      )}

      {watched && (
        <div className="video-completed-badge">
          <span>✓ Video watched</span>
        </div>
      )}
    </div>
  );
};

export default IntroVideo;

