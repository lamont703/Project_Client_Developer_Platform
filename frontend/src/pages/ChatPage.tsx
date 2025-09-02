import React from 'react';
import { ChatInterface } from '../components';
import '../styles/PageLayout.css';

interface ChatPageProps {
  navigateToHome: () => void;
}

const ChatPage: React.FC<ChatPageProps> = ({ navigateToHome }) => {
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
        <h1>🤖 AI Project Assistant</h1>
        <p>Get instant project analysis and wireframe prototypes</p>
      </div>
      
      <div className="page-content">
        <ChatInterface />
      </div>
    </div>
  );
};

export default ChatPage; 