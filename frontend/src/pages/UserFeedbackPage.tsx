import React, { useState, useEffect } from 'react';
import '../styles/User Feedback/UserFeedbackPage.css';
import { Analytics } from '../utils/analytics';
import FloatingFeedbackWidget from '../components/User Feedback/FloatingFeedbackWidget';
import FeedbackDashboard from '../components/User Feedback/FeedbackDashboard';
import MicroSurvey from '../components/User Feedback/MicroSurvey';
import ContextualFeedbackForm from '../components/User Feedback/ContextualFeedbackForm';
import FeedbackLeaderboard from '../components/User Feedback/FeedbackLeaderboard';
import FeatureFeedbackCards from '../components/User Feedback/FeatureFeedbackCards';
import FeedbackAnalytics from '../components/User Feedback/FeedbackAnalytics';

const UserFeedbackPage: React.FC<{ navigateToHome?: () => void }> = ({ navigateToHome }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showFloatingWidget, setShowFloatingWidget] = useState(false);
  const [autoExpandWidget, setAutoExpandWidget] = useState(false);
  const analytics = Analytics.getInstance();

  useEffect(() => {
    // Track page visit
    analytics.trackEvent('user_feedback_page_visited', {
      page: 'user_feedback',
      timestamp: new Date().toISOString()
    });
  }, [analytics]);

  const tabs = [
    { id: 'dashboard', label: 'Feedback Dashboard', icon: '📊' },
    { id: 'forms', label: 'Feedback Forms', icon: '📝' },
    { id: 'analytics', label: 'Analytics', icon: '📈' },
    { id: 'leaderboard', label: 'Community', icon: '🏆' },
    { id: 'features', label: 'Feature Feedback', icon: '🎯' }
  ];

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    analytics.trackEvent('feedback_tab_changed', {
      tab: tabId,
      timestamp: new Date().toISOString()
    });
  };

  const handleBackToHome = () => {
    if (navigateToHome) {
      navigateToHome();
    } else {
      // Fallback navigation
      window.location.hash = '#/';
    }
    
    analytics.trackEvent('feedback_back_to_home', {
      timestamp: new Date().toISOString()
    });
  };

  const handleGiveFeedback = () => {
    setAutoExpandWidget(true);
    setShowFloatingWidget(true);
    
    analytics.trackEvent('give_feedback_button_clicked', {
      timestamp: new Date().toISOString()
    });
  };

  const handleWidgetClose = () => {
    setShowFloatingWidget(false);
    setAutoExpandWidget(false);
  };

  return (
    <div className="user-feedback-page">
      {/* Floating Feedback Widget */}
      {showFloatingWidget && (
        <FloatingFeedbackWidget 
          onClose={handleWidgetClose}
          autoExpand={autoExpandWidget}
          onFeedbackSubmit={(feedback) => {
            analytics.trackEvent('floating_feedback_submitted', {
              feedback_type: feedback.type,
              rating: feedback.rating,
              timestamp: new Date().toISOString()
            });
          }}
        />
      )}

      {/* Header Section */}
      <div className="feedback-header">
        {/* Back Button */}
        <button className="back-button" onClick={handleBackToHome}>
          <span className="back-button-icon">←</span>
          <span>Back to Home</span>
        </button>

        <div className="header-content">
          <div className="header-badge">
            <span className="badge-icon">💬</span>
            <span className="badge-text">User Testing Feedback Platform</span>
          </div>
          
          <h1 className="page-title">
            Collect Quality User Feedback
            <span className="title-highlight"> in Real-Time</span>
          </h1>
          
          <p className="page-subtitle">
            Comprehensive feedback collection system with analytics, gamification, and community features. 
            Get insights from every user interaction to improve your platform.
          </p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="feedback-navigation">
        <div className="nav-tabs">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`nav-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => handleTabChange(tab.id)}
            >
              <span className="tab-icon">{tab.icon}</span>
              <span className="tab-label">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="feedback-content">
        {activeTab === 'dashboard' && (
          <div className="tab-content">
            <FeedbackDashboard />
          </div>
        )}

        {activeTab === 'forms' && (
          <div className="tab-content">
            <div className="forms-section">
              <h2 className="section-title">Feedback Collection Forms</h2>
              <div className="forms-grid">
                <div className="form-card">
                  <h3>Micro Survey</h3>
                  <p>Quick one-question surveys for immediate feedback</p>
                  <MicroSurvey 
                    question="How would you rate your overall experience?"
                    onSubmit={(rating) => {
                      analytics.trackEvent('micro_survey_submitted', {
                        question: 'overall_experience',
                        rating: rating,
                        timestamp: new Date().toISOString()
                      });
                    }}
                  />
                </div>
                
                <div className="form-card">
                  <h3>Contextual Feedback</h3>
                  <p>Feature-specific feedback forms</p>
                  <ContextualFeedbackForm 
                    feature="AI Project Assistant"
                    onSubmit={(feedback) => {
                      analytics.trackEvent('contextual_feedback_submitted', {
                        feature: feedback.feature,
                        rating: feedback.rating,
                        comment: feedback.comment,
                        timestamp: new Date().toISOString()
                      });
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="tab-content">
            <FeedbackAnalytics />
          </div>
        )}

        {activeTab === 'leaderboard' && (
          <div className="tab-content">
            <FeedbackLeaderboard />
          </div>
        )}

        {activeTab === 'features' && (
          <div className="tab-content">
            <FeatureFeedbackCards />
          </div>
        )}
      </div>

      {/* Quick Actions Bar */}
      <div className="quick-actions">
        <button 
          className="action-btn primary"
          onClick={handleGiveFeedback}
        >
          <span className="btn-icon">💬</span>
          <span className="btn-text">Give Feedback</span>
        </button>
        
        <button 
          className="action-btn secondary"
          onClick={() => {
            analytics.trackEvent('feedback_help_requested', {
              timestamp: new Date().toISOString()
            });
            // You could add a help modal or redirect to help page here
            alert('Help feature coming soon! For now, you can use the feedback forms above to share your thoughts.');
          }}
        >
          <span className="btn-icon">❓</span>
          <span className="btn-text">Help</span>
        </button>
      </div>
    </div>
  );
};

export default UserFeedbackPage;
