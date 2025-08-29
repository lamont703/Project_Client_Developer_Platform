import React from 'react';
import { Link } from 'react-router-dom';
import DeveloperProfileDemo from '../components/DeveloperProfileDemo';
import '../styles/PageLayout.css';

const DevelopersPage: React.FC = () => {
  return (
    <div className="page-layout">
      <div className="page-header">
        <div className="page-navigation">
          <Link to="/" className="nav-link">
            ← Back to Home
          </Link>
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