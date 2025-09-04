import React, { useState, useEffect, useMemo } from 'react';
import '../../styles/PrototypeShowcase.css';
import AddPrototype from './AddPrototype';
import ApiService from '../../utils/apiConfig';
import { Analytics } from '../../utils/analytics';

interface Prototype {
    id: string;
    title: string;
    description: string;
    github_pages_url: string;
    github_repo_url?: string;
    author: {
        id: string;
        name: string;
        avatar: string;
        reputation: number;
    };
    tags: string[];
    technologies: string[];
    likes: number;
    views: number;
    createdAt: string;
    isFeatured: boolean;
    thumbnail?: string;
    status: 'live' | 'development' | 'archived';
}

const PrototypeShowcase: React.FC = () => {
    const [prototypes, setPrototypes] = useState<Prototype[]>([]);
    const [showAddPrototype, setShowAddPrototype] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTag, setSelectedTag] = useState<string>('all');
    const [sortBy, setSortBy] = useState<'newest' | 'likes' | 'views'>('newest');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

    // Sample prototypes memoized to prevent infinite re-renders
    const samplePrototypes = useMemo((): Prototype[] => [
        {
            id: '1',
            title: 'E-commerce Mobile App Prototype',
            description: 'A fully functional mobile e-commerce app built with React Native. Features include product browsing, cart management, and checkout process.',
            github_pages_url: 'https://username.github.io/ecommerce-prototype',
            github_repo_url: 'https://github.com/username/ecommerce-prototype',
            author: {
                id: '1',
                name: 'Sarah Chen',
                avatar: '👩‍💻',
                reputation: 320
            },
            tags: ['ecommerce', 'mobile', 'react-native'],
            technologies: ['React Native', 'Redux', 'Firebase'],
            likes: 45,
            views: 234,
            createdAt: '2024-01-15T10:30:00Z',
            isFeatured: true,
            status: 'live'
        },
        {
            id: '2',
            title: 'SaaS Dashboard Prototype',
            description: 'A comprehensive dashboard for a SaaS platform with analytics, user management, and billing features.',
            github_pages_url: 'https://username.github.io/saas-dashboard',
            github_repo_url: 'https://github.com/username/saas-dashboard',
            author: {
                id: '2',
                name: 'Alex Thompson',
                avatar: '👨‍💼',
                reputation: 180
            },
            tags: ['saas', 'dashboard', 'analytics'],
            technologies: ['React', 'TypeScript', 'Chart.js'],
            likes: 32,
            views: 189,
            createdAt: '2024-01-14T14:20:00Z',
            isFeatured: false,
            status: 'live'
        },
        {
            id: '3',
            title: 'Real-time Chat Application',
            description: 'A real-time chat application with WebSocket integration, user authentication, and message history.',
            github_pages_url: 'https://username.github.io/chat-app',
            author: {
                id: '3',
                name: 'ProtoBot',
                avatar: '🤖',
                reputation: 1250
            },
            tags: ['chat', 'realtime', 'websockets'],
            technologies: ['Vue.js', 'Socket.io', 'Node.js'],
            likes: 28,
            views: 156,
            createdAt: '2024-01-13T09:15:00Z',
            isFeatured: false,
            status: 'development'
        },
        {
            id: '4',
            title: 'Task Management Tool',
            description: 'A collaborative task management tool with drag-and-drop functionality and team collaboration features.',
            github_pages_url: 'https://username.github.io/task-manager',
            github_repo_url: 'https://github.com/username/task-manager',
            author: {
                id: '4',
                name: 'Maria Rodriguez',
                avatar: '👩‍🎨',
                reputation: 95
            },
            tags: ['task-management', 'collaboration', 'drag-drop'],
            technologies: ['Angular', 'Firebase', 'Material UI'],
            likes: 19,
            views: 98,
            createdAt: '2024-01-12T16:45:00Z',
            isFeatured: false,
            status: 'live'
        }
    ], []);

    useEffect(() => {
        const fetchPrototypes = async () => {
            try {
                const response = await ApiService.getPrototypes();
                if (response.success) {
                    setPrototypes(response.prototypes || []);
                } else {
                    console.error('Failed to fetch prototypes:', response.error);
                    // Fallback to sample data if API fails
                    setPrototypes(samplePrototypes);
                }
            } catch (error) {
                console.error('Error fetching prototypes:', error);
                // Fallback to sample data if API fails
                setPrototypes(samplePrototypes);
            }
        };

        fetchPrototypes();
    }, []);

    const filteredPrototypes = prototypes.filter(prototype => {
        const matchesSearch = prototype.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            prototype.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesTag = selectedTag === 'all' || prototype.tags.includes(selectedTag);
        return matchesSearch && matchesTag;
    }).sort((a, b) => {
        switch (sortBy) {
            case 'likes':
                return b.likes - a.likes;
            case 'views':
                return b.views - a.views;
            default:
                return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }
    });

    const handleLike = async (prototypeId: string) => {
        try {
            const prototype = prototypes.find(p => p.id === prototypeId);
            const previousLikes = prototype?.likes || 0;
            
            const response = await ApiService.likePrototype(prototypeId, 'like');
            if (response.success) {
                // Update the prototype with new like count
                const newLikes = response.likes || previousLikes;
                setPrototypes(prototypes.map(p => 
                    p.id === prototypeId ? { ...p, likes: newLikes } : p
                ));
                
                // Track prototype like
                Analytics.getInstance().trackPrototypeLiked(prototypeId, previousLikes, newLikes);
            } else {
                console.error('Failed to like prototype:', response.error);
                // Fallback to local state update
                const newLikes = previousLikes + 1;
                setPrototypes(prototypes.map(p => 
                    p.id === prototypeId ? { ...p, likes: newLikes } : p
                ));
                
                // Track prototype like (fallback)
                Analytics.getInstance().trackPrototypeLiked(prototypeId, previousLikes, newLikes);
            }
        } catch (error) {
            console.error('Error liking prototype:', error);
            // Fallback to local state update
            const prototype = prototypes.find(p => p.id === prototypeId);
            const previousLikes = prototype?.likes || 0;
            const newLikes = previousLikes + 1;
            setPrototypes(prototypes.map(p => 
                p.id === prototypeId ? { ...p, likes: newLikes } : p
            ));
            
            // Track prototype like (fallback)
            Analytics.getInstance().trackPrototypeLiked(prototypeId, previousLikes, newLikes);
        }
    };

    const handleView = (prototypeId: string) => {
        const prototype = prototypes.find(p => p.id === prototypeId);
        setPrototypes(prototypes.map(p => 
            p.id === prototypeId ? { ...p, views: p.views + 1 } : p
        ));
        
        // Track prototype view
        if (prototype) {
            Analytics.getInstance().trackPrototypeViewed(prototypeId, prototype.title, {
                prototype_author: prototype.author.name,
                prototype_tags: prototype.tags,
                prototype_technologies: prototype.technologies,
                prototype_likes: prototype.likes
            });
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

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'live': return '#10b981';
            case 'development': return '#f59e0b';
            case 'archived': return '#6b7280';
            default: return '#6b7280';
        }
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'live': return '🟢 Live';
            case 'development': return '🟡 In Development';
            case 'archived': return '⚫ Archived';
            default: return '⚫ Unknown';
        }
    };

    const renderPrototypeGrid = () => (
        <div className="prototypes-grid">
            {filteredPrototypes.map(prototype => (
                <div key={prototype.id} className="prototype-card">
                    <div className="prototype-header">
                        <div className="prototype-status" style={{ color: getStatusColor(prototype.status) }}>
                            {getStatusLabel(prototype.status)}
                        </div>
                        {prototype.isFeatured && <div className="featured-badge">Featured</div>}
                    </div>
                    
                    <div className="prototype-content">
                        <h3 className="prototype-title">{prototype.title}</h3>
                        <p className="prototype-description">
                            {prototype.description.substring(0, 120)}...
                        </p>
                        
                        <div className="prototype-links">
                            <a 
                                href={prototype.github_pages_url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="view-prototype-btn"
                                onClick={() => handleView(prototype.id)}
                            >
                                🚀 View Prototype
                            </a>
                            {prototype.github_repo_url && (
                                <a 
                                    href={prototype.github_repo_url} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="view-repo-btn"
                                >
                                    📁 View Code
                                </a>
                            )}
                        </div>
                        
                        <div className="prototype-technologies">
                            {prototype.technologies.slice(0, 3).map(tech => (
                                <span key={tech} className="tech-tag">{tech}</span>
                            ))}
                            {prototype.technologies.length > 3 && (
                                <span className="more-tech">+{prototype.technologies.length - 3} more</span>
                            )}
                        </div>
                        
                        <div className="prototype-tags">
                            {prototype.tags.map(tag => (
                                <span key={tag} className="tag">{tag}</span>
                            ))}
                        </div>
                    </div>
                    
                    <div className="prototype-footer">
                        <div className="prototype-stats">
                            <button 
                                className="like-btn"
                                onClick={() => handleLike(prototype.id)}
                            >
                                ❤️ {prototype.likes}
                            </button>
                            <span className="views">👁️ {prototype.views}</span>
                        </div>
                        
                        <div className="prototype-author">
                            <span className="author-avatar">{prototype.author.avatar}</span>
                            <span className="author-name">{prototype.author.name}</span>
                            <span className="author-reputation">{prototype.author.reputation}</span>
                        </div>
                        
                        <span className="prototype-date">{formatDate(prototype.createdAt)}</span>
                    </div>
                </div>
            ))}
        </div>
    );

    const renderPrototypeList = () => (
        <div className="prototypes-list">
            {filteredPrototypes.map(prototype => (
                <div key={prototype.id} className="prototype-list-item">
                    <div className="prototype-list-header">
                        <div className="prototype-list-title">
                            <h3>{prototype.title}</h3>
                            <div className="prototype-list-status" style={{ color: getStatusColor(prototype.status) }}>
                                {getStatusLabel(prototype.status)}
                            </div>
                        </div>
                        <div className="prototype-list-stats">
                            <button 
                                className="like-btn"
                                onClick={() => handleLike(prototype.id)}
                            >
                                ❤️ {prototype.likes}
                            </button>
                            <span className="views">👁️ {prototype.views}</span>
                        </div>
                    </div>
                    
                    <p className="prototype-list-description">{prototype.description}</p>
                    
                    <div className="prototype-list-links">
                        <a 
                            href={prototype.github_pages_url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="view-prototype-btn"
                            onClick={() => handleView(prototype.id)}
                        >
                            🚀 View Prototype
                        </a>
                        {prototype.github_repo_url && (
                            <a 
                                href={prototype.github_repo_url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="view-repo-btn"
                            >
                                📁 View Code
                            </a>
                        )}
                    </div>
                    
                    <div className="prototype-list-meta">
                        <div className="prototype-list-technologies">
                            {prototype.technologies.map(tech => (
                                <span key={tech} className="tech-tag">{tech}</span>
                            ))}
                        </div>
                        
                        <div className="prototype-list-author">
                            <span className="author-avatar">{prototype.author.avatar}</span>
                            <span className="author-name">{prototype.author.name}</span>
                            <span className="author-reputation">{prototype.author.reputation}</span>
                            <span className="prototype-date">{formatDate(prototype.createdAt)}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );

    const handleAddPrototype = async (prototypeData: {
        title: string;
        description: string;
        githubPagesUrl: string;
        githubRepoUrl?: string;
        tags: string[];
        technologies: string[];
        status: 'live' | 'development' | 'archived';
    }) => {
        try {
            const response = await ApiService.createPrototype({
                title: prototypeData.title,
                description: prototypeData.description,
                githubPagesUrl: prototypeData.githubPagesUrl,
                githubRepoUrl: prototypeData.githubRepoUrl,
                tags: prototypeData.tags,
                technologies: prototypeData.technologies,
                status: prototypeData.status
            });

            if (response.success) {
                // Add the new prototype to the list
                setPrototypes([response.prototype, ...prototypes]);
                setShowAddPrototype(false);
            } else {
                console.error('Failed to create prototype:', response.error);
                // Fallback to local state update
                const newPrototype: Prototype = {
                    id: Date.now().toString(),
                    title: prototypeData.title,
                    description: prototypeData.description,
                    github_pages_url: prototypeData.githubPagesUrl,
                    github_repo_url: prototypeData.githubRepoUrl,
                    author: {
                        id: '1',
                        name: 'Community Member',
                        avatar: '👤',
                        reputation: 150
                    },
                    tags: prototypeData.tags,
                    technologies: prototypeData.technologies,
                    likes: 0,
                    views: 0,
                    createdAt: new Date().toISOString(),
                    isFeatured: false,
                    status: prototypeData.status
                };
                setPrototypes([newPrototype, ...prototypes]);
                setShowAddPrototype(false);
            }
        } catch (error) {
            console.error('Error creating prototype:', error);
            // Fallback to local state update
            const newPrototype: Prototype = {
                id: Date.now().toString(),
                title: prototypeData.title,
                description: prototypeData.description,
                github_pages_url: prototypeData.githubPagesUrl,
                github_repo_url: prototypeData.githubRepoUrl,
                author: {
                    id: '1',
                    name: 'Community Member',
                    avatar: '👤',
                    reputation: 150
                },
                tags: prototypeData.tags,
                technologies: prototypeData.technologies,
                likes: 0,
                views: 0,
                createdAt: new Date().toISOString(),
                isFeatured: false,
                status: prototypeData.status
            };
            setPrototypes([newPrototype, ...prototypes]);
            setShowAddPrototype(false);
        }
    };

    return (
        <div className="prototype-showcase">
            <div className="showcase-header">
                <h2>🚀 Prototype Gallery</h2>
                <p>Explore working prototypes from our community</p>
                <button 
                    className="add-prototype-btn"
                    onClick={() => setShowAddPrototype(true)}
                >
                    + Share Your Prototype
                </button>
            </div>
            
            <div className="showcase-filters">
                <div className="search-section">
                    <input
                        type="text"
                        placeholder="Search prototypes..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                </div>
                
                <div className="filter-controls">
                    <select 
                        value={selectedTag} 
                        onChange={(e) => setSelectedTag(e.target.value)}
                        className="tag-filter"
                        aria-label="Filter by tag"
                    >
                        <option value="all">All Categories</option>
                        <option value="ecommerce">E-commerce</option>
                        <option value="saas">SaaS</option>
                        <option value="mobile">Mobile</option>
                        <option value="chat">Chat</option>
                        <option value="task-management">Task Management</option>
                        <option value="dashboard">Dashboard</option>
                        <option value="analytics">Analytics</option>
                    </select>
                    
                    <select 
                        value={sortBy} 
                        onChange={(e) => setSortBy(e.target.value as any)}
                        className="sort-filter"
                        aria-label="Sort prototypes"
                    >
                        <option value="newest">Newest</option>
                        <option value="likes">Most Liked</option>
                        <option value="views">Most Viewed</option>
                    </select>
                    
                    <div className="view-toggle">
                        <button 
                            className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                            onClick={() => setViewMode('grid')}
                        >
                            📱 Grid
                        </button>
                        <button 
                            className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                            onClick={() => setViewMode('list')}
                        >
                            📋 List
                        </button>
                    </div>
                </div>
            </div>
            
            <div className="showcase-content">
                {filteredPrototypes.length === 0 ? (
                    <div className="no-prototypes">
                        <h3>No prototypes found</h3>
                        <p>Try adjusting your search or filters</p>
                    </div>
                ) : (
                    viewMode === 'grid' ? renderPrototypeGrid() : renderPrototypeList()
                )}
            </div>
            
            {showAddPrototype && (
                <AddPrototype
                    onClose={() => setShowAddPrototype(false)}
                    onSubmit={handleAddPrototype}
                />
            )}
        </div>
    );
};

export default PrototypeShowcase; 