import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/HomePage.css';

interface HomePageProps {
  navigateToHome?: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ navigateToHome }) => {
  const navigate = useNavigate();

  const handleNavigation = (route: string) => {
    try {
      // Scroll to top immediately before navigation
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      navigate(route);
    } catch (error) {
      console.error('HomePage navigation error:', error);
      // Fallback to hash navigation
      window.location.hash = `#${route}`;
    }
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
            💼 Browse Projects
          </button>
        </div>
      </div>

      <div className="features-section">
        <div className="features-grid">
          <div className="feature-card" onClick={() => handleNavigation('/chat')}>
            <div className="feature-icon">🤖</div>
            <h3>AI Project Assistant</h3>
            <p>Get help defining your project requirements with our intelligent assistant</p>
            <button className="feature-link">Start Assistant →</button>
          </div>
          
          <div className="feature-card" onClick={() => handleNavigation('/developer-chat')}>
            <div className="feature-icon">👨‍💻</div>
            <h3>AI Developer Assistant</h3>
            <p>Get technical guidance and development support from our AI assistant</p>
            <button className="feature-link">Get Support →</button>
          </div>
          
          <div className="feature-card" onClick={() => handleNavigation('/proto-hub')}>
            <div className="feature-icon">🚀</div>
            <h3>Proto Hub</h3>
            <p>Explore prototypes and get inspiration for your next project</p>
            <button className="feature-link">Explore Hub →</button>
          </div>
          
          <div className="feature-card" onClick={() => handleNavigation('/jobs')}>
            <div className="feature-icon">💼</div>
            <h3>Project Listings</h3>
            <p>Browse active projects and opportunities in your pipeline</p>
            <button className="feature-link">Browse Projects →</button>
          </div>
          
          <div className="feature-card" onClick={() => handleNavigation('/developers')}>
            <div className="feature-icon">👥</div>
            <h3>Developer Directory</h3>
            <p>Connect with skilled developers in our community</p>
            <button className="feature-link">Find Developers →</button>
          </div>
        </div>
      </div>

      

      <div className="stats-section">
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
            <div className="stat-number">98%</div>
            <div className="stat-label">Success Rate</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">24/7</div>
            <div className="stat-label">Support</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage; 