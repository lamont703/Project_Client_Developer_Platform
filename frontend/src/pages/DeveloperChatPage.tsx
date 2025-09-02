import React from 'react';
import { DeveloperChatInterface } from '../components';
import '../styles/PageLayout.css';

interface DeveloperChatPageProps {
  navigateToHome: () => void;
}

const DeveloperChatPage: React.FC<DeveloperChatPageProps> = ({ navigateToHome }) => {
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
        <h1>👨‍💻 AI Developer Assistant</h1>
        <p>Get personalized help creating professional profiles and crafting winning job applications</p>
      </div>
      
      <div className="page-content">
        <DeveloperChatInterface />
      </div>
    </div>
  );
};

export default DeveloperChatPage; 