import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/HomePage.css';
import { HomePage as HomePageComponent, ChatPage, JobsPage, PostJobPage, DevelopersPage, AICommunityMemberPage, PitchDeckPage, DeFiPage, TaskManagerPage, PipelineDashboardPage } from './index';

interface HomePageProps {
  navigateToHome?: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ navigateToHome }) => {
  const navigate = useNavigate();

  const handleNavigation = (route: string) => {
    try {
      // Scroll to top immediately before navigation
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      navigate(route);
    } catch (error) {
      console.error('HomePage navigation error:', error);
      // Fallback to hash navigation
      window.location.hash = `#${route}`;
    }
  };

  return (
    <div className="home-page">
      <div className="hero-section">
        <div className="hero-badge">
          <span className="badge-icon">✨</span>
          <span className="badge-text">AI-Powered Development Platform</span>
        </div>
        
        <h1 className="hero-title">
          From Idea to Reality
          <span className="hero-highlight"> in Minutes</span>
        </h1>
        
        <p className="hero-subtitle">
          Connect with AI assistants and talented developers to bring your project ideas to life. 
          Get instant help, find collaborators, and launch faster than ever before.
        </p>
      </div>

      <div className="features-section">
        <div className="features-grid">
          <div className="feature-card" onClick={() => handleNavigation('/chat')}>
            <div className="feature-icon">🤖</div>
            <h3>AI Project Assistant</h3>
            <p>Get help defining your project requirements with our intelligent assistant</p>
            <button className="feature-link">Start Assistant →</button>
          </div>
          
          <div className="feature-card" onClick={() => handleNavigation('/developer-chat')}>
            <div className="feature-icon">👨‍💻</div>
            <h3>AI Developer Assistant</h3>
            <p>Get technical guidance and development support from our AI assistant</p>
            <button className="feature-link">Get Support →</button>
          </div>
          
          <div className="feature-card" onClick={() => handleNavigation('/ai-community-member')}>
            <div className="feature-icon">🤖👥</div>
            <h3>AI Community Member Control Center</h3>
            <p>Test and monitor AI Community Member Control Center endpoints and monitoring service</p>
            <button className="feature-link">Test Endpoints →</button>
          </div>
          
          <div className="feature-card" onClick={() => handleNavigation('/proto-hub')}>
            <div className="feature-icon">🚀</div>
            <h3>Proto Hub</h3>
            <p>Explore prototypes and get inspiration for your next project</p>
            <button className="feature-link">Explore Hub →</button>
          </div>
          
          <div className="feature-card" onClick={() => handleNavigation('/jobs')}>
            <div className="feature-icon">💼</div>
            <h3>Project Listings</h3>
            <p>Browse active projects and opportunities in your pipeline</p>
            <button className="feature-link">Browse Projects →</button>
          </div>
          
          <div className="feature-card" onClick={() => handleNavigation('/developers')}>
            <div className="feature-icon">👥</div>
            <h3>Developer Directory</h3>
            <p>Connect with skilled developers in our community</p>
            <button className="feature-link">Find Developers →</button>
          </div>
          
          <div className="feature-card" onClick={() => handleNavigation('/task-manager')}>
            <div className="feature-icon">📋</div>
            <h3>Task Manager</h3>
            <p>Track and manage tasks assigned to developers with real-time status updates and due date tracking</p>
            <button className="feature-link">Manage Tasks →</button>
          </div>
          
          <div className="feature-card" onClick={() => handleNavigation('/pitch-deck')}>
            <div className="feature-icon">📊</div>
            <h3>Platform Pitch Deck</h3>
            <p>View our comprehensive investor presentation showcasing the platform's vision, features, and market opportunity</p>
            <button className="feature-link">View Pitch Deck →</button>
          </div>
          
          <div className="feature-card" onClick={() => handleNavigation('/landing-page')}>
            <div className="feature-icon">🚀📊</div>
            <h3>Prototype + Pitch Deck Service</h3>
            <p>Transform your tech idea into reality with professional prototype and investor-ready pitch deck. Limited to 10 projects per month.</p>
            <button className="feature-link">Join Waitlist →</button>
          </div>
          
          <div className="feature-card" onClick={() => handleNavigation('/defi-platform')}>
            <div className="feature-icon">💰</div>
            <h3>Tech Project Funding Platform</h3>
            <p>Peer-to-peer DeFi lending specifically for Software, AI, Blockchain, and Automation projects</p>
            <button className="feature-link">Get Funding →</button>
          </div>
          
          <div className="feature-card" onClick={() => handleNavigation('/gamification')}>
            <div className="feature-icon">🎮</div>
            <h3>Developer Gamification</h3>
            <p>Earn points, unlock achievements, and climb the leaderboard by contributing to our platform. Turn your development work into an exciting game!</p>
            <button className="feature-link">Start Playing →</button>
          </div>

          <div className="feature-card" onClick={() => handleNavigation('/pipeline-dashboard')}>
            <div className="feature-icon">📊</div>
            <h3>Pipeline Control Center</h3>
            <p>Your mission control for opportunity management and client progression with AI-powered insights</p>
            <button className="feature-link">Open Dashboard →</button>
          </div>

          <div className="feature-card" onClick={() => handleNavigation('/user-feedback')}>
            <div className="feature-icon">💬</div>
            <h3>User Testing Feedback Platform</h3>
            <p>Comprehensive feedback collection system with analytics, gamification, and community features. Get insights from every user interaction to improve your platform.</p>
            <button className="feature-link">Give Feedback →</button>
          </div>
        </div>
      </div>

      <div className="stats-section">
        <div className="stats-grid">
          <div className="stat-item">
            <div className="stat-number">500+</div>
            <div className="stat-label">Projects Completed</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">200+</div>
            <div className="stat-label">Active Developers</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">98%</div>
            <div className="stat-label">Success Rate</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">24/7</div>
            <div className="stat-label">Support</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
