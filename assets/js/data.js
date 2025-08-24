/* /assets/js/data.js */

// ===== DATA MANAGER =====
class DataManager {
    constructor() {
        this.data = null;
        this.loaded = false;
        this.loading = false;
        this.loadPromise = null;
    }

    async load() {
        if (this.loaded) return this.data;
        if (this.loading) return this.loadPromise;

        this.loading = true;
        this.loadPromise = this.fetchData();
        
        try {
            this.data = await this.loadPromise;
            this.loaded = true;
            this.loading = false;
            return this.data;
        } catch (error) {
            this.loading = false;
            throw error;
        }
    }

    async fetchData() {
        try {
            const response = await fetch('assets/data/mock.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error loading mock data:', error);
            // Return fallback data if JSON fails to load
            return this.getFallbackData();
        }
    }

    getFallbackData() {
        return {
            jobs: [],
            companies: [],
            users: [],
            applications: [],
            messages: [],
            categories: [
                { id: 'ai', name: 'AI & Machine Learning', icon: '🤖' },
                { id: 'blockchain', name: 'Blockchain', icon: '⛓️' },
                { id: 'automation', name: 'Automation', icon: '🔄' },
                { id: 'web', name: 'Web Development', icon: '🌐' },
                { id: 'mobile', name: 'Mobile Development', icon: '📱' },
                { id: 'devops', name: 'DevOps', icon: '⚙️' }
            ]
        };
    }

    // ===== JOB METHODS =====
    async getJobs(filters = {}) {
        const data = await this.load();
        let jobs = [...data.jobs];

        // Apply filters
        if (filters.category && filters.category !== 'all') {
            jobs = jobs.filter(job => job.category === filters.category);
        }

        if (filters.type && filters.type !== 'all') {
            jobs = jobs.filter(job => job.type === filters.type);
        }

        if (filters.remote !== undefined) {
            jobs = jobs.filter(job => job.remote === filters.remote);
        }

        if (filters.search) {
            const searchTerm = filters.search.toLowerCase();
            jobs = jobs.filter(job => 
                job.title.toLowerCase().includes(searchTerm) ||
                job.description.toLowerCase().includes(searchTerm) ||
                job.skills.some(skill => skill.toLowerCase().includes(searchTerm)) ||
                job.company.name.toLowerCase().includes(searchTerm)
            );
        }

        if (filters.minBudget) {
            jobs = jobs.filter(job => job.budget.min >= filters.minBudget);
        }

        if (filters.maxBudget) {
            jobs = jobs.filter(job => job.budget.max <= filters.maxBudget);
        }

        // Apply sorting
        if (filters.sort) {
            jobs = this.sortJobs(jobs, filters.sort);
        }

        // Apply pagination
        if (filters.page && filters.limit) {
            const start = (filters.page - 1) * filters.limit;
            const end = start + filters.limit;
            return {
                jobs: jobs.slice(start, end),
                total: jobs.length,
                page: filters.page,
                limit: filters.limit,
                totalPages: Math.ceil(jobs.length / filters.limit)
            };
        }

        return { jobs, total: jobs.length };
    }

    sortJobs(jobs, sortBy) {
        switch (sortBy) {
            case 'newest':
                return jobs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            case 'oldest':
                return jobs.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
            case 'budget-high':
                return jobs.sort((a, b) => b.budget.max - a.budget.max);
            case 'budget-low':
                return jobs.sort((a, b) => a.budget.max - b.budget.max);
            case 'title':
                return jobs.sort((a, b) => a.title.localeCompare(b.title));
            default:
                return jobs;
        }
    }

    async getJob(id) {
        const data = await this.load();
        return data.jobs.find(job => job.id === id);
    }

    async getFeaturedJobs(limit = 6) {
        const data = await this.load();
        return data.jobs
            .filter(job => job.featured)
            .slice(0, limit);
    }

