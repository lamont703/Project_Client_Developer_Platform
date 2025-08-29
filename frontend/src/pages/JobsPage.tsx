import React from 'react';
import { Link } from 'react-router-dom';
import JobListing from '../components/JobListing';
import '../styles/PageLayout.css';

const JobsPage: React.FC = () => {
  return (
    <div className="page-layout">
      <div className="page-header">
        <div className="page-navigation">
          <Link to="/" className="nav-link">
            ← Back to Home
          </Link>
        </div>
        <h1>💼 Job Listings</h1>
        <p>Browse available opportunities and find your next project</p>
      </div>
      
      <div className="page-content">
        <JobListing />
      </div>
    </div>
  );
};

export default JobsPage; 