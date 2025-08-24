// AI Project Assistant Logic
class AIAssistant {
    constructor() {
        this.slots = {
            projectType: null,
            goal: '',
            deliverables: [],
            integrations: [],
            platforms: [],
            techStack: [],
            constraints: [],
            timeline: null,
            budgetModel: null,
            budgetRange: { min: 0, max: 0 },
            successCriteria: [],
            extraContext: ''
        };
        this.state = 'initial';
    }

    startConversation() {
        this.state = 'collecting';
        this.askNextQuestion();
    }

    askNextQuestion() {
        // Determine the next question based on unfilled slots
        // Example logic for asking questions
        if (!this.slots.projectType) {
            this.displayMessage('assistant', 'What type of project are you working on?');
            // Provide quick-reply options
        } else if (!this.slots.goal) {
            this.displayMessage('assistant', 'What is the main goal of your project?');
        } else {
            this.finalizeDraft();
        }
    }

    displayMessage(role, text) {
        const message = document.createElement('div');
        message.className = `chat-message ${role}`;
        message.innerHTML = `<div class="message-bubble ${role}">${text}</div>`;
        document.querySelector('.chat-transcript').appendChild(message);
    }

    finalizeDraft() {
        this.state = 'finalizing';
        this.displayMessage('assistant', 'I’ve drafted your post. Want to review or add milestones?');
        // Generate draft and display options
    }

    // Generator functions
    generateTitle() {
        return `Project: ${this.slots.projectType}`;
    }

    generateDescription() {
        return `Overview: ${this.slots.goal}`;
    }

    generateSkills() {
        return this.slots.techStack.join(', ');
    }

    suggestMilestones() {
        return ['Discovery', 'Prototype', 'Build', 'Test', 'Launch'];
    }

    estimateBudgetTimeline() {
        return { budgetMin: 1000, budgetMax: 5000, weeks: 4 };
    }

    computeCompleteness() {
        const filledSlots = Object.values(this.slots).filter(slot => slot).length;
        return Math.round((filledSlots / Object.keys(this.slots).length) * 100);
    }
}

// Initialize AI Assistant
const aiAssistant = new AIAssistant();
document.addEventListener('DOMContentLoaded', () => {
    aiAssistant.startConversation();
}); 