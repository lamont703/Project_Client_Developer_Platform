// Google Analytics Test Script
// This script tests if Google Analytics is working properly in both localhost and production

class GoogleAnalyticsTester {
    private analytics: any;
    private testResults: any[] = [];

    constructor() {
        // Get the analytics instance
        this.analytics = (window as any).gtag;
    }

    // Test 1: Check if gtag is loaded
    testGtagLoaded(): boolean {
        console.log('🧪 Test 1: Checking if gtag is loaded...');
        
        const isLoaded = typeof (window as any).gtag === 'function';
        
        if (isLoaded) {
            console.log('✅ gtag function is available');
            this.testResults.push({ test: 'gtag_loaded', status: 'PASS', message: 'gtag function is available' });
        } else {
            console.log('❌ gtag function is not available');
            this.testResults.push({ test: 'gtag_loaded', status: 'FAIL', message: 'gtag function is not available' });
        }
        
        return isLoaded;
    }

    // Test 2: Check if dataLayer exists
    testDataLayerExists(): boolean {
        console.log('🧪 Test 2: Checking if dataLayer exists...');
        
        const dataLayerExists = Array.isArray((window as any).dataLayer);
        
        if (dataLayerExists) {
            console.log('✅ dataLayer array exists');
            this.testResults.push({ test: 'dataLayer_exists', status: 'PASS', message: 'dataLayer array exists' });
        } else {
            console.log('❌ dataLayer array does not exist');
            this.testResults.push({ test: 'dataLayer_exists', status: 'FAIL', message: 'dataLayer array does not exist' });
        }
        
        return dataLayerExists;
    }

    // Test 3: Check if Google Analytics script is loaded
    testGAScriptLoaded(): boolean {
        console.log('🧪 Test 3: Checking if Google Analytics script is loaded...');
        
        const scripts = document.querySelectorAll('script[src*="googletagmanager"]');
        const isLoaded = scripts.length > 0;
        
        if (isLoaded) {
            console.log('✅ Google Analytics script is loaded');
            this.testResults.push({ test: 'ga_script_loaded', status: 'PASS', message: 'Google Analytics script is loaded' });
        } else {
            console.log('❌ Google Analytics script is not loaded');
            this.testResults.push({ test: 'ga_script_loaded', status: 'FAIL', message: 'Google Analytics script is not loaded' });
        }
        
        return isLoaded;
    }

    // Test 4: Check tracking ID configuration
    testTrackingID(): boolean {
        console.log('🧪 Test 4: Checking tracking ID configuration...');
        
        const dataLayer = (window as any).dataLayer;
        const hasConfig = dataLayer && dataLayer.some((item: any) => 
            item[0] === 'config' && item[1] === 'G-BS2Y73PXX8'
        );
        
        if (hasConfig) {
            console.log('✅ Tracking ID G-BS2Y73PXX8 is configured');
            this.testResults.push({ test: 'tracking_id', status: 'PASS', message: 'Tracking ID G-BS2Y73PXX8 is configured' });
        } else {
            console.log('❌ Tracking ID G-BS2Y73PXX8 is not configured');
            this.testResults.push({ test: 'tracking_id', status: 'FAIL', message: 'Tracking ID G-BS2Y73PXX8 is not configured' });
        }
        
        return hasConfig;
    }

    // Test 5: Send test event
    async testEventSending(): Promise<boolean> {
        console.log('🧪 Test 5: Testing event sending...');
        
        return new Promise((resolve) => {
            const testEventName = 'test_analytics_event';
            const testData = {
                event_category: 'test',
                event_label: 'analytics_test',
                value: 1,
                timestamp: Date.now()
            };
            
            // Store original dataLayer length
            const originalLength = (window as any).dataLayer.length;
            
            // Send test event
            if (this.analytics) {
                this.analytics('event', testEventName, testData);
                
                // Check if event was added to dataLayer
                setTimeout(() => {
                    const newLength = (window as any).dataLayer.length;
                    const eventAdded = newLength > originalLength;
                    
                    if (eventAdded) {
                        console.log('✅ Test event was sent successfully');
                        this.testResults.push({ test: 'event_sending', status: 'PASS', message: 'Test event was sent successfully' });
                    } else {
                        console.log('❌ Test event was not sent');
                        this.testResults.push({ test: 'event_sending', status: 'FAIL', message: 'Test event was not sent' });
                    }
                    
                    resolve(eventAdded);
                }, 100);
            } else {
                console.log('❌ Cannot send test event - gtag not available');
                this.testResults.push({ test: 'event_sending', status: 'FAIL', message: 'Cannot send test event - gtag not available' });
                resolve(false);
            }
        });
    }

