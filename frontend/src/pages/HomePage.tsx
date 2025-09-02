import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/HomePage.css';

interface HomePageProps {
  navigateToHome?: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ navigateToHome }) => {
  const navigate = useNavigate();

  const handleNavigation = (route: string) => {
    // Scroll to top immediately before navigation
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    navigate(route);
  };

  return (
    <div className="home-page">
      <div className="hero-section">
        <h1>🚀 AI Project Assistant Platform</h1>
        <p className="hero-subtitle">
          Connect with talented developers and bring your project ideas to life
        </p>
        
        <div className="hero-cta">
          <button 
            onClick={() => handleNavigation('/chat')} 
            className="cta-button primary"
          >
            🤖 Start AI Assistant
          </button>
          <button 
            onClick={() => handleNavigation('/jobs')} 
            className="cta-button secondary"
          >
            💼 Browse Jobs
          </button>
        </div>
      </div>

      <div className="features-section">
        <h2>What We Offer</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🤖</div>
            <h3>AI Project Assistant</h3>
            <p>Get instant project analysis and wireframe prototypes with our AI-powered assistant</p>
            <button 
              onClick={() => handleNavigation('/chat')} 
              className="feature-link"
            >
              Try Now →
            </button>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">👨‍💻</div>
            <h3>AI Developer Assistant</h3>
            <p>Get personalized help creating professional profiles and crafting winning job applications</p>
            <button 
              onClick={() => handleNavigation('/developer-chat')} 
              className="feature-link"
            >
              Get Started →
            </button>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">🚀</div>
            <h3>Proto Hub</h3>
            <p>Join our community Q&A forum to learn about prototyping and get help bringing your ideas to life</p>
            <button 
              onClick={() => handleNavigation('/proto-hub')} 
              className="feature-link"
            >
              Join Community →
            </button>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">👥</div>
            <h3>Developer Directory</h3>
            <p>Browse our curated list of talented developers ready for your projects</p>
            <button 
              onClick={() => handleNavigation('/developers')} 
              className="feature-link"
            >
              Browse →
            </button>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">🔍</div>
            <h3>Job Listings</h3>
            <p>Find the perfect opportunity from our extensive job board</p>
            <button 
              onClick={() => handleNavigation('/jobs')} 
              className="feature-link"
            >
              View Jobs →
            </button>
          </div>
        </div>
      </div>

      <div className="stats-section">
        <h2>Platform Statistics</h2>
        <div className="stats-grid">
          <div className="stat-item">
            <div className="stat-number">500+</div>
            <div className="stat-label">Projects Completed</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">200+</div>
            <div className="stat-label">Active Developers</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">50+</div>
            <div className="stat-label">Companies Served</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">98%</div>
            <div className="stat-label">Client Satisfaction</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage; 