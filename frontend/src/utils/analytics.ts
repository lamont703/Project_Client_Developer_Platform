export interface AnalyticsEvent {
    event: string;
    timestamp: string;
    userId?: string;
    [key: string]: any;
}

export class Analytics {
    private static instance: Analytics;
    private events: AnalyticsEvent[] = [];
    private isEnabled: boolean = true;

    static getInstance(): Analytics {
        if (!Analytics.instance) {
            Analytics.instance = new Analytics();
        }
        return Analytics.instance;
    }

    constructor() {
        this.initAnalytics();
    }

    // Initialize analytics
    initAnalytics(): void {
        this.loadFromLocalStorage();
        
        // Wait for Google Analytics to be ready
        this.waitForGtag().then(() => {
            console.log('✅ Google Analytics ready for tracking');
            this.trackEvent('analytics_initialized', {
                environment: window.location.hostname,
                timestamp: new Date().toISOString()
            });
        }).catch((error: any) => {
            console.warn('⚠️ Google Analytics not ready:', error.message);
            // Still track initialization even if GA isn't ready
            this.trackEvent('analytics_initialized', {
                environment: window.location.hostname,
                ga_ready: false,
                error: error.message,
                timestamp: new Date().toISOString()
            });
        });
    }

    // Main tracking method
    trackEvent(event: string, metadata?: Record<string, any>): void {
        if (!this.isEnabled) return;

        const analyticsEvent: AnalyticsEvent = {
            event,
            timestamp: new Date().toISOString(),
            userId: this.getCurrentUserId(),
            ...metadata
        };

        this.events.push(analyticsEvent);
        this.saveToLocalStorage();

        // Send to Google Analytics if available
        this.sendToGoogleAnalytics(event, metadata);

        // Send to custom analytics endpoint if available
        this.sendToCustomAnalytics(analyticsEvent);
    }

    // Send to Google Analytics
    private sendToGoogleAnalytics(event: string, metadata?: Record<string, any>): void {
        // Wait for gtag to be available
        this.waitForGtag().then(() => {
            if (typeof window !== 'undefined' && (window as any).gtag) {
                try {
                    // Add mobile-specific metadata
                    const mobileMetadata = this.getMobileMetadata();
                    const enhancedMetadata = {
                        event_category: 'proto_hub',
                        event_label: 'community_platform',
                        ...mobileMetadata,
                        ...metadata
                    };

                    (window as any).gtag('event', event, enhancedMetadata);
                    
                    // Debug logging for all environments
                    console.log('📊 GA Event Sent:', event, enhancedMetadata);
                    
                    // Also log to dataLayer for debugging
                    if ((window as any).dataLayer) {
                        console.log('📊 DataLayer:', (window as any).dataLayer);
                    }
                } catch (error) {
                    console.error('Error sending to Google Analytics:', error);
                    // Fallback: try to send to dataLayer directly
                    this.sendToDataLayer(event, metadata);
                }
            } else {
                console.warn('⚠️ Google Analytics (gtag) not available for event:', event);
                // Fallback: try to send to dataLayer directly
                this.sendToDataLayer(event, metadata);
            }
        }).catch(error => {
            console.error('Failed to wait for gtag:', error);
            // Final fallback: try to send to dataLayer directly
            this.sendToDataLayer(event, metadata);
        });
    }

    // Wait for gtag to be available
    private waitForGtag(): Promise<void> {
        return new Promise((resolve, reject) => {
            // If gtag is already available, resolve immediately
            if (typeof window !== 'undefined' && (window as any).gtag) {
                resolve();
                return;
            }

            // Wait for gtag to be available
            let attempts = 0;
            const maxAttempts = 50; // 5 seconds max wait
            const checkGtag = () => {
                attempts++;
                if (typeof window !== 'undefined' && (window as any).gtag) {
                    resolve();
                } else if (attempts >= maxAttempts) {
                    reject(new Error('gtag not available after timeout'));
                } else {
                    setTimeout(checkGtag, 100);
                }
            };
            checkGtag();
        });
    }

