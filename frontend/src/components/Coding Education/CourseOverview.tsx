import React from 'react';
import '../../styles/Coding Education/CourseOverview.css';

const CourseOverview: React.FC = () => {
  const modules = [
    {
      title: "Frontend Development",
      icon: "🎨",
      description: "Master React, TypeScript, and modern frontend frameworks",
      topics: ["React & TypeScript", "State Management", "UI/UX Design", "Responsive Design"]
    },
    {
      title: "Backend Development",
      icon: "⚙️",
      description: "Build robust APIs and server-side applications",
      topics: ["Node.js & Express", "Database Design", "API Development", "Authentication"]
    },
    {
      title: "Deployment & DevOps",
      icon: "🚀",
      description: "Deploy applications and manage production environments",
      topics: ["Cloud Platforms", "CI/CD Pipelines", "Monitoring", "Scaling"]
    }
  ];

  return (
    <section className="course-overview">
      <div className="overview-container">
        <div className="section-header">
          <h2 className="section-title">What You'll Learn</h2>
          <p className="section-subtitle">
            A comprehensive curriculum designed to take you from beginner to job-ready developer
          </p>
        </div>
        
        <div className="modules-grid">
          {modules.map((module, index) => (
            <div key={index} className="module-card">
              <div className="module-icon">{module.icon}</div>
              <h3 className="module-title">{module.title}</h3>
              <p className="module-description">{module.description}</p>
              <ul className="module-topics">
                {module.topics.map((topic, topicIndex) => (
                  <li key={topicIndex} className="topic-item">
                    <span className="topic-check">✓</span>
                    {topic}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="course-stats">
          <div className="stat-item">
            <div className="stat-number">12</div>
            <div className="stat-label">Weeks</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">40+</div>
            <div className="stat-label">Hours</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">3</div>
            <div className="stat-label">Projects</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">1:1</div>
            <div className="stat-label">Mentorship</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseOverview;
