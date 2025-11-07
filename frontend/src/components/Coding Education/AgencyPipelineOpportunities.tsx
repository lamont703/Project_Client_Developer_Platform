import React from 'react';
import '../../styles/Coding Education/AgencyPipelineOpportunities.css';

interface AgencyPipelineOpportunitiesProps {
  onScheduleClick?: () => void;
}

const AgencyPipelineOpportunities: React.FC<AgencyPipelineOpportunitiesProps> = ({ onScheduleClick }) => {
  const benefits = [
    {
      icon: '🚀',
      title: 'Skip the Cold Outreach',
      description: 'No need to spend weeks looking for clients. We already have qualified leads waiting for developers.',
      detail: 'Start working on real projects immediately after completing the program.'
    },
    {
      icon: '💼',
      title: 'Real Client Projects',
      description: 'Work on actual client projects that need full-stack development. Build your portfolio while earning.',
      detail: 'Gain real-world experience with agency support and oversight.'
    },
    {
      icon: '🤝',
      title: 'Agency Backing',
      description: 'We handle client communication, project scoping, and business development. You focus on coding.',
      detail: 'Learn how professional agencies manage client relationships.'
    },
    {
      icon: '📈',
      title: 'Build Your Pipeline',
      description: 'Use these opportunities to build your portfolio and reputation while developing your own client base.',
      detail: 'Best of both worlds: agency opportunities + your independent clients.'
    }
  ];

  return (
    <section className="agency-pipeline-opportunities">
      <div className="pipeline-container">
        <div className="pipeline-header">
          <div className="pipeline-badge">🎯 Exclusive Opportunity</div>
          <h2 className="pipeline-title">Get Access to Our Agency's Client Pipeline</h2>
          <p className="pipeline-subtitle">
            Our agency already has a pipeline of qualified leads needing full-stack development work. 
            Graduates who complete the program may have access to these real client opportunities—no cold outreach required.
          </p>
        </div>

        <div className="pipeline-features">
          <div className="pipeline-main-card">
            <div className="main-card-icon">🔗</div>
            <h3 className="main-card-title">Active Client Pipeline</h3>
            <p className="main-card-description">
              We're actively working with clients who need full-stack development. As a program graduate, 
              you may qualify to work on these projects while you build your own freelance client base.
            </p>
            <div className="pipeline-stats">
              <div className="stat-box">
                <div className="stat-number">Real Projects</div>
                <div className="stat-label">Ready for Developers</div>
              </div>
              <div className="stat-box">
                <div className="stat-number">Agency Support</div>
                <div className="stat-label">Client Management</div>
              </div>
              <div className="stat-box">
                <div className="stat-number">Immediate Access</div>
                <div className="stat-label">After Graduation</div>
              </div>
            </div>
          </div>

          <div className="benefits-grid">
            {benefits.map((benefit, index) => (
              <div key={index} className="benefit-card">
                <div className="benefit-icon">{benefit.icon}</div>
                <h4 className="benefit-title">{benefit.title}</h4>
                <p className="benefit-description">{benefit.description}</p>
                <p className="benefit-detail">{benefit.detail}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="pipeline-cta">
          <div className="cta-content">
            <h3 className="cta-title">Ready to Access Our Pipeline?</h3>
            <p className="cta-text">
              Complete the 8-week program and you may qualify to work on real client projects through our agency. 
              Schedule a call to learn more about this exclusive opportunity.
            </p>
            <button 
              onClick={onScheduleClick}
              className="cta-button"
            >
              Learn About Pipeline Access →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AgencyPipelineOpportunities;


