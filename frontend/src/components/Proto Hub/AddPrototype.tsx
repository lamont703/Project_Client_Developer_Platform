import React, { useState } from 'react';
import '../../styles/AddPrototype.css';

interface AddPrototypeProps {
    onClose: () => void;
    onSubmit: (prototype: {
        title: string;
        description: string;
        githubPagesUrl: string;
        githubRepoUrl?: string;
        tags: string[];
        technologies: string[];
        status: 'live' | 'development' | 'archived';
    }) => void;
}

const AddPrototype: React.FC<AddPrototypeProps> = ({ onClose, onSubmit }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [githubPagesUrl, setGithubPagesUrl] = useState('');
    const [githubRepoUrl, setGithubRepoUrl] = useState('');
    const [tags, setTags] = useState<string[]>([]);
    const [technologies, setTechnologies] = useState<string[]>([]);
    const [status, setStatus] = useState<'live' | 'development' | 'archived'>('live');
    const [tempTag, setTempTag] = useState('');
    const [tempTech, setTempTech] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const predefinedTags = [
        'ecommerce', 'saas', 'mobile', 'web', 'chat', 'task-management', 
        'dashboard', 'analytics', 'social', 'education', 'healthcare', 'finance'
    ];

    const predefinedTechnologies = [
        'React', 'Vue.js', 'Angular', 'Node.js', 'Python', 'Ruby', 'PHP',
        'TypeScript', 'JavaScript', 'CSS3', 'HTML5', 'Firebase', 'AWS',
        'MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'Docker', 'Kubernetes'
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

    const addTechnology = () => {
        if (tempTech.trim() && !technologies.includes(tempTech.trim())) {
            setTechnologies([...technologies, tempTech.trim()]);
            setTempTech('');
        }
    };

    const removeTechnology = (techToRemove: string) => {
        setTechnologies(technologies.filter(tech => tech !== techToRemove));
    };

    const addPredefinedTag = (tag: string) => {
        if (!tags.includes(tag)) {
            setTags([...tags, tag]);
        }
    };

    const addPredefinedTechnology = (tech: string) => {
        if (!technologies.includes(tech)) {
            setTechnologies([...technologies, tech]);
        }
    };

    const validateGithubPagesUrl = (url: string) => {
        return url.includes('github.io') || url.includes('vercel.app') || url.includes('netlify.app');
    };

    const handleSubmit = async () => {
        if (!title.trim() || !description.trim() || !githubPagesUrl.trim()) {
            alert('Please fill in all required fields');
            return;
        }

        if (!validateGithubPagesUrl(githubPagesUrl)) {
            alert('Please provide a valid GitHub Pages URL (github.io, vercel.app, or netlify.app)');
            return;
        }

        if (tags.length === 0) {
            alert('Please add at least one tag');
            return;
        }

        if (technologies.length === 0) {
            alert('Please add at least one technology');
            return;
        }

        setIsSubmitting(true);
        
        try {
            await onSubmit({
                title: title.trim(),
                description: description.trim(),
                githubPagesUrl: githubPagesUrl.trim(),
                githubRepoUrl: githubRepoUrl.trim() || undefined,
                tags,
                technologies,
                status
            });
            
            // Reset form
            setTitle('');
            setDescription('');
            setGithubPagesUrl('');
            setGithubRepoUrl('');
            setTags([]);
            setTechnologies([]);
            setStatus('live');
            onClose();
        } catch (error) {
            console.error('Error submitting prototype:', error);
            alert('Failed to submit prototype. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            
            // Add null checks for DOM queries
            const tagInput = document.querySelector('.tag-input') as HTMLInputElement | null;
            const techInput = document.querySelector('.tech-input') as HTMLInputElement | null;
            
            if (tagInput && e.target === tagInput) {
                addTag();
            } else if (techInput && e.target === techInput) {
                addTechnology();
            }
        }
    };

    return (
        <div className="add-prototype-overlay">
            <div className="add-prototype-modal">
                <div className="modal-header">
                    <h2>🚀 Share Your Prototype</h2>
                    <button className="close-btn" onClick={onClose}>×</button>
                </div>
                
                <div className="modal-content">
                    <div className="form-group">
                        <label htmlFor="prototype-title">Prototype Title *</label>
                        <input
                            id="prototype-title"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="e.g., E-commerce Mobile App Prototype"
                            maxLength={100}
                        />
                        <div className="char-count">{title.length}/100</div>
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="prototype-description">Description *</label>
                        <textarea
                            id="prototype-description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Describe your prototype, its features, and what makes it unique..."
                            rows={4}
                            maxLength={500}
                        />
                        <div className="char-count">{description.length}/500</div>
                    </div>
                    
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="github-pages-url">GitHub Pages URL *</label>
                            <input
                                id="github-pages-url"
                                type="url"
                                value={githubPagesUrl}
                                onChange={(e) => setGithubPagesUrl(e.target.value)}
                                placeholder="https://username.github.io/project-name"
                            />
                            <div className="field-help">Must be a GitHub Pages, Vercel, or Netlify URL</div>
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="github-repo-url">GitHub Repository URL (Optional)</label>
                            <input
                                id="github-repo-url"
                                type="url"
                                value={githubRepoUrl}
                                onChange={(e) => setGithubRepoUrl(e.target.value)}
                                placeholder="https://github.com/username/project-name"
                            />
                            <div className="field-help">Share your code for others to learn from</div>
                        </div>
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="prototype-status">Status *</label>
                        <select
                            id="prototype-status"
                            value={status}
                            onChange={(e) => setStatus(e.target.value as any)}
                        >
                            <option value="live">🟢 Live - Fully functional</option>
                            <option value="development">🟡 In Development - Work in progress</option>
                            <option value="archived">⚫ Archived - No longer maintained</option>
                        </select>
                    </div>
                    
                    <div className="form-group">
                        <label>Technologies Used *</label>
                        <div className="tags-input-section">
                            <div className="tag-input-container">
                                <input
                                    type="text"
                                    className="tech-input"
                                    value={tempTech}
                                    onChange={(e) => setTempTech(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Add technology..."
                                />
                                <button 
                                    type="button" 
                                    onClick={addTechnology}
                                    className="add-tag-btn"
                                    disabled={!tempTech.trim()}
                                >
                                    +
                                </button>
                            </div>
                            
                            <div className="predefined-tags">
                                <span className="tags-label">Popular technologies:</span>
                                {predefinedTechnologies.map(tech => (
                                    <button
                                        key={tech}
                                        type="button"
                                        className={`predefined-tag ${technologies.includes(tech) ? 'selected' : ''}`}
                                        onClick={() => addPredefinedTechnology(tech)}
                                        disabled={technologies.includes(tech)}
                                    >
                                        {tech}
                                    </button>
                                ))}
                            </div>
                            
                            <div className="selected-tags">
                                {technologies.map(tech => (
                                    <span key={tech} className="selected-tag">
                                        {tech}
                                        <button 
                                            onClick={() => removeTechnology(tech)}
                                            className="remove-tag-btn"
                                        >
                                            ×
                                        </button>
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                    
                    <div className="form-group">
                        <label>Tags *</label>
                        <div className="tags-input-section">
                            <div className="tag-input-container">
                                <input
                                    type="text"
                                    className="tag-input"
                                    value={tempTag}
                                    onChange={(e) => setTempTag(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Add tag..."
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
                                <span className="tags-label">Popular categories:</span>
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
                        <h4>💡 Tips for a great prototype showcase:</h4>
                        <ul>
                            <li>Make sure your GitHub Pages site is live and functional</li>
                            <li>Include a clear description of what your prototype does</li>
                            <li>List all the main technologies you used</li>
                            <li>Add relevant tags to help others discover your work</li>
                            <li>Consider sharing your repository for learning purposes</li>
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
                        disabled={isSubmitting || !title.trim() || !description.trim() || !githubPagesUrl.trim() || tags.length === 0 || technologies.length === 0}
                    >
                        {isSubmitting ? 'Sharing...' : 'Share Prototype'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddPrototype; 