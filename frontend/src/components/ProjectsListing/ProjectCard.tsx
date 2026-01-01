import React, { useState } from 'react';
import '../../styles/ProjectsListing/ProjectCard.css';

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

interface ProjectCardProps {
  project: Project;
}

// Default form ID for project interest submissions
const DEFAULT_FORM_ID = 'gL834V7rJSAFPDl6Vcks';

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const [showForm, setShowForm] = useState(false);

  const handleExpressInterest = () => {
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <>
      <div className={`project-card ${project.status === 'closed' ? 'closed' : ''}`}>
        <div className="project-header">
          <div className="project-status-badge">
            <span className={`status-indicator ${project.status}`}></span>
            <span className="status-text">{project.status === 'open' ? 'Open' : 'Closed'}</span>
          </div>
          <div className="project-category">{project.category}</div>
        </div>

        <h3 className="project-title">{project.title}</h3>
        
        <p className="project-description">{project.description}</p>

        <div className="project-details">
          <div className="detail-item">
            <span className="detail-icon">💰</span>
            <span className="detail-label">Budget:</span>
            <span className="detail-value">{project.budget || 'To be discussed'}</span>
          </div>
          <div className="detail-item">
            <span className="detail-icon">⏱️</span>
            <span className="detail-label">Timeline:</span>
            <span className="detail-value">{project.timeline || 'To be discussed'}</span>
          </div>
          <div className="detail-item">
            <span className="detail-icon">📅</span>
            <span className="detail-label">Posted:</span>
            <span className="detail-value">{formatDate(project.postedDate)}</span>
          </div>
        </div>

        <div className="project-skills">
          <span className="skills-label">Required Skills:</span>
          <div className="skills-tags">
            {project.skills.map((skill, index) => (
              <span key={index} className="skill-tag">{skill}</span>
            ))}
          </div>
        </div>

        {project.status === 'open' && (
          <button 
            className="express-interest-button"
            onClick={handleExpressInterest}
          >
            Express Interest
          </button>
        )}

        {project.status === 'closed' && (
          <div className="closed-message">
            This project is no longer accepting applications.
          </div>
        )}
      </div>

      {/* Interest Form Modal */}
      {showForm && (
        <div className="form-modal-overlay" onClick={handleFormClose}>
          <div className="form-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="form-modal-header">
              <h3 className="form-modal-title">Express Interest: {project.title}</h3>
              <button className="form-modal-close" onClick={handleFormClose}>×</button>
            </div>
            
            <div className="form-modal-body">
              <p className="form-instructions">
                Fill out the form below to express your interest in this project. 
                The project owner will review your submission and get back to you.
              </p>
              
              <div className="form-embed-container">
                <iframe
                  src={`https://api.leadconnectorhq.com/widget/form/${project.formId || DEFAULT_FORM_ID}`}
                  style={{ width: '100%', border: 'none', borderRadius: '3px' }}
                  className="form-embed-iframe"
                  id={`inline-${project.formId || DEFAULT_FORM_ID}`}
                  data-layout="{'id':'INLINE'}"
                  data-trigger-type="alwaysShow"
                  data-trigger-value=""
                  data-activation-type="alwaysActivated"
                  data-activation-value=""
                  data-deactivation-type="neverDeactivate"
                  data-deactivation-value=""
                  data-form-name={`School of Freelancer Freedom Project Interest - ${project.title}`}
                  data-height="600"
                  data-layout-iframe-id={`inline-${project.formId || DEFAULT_FORM_ID}`}
                  data-form-id={project.formId || DEFAULT_FORM_ID}
                  title={`School of Freelancer Freedom Project Interest - ${project.title}`}
                  scrolling="yes"
                  allow="autoplay; encrypted-media"
                  loading="lazy"
                  frameBorder="0"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectCard;

