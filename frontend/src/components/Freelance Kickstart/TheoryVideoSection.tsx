import React from 'react';
import LessonVideoPlayer from './LessonVideoPlayer';
import LessonResources from './LessonResources';
import LessonChecklist from './LessonChecklist';
import { LessonVideo, Lesson } from '../../data/freelanceKickstartLessons';
import '../../styles/Freelance Kickstart/TheoryVideoSection.css';

interface TheoryVideoSectionProps {
  day: number;
  theoryVideo: LessonVideo;
  resources?: Lesson['resources'];
  learningOutcomes?: string[];
  checklistItems?: Lesson['checklistItems'];
}

const TheoryVideoSection: React.FC<TheoryVideoSectionProps> = ({ 
  day,
  theoryVideo, 
  resources,
  learningOutcomes,
  checklistItems
}) => {
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
        {learningOutcomes && checklistItems && (
          <LessonChecklist 
            key={`lesson-checklist-day-${day}`}
            day={day}
            learningOutcomes={learningOutcomes}
            checklistItems={checklistItems}
          />
        )}
        <LessonResources resources={resources} />
      </div>
    </section>
  );
};

export default TheoryVideoSection;

