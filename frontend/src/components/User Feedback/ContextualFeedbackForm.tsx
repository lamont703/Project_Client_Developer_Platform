import React, { useState } from 'react';
import '../../styles/User Feedback/ContextualFeedbackForm.css';

interface FeedbackData {
  feature: string;
  rating: number;
  comment: string;
  category: string;
}

interface ContextualFeedbackFormProps {
  feature: string;
  onSubmit: (feedback: FeedbackData) => void;
}

const ContextualFeedbackForm: React.FC<ContextualFeedbackFormProps> = ({ 
  feature, 
  onSubmit 
}) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [category, setCategory] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const categories = [
    { id: 'usability', label: 'Usability', icon: '🎯' },
    { id: 'performance', label: 'Performance', icon: '⚡' },
    { id: 'design', label: 'Design', icon: '🎨' },
    { id: 'functionality', label: 'Functionality', icon: '⚙️' },
    { id: 'bug', label: 'Bug Report', icon: '🐛' },
    { id: 'suggestion', label: 'Suggestion', icon: '💡' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (rating > 0 && category) {
      onSubmit({
        feature,
        rating,
        comment,
        category
      });
      
      setIsSubmitted(true);
      
      // Reset form after showing success message
      setTimeout(() => {
        setRating(0);
        setComment('');
        setCategory('');
        setIsSubmitted(false);
      }, 2000);
    }
  };

  if (isSubmitted) {
    return (
      <div className="contextual-feedback-form submitted">
        <div className="success-message">
          <span className="success-icon">✅</span>
          <span className="success-text">Feedback submitted successfully!</span>
        </div>
      </div>
    );
  }

  return (
    <form className="contextual-feedback-form" onSubmit={handleSubmit}>
      <div className="form-header">
        <h3>Feedback for {feature}</h3>
      </div>

      <div className="form-section">
        <label className="section-label">What aspect would you like to feedback on?</label>
        <div className="category-options">
          {categories.map(cat => (
            <button
              key={cat.id}
              type="button"
              className={`category-btn ${category === cat.id ? 'selected' : ''}`}
              onClick={() => setCategory(cat.id)}
            >
              <span className="category-icon">{cat.icon}</span>
              <span className="category-label">{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {category && (
        <div className="form-section">
          <label className="section-label">Rate your experience:</label>
          <div className="star-rating">
            {[1, 2, 3, 4, 5].map(star => (
              <button
                key={star}
                type="button"
                className={`star ${star <= rating ? 'filled' : ''}`}
                onClick={() => setRating(star)}
              >
                ⭐
              </button>
            ))}
            <span className="rating-text">
              {rating === 0 ? 'Select rating' : 
               rating === 1 ? 'Very Poor' :
               rating === 2 ? 'Poor' :
               rating === 3 ? 'Neutral' :
               rating === 4 ? 'Good' : 'Excellent'}
            </span>
          </div>
        </div>
      )}

      {rating > 0 && (
        <div className="form-section">
          <label className="section-label">Additional comments:</label>
          <textarea
            className="comment-input"
            placeholder="Tell us more about your experience with this feature..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={4}
          />
        </div>
      )}

      <div className="form-actions">
        <button 
          type="submit"
          className="submit-btn"
          disabled={rating === 0 || !category}
        >
          Submit Feedback
        </button>
      </div>
    </form>
  );
};

export default ContextualFeedbackForm;
