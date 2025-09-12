import React, { useState } from 'react';
import '../../styles/Gamification/RewardCenter.css';

interface Reward {
  id: string;
  name: string;
  description: string;
  icon: string;
  pointsRequired: number;
  category: string;
  isUnlocked: boolean;
  isClaimed: boolean;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

const RewardCenter: React.FC = () => {
  const [rewards, setRewards] = useState<Reward[]>([
    {
      id: '1',
      name: 'Priority Support',
      description: 'Get faster response times for support tickets',
      icon: '⚡',
      pointsRequired: 500,
      category: 'benefits',
      isUnlocked: true,
      isClaimed: true,
      rarity: 'common'
    },
    {
      id: '2',
      name: 'Early Access',
      description: 'Access to new features before public release',
      icon: '🔮',
      pointsRequired: 1000,
      category: 'benefits',
      isUnlocked: true,
      isClaimed: true,
      rarity: 'rare'
    },
    {
      id: '3',
      name: 'Exclusive Projects',
      description: 'Access to high-value client projects',
      icon: '💎',
      pointsRequired: 1500,
      category: 'benefits',
      isUnlocked: true,
      isClaimed: false,
      rarity: 'epic'
    },
    {
      id: '4',
      name: 'Mentorship Program',
      description: 'Become a mentor and earn additional rewards',
      icon: '🎓',
      pointsRequired: 2000,
      category: 'community',
      isUnlocked: false,
      isClaimed: false,
      rarity: 'epic'
    },
    {
      id: '5',
      name: 'Revenue Sharing',
      description: 'Earn percentage of platform revenue',
      icon: '💰',
      pointsRequired: 3000,
      category: 'monetary',
      isUnlocked: false,
      isClaimed: false,
      rarity: 'legendary'
    },
    {
      id: '6',
      name: 'Platform Ambassador',
      description: 'Represent the platform at events and conferences',
      icon: '🌟',
      pointsRequired: 4000,
      category: 'community',
      isUnlocked: false,
      isClaimed: false,
      rarity: 'legendary'
    }
  ]);

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [userPoints] = useState(1250);

  const categories = [
    { id: 'all', label: 'All Rewards', icon: '🎁' },
    { id: 'benefits', label: 'Benefits', icon: '⚡' },
    { id: 'community', label: 'Community', icon: '🤝' },
    { id: 'monetary', label: 'Monetary', icon: '💰' }
  ];

  const filteredRewards = selectedCategory === 'all' 
    ? rewards 
    : rewards.filter(reward => reward.category === selectedCategory);

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return '#6b7280';
      case 'rare': return '#3b82f6';
      case 'epic': return '#8b5cf6';
      case 'legendary': return '#f59e0b';
      default: return '#6b7280';
    }
  };

  const handleClaimReward = (rewardId: string) => {
    setRewards(rewards.map(reward => 
      reward.id === rewardId 
        ? { ...reward, isClaimed: true }
        : reward
    ));
  };

  return (
    <div className="reward-center">
      <div className="reward-header">
        <h2 className="reward-title">Reward Center</h2>
        <div className="user-points">
          <span className="points-label">Your Points:</span>
          <span className="points-value">{userPoints.toLocaleString()}</span>
        </div>
      </div>

      <div className="category-filter">
        {categories.map((category) => (
          <button
            key={category.id}
            className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category.id)}
          >
            <span className="category-icon">{category.icon}</span>
            <span className="category-label">{category.label}</span>
          </button>
        ))}
      </div>

      <div className="rewards-grid">
        {filteredRewards.map((reward) => (
          <div 
            key={reward.id} 
            className={`reward-card ${reward.rarity} ${reward.isUnlocked ? 'unlocked' : 'locked'}`}
          >
            <div className="reward-header">
              <div className="reward-icon">{reward.icon}</div>
              <div 
                className="rarity-badge"
                style={{ backgroundColor: getRarityColor(reward.rarity) }}
              >
                {reward.rarity.toUpperCase()}
              </div>
            </div>
            
            <div className="reward-content">
              <h3 className="reward-name">{reward.name}</h3>
              <p className="reward-description">{reward.description}</p>
              
              <div className="reward-requirements">
                <span className="points-required">{reward.pointsRequired.toLocaleString()} pts required</span>
              </div>
              
              <div className="reward-status">
                {reward.isClaimed ? (
                  <div className="status-claimed">
                    <span className="status-icon">✅</span>
                    <span className="status-text">Claimed</span>
                  </div>
                ) : reward.isUnlocked ? (
                  <button 
                    className="claim-btn"
                    onClick={() => handleClaimReward(reward.id)}
                  >
                    <span className="claim-icon">🎁</span>
                    <span className="claim-text">Claim Reward</span>
                  </button>
                ) : (
                  <div className="status-locked">
                    <span className="status-icon">🔒</span>
                    <span className="status-text">Locked</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="reward-info">
        <h3 className="info-title">How to Earn Points</h3>
        <div className="earning-methods">
          <div className="method-item">
            <span className="method-icon">✅</span>
            <span className="method-text">Complete tasks: 10-50 points</span>
          </div>
          <div className="method-item">
            <span className="method-icon">🚀</span>
            <span className="method-text">Create projects: 100-500 points</span>
          </div>
          <div className="method-item">
            <span className="method-icon">🤝</span>
            <span className="method-text">Help community: 25-100 points</span>
          </div>
          <div className="method-item">
            <span className="method-icon">🤖</span>
            <span className="method-text">Use AI assistant: 5-25 points</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RewardCenter; 