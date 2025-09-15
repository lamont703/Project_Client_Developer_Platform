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
        <h1>User Feedback Crypto Rewards</h1>
        <p>Share your experience with our development team and earn WLFI tokens for valuable feedback on our software, AI, blockchain, and automation services.</p>
        
        <div className="feature-highlights">
          <div className="highlight-item">
            <span className="highlight-icon">💬</span>
            <span>Share feedback on pipeline interactions</span>
          </div>
          <div className="highlight-item">
            <span className="highlight-icon">👥</span>
            <span>Rate developers: Lamont, Julian, Dantee</span>
          </div>
          <div className="highlight-item">
            <span className="highlight-icon">💰</span>
            <span>Earn WLFI crypto rewards</span>
          </div>
          <div className="highlight-item">
            <span className="highlight-icon">🔒</span>
            <span>Secure wallet integration</span>
          </div>
        </div>

        <div className="cta-buttons">
          <button 
            className="cta-button primary"
            onClick={() => handleNavigation('/user-feedback')}
          >
            Start Earning Rewards
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
