import React from 'react';
import { JobListing } from '../components';
import '../styles/PageLayout.css';

interface JobsPageProps {
  navigateToHome: () => void;
}

const JobsPage: React.FC<JobsPageProps> = ({ navigateToHome }) => {
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
        <h1>💼 Pipeline Projects</h1>
        <p>Find the perfect opportunity from our extensive job board</p>
      </div>
      
      <div className="page-content">
        <JobListing />
      </div>
    </div>
  );
};

export default JobsPage; 