import React from 'react';
import '../../styles/Webinar Workshop/WhatsIncludedSection.css';

const WhatsIncludedSection: React.FC = () => {
  return (
    <section className="webinar-whats-included">
      <div className="whats-included-container">
        <div className="section-header">
          <h2 className="section-title">What You'll Learn</h2>
          
          <div className="infographic-container">
            <img 
              src="/infographic.png" 
              alt="AI & The Future of Freelancing: Adapt or Be Replaced - Infographic showing the AI disruption in freelancing, market splitting, platform fees, and the 5-step system to find clients"
              className="infographic-image"
            />
          </div>
          
          <p className="section-subtitle">
            Discover the AI-freelancing system that helps you escape lowball clients and platform fees, and start attracting clients who pay $5K or higher per project
          </p>
        </div>
        
        <div className="included-grid">
          <div className="included-card">
            <div className="card-icon">🚫</div>
            <h3 className="card-title">Escape Platform Fees & Lowball Clients</h3>
            <p className="card-description">
              Learn why platforms like Fiverr and Upwork keep you stuck in a race to the bottom, 
              and discover the proven system to break free. Understand how to eliminate 20% fees 
              and stop competing on price alone.
            </p>
            <ul className="card-features">
              <li>✓ Why platforms keep you underpaid</li>
              <li>✓ How to eliminate 20% platform fees</li>
              <li>✓ Stop competing on price</li>
              <li>✓ Break free from the race to the bottom</li>
            </ul>
          </div>
          
          <div className="included-card featured">
            <div className="card-badge">Core Focus</div>
            <div className="card-icon">🎯</div>
            <h3 className="card-title">The AI-Freelancing System for $5K+ Clients</h3>
            <p className="card-description">
              Discover the exact system that helps you attract clients who pay $5K or higher per project. 
              Learn how AI tools amplify your skills and help you deliver results that command premium rates — fast.
            </p>
            <ul className="card-features">
              <li>✓ How to attract $5K+ clients</li>
              <li>✓ AI tools that get results fast</li>
              <li>✓ System for premium client acquisition</li>
              <li>✓ Strategies that work immediately</li>
            </ul>
          </div>
          
          <div className="included-card">
            <div className="card-icon">⚡</div>
            <h3 className="card-title">Get Results Fast</h3>
            <p className="card-description">
              This isn't theory — it's a proven system you can implement immediately. Learn the 
              exact strategies and AI tools that help you start attracting $5K+ clients right away, 
              without months of trial and error.
            </p>
            <ul className="card-features">
              <li>✓ Actionable strategies you can use today</li>
              <li>✓ Fast-track to $5K+ clients</li>
              <li>✓ Immediate implementation steps</li>
              <li>✓ Skip the learning curve</li>
            </ul>
          </div>
          
          <div className="included-card">
            <div className="card-icon">💬</div>
            <h3 className="card-title">Live Q&A Session</h3>
            <p className="card-description">
              Get your questions answered in real-time during our interactive Q&A session. This is your 
              opportunity to clarify concepts, address concerns, and get personalized guidance from 
              experienced AI freelancers.
            </p>
            <ul className="card-features">
              <li>✓ Real-time question answering</li>
              <li>✓ Personalized guidance</li>
              <li>✓ Interactive discussion</li>
              <li>✓ Community engagement</li>
            </ul>
          </div>
          
          <div className="included-card">
            <div className="card-icon">📹</div>
            <h3 className="card-title">Workshop Recording</h3>
            <p className="card-description">
              Can't attend live? No problem! All attendees receive access to the full workshop recording 
              so you can watch at your own pace and revisit key concepts whenever you need.
            </p>
            <ul className="card-features">
              <li>✓ Full workshop recording</li>
              <li>✓ Lifetime access</li>
              <li>✓ Replay anytime</li>
              <li>✓ Downloadable resources</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatsIncludedSection;


