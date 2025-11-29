import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/AIToolStackPage.css';

interface AIToolStackPageProps {
  navigateToHome?: () => void;
}

const AIToolStackPage: React.FC<AIToolStackPageProps> = ({ navigateToHome }) => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'My Essential AI Tool Stack – STAR Method Tools Phase';
  }, []);

  const handleKickstartClick = () => {
    navigate('/10Day-Freelance-Kickstart');
  };

  return (
    <div className="ai-tool-stack-page">
      <div className="ai-tool-circuit-background" />

      {/* Section 1: Hero & Philosophy */}
      <section className="ai-tool-hero">
        <div className="ai-tool-container">
          <h1 className="ai-tool-hero-title">
            My Essential AI Tool Stack:{' '}
            <span className="ai-tool-hero-title-accent">Building a Reliable, Scalable System.</span>
          </h1>
          <p className="ai-tool-hero-subtitle">
            The curated stack of tools selected for <span className="ai-tool-highlight">Workflow Fit</span> that allows
            STAR Method freelancers to operate with <span className="ai-tool-highlight">Enhanced Efficiency</span> and{' '}
            <span className="ai-tool-highlight">Professional Organization</span>.
          </p>

          <div className="ai-tool-star-visual">
            <div className="ai-tool-star-phase ai-tool-star-phase-inactive">
              <span className="ai-tool-star-letter">S</span>
              <span className="ai-tool-star-label">Showcase</span>
            </div>
            <div className="ai-tool-star-connector" />
            <div className="ai-tool-star-phase ai-tool-star-phase-active">
              <span className="ai-tool-star-letter">T</span>
              <span className="ai-tool-star-label">Tools</span>
            </div>
            <div className="ai-tool-star-connector" />
            <div className="ai-tool-star-phase ai-tool-star-phase-inactive">
              <span className="ai-tool-star-letter">A</span>
              <span className="ai-tool-star-label">Acquisition</span>
            </div>
            <div className="ai-tool-star-connector" />
            <div className="ai-tool-star-phase ai-tool-star-phase-inactive">
              <span className="ai-tool-star-letter">R</span>
              <span className="ai-tool-star-label">Retention</span>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Core Tools & Categories */}
      <section className="ai-tool-categories">
        <div className="ai-tool-container">
          <div className="ai-tool-category-grid">
            <div className="ai-tool-category-card">
              <h2 className="ai-tool-category-title">AI Productivity Tools</h2>
              <p className="ai-tool-category-focus">
                <strong>Focus:</strong> Project management, organization, and tracking long sales cycles for high-ticket
                clients.
              </p>
              <ul className="ai-tool-list">
                <li>
                  <span className="ai-tool-name">ChatGPT</span>
                  <span className="ai-tool-description">
                    On-demand strategy partner for shaping offers, messaging, and client conversations.
                  </span>
                </li>
                <li>
                  <span className="ai-tool-name">NotebookLM</span>
                  <span className="ai-tool-description">
                    Central brain for your notes, transcripts, and client intel so nothing important gets scattered.
                  </span>
                </li>
                <li>
                  <span className="ai-tool-name">GoHighLevel (CRM + Automation)</span>
                  <span className="ai-tool-description">
                    The backbone of client tracking, pipelines, follow-ups, and automated reminders for long sales
                    cycles.
                  </span>
                </li>
              </ul>
            </div>

            <div className="ai-tool-category-card">
              <h2 className="ai-tool-category-title">AI Coding &amp; Development Tools</h2>
              <p className="ai-tool-category-focus">
                <strong>Focus:</strong> Accelerate development and fill in skill gaps so you can ship full systems.
              </p>
              <ul className="ai-tool-list">
                <li>
                  <span className="ai-tool-name">Cursor (IDE)</span>
                  <span className="ai-tool-description">
                    AI-native development environment that helps you write, refactor, and understand code faster.
                  </span>
                </li>
                <li>
                  <span className="ai-tool-name">Vercel (Deployment)</span>
                  <span className="ai-tool-description">
                    One-click deployment for web apps and landing pages so demos feel like real products.
                  </span>
                </li>
                <li>
                  <span className="ai-tool-name">Supabase (Backend / Database)</span>
                  <span className="ai-tool-description">
                    Production-ready backend, auth, and database so you can prototype and deliver faster without writing
                    everything from scratch.
                  </span>
                </li>
              </ul>
            </div>

            <div className="ai-tool-category-card">
              <h2 className="ai-tool-category-title">AI Design Tools</h2>
              <p className="ai-tool-category-focus">
                <strong>Focus:</strong> Graphics, branding, and marketing materials that support premium positioning.
              </p>
              <ul className="ai-tool-list">
                <li>
                  <span className="ai-tool-name">Canva</span>
                  <span className="ai-tool-description">
                    Rapid creation of social posts, decks, and one-pagers that look polished without a full design team.
                  </span>
                </li>
                <li>
                  <span className="ai-tool-name">Sora</span>
                  <span className="ai-tool-description">
                    Advanced video content for ads, storytelling, and high-impact demos when you need motion to stand
                    out.
                  </span>
                </li>
              </ul>
            </div>

            <div className="ai-tool-category-card">
              <h2 className="ai-tool-category-title">AI Content &amp; Creation Tools</h2>
              <p className="ai-tool-category-focus">
                <strong>Focus:</strong> Generating text, ideas, and creative assets for inbound content strategy.
              </p>
              <ul className="ai-tool-list">
                <li>
                  <span className="ai-tool-name">Gemini (API + AI Studio)</span>
                  <span className="ai-tool-description">
                    Flexible LLM platform for building custom workflows, agents, and content systems into your client
                    offers.
                  </span>
                </li>
                <li>
                  <span className="ai-tool-name">VO3</span>
                  <span className="ai-tool-description">
                    Voice and audio content generation to support podcasts, audio snippets, and multi-channel presence.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Benefits & Selection Criteria */}
      <section className="ai-tool-benefits">
        <div className="ai-tool-container">
          <h2 className="ai-tool-headline-gold">Why These Tools Matter: The Professional Freelancer&apos;s Edge.</h2>

          <ul className="ai-tool-benefit-list">
            <li className="ai-tool-benefit-item">
              <span className="ai-tool-benefit-emphasis">Professional Organization:</span> Keep leads, contacts, and
              conversations organized using CRMs so every opportunity is visible and trackable.
            </li>
            <li className="ai-tool-benefit-item">
              <span className="ai-tool-benefit-emphasis">Expanded Capability:</span> AI provides on-demand education and
              troubleshooting so you can confidently deliver advanced systems without needing a full team.
            </li>
            <li className="ai-tool-benefit-item">
              <span className="ai-tool-benefit-emphasis">Enhanced Efficiency:</span> Automate repetitive tasks, reduce
              context switching, and complete projects faster while maintaining quality.
            </li>
          </ul>

          <div className="ai-tool-philosophy">
            <h3 className="ai-tool-philosophy-title">Tool Selection Philosophy</h3>
            <div className="ai-tool-philosophy-grid">
              <div className="ai-tool-philosophy-card">
                <h4 className="ai-tool-philosophy-heading">1. Workflow Fit (Most Important)</h4>
                <p>
                  The right tool <strong>reduces friction</strong>. It integrates smoothly with the rest of your stack
                  and makes your work faster, cleaner, or easier. If it complicates your day-to-day, it doesn&apos;t
                  belong.
                </p>
              </div>
              <div className="ai-tool-philosophy-card">
                <h4 className="ai-tool-philosophy-heading">2. Consistency Over Novelty</h4>
                <p>
                  Constantly chasing new tools leads to <strong>AI fatigue</strong>. Commit to a stable stack so you can
                  master it, ship real projects, and build reputation instead of restarting your process every month.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Implementation CTA */}
      <section className="ai-tool-implementation">
        <div className="ai-tool-container ai-tool-implementation-inner">
          <div className="ai-tool-implementation-copy">
            <h2 className="ai-tool-headline-gold">Knowing the Tools is Not Enough: You Need the System.</h2>
            <p className="ai-tool-implementation-text">
              This Tool Stack gives you the <strong>what</strong>. The{' '}
              <strong>10 Day AI Freelance Kickstart</strong> shows you the <strong>how</strong> — installing these tools
              into a frictionless STAR Method workflow so you can attract, close, and retain high-value clients.
            </p>
            <button className="ai-tool-cta-button" onClick={handleKickstartClick}>
              <span className="ai-tool-cta-icon">🚀</span>
              <span className="ai-tool-cta-text">Learn How To Implement The STAR Tool Stack (Enroll in the Kickstart)</span>
            </button>
          </div>

          <div className="ai-tool-implementation-visual">
            <img
              src="/KICKSTART_10DAY_PRODUCT.jpeg"
              alt="10 Day AI Freelance Kickstart Product"
              className="ai-tool-kickstart-image"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default AIToolStackPage;


