import React, { useEffect, useState } from 'react';
import '../styles/ProjectsListing/ProjectsListingPage.css';
import ProjectCard from '../components/ProjectsListing/ProjectCard';

interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  skills: string[];
  budget?: string;
  timeline?: string;
  formEmbedCode?: string;
  formId?: string;
  status: 'open' | 'closed';
  postedDate: string;
}

interface ProjectsListingPageProps {
  navigateToHome?: () => void;
}

const ProjectsListingPage: React.FC<ProjectsListingPageProps> = ({ navigateToHome }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    document.title = 'Software Projects - Developer Opportunities';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Browse available software projects and express your interest. Connect with project owners and find your next opportunity.');
    }

    // Load form embed script
    const existingFormScript = document.querySelector<HTMLScriptElement>(
      'script[src="https://link.msgsndr.com/js/form_embed.js"]'
    );

    if (!existingFormScript) {
      const formScript = document.createElement('script');
      formScript.src = 'https://link.msgsndr.com/js/form_embed.js';
      formScript.async = true;
      document.body.appendChild(formScript);
    }

    // Load sample projects (in production, this would come from an API)
    const sampleProjects: Project[] = [
      {
        id: '1',
        title: 'Backend Developer (Supabase & Next.js) – The Komet Book App',
        description: 'Kane\'s Bookstore is looking for a skilled Backend Developer to install the "engines" into The Komet Book App—the funkiest digital library in the universe. We have a high-fidelity "Cyberpunk" frontend blueprint built in Next.js 14 and TypeScript; your mission is to transition this prototype into a live, Supabase-backed production application. You will be responsible for replacing temporary mock data and local storage with a robust database architecture that supports both individual book purchasers and Komet Book Club subscribers.',
        category: 'Web Development',
        skills: ['Supabase', 'PostgreSQL', 'Next.js', 'TypeScript', 'RLS Policies', 'Supabase Storage', 'Realtime', 'Edge Functions', 'State Management'],
        status: 'open',
        postedDate: '2026-01-01'
      },
      {
        id: '2',
        title: 'E-Commerce Platform with AI Recommendations',
        description: 'Build a modern e-commerce platform with AI-powered product recommendations, real-time inventory management, and seamless payment integration.',
        category: 'Web Development',
        skills: ['React', 'Node.js', 'MongoDB', 'AI/ML', 'Stripe API'],
        budget: '$10,000 - $15,000',
        timeline: '8-12 weeks',
        status: 'open',
        postedDate: '2024-01-15'
      },
      {
        id: '3',
        title: 'Mobile App for Task Management',
        description: 'Create a cross-platform mobile application for team task management with real-time collaboration features and push notifications.',
        category: 'Mobile Development',
        skills: ['React Native', 'Firebase', 'TypeScript', 'Redux'],
        budget: '$8,000 - $12,000',
        timeline: '6-10 weeks',
        status: 'open',
        postedDate: '2024-01-20'
      },
      {
        id: '4',
        title: 'Blockchain-Based Supply Chain System',
        description: 'Develop a transparent supply chain management system using blockchain technology for tracking products from origin to consumer.',
        category: 'Blockchain',
        skills: ['Solidity', 'Web3.js', 'Ethereum', 'Smart Contracts', 'Node.js'],
        budget: '$20,000 - $30,000',
        timeline: '12-16 weeks',
        status: 'open',
        postedDate: '2024-01-25'
      }
    ];

    setProjects(sampleProjects);
    setFilteredProjects(sampleProjects);
  }, []);

  useEffect(() => {
    let filtered = projects;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(project => project.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredProjects(filtered);
  }, [selectedCategory, searchTerm, projects]);

  const categories = ['all', 'Web Development', 'Mobile Development', 'Blockchain', 'AI/ML', 'Automation'];

  return (
    <div className="projects-listing-page">
      <div className="circuit-pattern"></div>
      <div className="projects-listing-container">
        
        {/* Header Section */}
        <div className="projects-header">
          <div className="header-content">
            <h1 className="projects-main-title">Software Project Opportunities</h1>
            <p className="projects-subtitle">
              Browse available software projects and express your interest. 
              Connect with project owners and find your next opportunity.
            </p>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="search-filter-section">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search projects by title, description, or skills..."
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="filter-container">
            <label className="filter-label">Filter by Category:</label>
            <select
              className="category-select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="projects-section">
          {filteredProjects.length > 0 ? (
            <>
              <div className="projects-count">
                <span className="count-number">{filteredProjects.length}</span>
                <span className="count-text">Project{filteredProjects.length !== 1 ? 's' : ''} Available</span>
              </div>
              
              <div className="projects-grid">
                {filteredProjects.map(project => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </>
          ) : (
            <div className="no-projects">
              <div className="no-projects-icon">🔍</div>
              <h3 className="no-projects-title">No Projects Found</h3>
              <p className="no-projects-text">
                Try adjusting your search or filter criteria to find more projects.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="projects-footer">
          <p className="footer-text">© {new Date().getFullYear()} Developer Platform. All rights reserved.</p>
        </div>

      </div>
    </div>
  );
};

export default ProjectsListingPage;

