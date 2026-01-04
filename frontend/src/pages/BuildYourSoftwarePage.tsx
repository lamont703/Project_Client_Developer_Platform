import React, { useEffect, useState } from 'react';
import '../styles/BuildYourSoftware/BuildYourSoftwarePage.css';

interface BuildYourSoftwarePageProps {
  navigateToHome?: () => void;
}

const BuildYourSoftwarePage: React.FC<BuildYourSoftwarePageProps> = ({ navigateToHome }) => {
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    document.title = 'Build Your Software - Lamont Evans | XRBlockDev';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Lamont Evans - Web Developer, Email & CRM Specialist, and XR + Blockchain Strategist. Build smarter, faster, and together with XRBlockDev.');
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

  const handleGetStarted = () => {
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
  };

  return (
    <div className="build-your-software-page">
      <div className="circuit-pattern"></div>
      <div className="build-your-software-container">
        
        {/* Hero Section */}
        <div className="hero-section">
          <div className="profile-section">
            <img 
              src="/XRBlockDev Logo.png" 
              alt="Lamont Evans" 
              className="profile-image"
            />
            <h1 className="hero-title">Build Your Software</h1>
            <p className="hero-subtitle">
              Lamont Evans — Web Developer, Email & CRM Specialist, and XR + Blockchain Strategist
            </p>
          </div>
        </div>

        {/* Who is Lamont Section */}
        <div className="content-section">
          <div className="section-header">
            <div className="section-icon">🧠</div>
            <h2 className="section-title">Who is Lamont Evans?</h2>
          </div>
          <div className="section-content">
            <p className="intro-text">
              Lamont is a <strong>multi-disciplinary technologist</strong> with a sharp focus on helping small teams and creators <strong>build, automate, and scale</strong> their digital presence. He combines strong technical execution with strategic thinking, creating digital systems that feel like they "just work."
            </p>
            <p className="intro-text">
              He's not just a dev — he's a <strong>partner</strong> in innovation. Whether someone needs:
            </p>
            <ul className="feature-list">
              <li>A complete <strong>online business build</strong> from scratch</li>
              <li>Help launching a <strong>crypto token or Web3 experience</strong></li>
              <li>Or a custom <strong>AI chatbot or voice agent</strong> to automate sales...</li>
            </ul>
            <p className="intro-text">
              Lamont can not only execute but guide clients through the process.
            </p>
          </div>
        </div>

        {/* Expertise Section */}
        <div className="content-section">
          <div className="section-header">
            <div className="section-icon">🔧</div>
            <h2 className="section-title">Expertise</h2>
          </div>
          <div className="expertise-grid">
            <div className="expertise-card">
              <h3 className="expertise-title">Full Stack Development</h3>
              <p className="expertise-items">React, TypeScript, Node.js, APIs</p>
            </div>
            <div className="expertise-card">
              <h3 className="expertise-title">Blockchain</h3>
              <p className="expertise-items">Solana, Rust, Anchor, Token creation</p>
            </div>
            <div className="expertise-card">
              <h3 className="expertise-title">XR / AR / VR</h3>
              <p className="expertise-items">Unity, WebXR, Three.js</p>
            </div>
            <div className="expertise-card">
              <h3 className="expertise-title">AI Integration</h3>
              <p className="expertise-items">Voice agents, GPT-4, automation flows</p>
            </div>
            <div className="expertise-card">
              <h3 className="expertise-title">Email & CRM Systems</h3>
              <p className="expertise-items">GoHighLevel, Mailchimp, custom automations</p>
            </div>
            <div className="expertise-card">
              <h3 className="expertise-title">Cloud Infrastructure & DevOps</h3>
              <p className="expertise-items">Docker, Azure, Git</p>
            </div>
          </div>
        </div>

        {/* Philosophy Section */}
        <div className="content-section">
          <div className="section-header">
            <div className="section-icon">💬</div>
            <h2 className="section-title">Philosophy & Approach</h2>
          </div>
          <div className="philosophy-block">
            <blockquote className="philosophy-quote">
              "Let's build smarter, faster, and together."
            </blockquote>
            <p className="philosophy-text">
              Lamont isn't just a coder. He's a system builder. He believes in helping clients move <strong>from idea to prototype in 30 minutes</strong>, then into full deployment — often with embedded AI agents and automation at the core.
            </p>
            <p className="philosophy-text">
              His clients stick around because his <strong>systems scale with them</strong> — including hosting, CRM, and automation infrastructure. This isn't just project-based work — it's <strong>long-term digital partnership</strong>.
            </p>
          </div>
        </div>

        {/* Who He Works With Section */}
        <div className="content-section">
          <div className="section-header">
            <div className="section-icon">🎯</div>
            <h2 className="section-title">Who He Works With</h2>
          </div>
          <div className="clients-grid">
            <div className="client-card">
              <div className="client-icon">👤</div>
              <h3 className="client-title">Solo Creators</h3>
              <p className="client-description">Launching premium content, communities, or tools</p>
            </div>
            <div className="client-card">
              <div className="client-icon">🏢</div>
              <h3 className="client-title">Service-Based Businesses</h3>
              <p className="client-description">Ready to automate operations</p>
            </div>
            <div className="client-card">
              <div className="client-icon">🚀</div>
              <h3 className="client-title">Startups</h3>
              <p className="client-description">Building MVPs with Web3 or AI baked in</p>
            </div>
            <div className="client-card">
              <div className="client-icon">👥</div>
              <h3 className="client-title">Developers</h3>
              <p className="client-description">Looking to collaborate and grow in the XRBlockDev network</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="cta-section">
          <h2 className="cta-title">Ready to Build Your Software?</h2>
          <p className="cta-text">Let's turn your idea into reality — faster, smarter, and together.</p>
          <button 
            className="cta-button"
            onClick={handleGetStarted}
          >
            Get Started
          </button>
        </div>

        {/* Form Modal */}
        {showForm && (
          <div className="form-modal-overlay" onClick={handleFormClose}>
            <div className="form-modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="form-modal-header">
                <h3 className="form-modal-title">Build Your Software With Lamont</h3>
                <button className="form-modal-close" onClick={handleFormClose}>×</button>
              </div>
              
              <div className="form-modal-body">
                <p className="form-instructions">
                  Fill out the form below to get started. We'll review your submission and get back to you soon.
                </p>
                
                <div className="form-embed-container">
                  <iframe
                    src="https://api.leadconnectorhq.com/widget/form/nMTBYglx5kuIWK4nAlcw"
                    style={{ width: '100%', border: 'none', borderRadius: '3px' }}
                    className="form-embed-iframe"
                    id="inline-nMTBYglx5kuIWK4nAlcw"
                    data-layout="{'id':'INLINE'}"
                    data-trigger-type="alwaysShow"
                    data-trigger-value=""
                    data-activation-type="alwaysActivated"
                    data-activation-value=""
                    data-deactivation-type="neverDeactivate"
                    data-deactivation-value=""
                    data-form-name="Build Your Software With Lamont"
                    data-height="489"
                    data-layout-iframe-id="inline-nMTBYglx5kuIWK4nAlcw"
                    data-form-id="nMTBYglx5kuIWK4nAlcw"
                    title="Build Your Software With Lamont"
                    scrolling="yes"
                    allow="autoplay; encrypted-media"
                    loading="lazy"
                    frameBorder="0"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="build-your-software-footer">
          <p className="footer-text">© {new Date().getFullYear()} XRBlockDev. All rights reserved.</p>
        </div>

      </div>
    </div>
  );
};

export default BuildYourSoftwarePage;

