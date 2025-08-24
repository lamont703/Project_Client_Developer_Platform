/* /assets/js/components.js */

// ===== JOB CARD COMPONENT =====
class JobCard {
    constructor(job, options = {}) {
        this.job = job;
        this.options = {
            showSaveButton: true,
            clickable: true,
            compact: false,
            ...options
        };
    }

    render() {
        const savedClass = savedJobsManager.isJobSaved(this.job.id) ? 'active' : '';
        const clickableClass = this.options.clickable ? 'cursor-pointer' : '';
        const compactClass = this.options.compact ? 'job-card-compact' : '';

        return `
            <div class="job-card ${clickableClass} ${compactClass}" data-job-id="${this.job.id}">
                ${this.options.showSaveButton ? `
                    <button class="job-card-saved ${savedClass}" 
                            data-job-id="${this.job.id}" 
                            aria-label="${savedClass ? 'Unsave job' : 'Save job'}">
                        ${savedClass ? '❤️' : '🤍'}
                    </button>
                ` : ''}
                
                <div class="job-card-header">
                    <div>
                        <div class="job-card-company">
                            <div class="job-card-logo">
                                ${this.job.company.logo || this.job.company.name.charAt(0)}
                            </div>
                            <span class="text-sm text-muted">${this.job.company.name}</span>
                        </div>
                        <h3 class="job-card-title">${this.job.title}</h3>
                    </div>
                </div>

                <div class="job-card-meta">
                    <span>📍 ${this.job.location || (this.job.remote ? 'Remote' : 'Location TBD')}</span>
                    <span>💼 ${this.formatJobType(this.job.type)}</span>
                    <span>⏰ ${this.formatTimeAgo(this.job.createdAt)}</span>
                </div>

                <p class="job-card-description">${this.job.description}</p>

                <div class="job-card-skills">
                    ${this.job.skills.slice(0, 4).map(skill => 
                        `<span class="tag">${skill}</span>`
                    ).join('')}
                    ${this.job.skills.length > 4 ? 
                        `<span class="tag tag-muted">+${this.job.skills.length - 4} more</span>` : ''}
                </div>

                <div class="job-card-footer">
                    <div class="job-card-budget">
                        ${this.formatBudget(this.job.budget)}
                    </div>
                    <div class="job-card-actions">
                        ${this.job.urgent ? '<span class="tag tag-error">Urgent</span>' : ''}
                        ${this.job.featured ? '<span class="tag tag-primary">Featured</span>' : ''}
                    </div>
                </div>
            </div>
        `;
    }

    formatJobType(type) {
        const types = {
            'full-time': 'Full Time',
            'part-time': 'Part Time',
            'contract': 'Contract',
            'freelance': 'Freelance',
            'internship': 'Internship'
        };
        return types[type] || type;
    }

    formatBudget(budget) {
        if (budget.type === 'fixed') {
            return `$${budget.amount.toLocaleString()}`;
        } else {
            return `$${budget.min.toLocaleString()} - $${budget.max.toLocaleString()}`;
        }
    }

    formatTimeAgo(dateString) {
        const date = new Date(dateString);
        const now = new Date();
        const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
        
        if (diffInHours < 1) return 'Just now';
        if (diffInHours < 24) return `${diffInHours}h ago`;
        
        const diffInDays = Math.floor(diffInHours / 24);
        if (diffInDays < 7) return `${diffInDays}d ago`;
        
        const diffInWeeks = Math.floor(diffInDays / 7);
        if (diffInWeeks < 4) return `${diffInWeeks}w ago`;
        
        return date.toLocaleDateString();
    }

