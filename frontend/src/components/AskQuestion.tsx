import React, { useState } from 'react';
import '../styles/AskQuestion.css';

interface AskQuestionProps {
    onClose: () => void;
    onSubmit: (question: {
        title: string;
        content: string;
        tags: string[];
    }) => void;
}

const AskQuestion: React.FC<AskQuestionProps> = ({ onClose, onSubmit }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [tags, setTags] = useState<string[]>([]);
    const [tempTag, setTempTag] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const predefinedTags = [
        'mobile', 'web', 'prototyping', 'tools', 'saas', 'validation', 
        'mvp', 'design', 'nocode', 'wireframes', 'user-research', 'testing'
    ];

    const addTag = () => {
        if (tempTag.trim() && !tags.includes(tempTag.trim())) {
            setTags([...tags, tempTag.trim()]);
            setTempTag('');
        }
    };

    const removeTag = (tagToRemove: string) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    };

    const addPredefinedTag = (tag: string) => {
        if (!tags.includes(tag)) {
            setTags([...tags, tag]);
        }
    };

    const handleSubmit = async () => {
        if (!title.trim() || !content.trim()) {
            alert('Please fill in both title and content');
            return;
        }

        setIsSubmitting(true);
        
        try {
            await onSubmit({
                title: title.trim(),
                content: content.trim(),
                tags
            });
            
            // Reset form
            setTitle('');
            setContent('');
            setTags([]);
            onClose();
        } catch (error) {
            console.error('Error submitting question:', error);
            alert('Failed to submit question. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            if (e.target === document.querySelector('.tag-input')) {
                addTag();
            }
        }
    };

    return (
        <div className="ask-question-overlay">
            <div className="ask-question-modal">
                <div className="modal-header">
                    <h2>🚀 Ask a Question</h2>
                    <button className="close-btn" onClick={onClose}>×</button>
                </div>
                
                <div className="modal-content">
                    <div className="form-group">
                        <label htmlFor="question-title">Question Title</label>
                        <input
                            id="question-title"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="What's your question about prototyping?"
                            maxLength={200}
                        />
                        <div className="char-count">{title.length}/200</div>
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="question-content">Question Details</label>
                        <textarea
                            id="question-content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Provide more details about your question. What have you tried? What specific help do you need?"
                            rows={8}
                            maxLength={2000}
                        />
                        <div className="char-count">{content.length}/2000</div>
                    </div>
                    
                    <div className="form-group">
                        <label>Tags</label>
                        <div className="tags-input-section">
                            <div className="tag-input-container">
                                <input
                                    type="text"
                                    className="tag-input"
                                    value={tempTag}
                                    onChange={(e) => setTempTag(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Add custom tag..."
                                />
                                <button 
                                    type="button" 
                                    onClick={addTag}
                                    className="add-tag-btn"
                                    disabled={!tempTag.trim()}
                                >
                                    +
                                </button>
                            </div>
                            
                            <div className="predefined-tags">
                                <span className="tags-label">Popular tags:</span>
                                {predefinedTags.map(tag => (
                                    <button
                                        key={tag}
                                        type="button"
                                        className={`predefined-tag ${tags.includes(tag) ? 'selected' : ''}`}
                                        onClick={() => addPredefinedTag(tag)}
                                        disabled={tags.includes(tag)}
                                    >
                                        {tag}
                                    </button>
                                ))}
                            </div>
                            
                            <div className="selected-tags">
                                {tags.map(tag => (
                                    <span key={tag} className="selected-tag">
                                        {tag}
                                        <button 
                                            onClick={() => removeTag(tag)}
                                            className="remove-tag-btn"
                                        >
                                            ×
                                        </button>
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                    
                    <div className="form-tips">
                        <h4>💡 Tips for a great question:</h4>
                        <ul>
                            <li>Be specific about what you're trying to achieve</li>
                            <li>Mention what tools or methods you've already tried</li>
                            <li>Include relevant context about your project</li>
                            <li>Use clear, descriptive tags to help others find your question</li>
                        </ul>
                    </div>
                </div>
                
                <div className="modal-footer">
                    <button 
                        className="cancel-btn" 
                        onClick={onClose}
                        disabled={isSubmitting}
                    >
                        Cancel
                    </button>
                    <button 
                        className="submit-btn" 
                        onClick={handleSubmit}
                        disabled={isSubmitting || !title.trim() || !content.trim()}
                    >
                        {isSubmitting ? 'Posting...' : 'Post Question'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AskQuestion; 