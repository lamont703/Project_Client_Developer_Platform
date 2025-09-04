// Developer tracking utilities
export interface DeveloperRef {
    developerId: string;
    developerName: string;
    source: string;
    timestamp: string;
    sessionId: string;
}

export class DeveloperTracker {
    private static instance: DeveloperTracker;
    private developerRef: DeveloperRef | null = null;
    private sessionId: string;

    static getInstance(): DeveloperTracker {
        if (!DeveloperTracker.instance) {
            DeveloperTracker.instance = new DeveloperTracker();
        }
        return DeveloperTracker.instance;
    }

    constructor() {
        this.sessionId = this.generateSessionId();
        this.loadDeveloperRef();
    }

    // Extract developer reference from URL parameters
    extractDeveloperRefFromURL(): DeveloperRef | null {
        if (typeof window === 'undefined') return null;

        // Check both search params and hash params for HashRouter compatibility
        const urlParams = new URLSearchParams(window.location.search);
        const hashParams = new URLSearchParams(window.location.hash.split('?')[1] || '');
        
        const developerId = urlParams.get('ref') || hashParams.get('ref');
        const source = urlParams.get('source') || hashParams.get('source') || 'direct';

        if (!developerId) return null;

        // Map developer IDs to names
        const developerNames: Record<string, string> = {
            'lamont_evans': 'Lamont Evans',
            'lamont': 'Lamont Evans',
            'dantee_fluellen': 'Dantee Fluellen',
            'dantee': 'Dantee Fluellen',
            'julian_faulkner': 'Julian Faulkner',
            'julian': 'Julian Faulkner'
        };

        const developerName = developerNames[developerId] || developerId;

        const developerRef: DeveloperRef = {
            developerId,
            developerName,
            source,
            timestamp: new Date().toISOString(),
            sessionId: this.sessionId
        };

        this.developerRef = developerRef;
        this.saveDeveloperRef();
        return developerRef;
    }

    // Get current developer reference
    getDeveloperRef(): DeveloperRef | null {
        return this.developerRef;
    }

    // Check if user came from a developer referral
    hasDeveloperReferral(): boolean {
        return this.developerRef !== null;
    }

    // Get developer attribution data for analytics
    getAttributionData(): Record<string, any> {
        if (!this.developerRef) return {};

        return {
            developerRef: this.developerRef.developerId,
            developerName: this.developerRef.developerName,
            source: this.developerRef.source,
            sessionId: this.developerRef.sessionId,
            attributionChain: `${this.developerRef.developerId} → user → conversion`
        };
    }

    // Generate session ID
    private generateSessionId(): string {
        return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }

    // Save developer reference to localStorage
    private saveDeveloperRef(): void {
        if (typeof window === 'undefined') return;

        try {
            localStorage.setItem('developer_referral', JSON.stringify(this.developerRef));
        } catch (error) {
            console.error('Error saving developer referral:', error);
        }
    }

    // Load developer reference from localStorage
    private loadDeveloperRef(): void {
        if (typeof window === 'undefined') return;

        try {
            const stored = localStorage.getItem('developer_referral');
            if (stored) {
                this.developerRef = JSON.parse(stored);
            }
        } catch (error) {
            console.error('Error loading developer referral:', error);
        }
    }

    // Clear developer reference
    clearDeveloperRef(): void {
        this.developerRef = null;
        if (typeof window !== 'undefined') {
            localStorage.removeItem('developer_referral');
        }
    }
}

export default DeveloperTracker; 