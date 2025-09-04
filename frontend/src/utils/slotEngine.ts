import DeveloperTracker from './developerTracker';

export interface ProjectSchema {
    title: string;
    description: string;
    category: string;
    targetAudience: string;
    key_features: string;
    technologyStack: string;
    budget: string;
    timeline: string;
    successCriteria: string;
    potentialChallenges: string;
    developerRef?: string; // Add developer reference to project schema
}

interface Slot {
    name: string;
    value: string;
    question: string;
}

class SlotEngine {
    private slots: Slot[];
    private currentSlotIndex: number;
    private developerTracker: DeveloperTracker;

    constructor() {
        this.developerTracker = DeveloperTracker.getInstance();
        this.slots = [
            { name: 'title', value: '', question: 'What is the title of your project?' },
            { name: 'description', value: '', question: 'Can you describe the project responsibilities and requirements?' },
            { name: 'category', value: '', question: 'What category does your project fall under? (e.g., AI & Machine Learning, Blockchain, Automation, etc.)' },
            { name: 'targetAudience', value: '', question: 'Who is the target audience for this project?' },
            { name: 'key_features', value: '', question: 'What are the key features or functionalities you want to include?' },
            { name: 'technologyStack', value: '', question: 'What technology stack do you plan to use? (e.g., React, Node.js, Python)' },
            { name: 'budget', value: '', question: 'What is your estimated budget for this project?' },
            { name: 'timeline', value: '', question: 'What is your expected timeline for project completion?' },
            { name: 'successCriteria', value: '', question: 'What criteria will you use to measure the success of this project?' },
            { name: 'potentialChallenges', value: '', question: 'What potential challenges or risks do you foresee?' }
        ];
        this.currentSlotIndex = 0;
    }

    // Initialize session with developer reference
    initSession(developerRef?: string): void {
        if (developerRef) {
            // Store developer reference for later use
            localStorage.setItem('current_developer_ref', developerRef);
        }
    }

    getCurrentQuestion(): string {
        if (this.currentSlotIndex < this.slots.length) {
            return this.slots[this.currentSlotIndex].question;
        }
        return 'All slots are filled.';
    }

    fillSlot(value: string): void {
        if (this.currentSlotIndex < this.slots.length) {
            console.log(`Filling slot: ${this.slots[this.currentSlotIndex].name} with value: ${value}`);
            this.slots[this.currentSlotIndex].value = value;
            this.currentSlotIndex++;
            console.log(`Current slot index is now: ${this.currentSlotIndex}`);
        } else {
            console.warn('Attempted to fill a slot that is out of bounds.');
        }
    }

    isComplete(): boolean {
        const complete = this.currentSlotIndex >= this.slots.length;
        console.log(`Checking if complete: ${complete}`);
        return complete;
    }

    getSlotData(): ProjectSchema {
        const slotData = this.slots.reduce((acc, slot) => {
            acc[slot.name as keyof ProjectSchema] = slot.value;
            return acc;
        }, {} as ProjectSchema);

        // Add developer reference if available
        const developerRef = this.developerTracker.getDeveloperRef();
        if (developerRef) {
            slotData.developerRef = developerRef.developerId;
        }

        return slotData;
    }

    getCurrentSlotIndex(): number {
        return this.currentSlotIndex;
    }

    setCurrentSlotIndex(index: number): void {
        this.currentSlotIndex = index;
    }

    // Get current slot name for analytics
    getCurrentSlotName(): string {
        if (this.currentSlotIndex < this.slots.length) {
            return this.slots[this.currentSlotIndex].name;
        }
        return 'complete';
    }
}

export default SlotEngine; 