    // Test 6: Test analytics utility class
    testAnalyticsUtility(): boolean {
        console.log('🧪 Test 6: Testing analytics utility class...');
        
        try {
            // Import and test the analytics utility
            const { Analytics } = require('../src/utils/analytics');
            const analyticsInstance = Analytics.getInstance();
            
            // Test if the instance exists
            const instanceExists = analyticsInstance !== null;
            
            if (instanceExists) {
                console.log('✅ Analytics utility class is working');
                this.testResults.push({ test: 'analytics_utility', status: 'PASS', message: 'Analytics utility class is working' });
                
                // Test a specific method
                analyticsInstance.trackEvent('test_utility_event', {
                    event_category: 'test',
                    event_label: 'utility_test'
                });
                
                console.log('✅ Analytics utility tracking method is working');
                this.testResults.push({ test: 'analytics_utility_method', status: 'PASS', message: 'Analytics utility tracking method is working' });
            } else {
                console.log('❌ Analytics utility class is not working');
                this.testResults.push({ test: 'analytics_utility', status: 'FAIL', message: 'Analytics utility class is not working' });
            }
            
            return instanceExists;
        } catch (error) {
            console.log('❌ Error testing analytics utility:', error);
            this.testResults.push({ test: 'analytics_utility', status: 'FAIL', message: `Error: ${error instanceof Error ? error.message : String(error)}` });
            return false;
        }
    }

    // Test 7: Check for ad blockers
    testAdBlocker(): boolean {
        console.log('🧪 Test 7: Checking for ad blockers...');
        
        // Simple ad blocker detection
        const testAd = document.createElement('div');
        testAd.innerHTML = '&nbsp;';
        testAd.className = 'adsbox';
        document.body.appendChild(testAd);
        
        const isAdBlockerActive = testAd.offsetHeight === 0;
        document.body.removeChild(testAd);
        
        if (isAdBlockerActive) {
            console.log('⚠️ Ad blocker detected - this may block Google Analytics');
            this.testResults.push({ test: 'ad_blocker', status: 'WARNING', message: 'Ad blocker detected - this may block Google Analytics' });
        } else {
            console.log('✅ No ad blocker detected');
            this.testResults.push({ test: 'ad_blocker', status: 'PASS', message: 'No ad blocker detected' });
        }
        
        return !isAdBlockerActive;
    }

    // Test 8: Check network requests
    async testNetworkRequests(): Promise<boolean> {
        console.log('🧪 Test 8: Testing network requests...');
        
        return new Promise((resolve) => {
            // Listen for network requests to Google Analytics
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
            
            // Send a test event
            if (this.analytics) {
                this.analytics('event', 'network_test', {
                    event_category: 'test',
                    event_label: 'network_test'
                });
            }
            
            // Check after a short delay
            setTimeout(() => {
                window.fetch = originalFetch;
                
                if (gaRequestDetected) {
                    this.testResults.push({ test: 'network_requests', status: 'PASS', message: 'Google Analytics network requests are working' });
                } else {
                    this.testResults.push({ test: 'network_requests', status: 'FAIL', message: 'No Google Analytics network requests detected' });
                }
                
                resolve(gaRequestDetected);
            }, 1000);
        });
    }

    // Run all tests
    async runAllTests(): Promise<void> {
        console.log('🚀 Starting Google Analytics Tests...\n');
        
        // Run synchronous tests
        this.testGtagLoaded();
        this.testDataLayerExists();
        this.testGAScriptLoaded();
        this.testTrackingID();
        this.testAnalyticsUtility();
        this.testAdBlocker();
        
        // Run asynchronous tests
        await this.testEventSending();
        await this.testNetworkRequests();
        
        // Generate report
        this.generateReport();
    }

    // Generate test report
    generateReport(): void {
        console.log('\n📊 Google Analytics Test Report');
        console.log('================================');
        
        const totalTests = this.testResults.length;
        const passedTests = this.testResults.filter(r => r.status === 'PASS').length;
        const failedTests = this.testResults.filter(r => r.status === 'FAIL').length;
        const warnings = this.testResults.filter(r => r.status === 'WARNING').length;
        
        console.log(`Total Tests: ${totalTests}`);
        console.log(`Passed: ${passedTests}`);
        console.log(`Failed: ${failedTests}`);
        console.log(`Warnings: ${warnings}`);
        
        console.log('\nDetailed Results:');
        this.testResults.forEach(result => {
            const statusIcon = result.status === 'PASS' ? '✅' : result.status === 'FAIL' ? '❌' : '⚠️';
            console.log(`${statusIcon} ${result.test}: ${result.message}`);
        });
        
        // Recommendations
        console.log('\n🔧 Recommendations:');
        if (failedTests > 0) {
            console.log('❌ Fix failed tests before proceeding');
        }
        if (warnings > 0) {
            console.log('⚠️ Address warnings to ensure optimal tracking');
        }
        if (passedTests === totalTests) {
            console.log('✅ All tests passed! Google Analytics should be working correctly');
        }
        
        // Environment info
        console.log('\n🌍 Environment Info:');
        console.log(`URL: ${window.location.href}`);
        console.log(`User Agent: ${navigator.userAgent}`);
        console.log(`Timestamp: ${new Date().toISOString()}`);
    }
}

// Run the tests when the script is loaded
if (typeof window !== 'undefined') {
    // Wait for page to load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            const tester = new GoogleAnalyticsTester();
            tester.runAllTests();
        });
    } else {
        const tester = new GoogleAnalyticsTester();
        tester.runAllTests();
    }
}

export default GoogleAnalyticsTester; 