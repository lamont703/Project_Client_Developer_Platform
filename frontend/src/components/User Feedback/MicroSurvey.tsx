import React, { useState } from 'react';
import '../../styles/User Feedback/MicroSurvey.css';

interface MicroSurveyProps {
  question: string;
  onSubmit: (rating: number) => void;
  options?: { value: number; label: string; icon: string }[];
}

const MicroSurvey: React.FC<MicroSurveyProps> = ({ 
  question, 
  onSubmit,
  options = [
    { value: 1, label: 'Very Poor', icon: '😞' },
    { value: 2, label: 'Poor', icon: '😕' },
    { value: 3, label: 'Neutral', icon: '😐' },
    { value: 4, label: 'Good', icon: '😊' },
    { value: 5, label: 'Excellent', icon: '😍' }
  ]
}) => {
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleRatingSelect = (rating: number) => {
    setSelectedRating(rating);
  };

  const handleSubmit = () => {
    if (selectedRating !== null) {
      onSubmit(selectedRating);
      setIsSubmitted(true);
      
      // Reset after showing success message
      setTimeout(() => {
        setSelectedRating(null);
        setIsSubmitted(false);
      }, 2000);
    }
  };

  if (isSubmitted) {
    return (
      <div className="micro-survey submitted">
        <div className="success-message">
          <span className="success-icon">✅</span>
          <span className="success-text">Thank you for your feedback!</span>
        </div>
      </div>
    );
  }

  return (
    <div className="micro-survey">
      <div className="survey-question">
        <h3>{question}</h3>
      </div>
      
      <div className="rating-options">
        {options.map(option => (
          <button
            key={option.value}
            className={`rating-option ${selectedRating === option.value ? 'selected' : ''}`}
            onClick={() => handleRatingSelect(option.value)}
          >
            <span className="option-icon">{option.icon}</span>
            <span className="option-label">{option.label}</span>
          </button>
        ))}
      </div>
      
      <div className="survey-actions">
        <button 
          className="submit-btn"
          onClick={handleSubmit}
          disabled={selectedRating === null}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default MicroSurvey;
