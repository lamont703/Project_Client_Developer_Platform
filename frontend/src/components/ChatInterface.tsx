import React, { useState, useEffect, useRef } from 'react';
import '../styles/ChatInterface.css';
import SlotEngine from '../utils/slotEngine';
import { Generators } from '../utils/generators';

const ChatInterface: React.FC = () => {
    const slotEngine = useRef(new SlotEngine());
    const [messages, setMessages] = useState<{ sender: string, text: string }[]>([
        { sender: 'AI', text: slotEngine.current.getCurrentQuestion() }
    ]);
    const [input, setInput] = useState('');

    useEffect(() => {
        // Load assistant state from localStorage
        const savedState = localStorage.getItem('assistantState');
        if (savedState) {
            const { messages, currentSlotIndex } = JSON.parse(savedState);
            setMessages(messages);
            slotEngine.current.setCurrentSlotIndex(currentSlotIndex);
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

    const handleSend = () => {
        if (input.trim()) {
            const newMessages = [...messages, { sender: 'User', text: input }];
            setMessages(newMessages);

            // Fill the current slot with user input
            console.log('Filling slot:', slotEngine.current.getCurrentQuestion(), 'with input:', input);
            slotEngine.current.fillSlot(input);

            setInput('');

            // Simulate AI response
            setTimeout(() => {
                if (!slotEngine.current.isComplete()) {
                    const aiResponse = { sender: 'AI', text: slotEngine.current.getCurrentQuestion() };
                    setMessages([...newMessages, aiResponse]);
                } else {
                    const projectData = slotEngine.current.getSlotData();
                    const title = Generators.generateTitle(projectData);
                    const description = Generators.generateDescription(projectData);
                    const skills = Generators.generateSkills(projectData);
                    const milestones = Generators.suggestMilestones(projectData);
                    const { budget, timeline } = Generators.estimateBudgetTimeline(projectData);

                    const aiResponse = { sender: 'AI', text: `Thank you for providing the details. Here is a summary of your project:

Title: ${title}
Description: ${description}
Skills: ${skills.join(', ')}
Milestones: ${milestones.join(', ')}
Budget: ${budget}
Timeline: ${timeline}` };
                    setMessages([...newMessages, aiResponse]);
                    console.log('Collected Project Data:', projectData);

                    // Save job draft to localStorage
                    localStorage.setItem('jobDraft', JSON.stringify(projectData));
                }
            }, 1000);
        }
    };

    return (
        <div className="chat-interface">
            <h1>AI Project Assistant</h1>
            <div className="chat-window">
                {messages.map((msg, index) => (
                    <div key={index} className={`chat-message ${msg.sender.toLowerCase()}`}>
                        <strong>{msg.sender}:</strong> {msg.text}
                    </div>
                ))}
            </div>
            <div className="chat-input">
                <textarea 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                ></textarea>
                <button onClick={handleSend}>Send</button>
            </div>
        </div>
    );
};

export default ChatInterface; 