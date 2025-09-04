import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const TestHashRouter: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleTestNavigation = (path: string) => {
    try {
      console.log('Navigating to:', path);
      navigate(path);
    } catch (error) {
      console.error('Navigation error:', error);
    }
  };

  return (
    <div style={{ padding: '20px', background: '#f0f0f0', margin: '20px', borderRadius: '8px' }}>
      <h3>🧪 HashRouter Test Component</h3>
      <p><strong>Current location:</strong> {location.pathname}</p>
      <p><strong>Current hash:</strong> {window.location.hash}</p>
      <p><strong>Current search:</strong> {window.location.search}</p>
      
      <div style={{ margin: '10px 0' }}>
        <button onClick={() => handleTestNavigation('/')} style={{ margin: '5px' }}>
          Home
        </button>
        <button onClick={() => handleTestNavigation('/chat')} style={{ margin: '5px' }}>
          Chat
        </button>
        <button onClick={() => handleTestNavigation('/jobs')} style={{ margin: '5px' }}>
          Jobs
        </button>
      </div>
      
      <div style={{ fontSize: '12px', color: '#666' }}>
        <p>URL: {window.location.href}</p>
        <p>Pathname: {window.location.pathname}</p>
        <p>Hash: {window.location.hash}</p>
        <p>Search: {window.location.search}</p>
      </div>
    </div>
  );
};

export default TestHashRouter; 