    async getRecentJobs(limit = 10) {
        const data = await this.load();
        return data.jobs
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, limit);
    }

    async getRelatedJobs(jobId, limit = 4) {
        const data = await this.load();
        const job = data.jobs.find(j => j.id === jobId);
        if (!job) return [];

        return data.jobs
            .filter(j => j.id !== jobId && j.category === job.category)
            .slice(0, limit);
    }

    // ===== COMPANY METHODS =====
    async getCompanies() {
        const data = await this.load();
        return data.companies;
    }

    async getCompany(id) {
        const data = await this.load();
        return data.companies.find(company => company.id === id);
    }

    async getCompanyJobs(companyId) {
        const data = await this.load();
        return data.jobs.filter(job => job.company.id === companyId);
    }

    // ===== USER METHODS =====
    async getUsers() {
        const data = await this.load();
        return data.users;
    }

    async getUser(id) {
        const data = await this.load();
        return data.users.find(user => user.id === id);
    }

    async getDevelopers(filters = {}) {
        const data = await this.load();
        let developers = data.users.filter(user => user.type === 'developer');

        if (filters.skills && filters.skills.length > 0) {
            developers = developers.filter(dev => 
                filters.skills.some(skill => 
                    dev.skills.some(devSkill => 
                        devSkill.name.toLowerCase().includes(skill.toLowerCase())
                    )
                )
            );
        }

        if (filters.available !== undefined) {
            developers = developers.filter(dev => dev.available === filters.available);
        }

        return developers;
    }

    // ===== APPLICATION METHODS =====
    async getApplications(filters = {}) {
        const data = await this.load();
        let applications = [...data.applications];

        if (filters.jobId) {
            applications = applications.filter(app => app.jobId === filters.jobId);
        }

        if (filters.userId) {
            applications = applications.filter(app => app.userId === filters.userId);
        }

        if (filters.status) {
            applications = applications.filter(app => app.status === filters.status);
        }

        return applications;
    }

    async getApplication(id) {
        const data = await this.load();
        return data.applications.find(app => app.id === id);
    }

    // ===== MESSAGE METHODS =====
    async getMessages(filters = {}) {
        const data = await this.load();
        let messages = [...data.messages];

        if (filters.conversationId) {
            messages = messages.filter(msg => msg.conversationId === filters.conversationId);
        }

        if (filters.userId) {
            messages = messages.filter(msg => 
                msg.senderId === filters.userId || msg.receiverId === filters.userId
            );
        }

        return messages.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    }

    async getConversations(userId) {
        const data = await this.load();
        const userMessages = data.messages.filter(msg => 
            msg.senderId === userId || msg.receiverId === userId
        );

        const conversationMap = new Map();
        
        userMessages.forEach(msg => {
            const otherId = msg.senderId === userId ? msg.receiverId : msg.senderId;
            const key = `${Math.min(userId, otherId)}-${Math.max(userId, otherId)}`;
            
            if (!conversationMap.has(key)) {
                conversationMap.set(key, {
                    id: key,
                    participants: [userId, otherId],
                    lastMessage: msg,
                    messages: []
                });
            }
            
            const conversation = conversationMap.get(key);
            conversation.messages.push(msg);
            
            if (new Date(msg.createdAt) > new Date(conversation.lastMessage.createdAt)) {
                conversation.lastMessage = msg;
            }
        });

        return Array.from(conversationMap.values())
            .sort((a, b) => new Date(b.lastMessage.createdAt) - new Date(a.lastMessage.createdAt));
    }

    // ===== CATEGORY METHODS =====
    async getCategories() {
        const data = await this.load();
        return data.categories;
    }

    async getCategory(id) {
        const data = await this.load();
        return data.categories.find(cat => cat.id === id);
    }

    // ===== STATISTICS METHODS =====
    async getStats() {
        const data = await this.load();
        
        return {
            totalJobs: data.jobs.length,
            activeJobs: data.jobs.filter(job => job.status === 'active').length,
            totalCompanies: data.companies.length,
            totalDevelopers: data.users.filter(user => user.type === 'developer').length,
            totalApplications: data.applications.length,
            averageBudget: this.calculateAverageBudget(data.jobs),
            jobsByCategory: this.getJobsByCategory(data.jobs, data.categories),
            recentActivity: this.getRecentActivity(data)
        };
    }

    calculateAverageBudget(jobs) {
        if (jobs.length === 0) return 0;
        
        const totalBudget = jobs.reduce((sum, job) => {
            return sum + ((job.budget.min + job.budget.max) / 2);
        }, 0);
        
        return Math.round(totalBudget / jobs.length);
    }

    getJobsByCategory(jobs, categories) {
        const categoryStats = {};
        
        categories.forEach(cat => {
            categoryStats[cat.id] = {
                name: cat.name,
                count: jobs.filter(job => job.category === cat.id).length
            };
        });
        
        return categoryStats;
    }

    getRecentActivity(data) {
        const activities = [];
        
        // Add recent jobs
        data.jobs
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, 5)
            .forEach(job => {
                activities.push({
                    type: 'job_posted',
                    timestamp: job.createdAt,
                    data: job
                });
            });
        
        // Add recent applications
        data.applications
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, 5)
            .forEach(app => {
                activities.push({
                    type: 'application_submitted',
                    timestamp: app.createdAt,
                    data: app
                });
            });
        
        return activities
            .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
            .slice(0, 10);
    }

    // ===== SEARCH METHODS =====
    async search(query, type = 'all') {
        const data = await this.load();
        const results = {
            jobs: [],
            companies: [],
            developers: []
        };

        const searchTerm = query.toLowerCase();

        if (type === 'all' || type === 'jobs') {
            results.jobs = data.jobs.filter(job =>
                job.title.toLowerCase().includes(searchTerm) ||
                job.description.toLowerCase().includes(searchTerm) ||
                job.skills.some(skill => skill.toLowerCase().includes(searchTerm)) ||
                job.company.name.toLowerCase().includes(searchTerm)
            );
        }

        if (type === 'all' || type === 'companies') {
            results.companies = data.companies.filter(company =>
                company.name.toLowerCase().includes(searchTerm) ||
                company.description.toLowerCase().includes(searchTerm)
            );
        }

        if (type === 'all' || type === 'developers') {
            results.developers = data.users
                .filter(user => user.type === 'developer')
                .filter(dev =>
                    dev.name.toLowerCase().includes(searchTerm) ||
                    dev.title.toLowerCase().includes(searchTerm) ||
                    dev.bio.toLowerCase().includes(searchTerm) ||
                    dev.skills.some(skill => skill.name.toLowerCase().includes(searchTerm))
                );
        }

        return results;
    }
}

