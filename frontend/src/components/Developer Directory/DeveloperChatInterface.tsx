import React, { useState, useEffect, useRef } from 'react';
import '../../styles/DeveloperChatInterface.css';
import DeveloperProfileWizard from './DeveloperProfileWizard';
import { JobApplicationWizard } from '../Pipeline Projects';

declare global {
    interface Window {
        gtag?: (...args: any[]) => void;
    }
}

type AssistantMode = 'profile' | 'application' | 'choosing';

const DeveloperChatInterface: React.FC = () => {
    const [messages, setMessages] = useState<{ sender: string, text: string }[]>([
        { 
            sender: 'AI', 
            text: `👋 Hello! I'm your AI Developer Assistant, here to help you succeed in your career!

I can help you with two main things:

1. 🎯 **Create a Professional Profile** - Build an impressive developer profile for our directory
2. 💼 **Apply to Jobs** - Get help crafting the perfect job application

Which would you like to work on today?` 
        }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [assistantMode, setAssistantMode] = useState<AssistantMode>('choosing');
    const [showProfileWizard, setShowProfileWizard] = useState(false);
    const [showApplicationWizard, setShowApplicationWizard] = useState(false);
    const chatWindowRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Load developer assistant state from localStorage
        const savedState = localStorage.getItem('developerAssistantState');
        if (savedState) {
            const { messages, mode } = JSON.parse(savedState);
            setMessages(messages);
            setAssistantMode(mode);
        }

        // Send Google Analytics event for developer assistant start
        if (window.gtag) {
            window.gtag('event', 'developer_assistant_started', {
                event_category: 'AI Developer Assistant',
                event_label: 'Developer started AI Developer Assistant'
            });
        }
    }, []);

    useEffect(() => {
        // Persist developer assistant state to localStorage
        const state = {
            messages,
            mode: assistantMode
        };
        localStorage.setItem('developerAssistantState', JSON.stringify(state));
    }, [messages, assistantMode]);

    // Auto-scroll to bottom when new messages are added
    useEffect(() => {
        if (chatWindowRef.current) {
            chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const TypingIndicator = () => (
        <div className="typing-indicator">
            <div className="typing-dot"></div>
            <div className="typing-dot"></div>
            <div className="typing-dot"></div>
        </div>
    );

    const handleModeSelection = (mode: 'profile' | 'application') => {
        setAssistantMode(mode);
        
        let aiResponse = '';
        if (mode === 'profile') {
            aiResponse = `Excellent choice! 🎯 Let's create a professional developer profile that will make you stand out.

I'll help you build a comprehensive profile including:
• Your skills and technologies
• Experience and projects
• Portfolio links
• Professional bio
• Availability and rates

Let's start! What's your name and what type of developer are you? (e.g., "I'm Alex, a Full-Stack Developer")`;
        } else {
            aiResponse = `Great! 💼 Let's craft a compelling job application that will get you noticed.

I'll help you with:
• Tailoring your resume for specific jobs
• Writing compelling cover letters
• Highlighting relevant skills
• Preparing for interviews

First, let me know which job you're interested in applying for. You can describe the role or paste a job description.`;
        }

        const newMessages = [...messages, { sender: 'User', text: mode === 'profile' ? 'Create Profile' : 'Apply to Jobs' }];
        setMessages([...newMessages, { sender: 'AI', text: aiResponse }]);
    };

    const handleSend = () => {
        if (input.trim()) {
            const newMessages = [...messages, { sender: 'User', text: input }];
            setMessages(newMessages);

            setInput('');
            setIsTyping(true);

            // Simulate AI typing and response
            setTimeout(() => {
                setIsTyping(false);
                
                let aiResponse = '';
                
                if (assistantMode === 'choosing') {
                    // Handle initial mode selection
                    if (input.toLowerCase().includes('profile') || input.toLowerCase().includes('create')) {
                        handleModeSelection('profile');
                        return;
                    } else if (input.toLowerCase().includes('job') || input.toLowerCase().includes('apply') || input.toLowerCase().includes('application')) {
                        handleModeSelection('application');
                        return;
                    } else {
                        aiResponse = `I'm not sure what you'd like to do. Please let me know if you want to:

1. 🎯 **Create a Profile** - Build your developer profile
2. 💼 **Apply to Jobs** - Get help with job applications

Which would you prefer?`;
                    }
                } else if (assistantMode === 'profile') {
                    // Handle profile creation flow
                    if (messages.length < 4) {
                        // First response - get more details
                        aiResponse = `Great! Now tell me about your key skills and technologies. What programming languages, frameworks, and tools are you most proficient with?

For example: "I'm skilled in React, Node.js, Python, AWS, and have experience with Docker and MongoDB."`;
                    } else if (messages.length < 6) {
                        // Second response - get experience
                        aiResponse = `Perfect! Now let me know about your experience level and some projects you've worked on.

For example: "I have 3+ years of experience. I've built e-commerce platforms, REST APIs, and mobile apps. My recent project was a real-time chat application."`;
                    } else if (messages.length < 8) {
                        // Third response - get portfolio and rates
                        aiResponse = `Excellent! Now let's add some final details:

1. Do you have a portfolio website, GitHub, or LinkedIn?
2. What's your hourly rate or preferred compensation?
3. What's your availability status?

Once you provide these details, I'll help you create a complete profile!`;
                    } else {
                        // Profile complete - show wizard
                        aiResponse = `🎉 Perfect! I have enough information to help you create a professional profile.

Let me prepare your profile wizard with all the details you've shared. This will include:
• Your professional information
• Skills and technologies
• Experience and projects
• Portfolio links
• Availability and rates

Let me set that up for you...`;
                        
                        // Show profile wizard after a short delay
                        setTimeout(() => {
                            setShowProfileWizard(true);
                        }, 2000);
                    }
                } else if (assistantMode === 'application') {
                    // Handle job application flow
                    if (messages.length < 4) {
                        // First response - analyze job requirements
                        aiResponse = `I see you're interested in this role! Let me help you tailor your application.

To make your application stand out, I need to know:
1. What specific skills from this job posting do you have?
2. What relevant experience can you highlight?
3. Why are you interested in this company/role?

Share these details and I'll help you craft a compelling application!`;
                    } else if (messages.length < 6) {
                        // Second response - prepare application materials
                        aiResponse = `Great insights! Now let's prepare your application materials.

I'll help you create:
• A tailored resume highlighting relevant skills
• A compelling cover letter
• Key talking points for interviews

Let me know if you have any specific questions about the application process or if you'd like me to help you with any particular aspect.`;
                    } else {
                        // Application guidance complete - show wizard
                        aiResponse = `🎯 Excellent! I have enough information to help you with your job application.

Let me prepare a comprehensive application wizard that will help you:
• Tailor your resume for this specific role
• Write a compelling cover letter
• Prepare for common interview questions
• Highlight your relevant experience

Let me set that up for you...`;
                        
                        // Show application wizard after a short delay
                        setTimeout(() => {
                            setShowApplicationWizard(true);
                        }, 2000);
                    }
                }

                if (aiResponse) {
                    setMessages([...newMessages, { sender: 'AI', text: aiResponse }]);
                }
            }, Math.random() * 1000 + 1500); // Random delay between 1.5-2.5 seconds for more natural feel
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const getPlaceholderText = () => {
        if (assistantMode === 'choosing') {
            return "Type 'Create Profile' or 'Apply to Jobs' to get started...";
        } else if (assistantMode === 'profile') {
            return "Share your developer information...";
        } else {
            return "Share details about the job you're applying for...";
        }
    };

    if (showProfileWizard) {
        return <DeveloperProfileWizard />;
    }

    if (showApplicationWizard) {
        return <JobApplicationWizard />;
    }

    return (
        <div className="developer-chat-interface">
            <h1>👨‍💻 AI Developer Assistant</h1>
            
            {/* Hero CTA Section */}
            <div className="hero-cta">
                <div className="hero-content">
                    <h2>🚀 Accelerate Your Developer Career</h2>
                    <p className="hero-subtitle">
                        Get personalized help creating professional profiles and crafting winning job applications!
                    </p>
                    <div className="hero-benefits">
                        <div className="benefit-item">
                            <span className="benefit-icon">🎯</span>
                            <span>Professional profile creation</span>
                        </div>
                        <div className="benefit-item">
                            <span className="benefit-icon">💼</span>
                            <span>Job application assistance</span>
                        </div>
                        <div className="benefit-item">
                            <span className="benefit-icon">📝</span>
                            <span>Resume and cover letter help</span>
                        </div>
                        <div className="benefit-item">
                            <span className="benefit-icon">🚀</span>
                            <span>Career growth guidance</span>
                        </div>
                    </div>
                    <p className="hero-cta-text">
                        <strong>Choose what you'd like to work on below</strong> 👇
                    </p>
                </div>
            </div>
            
            <div className="chat-window" ref={chatWindowRef}>
                {messages.map((msg, index) => (
                    <div key={index} className={`chat-message ${msg.sender.toLowerCase()}`}>
                        <strong>{msg.sender}:</strong> 
                        <div style={{ whiteSpace: 'pre-line' }}>{msg.text}</div>
                    </div>
                ))}
                {isTyping && <TypingIndicator />}
            </div>
            <div className="chat-input">
                <textarea 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={getPlaceholderText()}
                    disabled={isTyping}
                    rows={1}
                    style={{ 
                        height: 'auto',
                        minHeight: '50px',
                        maxHeight: '120px',
                        resize: 'none'
                    }}
                    onInput={(e) => {
                        const target = e.target as HTMLTextAreaElement;
                        target.style.height = 'auto';
                        target.style.height = Math.min(target.scrollHeight, 120) + 'px';
                    }}
                />
                <button 
                    onClick={handleSend}
                    disabled={!input.trim() || isTyping}
                    style={{
                        opacity: (!input.trim() || isTyping) ? 0.6 : 1,
                        cursor: (!input.trim() || isTyping) ? 'not-allowed' : 'pointer'
                    }}
                >
                    {isTyping ? '⏳' : '✈️'}
                </button>
            </div>
        </div>
    );
};

export default DeveloperChatInterface; 