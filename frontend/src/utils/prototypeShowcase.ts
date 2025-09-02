import { Prototype, PrototypeFilters, PrototypeFormData, ValidationResult, User, URLValidationResult } from './protoHubTypes';

export class PrototypeShowcase {
    private static instance: PrototypeShowcase;
    private prototypes: Prototype[] = [];
    private currentFilters: PrototypeFilters = {
        searchTerm: '',
        selectedTag: 'all',
        sortBy: 'newest'
    };

    static getInstance(): PrototypeShowcase {
        if (!PrototypeShowcase.instance) {
            PrototypeShowcase.instance = new PrototypeShowcase();
        }
        return PrototypeShowcase.instance;
    }

    // Initialize prototype showcase
    initPrototypeShowcase(): void {
        this.loadFromLocalStorage();
        this.trackAnalytics('prototype_showcase_initialized');
    }

    // Load prototypes from cache/local storage
    loadPrototypes(): Prototype[] {
        return this.prototypes;
    }

    // Get cached prototypes
    getCachedPrototypes(): Prototype[] {
        return this.prototypes;
    }

    // Filter prototypes based on criteria
    filterPrototypes(filters: Partial<PrototypeFilters>): Prototype[] {
        this.currentFilters = { ...this.currentFilters, ...filters };
        
        let filtered = this.prototypes;

        // Search term filter
        if (this.currentFilters.searchTerm) {
            const searchTerm = this.currentFilters.searchTerm.toLowerCase();
            filtered = filtered.filter(p => 
                p.title.toLowerCase().includes(searchTerm) ||
                p.description.toLowerCase().includes(searchTerm) ||
                p.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
                p.technologies.some(tech => tech.toLowerCase().includes(searchTerm))
            );
        }

        // Tag filter
        if (this.currentFilters.selectedTag && this.currentFilters.selectedTag !== 'all') {
            filtered = filtered.filter(p => 
                p.tags.includes(this.currentFilters.selectedTag)
            );
        }

        // Status filter
        if (this.currentFilters.status) {
            filtered = filtered.filter(p => p.status === this.currentFilters.status);
        }

        // Technology filter
        if (this.currentFilters.technology) {
            filtered = filtered.filter(p => 
                p.technologies.some(tech => 
                    tech.toLowerCase().includes(this.currentFilters.technology!.toLowerCase())
                )
            );
        }

        // Author filter
        if (this.currentFilters.authorId) {
            filtered = filtered.filter(p => p.author.id === this.currentFilters.authorId);
        }

        // Sort
        switch (this.currentFilters.sortBy) {
            case 'likes':
                filtered.sort((a, b) => b.likes - a.likes);
                break;
            case 'views':
                filtered.sort((a, b) => b.views - a.views);
                break;
            default: // newest
                filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        }

        return filtered;
    }

    // Update prototype filters
    updatePrototypeFilters(filters: Partial<PrototypeFilters>): void {
        this.currentFilters = { ...this.currentFilters, ...filters };
        this.saveToLocalStorage();
    }

    // Handle prototype interactions (like, view)
    handlePrototypeInteraction(action: 'like' | 'view', prototypeId: string): void {
        const prototype = this.prototypes.find(p => p.id === prototypeId);
        if (prototype) {
            if (action === 'like') {
                prototype.likes += 1;
            } else if (action === 'view') {
                prototype.views += 1;
            }
            this.saveToLocalStorage();
            this.trackAnalytics('prototype_interaction', { action, prototypeId });
        }
    }

    // Update prototype statistics
    updatePrototypeStats(): void {
        this.saveToLocalStorage();
    }

