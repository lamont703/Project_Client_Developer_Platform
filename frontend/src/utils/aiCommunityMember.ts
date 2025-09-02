import { Question, Answer, AIResponse, User } from './protoHubTypes';

export class AICommunityMember {
    private static instance: AICommunityMember;
    private aiUser: User = {
        id: 'ai_protobot',
        name: 'ProtoBot',
        avatar: '🤖',
        reputation: 1250,
        isAI: true,
        joinDate: '2024-01-01T00:00:00Z',
        questionsAsked: 0,
        answersProvided: 0,
        prototypesShared: 0
    };

    private responseTemplates = {
        welcome: [
            "Hey there! 👋 I'm ProtoBot, your AI community member. I'm here to help with your prototyping questions and share insights from the community.",
            "Welcome to Proto Hub! I'm ProtoBot, and I love helping developers bring their ideas to life. What can I help you with today?",
            "Hi! I'm ProtoBot, your friendly AI assistant in the Proto Hub community. I'm excited to help you with your prototyping journey!"
        ],
        questionAnalysis: [
            "Great question! Let me break this down for you...",
            "This is a common challenge in prototyping. Here's what I think...",
            "Interesting approach! Let me share some insights on this...",
            "I've seen similar questions in the community. Here's my take..."
        ],
        technicalAdvice: [
            "From a technical perspective, I'd recommend...",
            "Based on the community's experience, here's what works best...",
            "For this type of prototype, I suggest considering...",
            "The most successful approaches I've seen involve..."
        ],
        encouragement: [
            "Don't worry, this is totally doable! Many developers have faced similar challenges.",
            "You're on the right track! This is a great approach to prototyping.",
            "Keep going! Prototyping is all about iteration and learning.",
            "You've got this! The community is here to support you."
        ],
        resources: [
            "You might also want to check out some related prototypes in our gallery.",
            "I'd recommend looking at similar questions in our community.",
            "There are some great examples in our prototype showcase that might help.",
            "Consider exploring our community's previous discussions on this topic."
        ]
    };

    private questionCategories = {
        'frontend': ['react', 'vue', 'angular', 'javascript', 'typescript', 'css', 'html', 'ui', 'ux'],
        'backend': ['node', 'python', 'java', 'php', 'database', 'api', 'server', 'authentication'],
        'mobile': ['react-native', 'flutter', 'ios', 'android', 'mobile', 'app'],
        'ai-ml': ['machine-learning', 'ai', 'tensorflow', 'pytorch', 'neural', 'algorithm'],
        'devops': ['docker', 'kubernetes', 'aws', 'deployment', 'ci-cd', 'infrastructure'],
        'design': ['figma', 'sketch', 'prototype', 'wireframe', 'design', 'user-experience'],
        'planning': ['roadmap', 'timeline', 'budget', 'scope', 'requirements', 'planning']
    };

    static getInstance(): AICommunityMember {
        if (!AICommunityMember.instance) {
            AICommunityMember.instance = new AICommunityMember();
        }
        return AICommunityMember.instance;
    }

    // Monitor new questions
    monitorNewQuestions(questions: Question[]): Question[] {
        return questions.filter(q => 
            !q.isAnswered && 
            this.shouldRespondToQuestion(q)
        );
    }

    // Analyze question content
    analyzeQuestion(question: Question): {
        category: string;
        complexity: 'beginner' | 'intermediate' | 'advanced';
        keywords: string[];
        suggestedTags: string[];
    } {
        const content = `${question.title} ${question.content}`.toLowerCase();
        const keywords = this.extractKeywords(content);
        const category = this.categorizeQuestion(keywords);
        const complexity = this.assessComplexity(content);
        const suggestedTags = this.suggestTags(keywords, category);

        return {
            category,
            complexity,
            keywords,
            suggestedTags
        };
    }