    static bindEvents(container) {
        // Handle save button clicks
        container.addEventListener('click', (e) => {
            if (e.target.classList.contains('job-card-saved')) {
                e.stopPropagation();
                const jobId = e.target.dataset.jobId;
                const isSaved = savedJobsManager.toggleSaveJob(jobId);
                
                e.target.classList.toggle('active', isSaved);
                e.target.innerHTML = isSaved ? '❤️' : '🤍';
                e.target.setAttribute('aria-label', isSaved ? 'Unsave job' : 'Save job');
                
                if (toastManager) {
                    toastManager.success(isSaved ? 'Job saved!' : 'Job removed from saved');
                }
            }
        });

        // Handle job card clicks
        container.addEventListener('click', (e) => {
            const jobCard = e.target.closest('.job-card[data-job-id]');
            if (jobCard && !e.target.closest('.job-card-saved')) {
                const jobId = jobCard.dataset.jobId;
                window.location.href = `job-detail.html?id=${jobId}`;
            }
        });
    }
}

// ===== DEVELOPER CARD COMPONENT =====
class DeveloperCard {
    constructor(developer, options = {}) {
        this.developer = developer;
        this.options = {
            showContact: true,
            compact: false,
            ...options
        };
    }

    render() {
        const compactClass = this.options.compact ? 'dev-card-compact' : '';
        
        return `
            <div class="card dev-card ${compactClass}" data-dev-id="${this.developer.id}">
                <div class="dev-card-header">
                    <div class="dev-card-avatar">
                        ${this.developer.avatar ? 
                            `<img src="${this.developer.avatar}" alt="${this.developer.name}">` :
                            `<div class="avatar-placeholder">${this.developer.name.charAt(0)}</div>`
                        }
                        ${this.developer.available ? 
                            '<span class="availability-indicator available" title="Available for work"></span>' :
                            '<span class="availability-indicator busy" title="Not available"></span>'
                        }
                    </div>
                    <div class="dev-card-info">
                        <h3 class="dev-card-name">${this.developer.name}</h3>
                        <p class="dev-card-title">${this.developer.title}</p>
                        <div class="dev-card-location">
                            📍 ${this.developer.location}
                        </div>
                    </div>
                </div>

                <p class="dev-card-bio">${this.developer.bio}</p>

                <div class="dev-card-skills">
                    ${this.developer.skills.slice(0, 6).map(skill => 
                        `<span class="tag" title="${skill.name} - ${skill.level}">${skill.name}</span>`
                    ).join('')}
                    ${this.developer.skills.length > 6 ? 
                        `<span class="tag tag-muted">+${this.developer.skills.length - 6} more</span>` : ''}
                </div>

                <div class="dev-card-stats">
                    <div class="stat">
                        <span class="stat-value">${this.developer.rating}</span>
                        <span class="stat-label">Rating</span>
                    </div>
                    <div class="stat">
                        <span class="stat-value">${this.developer.completedJobs}</span>
                        <span class="stat-label">Jobs</span>
                    </div>
                    <div class="stat">
                        <span class="stat-value">$${this.developer.hourlyRate}</span>
                        <span class="stat-label">/hour</span>
                    </div>
                </div>

                ${this.options.showContact ? `
                    <div class="dev-card-actions">
                        <button class="btn btn-primary btn-sm" data-action="contact" data-dev-id="${this.developer.id}">
                            Contact
                        </button>
                        <button class="btn btn-outline btn-sm" data-action="view-profile" data-dev-id="${this.developer.id}">
                            View Profile
                        </button>
                    </div>
                ` : ''}
            </div>
        `;
    }

    static bindEvents(container) {
        container.addEventListener('click', (e) => {
            const action = e.target.dataset.action;
            const devId = e.target.dataset.devId;
            
            if (action === 'contact') {
                // Open contact modal or navigate to messaging
                window.location.href = `messaging.html?user=${devId}`;
            } else if (action === 'view-profile') {
                window.location.href = `developer-profile.html?id=${devId}`;
            }
        });
    }
}

// ===== TABS COMPONENT =====
class Tabs {
    constructor(container, options = {}) {
        this.container = typeof container === 'string' ? 
            document.querySelector(container) : container;
        this.options = {
            activeClass: 'active',
            ...options
        };
        this.init();
    }

