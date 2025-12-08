import React from 'react';

interface FoundationalStrengths {
  platform?: boolean;
  showcase?: boolean;
  retention?: boolean;
}

interface AuditSummarySectionProps {
  overallScore?: number;
  foundationalStrengths?: FoundationalStrengths;
}

const AuditSummarySection: React.FC<AuditSummarySectionProps> = ({ 
  overallScore, 
  foundationalStrengths 
}) => {
  const strengths = foundationalStrengths || {
    platform: true,
    showcase: true,
    retention: true
  };

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
              <span className="pf-score-number">{overallScore}</span>
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
                <h4 className="pf-strength-title">No Platform Dependency</h4>
                <p className="pf-strength-description">
                  You successfully avoid the <strong>"Platform Trap"</strong>, confirming you are not 
                  relying on low-margin environments where <strong>70% of freelancers make less than $100/month</strong>. 
                  This is a critical competitive advantage.
                </p>
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
                <h4 className="pf-strength-title">High-Performing Metrics</h4>
                <p className="pf-strength-description">
                  You are correctly tracking strong lead indicators like <strong>Direct Messages (DMs)</strong>, 
                  which are the strongest indicator of interest. This demonstrates effective showcase strategy.
                </p>
              </div>
            </div>

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
                <h4 className="pf-strength-title">Predictable Income Foundation</h4>
                <p className="pf-strength-description">
                  You have successfully implemented recurring revenue streams (e.g., collecting hosting fees), 
                  which provides a stable foundation for scaling efforts.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuditSummarySection;

