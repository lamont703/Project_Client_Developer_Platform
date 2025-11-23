import React from 'react';
import '../../styles/Webinar Workshop/WhatsIncludedSection.css';

const WhatsIncludedSection: React.FC = () => {
  return (
    <section className="webinar-whats-included">
      <div className="whats-included-container">
        <div className="section-header">
          <h2 className="section-title">What You'll Learn</h2>
          <p className="section-subtitle">
            Master the foundational concepts that complement the 10-Day AI Freelance Kickstart
          </p>
        </div>
        
        <div className="included-grid">
          <div className="included-card">
            <div className="card-icon">❓</div>
            <h3 className="card-title">The "What" - Core Concepts</h3>
            <p className="card-description">
              Understand exactly what AI freelancing is, how it differs from traditional freelancing, 
              and what makes it so powerful. Learn the fundamental concepts that form the foundation 
              of a successful AI-powered freelance business.
            </p>
            <ul className="card-features">
              <li>✓ What AI freelancing really means</li>
              <li>✓ Key concepts and terminology</li>
              <li>✓ The AI freelancing ecosystem</li>
              <li>✓ Essential tools and platforms</li>
            </ul>
          </div>
          
          <div className="included-card featured">
            <div className="card-badge">Core Focus</div>
            <div className="card-icon">💭</div>
            <h3 className="card-title">The "Why" - Strategic Understanding</h3>
            <p className="card-description">
              Discover why AI freelancing works, why certain strategies are more effective than others, 
              and why the traditional freelance model is being disrupted. Gain the strategic insight 
              needed to make informed decisions in your freelance journey.
            </p>
            <ul className="card-features">
              <li>✓ Why AI changes everything</li>
              <li>✓ Why skip Fiverr and Upwork</li>
              <li>✓ Why direct client relationships matter</li>
              <li>✓ Why systems beat hustle</li>
            </ul>
          </div>
          
          <div className="included-card">
            <div className="card-icon">🧠</div>
            <h3 className="card-title">Mindset & Strategy</h3>
            <p className="card-description">
              Learn the mindset shifts necessary for success in AI freelancing. Understand how to think 
              strategically about your freelance business and make decisions that lead to long-term growth 
              rather than short-term gains.
            </p>
            <ul className="card-features">
              <li>✓ Strategic thinking frameworks</li>
              <li>✓ Mindset shifts for success</li>
              <li>✓ Decision-making principles</li>
              <li>✓ Long-term vs short-term thinking</li>
            </ul>
          </div>
          
          <div className="included-card">
            <div className="card-icon">🔗</div>
            <h3 className="card-title">How It Complements the Kickstart</h3>
            <p className="card-description">
              See how understanding these concepts makes the 10-Day AI Freelance Kickstart even more 
              effective. When you know the "what" and "why," the "how" becomes much more powerful 
              and meaningful.
            </p>
            <ul className="card-features">
              <li>✓ Connect concepts to implementation</li>
              <li>✓ Understand the bigger picture</li>
              <li>✓ Make informed decisions</li>
              <li>✓ Accelerate your learning curve</li>
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


