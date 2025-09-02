import { User, Question, Prototype, Answer } from './protoHubTypes';

export class ProtoHubUtils {
    // Format date for display
    static formatDate(dateString: string): string {
        const date = new Date(dateString);
        const now = new Date();
        const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
        
        if (diffInHours < 1) return 'Just now';
        if (diffInHours < 24) return `${diffInHours}h ago`;
        if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
        if (diffInHours < 720) return `${Math.floor(diffInHours / 168)}w ago`;
        if (diffInHours < 8760) return `${Math.floor(diffInHours / 720)}mo ago`;
        return `${Math.floor(diffInHours / 8760)}y ago`;
    }

    // Format number with appropriate suffix
    static formatNumber(num: number): string {
        if (num < 1000) return num.toString();
        if (num < 1000000) return `${(num / 1000).toFixed(1)}k`;
        return `${(num / 1000000).toFixed(1)}m`;
    }

    // Generate user avatar
    static generateAvatar(name: string): string {
        const avatars = ['👤', '👨‍💻', '👩‍💻', '👨‍🎨', '👩‍🎨', '👨‍💼', '👩‍💼', '🤖'];
        const index = name.charCodeAt(0) % avatars.length;
        return avatars[index];
    }

    // Get reputation badge
    static getReputationBadge(reputation: number): { badge: string; color: string } {
        if (reputation >= 1000) return { badge: '🏆 Expert', color: '#fbbf24' };
        if (reputation >= 500) return { badge: '⭐ Pro', color: '#10b981' };
        if (reputation >= 100) return { badge: '🌟 Contributor', color: '#3b82f6' };
        if (reputation >= 50) return { badge: '📚 Learner', color: '#8b5cf6' };
        return { badge: '🌱 Newcomer', color: '#6b7280' };
    }

    // Get status color
    static getStatusColor(status: string): string {
        switch (status) {
            case 'live': return '#10b981';
            case 'development': return '#f59e0b';
            case 'archived': return '#6b7280';
            case 'active': return '#10b981';
            case 'closed': return '#ef4444';
            default: return '#6b7280';
        }
    }

    // Get status label
    static getStatusLabel(status: string): string {
        switch (status) {
            case 'live': return '🟢 Live';
            case 'development': return '🟡 In Development';
            case 'archived': return '⚫ Archived';
            case 'active': return '🟢 Active';
            case 'closed': return '🔴 Closed';
            default: return '⚫ Unknown';
        }
    }

    // Truncate text
    static truncateText(text: string, maxLength: number): string {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    }

    // Generate excerpt from content
    static generateExcerpt(content: string, maxLength: number = 150): string {
        const cleanContent = content.replace(/<[^>]*>/g, ''); // Remove HTML tags
        return this.truncateText(cleanContent, maxLength);
    }

    // Extract tags from text
    static extractTags(text: string): string[] {
        const tagRegex = /#(\w+)/g;
        const matches = text.match(tagRegex);
        return matches ? matches.map(tag => tag.substring(1)) : [];
    }

    // Validate email
    static validateEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Validate URL
    static validateURL(url: string): boolean {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    }

    // Generate random ID
    static generateId(prefix: string = 'id'): string {
        return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }

