import { Question, Answer, QuestionFilters, QuestionFormData, ValidationResult, User } from './protoHubTypes';

export class QuestionSystem {
    private static instance: QuestionSystem;
    private questions: Question[] = [];
    private answers: Answer[] = [];
    private currentFilters: QuestionFilters = {
        searchTerm: '',
        selectedTag: 'all',
        sortBy: 'newest'
    };

    static getInstance(): QuestionSystem {
        if (!QuestionSystem.instance) {
            QuestionSystem.instance = new QuestionSystem();
        }
        return QuestionSystem.instance;
    }

    // Initialize question system
    initQuestionSystem(): void {
        this.loadFromLocalStorage();
        this.trackAnalytics('question_system_initialized');
    }

    // Load questions from cache/local storage
    loadQuestions(): Question[] {
        return this.questions;
    }

    // Get cached questions
    getCachedQuestions(): Question[] {
        return this.questions;
    }

    // Filter questions based on criteria
    filterQuestions(filters: Partial<QuestionFilters>): Question[] {
        this.currentFilters = { ...this.currentFilters, ...filters };
        
        let filtered = this.questions;

        // Search term filter
        if (this.currentFilters.searchTerm) {
            const searchTerm = this.currentFilters.searchTerm.toLowerCase();
            filtered = filtered.filter(q => 
                q.title.toLowerCase().includes(searchTerm) ||
                q.content.toLowerCase().includes(searchTerm) ||
                q.tags.some(tag => tag.toLowerCase().includes(searchTerm))
            );
        }

        // Tag filter
        if (this.currentFilters.selectedTag && this.currentFilters.selectedTag !== 'all') {
            filtered = filtered.filter(q => 
                q.tags.includes(this.currentFilters.selectedTag)
            );
        }

        // Sort
        switch (this.currentFilters.sortBy) {
            case 'votes':
                filtered.sort((a, b) => b.votes - a.votes);
                break;
            case 'views':
                filtered.sort((a, b) => b.views - a.views);
                break;
            case 'unanswered':
                filtered = filtered.filter(q => !q.isAnswered);
                filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
                break;
            default: // newest
                filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        }

        return filtered;
    }

    // Update filters in local storage
    updateFilters(filters: Partial<QuestionFilters>): void {
        this.currentFilters = { ...this.currentFilters, ...filters };
        this.saveToLocalStorage();
    }

    // Load question detail
    loadQuestionDetail(questionId: string): { question: Question | null, answers: Answer[] } {
        const question = this.questions.find(q => q.id === questionId) || null;
        const answers = this.answers.filter(a => a.questionId === questionId);
        
        if (question) {
            // Increment view count
            question.views += 1;
            this.saveToLocalStorage();
            this.trackAnalytics('question_viewed', { questionId });
        }

        return { question, answers };
    }

    // Get question data
    getQuestionData(questionId: string): Question | null {
        return this.questions.find(q => q.id === questionId) || null;
    }

    // Handle answer interactions (like, view)
    handleAnswerInteraction(action: 'like' | 'view', answerId: string): void {
        const answer = this.answers.find(a => a.id === answerId);
        if (answer) {
            if (action === 'like') {
                answer.votes += 1;
            }
            this.saveToLocalStorage();
            this.trackAnalytics('answer_interaction', { action, answerId });
        }
    }

    // Update answer statistics
    updateAnswerStats(): void {
        this.saveToLocalStorage();
    }

