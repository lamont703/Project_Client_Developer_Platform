import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Analytics } from './utils/analytics';
import HomePage from './pages/HomePage';
import UserFeedbackPage from './pages/UserFeedbackPage';
import Navigation from './components/layout/Navigation';
import ScrollToTop from './components/layout/ScrollToTop';

// Error Boundary Component
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ 
          padding: '2rem', 
          textAlign: 'center',
          backgroundColor: '#f8f9fa',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <h1 style={{ color: '#dc3545', marginBottom: '1rem' }}>
            Something went wrong
          </h1>
          <p style={{ color: '#6c757d', marginBottom: '2rem' }}>
            We're sorry, but something unexpected happened.
          </p>
          <button 
            onClick={() => window.location.reload()}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: '#007cba',
              color: 'white',
              border: 'none',
              borderRadius: '0.375rem',
              cursor: 'pointer',
              fontSize: '1rem'
            }}
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// DOM Ready Check Component
const DOMReadyCheck: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isReady, setIsReady] = React.useState(false);

  React.useEffect(() => {
    const checkDOM = () => {
      if (document.readyState === 'complete') {
        setIsReady(true);
      } else {
        const timer = setTimeout(() => {
          setIsReady(true);
        }, 100);
        return () => clearTimeout(timer);
      }
    };

    checkDOM();
  }, []);

  if (!isReady) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        backgroundColor: '#f8f9fa'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '40px',
            height: '40px',
            border: '4px solid #f3f3f3',
            borderTop: '4px solid #007cba',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 1rem'
          }}></div>
          <p style={{ color: '#6c757d' }}>Loading...</p>
        </div>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return <>{children}</>;
};

// Safe Component Wrapper
const SafeComponent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ErrorBoundary>
      <DOMReadyCheck>
        {children}
      </DOMReadyCheck>
    </ErrorBoundary>
  );
};

function AppContent() {
  const navigateToHome = () => {
    try {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      window.location.href = '/';
    } catch (error) {
      console.error('Navigation error:', error);
      window.location.hash = '#/';
    }
  };

  return (
    <div className="app-container">
      <SafeComponent>
        <Navigation navigateToHome={navigateToHome} />
        <ScrollToTop />
      </SafeComponent>
      
      <SafeComponent>
        <Routes>
          <Route path="/" element={
            <SafeComponent>
              <HomePage navigateToHome={navigateToHome} />
            </SafeComponent>
          } />
          <Route path="/user-feedback" element={
            <SafeComponent>
              <UserFeedbackPage navigateToHome={navigateToHome} />
            </SafeComponent>
          } />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </SafeComponent>
    </div>
  );
}

function App() {
  React.useEffect(() => {
    try {
      const analytics = Analytics.getInstance();
      analytics.initAnalytics();
      
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
