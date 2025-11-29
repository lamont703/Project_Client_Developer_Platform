import React, { useState, useEffect } from 'react';
import '../styles/Book/BookLandingPage.css';
import PaymentModal from '../components/Book/PaymentModal';

interface BookLandingPageProps {
  navigateToHome?: () => void;
}

const BookLandingPage: React.FC<BookLandingPageProps> = ({ navigateToHome }) => {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const openPaymentModal = () => setIsPaymentModalOpen(true);
  const closePaymentModal = () => setIsPaymentModalOpen(false);

  useEffect(() => {
    document.title = 'Blueprint To Freelance Freedom – The Definitive STAR Method Guide';

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        'content',
        'Blueprint To Freelance Freedom is the fundamental guide to the STAR Method, showing you how to break free from platforms and build predictable, AI-powered freelance income.'
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
    updateMetaTag('og:title', 'Blueprint To Freelance Freedom – Fundamental STAR Method Guide');
    updateMetaTag(
      'og:description',
      'Discover the framework professional freelancers use to escape platforms, attract premium clients, and build predictable income with AI systems.'
    );
    updateMetaTag('og:image', '/EVANS_BOOK_BLUEPRINT.jpeg');
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
    updateTwitterTag('twitter:title', 'Blueprint To Freelance Freedom – Fundamental STAR Method Guide');
    updateTwitterTag(
      'twitter:description',
      'Learn the STAR Method and install AI systems that let you land premium freelance clients without relying on Upwork or Fiverr.'
    );
    updateTwitterTag('twitter:image', '/EVANS_BOOK_BLUEPRINT.jpeg');

    return () => {
      document.title = 'Client Developer Platform';
      if (metaDescription) {
        metaDescription.setAttribute('content', 'Developer Platform - Connect developers with opportunities');
      }
    };
  }, []);

  return (
    <div className="book-landing-page">
      {/* Section 1: Hero & Authority */}
      <section className="book-hero">
        <div className="book-hero-inner">
          <div className="book-cover-visual">
            <img
              src="/PRODUCT_EVANS_BOOK_BLUEPRINT.jpeg"
              alt="Blueprint To Freelance Freedom Book Cover"
              className="book-cover-image"
            />
          </div>

          <div className="book-hero-copy">
            <h1 className="book-hero-title">BLUEPRINT TO FREELANCE FREEDOM</h1>
            <p className="book-hero-subtitle">
              BREAKING FREE FROM PLATFORMS AND LANDING PREMIUM CLIENTS USING AI SYSTEMS.
            </p>
            <p className="book-author-line">By Lamont T. Evans, AI Freelance Systems Architect</p>

            <div className="book-hero-pricing">
              <p className="book-price-line">Available Now for [Price]</p>
              <button className="book-primary-cta" onClick={openPaymentModal}>
                <span className="book-cta-icon">⚡</span>
                <span className="book-cta-text">Get The Definitive Blueprint Now</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Stakes & Problem */}
      <section className="book-stakes">
        <div className="book-section-container">
          <h2 className="book-section-headline-gold">
            The AI Reckoning: Why Traditional Freelancing Is Obsolete
          </h2>

          <div className="book-stakes-grid">
            <div className="book-stake-card">
              <div className="book-stake-icon">💸</div>
              <h3 className="book-stake-title">Platform Fees</h3>
              <p className="book-stake-text">
                Platforms take huge cuts (often around 20%), squeezing your margins and making it nearly impossible to
                scale your income.
              </p>
            </div>

            <div className="book-stake-card">
              <div className="book-stake-icon">📉</div>
              <h3 className="book-stake-title">Low Income</h3>
              <p className="book-stake-text">
                <strong>70% of Fiverr freelancers make less than $100/month.</strong> Competing on price keeps you
                trapped at the bottom.
              </p>
            </div>

            <div className="book-stake-card">
              <div className="book-stake-icon">⚠️</div>
              <h3 className="book-stake-title">Job Decline</h3>
              <p className="book-stake-text">
                There&apos;s a <strong>21% overall decrease</strong> in demand for automation-prone jobs. The middle is
                disappearing — only high-value AI roles are left.
              </p>
            </div>
          </div>

          <p className="book-stakes-message">
            This book gives you the system to reach the remaining high-budget roles that demand advanced AI skills,
            instead of racing to the bottom on crowded platforms.
          </p>
        </div>
      </section>

      {/* Section 3: STAR Method Solution */}
      <section className="book-star-method">
        <div className="book-section-container">
          <h2 className="book-section-headline-gold">
            Inside: Mastering the STAR Method for Predictable Income
          </h2>

          <div className="book-star-grid">
            <div className="book-star-phase">
              <div className="book-phase-letter">S</div>
              <div className="book-phase-content">
                <h3 className="book-phase-title">Showcase</h3>
                <p className="book-phase-text">
                  Build visibility by publicly demonstrating what you can do. Learn how to create proof, not promises,
                  so premium clients come to you.
                </p>
              </div>
            </div>

            <div className="book-star-connector"></div>

            <div className="book-star-phase">
              <div className="book-phase-letter">T</div>
              <div className="book-phase-content">
                <h3 className="book-phase-title">Tools</h3>
                <p className="book-phase-text">
                  Integrate AI tools so you operate at a professional level. The system teaches you how to appear as
                  capable as a full agency while staying lean.
                </p>
              </div>
            </div>

            <div className="book-star-connector"></div>

            <div className="book-star-phase">
              <div className="book-phase-letter">A</div>
              <div className="book-phase-content">
                <h3 className="book-phase-title">Acquisition</h3>
                <p className="book-phase-text">
                  Install a frictionless, repeatable client pipeline that turns interest into booked calls and signed
                  projects without begging for work.
                </p>
              </div>
            </div>

            <div className="book-star-connector"></div>

            <div className="book-star-phase">
              <div className="book-phase-letter">R</div>
              <div className="book-phase-content">
                <h3 className="book-phase-title">Retention</h3>
                <p className="book-phase-text">
                  Use automation and systems to stabilize your income with follow-ups, renewals, and referrals — instead
                  of starting over every month.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: What You Will Learn */}
      <section className="book-learn">
        <div className="book-section-container">
          <h2 className="book-section-headline-gold">
            Stop Telling, Start Showing: What the Blueprint Will Teach You.
          </h2>

          <div className="book-learn-grid">
            <div className="book-learn-item">
              <h3 className="book-learn-title">AI-Powered Demo Projects</h3>
              <p className="book-learn-text">
                How to build <span className="book-learn-highlight">AI-powered web apps and automations</span> that act
                as live proof you can deliver outcomes, turning strangers into warm, inbound leads.
              </p>
            </div>

            <div className="book-learn-item">
              <h3 className="book-learn-title">Curated Tool Stack</h3>
              <p className="book-learn-text">
                Learn a curated stack — <span className="book-learn-highlight">Cursor, GoHighLevel, NotebookLM</span>{' '}
                and more — that dramatically boosts your efficiency and presents you as a serious professional.
              </p>
            </div>

            <div className="book-learn-item">
              <h3 className="book-learn-title">DMs as Lead Indicators</h3>
              <p className="book-learn-text">
                How to track <span className="book-learn-highlight">Direct Messages (DMs)</span> as your strongest lead
                indicator, instead of chasing likes or impressions that don&apos;t pay the bills.
              </p>
            </div>

            <div className="book-learn-item">
              <h3 className="book-learn-title">AI-Generated Deal Flow</h3>
              <p className="book-learn-text">
                Use AI to generate <span className="book-learn-highlight">polished proposals, SOWs, and NDAs</span>{' '}
                that make working with you feel easy and low-risk for premium clients.
              </p>
            </div>

            <div className="book-learn-item">
              <h3 className="book-learn-title">Follow-Ups & Referrals</h3>
              <p className="book-learn-text">
                Build systems for <span className="book-learn-highlight">follow-ups, upsells, and referrals</span>{' '}
                using CRMs so good clients don&apos;t slip away and every project has the potential to multiply.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Author Credibility */}
      <section className="book-author">
        <div className="book-section-container">
          <h2 className="book-section-headline-gold">Your Guide to Freedom.</h2>
          <div className="book-author-content">
            <p className="book-author-text">
              Lamont T. Evans has spent <strong>20+ years freelancing</strong> and the last{' '}
              <strong>3 years as an AI Software Developer</strong>, building systems that combine automation, AI, and
              real client demand.
            </p>
            <p className="book-author-text">
              Blueprint To Freelance Freedom was created after watching traditional strategies fail in an AI-driven
              market. The system in this book exists so you can regain control, escape fee-heavy platforms, and build a
              client pipeline you own.
            </p>
          </div>
        </div>
      </section>

      {/* Section 6: Final CTA */}
      <section className="book-final-cta">
        <div className="book-section-container book-final-cta-inner">
          <div className="book-final-price-block">
            <p className="book-final-price-line">Available Now for [Price]</p>
          </div>

          <button className="book-primary-cta book-final-cta-button" onClick={openPaymentModal}>
            <span className="book-cta-icon">✅</span>
            <span className="book-cta-text">Download Your Blueprint &amp; Start Building Your System</span>
          </button>

          <p className="book-final-reassurance">
            The framework used by professional freelancers to secure income without Upwork or Fiverr.
          </p>
        </div>
      </section>

      <PaymentModal isOpen={isPaymentModalOpen} onClose={closePaymentModal} />
    </div>
  );
};

export default BookLandingPage;

