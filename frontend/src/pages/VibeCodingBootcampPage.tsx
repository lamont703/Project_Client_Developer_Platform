import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/VibeCodingBootcamp/VibeCodingBootcampPage.css';

interface VibeCodingBootcampPageProps {
  navigateToHome?: () => void;
}

const VibeCodingBootcampPage: React.FC<VibeCodingBootcampPageProps> = ({ navigateToHome }) => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Vibe Coding Bootcamp - Software 2.0: From Coder to Orchestrator';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Join the elite bootcamp teaching the disciplined frameworks of Vibe Coding. Stop writing syntax. Start engineering context.');
    }
  }, []);

  const handleSkoolClick = () => {
    window.open('https://innergcomplete.app.clientclub.net/communities/groups/vibe-coding-bootcamp/home?invite=69475df5bb5fdfb631c6ba22', '_blank');
  };

  return (
    <div className="vibe-coding-bootcamp-page">
      <div className="circuit-pattern"></div>
      <div className="vibe-bootcamp-container">
        
        {/* Hero Section: The Paradigm Shift */}
        <div className="hero-section">
          <div className="hero-content">
            <h1 className="hero-headline">
              Welcome to Software 2.0: From Coder to Orchestrator
            </h1>
            <p className="hero-subheadline">
              Stop writing syntax. Start engineering context. Join the elite bootcamp teaching the disciplined frameworks of Vibe Coding.
            </p>
            
            {/* Sankey Flow Visualization Placeholder */}
            <div className="sankey-flow-container">
              <div className="sankey-flow">
                <div className="sankey-node source-node">
                  <span className="node-label">Vague Intent</span>
                </div>
                <div className="sankey-path">
                  <div className="sankey-flow-line"></div>
                  <div className="sankey-flow-arrow">→</div>
                </div>
                <div className="sankey-node process-node">
                  <span className="node-label">Vibe Coding Frameworks</span>
                </div>
                <div className="sankey-path">
                  <div className="sankey-flow-line"></div>
                  <div className="sankey-flow-arrow">→</div>
                </div>
                <div className="sankey-node target-node">
                  <span className="node-label">Reliable Code</span>
                </div>
              </div>
            </div>

            {/* Primary CTA */}
            <button 
              className="primary-cta-button skool-cta-button"
              onClick={handleSkoolClick}
            >
              <span className="cta-icon">🚀</span>
              <span className="cta-text">Enter the Skool Community</span>
            </button>
          </div>
        </div>

        {/* The Trust Gap Section */}
        <div className="trust-gap-section">
          <div className="section-header">
            <h2 className="section-title">The Trust Gap</h2>
            <p className="section-subtitle">The Problem & Solution</p>
          </div>
          
          <div className="trust-statistics">
            <div className="stat-card">
              <div className="stat-number">84%</div>
              <div className="stat-label">of developers use AI</div>
            </div>
            <div className="stat-divider">→</div>
            <div className="stat-card problem-card">
              <div className="stat-number">46%</div>
              <div className="stat-label">don't trust the outputs</div>
            </div>
          </div>

          <div className="trust-architecture">
            <div className="trust-architecture-content">
              <h3 className="trust-architecture-title">The System of Trust</h3>
              <p className="trust-architecture-description">
                Our bootcamp positions itself as the "System of Trust" for AI-assisted development, 
                featuring the NotebookLM Companion Assistant as the grounded cognitive layer.
              </p>
              <div className="trust-visualization">
                <div className="trust-layer">
                  <span className="layer-icon">🧠</span>
                  <span className="layer-label">NotebookLM Companion</span>
                </div>
                <div className="trust-arrow">↓</div>
                <div className="trust-layer">
                  <span className="layer-icon">🛡️</span>
                  <span className="layer-label">Grounded Cognitive Layer</span>
                </div>
                <div className="trust-arrow">↓</div>
                <div className="trust-layer">
                  <span className="layer-icon">✅</span>
                  <span className="layer-label">Reliable AI-Assisted Development</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* The Mini-Framework Grid */}
        <div className="mini-framework-section">
          <div className="section-header">
            <h2 className="section-title">The Mini-Frameworks</h2>
            <p className="section-subtitle">Structured Paths to Mastery</p>
          </div>

          <div className="framework-grid">
            {/* Frontend Framework */}
            <div className="framework-card">
              <div className="framework-header">
                <span className="framework-icon">🎨</span>
                <h3 className="framework-title">Frontend</h3>
              </div>
              <div className="framework-name">The FEEL Loop</div>
              <div className="framework-steps">
                <div className="framework-step">
                  <span className="step-letter">F</span>
                  <span className="step-label">Frame</span>
                </div>
                <div className="step-arrow">→</div>
                <div className="framework-step">
                  <span className="step-letter">E</span>
                  <span className="step-label">Elements</span>
                </div>
                <div className="step-arrow">→</div>
                <div className="framework-step">
                  <span className="step-letter">E</span>
                  <span className="step-label">Events</span>
                </div>
                <div className="step-arrow">→</div>
                <div className="framework-step">
                  <span className="step-letter">L</span>
                  <span className="step-label">Loop</span>
                </div>
              </div>
            </div>

            {/* Backend Framework */}
            <div className="framework-card">
              <div className="framework-header">
                <span className="framework-icon">⚙️</span>
                <h3 className="framework-title">Backend</h3>
              </div>
              <div className="framework-name">The REQUEST Path</div>
              <div className="framework-steps">
                <div className="framework-description">
                  From receiving input to telling the frontend
                </div>
                <div className="framework-visual">
                  <div className="request-flow">
                    <span>Receive</span> → <span>Process</span> → <span>Respond</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Deployment Framework */}
            <div className="framework-card">
              <div className="framework-header">
                <span className="framework-icon">🚢</span>
                <h3 className="framework-title">Deployment</h3>
              </div>
              <div className="framework-name">The SHIP Loop</div>
              <div className="framework-steps">
                <div className="framework-step">
                  <span className="step-letter">S</span>
                  <span className="step-label">Start Simple</span>
                </div>
                <div className="step-arrow">→</div>
                <div className="framework-step">
                  <span className="step-letter">H</span>
                  <span className="step-label">Host Early</span>
                </div>
                <div className="step-arrow">→</div>
                <div className="framework-step">
                  <span className="step-letter">I</span>
                  <span className="step-label">Iterate Live</span>
                </div>
                <div className="step-arrow">→</div>
                <div className="framework-step">
                  <span className="step-letter">P</span>
                  <span className="step-label">Patch Fast</span>
                </div>
              </div>
            </div>
          </div>

          {/* Visual Representation: Autonomy Slider / Environment Ladder */}
          <div className="mastery-path">
            <div className="mastery-path-title">Path to Mastery</div>
            <div className="mastery-ladder">
              <div className="ladder-rung">
                <span className="rung-label">Beginner</span>
                <div className="rung-bar"></div>
              </div>
              <div className="ladder-rung">
                <span className="rung-label">Intermediate</span>
                <div className="rung-bar"></div>
              </div>
              <div className="ladder-rung">
                <span className="rung-label">Advanced</span>
                <div className="rung-bar"></div>
              </div>
              <div className="ladder-rung active">
                <span className="rung-label">Master</span>
                <div className="rung-bar active"></div>
              </div>
            </div>
          </div>
        </div>

        {/* The Support Ecosystem */}
        <div className="support-ecosystem-section">
          <div className="section-header">
            <h2 className="section-title">The Support Ecosystem</h2>
            <p className="section-subtitle">Community Perks</p>
          </div>

          <div className="community-perks">
            <div className="perk-card">
              <div className="perk-icon">💬</div>
              <h3 className="perk-title">Private Discord Access</h3>
              <p className="perk-description">
                Specialized channels like <strong>#prompt-smithing</strong> and <strong>#hallucination-logs</strong> 
                for real-time collaboration and learning.
              </p>
            </div>

            <div className="perk-card">
              <div className="perk-icon">🎥</div>
              <h3 className="perk-title">Live Vibe Sessions</h3>
              <p className="perk-description">
                Weekly office hours for real-time orchestration and "Context Teardowns" 
                where we break down complex prompts and frameworks.
              </p>
            </div>

            <div className="perk-card">
              <div className="perk-icon">🤖</div>
              <h3 className="perk-title">NotebookLM Tutor</h3>
              <p className="perk-description">
                A 24/7 Socratic learning guide grounded in our source material. 
                Get instant answers and guidance whenever you need it.
              </p>
            </div>
          </div>
        </div>

        {/* Footer / Final Reassurance */}
        <div className="bootcamp-footer">
          <div className="footer-content">
            <div className="footer-leverage">
              <h3 className="footer-title">Learn to Vibe Code without Bankrupting Your Startup</h3>
              <p className="footer-description">
                Our bootcamp includes <strong>"Cost-Aware Prompting"</strong> and <strong>"Plan Mode"</strong> protocols 
                to prevent the "$200 mistake" and keep your development costs under control.
              </p>
            </div>

            <div className="footer-cta">
              <p className="footer-cta-text">Your AI-Native Future Starts Here.</p>
              <button 
                className="footer-cta-button skool-cta-button"
                onClick={handleSkoolClick}
              >
                <span className="cta-icon">🚀</span>
                <span className="cta-text">Join Skool Now</span>
              </button>
            </div>
          </div>

          <div className="footer-bottom">
            <p className="footer-text">© {new Date().getFullYear()} Vibe Coding Bootcamp. All rights reserved.</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default VibeCodingBootcampPage;

