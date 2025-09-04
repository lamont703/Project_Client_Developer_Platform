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

    // Track ProtoHub Question Events
    trackQuestionViewed(questionId: string, questionTitle: string, metadata?: Record<string, any>): void {
        this.trackEvent('question_viewed', {
            event_category: 'proto_hub_questions',
            question_id: questionId,
            question_title: questionTitle,
            ...metadata
        });
    }

    trackQuestionCreated(questionId: string, questionTitle: string, tags: string[], metadata?: Record<string, any>): void {
        this.trackEvent('question_created', {
            event_category: 'proto_hub_questions',
            question_id: questionId,
            question_title: questionTitle,
            tags: tags,
            ...metadata
        });
    }

    trackQuestionVoted(questionId: string, voteDirection: 'up' | 'down', previousVotes: number, newVotes: number): void {
        this.trackEvent('question_voted', {
            event_category: 'proto_hub_questions',
            question_id: questionId,
            vote_direction: voteDirection,
            previous_votes: previousVotes,
            new_votes: newVotes
        });
    }

    trackQuestionSearched(searchTerm: string, resultsCount: number, filters?: Record<string, any>): void {
        this.trackEvent('question_search', {
            event_category: 'proto_hub_questions',
            search_term: searchTerm,
            results_count: resultsCount,
            filters: filters
        });
    }

    trackQuestionFiltered(filterType: string, filterValue: string, resultsCount: number): void {
        this.trackEvent('question_filtered', {
            event_category: 'proto_hub_questions',
            filter_type: filterType,
            filter_value: filterValue,
            results_count: resultsCount
        });
    }

    trackQuestionSorted(sortBy: string, resultsCount: number): void {
        this.trackEvent('question_sorted', {
            event_category: 'proto_hub_questions',
            sort_by: sortBy,
            results_count: resultsCount
        });
    }

    // Track ProtoHub Answer Events
    trackAnswerViewed(questionId: string, answerId: string, metadata?: Record<string, any>): void {
        this.trackEvent('answer_viewed', {
            event_category: 'proto_hub_answers',
            question_id: questionId,
            answer_id: answerId,
            ...metadata
        });
    }

    trackAnswerCreated(questionId: string, answerId: string, answerLength: number, isAI: boolean): void {
        this.trackEvent('answer_created', {
            event_category: 'proto_hub_answers',
            question_id: questionId,
            answer_id: answerId,
            answer_length: answerLength,
            is_ai: isAI
        });
    }

    trackAnswerVoted(questionId: string, answerId: string, voteDirection: 'up' | 'down', previousVotes: number, newVotes: number): void {
        this.trackEvent('answer_voted', {
            event_category: 'proto_hub_answers',
            question_id: questionId,
            answer_id: answerId,
            vote_direction: voteDirection,
            previous_votes: previousVotes,
            new_votes: newVotes
        });
    }

    trackAnswerAccepted(questionId: string, answerId: string): void {
        this.trackEvent('answer_accepted', {
            event_category: 'proto_hub_answers',
            question_id: questionId,
            answer_id: answerId
        });
    }

    // Track ProtoHub Prototype Events
    trackPrototypeViewed(prototypeId: string, prototypeTitle: string, metadata?: Record<string, any>): void {
        this.trackEvent('prototype_viewed', {
            event_category: 'proto_hub_prototypes',
            prototype_id: prototypeId,
            prototype_title: prototypeTitle,
            ...metadata
        });
    }

    trackPrototypeCreated(prototypeId: string, prototypeTitle: string, technologies: string[], tags: string[]): void {
        this.trackEvent('prototype_created', {
            event_category: 'proto_hub_prototypes',
            prototype_id: prototypeId,
            prototype_title: prototypeTitle,
            technologies: technologies,
            tags: tags
        });
    }

    trackPrototypeLiked(prototypeId: string, previousLikes: number, newLikes: number): void {
        this.trackEvent('prototype_liked', {
            event_category: 'proto_hub_prototypes',
            prototype_id: prototypeId,
            previous_likes: previousLikes,
            new_likes: newLikes
        });
    }

    trackPrototypeShared(prototypeId: string, shareMethod: string): void {
        this.trackEvent('prototype_shared', {
            event_category: 'proto_hub_prototypes',
            prototype_id: prototypeId,
            share_method: shareMethod
        });
    }

    trackPrototypeGalleryOpened(): void {
        this.trackEvent('prototype_gallery_opened', {
            event_category: 'proto_hub_prototypes'
        });
    }

    // Track ProtoHub User Engagement Events
    trackUserProfileViewed(userId: string, profileType: 'question_author' | 'answer_author' | 'prototype_author'): void {
        this.trackEvent('user_profile_viewed', {
            event_category: 'proto_hub_users',
            user_id: userId,
            profile_type: profileType
        });
    }

    trackUserReputationChanged(userId: string, previousReputation: number, newReputation: number, reason: string): void {
        this.trackEvent('user_reputation_changed', {
            event_category: 'proto_hub_users',
            user_id: userId,
            previous_reputation: previousReputation,
            new_reputation: newReputation,
            reason: reason
        });
    }

    trackUserFollowed(userId: string): void {
        this.trackEvent('user_followed', {
            event_category: 'proto_hub_users',
            user_id: userId
        });
    }

    // Track ProtoHub Content Moderation Events
    trackContentReported(contentType: 'question' | 'answer' | 'prototype', contentId: string, reason: string): void {
        this.trackEvent('content_reported', {
            event_category: 'proto_hub_moderation',
            content_type: contentType,
            content_id: contentId,
            reason: reason
        });
    }

    trackContentFlagged(contentType: 'question' | 'answer' | 'prototype', contentId: string, flagType: string): void {
        this.trackEvent('content_flagged', {
            event_category: 'proto_hub_moderation',
            content_type: contentType,
            content_id: contentId,
            flag_type: flagType
        });
    }

    // Track ProtoHub Navigation Events
    trackNavigationEvent(fromPage: string, toPage: string, navigationMethod: 'click' | 'back' | 'forward' | 'direct'): void {
        this.trackEvent('navigation', {
            event_category: 'proto_hub_navigation',
            from_page: fromPage,
            to_page: toPage,
            navigation_method: navigationMethod
        });
    }

    trackTabSwitched(tabName: string, previousTab: string): void {
        this.trackEvent('tab_switched', {
            event_category: 'proto_hub_navigation',
            tab_name: tabName,
            previous_tab: previousTab
        });
    }

    // Track ProtoHub Form Events
    trackFormStarted(formType: 'question' | 'answer' | 'prototype' | 'report'): void {
        this.trackEvent('form_started', {
            event_category: 'proto_hub_forms',
            form_type: formType
        });
    }

    trackFormCompleted(formType: 'question' | 'answer' | 'prototype' | 'report', success: boolean, timeSpent: number): void {
        this.trackEvent('form_completed', {
            event_category: 'proto_hub_forms',
            form_type: formType,
            success: success,
            time_spent_ms: timeSpent
        });
    }

    trackFormAbandoned(formType: 'question' | 'answer' | 'prototype' | 'report', timeSpent: number, fieldsCompleted: number): void {
        this.trackEvent('form_abandoned', {
            event_category: 'proto_hub_forms',
            form_type: formType,
            time_spent_ms: timeSpent,
            fields_completed: fieldsCompleted
        });
    }

    // Track ProtoHub Performance Events
    trackPageLoadTime(pageName: string, loadTimeMs: number): void {
        this.trackEvent('page_load_time', {
            event_category: 'proto_hub_performance',
            page_name: pageName,
            load_time_ms: loadTimeMs
        });
    }

    trackAPIResponseTime(endpoint: string, responseTimeMs: number, success: boolean): void {
        this.trackEvent('api_response_time', {
            event_category: 'proto_hub_performance',
            endpoint: endpoint,
            response_time_ms: responseTimeMs,
            success: success
        });
    }

    // Track ProtoHub Error Events
    trackError(errorType: string, errorMessage: string, context?: Record<string, any>): void {
        this.trackEvent('error_occurred', {
            event_category: 'proto_hub_errors',
            error_type: errorType,
            error_message: errorMessage,
            context: context
        });
    }

    trackValidationError(formType: string, fieldName: string, errorMessage: string): void {
        this.trackEvent('validation_error', {
            event_category: 'proto_hub_errors',
            form_type: formType,
            field_name: fieldName,
            error_message: errorMessage
        });
    }

    // Track ProtoHub Session Events
    trackSessionStarted(): void {
        this.trackEvent('session_started', {
            event_category: 'proto_hub_session',
            session_id: this.getSessionId()
        });
    }

    trackSessionEnded(durationMs: number, eventsCount: number): void {
        this.trackEvent('session_ended', {
            event_category: 'proto_hub_session',
            session_id: this.getSessionId(),
            duration_ms: durationMs,
            events_count: eventsCount
        });
    }

    // Track ProtoHub Feature Usage
    trackFeatureUsed(featureName: string, metadata?: Record<string, any>): void {
        this.trackEvent('feature_used', {
            event_category: 'proto_hub_features',
            feature_name: featureName,
            ...metadata
        });
    }

    // Track ProtoHub AI Events
    trackAIResponseGenerated(questionId: string, responseTimeMs: number, responseLength: number): void {
        this.trackEvent('ai_response_generated', {
            event_category: 'proto_hub_ai',
            question_id: questionId,
            response_time_ms: responseTimeMs,
            response_length: responseLength
        });
    }

    trackAIInteraction(interactionType: string, metadata?: Record<string, any>): void {
        this.trackEvent('ai_interaction', {
            event_category: 'proto_hub_ai',
            interaction_type: interactionType,
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