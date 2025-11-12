import React from 'react';
import LessonVideoPlayer from './LessonVideoPlayer';
import LessonResources from './LessonResources';
import { LessonVideo, Lesson } from '../../data/freelanceKickstartLessons';
import '../../styles/Freelance Kickstart/TheoryVideoSection.css';

interface TheoryVideoSectionProps {
  theoryVideo: LessonVideo;
  resources?: Lesson['resources'];
}

const TheoryVideoSection: React.FC<TheoryVideoSectionProps> = ({ theoryVideo, resources }) => {
  return (
    <section className="theory-video-section">
      <div className="section-container">
        <div className="section-header">
          <h2 className="section-title">Theory Portion</h2>
          <p className="section-subtitle">
            Watch this video to understand the core concepts and principles we'll be covering today.
          </p>
        </div>
        <LessonVideoPlayer
          videoId={theoryVideo.videoId}
          title={theoryVideo.title}
          description={theoryVideo.description}
          type="theory"
        />
        <LessonResources resources={resources} />
      </div>
    </section>
  );
};

export default TheoryVideoSection;

