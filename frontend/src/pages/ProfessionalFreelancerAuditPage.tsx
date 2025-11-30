import React, { useState, useEffect } from 'react';
import '../styles/Professional Freelancer Audit/ProfessionalFreelancerAuditPage.css';
import PFAuditForm from '../components/Professional Freelancer Audit/PFAuditForm';

interface ProfessionalFreelancerAuditPageProps {
  navigateToHome?: () => void;
}

const ProfessionalFreelancerAuditPage: React.FC<ProfessionalFreelancerAuditPageProps> = ({ navigateToHome }) => {
  useEffect(() => {
    document.title = 'Professional Freelancer Audit: Your Learning Path to Scalable Predictable Income';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Get your free Professional Freelancer Audit and unlock your STAR Method Roadmap. Identify your #1 scaling bottleneck and receive a customized Learning Path Report.');
    }
  }, []);

  return (
    <div className="pf-audit-page">
      <div className="pf-circuit-pattern"></div>
      
      {/* Hero Section with Audit Cover */}
      <section className="pf-hero-section">
        <div className="pf-container">
          <div className="pf-hero-content">
            <div className="pf-audit-cover-container">
              <img 
                src="/Professional Freelancer Audit.png" 
                alt="Professional Freelancer Audit: Learning Path to Scalable Predictable Income" 
                className="pf-audit-cover"
                loading="eager"
              />
            </div>
            
            <h1 className="pf-main-headline">
              The Professional Freelancer Audit: Unlock Your Scalable Predictable Income
            </h1>
            
            <h2 className="pf-subheading">
              Get the STAR Method Roadmap that identifies your #1 Scaling Bottleneck
            </h2>
          </div>
        </div>
      </section>

      {/* Pain Point Validation Section */}
      <section className="pf-pain-points-section">
        <div className="pf-container">
          <h2 className="pf-section-title">
            Why You Need a Professional Audit Right Now
          </h2>
          
          <div className="pf-pain-points-content">
            <div className="pf-pain-point-item">
              <span className="pf-pain-icon">⚠️</span>
              <div className="pf-pain-content">
                <h3 className="pf-pain-title">Target the AI Reckoning</h3>
                <p className="pf-pain-text">
                  The market is shifting: <strong>21% overall decrease in demand</strong> for automation-prone jobs 
                  (like software development). Without a structured system, you're competing in a shrinking pool 
                  with outdated methods.
                </p>
              </div>
            </div>
            
            <div className="pf-pain-point-item">
              <span className="pf-pain-icon">💸</span>
              <div className="pf-pain-content">
                <h3 className="pf-pain-title">Target the Platform Trap</h3>
                <p className="pf-pain-text">
                  The cost of failure is real: <strong>70% of Fiverr freelancers make less than $100 a month</strong> 
                  due to huge fees (approximately 20%). You're working harder, not smarter, while platforms 
                  take a massive cut of your earnings.
                </p>
              </div>
            </div>
            
            <div className="pf-pain-point-item">
              <span className="pf-pain-icon">🔧</span>
              <div className="pf-pain-content">
                <h3 className="pf-pain-title">The System Gap</h3>
                <p className="pf-pain-text">
                  Traditional freelancing methods lack the <strong>Professional Organization</strong> and 
                  <strong> Enhanced Efficiency</strong> needed to compete. Without a structured approach, 
                  you're operating like a hobby, not a professional business.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Audit Value Proposition Section */}
      <section className="pf-value-proposition-section">
        <div className="pf-container">
          <h2 className="pf-section-title">
            What You Get in Your Customized Learning Path Report
          </h2>
          
          <div className="pf-value-items">
            <div className="pf-value-item">
              <div className="pf-value-number">1</div>
              <div className="pf-value-content">
                <h3 className="pf-value-title">Diagnosis</h3>
                <p className="pf-value-text">
                  Pinpoint your <strong>Core Scaling Bottleneck</strong> (e.g., Fulfillment Consumption). 
                  Understand exactly what's preventing you from scaling beyond your current income level.
                </p>
              </div>
            </div>
            
            <div className="pf-value-item">
              <div className="pf-value-number">2</div>
              <div className="pf-value-content">
                <h3 className="pf-value-title">Proprietary Roadmap</h3>
                <p className="pf-value-text">
                  Receive a custom <strong>STAR Phase breakdown</strong> detailing specific steps for 
                  <strong> Tools (T)</strong>, <strong>Acquisition (A)</strong>, and <strong>Retention (R)</strong>. 
                  This isn't generic advice—it's your personalized blueprint.
                </p>
              </div>
            </div>
            
            <div className="pf-value-item">
              <div className="pf-value-number">3</div>
              <div className="pf-value-content">
                <h3 className="pf-value-title">Authority Validation</h3>
                <p className="pf-value-text">
                  Validate your current strengths (e.g., successful avoidance of the "Platform Trap"). 
                  Know what you're doing right and where to focus your improvement efforts.
                </p>
              </div>
            </div>
            
            <div className="pf-value-item">
              <div className="pf-value-number">4</div>
              <div className="pf-value-content">
                <h3 className="pf-value-title">Implementation Goal</h3>
                <p className="pf-value-text">
                  A clear roadmap on how to build a <strong>reliable, scalable, and efficient AI-driven tool stack</strong>. 
                  Transform from chaotic freelancing to structured, predictable income generation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section - Center of Page */}
      <section className="pf-form-section">
        <div className="pf-container">
          <PFAuditForm />
        </div>
      </section>

      {/* Authority Footer */}
      <footer className="pf-authority-footer">
        <div className="pf-container">
          <p className="pf-footer-text">
            This audit is provided by a <strong>Systems Architect</strong> who delivers structured processes, 
            not generic advice. You're accessing a valuable, proprietary business consultation that provides 
            the <strong>"Blueprint To Freelance Freedom"</strong>.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ProfessionalFreelancerAuditPage;

