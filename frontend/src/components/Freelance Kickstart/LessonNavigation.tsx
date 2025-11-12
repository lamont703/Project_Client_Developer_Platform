import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/Freelance Kickstart/LessonNavigation.css';

interface LessonNavigationProps {
  currentDay: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

const LessonNavigation: React.FC<LessonNavigationProps> = ({ 
  currentDay, 
  hasNext, 
  hasPrevious 
}) => {
  const navigate = useNavigate();

  const goToLesson = (day: number) => {
    navigate(`/10Day-Freelance-Kickstart/lesson/${day}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="lesson-navigation">
      <div className="nav-container">
        <button 
          className={`nav-button prev ${!hasPrevious ? 'disabled' : ''}`}
          onClick={() => hasPrevious && goToLesson(currentDay - 1)}
          disabled={!hasPrevious}
        >
          <span className="nav-arrow">←</span>
          <div className="nav-button-content">
            <span className="nav-label">Previous</span>
            <span className="nav-day">Day {currentDay - 1}</span>
          </div>
        </button>

        <div className="lesson-progress">
          <span className="progress-text">Lesson {currentDay} of 10</span>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              data-progress={currentDay}
            />
          </div>
        </div>

        {hasNext ? (
          <button 
            className="nav-button next"
            onClick={() => goToLesson(currentDay + 1)}
          >
            <div className="nav-button-content">
              <span className="nav-label">Next</span>
              <span className="nav-day">Day {currentDay + 1}</span>
            </div>
            <span className="nav-arrow">→</span>
          </button>
        ) : (
          <div className="nav-complete">
            <div className="complete-content">
              <span className="complete-icon">✓</span>
              <span className="complete-text">Complete</span>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default LessonNavigation;

