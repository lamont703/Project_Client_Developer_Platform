import React from 'react';

interface FoundationalStrengths {
  platform?: boolean;
  showcase?: boolean;
  disciplinedToolStack?: boolean;
  retention?: boolean;
}

interface StrengthDescription {
  title: string;
  description: string;
}

interface AuditSummarySectionProps {
  overallScore?: number;
  overallScoreLabel?: string; // For custom score display like "3.5 / 5"
  foundationalStrengths?: FoundationalStrengths;
  strengthDescriptions?: {
    platform?: StrengthDescription;
    showcase?: StrengthDescription;
    disciplinedToolStack?: StrengthDescription;
    retention?: StrengthDescription;
  };
}

const AuditSummarySection: React.FC<AuditSummarySectionProps> = ({ 
  overallScore,
  overallScoreLabel,
  foundationalStrengths,
  strengthDescriptions
}) => {
  const strengths = foundationalStrengths || {
    platform: true,
    showcase: true,
    retention: true
  };

  // Default descriptions
  const defaultDescriptions = {
    platform: {
      title: 'No Platform Dependency',
      description: 'You successfully avoid the <strong>"Platform Trap"</strong>, confirming you are not relying on low-margin environments where <strong>70% of freelancers make less than $100/month</strong>. This is a critical competitive advantage.'
    },
    showcase: {
      title: 'High-Performing Metrics',
      description: 'You are correctly tracking strong lead indicators like <strong>Direct Messages (DMs)</strong>, which are the strongest indicator of interest. This demonstrates effective showcase strategy.'
    },
    disciplinedToolStack: {
      title: 'Disciplined Tool Stack',
      description: 'You have defined a stable, fixed AI development stack. This focus on consistency and Workflow Fit minimizes AI fatigue, which ultimately kills productivity.'
    },
    retention: {
      title: 'Predictable Income Foundation',
      description: 'You have successfully implemented recurring revenue streams (e.g., collecting hosting fees), which provides a stable foundation for scaling efforts.'
    }
  };

  const descriptions = strengthDescriptions || defaultDescriptions;

  return (
    <section className="pf-audit-summary-section">
      <div className="pf-section-container">
        <h2 className="pf-section-title">
          Audit Summary & Foundational Strengths
        </h2>

        {/* Overall Score */}
        {overallScore !== undefined && (
          <div className="pf-overall-score-container">
            <div className="pf-score-circle">
              <span className="pf-score-number">{overallScoreLabel || overallScore}</span>
              <span className="pf-score-label">Overall Score</span>
            </div>
            <p className="pf-score-description">
              Your audit reveals a solid foundation with specific areas for strategic improvement.
            </p>
          </div>
        )}

        {/* Foundational Strengths */}
        <div className="pf-strengths-container">
          <h3 className="pf-strengths-title">Your Validated Strengths</h3>
          
          <div className="pf-strength-items">
            {/* Platform Strength */}
            <div className="pf-strength-item">
              <div className="pf-strength-indicator">
                {strengths.platform ? (
                  <span className="pf-check-mark">✅</span>
                ) : (
                  <span className="pf-x-mark">❌</span>
                )}
              </div>
              <div className="pf-strength-content">
                <h4 className="pf-strength-title">{descriptions.platform?.title || defaultDescriptions.platform.title}</h4>
                <p className="pf-strength-description" dangerouslySetInnerHTML={{ __html: descriptions.platform?.description || defaultDescriptions.platform.description }} />
              </div>
            </div>

            {/* Showcase Strength */}
            <div className="pf-strength-item">
              <div className="pf-strength-indicator">
                {strengths.showcase ? (
                  <span className="pf-check-mark">✅</span>
                ) : (
                  <span className="pf-x-mark">❌</span>
                )}
              </div>
              <div className="pf-strength-content">
                <h4 className="pf-strength-title">{descriptions.showcase?.title || defaultDescriptions.showcase.title}</h4>
                <p className="pf-strength-description" dangerouslySetInnerHTML={{ __html: descriptions.showcase?.description || defaultDescriptions.showcase.description }} />
              </div>
            </div>

            {/* Disciplined Tool Stack Strength */}
            {strengths.disciplinedToolStack !== undefined && (
              <div className="pf-strength-item">
                <div className="pf-strength-indicator">
                  {strengths.disciplinedToolStack ? (
                    <span className="pf-check-mark">✅</span>
                  ) : (
                    <span className="pf-x-mark">❌</span>
                  )}
                </div>
                <div className="pf-strength-content">
                  <h4 className="pf-strength-title">{descriptions.disciplinedToolStack?.title || defaultDescriptions.disciplinedToolStack.title}</h4>
                  <p className="pf-strength-description" dangerouslySetInnerHTML={{ __html: descriptions.disciplinedToolStack?.description || defaultDescriptions.disciplinedToolStack.description }} />
                </div>
              </div>
            )}

            {/* Retention Strength */}
            <div className="pf-strength-item">
              <div className="pf-strength-indicator">
                {strengths.retention ? (
                  <span className="pf-check-mark">✅</span>
                ) : (
                  <span className="pf-x-mark">❌</span>
                )}
              </div>
              <div className="pf-strength-content">
                <h4 className="pf-strength-title">{descriptions.retention?.title || defaultDescriptions.retention.title}</h4>
                <p className="pf-strength-description" dangerouslySetInnerHTML={{ __html: descriptions.retention?.description || defaultDescriptions.retention.description }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuditSummarySection;

