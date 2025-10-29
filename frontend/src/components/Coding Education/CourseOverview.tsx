import React from 'react';
import '../../styles/Coding Education/CourseOverview.css';

const CourseOverview: React.FC = () => {
  const modules = [
    {
      title: "Frontend Foundations",
      icon: "🎨",
      description: "Learn HTML, CSS, and JavaScript essentials with hands-on practice",
      topics: ["HTML & CSS Basics", "JavaScript Fundamentals", "DOM Manipulation", "Responsive Design"]
    },
    {
      title: "Backend Development",
      icon: "⚙️",
      description: "Build and connect to databases using Supabase",
      topics: ["Database Design", "Supabase Integration", "API Development", "Data Modeling"]
    },
    {
      title: "Full-Stack Integration",
      icon: "🔗",
      description: "Link frontend and backend to build real web apps",
      topics: ["Frontend-Backend Connection", "State Management", "Authentication", "Real-time Features"]
    },
    {
      title: "Deployment",
      icon: "🚀",
      description: "Host projects live using Vercel and GitHub",
      topics: ["GitHub for Version Control", "Vercel Deployment", "Live Site Management", "Domain Setup"]
    }
  ];

  return (
    <section id="course-overview" className="course-overview">
      <div className="overview-container">
        <div className="section-header">
          <h2 className="section-title">What You'll Learn</h2>
          <p className="section-subtitle">
            Practical, hands-on learning designed to take you from complete beginner to deploying your own live web application
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
            <div className="stat-number">8</div>
            <div className="stat-label">Weeks</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">1-on-1</div>
            <div className="stat-label">Coaching</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">1</div>
            <div className="stat-label">Live App</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">3+ Years</div>
            <div className="stat-label">Expertise</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseOverview;
