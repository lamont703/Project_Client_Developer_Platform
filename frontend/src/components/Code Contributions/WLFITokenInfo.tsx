import React, { useState } from 'react';

const WLFITokenInfo: React.FC = () => {
  const [walletAddress, setWalletAddress] = useState('');

  const tokenStats = {
    totalSupply: '1,000,000',
    circulatingSupply: '250,000',
    bountyPool: '50,000',
    currentPrice: '$0.25',
    marketCap: '$250,000'
  };

  const recentEarnings = [
    { contributor: 'dev_alice', amount: 150, task: 'API Rate Limiting System', date: '2024-01-15' },
    { contributor: 'code_master', amount: 100, task: 'Mobile Dashboard Optimization', date: '2024-01-14' },
    { contributor: 'ui_ninja', amount: 50, task: 'Dark Mode Toggle', date: '2024-01-13' },
    { contributor: 'backend_guru', amount: 120, task: 'AI Chat History Feature', date: '2024-01-12' },
    { contributor: 'test_hero', amount: 80, task: 'Automated Testing Suite', date: '2024-01-11' }
  ];

  const handleConnectWallet = () => {
    // Implement wallet connection logic
    console.log('Connecting wallet...');
  };

  const handleClaimTokens = () => {
    // Implement token claiming logic
    console.log('Claiming tokens...');
  };

  return (
    <div className="wlfi-token-info">
      <div className="token-container">
        <div className="token-header">
          <div className="token-logo">
            <div className="token-icon">🪙</div>
            <div className="token-details">
              <h2>WLFI Token</h2>
              <p className="token-subtitle">World Liberty Financial Intelligence Token</p>
            </div>
          </div>
          <div className="token-price">
            <div className="price-value">{tokenStats.currentPrice}</div>
            <div className="price-change positive">+12.5%</div>
          </div>
        </div>

        <div className="token-stats-grid">
          <div className="stat-card">
            <div className="stat-label">Total Supply</div>
            <div className="stat-value">{tokenStats.totalSupply}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Circulating Supply</div>
            <div className="stat-value">{tokenStats.circulatingSupply}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Bounty Pool</div>
            <div className="stat-value">{tokenStats.bountyPool}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Market Cap</div>
            <div className="stat-value">{tokenStats.marketCap}</div>
          </div>
        </div>

        <div className="wallet-section">
          <h3>Connect Your Wallet</h3>
          <p>Connect your wallet to receive WLFI tokens for completed bounties</p>
          
          <div className="wallet-input-group">
            <input
              type="text"
              placeholder="Enter your wallet address (0x...)"
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
              className="wallet-input"
            />
            <button className="connect-wallet-button" onClick={handleConnectWallet}>
              Connect Wallet
            </button>
          </div>

          <div className="supported-wallets">
            <span className="supported-label">Supported wallets:</span>
            <div className="wallet-icons">
              <div className="wallet-icon">🦊 MetaMask</div>
              <div className="wallet-icon">👑 WalletConnect</div>
              <div className="wallet-icon">🔷 Coinbase</div>
            </div>
          </div>
        </div>

        <div className="earning-potential">
          <h3>Earning Potential</h3>
          <div className="earning-grid">
            <div className="earning-card easy">
              <div className="earning-difficulty">Easy Tasks</div>
              <div className="earning-range">25 - 75 WLFI</div>
              <div className="earning-description">
                UI improvements, bug fixes, documentation
              </div>
            </div>
            <div className="earning-card medium">
              <div className="earning-difficulty">Medium Tasks</div>
              <div className="earning-range">75 - 150 WLFI</div>
              <div className="earning-description">
                New features, API development, testing
              </div>
            </div>
            <div className="earning-card hard">
              <div className="earning-difficulty">Hard Tasks</div>
              <div className="earning-range">150 - 300 WLFI</div>
              <div className="earning-description">
                Complex features, security, architecture
              </div>
            </div>
          </div>
        </div>

        <div className="token-utility">
          <h3>Token Utility</h3>
          <div className="utility-grid">
            <div className="utility-card">
              <div className="utility-icon">🎯</div>
              <h4>Platform Access</h4>
              <p>Use WLFI tokens to access premium platform features and services</p>
            </div>
            <div className="utility-card">
              <div className="utility-icon">🗳️</div>
              <h4>Governance</h4>
              <p>Vote on platform improvements and feature priorities</p>
            </div>
            <div className="utility-card">
              <div className="utility-icon">🎁</div>
              <h4>Rewards & Bonuses</h4>
              <p>Earn additional tokens through community participation</p>
            </div>
            <div className="utility-card">
              <div className="utility-icon">💱</div>
              <h4>Trading</h4>
              <p>Trade WLFI tokens on supported decentralized exchanges</p>
            </div>
          </div>
        </div>

        <div className="recent-earnings">
          <h3>Recent Community Earnings</h3>
          <div className="earnings-list">
            {recentEarnings.map((earning, index) => (
              <div key={index} className="earning-item">
                <div className="earning-contributor">
                  <div className="contributor-avatar">
                    {earning.contributor.charAt(0).toUpperCase()}
                  </div>
                  <div className="contributor-info">
                    <div className="contributor-name">{earning.contributor}</div>
                    <div className="contribution-task">{earning.task}</div>
                  </div>
                </div>
                <div className="earning-details">
                  <div className="earning-amount">+{earning.amount} WLFI</div>
                  <div className="earning-date">{earning.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="token-roadmap">
          <h3>WLFI Token Roadmap</h3>
          <div className="roadmap-timeline">
            <div className="roadmap-item completed">
              <div className="roadmap-marker"></div>
              <div className="roadmap-content">
                <h4>Q4 2023 - Token Launch</h4>
                <p>Initial token distribution and bounty system launch</p>
              </div>
            </div>
            <div className="roadmap-item completed">
              <div className="roadmap-marker"></div>
              <div className="roadmap-content">
                <h4>Q1 2024 - Platform Integration</h4>
                <p>Full platform integration and governance features</p>
              </div>
            </div>
            <div className="roadmap-item current">
              <div className="roadmap-marker"></div>
              <div className="roadmap-content">
                <h4>Q2 2024 - DeFi Integration</h4>
                <p>DEX listing and liquidity pool creation</p>
              </div>
            </div>
            <div className="roadmap-item">
              <div className="roadmap-marker"></div>
              <div className="roadmap-content">
                <h4>Q3 2024 - Staking Rewards</h4>
                <p>Implement staking mechanism for long-term holders</p>
              </div>
            </div>
          </div>
        </div>

        <div className="claim-section">
          <div className="claim-card">
            <h3>Ready to Claim Your Tokens?</h3>
            <p>You have <strong>0 WLFI</strong> tokens ready to claim</p>
            <button className="claim-button" onClick={handleClaimTokens}>
              Claim Tokens
            </button>
            <p className="claim-note">
              Complete bounties to earn tokens that can be claimed here
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WLFITokenInfo;
