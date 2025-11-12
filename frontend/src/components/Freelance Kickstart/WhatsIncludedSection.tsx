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
            <h3 className="card-title">10-Day Daily Lessons</h3>
            <p className="card-description">
              Each day includes comprehensive lessons designed to build your freelance skills systematically. 
              Every lesson features both theory and practical components to ensure you understand concepts 
              and can apply them immediately.
            </p>
            <ul className="card-features">
              <li>✓ Theory portion: Learn core concepts</li>
              <li>✓ Practical portion: Live screen share demonstrations</li>
              <li>✓ Step-by-step guidance</li>
              <li>✓ Hands-on practice opportunities</li>
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
            <div className="card-icon">📋</div>
            <h3 className="card-title">Worksheets & Checklists</h3>
            <p className="card-description">
              Access downloadable worksheets and checklists designed to help you understand concepts clearly 
              and maintain clarity in your operations. These practical tools ensure you stay organized and 
              on track throughout your freelance journey.
            </p>
            <ul className="card-features">
              <li>✓ Concept comprehension worksheets</li>
              <li>✓ Operational checklists</li>
              <li>✓ Downloadable resources</li>
              <li>✓ Progress tracking tools</li>
            </ul>
          </div>
          
          <div className="included-card">
            <div className="card-icon">👥</div>
            <h3 className="card-title">Private Freelancer Community</h3>
            <p className="card-description">
              Join an exclusive private networking community of freelancers. Connect with peers, share 
              experiences, collaborate on projects, and build lasting professional relationships in a 
              supportive environment.
            </p>
            <ul className="card-features">
              <li>✓ Private networking community</li>
              <li>✓ Peer collaboration opportunities</li>
              <li>✓ Knowledge sharing platform</li>
              <li>✓ Professional connections</li>
            </ul>
          </div>
          
          <div className="included-card">
            <div className="card-icon">🛠️</div>
            <h3 className="card-title">Tech Support</h3>
            <p className="card-description">
              Get dedicated technical support whenever you need it. If anything goes wrong or you have 
              questions about the platform, tools, or lessons, our support team is here to help you 
              succeed.
            </p>
            <ul className="card-features">
              <li>✓ Dedicated tech support</li>
              <li>✓ Troubleshooting assistance</li>
              <li>✓ Platform guidance</li>
              <li>✓ Quick response times</li>
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

