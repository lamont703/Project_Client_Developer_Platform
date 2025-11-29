import React, { useEffect, useState } from 'react';
import '../styles/AICommunityMemberPage.css';
import SupportNetworkModal from '../components/AI Project Assistant/SupportNetworkModal';

interface AICommunityMemberPageProps {
  navigateToHome?: () => void;
}

const AICommunityMemberPage: React.FC<AICommunityMemberPageProps> = ({ navigateToHome }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    document.title = 'AI Freelance Support Network – Private Hub for STAR Method Freelancers';
  }, []);

  const handleJoinClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="ai-support-page">
      {/* Section 1: Hero & Exclusivity */}
      <section className="ai-support-hero">
        <div className="ai-support-hero-inner">
          <div className="ai-support-graphic">
            <img
              src="/AI_SUPPORT_NETWORK_HUB.jpeg"
              alt="AI Freelance Support Network Hub"
              className="ai-support-graphic-image"
            />
          </div>

          <div className="ai-support-hero-copy">
            <h1 className="ai-support-hero-title">
              The AI Freelance Support Network:
              <span className="ai-support-hero-accent">
                Get Real-Time Project Support &amp; Expert Networking
              </span>
            </h1>

            <p className="ai-support-hero-subtitle">
              The private hub where STAR Method freelancers connect, collaborate, and access the assets needed to operate
              as capable as a full agency.
            </p>

            <div className="ai-support-hero-pricing">
              <p className="ai-support-investment-line">Access Now for [Price]</p>
              <p className="ai-support-value-line">12 Months Access (Total Value: $240)</p>

              <button className="ai-support-primary-cta" onClick={handleJoinClick}>
                <span className="ai-support-cta-icon">⚡</span>
                <span className="ai-support-cta-text">Join the Exclusive Network Now</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Need for Community */}
      <section className="ai-support-need">
        <div className="ai-support-section-container">
          <h2 className="ai-support-headline-gold">Survive the AI Reckoning: You Cannot Do This Alone.</h2>

          <div className="ai-support-need-grid">
            <div className="ai-support-need-card">
              <h3 className="ai-support-need-title">The Market Is Splitting</h3>
              <p className="ai-support-need-text">
                High-skill AI roles are demanding constant adaptation. The middle is disappearing — only freelancers who
                keep upgrading their skills and systems will stay in demand.
              </p>
            </div>
            <div className="ai-support-need-card">
              <h3 className="ai-support-need-title">Tools Aren&apos;t Enough</h3>
              <p className="ai-support-need-text">
                AI tools give you on-demand education, but you need a vetted community to help you troubleshoot, avoid
                shiny-object syndrome, and build consistent workflows that actually ship.
              </p>
            </div>
            <div className="ai-support-need-card">
              <h3 className="ai-support-need-title">Long Sales Cycles Need Support</h3>
              <p className="ai-support-need-text">
                High-ticket clients move slowly. You need peers who understand long pipelines, proposal iteration, and
                what it takes to stay consistent until deals close.
              </p>
            </div>
          </div>

          <p className="ai-support-need-message">
            The AI Freelance Support Network is where you get the community and support to stay with a stable tool stack
            and implementation path instead of burning out on constant switching.
          </p>
        </div>
      </section>

      {/* Section 3: Inside the AI Support Hub */}
      <section className="ai-support-inside">
        <div className="ai-support-section-container">
          <h2 className="ai-support-headline-gold">Your Access Pass to Expert Resources &amp; Collaboration.</h2>

          <div className="ai-support-features-grid">
            <div className="ai-support-feature-card">
              <h3 className="ai-support-feature-title">Networking on Real World Projects</h3>
              <p className="ai-support-feature-text">
                Collaborate on live builds, client work, and internal experiments that become portfolio pieces and case
                studies — the primary benefit of the network.
              </p>
            </div>
            <div className="ai-support-feature-card">
              <h3 className="ai-support-feature-title">Project Alpha: AI Agent Deployment</h3>
              <p className="ai-support-feature-text">
                Join advanced projects focused on AI agent deployment, integrations, and workflow automation so you can
                move beyond tutorials and into real implementation.
              </p>
            </div>
            <div className="ai-support-feature-card">
              <h3 className="ai-support-feature-title">Design Asset Library</h3>
              <p className="ai-support-feature-text">
                Access a shared library of design assets, layouts, and templates that help you ship client-ready
                deliverables faster.
              </p>
            </div>
            <div className="ai-support-feature-card">
              <h3 className="ai-support-feature-title">Config Code &amp; Resource Portals</h3>
              <p className="ai-support-feature-text">
                Tap into config snippets, starter repos, and learning resources so you&apos;re not rebuilding every
                system from scratch.
              </p>
            </div>
            <div className="ai-support-feature-card">
              <h3 className="ai-support-feature-title">Real-Time Project Updates</h3>
              <p className="ai-support-feature-text">
                See live progress from other freelancers working the STAR Method, giving you a reference point for pace,
                scope, and results.
              </p>
            </div>
            <div className="ai-support-feature-card">
              <h3 className="ai-support-feature-title">Chat Community</h3>
              <p className="ai-support-feature-text">
                Ask questions, share wins, and troubleshoot problems in a private chat — no more trying to solve every
                issue alone at 2 a.m.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Professional Advantage */}
      <section className="ai-support-advantage">
        <div className="ai-support-section-container">
          <h2 className="ai-support-headline-gold">Accelerate Your STAR Method Implementation.</h2>

          <ul className="ai-support-advantage-list">
            <li className="ai-support-advantage-item">
              <span className="ai-support-advantage-bullet">✔</span>
              <span>
                Get support integrating complex tools like <strong>Cursor (IDE)</strong> and{' '}
                <strong>GoHighLevel (CRM)</strong> so your stack is Workflow Fit instead of cobbled together.
              </span>
            </li>
            <li className="ai-support-advantage-item">
              <span className="ai-support-advantage-bullet">✔</span>
              <span>
                Collaborate on projects that help you <strong>Showcase</strong> your capabilities and attract warm,
                inbound leads that already believe in your value.
              </span>
            </li>
            <li className="ai-support-advantage-item">
              <span className="ai-support-advantage-bullet">✔</span>
              <span>
                Learn how others are automating <strong>follow-ups, upsells, and referrals</strong> to achieve
                Retention and predictable monthly income.
              </span>
            </li>
            <li className="ai-support-advantage-item">
              <span className="ai-support-advantage-bullet">✔</span>
              <span>
                Gain the <strong>Professional Organization</strong> (systems, assets, and support) required to work
                confidently with high-ticket clients.
              </span>
            </li>
          </ul>
        </div>
      </section>

      {/* Section 5: Final Enrollment */}
      <section className="ai-support-final-cta">
        <div className="ai-support-section-container ai-support-final-inner">
          <div className="ai-support-final-price-block">
            <p className="ai-support-final-price-line">12 Months Access (Total Value: $240)</p>
            <p className="ai-support-final-investment-line">Join today for [Price]</p>
          </div>

          <button className="ai-support-primary-cta ai-support-final-button" onClick={handleJoinClick}>
            <span className="ai-support-cta-icon">✅</span>
            <span className="ai-support-cta-text">Yes, Grant Me Access to the Private Support Network</span>
          </button>
        </div>
      </section>

      <SupportNetworkModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default AICommunityMemberPage;
