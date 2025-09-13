import React, { useState } from 'react';
import '../../styles/Code Contributions/RepositoryInfo.css';

const RepositoryInfo: React.FC = () => {
  const repositoryUrl = "https://github.com/lamont703/Project_Client_Developer_Platform";
  const cloneCommand = "git clone https://github.com/lamont703/Project_Client_Developer_Platform.git";

  const [isQuickActionsExpanded, setIsQuickActionsExpanded] = useState(false);

  const handleOpenRepository = () => {
    window.open(repositoryUrl, '_blank');
  };

  const handleCloneRepository = async () => {
    try {
      await navigator.clipboard.writeText(cloneCommand);
      alert('Git clone command copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const toggleQuickActions = () => {
    setIsQuickActionsExpanded(!isQuickActionsExpanded);
  };

  return (
    <div className="repository-info">
      <div className="info-container">
        <div className="repo-header">
          <div className="repo-icon">
            <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="GitHub Logo" />
          </div>
          <div className="repo-details">
            <h2>Project Client Developer Platform</h2>
            <p className="repo-description">A comprehensive mobile-first static website workspace for a developer job marketplace platform, featuring complete documentation, wireframes, and interactive prototypes.</p>
            <a href={repositoryUrl} target="_blank" rel="noopener noreferrer" className="repo-link">
              {repositoryUrl}
            </a>
          </div>
        </div>

        <div className="repo-stats-grid">
          <div className="stat-item">
            <span className="stat-icon">⭐</span>
            <span className="stat-value">0 Stars</span>
          </div>
          <div className="stat-item">
            <span className="stat-icon">🍴</span>
            <span className="stat-value">0 Forks</span>
          </div>
          <div className="stat-item">
            <span className="stat-icon">👁️</span>
            <span className="stat-value">0 Watchers</span>
          </div>
          <div className="stat-item">
            <span className="stat-icon">📜</span>
            <span className="stat-value">MIT License</span>
          </div>
        </div>

        <div className="tech-stack">
          <h3>Technology Stack</h3>
          <div className="tech-tags">
            <span className="tech-tag react">React</span>
            <span className="tech-tag typescript">TypeScript</span>
            <span className="tech-tag nodejs">Node.js</span>
            <span className="tech-tag css">CSS3</span>
            <span className="tech-tag html">HTML5</span>
            <span className="tech-tag git">Git</span>
            <span className="tech-tag sql">PostgreSQL</span>
          </div>
        </div>

        <div className={`quick-actions ${isQuickActionsExpanded ? 'expanded' : 'collapsed'}`}>
          <div className="section-header" onClick={toggleQuickActions}>
            <h3 className="section-title">Quick Actions</h3>
            <span className={`expand-icon ${isQuickActionsExpanded ? "rotated" : ""}`}>
              ▼
            </span>
          </div>
          {isQuickActionsExpanded && (
            <div className="actions-grid">
              <button className="action-button primary" onClick={handleOpenRepository}>
                <span className="button-icon">🔗</span>
                View Repository
              </button>
              <button className="action-button secondary" onClick={handleCloneRepository}>
                <span className="button-icon">📥</span>
                Copy Clone Command
              </button>
              <button className="action-button secondary">
                <span className="button-icon">📋</span>
                View Issues
              </button>
            </div>
          )}
        </div>

        <div className="contribution-areas">
          <h3>Areas Looking for Contributors</h3>
          <div className="areas-grid">
            <div className="area-card">
              <div className="area-icon">🎨</div>
              <h4>Frontend Development</h4>
              <p>React components, UI/UX improvements, responsive design</p>
            </div>
            <div className="area-card">
              <div className="area-icon">⚙️</div>
              <h4>Backend Development</h4>
              <p>API endpoints, database optimization, server logic</p>
            </div>
            <div className="area-card">
              <div className="area-icon">🤖</div>
              <h4>AI Integration</h4>
              <p>AI assistant features, machine learning models</p>
            </div>
            <div className="area-card">
              <div className="area-icon">☁️</div>
              <h4>DevOps & Infrastructure</h4>
              <p>CI/CD pipelines, cloud deployments, serverless functions</p>
            </div>
            <div className="area-card">
              <div className="area-icon">📱</div>
              <h4>Mobile Development</h4>
              <p>Native app features, cross-platform compatibility</p>
            </div>
            <div className="area-card">
              <div className="area-icon">🔒</div>
              <h4>Security Enhancements</h4>
              <p>Authentication, authorization, security audits</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RepositoryInfo;
