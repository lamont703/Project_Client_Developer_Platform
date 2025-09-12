import React, { useState } from 'react';
import '../../styles/Gamification/AchievementCenter.css';

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  points: number;
  category: string;
  isEarned: boolean;
  progress?: number;
  maxProgress?: number;
}

const AchievementCenter: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: '1',
      name: 'First Steps',
      description: 'Complete your first task',
      icon: '👶',
      points: 25,
      category: 'beginner',
      isEarned: true
    },
    {
      id: '2',
      name: 'Task Master',
      description: 'Complete 10 tasks in a row',
      icon: '✅',
      points: 100,
      category: 'tasks',
      isEarned: true
    },
    {
      id: '3',
      name: 'Project Launcher',
      description: 'Create your first project',
      icon: '🚀',
      points: 150,
      category: 'projects',
      isEarned: true
    },
    {
      id: '4',
      name: 'Community Helper',
      description: 'Help 5 developers with questions',
      icon: '🤝',
      points: 75,
      category: 'community',
      isEarned: true
    },
    {
      id: '5',
      name: 'AI Assistant Expert',
      description: 'Use AI assistant 20 times',
      icon: '🤖',
      points: 200,
      category: 'ai',
      isEarned: false,
      progress: 12,
      maxProgress: 20
    },
    {
      id: '6',
      name: 'Wireframe Master',
      description: 'Create 5 wireframes',
      icon: '📐',
      points: 300,
      category: 'projects',
      isEarned: false,
      progress: 2,
      maxProgress: 5
    },
    {
      id: '7',
      name: 'Prototype Pro',
      description: 'Submit 3 prototypes to Proto Hub',
      icon: '🎨',
      points: 250,
      category: 'community',
      isEarned: false,
      progress: 1,
      maxProgress: 3
    },
    {
      id: '8',
      name: 'Milestone Achiever',
      description: 'Reach 5 project milestones',
      icon: '🎯',
      points: 400,
      category: 'projects',
      isEarned: false,
      progress: 0,
      maxProgress: 5
    }
  ]);

  const categories = [
    { id: 'all', label: 'All', icon: '🏆' },
    { id: 'beginner', label: 'Beginner', icon: '👶' },
    { id: 'tasks', label: 'Tasks', icon: '✅' },
    { id: 'projects', label: 'Projects', icon: '🚀' },
    { id: 'community', label: 'Community', icon: '🤝' },
    { id: 'ai', label: 'AI Assistant', icon: '🤖' }
  ];

  const filteredAchievements = selectedCategory === 'all' 
    ? achievements 
    : achievements.filter(achievement => achievement.category === selectedCategory);

  const earnedCount = achievements.filter(a => a.isEarned).length;
  const totalCount = achievements.length;

  return (
    <div className="achievement-center">
      <div className="achievement-header">
        <h2 className="achievement-title">Achievement Center</h2>
        <div className="achievement-stats">
          <span className="stats-text">{earnedCount} of {totalCount} achievements earned</span>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${(earnedCount / totalCount) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="category-filter">
        {categories.map((category) => (
          <button
            key={category.id}
            className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category.id)}
          >
            <span className="category-icon">{category.icon}</span>
            <span className="category-label">{category.label}</span>
          </button>
        ))}
      </div>

      <div className="achievements-grid">
        {filteredAchievements.map((achievement) => (
          <div 
            key={achievement.id} 
            className={`achievement-card ${achievement.isEarned ? 'earned' : 'locked'}`}
          >
            <div className="achievement-icon">{achievement.icon}</div>
            <div className="achievement-content">
              <h3 className="achievement-name">{achievement.name}</h3>
              <p className="achievement-description">{achievement.description}</p>
              <div className="achievement-points">+{achievement.points} pts</div>
              
              {achievement.isEarned ? (
                <div className="achievement-status earned">
                  <span className="status-icon">✅</span>
                  <span className="status-text">Earned!</span>
                </div>
              ) : (
                <div className="achievement-status locked">
                  {achievement.progress !== undefined && achievement.maxProgress !== undefined && (
                    <div className="progress-info">
                      <span className="progress-text">
                        {achievement.progress}/{achievement.maxProgress}
                      </span>
                      <div className="progress-bar">
                        <div 
                          className="progress-fill" 
                          style={{ width: `${(achievement.progress / achievement.maxProgress) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                  <span className="status-text">In Progress</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AchievementCenter; 