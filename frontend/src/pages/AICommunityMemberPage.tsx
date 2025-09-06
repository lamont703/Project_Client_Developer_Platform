import React, { useState } from 'react';
import { API_CONFIG } from '../utils/apiConfig';
import '../styles/AICommunityMemberPage.css';

interface AICommunityMemberPageProps {
  navigateToHome?: () => void;
}

interface TestResult {
  success: boolean;
  data?: any;
  error?: string;
  timestamp: string;
}

const AICommunityMemberPage: React.FC<AICommunityMemberPageProps> = ({ navigateToHome }) => {
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const addTestResult = (result: TestResult) => {
    setTestResults(prev => [result, ...prev.slice(0, 9)]); // Keep last 10 results
  };

  const makeApiRequest = async (endpoint: string, method: string = 'GET', body?: any) => {
    setIsLoading(true);
    const startTime = Date.now();
    
    try {
      const url = API_CONFIG.getUrl(endpoint);
      const options: RequestInit = {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_CONFIG.SUPABASE_ANON_KEY}`,
          'apikey': API_CONFIG.SUPABASE_ANON_KEY,
        },
      };

      if (body && method !== 'GET') {
        options.body = JSON.stringify(body);
      }

      const response = await fetch(url, options);
      const data = await response.json();
      const duration = Date.now() - startTime;

      addTestResult({
        success: response.ok,
        data: {
          ...data,
          status: response.status,
          duration: `${duration}ms`
        },
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      addTestResult({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      });
    } finally {
      setIsLoading(false);
    }
  };

  const testEndpoints = {
    // AI Community Member specific endpoints (from sequence diagram)
    getAIStats: () => makeApiRequest('/ai-community-member/stats', 'GET'),
    getAIPersonas: () => makeApiRequest('/ai-community-member/personas', 'GET'),
    getTrendingTopics: () => makeApiRequest('/ai-community-member/trending-topics', 'GET'),
    generateAIResponse: () => makeApiRequest('/ai-community-member/generate-response', 'POST', {
      questionId: '550e8400-e29b-41d4-a716-446655440001', // Valid UUID format
      context: 'test-context'
    }),
    generateProactiveEngagement: () => makeApiRequest('/ai-community-member/proactive-engagement', 'POST'),
    startAIMonitoring: () => makeApiRequest('/ai-community-member/monitor', 'POST'),
    
    // Monitoring endpoints
    forceEngagement: () => makeApiRequest('/monitoring/force-engagement', 'POST'),
    forceAnalysis: () => makeApiRequest('/monitoring/force-analysis', 'POST'),
    getMonitoringStats: () => makeApiRequest('/monitoring/stats', 'GET'),
    getHistory: () => makeApiRequest('/monitoring/history', 'GET'),
    startMonitoring: () => makeApiRequest('/monitoring/start', 'POST'),
    stopMonitoring: () => makeApiRequest('/monitoring/stop', 'POST'),
    updateConfig: () => makeApiRequest('/monitoring/config', 'PUT', {
      proactiveEngagementInterval: 15,
      maxEngagementsPerHour: 3
    }),
    
    // Questions endpoints
    getQuestions: () => makeApiRequest('/questions', 'GET'),
    createQuestion: () => makeApiRequest('/questions', 'POST', {
      title: 'Test Question - AI Community Member Control Center',
      content: 'This is a test question created by the AI Community Member Control Center testing interface.',
      tags: ['test', 'ai-community', 'monitoring', 'control-center']
    }),
    getQuestionsAIPersonas: () => makeApiRequest('/questions/ai-personas', 'GET'),
    generateQuestionsEngagement: () => makeApiRequest('/questions/ai-engagement', 'POST', {
      questionId: 'test-question-id',
      persona: 'proto-bot-alex'
    }),
    
    // Prototypes endpoints
    getPrototypes: () => makeApiRequest('/prototypes', 'GET'),
    createPrototype: () => makeApiRequest('/prototypes', 'POST', {
      title: 'Test Prototype - AI Community Member',
      description: 'This is a test prototype created by the AI Community Member Control Center.',
      category: 'test',
      tags: ['test', 'ai-community', 'prototype']
    }),
    
    // Users endpoints
    getUsers: () => makeApiRequest('/users', 'GET'),
    getCurrentUser: () => makeApiRequest('/users/me', 'GET'),
    
    // Analytics endpoints
    getAnalyticsSummary: () => makeApiRequest('/analytics/summary', 'GET'),
    getAnalyticsEvents: () => makeApiRequest('/analytics/events', 'GET'),
    getUserAnalytics: () => makeApiRequest('/analytics/user/test-user-id', 'GET'),
    getPopularContent: () => makeApiRequest('/analytics/popular', 'GET'),
    
    // Debug endpoints
    debugEnv: () => makeApiRequest('/debug/env', 'GET'),
    debugDatabase: () => makeApiRequest('/debug/database', 'GET'),
    debugGHLStatus: () => makeApiRequest('/debug/ghl-status', 'GET'),
    debugTrendingTopics: () => makeApiRequest('/debug/trending-topics', 'GET'),
    debugAIStats: () => makeApiRequest('/debug/ai-community-member/stats', 'GET'),
    
    // Reports endpoints
    getReports: () => makeApiRequest('/reports', 'GET'),
    getPendingReports: () => makeApiRequest('/reports/pending', 'GET'),
    
    // Health check
    healthCheck: () => makeApiRequest('/health', 'GET'),
  };

  return (
    <div className="ai-community-member-page">
      <div className="page-header">
        <h1>🤖 AI Community Member Control Center</h1>
        <p>Test and monitor the AI Community Member Control Center endpoints</p>
        {navigateToHome && (
          <button onClick={navigateToHome} className="back-button">
            ← Back to Home
          </button>
        )}
      </div>

      {/* Documentation Section */}
      <div className="documentation-section">
        <h2>📚 How It Works</h2>
        <div className="doc-grid">
          <div className="doc-card">
            <h3>🎯 Purpose</h3>
            <p>The AI Community Member system automatically engages with the Proto Hub community by:</p>
            <ul>
              <li>Answering unanswered questions from community members</li>
              <li>Creating proactive discussions about trending topics</li>
              <li>Providing helpful insights and guidance</li>
              <li>Maintaining an active, supportive community environment</li>
            </ul>
          </div>
          
          <div className="doc-card">
            <h3>🔄 Integration with Proto Hub</h3>
            <p>The AI Community Member seamlessly integrates with Proto Hub:</p>
            <ul>
              <li><strong>Questions System:</strong> Monitors and answers questions in real-time</li>
              <li><strong>Community Engagement:</strong> Creates discussions and shares insights</li>
              <li><strong>Persona System:</strong> Uses different AI personas (Alex, Maya, Jordan, Sam)</li>
              <li><strong>Analytics:</strong> Tracks engagement metrics and community health</li>
            </ul>
          </div>
          
          <div className="doc-card">
            <h3>🤖 AI Personas</h3>
            <p>Four distinct AI personas engage with the community:</p>
            <ul>
              <li><strong>Alex:</strong> General prototyping and community engagement</li>
              <li><strong>Maya:</strong> Design-focused discussions and UI/UX guidance</li>
              <li><strong>Jordan:</strong> Technical development and coding support</li>
              <li><strong>Sam:</strong> Product validation and research insights</li>
            </ul>
          </div>
          
          <div className="doc-card">
            <h3>⚡ Monitoring Service</h3>
            <p>The monitoring service runs automatically to:</p>
            <ul>
              <li>Scan for unanswered questions every 30 minutes</li>
              <li>Analyze community trends and topics</li>
              <li>Generate proactive engagement opportunities</li>
              <li>Maintain engagement limits (max 5 per hour)</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="testing-section">
        <h2>🧪 Endpoint Testing</h2>
        <p className="testing-description">
          Use the buttons below to test different AI Community Member Control Center endpoints. 
          Each test will show the response data and execution time.
        </p>
        
        <div className="endpoint-groups">
          {/* AI Community Member Endpoints */}
          <div className="endpoint-group">
            <h3>🤖 AI Community Member</h3>
            <div className="endpoint-buttons">
              <button 
                onClick={testEndpoints.getAIStats}
                disabled={isLoading}
                className="test-button primary"
              >
                📊 Get AI Stats
              </button>
              <button 
                onClick={testEndpoints.getAIPersonas}
                disabled={isLoading}
                className="test-button"
              >
                👥 Get AI Personas
              </button>
              <button 
                onClick={testEndpoints.getTrendingTopics}
                disabled={isLoading}
                className="test-button"
              >
                📈 Get Trending Topics
              </button>
              <button 
                onClick={testEndpoints.generateAIResponse}
                disabled={isLoading}
                className="test-button"
              >
                💬 Generate AI Response
              </button>
              <button 
                onClick={testEndpoints.generateProactiveEngagement}
                disabled={isLoading}
                className="test-button"
              >
                🚀 Generate Proactive Engagement
              </button>
              <button 
                onClick={testEndpoints.startAIMonitoring}
                disabled={isLoading}
                className="test-button success"
              >
                ▶️ Start AI Monitoring
              </button>
            </div>
          </div>

          {/* Monitoring Endpoints */}
          <div className="endpoint-group">
            <h3>📊 Monitoring Service</h3>
            <div className="endpoint-buttons">
              <button 
                onClick={testEndpoints.forceEngagement}
                disabled={isLoading}
                className="test-button primary"
              >
                🚀 Force Engagement
              </button>
              <button 
                onClick={testEndpoints.forceAnalysis}
                disabled={isLoading}
                className="test-button"
              >
                📈 Force Analysis
              </button>
              <button 
                onClick={testEndpoints.getMonitoringStats}
                disabled={isLoading}
                className="test-button"
              >
                📊 Get Monitoring Stats
              </button>
              <button 
                onClick={testEndpoints.getHistory}
                disabled={isLoading}
                className="test-button"
              >
                📝 Get History
              </button>
              <button 
                onClick={testEndpoints.startMonitoring}
                disabled={isLoading}
                className="test-button success"
              >
                ▶️ Start Monitoring
              </button>
              <button 
                onClick={testEndpoints.stopMonitoring}
                disabled={isLoading}
                className="test-button danger"
              >
                ⏹️ Stop Monitoring
              </button>
              <button 
                onClick={testEndpoints.updateConfig}
                disabled={isLoading}
                className="test-button"
              >
                ⚙️ Update Config
              </button>
            </div>
          </div>

          {/* Questions Endpoints */}
          <div className="endpoint-group">
            <h3>❓ Questions Management</h3>
            <div className="endpoint-buttons">
              <button 
                onClick={testEndpoints.getQuestions}
                disabled={isLoading}
                className="test-button"
              >
                📋 Get Questions
              </button>
              <button 
                onClick={testEndpoints.createQuestion}
                disabled={isLoading}
                className="test-button"
              >
                ➕ Create Question
              </button>
              <button 
                onClick={testEndpoints.getQuestionsAIPersonas}
                disabled={isLoading}
                className="test-button"
              >
                🤖 Get Questions AI Personas
              </button>
              <button 
                onClick={testEndpoints.generateQuestionsEngagement}
                disabled={isLoading}
                className="test-button"
              >
                💬 Generate Questions Engagement
              </button>
            </div>
          </div>

          {/* Analytics Endpoints */}
          <div className="endpoint-group">
            <h3>📊 Analytics</h3>
            <div className="endpoint-buttons">
              <button 
                onClick={testEndpoints.getAnalyticsSummary}
                disabled={isLoading}
                className="test-button"
              >
                📊 Get Analytics Summary
              </button>
              <button 
                onClick={testEndpoints.getAnalyticsEvents}
                disabled={isLoading}
                className="test-button"
              >
                📈 Get Analytics Events
              </button>
              <button 
                onClick={testEndpoints.getUserAnalytics}
                disabled={isLoading}
                className="test-button"
              >
                👤 Get User Analytics
              </button>
              <button 
                onClick={testEndpoints.getPopularContent}
                disabled={isLoading}
                className="test-button"
              >
                🔥 Get Popular Content
              </button>
            </div>
          </div>

          {/* Debug Endpoints */}
          <div className="endpoint-group">
            <h3>🔧 Debug & System</h3>
            <div className="endpoint-buttons">
              <button 
                onClick={testEndpoints.debugEnv}
                disabled={isLoading}
                className="test-button"
              >
                🌍 Debug Environment
              </button>
              <button 
                onClick={testEndpoints.debugDatabase}
                disabled={isLoading}
                className="test-button"
              >
                🗄️ Debug Database
              </button>
              <button 
                onClick={testEndpoints.debugGHLStatus}
                disabled={isLoading}
                className="test-button"
              >
                🔗 Debug GHL Status
              </button>
              <button 
                onClick={testEndpoints.debugTrendingTopics}
                disabled={isLoading}
                className="test-button"
              >
                📈 Debug Trending Topics
              </button>
              <button 
                onClick={testEndpoints.debugAIStats}
                disabled={isLoading}
                className="test-button"
              >
                🤖 Debug AI Stats
              </button>
              <button 
                onClick={testEndpoints.healthCheck}
                disabled={isLoading}
                className="test-button"
              >
                ❤️ Health Check
              </button>
            </div>
          </div>

          {/* Prototypes Endpoints */}
          <div className="endpoint-group">
            <h3>🚀 Prototypes Management</h3>
            <div className="endpoint-buttons">
              <button 
                onClick={testEndpoints.getPrototypes}
                disabled={isLoading}
                className="test-button"
              >
                📋 Get Prototypes
              </button>
              <button 
                onClick={testEndpoints.createPrototype}
                disabled={isLoading}
                className="test-button"
              >
                ➕ Create Prototype
              </button>
            </div>
          </div>

          {/* Users & Reports */}
          <div className="endpoint-group">
            <h3>👥 Users & Reports</h3>
            <div className="endpoint-buttons">
              <button 
                onClick={testEndpoints.getUsers}
                disabled={isLoading}
                className="test-button"
              >
                👥 Get Users
              </button>
              <button 
                onClick={testEndpoints.getCurrentUser}
                disabled={isLoading}
                className="test-button"
              >
                👤 Get Current User
              </button>
              <button 
                onClick={testEndpoints.getReports}
                disabled={isLoading}
                className="test-button"
              >
                📋 Get Reports
              </button>
              <button 
                onClick={testEndpoints.getPendingReports}
                disabled={isLoading}
                className="test-button"
              >
                ⏳ Pending Reports
              </button>
            </div>
          </div>
        </div>

        {isLoading && (
          <div className="loading-indicator">
            <div className="spinner"></div>
            <span>Testing endpoint...</span>
          </div>
        )}
      </div>

      {/* Test Results */}
      <div className="results-section">
        <h2>📋 Test Results</h2>
        {testResults.length === 0 ? (
          <div className="no-results">
            <p>No tests run yet. Click a button above to test an endpoint.</p>
          </div>
        ) : (
          <div className="results-list">
            {testResults.map((result, index) => (
              <div key={index} className={`result-item ${result.success ? 'success' : 'error'}`}>
                <div className="result-header">
                  <span className="result-status">
                    {result.success ? '✅' : '❌'}
                  </span>
                  <span className="result-timestamp">
                    {new Date(result.timestamp).toLocaleTimeString()}
                  </span>
                </div>
                <div className="result-content">
                  {result.data ? (
                    <pre className="result-data">
                      {JSON.stringify(result.data, null, 2)}
                    </pre>
                  ) : (
                    <div className="result-error">
                      Error: {result.error}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Secure API Configuration Info */}
      <div className="config-section">
        <h2>⚙️ System Status</h2>
        <div className="config-info">
          <div className="config-item">
            <strong>Environment:</strong> {API_CONFIG.ENVIRONMENT}
          </div>
          <div className="config-item">
            <strong>API Status:</strong> {API_CONFIG.SUPABASE_ANON_KEY ? '✅ Connected' : '❌ Disconnected'}
          </div>
          <div className="config-item">
            <strong>Monitoring:</strong> Active
          </div>
          <div className="config-item">
            <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
          </div>
        </div>
        <div className="security-note">
          <p>🔒 <strong>Security Note:</strong> Sensitive configuration details are not displayed for security reasons. 
          Only essential status information is shown.</p>
        </div>
      </div>
    </div>
  );
};

export default AICommunityMemberPage;