    init() {
        if (!this.container) return;

        this.tabButtons = this.container.querySelectorAll('.tab-button');
        this.tabPanes = this.container.querySelectorAll('.tab-pane');

        this.bindEvents();
        this.setActiveTab(0); // Set first tab as active by default
    }

    bindEvents() {
        this.tabButtons.forEach((button, index) => {
            button.addEventListener('click', () => {
                this.setActiveTab(index);
            });

            button.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
                    e.preventDefault();
                    const direction = e.key === 'ArrowLeft' ? -1 : 1;
                    const newIndex = (index + direction + this.tabButtons.length) % this.tabButtons.length;
                    this.setActiveTab(newIndex);
                    this.tabButtons[newIndex].focus();
                }
            });
        });
    }

    setActiveTab(index) {
        // Remove active class from all tabs and panes
        this.tabButtons.forEach(button => {
            button.classList.remove(this.options.activeClass);
            button.setAttribute('aria-selected', 'false');
            button.setAttribute('tabindex', '-1');
        });
        
        this.tabPanes.forEach(pane => {
            pane.classList.remove(this.options.activeClass);
        });

        // Add active class to selected tab and pane
        if (this.tabButtons[index] && this.tabPanes[index]) {
            this.tabButtons[index].classList.add(this.options.activeClass);
            this.tabButtons[index].setAttribute('aria-selected', 'true');
            this.tabButtons[index].setAttribute('tabindex', '0');
            
            this.tabPanes[index].classList.add(this.options.activeClass);
        }

        // Trigger custom event
        this.container.dispatchEvent(new CustomEvent('tabchange', {
            detail: { index, button: this.tabButtons[index], pane: this.tabPanes[index] }
        }));
    }

    getActiveTab() {
        return Array.from(this.tabButtons).findIndex(button => 
            button.classList.contains(this.options.activeClass)
        );
    }
}

// ===== DROPDOWN COMPONENT =====
class Dropdown {
    constructor(container, options = {}) {
        this.container = typeof container === 'string' ? 
            document.querySelector(container) : container;
        this.options = {
            closeOnSelect: true,
            ...options
        };
        this.isOpen = false;
        this.init();
    }

    init() {
        if (!this.container) return;

        this.toggle = this.container.querySelector('.dropdown-toggle');
        this.menu = this.container.querySelector('.dropdown-menu');
        this.items = this.container.querySelectorAll('.dropdown-item');

        this.bindEvents();
    }

    bindEvents() {
        // Toggle dropdown
        this.toggle.addEventListener('click', (e) => {
            e.preventDefault();
            this.isOpen ? this.close() : this.open();
        });

        // Handle item selection
        this.items.forEach(item => {
            item.addEventListener('click', (e) => {
                this.selectItem(item);
                if (this.options.closeOnSelect) {
                    this.close();
                }
            });
        });

        // Close on outside click
        document.addEventListener('click', (e) => {
            if (!this.container.contains(e.target)) {
                this.close();
            }
        });

        // Handle keyboard navigation
        this.container.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.close();
                this.toggle.focus();
            } else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
                e.preventDefault();
                this.navigateItems(e.key === 'ArrowDown' ? 1 : -1);
            }
        });
    }

    open() {
        this.container.classList.add('active');
        this.isOpen = true;
        this.toggle.setAttribute('aria-expanded', 'true');
        
        // Focus first item
        if (this.items.length > 0) {
            this.items[0].focus();
        }
    }

    close() {
        this.container.classList.remove('active');
        this.isOpen = false;
        this.toggle.setAttribute('aria-expanded', 'false');
    }

    selectItem(item) {
        // Remove active class from all items
        this.items.forEach(i => i.classList.remove('active'));
        
        // Add active class to selected item
        item.classList.add('active');

        // Update toggle text if it has a text element
        const toggleText = this.toggle.querySelector('.dropdown-text');
        if (toggleText) {
            toggleText.textContent = item.textContent;
        }

        // Trigger custom event
        this.container.dispatchEvent(new CustomEvent('select', {
            detail: { item, value: item.dataset.value || item.textContent }
        }));
    }

    navigateItems(direction) {
        const focusedIndex = Array.from(this.items).findIndex(item => 
            document.activeElement === item
        );
        
        let newIndex = focusedIndex + direction;
        
        if (newIndex < 0) newIndex = this.items.length - 1;
        if (newIndex >= this.items.length) newIndex = 0;
        
        this.items[newIndex].focus();
    }
}

