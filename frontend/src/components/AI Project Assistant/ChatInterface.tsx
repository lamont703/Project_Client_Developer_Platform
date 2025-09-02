import React, { useState, useEffect, useRef } from 'react';
import '../../styles/ChatInterface.css';
import SlotEngine from '../../utils/slotEngine';
import { Generators } from '../../utils/generators';
import { PostJobWizard } from '../Pipeline Projects';

declare global {
    interface Window {
        gtag?: (...args: any[]) => void;
    }
}

const ChatInterface: React.FC = () => {
    const slotEngine = useRef(new SlotEngine());
    const [messages, setMessages] = useState<{ sender: string, text: string }[]>([
        { sender: 'AI', text: slotEngine.current.getCurrentQuestion() }
    ]);
    const [input, setInput] = useState('');
    const [showWizard, setShowWizard] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const chatWindowRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Load assistant state from localStorage
        const savedState = localStorage.getItem('assistantState');
        if (savedState) {
            const { messages, currentSlotIndex } = JSON.parse(savedState);
            setMessages(messages);
            slotEngine.current.setCurrentSlotIndex(currentSlotIndex);
        }

        // Send Google Analytics event for assistant start
        if (window.gtag) {
            window.gtag('event', 'assistant_started', {
                event_category: 'AI Project Assistant',
                event_label: 'User started AI Project Assistant'
            });
        }
    }, []);

    useEffect(() => {
        // Persist assistant state to localStorage
        const state = {
            messages,
            currentSlotIndex: slotEngine.current.getCurrentSlotIndex()
        };
        localStorage.setItem('assistantState', JSON.stringify(state));
    }, [messages]);

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

    const handleSend = () => {
        if (input.trim()) {
            const newMessages = [...messages, { sender: 'User', text: input }];
            setMessages(newMessages);

            // Fill the current slot with user input
            console.log('Filling slot:', slotEngine.current.getCurrentQuestion(), 'with input:', input);
            slotEngine.current.fillSlot(input);

            setInput('');
            setIsTyping(true);

            // Simulate AI typing and response
            setTimeout(() => {
                setIsTyping(false);
                
                if (!slotEngine.current.isComplete()) {
                    const aiResponse = { sender: 'AI', text: slotEngine.current.getCurrentQuestion() };
                    setMessages([...newMessages, aiResponse]);
                } else {
                    const projectData = slotEngine.current.getSlotData();
                    const summary = Generators.generateSummary(projectData);

                    const aiResponse = { sender: 'AI', text: `Thank you for providing the details! 🎉 Here's a comprehensive summary of your project:

${summary}

I'm excited to help you bring this project to life! Let's proceed to create your job posting.` };
                    setMessages([...newMessages, aiResponse]);
                    console.log('Collected Project Data:', projectData);

                    // Save job draft to localStorage
                    localStorage.setItem('jobDraft', JSON.stringify(projectData));

                    // Show Post Job Wizard after a short delay
                    setTimeout(() => {
                    setShowWizard(true);
                    }, 2000);
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
        const currentQuestion = slotEngine.current.getCurrentQuestion().toLowerCase();
        
        if (currentQuestion.includes('project') && currentQuestion.includes('name')) {
            return "e.g., 'E-commerce Mobile App' or 'Company Website Redesign'";
        } else if (currentQuestion.includes('describe')) {
            return "Share your vision and requirements in detail...";
        } else if (currentQuestion.includes('budget')) {
            return "e.g., '$5,000 - $10,000' or 'Open to discussion'";
        } else if (currentQuestion.includes('timeline')) {
            return "e.g., '2-3 months' or 'ASAP'";
        } else {
            return "Type your response here...";
        }
    };

    if (showWizard) {
        return <PostJobWizard />;
    }

    return (
        <div className="chat-interface">
            <h1>🤖 AI Project Assistant</h1>
            
            {/* Hero CTA Section */}
            <div className="hero-cta">
                <div className="hero-content">
                    <h2>🚀 Turn Your Project Idea Into Reality</h2>
                    <p className="hero-subtitle">
                        Share your project vision with our AI and get a <strong>FREE prototype</strong> delivered to your inbox!
                    </p>
                    <div className="hero-benefits">
                        <div className="benefit-item">
                            <span className="benefit-icon">✨</span>
                            <span>AI-powered project analysis</span>
                        </div>
                        <div className="benefit-item">
                            <span className="benefit-icon">🎯</span>
                            <span>Professional wireframe prototype</span>
                        </div>
                        <div className="benefit-item">
                            <span className="benefit-icon">📧</span>
                            <span>Delivered to your email</span>
                        </div>
                        <div className="benefit-item">
                            <span className="benefit-icon">💯</span>
                            <span>100% FREE - No strings attached</span>
                        </div>
                    </div>
                    <p className="hero-cta-text">
                        <strong>Start by describing your project idea below</strong> 👇
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

export default ChatInterface; 