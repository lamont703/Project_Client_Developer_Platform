import React from 'react';
import { DeveloperProfileDemo } from '../components';
import '../styles/PageLayout.css';

interface DevelopersPageProps {
  navigateToHome: () => void;
}

const DevelopersPage: React.FC<DevelopersPageProps> = ({ navigateToHome }) => {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    console.log('DevelopersPage: Component mounted');
    setIsLoaded(true);
  }, []);

  const handleBackToHome = () => {
    try {
      console.log('DevelopersPage: Navigating back to home');
      // Scroll to top immediately
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      // Navigate to home using the full URL
      navigateToHome();
    } catch (err) {
      console.error('DevelopersPage: Navigation error:', err);
      setError('Navigation failed');
    }
  };

  // Simple fallback content that will definitely render
  if (!isLoaded) {
    return (
      <div style={{ padding: '20px', textAlign: 'center', background: '#fff', minHeight: '100vh' }}>
        <h1>Loading Developers Page...</h1>
        <p>Please wait while we load the developer directory.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '20px', textAlign: 'center', background: '#fff', minHeight: '100vh' }}>
        <h1>Error Loading Page</h1>
        <p>{error}</p>
        <button onClick={handleBackToHome} style={{ padding: '10px 20px', margin: '10px' }}>
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="page-layout" style={{ background: '#fff', minHeight: '100vh' }}>
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