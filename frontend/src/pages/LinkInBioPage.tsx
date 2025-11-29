import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LinkInBio/LinkInBioPage.css';

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
  }, []);

  const handleNavigation = (route: string) => {
    navigate(route);
  };

  const handleExternalLink = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
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

        {/* Section 2: Primary CTA Block (Live Workshop) */}
        <div className="primary-cta-section">
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

          <div className="kickstart-image-container">
            <img 
              src="/KICKSTART_10DAY_PRODUCT.jpeg" 
              alt="10 Day AI Freelance Kickstart" 
              className="kickstart-product-image"
            />
          </div>
        </div>

        {/* Section 3: Secondary CTAs (Value Stack Integration) */}
        <div className="secondary-ctas-section">
          
          {/* Direct Enrollment Link - Premium Gold Button */}
          <button 
            className="enroll-kickstart-button"
            onClick={() => handleNavigation('/10Day-Freelance-Kickstart')}
          >
            <div className="enroll-button-content">
              <span className="enroll-icon">🚀</span>
              <div className="enroll-text-wrapper">
                <span className="enroll-main-text">Enroll in the 10 Day AI Freelance Kickstart</span>
                <span className="enroll-price-badge">($197 Today Only!)</span>
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

          {/* Book Download Link with Image */}
          <div className="cta-with-image-block">
            <button 
              className="book-download-button"
              onClick={() => handleNavigation('/blueprint-to-freelance-freedom')}
            >
              <div className="book-button-content">
                <span className="book-icon">📚</span>
                <div className="book-text-wrapper">
                  <span className="book-main-text">Download the Blueprint To Freelance Freedom Book</span>
                  <span className="book-bonus-badge">(FREE BONUS COPY)</span>
                </div>
              </div>
            </button>
            <div className="book-image-container">
              <img 
                src="/EVANS_BOOK_BLUEPRINT.jpeg" 
                alt="Blueprint To Freelance Freedom Book" 
                className="book-cover-image"
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
            <span className="dm-icon">💬</span>
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
