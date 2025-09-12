import React from 'react';
import { Opportunity, PipelineStage } from '../../pages/PipelineDashboardPage';
import '../../styles/Pipeline Dashboard/PipelineOverview.css';

interface PipelineOverviewProps {
  stages: PipelineStage[];
  onOpportunityMove: (opportunityId: string, updates: Partial<Opportunity>) => void;
}

export const PipelineOverview: React.FC<PipelineOverviewProps> = ({ 
  stages, 
  onOpportunityMove 
}) => {
  const handleStageClick = (stage: PipelineStage) => {
    console.log(`Clicked on stage: ${stage.name}`);
  };

  const handleOpportunityClick = (opportunity: Opportunity) => {
    console.log(`Clicked on opportunity: ${opportunity.name}`);
  };

  return (
    <div className="pipeline-overview">
      <div className="pipeline-header">
        <h2>Pipeline Flow</h2>
        <div className="pipeline-health">
          <span className="health-label">Pipeline Health</span>
          <div className="health-score">
            <div className="health-bar">
              <div className="health-fill" style={{ width: '85%' }}></div>
            </div>
            <span className="health-percentage">85%</span>
          </div>
        </div>
      </div>

      <div className="pipeline-stages">
        {stages.map((stage, index) => (
          <div 
            key={stage.id} 
            className={`pipeline-stage ${index === stages.length - 1 ? 'final-stage' : ''}`}
            onClick={() => handleStageClick(stage)}
          >
            <div className="stage-header">
              <h3 className="stage-name">{stage.name}</h3>
              <div className="stage-metrics">
                <span className="opportunity-count">{stage.opportunities.length}</span>
                <span className="stage-value">${(stage.totalValue || 0).toLocaleString()}</span>
              </div>
            </div>
            
            <div className="stage-stats">
              <div className="stat-item">
                <span className="stat-label">Avg. Time</span>
                <span className="stat-value">{stage.averageTimeInStage}d</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Conversion</span>
                <span className="stat-value">{stage.conversionRate}%</span>
              </div>
            </div>

            <div className="stage-opportunities">
              {stage.opportunities.slice(0, 3).map((opportunity) => (
                <div 
                  key={opportunity.id}
                  className="stage-opportunity-card"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpportunityClick(opportunity);
                  }}
                >
                  <div className="opportunity-name">{opportunity.name}</div>
                  <div className="opportunity-value">${(opportunity.monetary_value || 0).toLocaleString()}</div>
                </div>
              ))}
              {stage.opportunities.length > 3 && (
                <div className="more-opportunities">
                  +{stage.opportunities.length - 3} more
                </div>
              )}
            </div>

            {index < stages.length - 1 && (
              <div className="stage-arrow">→</div>
            )}
          </div>
        ))}
      </div>

      <div className="pipeline-actions">
        <button className="action-button primary">
          📊 View Detailed Analytics
        </button>
        <button className="action-button secondary">
          �� Refresh Pipeline
        </button>
      </div>
    </div>
  );
}; 