import React from 'react';
import '../../styles/Accelerator Course/WhatsIncludedSection.css';

const WhatsIncludedSection: React.FC = () => {
  return (
    <section className="whats-included">
      <div className="whats-included-container">
        <div className="section-header">
          <h2 className="section-title">What's Included</h2>
          <p className="section-subtitle">
            Everything you need to scale your freelance business to $50K+ monthly
          </p>
        </div>
        
        <div className="included-grid">
          <div className="included-card featured">
            <div className="card-badge">Most Valuable</div>
            <div className="card-icon">👨‍🏫</div>
            <h3 className="card-title">1-on-1 Coaching Sessions</h3>
            <p className="card-description">
              Get personalized guidance with regular 1-on-1 coaching sessions. Work directly with experienced mentors 
              to overcome challenges, optimize your systems, and accelerate your growth.
            </p>
            <ul className="card-features">
              <li>✓ Weekly coaching calls</li>
              <li>✓ Personalized strategy sessions</li>
              <li>✓ Direct access to mentors</li>
              <li>✓ Customized action plans</li>
            </ul>
          </div>
          
          <div className="included-card">
            <div className="card-icon">📚</div>
            <h3 className="card-title">Advanced Course Modules</h3>
            <p className="card-description">
              Comprehensive modules covering advanced strategies for scaling your freelance business. 
              Learn proven systems used by top-earning freelancers.
            </p>
            <ul className="card-features">
              <li>✓ Client acquisition mastery</li>
              <li>✓ Pricing & negotiation strategies</li>
              <li>✓ Business scaling systems</li>
              <li>✓ Team building & delegation</li>
            </ul>
          </div>
          
          <div className="included-card">
            <div className="card-icon">🤖</div>
            <h3 className="card-title">Advanced AI Automation</h3>
            <p className="card-description">
              Master advanced AI tools and automation systems to scale your operations. 
              Learn how to automate client onboarding, project management, and service delivery.
            </p>
            <ul className="card-features">
              <li>✓ AI workflow automation</li>
              <li>✓ Client management systems</li>
              <li>✓ Service delivery automation</li>
              <li>✓ Productivity optimization</li>
            </ul>
          </div>
          
          <div className="included-card">
            <div className="card-icon">💼</div>
            <h3 className="card-title">Premium Client Strategies</h3>
            <p className="card-description">
              Learn how to attract and retain premium clients who pay top rates. 
              Build long-term relationships and create recurring revenue streams.
            </p>
            <ul className="card-features">
              <li>✓ Premium client targeting</li>
              <li>✓ Relationship building systems</li>
              <li>✓ Retainer & recurring revenue</li>
              <li>✓ Client retention strategies</li>
            </ul>
          </div>
          
          <div className="included-card">
            <div className="card-icon">📊</div>
            <h3 className="card-title">Business Systems & Templates</h3>
            <p className="card-description">
              Get access to proven business systems, templates, and frameworks. 
              Everything you need to systematize and scale your operations.
            </p>
            <ul className="card-features">
              <li>✓ Business system templates</li>
              <li>✓ Contract & proposal templates</li>
              <li>✓ SOPs & process documentation</li>
              <li>✓ Scaling frameworks</li>
            </ul>
          </div>
          
          <div className="included-card">
            <div className="card-icon">👥</div>
            <h3 className="card-title">Exclusive Community Access</h3>
            <p className="card-description">
              Join an exclusive community of high-achieving freelancers. 
              Network, collaborate, and learn from others who are scaling their businesses.
            </p>
            <ul className="card-features">
              <li>✓ Private community access</li>
              <li>✓ Networking opportunities</li>
              <li>✓ Peer support & collaboration</li>
              <li>✓ Mastermind sessions</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatsIncludedSection;