    // Generate helpful response
    generateHelpfulResponse(question: Question): AIResponse {
        const analysis = this.analyzeQuestion(question);
        const content = this.generateResponseContent(question, analysis);
        const confidence = this.calculateConfidence(analysis);
        const relatedQuestions = this.findRelatedQuestions(question, analysis);

        return {
            questionId: question.id,
            content,
            confidence,
            suggestedTags: analysis.suggestedTags,
            relatedQuestions
        };
    }

    // Post AI response
    postAIResponse(questionId: string, response: AIResponse): Answer {
        const answer: Answer = {
            id: `ai_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            questionId,
            content: response.content,
            author: this.aiUser,
            votes: 0,
            isAccepted: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            isAI: true
        };

        this.trackAnalytics('ai_response_posted', { 
            questionId, 
            answerId: answer.id,
            category: response.suggestedTags[0] || 'general'
        });

        return answer;
    }

    // Determine if AI should respond to a question
    private shouldRespondToQuestion(question: Question): boolean {
        // Don't respond to AI-generated questions
        if (question.author.isAI) return false;

        // Don't respond if already answered
        if (question.isAnswered) return false;

        // Respond to questions that are 30+ minutes old and unanswered
        const questionAge = Date.now() - new Date(question.createdAt).getTime();
        const thirtyMinutes = 30 * 60 * 1000;
        
        return questionAge > thirtyMinutes;
    }

    // Extract keywords from content
    private extractKeywords(content: string): string[] {
        const commonWords = new Set([
            'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by',
            'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did',
            'will', 'would', 'could', 'should', 'may', 'might', 'can', 'this', 'that', 'these', 'those',
            'i', 'you', 'he', 'she', 'it', 'we', 'they', 'me', 'him', 'her', 'us', 'them'
        ]);

        return content
            .toLowerCase()
            .replace(/[^\w\s]/g, '')
            .split(/\s+/)
            .filter(word => 
                word.length > 2 && 
                !commonWords.has(word) &&
                !/^\d+$/.test(word)
            )
            .slice(0, 10);
    }

    // Categorize question based on keywords
    private categorizeQuestion(keywords: string[]): string {
        let maxScore = 0;
        let bestCategory = 'general';

        Object.entries(this.questionCategories).forEach(([category, categoryKeywords]) => {
            const score = keywords.filter(keyword => 
                categoryKeywords.some(catKeyword => 
                    keyword.includes(catKeyword) || catKeyword.includes(keyword)
                )
            ).length;

            if (score > maxScore) {
                maxScore = score;
                bestCategory = category;
            }
        });

        return bestCategory;
    }

    // Assess question complexity
    private assessComplexity(content: string): 'beginner' | 'intermediate' | 'advanced' {
        const advancedTerms = [
            'microservices', 'distributed', 'scalability', 'optimization', 'performance',
            'architecture', 'patterns', 'algorithms', 'complexity', 'enterprise'
        ];

        const intermediateTerms = [
            'api', 'database', 'authentication', 'deployment', 'testing',
            'framework', 'library', 'integration', 'middleware', 'caching'
        ];

        const advancedCount = advancedTerms.filter(term => 
            content.includes(term)
        ).length;

        const intermediateCount = intermediateTerms.filter(term => 
            content.includes(term)
        ).length;

        if (advancedCount > 2) return 'advanced';
        if (intermediateCount > 3 || advancedCount > 0) return 'intermediate';
        return 'beginner';
    }

    // Suggest tags based on analysis
    private suggestTags(keywords: string[], category: string): string[] {
        const baseTags = [category];
        const keywordTags = keywords.slice(0, 3);
        
        const allTags = [...baseTags, ...keywordTags];
        const uniqueTags = Array.from(new Set(allTags));
        return uniqueTags;
    }

    // Generate response content
    private generateResponseContent(question: Question, analysis: any): string {
        const welcome = this.getRandomTemplate('welcome');
        const analysisIntro = this.getRandomTemplate('questionAnalysis');
        const technicalAdvice = this.getRandomTemplate('technicalAdvice');
        const encouragement = this.getRandomTemplate('encouragement');
        const resources = this.getRandomTemplate('resources');

        const categoryAdvice = this.getCategorySpecificAdvice(analysis.category);
        const complexityAdvice = this.getComplexitySpecificAdvice(analysis.complexity);

        return `${welcome}

${analysisIntro}

${categoryAdvice}

${technicalAdvice}

${complexityAdvice}

${encouragement}

${resources}

Let me know if you need any clarification or have follow-up questions! I'm here to help. 🤖`;
    }

    // Get category-specific advice
    private getCategorySpecificAdvice(category: string): string {
        const adviceMap: Record<string, string> = {
            'frontend': "For frontend prototyping, I recommend starting with a simple HTML/CSS structure and gradually adding interactivity. Consider using a framework like React or Vue.js for more complex prototypes.",
            'backend': "Backend prototyping often benefits from starting with a simple API structure. Consider using Node.js with Express or Python with Flask for quick prototypes.",
            'mobile': "Mobile prototyping can be tricky! I'd suggest starting with a web-based prototype first, then moving to native or cross-platform solutions like React Native or Flutter.",
            'ai-ml': "AI/ML prototyping requires careful planning. Start with a simple proof-of-concept using libraries like TensorFlow or scikit-learn before scaling up.",
            'devops': "DevOps prototyping should focus on automation and repeatability. Consider using Docker for containerization and GitHub Actions for CI/CD.",
            'design': "Design prototyping is all about user experience. Start with wireframes, then move to high-fidelity mockups using tools like Figma or Sketch.",
            'planning': "Planning is crucial for successful prototyping. Break down your project into smaller milestones and set realistic timelines."
        };

        return adviceMap[category] || "This is an interesting challenge! I'd recommend starting with a simple proof-of-concept and iterating based on feedback.";
    }

    // Get complexity-specific advice
    private getComplexitySpecificAdvice(complexity: string): string {
        const adviceMap: Record<string, string> = {
            'beginner': "Since you're just starting out, don't worry about making everything perfect. Focus on getting a working prototype first, then refine it later.",
            'intermediate': "You have a good foundation! Consider adding some advanced features like error handling, performance optimization, or better user experience.",
            'advanced': "This is a complex project! Make sure to plan your architecture carefully and consider scalability from the start."
        };

        return adviceMap[complexity] || "Take it step by step and don't be afraid to ask for help from the community!";
    }

    // Calculate confidence in response
    private calculateConfidence(analysis: any): number {
        let confidence = 0.5; // Base confidence

        // Higher confidence for clear categories
        if (analysis.category !== 'general') confidence += 0.2;

        // Higher confidence for more keywords
        if (analysis.keywords.length > 5) confidence += 0.1;

        // Higher confidence for intermediate complexity
        if (analysis.complexity === 'intermediate') confidence += 0.1;

        return Math.min(confidence, 0.95);
    }

    // Find related questions
    private findRelatedQuestions(question: Question, analysis: any): string[] {
        // This would typically query a database for related questions
        // For now, return mock related question IDs
        return [
            `related_${analysis.category}_1`,
            `related_${analysis.category}_2`,
            `related_${analysis.category}_3`
        ];
    }

    // Get random template
    private getRandomTemplate(templateType: keyof typeof this.responseTemplates): string {
        const templates = this.responseTemplates[templateType];
        return templates[Math.floor(Math.random() * templates.length)];
    }

    // Track analytics
    private trackAnalytics(event: string, metadata?: Record<string, any>): void {
        if (typeof window !== 'undefined' && (window as any).gtag) {
            (window as any).gtag('event', event, {
                event_category: 'proto_hub',
                event_label: 'ai_community_member',
                ...metadata
            });
        }
    }
} 