import React, { useState } from 'react';

interface LendingPoolProps {}

const LendingPool: React.FC<LendingPoolProps> = () => {
  const [selectedProjectType, setSelectedProjectType] = useState('software');
  const [amount, setAmount] = useState('');
  const [duration, setDuration] = useState('6');
  const [riskLevel, setRiskLevel] = useState('medium');

  const projectTypes = [
    { 
      type: 'software', 
      label: 'Software Development', 
      icon: '💻',
      apy: '12.5%', 
      tvl: '$2.4M', 
      available: '1,200 ETH',
      description: 'Web apps, mobile apps, SaaS platforms'
    },
    { 
      type: 'ai', 
      label: 'AI & Machine Learning', 
      icon: '🤖',
      apy: '15.8%', 
      tvl: '$3.2M', 
      available: '1,800 ETH',
      description: 'AI models, ML algorithms, automation'
    },
    { 
      type: 'blockchain', 
      label: 'Blockchain & Web3', 
      icon: '⛓️',
      apy: '18.2%', 
      tvl: '$4.1M', 
      available: '2,200 ETH',
      description: 'DApps, DeFi protocols, NFT platforms'
    },
    { 
      type: 'automation', 
      label: 'Automation & Integration', 
      icon: '⚙️',
      apy: '10.3%', 
      tvl: '$1.8M', 
      available: '950 ETH',
      description: 'Workflow automation, API integrations'
    }
  ];

  const riskLevels = [
    { level: 'low', label: 'Low Risk', description: 'Established teams, proven track record', multiplier: '1.0x' },
    { level: 'medium', label: 'Medium Risk', description: 'Experienced developers, solid project plan', multiplier: '1.2x' },
    { level: 'high', label: 'High Risk', description: 'Early-stage projects, innovative concepts', multiplier: '1.5x' }
  ];

  const handleFundProject = () => {
    console.log('Funding project:', { 
      projectType: selectedProjectType, 
      amount, 
      duration, 
      riskLevel 
    });
    // Implementation for project funding logic
  };

  const selectedProject = projectTypes.find(p => p.type === selectedProjectType);

  return (
    <div className="lending-pool">
      <h2>💰 Fund Tech Projects</h2>
      <p className="pool-description">
        Invest in vetted Software, AI, Blockchain, and Automation projects with transparent milestone tracking
      </p>
      
      <div className="lending-form">
        <div className="form-group">
          <label>Project Category</label>
          <div className="project-type-selector">
            {projectTypes.map(project => (
              <button
                key={project.type}
                className={`project-type-btn ${selectedProjectType === project.type ? 'active' : ''}`}
                onClick={() => setSelectedProjectType(project.type)}
              >
                <span className="project-icon">{project.icon}</span>
                <span className="project-label">{project.label}</span>
                <span className="project-apy">{project.apy} APY</span>
              </button>
            ))}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Investment Amount (ETH)</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              className="amount-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="duration-select">Investment Duration (months)</label>
            <select 
              id="duration-select"
              value={duration} 
              onChange={(e) => setDuration(e.target.value)}
              className="duration-select"
            >
              <option value="3">3 months</option>
              <option value="6">6 months</option>
              <option value="12">12 months</option>
              <option value="18">18 months</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>Risk Tolerance</label>
          <div className="risk-selector">
            {riskLevels.map(risk => (
              <button
                key={risk.level}
                className={`risk-btn ${riskLevel === risk.level ? 'active' : ''}`}
                onClick={() => setRiskLevel(risk.level)}
              >
                <span className="risk-label">{risk.label}</span>
                <span className="risk-multiplier">{risk.multiplier}</span>
                <span className="risk-description">{risk.description}</span>
              </button>
            ))}
          </div>
        </div>

        {selectedProject && (
          <div className="project-info">
            <h4>Selected Project Category: {selectedProject.label}</h4>
            <div className="project-details">
              <div className="detail-item">
                <span>Description:</span>
                <span>{selectedProject.description}</span>
              </div>
              <div className="detail-item">
                <span>Expected APY:</span>
                <span className="apy-value">{selectedProject.apy}</span>
              </div>
              <div className="detail-item">
                <span>Pool TVL:</span>
                <span>{selectedProject.tvl}</span>
              </div>
              <div className="detail-item">
                <span>Available:</span>
                <span>{selectedProject.available}</span>
              </div>
            </div>
          </div>
        )}

        <button onClick={handleFundProject} className="fund-button">
          Start Funding Projects
        </button>
      </div>

      <div className="pool-stats">
        <h3>Active Project Funding Pools</h3>
        <div className="pools-grid">
          {projectTypes.map(project => (
            <div key={project.type} className="pool-card">
              <div className="pool-header">
                <span className="pool-icon">{project.icon}</span>
                <div className="pool-asset">{project.label}</div>
              </div>
              <div className="pool-apy">{project.apy} APY</div>
              <div className="pool-tvl">TVL: {project.tvl}</div>
              <div className="pool-available">Available: {project.available}</div>
              <div className="pool-description">{project.description}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LendingPool;
