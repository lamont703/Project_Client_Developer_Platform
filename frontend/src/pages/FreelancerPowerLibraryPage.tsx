import React, { useEffect } from 'react';
import '../styles/FreelancerPowerLibrary/FreelancerPowerLibraryPage.css';

interface FreelancerPowerLibraryPageProps {
  navigateToHome?: () => void;
}

const FreelancerPowerLibraryPage: React.FC<FreelancerPowerLibraryPageProps> = ({ navigateToHome }) => {
  useEffect(() => {
    document.title = 'Freelancer Power Library - Stop the Technician\'s Nightmare. Start Architecting Your Freedom.';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Access the definitive vault of documented AI systems to escape the Platform Trap and secure Reliable Predictive Monthly (R.P.M.) income.');
    }
  }, []);

  const handleLibraryClick = () => {
    window.open('https://innergcomplete.app.clientclub.net/communities/groups/freelancer-power-library/home?invite=694847e67b12d6d631989aa5', '_blank');
  };

  return (
    <div className="freelancer-power-library-page">
      <div className="circuit-pattern"></div>
      <div className="power-library-container">
        
        {/* Phase 1: Setting the Stage - Hero Section */}
        <div className="hero-section">
          <div className="hero-content">
            <h1 className="hero-headline">
              Stop the Technician's Nightmare. Start Architecting Your Freedom.
            </h1>
            <p className="hero-subheadline">
              Access the definitive vault of documented AI systems to escape the Platform Trap and secure <strong>Reliable Predictive Monthly (R.P.M.)</strong> income.
            </p>

            {/* Hero Image */}
            <div className="hero-image-container">
              <img 
                src="/Freelancer Power Library Thumbnail.png" 
                alt="Freelancer Power Library - AI Support Hub" 
                className="hero-image"
              />
            </div>

            {/* Hero CTA */}
            <button 
              className="hero-cta-button library-cta-button"
              onClick={handleLibraryClick}
            >
              <span className="cta-icon">🔓</span>
              <span className="cta-text">ENTER THE POWER LIBRARY VAULT</span>
            </button>

            {/* Crisis Validation */}
            <div className="crisis-validation">
              <div className="crisis-stat">
                <div className="stat-number">70%</div>
                <div className="stat-label">of platform freelancers make less than $100/month</div>
              </div>
              <div className="crisis-stat">
                <div className="stat-number">21%</div>
                <div className="stat-label">decline in automation-prone roles</div>
              </div>
            </div>

            <p className="crisis-message">
              <strong>"Damning Data Hook"</strong> proves that it is <strong>not time to play anymore</strong>; a professional system is mandatory.
            </p>
          </div>
        </div>

        {/* Phase 2: Training - The Value of the Vault */}
        <div className="training-section">
          <div className="section-header">
            <h2 className="section-title">The Value of the Vault</h2>
            <p className="section-subtitle">The "What" and "Why" for the STAR Method</p>
          </div>

          <p className="value-proposition">
            The Freelancer Power Library provides the documented frameworks and systems that form the foundation of the <strong>STAR Method</strong> (Showcase, Tools, Acquisition, Retention). Each resource portal delivers actionable blueprints to transform your freelance business.
          </p>

          {/* Resource Portals Grid */}
          <div className="resource-portals-grid">
            <div className="resource-portal">
              <div className="portal-icon">🎯</div>
              <h3 className="portal-title">The S.C.O.P.E. Framework</h3>
              <p className="portal-description">
                Generate warm inbound leads with a systematic approach to <strong>Showcase, Connect, Optimize, Position, and Engage</strong> your ideal clients.
              </p>
            </div>

            <div className="resource-portal">
              <div className="portal-icon">⚡</div>
              <h3 className="portal-title">The F.I.T.S. Method</h3>
              <p className="portal-description">
                Cure AI Fatigue by mandating a stable tool stack. Master <strong>Fulfillment Focus, Integrated Categories, Tool Selection Test, and Speed and System</strong>.
              </p>
            </div>

            <div className="resource-portal">
              <div className="portal-icon">🤝</div>
              <h3 className="portal-title">The C.L.O.S.E. Method</h3>
              <p className="portal-description">
                Achieve frictionless client closing through <strong>Connect, Listen, Offer, Secure, and Execute</strong> protocols that eliminate sales friction.
              </p>
            </div>

            <div className="resource-portal">
              <div className="portal-icon">🔄</div>
              <h3 className="portal-title">The A.U.T.O. Method</h3>
              <p className="portal-description">
                Build automated retention and compound growth with <strong>Automate, Upsell, Track, and Optimize</strong> systems for predictable monthly income.
              </p>
            </div>
          </div>
        </div>

        {/* Phase 3: The Handrail - Final CTA */}
        <div className="handrail-section">
          <div className="urgency-block">
            <h2 className="urgency-title">The Middle Market is Disappearing</h2>
            <p className="urgency-message">
              You must learn AI skills that clients can't ignore to remain relevant in the top tier of <strong>High Skill/High Pay</strong> roles. The time for experimentation is over—you need proven systems now.
            </p>
          </div>

          <button 
            className="primary-cta-button library-cta-button"
            onClick={handleLibraryClick}
          >
            <span className="cta-icon">🔓</span>
            <span className="cta-text">ENTER THE POWER LIBRARY VAULT</span>
          </button>

          <p className="cta-subtext">
            Join the exclusive community of freelancers who have escaped the Platform Trap and built predictable, scalable businesses using documented AI systems.
          </p>
        </div>

        {/* Footer */}
        <div className="power-library-footer">
          <p className="footer-text">© {new Date().getFullYear()} Freelancer Power Library. All rights reserved.</p>
        </div>

      </div>
    </div>
  );
};

export default FreelancerPowerLibraryPage;

