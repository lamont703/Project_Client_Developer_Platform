import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../../styles/Navigation.css';

interface NavigationProps {
  navigateToHome: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ navigateToHome }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: '/', label: '🏠 Home', icon: '🏠' },
    { path: '/chat', label: '🤖 AI Assistant', icon: '🤖' },
    { path: '/developer-chat', label: '👨‍💻 Dev Assistant', icon: '👨‍💻' },
    { path: '/proto-hub', label: '🚀 Proto Hub', icon: '🚀' },
    { path: '/jobs', label: '💼 Jobs', icon: '💼' },
    { path: '/developers', label: '👥 Developers', icon: '👥' }
  ];

  const handleNavClick = (path: string) => {
    // Scroll to top immediately before navigation
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    if (path === '/') {
      // Use the full URL for home navigation
      navigateToHome();
    } else {
      navigate(path);
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="navigation">
      <div className="nav-container">
        <button 
          onClick={() => handleNavClick('/')} 
          className="nav-logo"
          style={{ background: 'none', border: 'none', cursor: 'pointer' }}
        >
          🚀 AI Project Assistant
        </button>
        
        {/* Desktop Navigation */}
        <div className="nav-menu desktop">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => handleNavClick(item.path)}
              className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
              style={{ background: 'none', border: 'none', cursor: 'pointer' }}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </button>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="mobile-menu-button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`hamburger ${isMenuOpen ? 'open' : ''}`}></span>
        </button>
      </div>

      {/* Mobile Navigation */}
      <div className={`nav-menu mobile ${isMenuOpen ? 'open' : ''}`}>
        {navItems.map((item) => (
          <button
            key={item.path}
            onClick={() => handleNavClick(item.path)}
            className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
            style={{ background: 'none', border: 'none', cursor: 'pointer', width: '100%', textAlign: 'left' }}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navigation; 