import React from 'react';
import '../../styles/Freelance Kickstart/WhatsIncludedSection.css';

const WhatsIncludedSection: React.FC = () => {
  return (
    <section className="whats-included">
      <div className="whats-included-container">
        <div className="section-header">
          <h2 className="section-title">What's Included</h2>
          <p className="section-subtitle">
            Everything you need to jumpstart your AI-powered freelance career in just 10 days
          </p>
        </div>
        
        <div className="included-grid">
          <div className="included-card">
            <div className="card-icon">📚</div>
            <h3 className="card-title">10-Day Kickstart</h3>
            <p className="card-description">
              Daily lessons with step-by-step guidance on using AI tools like Cursor and GoHighLevel. 
              Access to a supportive community and hands-on practice to build your freelance skills.
            </p>
            <ul className="card-features">
              <li>✓ Daily structured lessons</li>
              <li>✓ AI tool tutorials</li>
              <li>✓ Community support</li>
              <li>✓ Step-by-step guidance</li>
            </ul>
          </div>
          
          <div className="included-card featured">
            <div className="card-badge">Most Popular</div>
            <div className="card-icon">🎯</div>
            <h3 className="card-title">GoHighLevel Trial</h3>
            <p className="card-description">
              Get a 14-day free trial with GoHighLevel and learn how to automate and manage your 
              freelance workflow. Discover how to streamline client communication, project management, 
              and business operations.
            </p>
            <ul className="card-features">
              <li>✓ 14-day free trial</li>
              <li>✓ Full platform access</li>
              <li>✓ Workflow automation</li>
              <li>✓ Client management tools</li>
            </ul>
          </div>
          
          <div className="included-card">
            <div className="card-icon">💡</div>
            <h3 className="card-title">AI Freelancing Lessons</h3>
            <p className="card-description">
              Learn how to leverage AI tools to work smarter, not harder. Master techniques for 
              development, digital marketing, design, and other freelancing niches using cutting-edge AI technology.
            </p>
            <ul className="card-features">
              <li>✓ AI tool integration</li>
              <li>✓ Freelance best practices</li>
              <li>✓ Multiple niche coverage</li>
              <li>✓ Real-world applications</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatsIncludedSection;

