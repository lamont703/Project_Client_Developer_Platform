import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LinkInBio/LinkInBioPage.css';
import BookReader from '../components/Book Reader/BookReader';

interface LinkInBioPageProps {
  navigateToHome?: () => void;
}

const LinkInBioPage: React.FC<LinkInBioPageProps> = ({ navigateToHome }) => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Lamont T. Evans - AI Freelance Systems Architect';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Lamont T. Evans - AI Freelance Systems Architect. Learn the STAR Method to get $10K+ AI clients without Upwork or Fiverr.');
    }

    // Load chat widget script on page load to make icon visible
    const existingScript = document.querySelector<HTMLScriptElement>(
      'script[data-widget-id="668475f9178c3150954773ef"]'
    );

    if (!existingScript) {
      const script = document.createElement('script');
      script.src = 'https://beta.leadconnectorhq.com/loader.js';
      script.setAttribute('data-resources-url', 'https://beta.leadconnectorhq.com/chat-widget/loader.js');
      script.setAttribute('data-widget-id', '668475f9178c3150954773ef');
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const handleNavigation = (route: string) => {
    navigate(route);
  };

  const handlePFAuditClick = () => {
    handleNavigation('/professional-freelancer-audit');
  };

  const handleGHLTrialClick = () => {
    // Navigate to activate-ghl page
    handleNavigation('/activate-ghl');
  };


  return (
    <div className="link-in-bio-page">
      <div className="circuit-pattern"></div>
      <div className="link-in-bio-container">
        
        {/* Section 1: Authority & Crisis Header */}
        <div className="authority-header">
          <div className="profile-section">
            <img 
              src="/XRBlockDev Logo.png" 
              alt="Lamont T. Evans" 
              className="profile-image"
            />
            <h1 className="authority-title">Lamont T. Evans: AI Freelance Systems Architect</h1>
          </div>
          
          <div className="urgency-headline-block">
            <p className="urgency-headline">
              The AI Reckoning is Here. Stop Losing Income to Fees & Automation.
            </p>
            <p className="urgency-subheadline">
              (21% Decrease in Simple Jobs)
            </p>
          </div>
        </div>

        {/* Tier 1: Highest Lead Capture - Top of Page */}
        <div className="tier-1-ctas-section">
          {/* Professional Freelancer Audit Button */}
          <button 
            className="pf-audit-button"
            onClick={handlePFAuditClick}
          >
            <div className="pf-audit-button-content">
              <span className="pf-audit-icon">📊</span>
              <div className="pf-audit-text-wrapper">
                <span className="pf-audit-main-text">Start Your Free Professional Freelancer Audit</span>
                <span className="pf-audit-sub-text">The STAR Method Roadmap</span>
              </div>
            </div>
          </button>

          {/* Free Workshop Button */}
          <button 
            className="workshop-button primary-cta-button"
            onClick={() => handleNavigation('/webinar-workshop')}
          >
            <div className="workshop-button-content">
              <span className="workshop-icon">🚨</span>
              <div className="workshop-text">
                <span className="workshop-label">LIVE:</span>
                <span className="workshop-title">The STAR Method Workshop</span>
                <span className="workshop-subtitle">Register for the Next Session</span>
              </div>
            </div>
            <div className="workshop-annotation">
              Learn the Blueprint to $10K+ AI Clients (Without Upwork or Fiverr)
            </div>
          </button>
        </div>

        {/* Tier 2: Hands-On Implementation & Immediate Value - Mid-Page */}
        <div className="tier-2-ctas-section">
          {/* GoHighLevel Trial Button */}
          <button 
            className="ghl-trial-button"
            onClick={handleGHLTrialClick}
          >
            <div className="ghl-trial-button-content">
              <span className="ghl-trial-icon">⚡</span>
              <div className="ghl-trial-text-wrapper">
                <span className="ghl-trial-main-text">14-Day Free Trial: Build Your Professional AI System</span>
                <span className="ghl-trial-sub-text">Powered by GoHighLevel</span>
              </div>
            </div>
          </button>

          {/* Book Order Link with Image */}
          <div className="cta-with-image-block">
            <button 
              className="book-download-button"
              onClick={() => handleNavigation('/blueprint-to-freelance-freedom')}
            >
              <div className="book-button-content">
                <span className="book-icon">📚</span>
                <div className="book-text-wrapper">
                  <span className="book-main-text">Order the Blueprint To Freelance Freedom Book</span>
                  <span className="book-bonus-badge">($29)</span>
                </div>
              </div>
            </button>
            <div className="book-image-container">
              <BookReader onOrderClick={() => handleNavigation('/blueprint-to-freelance-freedom')} />
            </div>
          </div>
        </div>

        {/* Tier 3: Primary Paid Offer - Bottom of Page */}
        <div className="tier-3-ctas-section">
          {/* Direct Enrollment Link - Premium Gold Button */}
          <button 
            className="enroll-kickstart-button"
            onClick={() => handleNavigation('/10Day-Freelance-Kickstart')}
          >
            <div className="enroll-button-content">
              <span className="enroll-icon">🚀</span>
              <div className="enroll-text-wrapper">
                <span className="enroll-main-text">Enroll in the 10 Day AI Freelance Kickstart</span>
                <span className="enroll-price-badge">($497 Today Only!)</span>
              </div>
            </div>
          </button>

          {/* Support Network Link with Image */}
          <div className="cta-with-image-block">
            <button 
              className="support-network-button"
              onClick={() => handleNavigation('/ai-community-member')}
            >
              <div className="support-button-content">
                <span className="support-icon">🤝</span>
                <div className="support-text-wrapper">
                  <span className="support-main-text">Join the Private AI Freelance Support Network</span>
                  <span className="support-value-badge">($240 Annual Value)</span>
                </div>
              </div>
            </button>
            <div className="support-image-container">
              <img 
                src="/AI_SUPPORT_NETWORK_HUB.jpeg" 
                alt="AI Freelance Support Network" 
                className="support-network-image"
              />
            </div>
          </div>
        </div>

        {/* Section 4: Tertiary CTAs (Utility & Engagement) */}
        <div className="tertiary-ctas-section">
          <a 
            className="tertiary-text-link tool-stack-link"
            onClick={(e) => {
              e.preventDefault();
              handleNavigation('/ai-tool-stack');
            }}
            href="/ai-tool-stack"
          >
            My Essential AI Tool Stack (Ensure Workflow Fit)
          </a>

          <a 
            className="tertiary-text-link dm-infographic-link"
            onClick={(e) => {
              e.preventDefault();
              handleNavigation('/infographic');
            }}
            href="/infographic"
          >
            Messaged 'STAR'? Click here for your Infographic
          </a>
        </div>

        {/* Footer */}
        <div className="link-in-bio-footer">
          <p className="footer-text">© {new Date().getFullYear()} Lamont T. Evans. All rights reserved.</p>
        </div>

      </div>
    </div>
  );
};

export default LinkInBioPage;
