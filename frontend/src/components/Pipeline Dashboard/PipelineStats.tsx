import React from 'react';
import { PipelineStats as PipelineStatsType } from '../../pages/PipelineDashboardPage';
import '../../styles/Pipeline Dashboard/PipelineStats.css';

interface PipelineStatsProps {
  stats: PipelineStatsType;
}

export const PipelineStats: React.FC<PipelineStatsProps> = ({ stats }) => {
  const formatCurrency = (amount: number | null) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount || 0);
  };

  const getHealthScoreColor = (score: number) => {
    if (score >= 80) return '#2ed573';
    if (score >= 60) return '#ffa502';
    return '#ff4757';
  };

  const getHealthScoreLabel = (score: number) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    return 'Needs Attention';
  };

  return (
    <div className="pipeline-stats">
      <div className="stats-header">
        <h2>Pipeline Overview</h2>
        <div className="health-indicator">
          <div 
            className="health-circle"
            style={{ 
              background: `conic-gradient(${getHealthScoreColor(stats.healthScore)} ${stats.healthScore * 3.6}deg, #2c2c2c 0deg)` 
            }}
          >
            <div className="health-inner">
              <span className="health-score">{stats.healthScore}</span>
              <span className="health-label">Health</span>
            </div>
          </div>
          <div className="health-status">
            <span className="status-text">{getHealthScoreLabel(stats.healthScore)}</span>
          </div>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📊</div>
          <div className="stat-content">
            <div className="stat-number">{stats.totalOpportunities}</div>
            <div className="stat-label">Total Opportunities</div>
            <div className="stat-trend positive">+12% vs last month</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">💰</div>
          <div className="stat-content">
            <div className="stat-number">{formatCurrency(stats.totalValue)}</div>
            <div className="stat-label">Pipeline Value</div>
            <div className="stat-trend positive">+8% vs last month</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">��</div>
          <div className="stat-content">
            <div className="stat-number">{stats.conversionRate.toFixed(1)}%</div>
            <div className="stat-label">Conversion Rate</div>
            <div className="stat-trend positive">+3% vs last month</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">⏱️</div>
          <div className="stat-content">
            <div className="stat-number">{stats.averageSalesCycle}</div>
            <div className="stat-label">Avg. Sales Cycle (days)</div>
            <div className="stat-trend negative">+5 days vs last month</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">��</div>
          <div className="stat-content">
            <div className="stat-number">{formatCurrency(stats.averageDealSize)}</div>
            <div className="stat-label">Average Deal Size</div>
            <div className="stat-trend positive">+15% vs last month</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">��</div>
          <div className="stat-content">
            <div className="stat-number">85%</div>
            <div className="stat-label">Goal Progress</div>
            <div className="stat-trend positive">On track for Q4</div>
          </div>
        </div>
      </div>

      <div className="stats-actions">
        <button className="action-button primary">
          📊 Detailed Analytics
        </button>
        <button className="action-button secondary">
          📈 Export Report
        </button>
      </div>
    </div>
  );
}; 