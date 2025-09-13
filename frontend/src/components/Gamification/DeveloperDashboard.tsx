import React, { useState, useEffect } from 'react';
import WLFIService, { WLFITokenData } from '../../utils/wlfiService';
import '../../styles/Gamification/DeveloperDashboard.css';

interface DeveloperStats {
  totalPoints: number;
  currentLevel: number;
  pointsToNextLevel: number;
  badgesEarned: number;
  tasksCompleted: number;
  projectsCreated: number;
  communityHelp: number;
}

interface RecentAchievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  points: number;
  earnedAt: string;
}

const DeveloperDashboard: React.FC = () => {
  const [stats, setStats] = useState<DeveloperStats>({
    totalPoints: 1250,
    currentLevel: 3,
    pointsToNextLevel: 250,
    badgesEarned: 8,
    tasksCompleted: 45,
    projectsCreated: 12,
    communityHelp: 23
  });

  const [recentAchievements, setRecentAchievements] = useState<RecentAchievement[]>([
    {
      id: '1',
      name: 'Task Master',
      description: 'Completed 10 tasks in a row',
      icon: '✅',
      points: 100,
      earnedAt: '2024-01-15'
    },
    {
      id: '2',
      name: 'Community Helper',
      description: 'Helped 5 developers with questions',
      icon: '🤝',
      points: 75,
      earnedAt: '2024-01-14'
    }
  ]);

  // Add state for collapsible quick actions
  const [isQuickActionsExpanded, setIsQuickActionsExpanded] = useState(false);
  
  // Add WLFI token data state
  const [wlfiData, setWlfiData] = useState<WLFITokenData>({
    balance: 0,
    staked: 0,
    totalEarned: 0,
    isConnected: false
  });

  useEffect(() => {
    loadWLFIData();
  }, []);

  const loadWLFIData = async () => {
    try {
      const wlfiService = WLFIService.getInstance();
      const tokenData = wlfiService.getTokenData();
      setWlfiData(tokenData);
    } catch (error) {
      console.error('Failed to load WLFI data:', error);
    }
  };

  const getLevelProgress = () => {
    const currentLevelPoints = stats.currentLevel * 500;
    const nextLevelPoints = (stats.currentLevel + 1) * 500;
    const progress = ((stats.totalPoints - currentLevelPoints) / (nextLevelPoints - currentLevelPoints)) * 100;
    return Math.min(progress, 100);
  };

  const getLevelTitle = (level: number) => {
    const titles = ['Bronze Developer', 'Silver Developer', 'Gold Developer', 'Platinum Developer', 'Elite Developer'];
    return titles[Math.min(level - 1, titles.length - 1)] || 'Rookie Developer';
  };

  // Toggle function for quick actions
  const toggleQuickActions = () => {
    setIsQuickActionsExpanded(!isQuickActionsExpanded);
  };

  return (
    <div className="developer-dashboard">
      <div className="dashboard-header">
        <div className="level-info">
          <div className="level-badge">
            <span className="level-number">{stats.currentLevel}</span>
            <span className="level-title">{getLevelTitle(stats.currentLevel)}</span>
          </div>
          <div className="points-info">
            <span className="total-points">{stats.totalPoints.toLocaleString()} pts</span>
            <span className="next-level">{stats.pointsToNextLevel} pts to next level</span>
          </div>
        </div>
        
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${getLevelProgress()}%` }}
          ></div>
        </div>
      </div>

      {/* WLFI Token Balance Section */}
      <div className="wlfi-balance-section">
        <div className="wlfi-header">
          <h3 className="wlfi-title">💰 WLFI Token Balance</h3>
          <div className={`connection-status ${wlfiData.isConnected ? 'connected' : 'disconnected'}`}>
            {wlfiData.isConnected ? '🟢 Connected' : '🔴 Disconnected'}
          </div>
        </div>
        
        <div className="wlfi-balance-grid">
          <div className="wlfi-balance-card">
            <div className="balance-icon">💰</div>
            <div className="balance-info">
              <div className="balance-amount">{wlfiData.balance.toLocaleString()}</div>
              <div className="balance-label">Available WLFI</div>
            </div>
          </div>
          
          <div className="wlfi-balance-card">
            <div className="balance-icon">🔒</div>
            <div className="balance-info">
              <div className="balance-amount">{wlfiData.staked.toLocaleString()}</div>
              <div className="balance-label">Staked WLFI</div>
            </div>
          </div>
          
          <div className="wlfi-balance-card">
            <div className="balance-icon">📈</div>
            <div className="balance-info">
              <div className="balance-amount">{wlfiData.totalEarned.toLocaleString()}</div>
              <div className="balance-label">Total Earned</div>
            </div>
          </div>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">🏆</div>
          <div className="stat-content">
            <div className="stat-number">{stats.badgesEarned}</div>
            <div className="stat-label">Badges Earned</div>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <div className="stat-number">{stats.tasksCompleted}</div>
            <div className="stat-label">Tasks Completed</div>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">🚀</div>
          <div className="stat-content">
            <div className="stat-number">{stats.projectsCreated}</div>
            <div className="stat-label">Projects Created</div>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">🤝</div>
          <div className="stat-content">
            <div className="stat-number">{stats.communityHelp}</div>
            <div className="stat-label">Community Help</div>
          </div>
        </div>
      </div>

      <div className="recent-achievements">
        <h3 className="section-title">Recent Achievements</h3>
        <div className="achievements-list">
          {recentAchievements.map((achievement) => (
            <div key={achievement.id} className="achievement-item">
              <div className="achievement-icon">{achievement.icon}</div>
              <div className="achievement-content">
                <div className="achievement-name">{achievement.name}</div>
                <div className="achievement-description">{achievement.description}</div>
                <div className="achievement-meta">
                  <span className="achievement-points">+{achievement.points} pts</span>
                  <span className="achievement-date">{achievement.earnedAt}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={`quick-actions ${isQuickActionsExpanded ? 'expanded' : 'collapsed'}`}>
        <div className="section-header" onClick={toggleQuickActions}>
          <h3 className="section-title">Quick Actions</h3>
          <span className={`expand-icon ${isQuickActionsExpanded ? 'rotated' : ''}`}>
            ▼
          </span>
        </div>
        {isQuickActionsExpanded && (
          <div className="actions-grid">
            <button className="action-button">
              <span className="action-icon">📋</span>
              <span className="action-text">View Tasks</span>
            </button>
            <button className="action-button">
              <span className="action-icon">🚀</span>
              <span className="action-text">Create Project</span>
            </button>
            <button className="action-button">
              <span className="action-icon">❓</span>
              <span className="action-text">Help Community</span>
            </button>
            <button className="action-button">
              <span className="action-icon">🤖</span>
              <span className="action-text">Use AI Assistant</span>
            </button>
            <button className="action-button">
              <span className="action-icon">💰</span>
              <span className="action-text">Manage WLFI</span>
            </button>
            <button className="action-button">
              <span className="action-icon">🎯</span>
              <span className="action-text">View Bounties</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeveloperDashboard; 