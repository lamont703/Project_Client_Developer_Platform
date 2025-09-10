import React from 'react';

interface DeFiStatsProps {}

const DeFiStats: React.FC<DeFiStatsProps> = () => {
  const stats = [
    { label: 'Total Project Funding', value: '$45.2M', change: '+18.5%', icon: '💰' },
    { label: 'Active Tech Projects', value: '847', change: '+12.3%', icon: '🚀' },
    { label: 'Project Lenders', value: '2,847', change: '+8.2%', icon: '👥' },
    { label: 'Funded Projects', value: '1,923', change: '+15.3%', icon: '✅' },
    { label: 'Average Project APY', value: '14.8%', change: '+2.1%', icon: '📈' },
    { label: 'Success Rate', value: '91%', change: '+3.2%', icon: '🎯' }
  ];

  const projectBreakdown = [
    { category: 'Software', count: '456', percentage: '53.8%', color: '#3b82f6' },
    { category: 'AI/ML', count: '234', percentage: '27.6%', color: '#10b981' },
    { category: 'Blockchain', count: '98', percentage: '11.6%', color: '#f59e0b' },
    { category: 'Automation', count: '59', percentage: '7.0%', color: '#8b5cf6' }
  ];

  return (
    <div className="defi-stats">
      <h2>Tech Project Funding Statistics</h2>
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-value">{stat.value}</div>
            <div className="stat-label">{stat.label}</div>
            <div className="stat-change positive">{stat.change}</div>
          </div>
        ))}
      </div>

      <div className="project-breakdown">
        <h3>Active Projects by Category</h3>
        <div className="breakdown-grid">
          {projectBreakdown.map((project, index) => (
            <div key={index} className="breakdown-card">
              <div className="breakdown-header">
                <div 
                  className="breakdown-color" 
                  style={{ backgroundColor: project.color }}
                ></div>
                <span className="breakdown-category">{project.category}</span>
              </div>
              <div className="breakdown-count">{project.count} projects</div>
              <div className="breakdown-percentage">{project.percentage}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="platform-highlights">
        <h3>Platform Highlights</h3>
        <div className="highlights-grid">
          <div className="highlight-card">
            <div className="highlight-icon">🏆</div>
            <div className="highlight-title">Top Performing</div>
            <div className="highlight-value">Software Projects</div>
            <div className="highlight-detail">94% success rate</div>
          </div>
          <div className="highlight-card">
            <div className="highlight-icon">🚀</div>
            <div className="highlight-title">Fastest Growing</div>
            <div className="highlight-value">AI/ML Projects</div>
            <div className="highlight-detail">+25% this quarter</div>
          </div>
          <div className="highlight-card">
            <div className="highlight-icon">💎</div>
            <div className="highlight-title">Highest APY</div>
            <div className="highlight-value">Blockchain Projects</div>
            <div className="highlight-detail">18.2% average</div>
          </div>
          <div className="highlight-card">
            <div className="highlight-icon">⚡</div>
            <div className="highlight-title">Most Reliable</div>
            <div className="highlight-value">Automation Projects</div>
            <div className="highlight-detail">96% completion rate</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeFiStats;
