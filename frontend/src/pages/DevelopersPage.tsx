import React from 'react';
import { DeveloperProfileDemo } from '../components';
import '../styles/PageLayout.css';

interface DevelopersPageProps {
  navigateToHome: () => void;
}

const DevelopersPage: React.FC<DevelopersPageProps> = ({ navigateToHome }) => {
  const handleBackToHome = () => {
    // Scroll to top immediately
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    // Navigate to home using the full URL
    navigateToHome();
  };

  return (
    <div className="page-layout">
      <div className="page-header">
        <div className="page-navigation">
          <button
            onClick={handleBackToHome}
            className="nav-link"
            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
          >
            ← Back to Home
          </button>
        </div>
        <h1>👥 Developer Directory</h1>
        <p>Browse our curated list of talented developers ready for your projects</p>
      </div>
      
      <div className="page-content">
        <DeveloperProfileDemo />
      </div>
    </div>
  );
};

export default DevelopersPage; 