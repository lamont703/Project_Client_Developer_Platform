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
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/chat', label: 'AI Assistant', icon: '🤖' },
    { path: '/developer-chat', label: 'Dev Assistant', icon: '👨‍💻' },
    { path: '/proto-hub', label: 'Proto Hub', icon: '🚀' },
    { path: '/jobs', label: 'Projects', icon: '💼' },
    { path: '/developers', label: 'Developers', icon: '👥' },
    { path: '/pitch-deck', label: 'Pitch Deck', icon: '📊' },
    { path: '/defi-platform', label: 'DeFi Platform', icon: '🏦' },
    { path: '/task-manager', label: 'Task Manager', icon: '📋' },
    { path: '/code-contributions', label: 'Bounties', icon: '💰' }  ];

  const handleNavClick = (path: string) => {
    // Scroll to top immediately before navigation
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    
    if (path === '/') {
      navigateToHome();
    } else {
      navigate(path);
    }
    
    setIsMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navigation">
      <div className="nav-container">
        {/* Logo */}
        <button 
          onClick={() => handleNavClick('/')} 
          className="nav-logo"
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
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </button>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="mobile-menu-button"
          onClick={toggleMobileMenu}
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
