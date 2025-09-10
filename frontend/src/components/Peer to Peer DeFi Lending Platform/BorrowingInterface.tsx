import React, { useState } from 'react';

interface BorrowingInterfaceProps {}

const BorrowingInterface: React.FC<BorrowingInterfaceProps> = () => {
  const [projectType, setProjectType] = useState('software');
  const [projectStage, setProjectStage] = useState('development');
  const [borrowAmount, setBorrowAmount] = useState('');
  const [projectDuration, setProjectDuration] = useState('6');
  const [hasPrototype, setHasPrototype] = useState(false);

  const projectTypes = [
    { 
      type: 'software', 
      label: 'Software Development', 
      icon: '💻',
      maxLoan: '$50K',
      rate: '8.5%',
      collateralRatio: '120%'
    },
    { 
      type: 'ai', 
      label: 'AI & Machine Learning', 
      icon: '🤖',
      maxLoan: '$100K',
      rate: '10.2%',
      collateralRatio: '130%'
    },
    { 
      type: 'blockchain', 
      label: 'Blockchain & Web3', 
      icon: '⛓️',
      maxLoan: '$150K',
      rate: '12.8%',
      collateralRatio: '140%'
    },
    { 
      type: 'automation', 
      label: 'Automation & Integration', 
      icon: '⚙️',
      maxLoan: '$30K',
      rate: '7.5%',
      collateralRatio: '110%'
    }
  ];

  const projectStages = [
    { stage: 'idea', label: 'Idea Stage', description: 'Concept and planning phase', rateModifier: '+2%' },
    { stage: 'development', label: 'Development', description: 'Active development phase', rateModifier: '+0%' },
    { stage: 'testing', label: 'Testing & MVP', description: 'Testing and MVP completion', rateModifier: '-1%' },
    { stage: 'launch', label: 'Pre-Launch', description: 'Ready for market launch', rateModifier: '-2%' }
  ];

  const collateralOptions = [
    { asset: 'ETH', price: '$2,400', ltv: '80%', description: 'Ethereum tokens' },
    { asset: 'USDC', price: '$1.00', ltv: '95%', description: 'Stablecoin collateral' },
    { asset: 'Project Tokens', price: 'Variable', ltv: '60%', description: 'Your project tokens' },
    { asset: 'Revenue Share', price: 'N/A', ltv: '50%', description: 'Future revenue percentage' }
  ];

  const handleApplyForLoan = () => {
    console.log('Applying for project loan:', { 
      projectType, 
      projectStage, 
      borrowAmount, 
      projectDuration,
      hasPrototype
    });
    // Implementation for loan application logic
  };

  const selectedProject = projectTypes.find(p => p.type === projectType);
  const selectedStage = projectStages.find(s => s.stage === projectStage);

  return (
    <div className="borrowing-interface">
      <h2>📈 Get Project Funding</h2>
      <p className="borrow-description">
        Apply for funding for your Software, AI, Blockchain, or Automation project with flexible terms
      </p>
      
      <div className="borrowing-form">
        <div className="form-group">
          <label>Project Category</label>
          <div className="project-type-selector">
            {projectTypes.map(project => (
              <button
                key={project.type}
                className={`project-type-btn ${projectType === project.type ? 'active' : ''}`}
                onClick={() => setProjectType(project.type)}
              >
                <span className="project-icon">{project.icon}</span>
                <span className="project-label">{project.label}</span>
                <span className="project-rate">{project.rate}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Project Stage</label>
            <select 
              value={projectStage} 
              onChange={(e) => setProjectStage(e.target.value)}
              className="stage-select"
            >
              {projectStages.map(stage => (
                <option key={stage.stage} value={stage.stage}>
                  {stage.label} - {stage.description}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Loan Amount (USD)</label>
            <input
              type="number"
              value={borrowAmount}
              onChange={(e) => setBorrowAmount(e.target.value)}
              placeholder="Enter loan amount"
              className="amount-input"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Project Duration (months)</label>
            <select 
              value={projectDuration} 
              onChange={(e) => setProjectDuration(e.target.value)}
              className="duration-select"
            >
              <option value="3">3 months</option>
              <option value="6">6 months</option>
              <option value="12">12 months</option>
              <option value="18">18 months</option>
              <option value="24">24 months</option>
            </select>
          </div>

          <div className="form-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={hasPrototype}
                onChange={(e) => setHasPrototype(e.target.checked)}
                className="prototype-checkbox"
              />
              <span>I have a working prototype/MVP</span>
            </label>
          </div>
        </div>

        <div className="loan-terms">
          <h4>Loan Terms Preview</h4>
          <div className="terms-grid">
            <div className="term-item">
              <span>Project Type:</span>
              <span>{selectedProject?.label}</span>
            </div>
            <div className="term-item">
              <span>Base Interest Rate:</span>
              <span>{selectedProject?.rate}</span>
            </div>
            <div className="term-item">
              <span>Stage Modifier:</span>
              <span>{selectedStage?.rateModifier}</span>
            </div>
            <div className="term-item">
              <span>Max Loan Amount:</span>
              <span>{selectedProject?.maxLoan}</span>
            </div>
            <div className="term-item">
              <span>Collateral Ratio:</span>
              <span>{selectedProject?.collateralRatio}</span>
            </div>
            <div className="term-item">
              <span>Prototype Bonus:</span>
              <span>{hasPrototype ? '-0.5%' : '+0%'}</span>
            </div>
          </div>
        </div>

        <div className="collateral-options">
          <h4>Collateral Options</h4>
          <div className="collateral-grid">
            {collateralOptions.map(option => (
              <div key={option.asset} className="collateral-card">
                <div className="collateral-asset">{option.asset}</div>
                <div className="collateral-price">{option.price}</div>
                <div className="collateral-ltv">LTV: {option.ltv}</div>
                <div className="collateral-description">{option.description}</div>
              </div>
            ))}
          </div>
        </div>

        <button onClick={handleApplyForLoan} className="apply-button">
          Apply for Project Funding
        </button>
      </div>

      <div className="funding-benefits">
        <h3>Why Choose Our Project Funding?</h3>
        <div className="benefits-grid">
          <div className="benefit-card">
            <div className="benefit-icon">🎯</div>
            <h4>Project-Focused</h4>
            <p>Loans specifically designed for tech projects with milestone-based releases</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">⚡</div>
            <h4>Fast Approval</h4>
            <p>Quick decisions based on project merit and technical feasibility</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">🤝</div>
            <h4>Mentorship</h4>
            <p>Access to our developer community and technical advisors</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">📊</div>
            <h4>Flexible Terms</h4>
            <p>Customized repayment schedules based on project milestones</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BorrowingInterface;
