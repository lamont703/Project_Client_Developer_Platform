import React from 'react';
import { Link } from 'react-router-dom';
import ChatInterface from '../components/ChatInterface';
import '../styles/PageLayout.css';

const ChatPage: React.FC = () => {
  return (
    <div className="page-layout">
      <div className="page-header">
        <div className="page-navigation">
          <Link to="/" className="nav-link">
            ← Back to Home
          </Link>
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