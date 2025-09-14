import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { Navigation, ScrollToTop } from './components';
import { HomePage, ChatPage, JobsPage, PostJobPage, DevelopersPage, AICommunityMemberPage, PitchDeckPage, DeFiPage, TaskManagerPage, PipelineDashboardPage, UserFeedbackPage, CodeContributionsPage } from './pages';
import LandingPage from './components/Landing Page/LandingPage';
import DeveloperChatPage from './pages/DeveloperChatPage';
import ProtoHubPage from './pages/ProtoHubPage';
import GamificationPage from './pages/GamificationPage';
import { Analytics } from './utils/analytics';
import './App.css';

// Error Boundary Component
class ErrorBoundary extends React.Component<{children: React.ReactNode}, {hasError: boolean, error?: Error}> {
  constructor(props: {children: React.ReactNode}) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('App Error Boundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', textAlign: 'center', background: '#fff' }}>
          <h1>🚨 Something went wrong</h1>
          <p>There was an error rendering the application.</p>
          <details style={{ margin: '20px 0', textAlign: 'left' }}>
            <summary>Error Details</summary>
            <pre style={{ background: '#f5f5f5', padding: '10px', borderRadius: '4px' }}>
              {this.state.error?.message || 'Unknown error'}
            </pre>
          </details>
          <button 
            onClick={() => {
              this.setState({ hasError: false, error: undefined });
              window.location.reload();
            }}
            style={{ padding: '10px 20px', background: '#007cba', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            Refresh Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Safe Component Wrapper with DOM protection
const SafeComponent: React.FC<{children: React.ReactNode, fallback?: React.ReactNode}> = ({ children, fallback }) => {
  const [hasError, setHasError] = React.useState(false);
  const [renderAttempts, setRenderAttempts] = React.useState(0);
  
  React.useEffect(() => {
    // Add global error handler for this component
    const handleError = (event: ErrorEvent) => {
      console.error('SafeComponent caught error:', event.error);
      setHasError(true);
    };
    
    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  // Force re-render on error
  React.useEffect(() => {
    if (hasError && renderAttempts < 3) {
      const timer = setTimeout(() => {
        console.log(`SafeComponent: Retry attempt ${renderAttempts + 1}`);
        setHasError(false);
        setRenderAttempts(prev => prev + 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [hasError, renderAttempts]);

  if (hasError) {
    return (
      <div style={{ padding: '20px', textAlign: 'center', background: '#fff', minHeight: '100vh' }}>
        <h1>Component Error</h1>
        <p>Retrying... (Attempt {renderAttempts + 1}/3)</p>
        {fallback || <div>Component failed to render</div>}
      </div>
    );
  }

  try {
    return <>{children}</>;
  } catch (error) {
    console.error('Component render error:', error);
    setHasError(true);
    return <>{fallback || <div>Component failed to render</div>}</>;
  }
};

// DOM Ready Check Component
const DOMReadyCheck: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [isReady, setIsReady] = React.useState(false);
  const [retryCount, setRetryCount] = React.useState(0);
  
  React.useEffect(() => {
    const checkDOM = () => {
      try {
        // Check if document and body are available
        if (typeof document !== 'undefined' && document.body && document.getElementById('root')) {
          // Additional check for GoHighLevel environment
          if (window.location.hostname.includes('xrwebsites.io') || window.location.hostname.includes('leadconnectorhq.com')) {
            // Wait a bit longer for GoHighLevel to fully load
            setTimeout(() => {
              setIsReady(true);
            }, 500);
          } else {
            setIsReady(true);
          }
        } else {
          throw new Error('DOM not ready');
        }
      } catch (error) {
        console.log('DOM not ready, retrying...', retryCount);
        if (retryCount < 15) { // Increased retry count for GoHighLevel
          setTimeout(() => {
            setRetryCount(prev => prev + 1);
            checkDOM();
          }, 200); // Increased timeout
        } else {
          console.error('DOM failed to be ready after 15 attempts');
          setIsReady(true); // Force render anyway
        }
      }
    };
    
    checkDOM();
  }, [retryCount]);

  if (!isReady) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <div>Loading application...</div>
      </div>
    );
  }

  return <>{children}</>;
};

function AppContent() {
  const navigate = useNavigate();
  const [isReady, setIsReady] = React.useState(false);
  
  // Function to navigate to home page using React Router
  const navigateToHome = () => {
    try {
      navigate('/');
    } catch (error) {
      console.error('Navigation error:', error);
      window.location.hash = '#/';
    }
  };

  // Wait for everything to be ready
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 200); // Increased timeout
    
    return () => clearTimeout(timer);
  }, []);

  if (!isReady) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <div>Initializing...</div>
      </div>
    );
  }

  return (
    <div className="App">
      <SafeComponent>
        <ScrollToTop />
      </SafeComponent>
      
      <SafeComponent>
        <Navigation navigateToHome={navigateToHome} />
      </SafeComponent>
      
      <SafeComponent>
        <Routes>
          <Route path="/" element={
            <SafeComponent>
              <HomePage navigateToHome={navigateToHome} />
            </SafeComponent>
          } />
          <Route path="/chat" element={
            <SafeComponent>
              <ChatPage navigateToHome={navigateToHome} />
            </SafeComponent>
          } />
          <Route path="/developer-chat" element={
            <SafeComponent>
              <DeveloperChatPage navigateToHome={navigateToHome} />
            </SafeComponent>
          } />
          <Route path="/proto-hub" element={
            <SafeComponent>
              <ProtoHubPage navigateToHome={navigateToHome} />
            </SafeComponent>
          } />
          <Route path="/jobs" element={
            <SafeComponent>
              <JobsPage navigateToHome={navigateToHome} />
            </SafeComponent>
          } />
          <Route path="/post-job" element={
            <SafeComponent>
              <PostJobPage navigateToHome={navigateToHome} />
            </SafeComponent>
          } />
          <Route path="/developers" element={
            <SafeComponent>
              <DevelopersPage navigateToHome={navigateToHome} />
            </SafeComponent>
          } />
          <Route path="/gamification" element={
            <SafeComponent>
              <GamificationPage navigateToHome={navigateToHome} />
            </SafeComponent>
          } />
          <Route path="/ai-community-member" element={
            <SafeComponent>
              <AICommunityMemberPage navigateToHome={navigateToHome} />
            </SafeComponent>
          } />
          <Route path="/task-manager" element={
            <SafeComponent>
              <TaskManagerPage navigateToHome={navigateToHome} />
            </SafeComponent>
          } />
          <Route path="/pitch-deck" element={
            <SafeComponent>
              <PitchDeckPage navigateToHome={navigateToHome} />
            </SafeComponent>
          } />
          <Route path="/landing-page" element={
            <SafeComponent>
              <LandingPage navigateToHome={navigateToHome} />
            </SafeComponent>
          } />
          <Route path="/defi-platform" element={
            <SafeComponent>
              <DeFiPage navigateToHome={navigateToHome} />
            </SafeComponent>
          } />
          <Route path="/pipeline-dashboard" element={
            <SafeComponent>
              <PipelineDashboardPage navigateToHome={navigateToHome} />
            </SafeComponent>
          } />
          <Route path="/user-feedback" element={
            <SafeComponent>
              <UserFeedbackPage navigateToHome={navigateToHome} />
            </SafeComponent>
          } />
          <Route path="/code-contributions" element={
            <SafeComponent>
              <CodeContributionsPage navigateToHome={navigateToHome} />
            </SafeComponent>
          } />          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </SafeComponent>
    </div>
  );
}

function App() {
  // Initialize analytics
  React.useEffect(() => {
    try {
      const analytics = Analytics.getInstance();
      analytics.initAnalytics();
      
      // Debug logging for development
      if (process.env.NODE_ENV === 'development' || window.location.hostname === 'localhost') {
        console.log('✅ Analytics initialized successfully');
        console.log('🔍 gtag available:', typeof (window as any).gtag === 'function');
        console.log('📊 dataLayer available:', Array.isArray((window as any).dataLayer));
      }
    } catch (error) {
      console.error('Error initializing analytics:', error);
    }
  }, []);

  return (
    <ErrorBoundary>
      <DOMReadyCheck>
        <div className="app-isolation-container">
          <Router>
            <AppContent />
          </Router>
        </div>
      </DOMReadyCheck>
    </ErrorBoundary>
  );
}

export default App;
