export interface ProjectSchema {
    title: string;
    description: string;
    category: string;
}

interface Slot {
    name: string;
    value: string;
    question: string;
}

class SlotEngine {
    private slots: Slot[];
    private currentSlotIndex: number;

    constructor() {
        this.slots = [
            { name: 'title', value: '', question: 'What is the title of your project?' },
            { name: 'description', value: '', question: 'Can you describe the project responsibilities and requirements?' },
            { name: 'category', value: '', question: 'What category does your project fall under? (e.g., AI & Machine Learning, Blockchain, Automation, etc.)' }
        ];
        this.currentSlotIndex = 0;
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
        return this.slots.reduce((acc, slot) => {
            acc[slot.name as keyof ProjectSchema] = slot.value;
            return acc;
        }, {} as ProjectSchema);
    }

    getCurrentSlotIndex(): number {
        return this.currentSlotIndex;
    }

    setCurrentSlotIndex(index: number): void {
        this.currentSlotIndex = index;
    }
}

export default SlotEngine; 