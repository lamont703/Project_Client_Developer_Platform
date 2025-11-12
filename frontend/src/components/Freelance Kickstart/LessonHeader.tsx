import React from 'react';
import '../../styles/Freelance Kickstart/LessonHeader.css';

interface LessonHeaderProps {
  day: number;
  title: string;
  description: string;
}

const LessonHeader: React.FC<LessonHeaderProps> = ({ 
  day, 
  title, 
  description
}) => {

  return (
    <div className="lesson-header">
      <div className="lesson-header-content">
        <div className="lesson-badge">Day {day}</div>
        <h1 className="lesson-title">{title}</h1>
        <p className="lesson-description">{description}</p>
      </div>
    </div>
  );
};

export default LessonHeader;