// ===== SAVED JOBS MANAGER =====
class SavedJobsManager {
    constructor() {
        this.storageKey = 'savedJobs';
    }

    getSavedJobs() {
        return StorageUtils.get(this.storageKey, []);
    }

    saveJob(jobId) {
        const savedJobs = this.getSavedJobs();
        if (!savedJobs.includes(jobId)) {
            savedJobs.push(jobId);
            StorageUtils.set(this.storageKey, savedJobs);
            return true;
        }
        return false;
    }

    unsaveJob(jobId) {
        const savedJobs = this.getSavedJobs();
        const index = savedJobs.indexOf(jobId);
        if (index > -1) {
            savedJobs.splice(index, 1);
            StorageUtils.set(this.storageKey, savedJobs);
            return true;
        }
        return false;
    }

    isJobSaved(jobId) {
        return this.getSavedJobs().includes(jobId);
    }

    toggleSaveJob(jobId) {
        if (this.isJobSaved(jobId)) {
            this.unsaveJob(jobId);
            return false;
        } else {
            this.saveJob(jobId);
            return true;
        }
    }

    async getSavedJobsData() {
        const savedJobIds = this.getSavedJobs();
        if (savedJobIds.length === 0) return [];

        const dataManager = new DataManager();
        const data = await dataManager.load();
        
        return data.jobs.filter(job => savedJobIds.includes(job.id));
    }
}

// ===== USER SESSION MANAGER =====
class UserSessionManager {
    constructor() {
        this.storageKey = 'userSession';
        this.user = null;
        this.loadSession();
    }

    loadSession() {
        const session = StorageUtils.get(this.storageKey);
        if (session && session.expiresAt > Date.now()) {
            this.user = session.user;
        } else {
            this.clearSession();
        }
    }

    login(userData, rememberMe = false) {
        const expiresAt = rememberMe ? 
            Date.now() + (30 * 24 * 60 * 60 * 1000) : // 30 days
            Date.now() + (24 * 60 * 60 * 1000); // 24 hours

        const session = {
            user: userData,
            expiresAt,
            loginTime: Date.now()
        };

        StorageUtils.set(this.storageKey, session);
        this.user = userData;
        
        return true;
    }

    logout() {
        this.clearSession();
        this.user = null;
    }

    clearSession() {
        StorageUtils.remove(this.storageKey);
    }

    isLoggedIn() {
        return this.user !== null;
    }

    getUser() {
        return this.user;
    }

    updateUser(updates) {
        if (!this.user) return false;

        this.user = { ...this.user, ...updates };
        const session = StorageUtils.get(this.storageKey);
        if (session) {
            session.user = this.user;
            StorageUtils.set(this.storageKey, session);
        }
        
        return true;
    }
}

// ===== GLOBAL INSTANCES =====
const dataManager = new DataManager();
const savedJobsManager = new SavedJobsManager();
const userSessionManager = new UserSessionManager();

// ===== EXPORT FOR MODULE USAGE =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        DataManager,
        SavedJobsManager,
        UserSessionManager,
        dataManager,
        savedJobsManager,
        userSessionManager
    };
} 