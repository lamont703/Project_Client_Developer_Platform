import React from 'react';
import '../../styles/Book/WhatsIncludedSection.css';

const WhatsIncludedSection: React.FC = () => {
  return (
    <section className="whats-included">
      <div className="whats-included-container">
        <div className="section-header">
          <h2 className="section-title">What's Inside</h2>
          <p className="section-subtitle">
            Everything you need to break free from platforms and build a premium freelance business
          </p>
        </div>
        
        <div className="included-grid">
          <div className="included-card">
            <div className="card-icon">📖</div>
            <h3 className="card-title">Complete Blueprint Guide</h3>
            <p className="card-description">
              Step-by-step guide covering everything from escaping platform dependency to landing premium clients. 
              Learn the exact system used by successful freelancers.
            </p>
            <ul className="card-features">
              <li>✓ Platform exit strategies</li>
              <li>✓ Client acquisition methods</li>
              <li>✓ Pricing strategies</li>
              <li>✓ Business building framework</li>
            </ul>
          </div>
          
          <div className="included-card featured">
            <div className="card-badge">Most Valuable</div>
            <div className="card-icon">🤖</div>
            <h3 className="card-title">AI Systems & Tools</h3>
            <p className="card-description">
              Discover the AI tools and systems that can automate your workflow, enhance your services, 
              and help you deliver premium results to clients.
            </p>
            <ul className="card-features">
              <li>✓ AI tool recommendations</li>
              <li>✓ Workflow automation</li>
              <li>✓ Service enhancement strategies</li>
              <li>✓ Productivity boosters</li>
            </ul>
          </div>
          
          <div className="included-card">
            <div className="card-icon">💼</div>
            <h3 className="card-title">Premium Client Strategies</h3>
            <p className="card-description">
              Learn how to attract and close high-value clients who pay premium rates. 
              No more competing on price with thousands of other freelancers.
            </p>
            <ul className="card-features">
              <li>✓ Client targeting methods</li>
              <li>✓ Proposal templates</li>
              <li>✓ Negotiation tactics</li>
              <li>✓ Relationship building</li>
            </ul>
          </div>
          
          <div className="included-card">
            <div className="card-icon">📊</div>
            <h3 className="card-title">Business Growth Framework</h3>
            <p className="card-description">
              Build a scalable freelance business that works for you. Learn how to systematize 
              your operations and create sustainable income streams.
            </p>
            <ul className="card-features">
              <li>✓ Business systems</li>
              <li>✓ Scaling strategies</li>
              <li>✓ Time management</li>
              <li>✓ Revenue optimization</li>
            </ul>
          </div>
          
          <div className="included-card">
            <div className="card-icon">🎯</div>
            <h3 className="card-title">Action Templates</h3>
            <p className="card-description">
              Ready-to-use templates and checklists to implement the strategies immediately. 
              No guesswork - just follow the proven system.
            </p>
            <ul className="card-features">
              <li>✓ Email templates</li>
              <li>✓ Proposal templates</li>
              <li>✓ Checklist guides</li>
              <li>✓ Planning worksheets</li>
            </ul>
          </div>
          
          <div className="included-card">
            <div className="card-icon">🔄</div>
            <h3 className="card-title">Lifetime Updates</h3>
            <p className="card-description">
              Get access to future updates and new strategies as the freelance landscape evolves. 
              Your investment grows with you.
            </p>
            <ul className="card-features">
              <li>✓ Free updates</li>
              <li>✓ New strategies</li>
              <li>✓ Community access</li>
              <li>✓ Ongoing support</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatsIncludedSection;

