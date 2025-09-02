import React from 'react';
import { PostJobWizard } from '../components';
import '../styles/PageLayout.css';

interface PostJobPageProps {
  navigateToHome: () => void;
}

const PostJobPage: React.FC<PostJobPageProps> = ({ navigateToHome }) => {
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
        <h1>📝 Post a Job</h1>
        <p>Create a job posting to find the perfect developer for your project</p>
      </div>
      
      <div className="page-content">
        <PostJobWizard />
      </div>
    </div>
  );
};

export default PostJobPage; 