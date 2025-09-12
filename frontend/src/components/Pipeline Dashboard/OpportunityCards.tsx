import React, { useState } from 'react';
import { Opportunity } from '../../pages/PipelineDashboardPage';
import '../../styles/Pipeline Dashboard/OpportunityCards.css';

interface OpportunityCardsProps {
  opportunities: Opportunity[];
  onOpportunityUpdate: (opportunityId: string, updates: Partial<Opportunity>) => void;
}

export const OpportunityCards: React.FC<OpportunityCardsProps> = ({ 
  opportunities, 
  onOpportunityUpdate 
}) => {
  const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const handleOpportunityClick = (opportunity: Opportunity) => {
    setSelectedOpportunity(opportunity);
  };

  const handleQuickAction = (opportunityId: string, action: string) => {
    console.log(`Quick action ${action} for opportunity ${opportunityId}`);
    // Implement quick actions like "Move to Next Stage", "Schedule Follow-up", etc.
  };

  const getSuccessProbability = (opportunity: Opportunity): number => {
    // AI-calculated success probability based on various factors
    const baseProbability = 50;
    const valueFactor = opportunity.monetary_value > 10000 ? 20 : 0;
    const timeFactor = opportunity.pipeline_stage_name?.includes('Contract') ? 30 : 0;
    return Math.min(95, baseProbability + valueFactor + timeFactor);
  };

  const getRiskLevel = (opportunity: Opportunity): 'low' | 'medium' | 'high' => {
    const daysSinceUpdate = Math.floor(
      (Date.now() - new Date(opportunity.updated_at).getTime()) / (1000 * 60 * 60 * 24)
    );
    
    if (daysSinceUpdate > 14) return 'high';
    if (daysSinceUpdate > 7) return 'medium';
    return 'low';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="opportunity-cards">
      <div className="cards-header">
        <h2>Opportunities ({opportunities.length})</h2>
        <div className="view-controls">
          <button 
            className={`view-button ${viewMode === 'grid' ? 'active' : ''}`}
            onClick={() => setViewMode('grid')}
          >
            ⊞ Grid
          </button>
          <button 
            className={`view-button ${viewMode === 'list' ? 'active' : ''}`}
            onClick={() => setViewMode('list')}
          >
            ☰ List
          </button>
        </div>
      </div>

      <div className={`opportunities-container ${viewMode}`}>
        {opportunities.map((opportunity) => {
          const successProbability = getSuccessProbability(opportunity);
          const riskLevel = getRiskLevel(opportunity);
          
          return (
            <div 
              key={opportunity.id}
              className={`opportunity-card ${riskLevel}-risk`}
              onClick={() => handleOpportunityClick(opportunity)}
            >
              <div className="card-header">
                <div className="opportunity-title">
                  <h3>{opportunity.name}</h3>
                  <span className="stage-badge">{opportunity.pipeline_stage_name}</span>
                </div>
                <div className="opportunity-value">
                  ${(opportunity.monetary_value || 0).toLocaleString()}
                </div>
              </div>

              <div className="card-metrics">
                <div className="metric-item">
                  <span className="metric-label">Success Probability</span>
                  <div className="probability-bar">
                    <div 
                      className="probability-fill"
                      style={{ width: `${successProbability}%` }}
                    ></div>
                    <span className="probability-text">{successProbability}%</span>
                  </div>
                </div>
                
                <div className="metric-item">
                  <span className="metric-label">Risk Level</span>
                  <span className={`risk-indicator ${riskLevel}`}>
                    {riskLevel === 'high' ? '🔴' : riskLevel === 'medium' ? '🟡' : '🟢'} {riskLevel}
                  </span>
                </div>
              </div>

              <div className="card-info">
                <div className="info-item">
                  <span className="info-label">Assigned To</span>
                  <span className="info-value">{opportunity.assigned_to || 'Unassigned'}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Last Updated</span>
                  <span className="info-value">{formatDate(opportunity.updated_at)}</span>
                </div>
                {opportunity.developer_name && (
                  <div className="info-item">
                    <span className="info-label">Developer</span>
                    <span className="info-value">{opportunity.developer_name}</span>
                  </div>
                )}
              </div>

              <div className="card-actions">
                <button 
                  className="action-btn primary"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleQuickAction(opportunity.opportunity_id, 'next-stage');
                  }}
                >
                  ➡️ Next Stage
                </button>
                <button 
                  className="action-btn secondary"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleQuickAction(opportunity.opportunity_id, 'follow-up');
                  }}
                >
                  📅 Follow-up
                </button>
                <button 
                  className="action-btn tertiary"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleQuickAction(opportunity.opportunity_id, 'details');
                  }}
                >
                  👁️ Details
                </button>
              </div>

              <div className="ai-suggestions">
                <div className="suggestion-header">
                  <span className="ai-icon">��</span>
                  <span className="suggestion-label">AI Suggestions</span>
                </div>
                <div className="suggestions-list">
                  <div className="suggestion-item">
                    Schedule a follow-up call within 3 days
                  </div>
                  <div className="suggestion-item">
                    Send updated proposal with pricing
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {selectedOpportunity && (
        <div className="opportunity-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2>{selectedOpportunity.name}</h2>
              <button 
                className="close-button"
                onClick={() => setSelectedOpportunity(null)}
              >
                ✕
              </button>
            </div>
            <div className="modal-body">
              <p>Detailed opportunity view would go here...</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}; 