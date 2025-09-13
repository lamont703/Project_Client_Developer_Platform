import React, { useState } from 'react';
import { BountyData } from '../../utils/wlfiService';
import '../../styles/Gamification/BountyCard.css';

interface BountyCardProps {
  bounty: BountyData;
  onApply: (bountyId: string) => void;
  onViewDetails: (bountyId: string) => void;
}

const BountyCard: React.FC<BountyCardProps> = ({ bounty, onApply, onViewDetails }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return '#10b981';
      case 'Medium': return '#f59e0b';
      case 'Hard': return '#ef4444';
      case 'Expert': return '#8b5cf6';
      default: return '#6b7280';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Frontend': return '🎨';
      case 'Backend': return '⚙️';
      case 'DevOps': return '🚀';
      case 'Design': return '🎨';
      case 'Documentation': return '📚';
      case 'Testing': return '🧪';
      default: return '💼';
    }
  };

  const formatDeadline = (deadline?: string) => {
    if (!deadline) return 'No deadline';
    const date = new Date(deadline);
    const now = new Date();
    const diffTime = date.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return 'Expired';
    if (diffDays === 0) return 'Due today';
    if (diffDays === 1) return 'Due tomorrow';
    return `${diffDays} days left`;
  };

  return (
    <div className={`bounty-card ${bounty.status.toLowerCase().replace(' ', '-')}`}>
      <div className="bounty-header">
        <div className="bounty-meta">
          <div className="bounty-category">
            <span className="category-icon">{getCategoryIcon(bounty.category)}</span>
            <span className="category-text">{bounty.category}</span>
          </div>
          <div 
            className="bounty-difficulty"
            style={{ backgroundColor: getDifficultyColor(bounty.difficulty) }}
          >
            {bounty.difficulty}
          </div>
        </div>
        
        <div className="bounty-reward">
          <span className="reward-amount">{bounty.reward}</span>
          <span className="reward-currency">WLFI</span>
        </div>
      </div>

      <div className="bounty-content">
        <h3 className="bounty-title">{bounty.title}</h3>
        <p className="bounty-description">{bounty.description}</p>
        
        <div className="bounty-details">
          <div className="detail-item">
            <span className="detail-label">⏱️ Estimated:</span>
            <span className="detail-value">{bounty.estimatedHours}h</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">📅 Deadline:</span>
            <span className="detail-value">{formatDeadline(bounty.deadline)}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">👤 Created by:</span>
            <span className="detail-value">{bounty.createdBy}</span>
          </div>
        </div>

        {isExpanded && (
          <div className="bounty-expanded">
            <div className="requirements-section">
              <h4>Requirements</h4>
              <ul className="requirements-list">
                {bounty.requirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </div>
            
            <div className="skills-section">
              <h4>Skills Needed</h4>
              <div className="skills-tags">
                {bounty.skills.map((skill, index) => (
                  <span key={index} className="skill-tag">{skill}</span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="bounty-actions">
        <button 
          className="action-btn secondary"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? 'Show Less' : 'Show More'}
        </button>
        
        <button 
          className="action-btn primary"
          onClick={() => onApply(bounty.id)}
          disabled={bounty.status !== 'Open'}
        >
          {bounty.status === 'Open' ? 'Apply Now' : bounty.status}
        </button>
        
        <button 
          className="action-btn tertiary"
          onClick={() => onViewDetails(bounty.id)}
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default BountyCard; 