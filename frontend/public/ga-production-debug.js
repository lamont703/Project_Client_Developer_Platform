// Google Analytics Production Debug Script
// Add this to the browser console in production to test GA functionality

(function() {
    console.log('🔍 Google Analytics Production Debug Script');
    console.log('==========================================');
    
    // Check if gtag is available
    function checkGtag() {
        console.log('1. Checking gtag availability...');
        if (typeof window.gtag === 'function') {
            console.log('✅ gtag function is available');
            return true;
        } else {
            console.log('❌ gtag function is NOT available');
            return false;
        }
    }
    
    // Check if dataLayer is available
    function checkDataLayer() {
        console.log('2. Checking dataLayer availability...');
        if (Array.isArray(window.dataLayer)) {
            console.log('✅ dataLayer is available');
            console.log(`📊 DataLayer length: ${window.dataLayer.length}`);
            console.log(`📊 DataLayer content:`, window.dataLayer);
            return true;
        } else {
            console.log('❌ dataLayer is NOT available');
            return false;
        }
    }
    
    // Test sending an event via gtag
    function testGtagEvent() {
        console.log('3. Testing gtag event...');
        if (typeof window.gtag === 'function') {
            try {
                window.gtag('event', 'debug_test_event', {
                    event_category: 'debug',
                    event_label: 'production_test',
                    value: 1,
                    timestamp: new Date().toISOString()
                });
                console.log('✅ Test event sent via gtag');
                return true;
            } catch (error) {
                console.error('❌ Error sending gtag event:', error);
                return false;
            }
        } else {
            console.log('❌ Cannot test gtag event - function not available');
            return false;
        }
    }
    
    // Test sending an event via dataLayer
    function testDataLayerEvent() {
        console.log('4. Testing dataLayer event...');
        if (window.dataLayer) {
            try {
                window.dataLayer.push({
                    event: 'debug_test_event',
                    event_category: 'debug',
                    event_label: 'production_test',
                    value: 1,
                    timestamp: new Date().toISOString()
                });
                console.log('✅ Test event sent via dataLayer');
                return true;
            } catch (error) {
                console.error('❌ Error sending dataLayer event:', error);
                return false;
            }
        } else {
            console.log('❌ Cannot test dataLayer event - not available');
            return false;
        }
    }
    
    // Test ProtoHub analytics service
    function testProtoHubAnalytics() {
        console.log('5. Testing ProtoHub Analytics Service...');
        
        // Check if Analytics class is available
        if (typeof window !== 'undefined' && window.Analytics) {
            console.log('✅ Analytics class is available');
            try {
                const analytics = window.Analytics.getInstance();
                analytics.trackEvent('debug_test', {
                    event_category: 'debug',
                    event_label: 'production_test',
                    timestamp: new Date().toISOString()
                });
                console.log('✅ ProtoHub analytics event sent');
                return true;
            } catch (error) {
                console.error('❌ Error with ProtoHub analytics:', error);
                return false;
            }
        } else {
            console.log('❌ Analytics class not available');
            return false;
        }
    }
    
    // Run all tests
    function runAllTests() {
        console.log('🚀 Starting Google Analytics Production Tests...');
        console.log('Environment:', window.location.hostname);
        console.log('URL:', window.location.href);
        console.log('Timestamp:', new Date().toISOString());
        console.log('');
        
        const results = {
            gtag: checkGtag(),
            dataLayer: checkDataLayer(),
            gtagEvent: testGtagEvent(),
            dataLayerEvent: testDataLayerEvent(),
            protoHubAnalytics: testProtoHubAnalytics()
        };
        
        console.log('');
        console.log('📊 Test Results Summary:');
        console.log('========================');
        console.log(`gtag available: ${results.gtag ? '✅' : '❌'}`);
        console.log(`dataLayer available: ${results.dataLayer ? '✅' : '❌'}`);
        console.log(`gtag event test: ${results.gtagEvent ? '✅' : '❌'}`);
        console.log(`dataLayer event test: ${results.dataLayerEvent ? '✅' : '❌'}`);
        console.log(`ProtoHub analytics test: ${results.protoHubAnalytics ? '✅' : '❌'}`);
        
        const successCount = Object.values(results).filter(Boolean).length;
        const totalTests = Object.keys(results).length;
        
        console.log('');
        console.log(`Overall: ${successCount}/${totalTests} tests passed`);
        
        if (successCount === totalTests) {
            console.log('🎉 All tests passed! Google Analytics should be working.');
        } else {
            console.log('⚠️ Some tests failed. Check the issues above.');
        }
        
        return results;
    }
    
    // Make functions available globally for manual testing
    window.GADebug = {
        checkGtag,
        checkDataLayer,
        testGtagEvent,
        testDataLayerEvent,
        testProtoHubAnalytics,
        runAllTests
    };
    
    // Auto-run tests after a short delay
    setTimeout(runAllTests, 1000);
    
    console.log('🔧 Debug functions available as window.GADebug');
    console.log('💡 Run window.GADebug.runAllTests() to test again');
})(); 