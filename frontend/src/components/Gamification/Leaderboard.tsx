import React, { useState, useEffect } from 'react';
import '../../styles/Gamification/Leaderboard.css';

interface LeaderboardEntry {
  id: string;
  name: string;
  points: number;
  level: number;
  avatar: string;
  badges: number;
  rank: number;
  isCurrentUser?: boolean;
}

const Leaderboard: React.FC = () => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([
    {
      id: '1',
      name: 'Alex Chen',
      points: 3250,
      level: 4,
      avatar: '👨‍💻',
      badges: 15,
      rank: 1
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      points: 2890,
      level: 4,
      avatar: '👩‍💻',
      badges: 12,
      rank: 2
    },
    {
      id: '3',
      name: 'Mike Rodriguez',
      points: 2450,
      level: 3,
      avatar: '👨‍💻',
      badges: 10,
      rank: 3
    },
    {
      id: '4',
      name: 'You',
      points: 1250,
      level: 3,
      avatar: '👤',
      badges: 8,
      rank: 4,
      isCurrentUser: true
    },
    {
      id: '5',
      name: 'Emma Wilson',
      points: 1100,
      level: 3,
      avatar: '👩‍💻',
      badges: 7,
      rank: 5
    }
  ]);

  const [timeframe, setTimeframe] = useState('all-time');

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return '🥇';
      case 2: return '🥈';
      case 3: return '🥉';
      default: return `#${rank}`;
    }
  };

  const getLevelTitle = (level: number) => {
    const titles = ['Bronze', 'Silver', 'Gold', 'Platinum', 'Elite'];
    return titles[Math.min(level - 1, titles.length - 1)] || 'Rookie';
  };

  return (
    <div className="leaderboard">
      <div className="leaderboard-header">
        <h2 className="leaderboard-title">Developer Leaderboard</h2>
        <div className="timeframe-selector">
          <button 
            className={`timeframe-btn ${timeframe === 'all-time' ? 'active' : ''}`}
            onClick={() => setTimeframe('all-time')}
          >
            All Time
          </button>
          <button 
            className={`timeframe-btn ${timeframe === 'monthly' ? 'active' : ''}`}
            onClick={() => setTimeframe('monthly')}
          >
            This Month
          </button>
          <button 
            className={`timeframe-btn ${timeframe === 'weekly' ? 'active' : ''}`}
            onClick={() => setTimeframe('weekly')}
          >
            This Week
          </button>
        </div>
      </div>

      <div className="leaderboard-list">
        {leaderboard.map((entry) => (
          <div 
            key={entry.id} 
            className={`leaderboard-entry ${entry.isCurrentUser ? 'current-user' : ''}`}
          >
            <div className="rank">
              <span className="rank-icon">{getRankIcon(entry.rank)}</span>
            </div>
            
            <div className="user-info">
              <div className="avatar">{entry.avatar}</div>
              <div className="user-details">
                <div className="user-name">{entry.name}</div>
                <div className="user-level">{getLevelTitle(entry.level)} Developer</div>
              </div>
            </div>
            
            <div className="user-stats">
              <div className="points">{entry.points.toLocaleString()} pts</div>
              <div className="badges">{entry.badges} badges</div>
            </div>
          </div>
        ))}
      </div>

      <div className="leaderboard-footer">
        <div className="your-rank">
          <span className="rank-label">Your Rank:</span>
          <span className="rank-value">#4</span>
        </div>
        <div className="rank-info">
          <span className="info-text">Keep contributing to climb higher!</span>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard; 