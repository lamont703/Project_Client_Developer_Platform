import React from 'react';
import { Link } from 'react-router-dom';

interface NavigationProps {
  navigateToHome?: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ navigateToHome }) => {
  return (
    <nav style={{ 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
      padding: '1rem', 
      color: 'white',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
    }}>
      <Link 
        to="/" 
        style={{ 
          color: 'white', 
          textDecoration: 'none', 
          fontSize: '1.3rem', 
          fontWeight: 'bold',
          background: 'linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
        }}
      >
        User Feedback Rewards
      </Link>
      <div style={{ display: 'flex', gap: '1.5rem' }}>
        <Link 
          to="/" 
          style={{ 
            color: 'white', 
            textDecoration: 'none',
            fontWeight: '500',
            padding: '0.5rem 1rem',
            borderRadius: '8px',
            transition: 'all 0.3s ease',
            textShadow: '0 1px 3px rgba(0, 0, 0, 0.3)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
            e.currentTarget.style.transform = 'translateY(-1px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          Home
        </Link>
        <Link 
          to="/user-feedback" 
          style={{ 
            color: 'white', 
            textDecoration: 'none',
            fontWeight: '500',
            padding: '0.5rem 1rem',
            borderRadius: '8px',
            transition: 'all 0.3s ease',
            textShadow: '0 1px 3px rgba(0, 0, 0, 0.3)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
            e.currentTarget.style.transform = 'translateY(-1px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          Feedback
        </Link>
      </div>
    </nav>
  );
};

export default Navigation;