    // Fallback: Send directly to dataLayer
    private sendToDataLayer(event: string, metadata?: Record<string, any>): void {
        try {
            if (typeof window !== 'undefined' && (window as any).dataLayer) {
                (window as any).dataLayer.push({
                    event: event,
                    event_category: 'proto_hub',
                    event_label: 'community_platform',
                    ...metadata
                });
                console.log('📊 Event sent to dataLayer:', event, metadata);
            } else {
                console.warn('⚠️ DataLayer not available for event:', event);
            }
        } catch (error) {
            console.error('Error sending to dataLayer:', error);
        }
    }

    // Send to custom analytics endpoint
    private sendToCustomAnalytics(event: AnalyticsEvent): void {
        // This would typically send to your own analytics endpoint
        // For now, we'll just log it
        if (process.env.NODE_ENV === 'development') {
            console.log('Analytics Event:', event);
        }
    }

    // Get current user ID
    private getCurrentUserId(): string | undefined {
        try {
            const userData = localStorage.getItem('protoHub_user');
            if (userData) {
                const user = JSON.parse(userData);
                return user.id;
            }
        } catch (error) {
            console.error('Error getting user ID:', error);
        }
        return undefined;
    }

    // Get session ID
    private getSessionId(): string {
        let sessionId = sessionStorage.getItem('protoHub_session_id');
        if (!sessionId) {
            sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
            sessionStorage.setItem('protoHub_session_id', sessionId);
        }
        return sessionId;
    }

    // Get analytics events
    getEvents(): AnalyticsEvent[] {
        return this.events;
    }

    // Clear events
    clearEvents(): void {
        this.events = [];
        this.saveToLocalStorage();
    }

    // Enable/disable analytics
    setEnabled(enabled: boolean): void {
        this.isEnabled = enabled;
        localStorage.setItem('protoHub_analytics_enabled', enabled.toString());
    }

    // Check if analytics is enabled
    isAnalyticsEnabled(): boolean {
        return this.isEnabled;
    }

    // Test Google Analytics functionality
    testGoogleAnalytics(): Promise<boolean> {
        return new Promise((resolve) => {
            this.waitForGtag().then(() => {
                try {
                    // Send a test event
                    (window as any).gtag('event', 'analytics_test', {
                        event_category: 'system',
                        event_label: 'analytics_test',
                        timestamp: new Date().toISOString()
                    });
                    
                    console.log('✅ Google Analytics test successful');
                    resolve(true);
                } catch (error) {
                    console.error('❌ Google Analytics test failed:', error);
                    resolve(false);
                }
            }).catch(error => {
                console.error('❌ Google Analytics not available for testing:', error);
                resolve(false);
            });
        });
    }

    // Get Google Analytics status
    getGoogleAnalyticsStatus(): {
        gtagAvailable: boolean;
        dataLayerAvailable: boolean;
        environment: string;
        timestamp: string;
    } {
        return {
            gtagAvailable: typeof window !== 'undefined' && typeof (window as any).gtag === 'function',
            dataLayerAvailable: typeof window !== 'undefined' && Array.isArray((window as any).dataLayer),
            environment: typeof window !== 'undefined' ? window.location.hostname : 'unknown',
            timestamp: new Date().toISOString()
        };
    }

    // Get analytics summary
    getAnalyticsSummary(): {
        totalEvents: number;
        eventsByCategory: Record<string, number>;
        recentEvents: AnalyticsEvent[];
        sessionDuration: number;
    } {
        const eventsByCategory: Record<string, number> = {};
        
        this.events.forEach(event => {
            const category = event.event.split('_')[0];
            eventsByCategory[category] = (eventsByCategory[category] || 0) + 1;
        });

        const recentEvents = this.events
            .slice(-10)
            .reverse();

        const sessionStart = sessionStorage.getItem('protoHub_session_start');
        const sessionDuration = sessionStart 
            ? Date.now() - new Date(sessionStart).getTime()
            : 0;

        return {
            totalEvents: this.events.length,
            eventsByCategory,
            recentEvents,
            sessionDuration
        };
    }

