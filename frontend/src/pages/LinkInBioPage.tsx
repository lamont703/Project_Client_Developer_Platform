import React, { useEffect } from 'react';
import '../styles/LinkInBio/LinkInBioPage.css';

interface LinkInBioPageProps {
  navigateToHome?: () => void;
}

const LinkInBioPage: React.FC<LinkInBioPageProps> = ({ navigateToHome }) => {

  useEffect(() => {
    document.title = 'Lamont T. Evans - Agency Owner/Educator';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Lamont T. Evans - Agency Owner/Educator. Learn the STAR Method to get $10K+ AI clients without Upwork or Fiverr.');
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
      
      // Add error handling for script loading
      script.onerror = () => {
        // Silently handle script loading errors - widget may not be available
        console.debug('Chat widget script failed to load (this is expected if widget is not configured)');
      };
      
      // Suppress errors from the loaded script
      script.onload = () => {
        // Script loaded successfully, but errors may still occur if widget isn't configured
        // These errors are handled by the global error handler in index.tsx
      };
      
      document.body.appendChild(script);
    }

    // Load form embed script
    const existingFormScript = document.querySelector<HTMLScriptElement>(
      'script[src="https://link.msgsndr.com/js/form_embed.js"]'
    );

    if (!existingFormScript) {
      const formScript = document.createElement('script');
      formScript.src = 'https://link.msgsndr.com/js/form_embed.js';
      formScript.async = true;
      document.body.appendChild(formScript);
    }
  }, []);

  const handleSchoolOfFreedomClick = () => {
    window.open('https://innergcomplete.app.clientclub.net/communities/groups/school-of-freelancer-freedom', '_blank');
  };

  const handleCommunityLogin = () => {
    window.open('https://innergcomplete.app.clientclub.net/communities/groups/school-of-freelancer-freedom/home?invite=69599d6b1017099e8976ed9b', '_blank');
  };


  return (
    <div className="link-in-bio-page">
      <div className="circuit-pattern"></div>
      <div className="link-in-bio-container">
        
        {/* Section 1: Authority Header - Keep Profile Section */}
        <div className="authority-header">
          <div className="profile-section">
            <img 
              src="/XRBlockDev Logo.png" 
              alt="Lamont T. Evans" 
              className="profile-image"
            />
            <h1 className="authority-title">Lamont T. Evans: Agency Owner/Educator</h1>
          </div>
        </div>

        {/* Phase 1: Setting the Stage (The Crisis Hook) */}
        <div className="crisis-hook-section">
          <h2 className="crisis-headline">The Freelance Vibe Coder's 10x Velocity Blueprint</h2>
          <p className="crisis-subheadline">
            Ready To Get The Mandated Agency Stack & 5-Agent AI Workforce to Secure $10K Projects Consistently? 
            <br />Enter Your Email
          </p>

          {/* Email Capture Form */}
          <div className="email-capture-form-container">
            <iframe
              src="https://api.leadconnectorhq.com/widget/form/hZU44jyXljv4O1qC4QEh"
              className="email-capture-iframe"
              id="inline-hZU44jyXljv4O1qC4QEh" 
              data-layout="{'id':'INLINE'}"
              data-trigger-type="alwaysShow"
              data-trigger-value=""
              data-activation-type="alwaysActivated"
              data-activation-value=""
              data-deactivation-type="neverDeactivate"
              data-deactivation-value=""
              data-form-name="Form 22"
              data-height="492"
              data-layout-iframe-id="inline-hZU44jyXljv4O1qC4QEh"
              data-form-id="hZU44jyXljv4O1qC4QEh"
              title="Form 22"
            />
          </div>
        </div>

        {/* Phase 2: Training (The School Offer Suite) */}
        <div className="school-offers-section">
          <h2 className="school-section-title">The School of Freelancer Freedom</h2>
          
          {/* Community Login Button */}
          <div className="community-login-container">
            <button 
              className="community-login-button"
              onClick={handleCommunityLogin}
            >
              <span className="login-icon">🔐</span>
              <span className="login-text">Login to Community</span>
            </button>
          </div>

          {/* Community Features */}
          <div className="community-features-section">
            <h3 className="community-features-title">Community Benefits</h3>
            <div className="community-features-grid">
              <div className="community-feature-item">
                <div className="feature-icon">🎓</div>
                <h4 className="feature-item-title">Exclusive Pre-Released Trainings</h4>
                <p className="feature-item-description">Get early access to new courses and training materials before public release</p>
              </div>
              <div className="community-feature-item">
                <div className="feature-icon">💼</div>
                <h4 className="feature-item-title">Software Project Leads</h4>
                <p className="feature-item-description">Access our bank of software project opportunities. Express interest and get paid for your work</p>
              </div>
              <div className="community-feature-item">
                <div className="feature-icon">💬</div>
                <h4 className="feature-item-title">Weekly Live Office Hours</h4>
                <p className="feature-item-description">Join weekly Q&A sessions for direct access to expert guidance and support</p>
              </div>
              <div className="community-feature-item">
                <div className="feature-icon">🚀</div>
                <h4 className="feature-item-title">Additional Community Features</h4>
                <p className="feature-item-description">Network with other developers, share resources, and grow your freelance business</p>
              </div>
            </div>
          </div>
          
          {/* Offer Block 1: The Vibe Coding Bootcamp */}
          <div className="offer-block offer-block-2">
            <div className="offer-icon">🚀</div>
            <h3 className="offer-title">The Vibe Coding Bootcamp</h3>
            <p className="offer-focus">The Advanced Edge</p>
            <p className="offer-description">
              Mastery of AI-driven development using natural language to appear as capable as a full agency at 10x speed. 
              Stop writing syntax. Start engineering context.
            </p>
            <button 
              className="offer-cta-button bootcamp-cta"
              onClick={handleSchoolOfFreedomClick}
            >
              START THE CODING BOOTCAMP
            </button>
          </div>

          {/* Offer Block 2: The Freelancer Power Library */}
          <div className="offer-block offer-block-1">
            <div className="offer-icon">📚</div>
            <h3 className="offer-title">The Freelancer Power Library</h3>
            <p className="offer-focus">The "What" and "Why"</p>
            <p className="offer-description">
              A systems vault containing textbooks/audiobooks like <strong>Blueprint To Freelance Freedom</strong> and <strong>The AI Fatigue Cure</strong>. 
              Access documented frameworks to understand the foundation of the STAR Method.
            </p>
            <button 
              className="offer-cta-button power-library-cta"
              onClick={handleSchoolOfFreedomClick}
            >
              Enter The Power Library
            </button>
          </div>

          {/* Offer Block 3: The 10 Day AI Freelance Kickstart */}
          <div className="offer-block offer-block-3">
            <div className="offer-icon">⚡</div>
            <h3 className="offer-title">The 10 Day AI Freelance Kickstart</h3>
            <p className="offer-focus">The Hands-on "How"</p>
            <p className="offer-description">
              Accelerated implementation to install your mandated tool stack (GoHighLevel, Google AI Studio, NotebookLM) 
              and build a functioning revenue engine. Transform theory into practice.
            </p>
            <button 
              className="offer-cta-button kickstart-cta"
              onClick={handleSchoolOfFreedomClick}
            >
              INSTALL MY REVENUE ENGINE
            </button>
          </div>
        </div>

        {/* Phase 3: The Handrail (Final Urgency) */}
        <div className="final-urgency-section">
          <p className="final-urgency-statement">
            The middle market is disappearing. You are one skill set away from the high-skill, high-pay tier.
          </p>
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
