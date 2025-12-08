import React from 'react';

interface STARPhase {
  phase: 'Showcase' | 'Tools' | 'Acquisition' | 'Retention';
  requiredFocus: string;
  implementationGoal: string;
  benefit: string;
}

interface STARRoadmapSectionProps {
  starRoadmap?: STARPhase[];
}

const STARRoadmapSection: React.FC<STARRoadmapSectionProps> = ({ starRoadmap }) => {
  const defaultRoadmap: STARPhase[] = [
    {
      phase: 'Showcase',
      requiredFocus: 'High-Performing Metrics & Portfolio',
      implementationGoal: 'Build a compelling portfolio that demonstrates value through case studies, testimonials, and measurable results',
      benefit: 'Establish authority and attract premium clients by showcasing proven results and expertise'
    },
    {
      phase: 'Tools',
      requiredFocus: 'Maximize Enhanced Efficiency',
      implementationGoal: 'Use AI tools (Cursor, Vercel, Supabase) to accelerate development and free up fulfillment time',
      benefit: 'Reduce fulfillment time by 60%, enabling simultaneous client acquisition'
    },
    {
      phase: 'Acquisition',
      requiredFocus: 'Frictionless Client Closing',
      implementationGoal: 'Implement GoHighLevel CRM for automated follow-ups and lead nurturing',
      benefit: 'Increase conversion rate by 40% while reducing manual outreach time'
    },
    {
      phase: 'Retention',
      requiredFocus: 'Predictable Revenue Systems',
      implementationGoal: 'Build recurring revenue streams through hosting, maintenance, and retainer agreements',
      benefit: 'Create stable income foundation that supports scaling efforts'
    }
  ];

  const finalRoadmap = starRoadmap || defaultRoadmap;

  const getPhaseIcon = (phase: string) => {
    switch (phase) {
      case 'Showcase':
        return '🎯';
      case 'Tools':
        return '🔧';
      case 'Acquisition':
        return '📈';
      case 'Retention':
        return '💎';
      default:
        return '⭐';
    }
  };

  return (
    <section className="pf-roadmap-section">
      <div className="pf-section-container">
        <h2 className="pf-section-title">
          Customized Learning Path (STAR Roadmap)
        </h2>

        <p className="pf-roadmap-intro">
          This systematic solution framework provides the <strong>"What"</strong> and <strong>"Why"</strong> 
          for scaling your freelance business. Each phase builds upon the previous one to create a 
          reliable, scalable, and efficient AI-driven tool stack.
        </p>

        {/* Desktop Table View */}
        <div className="pf-roadmap-table-container">
          <table className="pf-roadmap-table">
            <thead>
              <tr>
                <th className="pf-roadmap-col-phase">STAR Phase</th>
                <th className="pf-roadmap-col-focus">Required Focus for Scaling</th>
                <th className="pf-roadmap-col-goal">Implementation Goal & Benefit</th>
              </tr>
            </thead>
            <tbody>
              {finalRoadmap.map((phase, index) => (
                <tr key={index} className="pf-roadmap-row">
                  <td className="pf-roadmap-phase-cell">
                    <div className="pf-phase-header">
                      <span className="pf-phase-icon">{getPhaseIcon(phase.phase)}</span>
                      <strong className="pf-phase-name">{phase.phase}</strong>
                    </div>
                  </td>
                  <td className="pf-roadmap-focus-cell">
                    <div className="pf-focus-content">
                      <strong>{phase.requiredFocus}</strong>
                    </div>
                  </td>
                  <td className="pf-roadmap-goal-cell">
                    <div className="pf-goal-content">
                      <p className="pf-goal-text">
                        <strong>Goal:</strong> {phase.implementationGoal}
                      </p>
                      <p className="pf-benefit-text">
                        <strong>Benefit:</strong> {phase.benefit}
                      </p>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="pf-roadmap-mobile-card">
          {finalRoadmap.map((phase, index) => (
            <div key={index} className="pf-roadmap-card">
              <div className="pf-roadmap-card-header">
                <span className="pf-roadmap-card-icon">{getPhaseIcon(phase.phase)}</span>
                <h3 className="pf-roadmap-card-title">{phase.phase}</h3>
              </div>
              <div className="pf-roadmap-card-section">
                <span className="pf-roadmap-card-label">Required Focus for Scaling</span>
                <p className="pf-roadmap-card-content">
                  <strong>{phase.requiredFocus}</strong>
                </p>
              </div>
              <div className="pf-roadmap-card-section">
                <span className="pf-roadmap-card-label">Implementation Goal</span>
                <p className="pf-roadmap-card-content pf-roadmap-card-goal">
                  {phase.implementationGoal}
                </p>
              </div>
              <div className="pf-roadmap-card-section">
                <span className="pf-roadmap-card-label">Benefit</span>
                <p className="pf-roadmap-card-content" style={{ color: 'rgba(0, 255, 150, 0.9)' }}>
                  {phase.benefit}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="pf-tools-emphasis">
          <h3 className="pf-tools-title">Mandated AI Tools for Workflow Fit & Enhanced Efficiency</h3>
          <div className="pf-tools-grid">
            <div className="pf-tool-item">
              <div className="pf-tool-name">GoHighLevel</div>
              <div className="pf-tool-category">CRM/Automation</div>
            </div>
            <div className="pf-tool-item">
              <div className="pf-tool-name">NotebookLM</div>
              <div className="pf-tool-category">AI Research & Analysis</div>
            </div>
            <div className="pf-tool-item">
              <div className="pf-tool-name">Google AI Studio</div>
              <div className="pf-tool-category">AI Development Platform</div>
            </div>
          </div>
          <p className="pf-tools-description">
            These tools are essential for achieving <strong>Workflow Fit</strong> and 
            <strong> Enhanced Efficiency</strong>, enabling you to scale beyond your current capacity.
          </p>
        </div>
      </div>
    </section>
  );
};

export default STARRoadmapSection;

