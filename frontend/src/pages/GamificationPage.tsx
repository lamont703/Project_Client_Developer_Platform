import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Gamification/GamificationPage.css';
import DeveloperDashboard from '../components/Gamification/DeveloperDashboard';
import Leaderboard from '../components/Gamification/Leaderboard';
import AchievementCenter from '../components/Gamification/AchievementCenter';
import RewardCenter from '../components/Gamification/RewardCenter';

interface HomePageProps {
  navigateToHome?: () => void;
}

const GamificationPage: React.FC<HomePageProps> = ({ navigateToHome }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleNavigation = (route: string) => {
    try {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      navigate(route);
    } catch (error) {
      console.error('GamificationPage navigation error:', error);
      window.location.hash = `#${route}`;
    }
  };

  const handleBackToHome = () => {
    handleNavigation('/');
  };

  const tabs = [
    { id: 'dashboard', label: 'My Progress', icon: '📊' },
    { id: 'achievements', label: 'Achievements', icon: '🏆' },
    { id: 'leaderboard', label: 'Leaderboard', icon: '🥇' },
    { id: 'rewards', label: 'Rewards', icon: '🎁' }
  ];

  return (
    <div className="gamification-page">
      <div className="gamification-header">
        <div className="header-content">
          <button 
            className="back-to-home-btn"
            onClick={handleBackToHome}
            title="Back to Homepage"
          >
            <span className="back-icon">←</span>
            <span className="back-text">Back to Home</span>
          </button>
          
          <div className="header-badge">
            <span className="badge-icon">🎮</span>
            <span className="badge-text">Developer Gamification</span>
          </div>
          
          <h1 className="page-title">
            Level Up Your
            <span className="title-highlight"> Development Journey</span>
          </h1>
          
          <p className="page-subtitle">
            Earn points, unlock achievements, and climb the leaderboard by contributing to our platform. 
            Turn your development work into an exciting game!
          </p>
        </div>
      </div>

      <div className="gamification-content">
        <div className="gamification-tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="tab-icon">{tab.icon}</span>
              <span className="tab-label">{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="tab-content">
          {activeTab === 'dashboard' && <DeveloperDashboard />}
          {activeTab === 'achievements' && <AchievementCenter />}
          {activeTab === 'leaderboard' && <Leaderboard />}
          {activeTab === 'rewards' && <RewardCenter />}
        </div>
      </div>
    </div>
  );
};

export default GamificationPage; 