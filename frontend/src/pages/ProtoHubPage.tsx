import React from 'react';
import { ProtoHub } from '../components';
import '../styles/PageLayout.css';

interface ProtoHubPageProps {
  navigateToHome: () => void;
}

const ProtoHubPage: React.FC<ProtoHubPageProps> = ({ navigateToHome }) => {
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
        <h1>🚀 Proto Hub</h1>
        <p>Join our community Q&A forum to learn about prototyping and get help bringing your ideas to life</p>
      </div>
      
      <div className="page-content">
        <ProtoHub />
      </div>
    </div>
  );
};

export default ProtoHubPage; 