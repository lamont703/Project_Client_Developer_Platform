import React, { useState } from 'react';

interface Bounty {
  id: string;
  title: string;
  description: string;
  reward: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: 'Frontend' | 'Backend' | 'AI' | 'DevOps' | 'Mobile' | 'Security';
  status: 'Open' | 'In Progress' | 'Under Review' | 'Completed';
  estimatedTime: string;
  requirements: string[];
  githubIssue?: string;
}

const BountyList: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');

  const bounties: Bounty[] = [
    {
      id: 'B001',
      title: 'Implement Dark Mode Toggle',
      description: 'Add a dark mode toggle to the navigation bar that persists user preference across sessions.',
      reward: 50,
      difficulty: 'Easy',
      category: 'Frontend',
      status: 'Open',
      estimatedTime: '4-6 hours',
      requirements: ['React experience', 'CSS knowledge', 'Local storage handling'],
      githubIssue: '#12'
    },
    {
      id: 'B002',
      title: 'Create API Rate Limiting System',
      description: 'Implement rate limiting for API endpoints to prevent abuse and ensure fair usage.',
      reward: 150,
      difficulty: 'Hard',
      category: 'Backend',
      status: 'Open',
      estimatedTime: '12-16 hours',
      requirements: ['Node.js experience', 'Express middleware', 'Redis knowledge'],
      githubIssue: '#23'
    },
    {
      id: 'B003',
      title: 'Mobile Responsive Dashboard',
      description: 'Optimize the developer dashboard for mobile devices with improved touch interactions.',
      reward: 100,
      difficulty: 'Medium',
      category: 'Mobile',
      status: 'In Progress',
      estimatedTime: '8-10 hours',
      requirements: ['Responsive design', 'CSS Grid/Flexbox', 'Touch event handling']
    },
    {
      id: 'B004',
      title: 'AI Chat History Feature',
      description: 'Add chat history functionality to the AI assistant with search and export capabilities.',
      reward: 120,
      difficulty: 'Medium',
      category: 'AI',
      status: 'Open',
      estimatedTime: '10-12 hours',
      requirements: ['React state management', 'Local storage', 'Search algorithms'],
      githubIssue: '#45'
    },
    {
      id: 'B005',
      title: 'Automated Testing Suite',
      description: 'Create comprehensive unit and integration tests for the bounty system.',
      reward: 80,
      difficulty: 'Medium',
      category: 'DevOps',
      status: 'Open',
      estimatedTime: '6-8 hours',
      requirements: ['Jest/React Testing Library', 'Test-driven development', 'CI/CD knowledge']
    },
    {
      id: 'B006',
      title: 'Two-Factor Authentication',
      description: 'Implement 2FA for user accounts using TOTP (Time-based One-Time Password).',
      reward: 200,
      difficulty: 'Hard',
      category: 'Security',
      status: 'Under Review',
      estimatedTime: '16-20 hours',
      requirements: ['Security best practices', 'TOTP implementation', 'QR code generation']
    }
  ];

  const categories = ['All', 'Frontend', 'Backend', 'AI', 'DevOps', 'Mobile', 'Security'];
  const difficulties = ['All', 'Easy', 'Medium', 'Hard'];

  const filteredBounties = bounties.filter(bounty => {
    const categoryMatch = selectedCategory === 'All' || bounty.category === selectedCategory;
    const difficultyMatch = selectedDifficulty === 'All' || bounty.difficulty === selectedDifficulty;
    return categoryMatch && difficultyMatch;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'difficulty-easy';
      case 'Medium': return 'difficulty-medium';
      case 'Hard': return 'difficulty-hard';
      default: return '';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open': return 'status-open';
      case 'In Progress': return 'status-progress';
      case 'Under Review': return 'status-review';
      case 'Completed': return 'status-completed';
      default: return '';
    }
  };

  const handleClaimBounty = (bountyId: string) => {
    // Implement bounty claiming logic
    console.log(`Claiming bounty: ${bountyId}`);
  };

  return (
    <div className="bounty-list">
      <div className="bounty-container">
        <div className="bounty-header">
          <h2>Active Bounties</h2>
          <p>Choose from available bounties and start earning WLFI tokens</p>
        </div>

        <div className="filters-section">
          <div className="filter-group">
            <label htmlFor="category-select">Category:</label>
            <select 
              id="category-select"
              value={selectedCategory} 
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="filter-select"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          
          <div className="filter-group">
            <label htmlFor="difficulty-select">Difficulty:</label>
            <select 
              id="difficulty-select"
              value={selectedDifficulty} 
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="filter-select"
            >
              {difficulties.map(difficulty => (
                <option key={difficulty} value={difficulty}>{difficulty}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="bounties-grid">
          {filteredBounties.map(bounty => (
            <div key={bounty.id} className="bounty-card">
              <div className="bounty-header-card">
                <div className="bounty-title-section">
                  <h3>{bounty.title}</h3>
                  <div className="bounty-badges">
                    <span className={`difficulty-badge ${getDifficultyColor(bounty.difficulty)}`}>
                      {bounty.difficulty}
                    </span>
                    <span className="category-badge">{bounty.category}</span>
                  </div>
                </div>
                <div className="bounty-reward">
                  <span className="reward-amount">{bounty.reward}</span>
                  <span className="reward-currency">WLFI</span>
                </div>
              </div>

              <p className="bounty-description">{bounty.description}</p>

              <div className="bounty-details">
                <div className="detail-item">
                  <span className="detail-label">Estimated Time:</span>
                  <span className="detail-value">{bounty.estimatedTime}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Status:</span>
                  <span className={`status-badge ${getStatusColor(bounty.status)}`}>
                    {bounty.status}
                  </span>
                </div>
                {bounty.githubIssue && (
                  <div className="detail-item">
                    <span className="detail-label">GitHub Issue:</span>
                    <span className="github-issue">{bounty.githubIssue}</span>
                  </div>
                )}
              </div>

              <div className="requirements-section">
                <h4>Requirements:</h4>
                <ul className="requirements-list">
                  {bounty.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </div>

              <div className="bounty-actions">
                {bounty.status === 'Open' && (
                  <button 
                    className="claim-button"
                    onClick={() => handleClaimBounty(bounty.id)}
                  >
                    Claim Bounty
                  </button>
                )}
                {bounty.githubIssue && (
                  <button className="github-button">
                    View Issue
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredBounties.length === 0 && (
          <div className="no-bounties">
            <div className="no-bounties-icon">🔍</div>
            <h3>No bounties found</h3>
            <p>Try adjusting your filters to see more bounties.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BountyList;
