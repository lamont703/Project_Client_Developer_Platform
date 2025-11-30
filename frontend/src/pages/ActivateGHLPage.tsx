import React from 'react';
import '../styles/GHL Activation/ActivateGHLPage.css';

interface ActivateGHLPageProps {
  navigateToHome?: () => void;
}

const ActivateGHLPage: React.FC<ActivateGHLPageProps> = ({ navigateToHome }) => {
  const affiliateLink = 'https://www.gohighlevel.com/?fp_ref=ai-freelance-community';

  const handleSignupClick = () => {
    window.open(affiliateLink, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="activate-ghl-page">
      <div className="ghl-circuit-pattern"></div>
      
      {/* Hero Section */}
      <section className="ghl-hero-section">
        <div className="ghl-container">
          <div className="ghl-logo-container">
            <div className="ghl-logo-placeholder">
              <span className="ghl-logo-text">GoHighLevel</span>
            </div>
          </div>
          
          <h1 className="ghl-main-headline">
            ACTIVATE YOUR PROFESSIONAL AI SYSTEM: 14-Day Free Trial
          </h1>
          
          <p className="ghl-subheadline">
            Stop Freelancing Like a Hobby. Start Operating Like a Full Agency.
          </p>
        </div>
      </section>

      {/* Section 1: The Problem GHL Solves */}
      <section className="ghl-problem-section">
        <div className="ghl-container">
          <h2 className="ghl-section-title">
            Escape the Chaos: Why Professional Organization is Non-Negotiable
          </h2>
          
          <div className="ghl-problem-content">
            <p className="ghl-problem-text">
              High-paying clients require <strong>long sales cycles</strong>—weeks or months of conversations, 
              proposals, and follow-ups. Without a robust CRM, you're flying blind, losing deals to competitors 
              who can track every touchpoint and maintain professional communication at scale.
            </p>
            
            <p className="ghl-problem-text">
              GoHighLevel solves the <strong>"integration gap"</strong> in the Tools (T) and Retention (R) phases 
              of the STAR Method, providing the <strong>Enhanced Efficiency</strong> needed to overcome scaling bottlenecks. 
              This isn't just software—it's the foundation that transforms your freelance operation from a 
              chaotic side hustle into a structured, professional business.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: GHL as the STAR Method Foundation */}
      <section className="ghl-star-foundation-section">
        <div className="ghl-container">
          <h2 className="ghl-section-title">
            The Tools (T) Phase: Your STAR Method Command Center
          </h2>
          
          <p className="ghl-foundation-intro">
            GoHighLevel is your <strong>primary AI Productivity Tool</strong>—the central hub that powers 
            your entire STAR Method implementation.
          </p>
          
          <div className="ghl-star-benefits">
            <div className="ghl-star-benefit-item">
              <span className="ghl-star-icon">🎯</span>
              <div className="ghl-star-benefit-content">
                <h3 className="ghl-star-benefit-title">Professional Organization</h3>
                <p className="ghl-star-benefit-text">
                  Centralize all client communications, proposals, and project data in one unified system. 
                  No more scattered emails, lost messages, or forgotten follow-ups.
                </p>
              </div>
            </div>
            
            <div className="ghl-star-benefit-item">
              <span className="ghl-star-icon">📊</span>
              <div className="ghl-star-benefit-content">
                <h3 className="ghl-star-benefit-title">Tracking Long Sales Cycles</h3>
                <p className="ghl-star-benefit-text">
                  Monitor every interaction, automate follow-up sequences, and never let a high-value lead 
                  fall through the cracks. Turn months-long sales processes into predictable revenue streams.
                </p>
              </div>
            </div>
            
            <div className="ghl-star-benefit-item">
              <span className="ghl-star-icon">🔄</span>
              <div className="ghl-star-benefit-content">
                <h3 className="ghl-star-benefit-title">Automating Follow-ups and Referrals</h3>
                <p className="ghl-star-benefit-text">
                  Support your Retention (R) phase with automated workflows that nurture existing clients, 
                  identify upsell opportunities, and systematically collect referrals—generating predictable 
                  monthly income without constant manual effort.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Key Benefits */}
      <section className="ghl-benefits-section">
        <div className="ghl-container">
          <h2 className="ghl-section-title">Why GoHighLevel is Essential for Your Success</h2>
          
          <div className="ghl-benefits-list">
            <div className="ghl-benefit-item">
              <span className="ghl-benefit-check">✓</span>
              <div className="ghl-benefit-content">
                <h3 className="ghl-benefit-title">Appear Capable as a Full Agency</h3>
                <p className="ghl-benefit-description">
                  GHL is essential for a solo freelancer to look professional and compete for high-budget roles. 
                  Clients see organized systems, automated responses, and professional workflows—not a one-person 
                  operation struggling to keep up.
                </p>
              </div>
            </div>
            
            <div className="ghl-benefit-item">
              <span className="ghl-benefit-check">✓</span>
              <div className="ghl-benefit-content">
                <h3 className="ghl-benefit-title">Centralized Lead Tracking</h3>
                <p className="ghl-benefit-description">
                  Keep all leads, conversations, and proposals organized in one place. Track where each prospect 
                  is in your sales funnel, automate follow-ups based on behavior, and never miss an opportunity 
                  to close a deal.
                </p>
              </div>
            </div>
            
            <div className="ghl-benefit-item">
              <span className="ghl-benefit-check">✓</span>
              <div className="ghl-benefit-content">
                <h3 className="ghl-benefit-title">Automate Your Retention</h3>
                <p className="ghl-benefit-description">
                  Use GHL automations for follow-ups, upsells, and collecting referrals to generate predictable 
                  monthly income. Transform one-time clients into recurring revenue streams through systematic, 
                  automated relationship management.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="ghl-cta-section">
        <div className="ghl-container">
          <div className="ghl-cta-content">
            <button 
              className="ghl-primary-cta-button"
              onClick={handleSignupClick}
              aria-label="Start your 14-day free GoHighLevel trial"
            >
              <span className="ghl-cta-main-text">Click Here to Start Your 14-Day FREE Trial</span>
              <span className="ghl-cta-sub-text">Build Your System!</span>
            </button>
            
            <p className="ghl-affiliate-disclosure">
              <strong>Affiliate Disclosure:</strong> This is an affiliate link. By signing up through this link, 
              you gain access to specialized STAR Method resources and onboarding to ensure Workflow Fit—helping 
              you implement GHL as your primary AI Productivity Tool within the STAR framework.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ActivateGHLPage;
