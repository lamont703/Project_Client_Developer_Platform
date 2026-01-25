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
      metaDescription.setAttribute('content', 'Lamont Evans - Full-Stack Software Engineer & Systems Architect. Delivering complex, high-impact platforms with scalable architecture and AI automation.');
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
            <h1 className="hero-title">Lamont Evans</h1>
            <p className="hero-subtitle">
              Mid-to-senior Full-Stack Software Engineer & Systems Architect
            </p>
            <div className="hero-social-links">
              <a href="mailto:support@lamont.innergcomplete.com" className="social-link" title="Email">✉️</a>
              <a href="https://linkedin.com/in/lamont-evans-57ab4922a/" target="_blank" rel="noopener noreferrer" className="social-link" title="LinkedIn">🔗</a>
              <a href="https://github.com/lamont703" target="_blank" rel="noopener noreferrer" className="social-link" title="GitHub">💻</a>
            </div>
          </div>
        </div>

        {/* Professional Summary */}
        <div className="content-section">
          <div className="section-header">
            <div className="section-icon">🚀</div>
            <h2 className="section-title">Professional Summary</h2>
          </div>
          <div className="section-content">
            <p className="intro-text">
              I am a self-taught <strong>Full-Stack Software Engineer and Systems Architect</strong> with 4 years of experience building complex, high-impact platforms that combine scalable architecture, AI automation, and immersive user experiences.
            </p>
            <p className="intro-text">
              From leading teams to delivering AI-driven workflow solutions, I turn ambitious ideas into production-ready software that drives measurable results. My unconventional path — from entrepreneurship to software development — has taught me that the most effective solutions combine <strong>technical skill, creativity, and ownership</strong>.
            </p>
          </div>
        </div>

        {/* Professional Projects */}
        <div className="content-section">
          <div className="section-header">
            <div className="section-icon">🛠️</div>
            <h2 className="section-title">Professional Projects</h2>
          </div>
          <div className="projects-grid">
            <a href="https://project-kanes-book-reader.vercel.app/" target="_blank" rel="noopener noreferrer" className="project-card">
              <div className="project-header">
                <h3 className="project-title">Kane's Komets Book Club & Reader</h3>
                <span className="project-role">Lead Architect</span>
              </div>
              <p className="project-tech">Next.js 14, TypeScript, Tailwind CSS, Supabase</p>
              <p className="project-description">
                Architected a "cosmic-themed" digital reading platform combining e-commerce and an interactive e-reader.
                Built a custom e-reader with real-time features and an Admin Dashboard for managing subscriptions and events.
              </p>
              <span className="project-link-cta">Visit Project ↗</span>
            </a>

            <a href="https://plentyofhearts.com/" target="_blank" rel="noopener noreferrer" className="project-card">
              <div className="project-header">
                <h3 className="project-title">Plenty of Hearts</h3>
                <span className="project-role">Systems Architect</span>
              </div>
              <p className="project-tech">React 19, TypeScript, Framer Motion, Three.js</p>
              <p className="project-description">
                Designed a next-gen dating platform with gamified assessments and 3D interactive components.
                Built a secure serverless backend with Supabase Edge Functions and achieved sub-second load times.
              </p>
              <span className="project-link-cta">Visit Project ↗</span>
            </a>

            <a href="https://app.innergcomplete.com/v2/preview/7ZGsxW9niDIbFlvSVgPS" target="_blank" rel="noopener noreferrer" className="project-card">
              <div className="project-header">
                <h3 className="project-title">JAM Engine (JAM Capital)</h3>
                <span className="project-role">Lead Full Stack Dev</span>
              </div>
              <p className="project-tech">Node.js, Express, Azure, OpenAI API</p>
              <p className="project-description">
                Developed an 18-stage credit restoration pipeline utilizing AI agents.
                Reduced dispute letter generation time from days to minutes and automated 100% of back-office tasks.
              </p>
              <span className="project-link-cta">Visit Project ↗</span>
            </a>
          </div>
        </div>

        {/* Technical Skills */}
        <div className="content-section">
          <div className="section-header">
            <div className="section-icon">⚡</div>
            <h2 className="section-title">Technical Skills</h2>
          </div>
          <div className="expertise-grid">
            <div className="expertise-card">
              <h3 className="expertise-title">Languages</h3>
              <p className="expertise-items">JavaScript, TypeScript, HTML5, CSS3</p>
            </div>
            <div className="expertise-card">
              <h3 className="expertise-title">Frontend</h3>
              <p className="expertise-items">React 19, Next.js 14, Tailwind, Framer Motion, Three.js</p>
            </div>
            <div className="expertise-card">
              <h3 className="expertise-title">Backend</h3>
              <p className="expertise-items">Node.js, Express.js, Supabase (PostgreSQL, Auth, Realtime)</p>
            </div>
            <div className="expertise-card">
              <h3 className="expertise-title">Cloud & AI</h3>
              <p className="expertise-items">Azure, Docker, Vercel, Gemini API, OpenAI API</p>
            </div>
          </div>
        </div>

        {/* Leadership Section */}
        <div className="content-section">
          <div className="section-header">
            <div className="section-icon">👔</div>
            <h2 className="section-title">Leadership & Entrepreneurship</h2>
          </div>
          <div className="philosophy-block">
            <h3 className="expertise-title" style={{ textAlign: 'center', marginBottom: '1rem' }}>Barber Instructor & Barbershop Owner</h3>
            <p className="philosophy-text">
              Managed a team of barbers and owned a successful barbershop. Designed curricula as a theory and practical instructor, mentoring new professionals.
              Developed operational workflows and client management systems, demonstrating strong project ownership.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="cta-section">
          <h2 className="cta-title">Let's Build Something Ambitious</h2>
          <p className="cta-text">I thrive in roles where I can combine leadership, full-stack development, and systems thinking.</p>
          <div className="cta-buttons">
            <button className="cta-button" onClick={handleGetStarted}>
              Get In Touch
            </button>
          </div>
        </div>

        {/* Form Modal */}
        {showForm && (
          <div className="form-modal-overlay" onClick={handleFormClose}>
            <div className="form-modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="form-modal-header">
                <h3 className="form-modal-title">Contact Lamont Evans</h3>
                <button className="form-modal-close" onClick={handleFormClose}>×</button>
              </div>

              <div className="form-modal-body">
                <p className="form-instructions">
                  Fill out the form below to get in touch regarding opportunities or collaborations.
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
          <p className="footer-text">
            Lamont Evans | <a href="mailto:support@lamont.innergcomplete.com" className="footer-link">support@lamont.innergcomplete.com</a>
          </p>
          <div className="footer-socials" style={{ marginTop: '1rem' }}>
            <span style={{ margin: '0 10px', color: 'rgba(255,255,255,0.6)' }}>Remote (Open to U.S. relocation)</span> |
            <span style={{ margin: '0 10px', color: 'rgba(255,255,255,0.6)' }}>Contract Only</span>
          </div>
          <p className="footer-text" style={{ marginTop: '2rem' }}>© 2026 Lamont Evans</p>
        </div>

      </div>
    </div>
  );
};

export default BuildYourSoftwarePage;

