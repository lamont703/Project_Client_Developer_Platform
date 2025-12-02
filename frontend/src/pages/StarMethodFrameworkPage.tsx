import React, { useEffect } from 'react';
import '../styles/Star Method Framework/StarMethodFrameworkPage.css';

interface StarMethodFrameworkPageProps {
  navigateToHome?: () => void;
}

// Main landing page for the free STAR Method Framework Course

const StarMethodFrameworkPage: React.FC<StarMethodFrameworkPageProps> = ({ navigateToHome }) => {
  useEffect(() => {
    document.title = 'FREE: The STAR Method Framework | AI Systems Roadmap to Scalable Income';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Get free access to The STAR Method Framework Course - the AI Systems Roadmap to Scalable Predictable Income. Transform from freelancer to Systems Architect.');
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
    updateMetaTag('og:title', 'FREE: The STAR Method Framework | AI Systems Roadmap to Scalable Income');
    updateMetaTag('og:description', 'Get free access to The STAR Method Framework Course - the AI Systems Roadmap to Scalable Predictable Income.');
    updateMetaTag('og:image', 'https://www.xrwebsites.io/The%20STAR%20Method%20Framework%20Course.jpeg');
    updateMetaTag('og:site_name', 'Inner G Complete Agency');

    return () => {
      document.title = 'Client Developer Platform';
      if (metaDescription) {
        metaDescription.setAttribute('content', 'Developer Platform - Connect developers with opportunities');
      }
    };
  }, []);

  return (
    <div className="star-framework-page">
      <div className="star-framework-circuit-pattern"></div>
      
      {/* Header Section */}
      <section className="star-framework-hero">
        <div className="star-framework-container">
          <div className="star-framework-hero-content">
            <div className="star-framework-visual-container">
              <img 
                src="/The STAR Method Framework Course.jpeg" 
                alt="The STAR Method Framework Course" 
                className="star-framework-visual"
                loading="eager"
              />
            </div>
            
            <h1 className="star-framework-main-headline">
              FREE Course: Escape the Platform Trap & Get the STAR Framework
            </h1>
            
            <p className="star-framework-free-badge">
              The AI Systems Roadmap to Scalable Predictable Income
            </p>
            
            <h2 className="star-framework-subheadline">
              Stop Competing on Fiverr & Upwork. Get the Architecture to Attract High-Paying Clients.
            </h2>
            
            <blockquote className="star-framework-quote">
              <p>
                The AI Reckoning means the market has split: <strong>70% of freelancers on platforms make less than $100/month</strong>. 
                It's time to build your own system.
              </p>
            </blockquote>
          </div>
        </div>
      </section>

      {/* Core Value Proposition Section */}
      <section className="star-framework-value-section">
        <div className="star-framework-container">
          <h2 className="star-framework-section-title">
            Transform into a <span className="star-framework-accent">Systems Architect</span>—Not a Freelancer.
          </h2>
          
          <p className="star-framework-intro">
            The <strong>STAR Method Framework Course</strong> provides the comprehensive strategy you need to move beyond reactive effort 
            and build a professional business with a system for generating predictable income. This free training outlines the 
            <strong> what</strong> and the <strong>why</strong> behind the four pillars of success:
          </p>

          <div className="star-framework-pillars">
            <div className="star-framework-pillar">
              <div className="star-framework-pillar-header">
                <div className="star-framework-pillar-letter">S</div>
                <h3 className="star-framework-pillar-title">Showcase</h3>
              </div>
              <p className="star-framework-pillar-description">
                Learn how to generate <strong>warm, inbound leads</strong> by consistently demonstrating your capabilities publicly. 
                Discover why tracking <strong>Direct Messages (DMs)</strong> is the <strong>strongest indicator of interest</strong> and 
                how to avoid the <strong>Platform Trap</strong>.
              </p>
            </div>

            <div className="star-framework-pillar">
              <div className="star-framework-pillar-header">
                <div className="star-framework-pillar-letter">T</div>
                <h3 className="star-framework-pillar-title">Tools</h3>
              </div>
              <p className="star-framework-pillar-description">
                Understand how to implement an <strong>integrated AI-driven tool stack</strong> (including <strong>GoHighLevel</strong>, 
                <strong> ChatGPT</strong>, and <strong>Cursor</strong>) to achieve <strong>Enhanced Efficiency</strong>. This solves the 
                <strong> Core Scaling Bottleneck: Fulfillment Consumption</strong>.
              </p>
            </div>

            <div className="star-framework-pillar">
              <div className="star-framework-pillar-header">
                <div className="star-framework-pillar-letter">A</div>
                <h3 className="star-framework-pillar-title">Acquisition</h3>
              </div>
              <p className="star-framework-pillar-description">
                Master the repeatable, systematic sales process required for <strong>Frictionless Client Closing</strong>. Learn how to 
                leverage AI to generate polished <strong>strategy outlines, proposals, and contracts</strong>.
              </p>
            </div>

            <div className="star-framework-pillar">
              <div className="star-framework-pillar-header">
                <div className="star-framework-pillar-letter">R</div>
                <h3 className="star-framework-pillar-title">Retention</h3>
              </div>
              <p className="star-framework-pillar-description">
                Establish <strong>System-Driven Automation</strong> to secure <strong>predictable monthly income</strong>. Learn how 
                <strong> CRMs and automations</strong> maximize <strong>referrals and upsells</strong>, creating a 
                <strong> self-reinforcing growth loop</strong>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="star-framework-cta-section">
        <div className="star-framework-container">
          <h3 className="star-framework-cta-title">
            Claim Your Free AI Systems Roadmap Now.
          </h3>
          
          <p className="star-framework-cta-benefit">
            This course qualifies you for your customized <strong>Professional Freelancer Audit</strong>, ensuring you are ready for 
            the accelerated implementation path of the <strong>10 Day AI Freelance Kickstart</strong>.
          </p>

          {/* Main CTA Button */}
          <div className="star-framework-main-cta-container">
            <a 
              href="https://innergcomplete.app.clientclub.net/courses/offers/7f92b682-50d8-4dbc-a5bf-c9f0090676ba"
              target="_blank"
              rel="noopener noreferrer"
              className="star-framework-main-cta-button"
            >
              <span className="star-framework-main-cta-icon">🚀</span>
              <span className="star-framework-main-cta-text">GET INSTANT ACCESS TO THE STAR METHOD FRAMEWORK</span>
              <span className="star-framework-main-cta-badge">FREE</span>
            </a>
          </div>
        </div>
      </section>

      {/* Trust Indicators Section */}
      <section className="star-framework-trust-section">
        <div className="star-framework-container">
          <p className="star-framework-trust-label">Powered by Industry-Leading Tools:</p>
          <div className="star-framework-trust-logos">
            <div className="star-framework-trust-logo">
              <div className="star-framework-logo-name">GoHighLevel</div>
              <div className="star-framework-logo-category">CRM/Automation</div>
            </div>
            <div className="star-framework-trust-logo">
              <div className="star-framework-logo-name">ChatGPT</div>
              <div className="star-framework-logo-category">AI Reasoning</div>
            </div>
          </div>
        </div>
      </section>

      {/* Authority Footer */}
      <footer className="star-framework-footer">
        <div className="star-framework-container">
          <p className="star-framework-footer-text">
            This free course is provided by <strong>Inner G Complete Agency</strong>, a <strong>Systems Architect</strong> who delivers 
            structured processes, not generic advice. You're accessing a valuable, proprietary business framework that provides the 
            <strong> "Blueprint To Freelance Freedom"</strong>.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default StarMethodFrameworkPage;