// ===== STEPPER COMPONENT =====
class Stepper {
    constructor(container, options = {}) {
        this.container = typeof container === 'string' ? 
            document.querySelector(container) : container;
        this.options = {
            allowSkip: false,
            ...options
        };
        this.currentStep = 0;
        this.init();
    }

    init() {
        if (!this.container) return;

        this.steps = this.container.querySelectorAll('.step');
        this.updateDisplay();
    }

    next() {
        if (this.currentStep < this.steps.length - 1) {
            this.currentStep++;
            this.updateDisplay();
            return true;
        }
        return false;
    }

    previous() {
        if (this.currentStep > 0) {
            this.currentStep--;
            this.updateDisplay();
            return true;
        }
        return false;
    }

    goTo(stepIndex) {
        if (stepIndex >= 0 && stepIndex < this.steps.length) {
            if (this.options.allowSkip || stepIndex <= this.currentStep + 1) {
                this.currentStep = stepIndex;
                this.updateDisplay();
                return true;
            }
        }
        return false;
    }

    updateDisplay() {
        this.steps.forEach((step, index) => {
            step.classList.remove('active', 'completed');
            
            if (index < this.currentStep) {
                step.classList.add('completed');
            } else if (index === this.currentStep) {
                step.classList.add('active');
            }
        });

        // Trigger custom event
        this.container.dispatchEvent(new CustomEvent('stepchange', {
            detail: { 
                currentStep: this.currentStep, 
                step: this.steps[this.currentStep],
                totalSteps: this.steps.length
            }
        }));
    }

    getCurrentStep() {
        return this.currentStep;
    }

    getTotalSteps() {
        return this.steps.length;
    }

    isLastStep() {
        return this.currentStep === this.steps.length - 1;
    }

    isFirstStep() {
        return this.currentStep === 0;
    }
}

// ===== PAGINATION COMPONENT =====
class Pagination {
    constructor(container, options = {}) {
        this.container = typeof container === 'string' ? 
            document.querySelector(container) : container;
        this.options = {
            totalPages: 1,
            currentPage: 1,
            maxVisible: 5,
            showFirstLast: true,
            showPrevNext: true,
            ...options
        };
        this.init();
    }

    init() {
        if (!this.container) return;
        this.render();
        this.bindEvents();
    }

    render() {
        const { currentPage, totalPages, maxVisible, showFirstLast, showPrevNext } = this.options;
        
        let html = '<div class="pagination">';

        // Previous button
        if (showPrevNext) {
            html += `
                <button class="pagination-item" 
                        data-page="${currentPage - 1}" 
                        ${currentPage <= 1 ? 'disabled' : ''}>
                    ‹
                </button>
            `;
        }

        // First page
        if (showFirstLast && currentPage > Math.ceil(maxVisible / 2) + 1) {
            html += `<button class="pagination-item" data-page="1">1</button>`;
            if (currentPage > Math.ceil(maxVisible / 2) + 2) {
                html += `<span class="pagination-ellipsis">…</span>`;
            }
        }

        // Page numbers
        const startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
        const endPage = Math.min(totalPages, startPage + maxVisible - 1);

        for (let i = startPage; i <= endPage; i++) {
            html += `
                <button class="pagination-item ${i === currentPage ? 'active' : ''}" 
                        data-page="${i}">
                    ${i}
                </button>
            `;
        }

        // Last page
        if (showFirstLast && currentPage < totalPages - Math.floor(maxVisible / 2)) {
            if (currentPage < totalPages - Math.floor(maxVisible / 2) - 1) {
                html += `<span class="pagination-ellipsis">…</span>`;
            }
            html += `<button class="pagination-item" data-page="${totalPages}">${totalPages}</button>`;
        }

        // Next button
        if (showPrevNext) {
            html += `
                <button class="pagination-item" 
                        data-page="${currentPage + 1}" 
                        ${currentPage >= totalPages ? 'disabled' : ''}>
                    ›
                </button>
            `;
        }

        html += '</div>';
        this.container.innerHTML = html;
    }

