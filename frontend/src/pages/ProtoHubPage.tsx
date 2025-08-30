import React from 'react';
import { Link } from 'react-router-dom';
import ProtoHub from '../components/ProtoHub';
import '../styles/PageLayout.css';

const ProtoHubPage: React.FC = () => {
  return (
    <div className="page-layout">
      <div className="page-header">
        <div className="page-navigation">
          <Link to="/" className="nav-link">
            ← Back to Home
          </Link>
        </div>
        <h1>🚀 Proto Hub</h1>
        <p>Community Q&A for prototyping and bringing software ideas to life</p>
      </div>
      
      <div className="page-content">
        <ProtoHub />
      </div>
    </div>
  );
};

export default ProtoHubPage; 