    // Validate question data
    validateQuestionData(formData: QuestionFormData): ValidationResult {
        const errors: string[] = [];
        const warnings: string[] = [];

        // Title validation
        if (!formData.title.trim()) {
            errors.push('Title is required');
        } else if (formData.title.length < 10) {
            errors.push('Title must be at least 10 characters long');
        } else if (formData.title.length > 200) {
            errors.push('Title must be less than 200 characters');
        }

        // Content validation
        if (!formData.content.trim()) {
            errors.push('Question content is required');
        } else if (formData.content.length < 20) {
            errors.push('Question content must be at least 20 characters long');
        } else if (formData.content.length > 5000) {
            errors.push('Question content must be less than 5000 characters');
        }

        // Tags validation
        if (formData.tags.length === 0) {
            errors.push('At least one tag is required');
        } else if (formData.tags.length > 5) {
            errors.push('Maximum 5 tags allowed');
        }

        // Check for duplicate questions
        const similarQuestions = this.questions.filter(q => 
            q.title.toLowerCase().includes(formData.title.toLowerCase()) ||
            q.content.toLowerCase().includes(formData.content.toLowerCase())
        );

        if (similarQuestions.length > 0) {
            warnings.push('Similar questions already exist. Consider searching first.');
        }

        return {
            isValid: errors.length === 0,
            errors,
            warnings
        };
    }

    // Save question draft
    saveQuestionDraft(formData: QuestionFormData): void {
        const drafts = this.getDrafts();
        drafts.questions = drafts.questions || [];
        drafts.questions.push({
            ...formData,
            id: `draft_${Date.now()}`,
            createdAt: new Date().toISOString()
        });
        this.saveDrafts(drafts);
    }

    // Create new question
    createQuestion(formData: QuestionFormData, author: User): Question {
        const newQuestion: Question = {
            id: `q_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            title: formData.title.trim(),
            content: formData.content.trim(),
            author,
            tags: formData.tags,
            votes: 0,
            answers: 0,
            views: 0,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            isAnswered: false,
            isFeatured: false,
            status: 'active'
        };

        this.questions.unshift(newQuestion);
        this.saveToLocalStorage();
        this.trackAnalytics('question_created', { questionId: newQuestion.id });

        return newQuestion;
    }

    // Add answer to question
    addAnswer(questionId: string, content: string, author: User, isAI: boolean = false): Answer {
        const newAnswer: Answer = {
            id: `a_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            questionId,
            content: content.trim(),
            author,
            votes: 0,
            isAccepted: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            isAI
        };

        this.answers.push(newAnswer);

        // Update question answer count
        const question = this.questions.find(q => q.id === questionId);
        if (question) {
            question.answers += 1;
            question.isAnswered = true;
            question.updatedAt = new Date().toISOString();
        }

        this.saveToLocalStorage();
        this.trackAnalytics('answer_created', { 
            questionId, 
            answerId: newAnswer.id,
            isAI 
        });

        return newAnswer;
    }

    // Refresh questions list
    refreshQuestions(): Question[] {
        return this.questions;
    }

    // Get popular tags
    getPopularTags(): { tag: string; count: number }[] {
        const tagCounts: Record<string, number> = {};
        
        this.questions.forEach(question => {
            question.tags.forEach(tag => {
                tagCounts[tag] = (tagCounts[tag] || 0) + 1;
            });
        });

        return Object.entries(tagCounts)
            .map(([tag, count]) => ({ tag, count }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 10);
    }

    // Get related questions
    getRelatedQuestions(questionId: string): Question[] {
        const question = this.questions.find(q => q.id === questionId);
        if (!question) return [];

        return this.questions
            .filter(q => q.id !== questionId)
            .filter(q => 
                q.tags.some(tag => question.tags.includes(tag)) ||
                q.title.toLowerCase().includes(question.title.toLowerCase().split(' ')[0])
            )
            .slice(0, 5);
    }

    // Local storage management
    private loadFromLocalStorage(): void {
        try {
            const stored = localStorage.getItem('protoHub_questions');
            if (stored) {
                const data = JSON.parse(stored);
                this.questions = data.questions || [];
                this.answers = data.answers || [];
                this.currentFilters = data.filters || this.currentFilters;
            }
        } catch (error) {
            console.error('Error loading questions from localStorage:', error);
        }
    }

    private saveToLocalStorage(): void {
        try {
            const data = {
                questions: this.questions,
                answers: this.answers,
                filters: this.currentFilters,
                lastUpdated: new Date().toISOString()
            };
            localStorage.setItem('protoHub_questions', JSON.stringify(data));
        } catch (error) {
            console.error('Error saving questions to localStorage:', error);
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
                event_label: 'question_system',
                ...metadata
            });
        }
    }
} 