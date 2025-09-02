import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { Navigation, ScrollToTop } from './components';
import { HomePage, ChatPage, JobsPage, PostJobPage, DevelopersPage } from './pages';
import DeveloperChatPage from './pages/DeveloperChatPage';
import ProtoHubPage from './pages/ProtoHubPage';
import './App.css';

function AppContent() {
  const navigate = useNavigate();
  
  // Function to navigate to home page using React Router
  const navigateToHome = () => {
    // Navigate to the home route within the app
    navigate('/');
  };

  return (
    <div className="App">
      <ScrollToTop />
      <Navigation navigateToHome={navigateToHome} />
      <Routes>
        <Route path="/" element={<HomePage navigateToHome={navigateToHome} />} />
        <Route path="/chat" element={<ChatPage navigateToHome={navigateToHome} />} />
        <Route path="/developer-chat" element={<DeveloperChatPage navigateToHome={navigateToHome} />} />
        <Route path="/proto-hub" element={<ProtoHubPage navigateToHome={navigateToHome} />} />
        <Route path="/jobs" element={<JobsPage navigateToHome={navigateToHome} />} />
        <Route path="/post-job" element={<PostJobPage navigateToHome={navigateToHome} />} />
        <Route path="/developers" element={<DevelopersPage navigateToHome={navigateToHome} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <div className="app-isolation-container">
      <Router basename="/prototype_pipeline">
        <AppContent />
      </Router>
    </div>
  );
}

export default App;
