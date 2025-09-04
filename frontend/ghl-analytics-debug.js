// GHL Analytics Debug Script
// Run this in the browser console on the GHL bundle page

console.log('🔍 GHL Analytics Debug');

// Check if gtag is loaded
const gtagAvailable = typeof window.gtag !== 'undefined';
console.log('gtag available:', gtagAvailable);

// Check dataLayer
const dataLayerAvailable = typeof window.dataLayer !== 'undefined';
console.log('dataLayer available:', dataLayerAvailable);

if (dataLayerAvailable) {
    console.log('dataLayer content:', window.dataLayer);
    console.log('dataLayer length:', window.dataLayer.length);
}

// Check if gtag function works
if (gtagAvailable) {
    console.log('Testing gtag function...');
    
    // Send a test event
    window.gtag('event', 'ghl_debug_test', {
        event_category: 'debug',
        event_label: 'ghl_bundle_test',
        value: 1,
        timestamp: new Date().toISOString()
    });
    
    console.log('✅ Test event sent via gtag');
} else {
    console.log('❌ gtag function not available');
}

// Check for analytics utilities
const analyticsAvailable = typeof window.Analytics !== 'undefined';
console.log('Analytics utility available:', analyticsAvailable);

// Check for developer tracker
const developerTrackerAvailable = typeof window.DeveloperTracker !== 'undefined';
console.log('DeveloperTracker available:', developerTrackerAvailable);

// Test manual event sending
if (window.gtag) {
    console.log('Sending manual test events...');
    
    // Test page view
    window.gtag('config', 'G-BS2Y73PXX8', {
        page_title: 'GHL Bundle Test',
        page_location: window.location.href
    });
    
    // Test custom event
    window.gtag('event', 'manual_test', {
        event_category: 'manual_test',
        event_label: 'console_test',
        value: 1
    });
    
    console.log('✅ Manual events sent');
}

// Check for any console errors
console.log('Check the Network tab for requests to googletagmanager.com');
console.log('Check Google Analytics Real-Time reports for events'); 