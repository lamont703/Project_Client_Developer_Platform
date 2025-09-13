import React, { useState, useEffect } from 'react';
import '../../styles/User Feedback/FeedbackAnalytics.css';

interface AnalyticsData {
  totalFeedback: number;
  averageRating: number;
  sentimentDistribution: {
    positive: number;
    neutral: number;
    negative: number;
  };
  feedbackTrends: {
    date: string;
    count: number;
    averageRating: number;
  }[];
  featurePerformance: {
    feature: string;
    rating: number;
    feedbackCount: number;
    trend: 'up' | 'down' | 'stable';
  }[];
  userEngagement: {
    newUsers: number;
    returningUsers: number;
    feedbackPerUser: number;
  };
}

const FeedbackAnalytics: React.FC = () => {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [selectedTimeframe, setSelectedTimeframe] = useState('7d');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading analytics data
    setTimeout(() => {
      setAnalytics({
        totalFeedback: 1247,
        averageRating: 4.2,
        sentimentDistribution: {
          positive: 65,
          neutral: 25,
          negative: 10
        },
        feedbackTrends: [
          { date: '2024-01-08', count: 45, averageRating: 4.1 },
          { date: '2024-01-09', count: 52, averageRating: 4.2 },
          { date: '2024-01-10', count: 38, averageRating: 4.0 },
          { date: '2024-01-11', count: 61, averageRating: 4.3 },
          { date: '2024-01-12', count: 48, averageRating: 4.2 },
          { date: '2024-01-13', count: 55, averageRating: 4.4 },
          { date: '2024-01-14', count: 42, averageRating: 4.1 }
        ],
        featurePerformance: [
          { feature: 'AI Project Assistant', rating: 4.5, feedbackCount: 127, trend: 'up' },
          { feature: 'Task Manager', rating: 4.3, feedbackCount: 103, trend: 'stable' },
          { feature: 'Proto Hub', rating: 4.1, feedbackCount: 78, trend: 'up' },
          { feature: 'Developer Directory', rating: 4.0, feedbackCount: 56, trend: 'down' },
          { feature: 'Pipeline Dashboard', rating: 4.1, feedbackCount: 72, trend: 'stable' }
        ],
        userEngagement: {
          newUsers: 234,
          returningUsers: 156,
          feedbackPerUser: 3.2
        }
      });
      setIsLoading(false);
    }, 1000);
  }, [selectedTimeframe]);

  const timeframes = [
    { id: '7d', label: 'Last 7 days' },
    { id: '30d', label: 'Last 30 days' },
    { id: '90d', label: 'Last 90 days' },
    { id: '1y', label: 'Last year' }
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return '📈';
      case 'down': return '📉';
      case 'stable': return '➡️';
      default: return '📊';
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'positive';
      case 'neutral': return 'neutral';
      case 'negative': return 'negative';
      default: return 'neutral';
    }
  };

  if (isLoading) {
    return (
      <div className="feedback-analytics loading">
        <div className="loading-spinner">Loading analytics...</div>
      </div>
    );
  }

  if (!analytics) return null;

  return (
    <div className="feedback-analytics">
      {/* Header */}
      <div className="analytics-header">
        <h2 className="section-title">Feedback Analytics</h2>
        <div className="timeframe-selector">
          {timeframes.map(timeframe => (
            <button
              key={timeframe.id}
              className={`timeframe-btn ${selectedTimeframe === timeframe.id ? 'active' : ''}`}
              onClick={() => setSelectedTimeframe(timeframe.id)}
            >
              {timeframe.label}
            </button>
          ))}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="key-metrics">
        <div className="metric-card">
          <div className="metric-icon">📊</div>
          <div className="metric-content">
            <div className="metric-number">{analytics.totalFeedback.toLocaleString()}</div>
            <div className="metric-label">Total Feedback</div>
          </div>
        </div>
        
        <div className="metric-card">
          <div className="metric-icon">⭐</div>
          <div className="metric-content">
            <div className="metric-number">{analytics.averageRating.toFixed(1)}</div>
            <div className="metric-label">Average Rating</div>
          </div>
        </div>
        
        <div className="metric-card">
          <div className="metric-icon">👥</div>
          <div className="metric-content">
            <div className="metric-number">{analytics.userEngagement.newUsers}</div>
            <div className="metric-label">New Users</div>
          </div>
        </div>
        
        <div className="metric-card">
          <div className="metric-icon">🔄</div>
          <div className="metric-content">
            <div className="metric-number">{analytics.userEngagement.feedbackPerUser.toFixed(1)}</div>
            <div className="metric-label">Feedback per User</div>
          </div>
        </div>
      </div>

      {/* Sentiment Distribution */}
      <div className="sentiment-section">
        <h3 className="subsection-title">Sentiment Distribution</h3>
        <div className="sentiment-chart">
          {Object.entries(analytics.sentimentDistribution).map(([sentiment, percentage]) => (
            <div key={sentiment} className="sentiment-bar">
              <div className="sentiment-label">
                <span className={`sentiment-indicator ${getSentimentColor(sentiment)}`}></span>
                <span className="sentiment-name">{sentiment}</span>
                <span className="sentiment-percentage">{percentage}%</span>
              </div>
              <div className="sentiment-progress">
                <div 
                  className={`sentiment-fill ${getSentimentColor(sentiment)}`}
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Feature Performance */}
      <div className="feature-performance">
        <h3 className="subsection-title">Feature Performance</h3>
        <div className="performance-table">
          <div className="table-header">
            <div className="header-cell">Feature</div>
            <div className="header-cell">Rating</div>
            <div className="header-cell">Feedback</div>
            <div className="header-cell">Trend</div>
          </div>
          {analytics.featurePerformance.map((feature, index) => (
            <div key={index} className="table-row">
              <div className="cell feature-name">{feature.feature}</div>
              <div className="cell rating">
                <span className="rating-stars">
                  {'⭐'.repeat(Math.floor(feature.rating))}
                </span>
                <span className="rating-number">{feature.rating.toFixed(1)}</span>
              </div>
              <div className="cell feedback-count">{feature.feedbackCount}</div>
              <div className="cell trend">
                <span className="trend-icon">{getTrendIcon(feature.trend)}</span>
                <span className="trend-text">{feature.trend}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Feedback Trends Chart */}
      <div className="trends-section">
        <h3 className="subsection-title">Feedback Trends</h3>
        <div className="trends-chart">
          <div className="chart-container">
            {analytics.feedbackTrends.map((trend, index) => (
              <div key={index} className="trend-bar">
                <div 
                  className="bar-fill"
                  style={{ 
                    height: `${(trend.count / Math.max(...analytics.feedbackTrends.map(t => t.count))) * 100}%` 
                  }}
                  title={`${trend.date}: ${trend.count} feedback, ${trend.averageRating.toFixed(1)} avg rating`}
                ></div>
                <div className="bar-label">{trend.date.split('-')[2]}</div>
              </div>
            ))}
          </div>
          <div className="chart-legend">
            <span className="legend-item">
              <span className="legend-color"></span>
              <span className="legend-text">Daily Feedback Count</span>
            </span>
          </div>
        </div>
      </div>

      {/* Export Actions */}
      <div className="export-actions">
        <h3 className="subsection-title">Export Data</h3>
        <div className="export-buttons">
          <button className="export-btn">
            <span className="btn-icon">📊</span>
            <span className="btn-text">Export Analytics</span>
          </button>
          <button className="export-btn">
            <span className="btn-icon">📝</span>
            <span className="btn-text">Export Feedback</span>
          </button>
          <button className="export-btn">
            <span className="btn-icon">📈</span>
            <span className="btn-text">Generate Report</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackAnalytics;
