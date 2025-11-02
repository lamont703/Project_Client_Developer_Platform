import React from 'react';
import '../../styles/Coding Education/CourseOverview.css';

const CourseOverview: React.FC = () => {
  const modules = [
    {
      title: "Frontend Foundations",
      icon: "🎨",
      description: "Build client-facing interfaces that impress. Learn HTML, CSS, and JavaScript essentials that translate directly to freelance projects.",
      topics: ["HTML & CSS Basics", "JavaScript Fundamentals", "DOM Manipulation", "Responsive Design"],
      freelanceValue: "Create beautiful interfaces clients will love"
    },
    {
      title: "Backend Development",
      icon: "⚙️",
      description: "Handle client data securely with real-world patterns. Build and connect to databases using Supabase—skills every client project needs.",
      topics: ["Database Design", "Supabase Integration", "API Development", "Data Modeling"],
      freelanceValue: "Handle client data like a professional"
    },
    {
      title: "Full-Stack Integration",
      icon: "🔗",
      description: "Deliver complete solutions clients need. Link frontend and backend to build real web apps that showcase your full capabilities.",
      topics: ["Frontend-Backend Connection", "State Management", "Authentication", "Real-time Features"],
      freelanceValue: "Deliver end-to-end solutions clients hire for"
    },
    {
      title: "Deployment",
      icon: "🚀",
      description: "Showcase live apps as portfolio pieces. Host projects live using Vercel and GitHub—the same tools clients expect you to know.",
      topics: ["GitHub for Version Control", "Vercel Deployment", "Live Site Management", "Domain Setup"],
      freelanceValue: "Launch client projects professionally"
    }
  ];

  return (
    <section id="course-overview" className="course-overview">
      <div className="overview-container">
        <div className="section-header">
          <h2 className="section-title">What You'll Learn</h2>
          <p className="section-subtitle">
            Practical, hands-on learning designed to take you from complete beginner to deploying your own live web application. Every module teaches skills that directly translate to client work—by week 8, you'll have a live application that demonstrates you can handle real freelance projects.
          </p>
        </div>
        
        <div className="modules-grid">
          {modules.map((module, index) => (
            <div key={index} className="module-card">
              <div className="module-icon">{module.icon}</div>
              <h3 className="module-title">{module.title}</h3>
              <p className="module-description">{module.description}</p>
              {module.freelanceValue && (
                <div className="freelance-badge">
                  <span className="freelance-badge-icon">💼</span>
                  <span className="freelance-badge-text">{module.freelanceValue}</span>
                </div>
              )}
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
            <div className="stat-label">Portfolio Project</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">100%</div>
            <div className="stat-label">Freelance-Ready</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseOverview;