    bindEvents() {
        this.container.addEventListener('click', (e) => {
            if (e.target.classList.contains('pagination-item') && !e.target.disabled) {
                const page = parseInt(e.target.dataset.page);
                this.goToPage(page);
            }
        });
    }

    goToPage(page) {
        if (page >= 1 && page <= this.options.totalPages && page !== this.options.currentPage) {
            this.options.currentPage = page;
            this.render();
            
            // Trigger custom event
            this.container.dispatchEvent(new CustomEvent('pagechange', {
                detail: { page, totalPages: this.options.totalPages }
            }));
        }
    }

    updateOptions(newOptions) {
        this.options = { ...this.options, ...newOptions };
        this.render();
    }
}

// ===== SEARCH COMPONENT =====
class SearchComponent {
    constructor(container, options = {}) {
        this.container = typeof container === 'string' ? 
            document.querySelector(container) : container;
        this.options = {
            placeholder: 'Search...',
            debounceMs: 300,
            minLength: 2,
            ...options
        };
        this.init();
    }

    init() {
        if (!this.container) return;

        this.input = this.container.querySelector('.search-input');
        this.clearButton = this.container.querySelector('.search-clear');
        
        if (!this.input) {
            this.createInput();
        }

        this.bindEvents();
    }

    createInput() {
        this.container.innerHTML = `
            <div class="search-bar">
                <span class="search-icon">🔍</span>
                <input type="text" 
                       class="search-input" 
                       placeholder="${this.options.placeholder}"
                       autocomplete="off">
                <button class="search-clear hidden" aria-label="Clear search">&times;</button>
            </div>
        `;
        
        this.input = this.container.querySelector('.search-input');
        this.clearButton = this.container.querySelector('.search-clear');
    }

    bindEvents() {
        // Debounced search
        const debouncedSearch = debounce((value) => {
            this.performSearch(value);
        }, this.options.debounceMs);

        this.input.addEventListener('input', (e) => {
            const value = e.target.value.trim();
            
            // Show/hide clear button
            this.clearButton.classList.toggle('hidden', value === '');
            
            // Perform search if meets minimum length
            if (value === '' || value.length >= this.options.minLength) {
                debouncedSearch(value);
            }
        });

        // Clear search
        if (this.clearButton) {
            this.clearButton.addEventListener('click', () => {
                this.clear();
            });
        }

        // Handle enter key
        this.input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                this.performSearch(this.input.value.trim());
            }
        });
    }

    performSearch(query) {
        // Trigger custom event
        this.container.dispatchEvent(new CustomEvent('search', {
            detail: { query }
        }));
    }

    clear() {
        this.input.value = '';
        this.clearButton.classList.add('hidden');
        this.performSearch('');
        this.input.focus();
    }

    setValue(value) {
        this.input.value = value;
        this.clearButton.classList.toggle('hidden', value === '');
    }

    getValue() {
        return this.input.value.trim();
    }
}

// ===== EXPORT FOR MODULE USAGE =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        JobCard,
        DeveloperCard,
        Tabs,
        Dropdown,
        Stepper,
        Pagination,
        SearchComponent
    };
} 