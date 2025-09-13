import React, { useState, useEffect } from 'react';
import '../../styles/User Feedback/FloatingFeedbackWidget.css';

interface FeedbackData {
  type: string;
  rating: number;
  comment?: string;
  feature?: string;
}

interface FloatingFeedbackWidgetProps {
  onClose: () => void;
  onFeedbackSubmit: (feedback: FeedbackData) => void;
  autoExpand?: boolean;
}

const FloatingFeedbackWidget: React.FC<FloatingFeedbackWidgetProps> = ({ 
  onClose, 
  onFeedbackSubmit,
  autoExpand = false
}) => {
  const [isExpanded, setIsExpanded] = useState(autoExpand);
  const [feedbackType, setFeedbackType] = useState('');
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [selectedFeature, setSelectedFeature] = useState('');

  const availableFeatures = [
    { id: 'ai-project-assistant', label: 'AI Project Assistant', icon: '🤖' },
    { id: 'ai-developer-assistant', label: 'AI Developer Assistant', icon: '👨‍💻' },
    { id: 'ai-community-member', label: 'AI Community Member Control Center', icon: '🤖👥' },
    { id: 'proto-hub', label: 'Proto Hub', icon: '🚀' },
    { id: 'project-listings', label: 'Project Listings', icon: '💼' },
    { id: 'developer-directory', label: 'Developer Directory', icon: '👥' },
    { id: 'task-manager', label: 'Task Manager', icon: '📋' },
    { id: 'pitch-deck', label: 'Platform Pitch Deck', icon: '📊' },
    { id: 'prototype-service', label: 'Prototype + Pitch Deck Service', icon: '🚀📊' },
    { id: 'defi-platform', label: 'Tech Project Funding Platform', icon: '💰' },
    { id: 'gamification', label: 'Developer Gamification', icon: '🎮' },
    { id: 'pipeline-dashboard', label: 'Pipeline Control Center', icon: '📊' },
    { id: 'user-feedback', label: 'User Feedback Platform', icon: '💬' },
    { id: 'general-platform', label: 'General Platform', icon: '🌐' }
  ];

  useEffect(() => {
    // Auto-expand if autoExpand prop is true
    if (autoExpand) {
      setIsExpanded(true);
    }
  }, [autoExpand]);

  useEffect(() => {
    // Auto-detect current feature based on URL and set as default
    const path = window.location.pathname;
    const featureMap: { [key: string]: string } = {
      '/chat': 'ai-project-assistant',
      '/developer-chat': 'ai-developer-assistant',
      '/ai-community-member': 'ai-community-member',
      '/proto-hub': 'proto-hub',
      '/jobs': 'project-listings',
      '/developers': 'developer-directory',
      '/task-manager': 'task-manager',
      '/pitch-deck': 'pitch-deck',
      '/landing-page': 'prototype-service',
      '/defi-platform': 'defi-platform',
      '/gamification': 'gamification',
      '/pipeline-dashboard': 'pipeline-dashboard',
      '/user-feedback': 'user-feedback'
    };
    
    const detectedFeature = featureMap[path] || 'general-platform';
    setSelectedFeature(detectedFeature);
  }, []);

  const feedbackTypes = [
    { id: 'bug', label: 'Bug Report', icon: '🐛' },
    { id: 'feature', label: 'Feature Request', icon: '💡' },
    { id: 'improvement', label: 'Improvement', icon: '⚡' },
    { id: 'general', label: 'General Feedback', icon: '💬' }
  ];

  const getSelectedFeatureLabel = () => {
    const feature = availableFeatures.find(f => f.id === selectedFeature);
    return feature ? feature.label : 'General Platform';
  };

  const getRatingLabel = (rating: number) => {
    switch (rating) {
      case 1: return 'Very Poor';
      case 2: return 'Poor';
      case 3: return 'Average';
      case 4: return 'Good';
      case 5: return 'Excellent';
      default: return 'Select rating';
    }
  };

  const handleSubmit = () => {
    if (feedbackType && rating > 0 && selectedFeature) {
      onFeedbackSubmit({
        type: feedbackType,
        rating: rating,
        comment: comment,
        feature: getSelectedFeatureLabel()
      });
      
      // Show success message
      setIsExpanded(false);
      setTimeout(() => {
        onClose();
      }, 2000);
    }
  };

  const handleClose = () => {
    setIsExpanded(false);
    setTimeout(() => {
      onClose();
    }, 300); // Allow time for animation
  };

  return (
    <div className={`floating-feedback-widget ${isExpanded ? 'expanded' : ''}`}>
      {!isExpanded ? (
        <div className="widget-collapsed">
          <button 
            className="feedback-trigger"
            onClick={() => setIsExpanded(true)}
            title="Give Feedback"
          >
            <span className="trigger-icon">💬</span>
          </button>
        </div>
      ) : (
        <div className="widget-expanded">
          <div className="widget-header">
            <h3>Share Your Feedback</h3>
            <button className="close-btn" onClick={handleClose}>×</button>
          </div>
          
          <div className="widget-content">
            {/* Feature Selection */}
            <div className="feature-selection">
              <p className="section-label">Which feature are you reviewing?</p>
              <div className="feature-dropdown">
                <select 
                  className="feature-select"
                  value={selectedFeature}
                  onChange={(e) => setSelectedFeature(e.target.value)}
                >
                  {availableFeatures.map(feature => (
                    <option key={feature.id} value={feature.id}>
                      {feature.icon} {feature.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Detailed Feedback */}
            <div className="detailed-feedback">
              <div className="feedback-type-selection">
                <p className="section-label">What type of feedback?</p>
                <div className="type-buttons">
                  {feedbackTypes.map(type => (
                    <button
                      key={type.id}
                      className={`type-btn ${feedbackType === type.id ? 'selected' : ''}`}
                      onClick={() => setFeedbackType(type.id)}
                    >
                      <span className="type-icon">{type.icon}</span>
                      <span className="type-label">{type.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {feedbackType && (
                <div className="rating-section">
                  <p className="section-label">Rate your experience:</p>
                  <div className="star-rating">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button
                        key={star}
                        className={`star ${star <= rating ? 'filled' : ''}`}
                        onClick={() => setRating(star)}
                        title={`${star} star${star > 1 ? 's' : ''} - ${getRatingLabel(star)}`}
                      >
                        ⭐
                      </button>
                    ))}
                    <span className="rating-text">
                      {getRatingLabel(rating)}
                    </span>
                  </div>
                </div>
              )}

              {feedbackType && rating > 0 && (
                <div className="comment-section">
                  <label className="section-label">Additional comments (optional):</label>
                  <textarea
                    className="comment-input"
                    placeholder="Tell us more about your experience..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows={3}
                  />
                </div>
              )}
            </div>
          </div>

          <div className="widget-footer">
            <button 
              className="submit-btn"
              onClick={handleSubmit}
              disabled={!feedbackType || rating === 0 || !selectedFeature}
            >
              Submit Feedback
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FloatingFeedbackWidget;
