import React, { useState, useEffect } from 'react';
import { Opportunity, PipelineStage, PipelineStats } from '../../pages/PipelineDashboardPage';
import '../../styles/Pipeline Dashboard/AIInsightsPanel.css';

interface AIInsightsPanelProps {
  opportunities: Opportunity[];
  stages: PipelineStage[];
  stats: PipelineStats;
}

interface AIInsight {
  id: string;
  type: 'warning' | 'suggestion' | 'success' | 'info';
  title: string;
  description: string;
  action?: string;
  priority: 'high' | 'medium' | 'low';
}

export const AIInsightsPanel: React.FC<AIInsightsPanelProps> = ({ 
  opportunities, 
  stages, 
  stats 
}) => {
  const [insights, setInsights] = useState<AIInsight[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    generateInsights();
  }, [opportunities, stages, stats]);

  const generateInsights = async () => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      const newInsights: AIInsight[] = [
        {
          id: '1',
          type: 'warning',
          title: 'Pipeline Bottleneck Detected',
          description: 'Opportunities are spending 40% longer in "Proposal Sent" stage than average. Consider reviewing proposal templates.',
          action: 'Review Templates',
          priority: 'high'
        },
        {
          id: '2',
          type: 'suggestion',
          title: 'High-Value Opportunity Alert',
          description: '3 opportunities over $25k are ready for contract review. Prioritize these for faster closure.',
          action: 'View Opportunities',
          priority: 'high'
        },
        {
          id: '3',
          type: 'success',
          title: 'Conversion Rate Improvement',
          description: 'Your conversion rate has improved by 15% this month compared to last month.',
          priority: 'medium'
        },
        {
          id: '4',
          type: 'info',
          title: 'Market Trend Analysis',
          description: 'AI/ML projects are closing 25% faster than other categories. Consider highlighting this expertise.',
          action: 'Update Marketing',
          priority: 'medium'
        },
        {
          id: '5',
          type: 'suggestion',
          title: 'Follow-up Optimization',
          description: 'Opportunities contacted within 24 hours have 3x higher conversion rates.',
          action: 'Set Reminders',
          priority: 'low'
        }
      ];
      
      setInsights(newInsights);
      setIsAnalyzing(false);
    }, 2000);
  };

  const handleInsightAction = (insight: AIInsight) => {
    console.log(`Action clicked for insight: ${insight.title}`);
    // Implement insight actions
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'warning': return '⚠️';
      case 'suggestion': return '💡';
      case 'success': return '✅';
      case 'info': return 'ℹ️';
      default: return '📊';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return '#ff4757';
      case 'medium': return '#ffa502';
      case 'low': return '#2ed573';
      default: return '#747d8c';
    }
  };

  return (
    <div className="ai-insights-panel">
      <div className="insights-header">
        <div className="header-title">
          <span className="ai-icon">��</span>
          <h2>AI Insights</h2>
        </div>
        <button 
          className="refresh-button"
          onClick={generateInsights}
          disabled={isAnalyzing}
        >
          {isAnalyzing ? '🔄' : '↻'} Refresh
        </button>
      </div>

      {isAnalyzing ? (
        <div className="analyzing-state">
          <div className="analyzing-spinner"></div>
          <p>AI is analyzing your pipeline...</p>
        </div>
      ) : (
        <div className="insights-content">
          <div className="insights-summary">
            <div className="summary-item">
              <span className="summary-number">{insights.length}</span>
              <span className="summary-label">Active Insights</span>
            </div>
            <div className="summary-item">
              <span className="summary-number">
                {insights.filter(i => i.priority === 'high').length}
              </span>
              <span className="summary-label">High Priority</span>
            </div>
            <div className="summary-item">
              <span className="summary-number">
                {insights.filter(i => i.type === 'suggestion').length}
              </span>
              <span className="summary-label">Suggestions</span>
            </div>
          </div>

          <div className="insights-list">
            {insights.map((insight) => (
              <div 
                key={insight.id}
                className={`insight-card ${insight.priority}-priority`}
                style={{ borderLeftColor: getPriorityColor(insight.priority) }}
              >
                <div className="insight-header">
                  <div className="insight-icon">
                    {getInsightIcon(insight.type)}
                  </div>
                  <div className="insight-title">
                    <h3>{insight.title}</h3>
                    <span className="priority-badge">{insight.priority}</span>
                  </div>
                </div>
                
                <div className="insight-description">
                  <p>{insight.description}</p>
                </div>

                {insight.action && (
                  <div className="insight-action">
                    <button 
                      className="action-button"
                      onClick={() => handleInsightAction(insight)}
                    >
                      {insight.action}
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="insights-footer">
            <div className="ai-status">
              <span className="status-indicator">🟢</span>
              <span className="status-text">AI Analysis Active</span>
            </div>
            <div className="last-updated">
              Last updated: {new Date().toLocaleTimeString()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}; 