import React, { useState } from 'react';
import '../../styles/User Feedback/FeatureFeedbackCards.css';

interface FeatureData {
  id: string;
  name: string;
  icon: string;
  description: string;
  rating: number;
  feedbackCount: number;
  recentFeedback: string[];
  status: 'active' | 'beta' | 'deprecated';
}

const FeatureFeedbackCards: React.FC = () => {
  const [features, setFeatures] = useState<FeatureData[]>([
    {
      id: 'ai-assistant',
      name: 'AI Project Assistant',
      icon: '🤖',
      description: 'Get help defining your project requirements with our intelligent assistant',
      rating: 4.5,
      feedbackCount: 127,
      recentFeedback: ['Very helpful for brainstorming', 'Could use more examples', 'Love the interface'],
      status: 'active'
    },
    {
      id: 'developer-chat',
      name: 'AI Developer Assistant',
      icon: '👨‍💻',
      description: 'Get technical guidance and development support from our AI assistant',
      rating: 4.2,
      feedbackCount: 89,
      recentFeedback: ['Great for debugging help', 'Sometimes too verbose', 'Excellent code suggestions'],
      status: 'active'
    },
    {
      id: 'ai-community',
      name: 'AI Community Member Control Center',
      icon: '🤖👥',
      description: 'Test and monitor AI Community Member Control Center endpoints and monitoring service',
      rating: 3.8,
      feedbackCount: 45,
      recentFeedback: ['Useful for testing', 'Interface could be cleaner', 'Good monitoring tools'],
      status: 'beta'
    },
    {
      id: 'proto-hub',
      name: 'Proto Hub',
      icon: '🚀',
      description: 'Explore prototypes and get inspiration for your next project',
      rating: 4.1,
      feedbackCount: 78,
      recentFeedback: ['Great inspiration source', 'Need better search', 'Love the variety'],
      status: 'active'
    },
    {
      id: 'jobs',
      name: 'Project Listings',
      icon: '💼',
      description: 'Browse active projects and opportunities in your pipeline',
      rating: 3.9,
      feedbackCount: 92,
      recentFeedback: ['Good project variety', 'Filtering needs work', 'Clear descriptions'],
      status: 'active'
    },
    {
      id: 'developers',
      name: 'Developer Directory',
      icon: '👥',
      description: 'Connect with skilled developers in our community',
      rating: 4.0,
      feedbackCount: 56,
      recentFeedback: ['Great developer profiles', 'Easy to connect', 'Need more developers'],
      status: 'active'
    },
    {
      id: 'task-manager',
      name: 'Task Manager',
      icon: '📋',
      description: 'Track and manage tasks assigned to developers with real-time status updates',
      rating: 4.3,
      feedbackCount: 103,
      recentFeedback: ['Excellent organization', 'Real-time updates work well', 'Could use more filters'],
      status: 'active'
    },
    {
      id: 'pitch-deck',
      name: 'Platform Pitch Deck',
      icon: '📊',
      description: 'View our comprehensive investor presentation showcasing the platform',
      rating: 4.4,
      feedbackCount: 34,
      recentFeedback: ['Professional presentation', 'Clear value proposition', 'Well designed'],
      status: 'active'
    },
    {
      id: 'landing-page',
      name: 'Prototype + Pitch Deck Service',
      icon: '🚀📊',
      description: 'Transform your tech idea into reality with professional prototype and pitch deck',
      rating: 4.6,
      feedbackCount: 67,
      recentFeedback: ['Amazing service', 'High quality deliverables', 'Worth the wait'],
      status: 'active'
    },
    {
      id: 'defi-platform',
      name: 'Tech Project Funding Platform',
      icon: '💰',
      description: 'Peer-to-peer DeFi lending specifically for tech projects',
      rating: 3.7,
      feedbackCount: 41,
      recentFeedback: ['Interesting concept', 'Need simpler interface', 'Good for funding'],
      status: 'beta'
    },
    {
      id: 'gamification',
      name: 'Developer Gamification',
      icon: '🎮',
      description: 'Earn points, unlock achievements, and climb the leaderboard',
      rating: 4.2,
      feedbackCount: 85,
      recentFeedback: ['Fun and engaging', 'Good motivation', 'Love the achievements'],
      status: 'active'
    },
    {
      id: 'pipeline-dashboard',
      name: 'Pipeline Control Center',
      icon: '📊',
      description: 'Your mission control for opportunity management and client progression',
      rating: 4.1,
      feedbackCount: 72,
      recentFeedback: ['Great overview', 'Useful insights', 'Could use more customization'],
      status: 'active'
    }
  ]);

  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'green';
      case 'beta': return 'orange';
      case 'deprecated': return 'red';
      default: return 'gray';
    }
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return 'excellent';
    if (rating >= 4.0) return 'good';
    if (rating >= 3.5) return 'average';
    return 'poor';
  };

  return (
    <div className="feature-feedback-cards">
      <div className="section-header">
        <h2 className="section-title">Feature Feedback Overview</h2>
        <p className="section-subtitle">
          See how users are responding to each feature. Click on any card to view detailed feedback.
        </p>
      </div>

      <div className="features-grid">
        {features.map(feature => (
          <div 
            key={feature.id} 
            className={`feature-card ${selectedFeature === feature.id ? 'selected' : ''}`}
            onClick={() => setSelectedFeature(selectedFeature === feature.id ? null : feature.id)}
          >
            <div className="feature-header">
              <div className="feature-icon">{feature.icon}</div>
              <div className="feature-info">
                <h3 className="feature-name">{feature.name}</h3>
                <div className={`feature-status ${getStatusColor(feature.status)}`}>
                  {feature.status.toUpperCase()}
                </div>
              </div>
            </div>

            <div className="feature-description">
              {feature.description}
            </div>

            <div className="feature-stats">
              <div className={`rating ${getRatingColor(feature.rating)}`}>
                <span className="rating-stars">
                  {'⭐'.repeat(Math.floor(feature.rating))}
                  {feature.rating % 1 >= 0.5 && '⭐'}
                </span>
                <span className="rating-number">{feature.rating.toFixed(1)}</span>
              </div>
              <div className="feedback-count">
                {feature.feedbackCount} feedback
              </div>
            </div>

            {selectedFeature === feature.id && (
              <div className="feature-details">
                <div className="recent-feedback">
                  <h4>Recent Feedback:</h4>
                  <ul className="feedback-list">
                    {feature.recentFeedback.map((feedback, index) => (
                      <li key={index} className="feedback-item">
                        "{feedback}"
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="feature-actions">
                  <button className="action-btn primary">
                    <span className="btn-icon">💬</span>
                    <span className="btn-text">Give Feedback</span>
                  </button>
                  <button className="action-btn secondary">
                    <span className="btn-icon">📊</span>
                    <span className="btn-text">View Analytics</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="summary-stats">
        <h3 className="summary-title">Platform Summary</h3>
        <div className="stats-grid">
          <div className="stat-item">
            <div className="stat-number">{features.length}</div>
            <div className="stat-label">Total Features</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">
              {(features.reduce((sum, f) => sum + f.rating, 0) / features.length).toFixed(1)}
            </div>
            <div className="stat-label">Average Rating</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">
              {features.reduce((sum, f) => sum + f.feedbackCount, 0)}
            </div>
            <div className="stat-label">Total Feedback</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">
              {features.filter(f => f.status === 'active').length}
            </div>
            <div className="stat-label">Active Features</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureFeedbackCards;
