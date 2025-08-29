import React from 'react';
import { Link } from 'react-router-dom';
import PostJobWizard from '../components/PostJobWizard';
import '../styles/PageLayout.css';

const PostJobPage: React.FC = () => {
  return (
    <div className="page-layout">
      <div className="page-header">
        <div className="page-navigation">
          <Link to="/" className="nav-link">
            ← Back to Home
          </Link>
        </div>
        <h1>📝 Post a Job</h1>
        <p>Create detailed job postings with our step-by-step wizard</p>
      </div>
      
      <div className="page-content">
        <PostJobWizard />
      </div>
    </div>
  );
};

export default PostJobPage; 