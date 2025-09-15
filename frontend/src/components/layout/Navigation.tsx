import React from 'react';
import { Link } from 'react-router-dom';

interface NavigationProps {
  navigateToHome?: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ navigateToHome }) => {
  return (
    <nav style={{ 
      background: '#007cba', 
      padding: '1rem', 
      color: 'white',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <Link to="/" style={{ color: 'white', textDecoration: 'none', fontSize: '1.2rem', fontWeight: 'bold' }}>
        Client Developer Platform
      </Link>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Home</Link>
        <Link to="/user-feedback" style={{ color: 'white', textDecoration: 'none' }}>Feedback</Link>
      </div>
    </nav>
  );
};

export default Navigation;
