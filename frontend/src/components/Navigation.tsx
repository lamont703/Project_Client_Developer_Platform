import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Navigation.css';

const Navigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: '/', label: '🏠 Home', icon: '🏠' },
    { path: '/chat', label: '🤖 AI Assistant', icon: '🤖' },
    { path: '/developer-chat', label: '👨‍💻 Dev Assistant', icon: '👨‍💻' },
    { path: '/jobs', label: '💼 Jobs', icon: '💼' },
    { path: '/developers', label: '👥 Developers', icon: '👥' }
  ];

  return (
    <nav className="navigation">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          🚀 AI Project Assistant
        </Link>
        
        {/* Desktop Navigation */}
        <div className="nav-menu desktop">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </Link>
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
          <Link
            key={item.path}
            to={item.path}
            className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navigation; 