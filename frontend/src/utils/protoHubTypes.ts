// Proto Hub Type Definitions
export interface User {
    id: string;
    name: string;
    avatar: string;
    reputation: number;
    isAI: boolean;
    email?: string;
    joinDate: string;
    questionsAsked: number;
    answersProvided: number;
    prototypesShared: number;
}

export interface Question {
    id: string;
    title: string;
    content: string;
    author: User;
    tags: string[];
    votes: number;
    answers: number;
    views: number;
    createdAt: string;
    updatedAt: string;
    isAnswered: boolean;
    isFeatured: boolean;
    status: 'active' | 'closed' | 'archived';
}

export interface Answer {
    id: string;
    questionId: string;
    content: string;
    author: User;
    votes: number;
    isAccepted: boolean;
    createdAt: string;
    updatedAt: string;
    isAI: boolean;
}

export interface Prototype {
    id: string;
    title: string;
    description: string;
    githubPagesUrl: string;
    githubRepoUrl?: string;
    author: User;
    tags: string[];
    technologies: string[];
    likes: number;
    views: number;
    createdAt: string;
    updatedAt: string;
    isFeatured: boolean;
    thumbnail?: string;
    status: 'live' | 'development' | 'archived';
}

export interface Report {
    id: string;
    reporterId: string;
    contentType: 'question' | 'answer' | 'prototype' | 'user';
    contentId: string;
    reason: string;
    description: string;
    status: 'pending' | 'reviewed' | 'resolved' | 'dismissed';
    createdAt: string;
    reviewedAt?: string;
    reviewedBy?: string;
}

export interface QuestionFilters {
    searchTerm: string;
    selectedTag: string;
    sortBy: 'newest' | 'votes' | 'views' | 'unanswered';
    authorId?: string;
    dateRange?: {
        start: string;
        end: string;
    };
}

export interface PrototypeFilters {
    searchTerm: string;
    selectedTag: string;
    sortBy: 'newest' | 'likes' | 'views';
    status?: 'live' | 'development' | 'archived';
    technology?: string;
    authorId?: string;
}

export interface ProtoHubState {
    questions: Question[];
    prototypes: Prototype[];
    currentUser: User | null;
    questionFilters: QuestionFilters;
    prototypeFilters: PrototypeFilters;
    selectedQuestion: Question | null;
    selectedPrototype: Prototype | null;
    isLoading: boolean;
    error: string | null;
}

export interface QuestionFormData {
    title: string;
    content: string;
    tags: string[];
}

export interface PrototypeFormData {
    title: string;
    description: string;
    githubPagesUrl: string;
    githubRepoUrl?: string;
    tags: string[];
    technologies: string[];
    status: 'live' | 'development' | 'archived';
}

export interface ValidationResult {
    isValid: boolean;
    errors: string[];
    warnings: string[];
}

export interface AnalyticsEvent {
    event: string;
    userId?: string;
    questionId?: string;
    prototypeId?: string;
    answerId?: string;
    action?: string;
    metadata?: Record<string, any>;
    timestamp: string;
}

export interface AIResponse {
    questionId: string;
    content: string;
    confidence: number;
    suggestedTags: string[];
    relatedQuestions: string[];
}

export interface URLValidationResult {
    isValid: boolean;
    url: string;
    type: 'github-pages' | 'vercel' | 'netlify' | 'other';
    status: 'live' | 'error' | 'timeout';
    errorMessage?: string;
} 