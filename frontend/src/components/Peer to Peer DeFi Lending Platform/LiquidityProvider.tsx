import React, { useState } from 'react';

interface LiquidityProviderProps {}

const LiquidityProvider: React.FC<LiquidityProviderProps> = () => {
  const [projectCategory, setProjectCategory] = useState('software');
  const [liquidityAmount, setLiquidityAmount] = useState('');
  const [duration, setDuration] = useState('12');

  const projectCategories = [
    { 
      category: 'software', 
      label: 'Software Development', 
      icon: '💻',
      apy: '18.5%', 
      tvl: '$8.5M', 
      volume24h: '$2.1M',
      riskLevel: 'Medium'
    },
    { 
      category: 'ai', 
      label: 'AI & Machine Learning', 
      icon: '🤖',
      apy: '22.3%', 
      tvl: '$12.2M', 
      volume24h: '$3.8M',
      riskLevel: 'High'
    },
    { 
      category: 'blockchain', 
      label: 'Blockchain & Web3', 
      icon: '⛓️',
      apy: '25.7%', 
      tvl: '$15.8M', 
      volume24h: '$4.2M',
      riskLevel: 'High'
    },
    { 
      category: 'automation', 
      label: 'Automation & Integration', 
      icon: '⚙️',
      apy: '15.2%', 
      tvl: '$5.1M', 
      volume24h: '$1.2M',
      riskLevel: 'Low'
    }
  ];

  const liquidityTiers = [
    { tier: 'bronze', minAmount: '1 ETH', apyBonus: '+0%', benefits: ['Basic support', 'Standard terms'] },
    { tier: 'silver', minAmount: '5 ETH', apyBonus: '+2%', benefits: ['Priority support', 'Lower fees', 'Early access'] },
    { tier: 'gold', minAmount: '15 ETH', apyBonus: '+5%', benefits: ['VIP support', 'Custom terms', 'Advisory access'] },
    { tier: 'platinum', minAmount: '50 ETH', apyBonus: '+8%', benefits: ['White-glove service', 'Revenue sharing', 'Governance rights'] }
  ];

  const handleProvideLiquidity = () => {
    console.log('Providing liquidity:', { 
      projectCategory, 
      liquidityAmount, 
      duration 
    });
    // Implementation for liquidity provision logic
  };

  const selectedCategory = projectCategories.find(c => c.category === projectCategory);

  return (
    <div className="liquidity-provider">
      <h2>🌊 Provide Tech Project Liquidity</h2>
      <p className="liquidity-description">
        Support the tech project ecosystem by providing liquidity for Software, AI, Blockchain, and Automation projects
      </p>
      
      <div className="liquidity-form">
        <div className="form-group">
          <label>Project Category Focus</label>
          <div className="category-selector">
            {projectCategories.map(category => (
              <button
                key={category.category}
                className={`category-btn ${projectCategory === category.category ? 'active' : ''}`}
                onClick={() => setProjectCategory(category.category)}
              >
                <span className="category-icon">{category.icon}</span>
                <span className="category-label">{category.label}</span>
                <span className="category-apy">{category.apy} APY</span>
                <span className="category-risk">{category.riskLevel} Risk</span>
              </button>
            ))}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Liquidity Amount (ETH)</label>
            <input
              type="number"
              value={liquidityAmount}
              onChange={(e) => setLiquidityAmount(e.target.value)}
              placeholder="Enter liquidity amount"
              className="amount-input"
            />
          </div>

          <div className="form-group">
            <label>Commitment Duration (months)</label>
            <select 
              value={duration} 
              onChange={(e) => setDuration(e.target.value)}
              className="duration-select"
            >
              <option value="6">6 months</option>
              <option value="12">12 months</option>
              <option value="18">18 months</option>
              <option value="24">24 months</option>
            </select>
          </div>
        </div>

        {selectedCategory && (
          <div className="category-info">
            <h4>Selected Category: {selectedCategory.label}</h4>
            <div className="category-details">
              <div className="detail-item">
                <span>Expected APY:</span>
                <span className="apy-value">{selectedCategory.apy}</span>
              </div>
              <div className="detail-item">
                <span>Pool TVL:</span>
                <span>{selectedCategory.tvl}</span>
              </div>
              <div className="detail-item">
                <span>24h Volume:</span>
                <span>{selectedCategory.volume24h}</span>
              </div>
              <div className="detail-item">
                <span>Risk Level:</span>
                <span className={`risk-level ${selectedCategory.riskLevel.toLowerCase()}`}>
                  {selectedCategory.riskLevel}
                </span>
              </div>
            </div>
          </div>
        )}

        <div className="liquidity-tiers">
          <h4>Liquidity Provider Tiers</h4>
          <div className="tiers-grid">
            {liquidityTiers.map(tier => (
              <div key={tier.tier} className={`tier-card ${tier.tier}`}>
                <div className="tier-name">{tier.tier.charAt(0).toUpperCase() + tier.tier.slice(1)}</div>
                <div className="tier-min">{tier.minAmount}</div>
                <div className="tier-bonus">{tier.apyBonus} APY Bonus</div>
                <ul className="tier-benefits">
                  {tier.benefits.map((benefit, index) => (
                    <li key={index}>{benefit}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <button onClick={handleProvideLiquidity} className="liquidity-button">
          Provide Project Liquidity
        </button>
      </div>

      <div className="liquidity-benefits">
        <h3>Benefits of Providing Tech Project Liquidity</h3>
        <div className="benefits-grid">
          <div className="benefit-card">
            <div className="benefit-icon">📈</div>
            <h4>High Returns</h4>
            <p>Earn competitive APY by supporting innovative tech projects</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">🎯</div>
            <h4>Project Diversification</h4>
            <p>Spread risk across multiple tech project categories</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">🤝</div>
            <h4>Community Impact</h4>
            <p>Help fund the next generation of tech innovations</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">⚡</div>
            <h4>Flexible Terms</h4>
            <p>Choose your commitment duration and risk level</p>
          </div>
        </div>
      </div>

      <div className="project-pools">
        <h3>Active Project Liquidity Pools</h3>
        <div className="pools-grid">
          {projectCategories.map(category => (
            <div key={category.category} className="pool-card">
              <div className="pool-header">
                <span className="pool-icon">{category.icon}</span>
                <div className="pool-category">{category.label}</div>
              </div>
              <div className="pool-apy">{category.apy} APY</div>
              <div className="pool-tvl">TVL: {category.tvl}</div>
              <div className="pool-volume">24h Volume: {category.volume24h}</div>
              <div className={`pool-risk ${category.riskLevel.toLowerCase()}`}>
                Risk: {category.riskLevel}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LiquidityProvider;
