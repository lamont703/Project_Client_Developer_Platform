import { ProjectSchema } from './slotEngine';

export class Generators {
    static generateTitle(projectData: ProjectSchema): string {
        return `Project: ${projectData.title}`;
    }

    static generateDescription(projectData: ProjectSchema): string {
        return `Description: ${projectData.description}`;
    }

    static generateSkills(projectData: ProjectSchema): string[] {
        // Example skills based on category
        switch (projectData.category.toLowerCase()) {
            case 'ai & machine learning':
                return ['Python', 'TensorFlow', 'Machine Learning'];
            case 'blockchain':
                return ['Solidity', 'Ethereum', 'Smart Contracts'];
            case 'automation':
                return ['Selenium', 'CI/CD', 'Python'];
            case 'web development':
                return ['React', 'Node.js', 'CSS'];
            case 'mobile development':
                return ['Flutter', 'React Native', 'Swift'];
            case 'devops':
                return ['Docker', 'Kubernetes', 'AWS'];
            default:
                return ['General Skills'];
        }
    }

    static suggestMilestones(projectData: ProjectSchema): string[] {
        return [
            'Milestone 1: Initial Setup',
            'Milestone 2: Development Phase',
            'Milestone 3: Testing and QA',
            'Milestone 4: Deployment'
        ];
    }

    static estimateBudgetTimeline(projectData: ProjectSchema): { budget: string, timeline: string } {
        return {
            budget: projectData.budget || '$5000 - $10000',
            timeline: projectData.timeline || '3 - 6 months'
        };
    }

    static generateSummary(projectData: ProjectSchema): string {
        return `Title: ${projectData.title}
Description: ${projectData.description}
Category: ${projectData.category}
Target Audience: ${projectData.targetAudience}
Key Features: ${projectData.key_features}
Technology Stack: ${projectData.technologyStack}
Budget: ${projectData.budget}
Timeline: ${projectData.timeline}
Success Criteria: ${projectData.successCriteria}
Potential Challenges: ${projectData.potentialChallenges}`;
    }
} 