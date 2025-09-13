import React, { useState, useEffect } from 'react';
import '../../styles/User Feedback/FeedbackLeaderboard.css';

interface LeaderboardUser {
  id: string;
  name: string;
  avatar: string;
  points: number;
  feedbackCount: number;
  badges: string[];
  rank: number;
}

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  points: number;
  unlocked: boolean;
}

const FeedbackLeaderboard: React.FC = () => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [currentUser, setCurrentUser] = useState<LeaderboardUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setLeaderboard([
        {
          id: '1',
          name: 'FeedbackMaster',
          avatar: '👑',
          points: 2450,
          feedbackCount: 47,
          badges: ['🏆', '💡', '⭐'],
          rank: 1
        },
        {
          id: '2',
          name: 'BugHunter',
          avatar: '🐛',
          points: 1890,
          feedbackCount: 32,
          badges: ['🏆', '🐛'],
          rank: 2
        },
        {
          id: '3',
          name: 'FeatureFan',
          avatar: '💡',
          points: 1650,
          feedbackCount: 28,
          badges: ['💡', '⭐'],
          rank: 3
        },
        {
          id: '4',
          name: 'QualityGuru',
          avatar: '⭐',
          points: 1420,
          feedbackCount: 25,
          badges: ['⭐'],
          rank: 4
        },
        {
          id: '5',
          name: 'HelpfulUser',
          avatar: '😊',
          points: 1180,
          feedbackCount: 22,
          badges: [],
          rank: 5
        }
      ]);

      setAchievements([
        {
          id: 'first_feedback',
          name: 'First Steps',
          description: 'Submit your first piece of feedback',
          icon: '🎯',
          points: 10,
          unlocked: true
        },
        {
          id: 'feedback_streak',
          name: 'Consistent Contributor',
          description: 'Submit feedback for 7 consecutive days',
          icon: '🔥',
          points: 50,
          unlocked: true
        },
        {
          id: 'bug_hunter',
          name: 'Bug Hunter',
          description: 'Report 10 bugs',
          icon: '🐛',
          points: 100,
          unlocked: false
        },
        {
          id: 'feature_advocate',
          name: 'Feature Advocate',
          description: 'Suggest 5 new features',
          icon: '💡',
          points: 75,
          unlocked: false
        },
        {
          id: 'community_champion',
          name: 'Community Champion',
          description: 'Reach the top 10 on the leaderboard',
          icon: '👑',
          points: 200,
          unlocked: false
        }
      ]);

      setCurrentUser({
        id: 'current',
        name: 'You',
        avatar: '��',
        points: 650,
        feedbackCount: 12,
        badges: ['🎯', '🔥'],
        rank: 8
      });

      setIsLoading(false);
    }, 1000);
  }, []);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return '🥇';
      case 2: return '🥈';
      case 3: return '��';
      default: return `#${rank}`;
    }
  };

  if (isLoading) {
    return (
      <div className="feedback-leaderboard loading">
        <div className="loading-spinner">Loading leaderboard...</div>
      </div>
    );
  }

  return (
    <div className="feedback-leaderboard">
      {/* Current User Stats */}
      {currentUser && (
        <div className="current-user-stats">
          <h2 className="section-title">Your Progress</h2>
          <div className="user-card current">
            <div className="user-rank">{getRankIcon(currentUser.rank)}</div>
            <div className="user-avatar">{currentUser.avatar}</div>
            <div className="user-info">
              <div className="user-name">{currentUser.name}</div>
              <div className="user-stats">
                <span className="stat">{currentUser.points} points</span>
                <span className="stat">{currentUser.feedbackCount} feedback</span>
              </div>
            </div>
            <div className="user-badges">
              {currentUser.badges.map((badge, index) => (
                <span key={index} className="badge">{badge}</span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Leaderboard */}
      <div className="leaderboard-section">
        <h2 className="section-title">Community Leaderboard</h2>
        <div className="leaderboard-list">
          {leaderboard.map(user => (
            <div key={user.id} className={`user-card ${user.rank <= 3 ? 'top-three' : ''}`}>
              <div className="user-rank">{getRankIcon(user.rank)}</div>
              <div className="user-avatar">{user.avatar}</div>
              <div className="user-info">
                <div className="user-name">{user.name}</div>
                <div className="user-stats">
                  <span className="stat">{user.points} points</span>
                  <span className="stat">{user.feedbackCount} feedback</span>
                </div>
              </div>
              <div className="user-badges">
                {user.badges.map((badge, index) => (
                  <span key={index} className="badge">{badge}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div className="achievements-section">
        <h2 className="section-title">Achievements</h2>
        <div className="achievements-grid">
          {achievements.map(achievement => (
            <div 
              key={achievement.id} 
              className={`achievement-card ${achievement.unlocked ? 'unlocked' : 'locked'}`}
            >
              <div className="achievement-icon">{achievement.icon}</div>
              <div className="achievement-info">
                <div className="achievement-name">{achievement.name}</div>
                <div className="achievement-description">{achievement.description}</div>
                <div className="achievement-points">+{achievement.points} points</div>
              </div>
              <div className="achievement-status">
                {achievement.unlocked ? '✅' : '��'}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Points System Info */}
      <div className="points-info">
        <h2 className="section-title">How to Earn Points</h2>
        <div className="points-grid">
          <div className="point-item">
            <span className="point-icon">💬</span>
            <span className="point-action">Submit feedback</span>
            <span className="point-value">+5 points</span>
          </div>
          <div className="point-item">
            <span className="point-icon">🐛</span>
            <span className="point-action">Report bugs</span>
            <span className="point-value">+10 points</span>
          </div>
          <div className="point-item">
            <span className="point-icon">💡</span>
            <span className="point-action">Suggest features</span>
            <span className="point-value">+8 points</span>
          </div>
          <div className="point-item">
            <span className="point-icon">⭐</span>
            <span className="point-action">High-rated feedback</span>
            <span className="point-value">+3 bonus</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackLeaderboard;
