import React from 'react';

interface ReportHeaderProps {
  clientName?: string;
  clientNiche?: string;
}

const ReportHeader: React.FC<ReportHeaderProps> = ({ clientName, clientNiche }) => {
  return (
    <header className="pf-report-header">
      <div className="pf-report-header-content">
        <div className="pf-report-logo-container">
          <img 
            src="/XRBlockDev Logo.png" 
            alt="Inner G Complete Agency" 
            className="pf-report-logo"
          />
        </div>
        <div className="pf-report-title-section">
          <h1 className="pf-report-main-title">
            The Professional Freelancer Audit: Learning Path to Scalable Predictable Income
          </h1>
          {clientName && (
            <div className="pf-report-client-info">
              <p className="pf-report-client-name">
                Personalized Report for: <strong>{clientName}</strong>
              </p>
              {clientNiche && (
                <p className="pf-report-client-niche">
                  Niche: <strong>{clientNiche}</strong>
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default ReportHeader;