    // Export analytics data
    exportAnalyticsData(): string {
        return JSON.stringify({
            events: this.events,
            summary: this.getAnalyticsSummary(),
            exportedAt: new Date().toISOString()
        }, null, 2);
    }

    // Local storage management
    private loadFromLocalStorage(): void {
        try {
            const stored = localStorage.getItem('protoHub_analytics');
            if (stored) {
                const data = JSON.parse(stored);
                this.events = data.events || [];
                this.isEnabled = data.isEnabled !== undefined ? data.isEnabled : true;
            }

            // Set session start time
            if (!sessionStorage.getItem('protoHub_session_start')) {
                sessionStorage.setItem('protoHub_session_start', new Date().toISOString());
            }
        } catch (error) {
            console.error('Error loading analytics from localStorage:', error);
        }
    }

    private saveToLocalStorage(): void {
        try {
            const data = {
                events: this.events.slice(-1000), // Keep last 1000 events
                isEnabled: this.isEnabled,
                lastUpdated: new Date().toISOString()
            };
            localStorage.setItem('protoHub_analytics', JSON.stringify(data));
        } catch (error) {
            console.error('Error saving analytics to localStorage:', error);
        }
    }

    // Get mobile-specific metadata
    private getMobileMetadata(): Record<string, any> {
        const metadata: Record<string, any> = {};
        
        try {
            // Detect mobile devices
            const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
            const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
            const isAndroid = /Android/.test(navigator.userAgent);
            const isSafari = /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);
            const isChrome = /Chrome/.test(navigator.userAgent);
            
            // Detect connection type
            const connectionType = (navigator as any).connection ? (navigator as any).connection.effectiveType : 'unknown';
            const isSlowConnection = connectionType === 'slow-2g' || connectionType === '2g' || connectionType === '3g';
            
            // Detect OS version
            let osVersion = 'unknown';
            if (isIOS) {
                const match = navigator.userAgent.match(/OS (\d+)_(\d+)_?(\d+)?/);
                if (match) {
                    osVersion = `${match[1]}.${match[2]}${match[3] ? '.' + match[3] : ''}`;
                }
            } else if (isAndroid) {
                const match = navigator.userAgent.match(/Android (\d+\.\d+)/);
                if (match) {
                    osVersion = match[1];
                }
            }
            
            // Add mobile metadata
            if (isMobile) {
                metadata.device_type = isIOS ? 'ios' : isAndroid ? 'android' : 'mobile';
                metadata.browser_type = isSafari ? 'safari' : isChrome ? 'chrome' : 'other';
                metadata.connection_type = connectionType;
                metadata.os_version = osVersion;
                metadata.is_slow_connection = isSlowConnection;
                metadata.is_mobile = true;
                
                // Add platform-specific flags
                if (isIOS) {
                    metadata.platform = 'ios';
                    metadata.safari_itp = isSafari;
                } else if (isAndroid) {
                    metadata.platform = 'android';
                    metadata.android_chrome = isChrome;
                }
            } else {
                metadata.device_type = 'desktop';
                metadata.is_mobile = false;
            }
            
            // Add screen dimensions
            if (window.screen) {
                metadata.screen_width = window.screen.width;
                metadata.screen_height = window.screen.height;
                metadata.viewport_width = window.innerWidth;
                metadata.viewport_height = window.innerHeight;
            }
            
            // Add battery info if available
            if ('getBattery' in navigator) {
                (navigator as any).getBattery().then((battery: any) => {
                    metadata.battery_level = battery.level;
                    metadata.battery_charging = battery.charging;
                }).catch(() => {
                    // Battery API not available
                });
            }
            
        } catch (error) {
            console.warn('Error getting mobile metadata:', error);
        }
        
        return metadata;
    }
} 