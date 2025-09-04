// Google Analytics Test Script
// Run this in your browser console to test Google Analytics

console.log('🔍 Google Analytics Test Script');

// Test 1: Check if gtag is loaded
function testGtag() {
    console.log('🧪 Test 1: Checking gtag availability...');
    
    if (typeof window.gtag === 'function') {
        console.log('✅ gtag function is available');
        return true;
    } else {
        console.log('❌ gtag function is not available');
        return false;
    }
}

// Test 2: Check dataLayer
function testDataLayer() {
    console.log('🧪 Test 2: Checking dataLayer...');
    
    if (Array.isArray(window.dataLayer)) {
        console.log('✅ dataLayer is available');
        console.log('📊 DataLayer length:', window.dataLayer.length);
        console.log('📊 DataLayer content:', window.dataLayer);
        return true;
    } else {
        console.log('❌ dataLayer is not available');
        return false;
    }
}

// Test 3: Check tracking ID configuration
function testTrackingId() {
    console.log('🧪 Test 3: Checking tracking ID configuration...');
    
    if (window.dataLayer) {
        const hasConfig = window.dataLayer.some(item => 
            item[0] === 'config' && item[1] === 'G-BS2Y73PXX8'
        );
        
        if (hasConfig) {
            console.log('✅ Tracking ID G-BS2Y73PXX8 is configured');
            return true;
        } else {
            console.log('❌ Tracking ID G-BS2Y73PXX8 is not configured');
            return false;
        }
    } else {
        console.log('❌ Cannot check tracking ID - dataLayer not available');
        return false;
    }
}

// Test 4: Send test event
function sendTestEvent() {
    console.log('🧪 Test 4: Sending test event...');
    
    if (typeof window.gtag === 'function') {
        try {
            window.gtag('event', 'console_test_event', {
                event_category: 'test',
                event_label: 'console_test',
                value: 1,
                timestamp: new Date().toISOString()
            });
            console.log('✅ Test event sent successfully');
            return true;
        } catch (error) {
            console.log('❌ Error sending test event:', error);
            return false;
        }
    } else {
        console.log('❌ Cannot send test event - gtag not available');
        return false;
    }
}

// Test 5: Check network requests
function checkNetworkRequests() {
    console.log('🧪 Test 5: Checking for Google Analytics network requests...');
    
    // Check if we can detect GA requests in the last 10 seconds
    const now = Date.now();
    const gaRequests = performance.getEntriesByType('resource').filter(entry => {
        return entry.name.includes('google-analytics') || 
               entry.name.includes('googletagmanager') ||
               entry.name.includes('analytics.google.com');
    });
    
    if (gaRequests.length > 0) {
        console.log('✅ Found Google Analytics network requests:', gaRequests);
        return true;
    } else {
        console.log('⚠️ No Google Analytics network requests detected');
        return false;
    }
}

// Run all tests
function runAllTests() {
    console.log('🚀 Running all Google Analytics tests...');
    
    const results = {
        gtag: testGtag(),
        dataLayer: testDataLayer(),
        trackingId: testTrackingId(),
        testEvent: sendTestEvent(),
        network: checkNetworkRequests()
    };
    
    console.log('📊 Test Results:', results);
    
    const passedTests = Object.values(results).filter(Boolean).length;
    const totalTests = Object.keys(results).length;
    
    console.log(`🎯 ${passedTests}/${totalTests} tests passed`);
    
    if (passedTests === totalTests) {
        console.log('🎉 All tests passed! Google Analytics should be working correctly.');
    } else {
        console.log('⚠️ Some tests failed. Check the issues above.');
    }
    
    return results;
}

// Make functions available globally
window.GATest = {
    testGtag,
    testDataLayer,
    testTrackingId,
    sendTestEvent,
    checkNetworkRequests,
    runAllTests
};

console.log('📝 Test functions available as window.GATest');
console.log('💡 Run window.GATest.runAllTests() to test everything'); 