    // Debounce function
    static debounce<T extends (...args: any[]) => any>(
        func: T,
        wait: number
    ): (...args: Parameters<T>) => void {
        let timeout: NodeJS.Timeout;
        return (...args: Parameters<T>) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => func(...args), wait);
        };
    }

    // Throttle function
    static throttle<T extends (...args: any[]) => any>(
        func: T,
        limit: number
    ): (...args: Parameters<T>) => void {
        let inThrottle: boolean;
        return (...args: Parameters<T>) => {
            if (!inThrottle) {
                func(...args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // Deep clone object
    static deepClone<T>(obj: T): T {
        return JSON.parse(JSON.stringify(obj));
    }

    // Merge objects
    static mergeObjects<T>(target: T, source: Partial<T>): T {
        return { ...target, ...source };
    }

    // Get query parameters
    static getQueryParams(): Record<string, string> {
        const params = new URLSearchParams(window.location.search);
        const result: Record<string, string> = {};
        params.forEach((value, key) => {
            result[key] = value;
        });
        return result;
    }

    // Set query parameters
    static setQueryParams(params: Record<string, string>): void {
        const url = new URL(window.location.href);
        Object.entries(params).forEach(([key, value]) => {
            url.searchParams.set(key, value);
        });
        window.history.pushState({}, '', url.toString());
    }

    // Copy to clipboard
    static async copyToClipboard(text: string): Promise<boolean> {
        try {
            await navigator.clipboard.writeText(text);
            return true;
        } catch (error) {
            console.error('Failed to copy to clipboard:', error);
            return false;
        }
    }

    // Download file
    static downloadFile(content: string, filename: string, type: string = 'text/plain'): void {
        const blob = new Blob([content], { type });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    // Get file extension
    static getFileExtension(filename: string): string {
        return filename.split('.').pop()?.toLowerCase() || '';
    }

    // Format file size
    static formatFileSize(bytes: number): string {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    // Check if user is online
    static isOnline(): boolean {
        return navigator.onLine;
    }

    // Get device type
    static getDeviceType(): 'mobile' | 'tablet' | 'desktop' {
        const userAgent = navigator.userAgent;
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)) {
            return 'mobile';
        }
        if (/iPad|Android/i.test(userAgent)) {
            return 'tablet';
        }
        return 'desktop';
    }

    // Get screen dimensions
    static getScreenDimensions(): { width: number; height: number } {
        return {
            width: window.innerWidth,
            height: window.innerHeight
        };
    }

    // Check if element is in viewport
    static isInViewport(element: HTMLElement): boolean {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // Scroll to element
    static scrollToElement(element: HTMLElement, offset: number = 0): void {
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }

    // Scroll to top
    static scrollToTop(): void {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    // Get user's timezone
    static getUserTimezone(): string {
        return Intl.DateTimeFormat().resolvedOptions().timeZone;
    }

    // Format currency
    static formatCurrency(amount: number, currency: string = 'USD'): string {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency
        }).format(amount);
    }

    // Generate color from string
    static generateColorFromString(str: string): string {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }
        const hue = Math.abs(hash) % 360;
        return `hsl(${hue}, 70%, 60%)`;
    }

    // Check if string contains profanity (basic implementation)
    static containsProfanity(text: string): boolean {
        const profanityWords = [
            'badword1', 'badword2', 'badword3' // Add actual profanity words
        ];
        const lowerText = text.toLowerCase();
        return profanityWords.some(word => lowerText.includes(word));
    }

    // Sanitize HTML
    static sanitizeHTML(html: string): string {
        const div = document.createElement('div');
        div.textContent = html;
        return div.innerHTML;
    }

    // Generate slug from title
    static generateSlug(title: string): string {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9 -]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .trim();
    }

    // Check if object is empty
    static isEmpty(obj: any): boolean {
        if (obj == null) return true;
        if (Array.isArray(obj) || typeof obj === 'string') return obj.length === 0;
        return Object.keys(obj).length === 0;
    }

    // Get object size
    static getObjectSize(obj: any): number {
        return new Blob([JSON.stringify(obj)]).size;
    }

    // Sleep function
    static sleep(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Retry function
    static async retry<T>(
        fn: () => Promise<T>,
        maxAttempts: number = 3,
        delay: number = 1000
    ): Promise<T> {
        for (let attempt = 1; attempt <= maxAttempts; attempt++) {
            try {
                return await fn();
            } catch (error) {
                if (attempt === maxAttempts) throw error;
                await this.sleep(delay * attempt);
            }
        }
        throw new Error('Max retry attempts reached');
    }
} 