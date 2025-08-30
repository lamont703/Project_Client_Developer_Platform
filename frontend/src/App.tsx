import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import ScrollToTop from './components/ScrollToTop';
import { HomePage, ChatPage, JobsPage, PostJobPage, DevelopersPage } from './pages';
import DeveloperChatPage from './pages/DeveloperChatPage';
import ProtoHubPage from './pages/ProtoHubPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <ScrollToTop />
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/developer-chat" element={<DeveloperChatPage />} />
          <Route path="/proto-hub" element={<ProtoHubPage />} />
          <Route path="/jobs" element={<JobsPage />} />
          <Route path="/post-job" element={<PostJobPage />} />
          <Route path="/developers" element={<DevelopersPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
