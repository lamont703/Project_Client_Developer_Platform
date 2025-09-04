// Google Analytics Test Script for Browser Console
// Copy and paste this into your browser console to test analytics

console.log('🔍 Starting Google Analytics Test...');

// Test 1: Check if gtag is available
function testGtag() {
    console.log('📊 Test 1: Checking gtag availability...');
    if (typeof window.gtag === 'function') {
        console.log('✅ gtag function is available');
        return true;
    } else {
        console.log('❌ gtag function is not available');
        return false;
    }
}

// Test 2: Check if dataLayer exists
function testDataLayer() {
    console.log('📊 Test 2: Checking dataLayer...');
    if (Array.isArray(window.dataLayer)) {
        console.log('✅ dataLayer exists');
        console.log('📋 DataLayer length:', window.dataLayer.length);
        return true;
    } else {
        console.log('❌ dataLayer does not exist');
        return false;
    }
}

// Test 3: Check tracking ID configuration
function testTrackingID() {
    console.log('📊 Test 3: Checking tracking ID...');
    const hasConfig = window.dataLayer && window.dataLayer.some(item => 
        item[0] === 'config' && item[1] === 'G-BS2Y73PXX8'
    );
    if (hasConfig) {
        console.log('✅ Tracking ID G-BS2Y73PXX8 is configured');
        return true;
    } else {
        console.log('❌ Tracking ID G-BS2Y73PXX8 is not configured');
        return false;
    }
}

// Test 4: Send test event
function sendTestEvent() {
    console.log('📊 Test 4: Sending test event...');
    if (typeof window.gtag === 'function') {
        window.gtag('event', 'console_test_event', {
            event_category: 'test',
            event_label: 'console_test',
            value: 1,
            timestamp: Date.now()
        });
        console.log('✅ Test event sent');
        return true;
    } else {
        console.log('❌ Cannot send test event - gtag not available');
        return false;
    }
}

// Test 5: Check for ad blockers
function testAdBlocker() {
    console.log('📊 Test 5: Checking for ad blockers...');
    const testAd = document.createElement('div');
    testAd.innerHTML = '&nbsp;';
    testAd.className = 'adsbox';
    document.body.appendChild(testAd);
    const isAdBlockerActive = testAd.offsetHeight === 0;
    document.body.removeChild(testAd);
    
    if (isAdBlockerActive) {
        console.log('⚠️ Ad blocker detected - may block Google Analytics');
        return false;
    } else {
        console.log('✅ No ad blocker detected');
        return true;
    }
}

// Test 6: Check network requests
function testNetworkRequests() {
    console.log('📊 Test 6: Testing network requests...');
    
    // Override fetch to detect GA requests
    const originalFetch = window.fetch;
    let gaRequestDetected = false;
    
    window.fetch = function(...args) {
        const url = args[0];
        if (typeof url === 'string' && url.includes('google-analytics')) {
            gaRequestDetected = true;
            console.log('✅ Google Analytics network request detected:', url);
        }
        return originalFetch.apply(this, args);
    };
    
    // Send test event
    if (typeof window.gtag === 'function') {
        window.gtag('event', 'network_test', {
            event_category: 'test',
            event_label: 'network_test'
        });
    }
    
    // Check after delay
    setTimeout(() => {
        window.fetch = originalFetch;
        if (gaRequestDetected) {
            console.log('✅ Network requests are working');
        } else {
            console.log('❌ No Google Analytics network requests detected');
        }
    }, 1000);
}

// Run all tests
function runAllTests() {
    console.log('🚀 Running all Google Analytics tests...\n');
    
    const results = {
        gtag: testGtag(),
        dataLayer: testDataLayer(),
        trackingID: testTrackingID(),
        adBlocker: testAdBlocker(),
        testEvent: sendTestEvent()
    };
    
    // Test network requests
    testNetworkRequests();
    
    // Summary
    console.log('\n📊 Test Results Summary:');
    console.log('========================');
    Object.entries(results).forEach(([test, result]) => {
        const status = result ? '✅ PASS' : '❌ FAIL';
        console.log(`${test}: ${status}`);
    });
    
    const passedTests = Object.values(results).filter(Boolean).length;
    const totalTests = Object.keys(results).length;
    
    console.log(`\n🎯 Overall: ${passedTests}/${totalTests} tests passed`);
    
    if (passedTests === totalTests) {
        console.log('🎉 All tests passed! Google Analytics should be working correctly.');
    } else {
        console.log('⚠️ Some tests failed. Check the issues above.');
    }
    
    return results;
}

// Quick test function
function quickTest() {
    console.log('⚡ Quick Google Analytics Test');
    console.log('==============================');
    
    const gtagAvailable = typeof window.gtag === 'function';
    const dataLayerExists = Array.isArray(window.dataLayer);
    const hasTrackingID = window.dataLayer && window.dataLayer.some(item => 
        item[0] === 'config' && item[1] === 'G-BS2Y73PXX8'
    );
    
    console.log(`gtag available: ${gtagAvailable ? '✅' : '❌'}`);
    console.log(`dataLayer exists: ${dataLayerExists ? '✅' : '❌'}`);
    console.log(`tracking ID configured: ${hasTrackingID ? '✅' : '❌'}`);
    
    if (gtagAvailable && dataLayerExists && hasTrackingID) {
        console.log('🎉 Google Analytics appears to be working!');
        
        // Send a quick test event
        window.gtag('event', 'quick_test', {
            event_category: 'test',
            event_label: 'quick_test'
        });
        console.log('📤 Test event sent to Google Analytics');
    } else {
        console.log('❌ Google Analytics is not properly configured');
    }
}

// Export functions for easy access
window.analyticsTest = {
    testGtag,
    testDataLayer,
    testTrackingID,
    sendTestEvent,
    testAdBlocker,
    testNetworkRequests,
    runAllTests,
    quickTest
};

console.log('📋 Available test functions:');
console.log('- analyticsTest.quickTest() - Quick check');
console.log('- analyticsTest.runAllTests() - Full test suite');
console.log('- analyticsTest.sendTestEvent() - Send test event');

// Auto-run quick test
console.log('\n🔍 Auto-running quick test...');
quickTest(); 