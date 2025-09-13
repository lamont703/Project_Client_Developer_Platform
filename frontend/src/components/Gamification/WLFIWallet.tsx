import React, { useState, useEffect } from 'react';
import WLFIService, { WLFITokenData, WLFITransaction } from '../../utils/wlfiService';
import '../../styles/Gamification/WLFIWallet.css';

const WLFIWallet: React.FC = () => {
  const [tokenData, setTokenData] = useState<WLFITokenData>({
    balance: 0,
    staked: 0,
    totalEarned: 0,
    isConnected: false
  });
  const [transactions, setTransactions] = useState<WLFITransaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [stakeAmount, setStakeAmount] = useState('');
  const [unstakeAmount, setUnstakeAmount] = useState('');
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    loadWalletData();
  }, []);

  const loadWalletData = async () => {
    setIsLoading(true);
    try {
      const wlfiService = WLFIService.getInstance();
      const data = wlfiService.getTokenData();
      const txHistory = wlfiService.getTransactions();
      setTokenData(data);
      setTransactions(txHistory);
    } catch (error) {
      console.error('Failed to load wallet data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleConnectWallet = async () => {
    setIsLoading(true);
    try {
      const wlfiService = WLFIService.getInstance();
      const success = await wlfiService.connectWallet();
      if (success) {
        await loadWalletData();
      }
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStake = async () => {
    const amount = parseFloat(stakeAmount);
    if (amount <= 0 || amount > tokenData.balance) return;

    setIsLoading(true);
    try {
      const wlfiService = WLFIService.getInstance();
      const success = await wlfiService.stakeTokens(amount);
      if (success) {
        setStakeAmount('');
        await loadWalletData();
      }
    } catch (error) {
      console.error('Failed to stake tokens:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnstake = async () => {
    const amount = parseFloat(unstakeAmount);
    if (amount <= 0 || amount > tokenData.staked) return;

    setIsLoading(true);
    try {
      const wlfiService = WLFIService.getInstance();
      const success = await wlfiService.unstakeTokens(amount);
      if (success) {
        setUnstakeAmount('');
        await loadWalletData();
      }
    } catch (error) {
      console.error('Failed to unstake tokens:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatTransactionType = (type: string) => {
    switch (type) {
      case 'Reward': return '🎁';
      case 'Stake': return '🔒';
      case 'Unstake': return '🔓';
      case 'Transfer': return '↔️';
      case 'Purchase': return '🛒';
      default: return '💰';
    }
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!tokenData.isConnected) {
    return (
      <div className="wlfi-wallet">
        <div className="wallet-connect">
          <div className="connect-header">
            <h2>Connect Your Wallet</h2>
            <p>Connect your wallet to start earning WLFI tokens</p>
          </div>
          <button 
            className="connect-btn"
            onClick={handleConnectWallet}
            disabled={isLoading}
          >
            {isLoading ? 'Connecting...' : 'Connect Wallet'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="wlfi-wallet">
      <div className="wallet-header">
        <h2>WLFI Wallet</h2>
        <div className="wallet-address">
          <span className="address-label">Address:</span>
          <span className="address-value">{tokenData.walletAddress}</span>
        </div>
      </div>

      <div className="wallet-tabs">
        <button 
          className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button 
          className={`tab-btn ${activeTab === 'staking' ? 'active' : ''}`}
          onClick={() => setActiveTab('staking')}
        >
          Staking
        </button>
        <button 
          className={`tab-btn ${activeTab === 'transactions' ? 'active' : ''}`}
          onClick={() => setActiveTab('transactions')}
        >
          Transactions
        </button>
      </div>

      <div className="wallet-content">
        {activeTab === 'overview' && (
          <div className="overview-tab">
            <div className="balance-cards">
              <div className="balance-card">
                <div className="balance-icon">💰</div>
                <div className="balance-info">
                  <div className="balance-amount">{tokenData.balance.toLocaleString()}</div>
                  <div className="balance-label">Available WLFI</div>
                </div>
              </div>
              
              <div className="balance-card">
                <div className="balance-icon">🔒</div>
                <div className="balance-info">
                  <div className="balance-amount">{tokenData.staked.toLocaleString()}</div>
                  <div className="balance-label">Staked WLFI</div>
                </div>
              </div>
              
              <div className="balance-card">
                <div className="balance-icon">📈</div>
                <div className="balance-info">
                  <div className="balance-amount">{tokenData.totalEarned.toLocaleString()}</div>
                  <div className="balance-label">Total Earned</div>
                </div>
              </div>
            </div>

            <div className="wallet-actions">
              <button className="action-btn primary">Send Tokens</button>
              <button className="action-btn secondary">Receive Tokens</button>
              <button className="action-btn tertiary">View on Explorer</button>
            </div>
          </div>
        )}

        {activeTab === 'staking' && (
          <div className="staking-tab">
            <div className="staking-info">
              <h3>Stake WLFI Tokens</h3>
              <p>Stake your WLFI tokens to earn additional rewards and participate in platform governance.</p>
            </div>

            <div className="staking-actions">
              <div className="stake-section">
                <h4>Stake Tokens</h4>
                <div className="input-group">
                  <input
                    type="number"
                    placeholder="Amount to stake"
                    value={stakeAmount}
                    onChange={(e) => setStakeAmount(e.target.value)}
                    className="stake-input"
                  />
                  <button 
                    className="stake-btn"
                    onClick={handleStake}
                    disabled={isLoading || !stakeAmount}
                  >
                    Stake
                  </button>
                </div>
                <div className="available-balance">
                  Available: {tokenData.balance.toLocaleString()} WLFI
                </div>
              </div>

              <div className="unstake-section">
                <h4>Unstake Tokens</h4>
                <div className="input-group">
                  <input
                    type="number"
                    placeholder="Amount to unstake"
                    value={unstakeAmount}
                    onChange={(e) => setUnstakeAmount(e.target.value)}
                    className="stake-input"
                  />
                  <button 
                    className="unstake-btn"
                    onClick={handleUnstake}
                    disabled={isLoading || !unstakeAmount}
                  >
                    Unstake
                  </button>
                </div>
                <div className="staked-balance">
                  Staked: {tokenData.staked.toLocaleString()} WLFI
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'transactions' && (
          <div className="transactions-tab">
            <div className="transactions-header">
              <h3>Transaction History</h3>
              <div className="transaction-count">
                {transactions.length} transactions
              </div>
            </div>

            <div className="transactions-list">
              {transactions.length === 0 ? (
                <div className="empty-transactions">
                  <div className="empty-icon">📝</div>
                  <p>No transactions yet</p>
                </div>
              ) : (
                transactions.map(transaction => (
                  <div key={transaction.id} className="transaction-item">
                    <div className="transaction-icon">
                      {formatTransactionType(transaction.type)}
                    </div>
                    <div className="transaction-details">
                      <div className="transaction-description">
                        {transaction.description}
                      </div>
                      <div className="transaction-meta">
                        <span className="transaction-type">{transaction.type}</span>
                        <span className="transaction-date">{formatTimestamp(transaction.timestamp)}</span>
                      </div>
                    </div>
                    <div className="transaction-amount">
                      <span className={`amount ${transaction.type === 'Reward' ? 'positive' : 'neutral'}`}>
                        {transaction.type === 'Reward' ? '+' : ''}{transaction.amount} WLFI
                      </span>
                      <span className={`status ${transaction.status.toLowerCase()}`}>
                        {transaction.status}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WLFIWallet; 