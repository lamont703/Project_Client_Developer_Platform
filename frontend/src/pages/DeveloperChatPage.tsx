import React from 'react';
import { Link } from 'react-router-dom';
import DeveloperChatInterface from '../components/DeveloperChatInterface';
import '../styles/PageLayout.css';

const DeveloperChatPage: React.FC = () => {
  return (
    <div className="page-layout">
      <div className="page-header">
        <div className="page-navigation">
          <Link to="/" className="nav-link">
            ← Back to Home
          </Link>
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