import React, { useState } from 'react';
import '../../styles/DeFiPlatform.css';
import { LendingPool, BorrowingInterface, LiquidityProvider, DeFiStats } from './index';

interface DeFiPlatformProps {
  navigateToHome?: () => void;
}

const DeFiPlatform: React.FC<DeFiPlatformProps> = ({ navigateToHome }) => {
  const [activeTab, setActiveTab] = useState<'lend' | 'borrow' | 'provide'>('lend');

  return (
    <div className="defi-platform">
      <div className="defi-hero">
        <h1>🚀 Tech Project Funding Platform</h1>
        <p className="defi-subtitle">
          Peer-to-peer DeFi lending specifically for Software, AI, Blockchain, and Automation projects
        </p>
        <div className="hero-badges">
          <span className="tech-badge">💻 Software</span>
          <span className="tech-badge">🤖 AI</span>
          <span className="tech-badge">⛓️ Blockchain</span>
          <span className="tech-badge">⚙️ Automation</span>
        </div>
      </div>

      <div className="defi-stats-section">
        <DeFiStats />
      </div>

      <div className="defi-main-content">
        <div className="defi-tabs">
          <button 
            className={`defi-tab ${activeTab === 'lend' ? 'active' : ''}`}
            onClick={() => setActiveTab('lend')}
          >
            💰 Fund Tech Projects
          </button>
          <button 
            className={`defi-tab ${activeTab === 'borrow' ? 'active' : ''}`}
            onClick={() => setActiveTab('borrow')}
          >
            📈 Get Project Funding
          </button>
          <button 
            className={`defi-tab ${activeTab === 'provide' ? 'active' : ''}`}
            onClick={() => setActiveTab('provide')}
          >
            🌊 Provide Liquidity
          </button>
        </div>

        <div className="defi-content">
          {activeTab === 'lend' && <LendingPool />}
          {activeTab === 'borrow' && <BorrowingInterface />}
          {activeTab === 'provide' && <LiquidityProvider />}
        </div>
      </div>

      <div className="defi-features">
        <h2>Why Choose Our Tech Funding Platform?</h2>
        <div className="defi-features-grid">
          <div className="defi-feature-card">
            <div className="defi-feature-icon">🎯</div>
            <h3>Project-Specific Funding</h3>
            <p>Specialized lending pools for Software, AI, Blockchain, and Automation projects with tailored terms</p>
          </div>
          <div className="defi-feature-card">
            <div className="defi-feature-icon">🔍</div>
            <h3>Vetted Projects</h3>
            <p>All projects go through our AI Project Assistant platform for validation and technical review</p>
          </div>
          <div className="defi-feature-card">
            <div className="defi-feature-icon">⚡</div>
            <h3>Fast Approval</h3>
            <p>Quick funding decisions based on project merit and technical feasibility assessment</p>
          </div>
          <div className="defi-feature-card">
            <div className="defi-feature-icon">🤝</div>
            <h3>Community Support</h3>
            <p>Connect with other tech entrepreneurs and get mentorship alongside funding</p>
          </div>
          <div className="defi-feature-card">
            <div className="defi-feature-icon">📊</div>
            <h3>Milestone Tracking</h3>
            <p>Transparent project progress tracking with automated milestone-based releases</p>
          </div>
          <div className="defi-feature-card">
            <div className="defi-feature-icon">🛡️</div>
            <h3>Smart Contracts</h3>
            <p>Automated escrow and milestone-based fund releases ensure project completion</p>
          </div>
        </div>
      </div>

      <div className="project-categories">
        <h2>Supported Project Categories</h2>
        <div className="categories-grid">
          <div className="category-card">
            <div className="category-icon">💻</div>
            <h3>Software Development</h3>
            <p>Web applications, mobile apps, desktop software, and SaaS platforms</p>
            <div className="category-stats">
              <span>Avg. Funding: $25K - $100K</span>
              <span>Success Rate: 94%</span>
            </div>
          </div>
          <div className="category-card">
            <div className="category-icon">🤖</div>
            <h3>AI & Machine Learning</h3>
            <p>AI models, ML algorithms, automation tools, and intelligent systems</p>
            <div className="category-stats">
              <span>Avg. Funding: $50K - $200K</span>
              <span>Success Rate: 89%</span>
            </div>
          </div>
          <div className="category-card">
            <div className="category-icon">⛓️</div>
            <h3>Blockchain & Web3</h3>
            <p>DApps, DeFi protocols, NFT platforms, and blockchain infrastructure</p>
            <div className="category-stats">
              <span>Avg. Funding: $75K - $300K</span>
              <span>Success Rate: 87%</span>
            </div>
          </div>
          <div className="category-card">
            <div className="category-icon">⚙️</div>
            <h3>Automation & Integration</h3>
            <p>Workflow automation, API integrations, and process optimization tools</p>
            <div className="category-stats">
              <span>Avg. Funding: $15K - $75K</span>
              <span>Success Rate: 96%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeFiPlatform;
