import React, { useEffect, useState } from 'react';
import '../styles/Freelance Kickstart/FreelanceKickstartPage.css';
import PaymentModal from '../components/Freelance Kickstart/PaymentModal';

interface FreelanceKickstartPageProps {
  navigateToHome?: () => void;
}

const FreelanceKickstartPage: React.FC<FreelanceKickstartPageProps> = ({ navigateToHome }) => {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const openPaymentModal = () => setIsPaymentModalOpen(true);
  const closePaymentModal = () => setIsPaymentModalOpen(false);

  useEffect(() => {
    document.title = '10 Day AI Freelance Kickstart – Premium Implementation Training';

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        'content',
        'The 10 Day AI Freelance Kickstart gives you hands-on implementation of the STAR Method so you can attract $5K–$10K+ AI clients without relying on Upwork or Fiverr. Full program: $497.'
      );
    }

    const updateMetaTag = (property: string, content: string) => {
      let meta = document.querySelector(`meta[property="${property}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('property', property);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    const currentUrl = window.location.href;

    updateMetaTag('og:type', 'website');
    updateMetaTag('og:url', currentUrl);
    updateMetaTag('og:title', '10 Day AI Freelance Kickstart – Implement the STAR Method');
    updateMetaTag(
      'og:description',
      'Hands-on 10 day implementation program to install the STAR Method, build AI-powered demos, and set up your AI tool stack and CRM so you can close high-paying freelance clients.'
    );
    updateMetaTag('og:image', 'https://www.xrwebsites.io/XRBlockDev%20Logo.png');
    updateMetaTag('og:site_name', 'XRBlockDev Services');

    const updateTwitterTag = (name: string, content: string) => {
      let meta = document.querySelector(`meta[name="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', name);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    updateTwitterTag('twitter:card', 'summary_large_image');
    updateTwitterTag('twitter:url', currentUrl);
    updateTwitterTag('twitter:title', '10 Day AI Freelance Kickstart – Implement the STAR Method');
    updateTwitterTag(
      'twitter:description',
      'Hands-on 10 day implementation program to install the STAR Method, build AI-powered demos, and set up your AI tool stack and CRM so you can close high-paying freelance clients.'
    );
    updateTwitterTag('twitter:image', 'https://www.xrwebsites.io/XRBlockDev%20Logo.png');

    return () => {
      document.title = 'Client Developer Platform';
      if (metaDescription) {
        metaDescription.setAttribute('content', 'Developer Platform - Connect developers with opportunities');
      }
    };
  }, []);

  return (
    <div className="freelance-kickstart-page">
      <div className="circuit-pattern"></div>

      {/* Section 1: Hero & Immediate Value Proposition */}
      <section className="kickstart-hero">
        <div className="hero-inner">
          <div className="hero-product-visual">
            <img
              src="/KICKSTART_10DAY_PRODUCT.jpeg"
              alt="10 Day AI Freelance Kickstart Product Display"
              className="hero-product-image"
            />
          </div>

          <div className="hero-copy">
            <h1 className="hero-title">
              The 10 Day AI Freelance Kickstart:
              <span className="hero-title-accent"> Get the Hands-On HOW to Implement the STAR Method</span>
            </h1>
            <p className="hero-subtitle">
              Stop just knowing the system. Start implementing the AI tools and workflows that make you as capable as a
              full agency.
            </p>

            <div className="hero-pricing-block">
              <div className="hero-price-label">Enrollment Investment</div>
              <div className="hero-price-amount">
                <span className="hero-price-currency">$</span>
                <span className="hero-price-number">497</span>
              </div>
              <p className="hero-price-subcopy">Single Payment • Full Access to All 10 Days & Assets</p>

              <button className="hero-enroll-button" onClick={openPaymentModal}>
                <span className="hero-enroll-icon">🔥</span>
                <span className="hero-enroll-text">Enroll Now: Stop Paying Fees, Start Earning Predictably</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: The Crisis */}
      <section className="kickstart-crisis">
        <div className="section-container">
          <h2 className="section-headline-gold">The AI Reckoning is Here. It's Not Time to Play Anymore.</h2>
          <div className="crisis-stats-row">
            <div className="crisis-stat-card">
              <div className="crisis-stat-value">21%</div>
              <div className="crisis-stat-label">
                Overall decrease in demand for automation-prone freelance jobs
              </div>
            </div>
            <div className="crisis-stat-card">
              <div className="crisis-stat-value">20%</div>
              <div className="crisis-stat-label">Drop in Software Development demand</div>
            </div>
          </div>
          <p className="crisis-message">
            This program teaches the high-value AI skills needed for high-budget roles that are not being replaced.
          </p>
        </div>
      </section>

      {/* Section 3: Curriculum Breakdown */}
      <section className="kickstart-curriculum">
        <div className="section-container">
          <h2 className="section-headline-gold">What You Do Over the 10 Days</h2>
          <p className="section-intro">
            Each day stacks a new piece of the STAR Method into your real workflow so you leave with systems installed,
            not just notes.
          </p>

          <div className="curriculum-timeline">
            <div className="timeline-line"></div>

            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <h3 className="timeline-title">Showcase Implementation</h3>
                <p className="timeline-description">
                  Build AI-powered demo projects (landing pages, automations, mini systems) that prove you can deliver
                  outcomes. Learn how to track Direct Messages (DMs) as your strongest lead indicator instead of chasing
                  vanity metrics.
                </p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <h3 className="timeline-title">Tool Stack Integration</h3>
                <p className="timeline-description">
                  Install your AI Tool Stack using Workflow Fit criteria. Set up GoHighLevel (CRM) to organize leads,
                  manage long sales cycles, and keep every opportunity visible so you stop leaking revenue.
                </p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <h3 className="timeline-title">Acquisition Mastery</h3>
                <p className="timeline-description">
                  Practice handling inbound leads with AI-assisted discovery prompts, needs assessments, and polished
                  proposals. Turn warm DMs into booked calls and clear project scopes without sounding salesy.
                </p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <h3 className="timeline-title">Retention & Automation</h3>
                <p className="timeline-description">
                  Set up CRM pipelines, automations, and follow-up sequences that drive upsells, renewals, and referrals
                  so your income becomes predictable instead of project-to-project.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Tool Stack */}
      <section className="kickstart-tool-stack">
        <div className="section-container">
          <h2 className="section-headline-gold">Master Your AI Tool Stack: Deliver Work Like a Full Agency</h2>
          <p className="section-intro">
            You are not just learning concepts — you&rsquo;re installing a tool stack that lets you ship work at a
            professional level, even if you&rsquo;re a solo freelancer.
          </p>

          <div className="tool-stack-grid">
            <div className="tool-stack-column">
              <h3 className="tool-category-title">Productivity</h3>
              <ul className="tool-list">
                <li className="tool-pill">ChatGPT</li>
                <li className="tool-pill">NotebookLM</li>
                <li className="tool-pill">GoHighLevel (CRM)</li>
              </ul>
            </div>
            <div className="tool-stack-column">
              <h3 className="tool-category-title">Development</h3>
              <ul className="tool-list">
                <li className="tool-pill">Cursor (IDE)</li>
                <li className="tool-pill">Vercel</li>
                <li className="tool-pill">Supabase</li>
              </ul>
            </div>
            <div className="tool-stack-column">
              <h3 className="tool-category-title">Content & Design</h3>
              <ul className="tool-list">
                <li className="tool-pill">Gemini</li>
                <li className="tool-pill">Canva</li>
              </ul>
            </div>
          </div>

          <p className="tool-benefits">
            These tools are chosen for Workflow Fit — they enhance your efficiency, fill skill gaps, and keep your
            client delivery organized so you can confidently work with high-ticket projects.
          </p>
        </div>
      </section>

      {/* Section 5: Value Stack & Bonuses */}
      <section className="kickstart-value-stack">
        <div className="section-container">
          <h2 className="section-headline-gold">
            Your Total Package Value: Enroll Today and Get Exclusive Bonuses
          </h2>

          <div className="value-grid">
            <div className="value-item">
              <img
                src="/EVANS_BOOK_BLUEPRINT.jpeg"
                alt="Blueprint To Freelance Freedom Book Cover"
                className="value-image"
              />
              <div className="value-copy">
                <h3 className="value-title">Bonus 1: The Blueprint</h3>
                <p className="value-description">
                  Free digital copy of <strong>Blueprint To Freelance Freedom</strong>, the master guide behind the
                  STAR Method so you can revisit the strategy any time.
                </p>
              </div>
            </div>

            <div className="value-item">
              <img
                src="/AI_SUPPORT_NETWORK_HUB.jpeg"
                alt="AI Freelance Support Network"
                className="value-image"
              />
              <div className="value-copy">
                <h3 className="value-title">Bonus 2: Private Network Access</h3>
                <p className="value-description">
                  12 Months access to the{' '}
                  <strong>Private AI Freelance Support Network (Normal Cost: $240)</strong> where you&rsquo;ll connect on
                  real world projects and get ongoing implementation support.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Final Enrollment & Guarantee */}
      <section className="kickstart-final-cta">
        <div className="section-container final-cta-container">
          <div className="final-price-block">
            <div className="final-price-label">Enrollment Today</div>
            <div className="final-price-amount">
              <span className="final-price-currency">$</span>
              <span className="final-price-number">497</span>
            </div>
            <p className="final-price-subcopy">
              One-time payment. Full access to the 10 Day AI Freelance Kickstart, Blueprint, and Support Network.
            </p>
          </div>

          <button className="hero-enroll-button final-enroll-button" onClick={openPaymentModal}>
            <span className="hero-enroll-icon">✅</span>
            <span className="hero-enroll-text">
              Yes, I Want the STAR Method: Enroll in the Kickstart for $497
            </span>
          </button>

          <p className="guarantee-copy">
            This is a systems-focused implementation program. If you do the work, you&rsquo;ll leave with AI-powered
            demos, a working tool stack, and a client-ready process you can rely on as the market shifts.
          </p>
        </div>
      </section>

      <PaymentModal isOpen={isPaymentModalOpen} onClose={closePaymentModal} />
    </div>
  );
};

export default FreelanceKickstartPage;