    // Validate prototype data
    validatePrototypeData(formData: PrototypeFormData): ValidationResult {
        const errors: string[] = [];
        const warnings: string[] = [];

        // Title validation
        if (!formData.title.trim()) {
            errors.push('Prototype title is required');
        } else if (formData.title.length < 5) {
            errors.push('Title must be at least 5 characters long');
        } else if (formData.title.length > 100) {
            errors.push('Title must be less than 100 characters');
        }

        // Description validation
        if (!formData.description.trim()) {
            errors.push('Description is required');
        } else if (formData.description.length < 20) {
            errors.push('Description must be at least 20 characters long');
        } else if (formData.description.length > 1000) {
            errors.push('Description must be less than 1000 characters');
        }

        // GitHub Pages URL validation
        const urlValidation = this.validateGitHubPagesUrl(formData.githubPagesUrl);
        if (!urlValidation.isValid) {
            errors.push(`Invalid GitHub Pages URL: ${urlValidation.errorMessage}`);
        }

        // GitHub Repository URL validation (optional)
        if (formData.githubRepoUrl && formData.githubRepoUrl.trim()) {
            const repoUrlValidation = this.validateGitHubRepoUrl(formData.githubRepoUrl);
            if (!repoUrlValidation.isValid) {
                errors.push(`Invalid GitHub Repository URL: ${repoUrlValidation.errorMessage}`);
            }
        }

        // Technologies validation
        if (formData.technologies.length === 0) {
            errors.push('At least one technology is required');
        } else if (formData.technologies.length > 10) {
            errors.push('Maximum 10 technologies allowed');
        }

        // Tags validation
        if (formData.tags.length === 0) {
            errors.push('At least one tag is required');
        } else if (formData.tags.length > 5) {
            errors.push('Maximum 5 tags allowed');
        }

        // Check for duplicate prototypes
        const similarPrototypes = this.prototypes.filter(p => 
            p.title.toLowerCase().includes(formData.title.toLowerCase()) ||
            p.githubPagesUrl === formData.githubPagesUrl
        );

        if (similarPrototypes.length > 0) {
            warnings.push('Similar prototypes already exist. Consider checking the gallery first.');
        }

        return {
            isValid: errors.length === 0,
            errors,
            warnings
        };
    }

    // Validate GitHub Pages URL
    validateGitHubPagesUrl(url: string): URLValidationResult {
        const trimmedUrl = url.trim();
        
        if (!trimmedUrl) {
            return {
                isValid: false,
                url: trimmedUrl,
                type: 'other',
                status: 'error',
                errorMessage: 'URL is required'
            };
        }

        try {
            const urlObj = new URL(trimmedUrl);
            
            // Check for GitHub Pages
            if (urlObj.hostname.includes('github.io')) {
                return {
                    isValid: true,
                    url: trimmedUrl,
                    type: 'github-pages',
                    status: 'live'
                };
            }
            
            // Check for Vercel
            if (urlObj.hostname.includes('vercel.app')) {
                return {
                    isValid: true,
                    url: trimmedUrl,
                    type: 'vercel',
                    status: 'live'
                };
            }
            
            // Check for Netlify
            if (urlObj.hostname.includes('netlify.app')) {
                return {
                    isValid: true,
                    url: trimmedUrl,
                    type: 'netlify',
                    status: 'live'
                };
            }

            return {
                isValid: false,
                url: trimmedUrl,
                type: 'other',
                status: 'error',
                errorMessage: 'URL must be from GitHub Pages, Vercel, or Netlify'
            };
        } catch (error) {
            return {
                isValid: false,
                url: trimmedUrl,
                type: 'other',
                status: 'error',
                errorMessage: 'Invalid URL format'
            };
        }
    }

    // Validate GitHub Repository URL
    validateGitHubRepoUrl(url: string): URLValidationResult {
        const trimmedUrl = url.trim();
        
        if (!trimmedUrl) {
            return {
                isValid: false,
                url: trimmedUrl,
                type: 'other',
                status: 'error',
                errorMessage: 'Repository URL is required'
            };
        }

        try {
            const urlObj = new URL(trimmedUrl);
            
            if (urlObj.hostname === 'github.com' && urlObj.pathname.split('/').length >= 3) {
                return {
                    isValid: true,
                    url: trimmedUrl,
                    type: 'github-pages',
                    status: 'live'
                };
            }

            return {
                isValid: false,
                url: trimmedUrl,
                type: 'other',
                status: 'error',
                errorMessage: 'Must be a valid GitHub repository URL'
            };
        } catch (error) {
            return {
                isValid: false,
                url: trimmedUrl,
                type: 'other',
                status: 'error',
                errorMessage: 'Invalid URL format'
            };
        }
    }

    // Save prototype draft
    savePrototypeDraft(formData: PrototypeFormData): void {
        const drafts = this.getDrafts();
        drafts.prototypes = drafts.prototypes || [];
        drafts.prototypes.push({
            ...formData,
            id: `draft_${Date.now()}`,
            createdAt: new Date().toISOString()
        });
        this.saveDrafts(drafts);
    }

