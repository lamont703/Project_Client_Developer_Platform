import React, { useState, useEffect } from 'react';
import '../../styles/User Feedback/FeedbackDashboard.css';

interface FeedbackStats {
  totalFeedback: number;
  averageRating: number;
  positiveFeedback: number;
  negativeFeedback: number;
  featureRequests: number;
  bugReports: number;
}

interface RecentFeedback {
  id: string;
  type: string;
  rating: number;
  comment: string;
  feature: string;
  timestamp: string;
  user: string;
}

const FeedbackDashboard: React.FC = () => {
  const [stats, setStats] = useState<FeedbackStats>({
    totalFeedback: 0,
    averageRating: 0,
    positiveFeedback: 0,
    negativeFeedback: 0,
    featureRequests: 0,
    bugReports: 0
  });
  const [recentFeedback, setRecentFeedback] = useState<RecentFeedback[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setStats({
        totalFeedback: 1247,
        averageRating: 4.2,
        positiveFeedback: 892,
        negativeFeedback: 89,
        featureRequests: 156,
        bugReports: 23
      });

      setRecentFeedback([
        {
          id: '1',
          type: 'feature',
          rating: 5,
          comment: 'Love the new AI assistant! Would be great to have voice input.',
          feature: 'AI Project Assistant',
          timestamp: '2024-01-15T10:30:00Z',
          user: 'Anonymous User'
        },
        {
          id: '2',
          type: 'improvement',
          rating: 4,
          comment: 'The task manager is good but could use better filtering options.',
          feature: 'Task Manager',
          timestamp: '2024-01-15T09:15:00Z',
          user: 'Anonymous User'
        },
        {
          id: '3',
          type: 'bug',
          rating: 2,
          comment: 'Getting an error when trying to upload files in the proto hub.',
          feature: 'Proto Hub',
          timestamp: '2024-01-15T08:45:00Z',
          user: 'Anonymous User'
        }
      ]);

      setIsLoading(false);
    }, 1000);
  }, []);

  const getFeedbackTypeIcon = (type: string) => {
    switch (type) {
      case 'bug': return '🐛';
      case 'feature': return '💡';
      case 'improvement': return '⚡';
      case 'general': return '💬';
      default: return '📝';
    }
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 4) return 'positive';
    if (rating >= 3) return 'neutral';
    return 'negative';
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  if (isLoading) {
    return (
      <div className="feedback-dashboard loading">
        <div className="loading-spinner">Loading feedback data...</div>
      </div>
    );
  }

  return (
    <div className="feedback-dashboard">
      {/* Stats Overview */}
      <div className="stats-overview">
        <h2 className="section-title">Feedback Overview</h2>
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">📊</div>
            <div className="stat-content">
              <div className="stat-number">{stats.totalFeedback.toLocaleString()}</div>
              <div className="stat-label">Total Feedback</div>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">⭐</div>
            <div className="stat-content">
              <div className="stat-number">{stats.averageRating.toFixed(1)}</div>
              <div className="stat-label">Average Rating</div>
            </div>
          </div>
          
          <div className="stat-card positive">
            <div className="stat-icon">😊</div>
            <div className="stat-content">
              <div className="stat-number">{stats.positiveFeedback}</div>
              <div className="stat-label">Positive</div>
            </div>
          </div>
          
          <div className="stat-card negative">
            <div className="stat-icon">😞</div>
            <div className="stat-content">
              <div className="stat-number">{stats.negativeFeedback}</div>
              <div className="stat-label">Negative</div>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">💡</div>
            <div className="stat-content">
              <div className="stat-number">{stats.featureRequests}</div>
              <div className="stat-label">Feature Requests</div>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">🐛</div>
            <div className="stat-content">
              <div className="stat-number">{stats.bugReports}</div>
              <div className="stat-label">Bug Reports</div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Feedback */}
      <div className="recent-feedback">
        <h2 className="section-title">Recent Feedback</h2>
        <div className="feedback-list">
          {recentFeedback.map(feedback => (
            <div key={feedback.id} className="feedback-item">
              <div className="feedback-header">
                <div className="feedback-type">
                  <span className="type-icon">{getFeedbackTypeIcon(feedback.type)}</span>
                  <span className="type-label">{feedback.type}</span>
                </div>
                <div className={`feedback-rating ${getRatingColor(feedback.rating)}`}>
                  {'⭐'.repeat(feedback.rating)}
                </div>
                <div className="feedback-time">
                  {formatTimestamp(feedback.timestamp)}
                </div>
              </div>
              
              <div className="feedback-content">
                <div className="feedback-feature">
                  <span className="feature-label">Feature:</span>
                  <span className="feature-name">{feedback.feature}</span>
                </div>
                <div className="feedback-comment">
                  {feedback.comment}
                </div>
              </div>
              
              <div className="feedback-footer">
                <span className="feedback-user">{feedback.user}</span>
                <div className="feedback-actions">
                  <button className="action-btn">Reply</button>
                  <button className="action-btn">Mark as Resolved</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="dashboard-actions">
        <h2 className="section-title">Quick Actions</h2>
        <div className="action-buttons">
          <button className="action-btn primary">
            <span className="btn-icon">📊</span>
            <span className="btn-text">View Analytics</span>
          </button>
          <button className="action-btn secondary">
            <span className="btn-icon">📝</span>
            <span className="btn-text">Export Data</span>
          </button>
          <button className="action-btn secondary">
            <span className="btn-icon">⚙️</span>
            <span className="btn-text">Settings</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackDashboard;
