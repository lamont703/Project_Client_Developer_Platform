import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Code Contributions/CodeContributionsPage.css';
import RepositoryInfo from '../components/Code Contributions/RepositoryInfo';
import BountyList from '../components/Code Contributions/BountyList';
import ContributionGuide from '../components/Code Contributions/ContributionGuide';
import WLFITokenInfo from '../components/Code Contributions/WLFITokenInfo';

interface HomePageProps {
  navigateToHome?: () => void;
}

const CodeContributionsPage: React.FC<HomePageProps> = ({ navigateToHome }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [isQuickActionsExpanded, setIsQuickActionsExpanded] = useState(false);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const toggleQuickActions = () => {
    setIsQuickActionsExpanded(!isQuickActionsExpanded);
  };

  return (
    <div className="code-contributions-page">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-icon">💰</span>
            <span className="badge-text">Earn WLFI Tokens</span>
          </div>
          
          <h1 className="hero-title">
            Code Contribution
            <span className="hero-highlight"> Bounties</span>
          </h1>
          
          <p className="hero-subtitle">
            Help develop platform features and earn WLFI tokens for your contributions. 
            Access our GitHub repository, contribute code, and claim bounties.
          </p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="tabs-section">
        <div className="tabs-container">
          <button 
            className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => handleTabChange('overview')}
          >
            <span className="tab-icon">📊</span>
            Overview
          </button>
          <button 
            className={`tab-button ${activeTab === 'bounties' ? 'active' : ''}`}
            onClick={() => handleTabChange('bounties')}
          >
            <span className="tab-icon">💰</span>
            Active Bounties
          </button>
          <button 
            className={`tab-button ${activeTab === 'guide' ? 'active' : ''}`}
            onClick={() => handleTabChange('guide')}
          >
            <span className="tab-icon">📚</span>
            How to Contribute
          </button>
          <button 
            className={`tab-button ${activeTab === 'tokens' ? 'active' : ''}`}
            onClick={() => handleTabChange('tokens')}
          >
            <span className="tab-icon">🪙</span>
            WLFI Tokens
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {activeTab === 'overview' && <RepositoryInfo />}
        {activeTab === 'bounties' && <BountyList />}
        {activeTab === 'guide' && <ContributionGuide />}
        {activeTab === 'tokens' && <WLFITokenInfo />}
      </div>
    </div>
  );
};

export default CodeContributionsPage;
