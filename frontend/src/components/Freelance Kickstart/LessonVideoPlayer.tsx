import React from 'react';
import '../../styles/Freelance Kickstart/LessonVideoPlayer.css';

interface LessonVideoPlayerProps {
  videoId: string;
  title: string;
  description?: string;
  type?: 'theory' | 'practical';
}

const LessonVideoPlayer: React.FC<LessonVideoPlayerProps> = ({ 
  videoId, 
  title, 
  description,
  type = 'theory'
}) => {

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

  return (
    <div className={`lesson-video-player ${type}`}>
      <div className="video-header">
        <div className="video-type-badge">
          {type === 'theory' ? '📚 Theory' : '🎬 Practical'}
        </div>
        <h3 className="video-title">{title}</h3>
        {description && (
          <p className="video-description">{description}</p>
        )}
      </div>
      
      <div className="video-container">
        <div className="video-wrapper">
          <iframe
            src={getVideoEmbedUrl(videoId)}
            title={title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="video-iframe"
          />
        </div>
      </div>
    </div>
  );
};

export default LessonVideoPlayer;