    // Create new prototype
    createPrototype(formData: PrototypeFormData, author: User): Prototype {
        const urlValidation = this.validateGitHubPagesUrl(formData.githubPagesUrl);
        
        const newPrototype: Prototype = {
            id: `p_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            title: formData.title.trim(),
            description: formData.description.trim(),
            githubPagesUrl: formData.githubPagesUrl.trim(),
            githubRepoUrl: formData.githubRepoUrl?.trim(),
            author,
            tags: formData.tags,
            technologies: formData.technologies,
            likes: 0,
            views: 0,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            isFeatured: false,
            status: urlValidation.isValid ? 'live' : 'development'
        };

        this.prototypes.unshift(newPrototype);
        this.saveToLocalStorage();
        this.trackAnalytics('prototype_created', { 
            prototypeId: newPrototype.id,
            status: newPrototype.status 
        });

        return newPrototype;
    }

    // Refresh prototypes list
    refreshPrototypes(): Prototype[] {
        return this.prototypes;
    }

    // Get popular technologies
    getPopularTechnologies(): { technology: string; count: number }[] {
        const techCounts: Record<string, number> = {};
        
        this.prototypes.forEach(prototype => {
            prototype.technologies.forEach(tech => {
                techCounts[tech] = (techCounts[tech] || 0) + 1;
            });
        });

        return Object.entries(techCounts)
            .map(([technology, count]) => ({ technology, count }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 15);
    }

    // Get popular tags
    getPopularTags(): { tag: string; count: number }[] {
        const tagCounts: Record<string, number> = {};
        
        this.prototypes.forEach(prototype => {
            prototype.tags.forEach(tag => {
                tagCounts[tag] = (tagCounts[tag] || 0) + 1;
            });
        });

        return Object.entries(tagCounts)
            .map(([tag, count]) => ({ tag, count }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 10);
    }

    // Get related prototypes
    getRelatedPrototypes(prototypeId: string): Prototype[] {
        const prototype = this.prototypes.find(p => p.id === prototypeId);
        if (!prototype) return [];

        return this.prototypes
            .filter(p => p.id !== prototypeId)
            .filter(p => 
                p.tags.some(tag => prototype.tags.includes(tag)) ||
                p.technologies.some(tech => prototype.technologies.includes(tech))
            )
            .slice(0, 5);
    }

    // Get featured prototypes
    getFeaturedPrototypes(): Prototype[] {
        return this.prototypes
            .filter(p => p.isFeatured)
            .sort((a, b) => b.likes - a.likes)
            .slice(0, 5);
    }

    // Get prototypes by status
    getPrototypesByStatus(status: 'live' | 'development' | 'archived'): Prototype[] {
        return this.prototypes.filter(p => p.status === status);
    }

    // Update prototype status
    updatePrototypeStatus(prototypeId: string, status: 'live' | 'development' | 'archived'): void {
        const prototype = this.prototypes.find(p => p.id === prototypeId);
        if (prototype) {
            prototype.status = status;
            prototype.updatedAt = new Date().toISOString();
            this.saveToLocalStorage();
            this.trackAnalytics('prototype_status_updated', { prototypeId, status });
        }
    }

    // Local storage management
    private loadFromLocalStorage(): void {
        try {
            const stored = localStorage.getItem('protoHub_prototypes');
            if (stored) {
                const data = JSON.parse(stored);
                this.prototypes = data.prototypes || [];
                this.currentFilters = data.filters || this.currentFilters;
            }
        } catch (error) {
            console.error('Error loading prototypes from localStorage:', error);
        }
    }

    private saveToLocalStorage(): void {
        try {
            const data = {
                prototypes: this.prototypes,
                filters: this.currentFilters,
                lastUpdated: new Date().toISOString()
            };
            localStorage.setItem('protoHub_prototypes', JSON.stringify(data));
        } catch (error) {
            console.error('Error saving prototypes to localStorage:', error);
        }
    }

    private getDrafts(): any {
        try {
            const stored = localStorage.getItem('protoHub_drafts');
            return stored ? JSON.parse(stored) : {};
        } catch (error) {
            return {};
        }
    }

    private saveDrafts(drafts: any): void {
        try {
            localStorage.setItem('protoHub_drafts', JSON.stringify(drafts));
        } catch (error) {
            console.error('Error saving drafts:', error);
        }
    }

    // Analytics tracking
    private trackAnalytics(event: string, metadata?: Record<string, any>): void {
        if (typeof window !== 'undefined' && (window as any).gtag) {
            (window as any).gtag('event', event, {
                event_category: 'proto_hub',
                event_label: 'prototype_showcase',
                ...metadata
            });
        }
    }
} 