import React, { useState, useEffect, useMemo } from 'react';
import '../../styles/ProtoHub.css';
import AskQuestion from './AskQuestion';
import PrototypeShowcase from './PrototypeShowcase';
import ApiService from '../../utils/apiConfig';

interface User {
    id: string;
    name: string;
    avatar: string;
    reputation: number;
    isAI: boolean;
}

interface Question {
    id: string;
    title: string;
    content: string;
    author: User;
    tags: string[];
    votes: number;
    answers: number;
    views: number;
    createdAt: string;
    isAnswered: boolean;
    isFeatured: boolean;
}

interface Answer {
    id: string;
    content: string;
    author: User;
    votes: number;
    views: number;
    isAccepted: boolean;
    createdAt: string;
}

const ProtoHub: React.FC = () => {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
    const [answers, setAnswers] = useState<Answer[]>([]);
    const [currentUser] = useState<User>({
        id: '1',
        name: 'Community Member',
        avatar: '👤',
        reputation: 150,
        isAI: false
    });
    const [showAskQuestion, setShowAskQuestion] = useState(false);
    const [showPrototypeShowcase, setShowPrototypeShowcase] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTag, setSelectedTag] = useState<string>('all');
    const [sortBy, setSortBy] = useState<'newest' | 'votes' | 'views'>('newest');
    const [answerInput, setAnswerInput] = useState('');
    const [isSubmittingAnswer, setIsSubmittingAnswer] = useState(false);

    // Sample data memoized to prevent infinite re-renders
    const sampleQuestions = useMemo(() => [
        {
            id: '1',
            title: 'What are the best prototyping tools for mobile app development?',
            content: 'I\'m new to mobile app development and want to create a prototype before diving into full development. What tools would you recommend for someone just starting out?',
            author: { id: '2', name: 'Sarah Chen', avatar: '👩‍💻', reputation: 320, isAI: false },
            tags: ['mobile', 'prototyping', 'tools'],
            votes: 15,
            answers: 8,
            views: 245,
            createdAt: '2024-01-15T10:30:00Z',
            isAnswered: true,
            isFeatured: true
        },
        {
            id: '2',
            title: 'How do I validate my SaaS idea before building a full MVP?',
            content: 'I have an idea for a SaaS product but want to make sure there\'s market demand before investing time and money. What validation methods have worked for you?',
            author: { id: '3', name: 'Alex Thompson', avatar: '👨‍💼', reputation: 180, isAI: false },
            tags: ['saas', 'validation', 'mvp'],
            votes: 12,
            answers: 5,
            views: 189,
            createdAt: '2024-01-14T14:20:00Z',
            isAnswered: true,
            isFeatured: false
        },
        {
            id: '3',
            title: 'What\'s the difference between wireframes, mockups, and prototypes?',
            content: 'I keep hearing these terms but I\'m not sure about the differences. Can someone explain when to use each one in the design process?',
            author: { id: '4', name: 'ProtoBot', avatar: '🤖', reputation: 1250, isAI: true },
            tags: ['design', 'wireframes', 'mockups'],
            votes: 8,
            answers: 6,
            views: 156,
            createdAt: '2024-01-13T09:15:00Z',
            isAnswered: true,
            isFeatured: false
        },
        {
            id: '4',
            title: 'How do I create a clickable prototype without coding?',
            content: 'I want to create an interactive prototype to show investors, but I don\'t know how to code. What no-code tools would you recommend?',
            author: { id: '5', name: 'Maria Rodriguez', avatar: '👩‍🎨', reputation: 95, isAI: false },
            tags: ['nocode', 'interactive', 'prototyping'],
            votes: 6,
            answers: 3,
            views: 98,
            createdAt: '2024-01-12T16:45:00Z',
            isAnswered: false,
            isFeatured: false
        }
    ], []);

    const sampleAnswers = useMemo(() => [
        {
            id: '1',
            content: 'For mobile app prototyping, I highly recommend Figma for design and InVision for interactive prototypes. Figma is great for creating the visual design, and InVision lets you add clickable interactions without any coding. Another excellent option is Adobe XD, which combines both design and prototyping in one tool.',
            author: { id: '6', name: 'ProtoBot', avatar: '🤖', reputation: 1250, isAI: true },
            votes: 12,
            views: 45,
            isAccepted: true,
            createdAt: '2024-01-15T11:00:00Z'
        },
        {
            id: '2',
            content: 'I\'d also add Framer to the list. It\'s particularly good for more complex interactions and animations. The learning curve is a bit steeper, but the results are impressive.',
            author: { id: '7', name: 'David Kim', avatar: '👨‍💻', reputation: 420, isAI: false },
            votes: 8,
            views: 32,
            isAccepted: false,
            createdAt: '2024-01-15T11:30:00Z'
        }
    ], []);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await ApiService.getQuestions();
                if (response.success) {
                    setQuestions(response.questions || []);
                } else {
                    console.error('Failed to fetch questions:', response.error);
                    // Fallback to sample data if API fails
                    setQuestions(sampleQuestions);
                }
            } catch (error) {
                console.error('Error fetching questions:', error);
                // Fallback to sample data if API fails
                setQuestions(sampleQuestions);
            }
        };

        fetchQuestions();
    }, []);

    const filteredQuestions = questions.filter(question => {
        const matchesSearch = question.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            question.content.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesTag = selectedTag === 'all' || question.tags.includes(selectedTag);
        return matchesSearch && matchesTag;
    }).sort((a, b) => {
        switch (sortBy) {
            case 'votes':
                return b.votes - a.votes;
            case 'views':
                return b.views - a.views;
            default:
                return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }
    });

    const handleQuestionClick = (question: Question) => {
        setSelectedQuestion(question);
        loadAnswersForQuestion(question.id);
    };

    const loadAnswersForQuestion = async (questionId: string) => {
        try {
            const response = await ApiService.getQuestionAnswers(questionId);
            if (response.success) {
                setAnswers(response.answers || []);
                // Record views for each answer
                if (response.answers && response.answers.length > 0) {
                    response.answers.forEach((answer: Answer) => {
                        ApiService.recordAnswerView(questionId, answer.id).catch(error => {
                            console.error('Error recording answer view:', error);
                        });
                    });
                }
            } else {
                console.error('Failed to fetch answers:', response.error);
                // Fallback to sample answers
                setAnswers(sampleAnswers);
            }
        } catch (error) {
            console.error('Error fetching answers:', error);
            // Fallback to sample answers
            setAnswers(sampleAnswers);
        }
    };

    const handleVote = async (questionId: string, direction: 'up' | 'down') => {
        try {
            const response = await ApiService.voteOnQuestion(questionId, direction);
            if (response.success) {
                // Update the question with new vote count
                setQuestions(questions.map(q => 
                    q.id === questionId 
                        ? { ...q, votes: response.votes || q.votes }
                        : q
                ));
            } else {
                console.error('Failed to vote on question:', response.error);
                // Fallback to local state update
                setQuestions(questions.map(q => 
                    q.id === questionId 
                        ? { ...q, votes: q.votes + (direction === 'up' ? 1 : -1) }
                        : q
                ));
            }
        } catch (error) {
            console.error('Error voting on question:', error);
            // Fallback to local state update
            setQuestions(questions.map(q => 
                q.id === questionId 
                    ? { ...q, votes: q.votes + (direction === 'up' ? 1 : -1) }
                    : q
            ));
        }
    };

    const handleAnswerVote = async (answerId: string, direction: 'up' | 'down') => {
        if (!selectedQuestion) return;
        
        try {
            const response = await ApiService.voteOnAnswer(selectedQuestion.id, answerId, direction);
            if (response.success) {
                // Update the answer with new vote count
                setAnswers(answers.map(a => 
                    a.id === answerId 
                        ? { ...a, votes: response.votes || a.votes }
                        : a
                ));
            } else {
                console.error('Failed to vote on answer:', response.error);
                // Fallback to local state update
                setAnswers(answers.map(a => 
                    a.id === answerId 
                        ? { ...a, votes: a.votes + (direction === 'up' ? 1 : -1) }
                        : a
                ));
            }
        } catch (error) {
            console.error('Error voting on answer:', error);
            // Fallback to local state update
            setAnswers(answers.map(a => 
                a.id === answerId 
                    ? { ...a, votes: a.votes + (direction === 'up' ? 1 : -1) }
                    : a
            ));
        }
    };

    const handleSubmitAnswer = async () => {
        if (!answerInput.trim() || !selectedQuestion) {
            return;
        }

        // Client-side validation
        if (answerInput.trim().length < 10) {
            alert('Answer content must be at least 10 characters long');
            return;
        }

        if (answerInput.trim().length > 10000) {
            alert('Answer content must be less than 10000 characters');
            return;
        }

        setIsSubmittingAnswer(true);
        
        try {
            const response = await ApiService.addAnswer(selectedQuestion.id, {
                content: answerInput.trim()
            });

            if (response.success) {
                // Add the new answer to the list
                setAnswers([response.answer, ...answers]);
                setAnswerInput('');
                
                // Update the question's answer count
                setQuestions(questions.map(q => 
                    q.id === selectedQuestion.id 
                        ? { ...q, answers: q.answers + 1 }
                        : q
                ));
            } else {
                console.error('Failed to submit answer:', response.error);
                // Show specific error message if available
                if (response.errors && response.errors.length > 0) {
                    alert(`Validation failed: ${response.errors.join(', ')}`);
                } else {
                    alert('Failed to submit answer. Please try again.');
                }
                // Fallback to local state update
                const newAnswer: Answer = {
                    id: Date.now().toString(),
                    content: answerInput.trim(),
                    author: currentUser,
                    votes: 0,
                    views: 0,
                    isAccepted: false,
                    createdAt: new Date().toISOString()
                };
                setAnswers([newAnswer, ...answers]);
                setAnswerInput('');
                
                // Update the question's answer count
                setQuestions(questions.map(q => 
                    q.id === selectedQuestion.id 
                        ? { ...q, answers: q.answers + 1 }
                        : q
                ));
            }
        } catch (error) {
            console.error('Error submitting answer:', error);
            // Fallback to local state update
            const newAnswer: Answer = {
                id: Date.now().toString(),
                content: answerInput.trim(),
                author: currentUser,
                votes: 0,
                views: 0,
                isAccepted: false,
                createdAt: new Date().toISOString()
            };
            setAnswers([newAnswer, ...answers]);
            setAnswerInput('');
            
            // Update the question's answer count
            setQuestions(questions.map(q => 
                q.id === selectedQuestion.id 
                    ? { ...q, answers: q.answers + 1 }
                    : q
            ));
        } finally {
            setIsSubmittingAnswer(false);
        }
    };

    const handleAskQuestion = async (questionData: { title: string; content: string; tags: string[] }) => {
        try {
            const response = await ApiService.createQuestion({
                title: questionData.title,
                content: questionData.content,
                tags: questionData.tags
            });

            if (response.success) {
                // Add the new question to the list
                setQuestions([response.question, ...questions]);
                setShowAskQuestion(false);
            } else {
                console.error('Failed to create question:', response.error);
                // Fallback to local state update
                const newQuestion: Question = {
                    id: Date.now().toString(),
                    title: questionData.title,
                    content: questionData.content,
                    author: currentUser,
                    tags: questionData.tags,
                    votes: 0,
                    answers: 0,
                    views: 0,
                    createdAt: new Date().toISOString(),
                    isAnswered: false,
                    isFeatured: false
                };
                setQuestions([newQuestion, ...questions]);
                setShowAskQuestion(false);
            }
        } catch (error) {
            console.error('Error creating question:', error);
            // Fallback to local state update
            const newQuestion: Question = {
                id: Date.now().toString(),
                title: questionData.title,
                content: questionData.content,
                author: currentUser,
                tags: questionData.tags,
                votes: 0,
                answers: 0,
                views: 0,
                createdAt: new Date().toISOString(),
                isAnswered: false,
                isFeatured: false
            };
            setQuestions([newQuestion, ...questions]);
            setShowAskQuestion(false);
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
        
        if (diffInHours < 1) return 'Just now';
        if (diffInHours < 24) return `${diffInHours}h ago`;
        if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
        return date.toLocaleDateString();
    };

    const renderQuestionList = () => (
        <div className="questions-list">
            <div className="questions-header">
                <h2>Questions</h2>
                <button 
                    className="ask-question-btn"
                    onClick={() => setShowAskQuestion(true)}
                >
                    Ask Question
                </button>
            </div>
            
            <div className="filters">
                <input
                    type="text"
                    placeholder="Search questions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
                
                <select 
                    value={selectedTag} 
                    onChange={(e) => setSelectedTag(e.target.value)}
                    className="tag-filter"
                    aria-label="Filter by tag"
                >
                    <option value="all">All Tags</option>
                    <option value="mobile">Mobile</option>
                    <option value="prototyping">Prototyping</option>
                    <option value="tools">Tools</option>
                    <option value="saas">SaaS</option>
                    <option value="validation">Validation</option>
                    <option value="mvp">MVP</option>
                    <option value="design">Design</option>
                    <option value="nocode">No-Code</option>
                </select>
                
                <select 
                    value={sortBy} 
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="sort-filter"
                    aria-label="Sort questions"
                >
                    <option value="newest">Newest</option>
                    <option value="votes">Most Voted</option>
                    <option value="views">Most Viewed</option>
                </select>
            </div>

            <div className="questions-grid">
                {filteredQuestions.map(question => (
                    <div 
                        key={question.id} 
                        className={`question-card ${question.isFeatured ? 'featured' : ''}`}
                        onClick={() => handleQuestionClick(question)}
                    >
                        <div className="question-stats">
                            <div className="stat">
                                <span className="stat-number">{question.votes}</span>
                                <span className="stat-label">votes</span>
                            </div>
                            <div className="stat">
                                <span className="stat-number">{question.answers}</span>
                                <span className="stat-label">answers</span>
                            </div>
                            <div className="stat">
                                <span className="stat-number">{question.views}</span>
                                <span className="stat-label">views</span>
                            </div>
                        </div>
                        
                        <div className="question-content">
                            <h3 className="question-title">{question.title}</h3>
                            <p className="question-excerpt">
                                {question.content.substring(0, 150)}...
                            </p>
                            
                            <div className="question-meta">
                                <div className="tags">
                                    {question.tags.map(tag => (
                                        <span key={tag} className="tag">{tag}</span>
                                    ))}
                                </div>
                                
                                <div className="author-info">
                                    <span className="author-avatar">{question.author.avatar}</span>
                                    <span className="author-name">{question.author.name}</span>
                                    <span className="author-reputation">{question.author.reputation}</span>
                                    <span className="question-date">{formatDate(question.createdAt)}</span>
                                </div>
                            </div>
                        </div>
                        
                        {question.isFeatured && <div className="featured-badge">Featured</div>}
                        {question.isAnswered && <div className="answered-badge">✓ Answered</div>}
                    </div>
                ))}
            </div>
        </div>
    );

    const renderQuestionDetail = () => (
        <div className="question-detail">
            <button 
                className="back-btn"
                onClick={() => {
                    setSelectedQuestion(null);
                    setAnswers([]);
                    setAnswerInput('');
                }}
            >
                ← Back to Questions
            </button>
            
            <div className="question-full">
                <div className="question-header">
                    <h1>{selectedQuestion?.title}</h1>
                    <div className="question-meta-full">
                        <span className="question-date">{formatDate(selectedQuestion?.createdAt || '')}</span>
                        <span className="question-views">{selectedQuestion?.views} views</span>
                    </div>
                </div>
                
                <div className="question-body">
                    <div className="vote-section">
                        <button 
                            className="vote-btn up"
                            onClick={() => handleVote(selectedQuestion?.id || '', 'up')}
                        >
                            ▲
                        </button>
                        <span className="vote-count">{selectedQuestion?.votes}</span>
                        <button 
                            className="vote-btn down"
                            onClick={() => handleVote(selectedQuestion?.id || '', 'down')}
                        >
                            ▼
                        </button>
                    </div>
                    
                    <div className="question-text">
                        <p>{selectedQuestion?.content}</p>
                        
                        <div className="question-author">
                            <span className="author-avatar">{selectedQuestion?.author.avatar}</span>
                            <div className="author-details">
                                <span className="author-name">{selectedQuestion?.author.name}</span>
                                <span className="author-reputation">{selectedQuestion?.author.reputation} reputation</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="answers-section">
                <h2>{answers.length} Answers</h2>
                
                {answers.map(answer => (
                    <div key={answer.id} className="answer-card">
                        <div className="vote-section">
                            <button 
                                className="vote-btn up"
                                onClick={() => handleAnswerVote(answer.id, 'up')}
                            >
                                ▲
                            </button>
                            <span className="vote-count">{answer.votes}</span>
                            <button 
                                className="vote-btn down"
                                onClick={() => handleAnswerVote(answer.id, 'down')}
                            >
                                ▼
                            </button>
                        </div>
                        
                        <div className="answer-content">
                            <p>{answer.content}</p>
                            
                            <div className="answer-meta">
                                <div className="answer-author">
                                    <span className="author-avatar">{answer.author.avatar}</span>
                                    <span className="author-name">{answer.author.name}</span>
                                    <span className="author-reputation">{answer.author.reputation} reputation</span>
                                </div>
                                <div className="answer-stats">
                                    <span className="answer-date">{formatDate(answer.createdAt)}</span>
                                    <span className="answer-views">👁 {answer.views} views</span>
                                </div>
                            </div>
                        </div>
                        
                        {answer.isAccepted && <div className="accepted-badge">✓ Accepted</div>}
                    </div>
                ))}
                
                <div className="add-answer">
                    <h3>Your Answer</h3>
                    <textarea 
                        placeholder="Write your answer here..."
                        className="answer-input"
                        rows={6}
                        value={answerInput}
                        onChange={(e) => setAnswerInput(e.target.value)}
                        disabled={isSubmittingAnswer}
                    />
                    <div className="answer-input-info">
                        <span className={`char-count ${answerInput.trim().length < 10 ? 'error' : ''}`}>
                            {answerInput.length}/10000 characters (minimum 10)
                        </span>
                    </div>
                    <button 
                        className="submit-answer-btn"
                        onClick={handleSubmitAnswer}
                        disabled={isSubmittingAnswer || !answerInput.trim() || answerInput.trim().length < 10}
                    >
                        {isSubmittingAnswer ? 'Posting...' : 'Post Answer'}
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <div className="proto-hub">
            <div className="hub-header">
                <h1>🚀 Proto Hub</h1>
                <p>Community Q&A for prototyping and bringing software ideas to life</p>
                <div className="hub-actions">
                    <button 
                        className="showcase-btn"
                        onClick={() => setShowPrototypeShowcase(true)}
                    >
                        🎨 View Prototypes
                    </button>
                </div>
            </div>
            
            <div className="hub-content">
                {!selectedQuestion ? renderQuestionList() : renderQuestionDetail()}
            </div>
            
            {showAskQuestion && (
                <AskQuestion
                    onClose={() => setShowAskQuestion(false)}
                    onSubmit={handleAskQuestion}
                />
            )}
            
            {showPrototypeShowcase && (
                <div className="showcase-overlay">
                    <div className="showcase-modal">
                        <div className="showcase-modal-header">
                            <h2>🎨 Prototype Gallery</h2>
                            <button 
                                className="close-showcase-btn"
                                onClick={() => setShowPrototypeShowcase(false)}
                            >
                                ×
                            </button>
                        </div>
                        <div className="showcase-modal-content">
                            <PrototypeShowcase />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProtoHub; 