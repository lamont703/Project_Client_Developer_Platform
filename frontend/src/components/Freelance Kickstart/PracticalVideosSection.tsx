import React from 'react';
import LessonVideoPlayer from './LessonVideoPlayer';
import { LessonVideo } from '../../data/freelanceKickstartLessons';
import '../../styles/Freelance Kickstart/PracticalVideosSection.css';

interface PracticalVideosSectionProps {
  practicalVideos: LessonVideo[];
}

const PracticalVideosSection: React.FC<PracticalVideosSectionProps> = ({ practicalVideos }) => {
  if (!practicalVideos || practicalVideos.length === 0) {
    return null;
  }

  return (
    <section className="practical-videos-section">
      <div className="section-container">
        <div className="section-header">
          <h2 className="section-title">Practical Portion</h2>
          <p className="section-subtitle">
            Watch these live screen share demonstrations to see how to apply the concepts in practice.
          </p>
        </div>
        <div className="practical-videos-grid">
          {practicalVideos.map((video, index) => (
            <div key={index} className="practical-video-item">
              <div className="video-number-badge">Practical {index + 1}</div>
              <LessonVideoPlayer
                videoId={video.videoId}
                title={video.title}
                description={video.description}
                type="practical"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PracticalVideosSection;

