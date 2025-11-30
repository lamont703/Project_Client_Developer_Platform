import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Suppress known third-party library console errors
const originalConsoleError = console.error;
const originalConsoleWarn = console.warn;

// Filter out known GoHighLevel chat widget errors
console.error = (...args: any[]) => {
  const fullMessage = args.join(' ');
  
  // Suppress GoHighLevel chat widget configuration errors
  if (
    fullMessage.includes('Missing required parameters for chat widget config') ||
    (fullMessage.includes('locationId') && fullMessage.includes('widgetId') && fullMessage.includes('none'))
  ) {
    // Silently ignore - this is expected when widget isn't configured on all pages
    return;
  }
  
  // Suppress 404 errors from GoHighLevel brand API (expected when domain isn't configured)
  if (
    fullMessage.includes('services.leadconnectorhq.com/membership/brand') ||
    (fullMessage.includes('404') && fullMessage.includes('leadconnectorhq.com'))
  ) {
    // Silently ignore - this is expected when domain isn't configured in GHL
    return;
  }
  
  // Call original console.error for all other errors
  originalConsoleError.apply(console, args);
};

// Filter out known deprecation warnings
console.warn = (...args: any[]) => {
  const warningMessage = args.join(' ');
  
  // Suppress Capacitor FCM deprecation warning
  if (
    warningMessage.includes('Capacitor WebPlugin') &&
    warningMessage.includes('FCM') &&
    warningMessage.includes('deprecated')
  ) {
    // Silently ignore - this is a known deprecation warning from a third-party library
    return;
  }
  
  // Call original console.warn for all other warnings
  originalConsoleWarn.apply(console, args);
};

// Add global error handler for uncaught errors
window.addEventListener('error', (event) => {
  const errorMessage = event.message || '';
  const errorSource = event.filename || '';
  
  // Suppress errors from GoHighLevel chat widget
  if (
    errorSource.includes('leadconnectorhq.com') ||
    errorSource.includes('loader.js') ||
    errorMessage.includes('chat widget') ||
    errorMessage.includes('locationId') ||
    errorMessage.includes('widgetId')
  ) {
    event.preventDefault(); // Prevent error from showing in console
    return;
  }
  
  // Log other errors normally
  originalConsoleError('Global error:', event.error);
});

// Add handler for unhandled promise rejections
window.addEventListener('unhandledrejection', (event) => {
  const rejectionReason = event.reason?.message || String(event.reason || '');
  
  // Suppress promise rejections from GoHighLevel API calls
  if (
    rejectionReason.includes('leadconnectorhq.com') ||
    rejectionReason.includes('membership/brand') ||
    rejectionReason.includes('404')
  ) {
    event.preventDefault(); // Prevent error from showing in console
    return;
  }
  
  // Log other rejections normally
  originalConsoleError('Unhandled promise rejection:', event.reason);
});

const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error('Root element not found');
  throw new Error('Root element not found');
}

const root = ReactDOM.createRoot(rootElement);

root.render(<App />);
