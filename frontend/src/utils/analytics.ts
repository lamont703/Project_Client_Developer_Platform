import { AnalyticsEvent } from './protoHubTypes';
import DeveloperTracker from './developerTracker';

export class Analytics {
    private static instance: Analytics;
    private events: AnalyticsEvent[] = [];
    private isEnabled: boolean = true;
    private developerTracker: DeveloperTracker;

    static getInstance(): Analytics {
        if (!Analytics.instance) {
            Analytics.instance = new Analytics();
        }
        return Analytics.instance;
    }

    constructor() {
        this.developerTracker = DeveloperTracker.getInstance();
    }

    // Initialize analytics
    initAnalytics(): void {
        this.loadFromLocalStorage();
        this.trackEvent('analytics_initialized');
    }

    // Track AI Project Assistant events with developer attribution
    trackAIAssistantEvent(event: string, metadata?: Record<string, any>): void {
        const attributionData = this.developerTracker.getAttributionData();
        this.trackEvent(`ai_assistant_${event}`, {
            event_category: 'ai_project_assistant',
            ...attributionData,
            ...metadata
        });
    }

    // Track slot filling events with developer attribution
    trackSlotEvent(event: string, slotName?: string, metadata?: Record<string, any>): void {
        const attributionData = this.developerTracker.getAttributionData();
        this.trackEvent(`slot_${event}`, {
            event_category: 'slot_engine',
            slot_name: slotName,
            ...attributionData,
            ...metadata
        });
    }

    // Track draft generation events with developer attribution
    trackDraftEvent(event: string, metadata?: Record<string, any>): void {
        const attributionData = this.developerTracker.getAttributionData();
        this.trackEvent(`draft_${event}`, {
            event_category: 'draft_generation',
            ...attributionData,
            ...metadata
        });
    }

    // Track job posting events with developer attribution
    trackJobPostingEvent(event: string, metadata?: Record<string, any>): void {
        const attributionData = this.developerTracker.getAttributionData();
        this.trackEvent(`job_posting_${event}`, {
            event_category: 'job_posting',
            ...attributionData,
            ...metadata
        });
    }

    // Track user journey
    trackUserJourney(actions: string[]): void {
        actions.forEach(action => {
            this.trackEvent('user_journey_step', { action });
        });
    }

    // Track Proto Hub opened
    trackProtoHubOpened(): void {
        this.trackEvent('proto_hub_opened');
    }

    // Track question system events
    trackQuestionSystemEvent(event: string, metadata?: Record<string, any>): void {
        this.trackEvent(`question_${event}`, {
            event_category: 'question_system',
            ...metadata
        });
    }

    // Track prototype showcase events
    trackPrototypeShowcaseEvent(event: string, metadata?: Record<string, any>): void {
        this.trackEvent(`prototype_${event}`, {
            event_category: 'prototype_showcase',
            ...metadata
        });
    }

    // Track AI community member events
    trackAICommunityEvent(event: string, metadata?: Record<string, any>): void {
        this.trackEvent(`ai_${event}`, {
            event_category: 'ai_community_member',
            ...metadata
        });
    }

    // Track content reports
    trackContentReport(reportData: any): void {
        this.trackEvent('content_reported', {
            event_category: 'moderation',
            contentType: reportData.contentType,
            reason: reportData.reason
        });
    }

    // Track user interactions
    trackUserInteraction(interactionType: string, targetId: string, metadata?: Record<string, any>): void {
        this.trackEvent('user_interaction', {
            event_category: 'user_engagement',
            interaction_type: interactionType,
            target_id: targetId,
            ...metadata
        });
    }

    // Track form submissions
    trackFormSubmission(formType: string, success: boolean, metadata?: Record<string, any>): void {
        this.trackEvent('form_submission', {
            event_category: 'forms',
            form_type: formType,
            success,
            ...metadata
        });
    }

    // Track search events
    trackSearch(searchTerm: string, resultsCount: number, filters?: Record<string, any>): void {
        this.trackEvent('search_performed', {
            event_category: 'search',
            search_term: searchTerm,
            results_count: resultsCount,
            filters,
            timestamp: new Date().toISOString()
        });
    }

    // Track filter usage
    trackFilterUsage(filterType: string, filterValue: string): void {
        this.trackEvent('filter_used', {
            event_category: 'filters',
            filter_type: filterType,
            filter_value: filterValue,
            timestamp: new Date().toISOString()
        });
    }

    // Track view events
    trackViewEvent(contentType: string, contentId: string, metadata?: Record<string, any>): void {
        this.trackEvent('content_viewed', {
            event_category: 'views',
            content_type: contentType,
            content_id: contentId,
            ...metadata
        });
    }

    // Track like events
    trackLikeEvent(contentType: string, contentId: string, metadata?: Record<string, any>): void {
        this.trackEvent('content_liked', {
            event_category: 'engagement',
            content_type: contentType,
            content_id: contentId,
            ...metadata
        });
    }

    // Track session events
    trackSessionEvent(event: string, metadata?: Record<string, any>): void {
        this.trackEvent(`session_${event}`, {
            event_category: 'session',
            session_id: this.getSessionId(),
            ...metadata
        });
    }

    // Track performance events
    trackPerformanceEvent(metric: string, value: number, metadata?: Record<string, any>): void {
        this.trackEvent('performance_metric', {
            event_category: 'performance',
            metric,
            value,
            ...metadata
        });
    }

    // Track error events
    trackErrorEvent(error: Error, context?: Record<string, any>): void {
        this.trackEvent('error_occurred', {
            event_category: 'errors',
            error_message: error.message,
            error_stack: error.stack,
            context,
            timestamp: new Date().toISOString()
        });
    }

    // Track feature usage
    trackFeatureUsage(feature: string, metadata?: Record<string, any>): void {
        this.trackEvent('feature_used', {
            event_category: 'features',
            feature_name: feature,
            ...metadata
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
        if (typeof window !== 'undefined' && (window as any).gtag) {
            try {
                (window as any).gtag('event', event, {
                    event_category: 'proto_hub',
                    event_label: 'community_platform',
                    ...metadata
                });
                
                // Debug logging for development
                if (process.env.NODE_ENV === 'development' || window.location.hostname === 'localhost') {
                    console.log('📊 GA Event Sent:', event, metadata);
                }
            } catch (error) {
                console.error('Error sending to Google Analytics:', error);
            }
        } else {
            // Debug logging when gtag is not available
            if (process.env.NODE_ENV === 'development' || window.location.hostname === 'localhost') {
                console.warn('⚠️ Google Analytics (gtag) not available for event:', event);
            }
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
} 