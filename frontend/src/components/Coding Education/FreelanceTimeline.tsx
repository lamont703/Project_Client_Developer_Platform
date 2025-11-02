import React from 'react';
import '../../styles/Coding Education/FreelanceTimeline.css';

const FreelanceTimeline: React.FC = () => {
  const timelineSteps = [
    {
      week: 'Week 1-2',
      phase: 'Foundation',
      title: 'Build Core Skills',
      description: 'Start learning frontend and backend fundamentals. Every concept you learn will be something you can offer clients.',
      freelanceFocus: 'Foundation skills that clients hire for'
    },
    {
      week: 'Week 3-5',
      phase: 'Development',
      title: 'Create Your Portfolio Project',
      description: 'Build your full-stack application. This isn\'t just a learning exercise—it\'s the project you\'ll showcase to potential clients.',
      freelanceFocus: 'Your first portfolio piece comes to life'
    },
    {
      week: 'Week 6-7',
      phase: 'Integration',
      title: 'Complete Full-Stack App',
      description: 'Connect all pieces and deploy your application live. This is what clients will see when evaluating your work.',
      freelanceFocus: 'Live, deployed project for your portfolio'
    },
    {
      week: 'Week 8',
      phase: 'Launch',
      title: 'Deploy & Present',
      description: 'Finalize deployment, optimize your GitHub profile, and learn how to present your work to potential clients.',
      freelanceFocus: 'Portfolio-ready and client-presentation ready'
    },
    {
      week: 'Post-Graduation',
      phase: 'Freelancing',
      title: 'Land Your First Client',
      description: 'Use your deployed portfolio project to land your first freelance client. Get guidance on client acquisition and proposal writing.',
      freelanceFocus: 'From portfolio to paid projects'
    }
  ];

  return (
    <section className="freelance-timeline">
      <div className="timeline-container">
        <div className="section-header">
          <h2 className="section-title">From Learning to Freelancing: Your Journey</h2>
          <p className="section-subtitle">
            See how the 8-week program prepares you for freelance success. Every week builds toward your portfolio project, 
            and every skill is something clients actually pay for.
          </p>
        </div>

        <div className="timeline-steps">
          {timelineSteps.map((step, index) => (
            <div key={index} className="timeline-step">
              <div className="timeline-marker">
                <div className="marker-week">{step.week}</div>
                <div className="marker-phase">{step.phase}</div>
              </div>
              <div className="timeline-content">
                <h3 className="step-title">{step.title}</h3>
                <p className="step-description">{step.description}</p>
                <div className="freelance-badge-small">
                  <span className="badge-icon">💼</span>
                  <span className="badge-text">{step.freelanceFocus}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="timeline-outcome">
          <div className="outcome-card">
            <div className="outcome-icon">🎯</div>
            <h3 className="outcome-title">Your Portfolio Project</h3>
            <p className="outcome-text">
              By the end of week 8, you'll have a live, deployed full-stack application that demonstrates 
              you can handle real client projects. This becomes your #1 marketing tool.
            </p>
          </div>
          <div className="outcome-card">
            <div className="outcome-icon">🚀</div>
            <h3 className="outcome-title">Freelance-Ready Skills</h3>
            <p className="outcome-text">
              You'll know how to build, deploy, and present your work. Plus, you'll understand how to position 
              yourself and find your first clients.
            </p>
          </div>
          <div className="outcome-card">
            <div className="outcome-icon">💬</div>
            <h3 className="outcome-title">Ongoing Support</h3>
            <p className="outcome-text">
              Get guidance on client acquisition, proposal writing, and scaling your freelance business even after 
              the program ends.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FreelanceTimeline;

