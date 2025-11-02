import React from 'react';
import '../../styles/Coding Education/FreelanceReadySkills.css';

interface FreelanceReadySkillsProps {
  onScheduleClick?: () => void;
}

const FreelanceReadySkills: React.FC<FreelanceReadySkillsProps> = ({ onScheduleClick }) => {
  const skills = [
    {
      icon: '💼',
      title: 'Portfolio-Building Projects',
      description: 'Every project you build is designed to showcase your full-stack capabilities to potential clients. Your deployed app becomes a living portfolio piece.',
      benefits: [
        'Real, working applications you can show clients',
        'Demonstrates frontend, backend, and deployment skills',
        'GitHub repository shows your code quality',
        'Live URL you can share in proposals'
      ]
    },
    {
      icon: '💬',
      title: 'Client Communication Basics',
      description: 'Learn how to present your work professionally, explain technical concepts to non-technical clients, and set expectations for project timelines.',
      benefits: [
        'How to discuss your portfolio project with clients',
        'Translating technical skills into client value',
        'Setting realistic project timelines',
        'Professional presentation of your work'
      ]
    },
    {
      icon: '💰',
      title: 'Pricing & Proposal Fundamentals',
      description: 'Understand how to position your skills, structure project proposals, and price your services based on the value you deliver.',
      benefits: [
        'How to value your full-stack skills',
        'Project-based vs. hourly pricing',
        'Writing winning proposals',
        'Positioning your portfolio project'
      ]
    },
    {
      icon: '🎯',
      title: 'GitHub Profile Optimization',
      description: 'Set up your GitHub profile to showcase your work professionally. Learn what clients look for and how to present your code.',
      benefits: [
        'Professional GitHub profile setup',
        'What clients actually look for',
        'Showcasing your deployed projects',
        'Code presentation best practices'
      ]
    },
    {
      icon: '🚀',
      title: 'Live App Presentation',
      description: 'Turn your deployed application into a compelling portfolio piece. Learn how to present it in client meetings and proposals.',
      benefits: [
        'How to demo your app effectively',
        'Highlighting the technologies you know',
        'Discussing features and functionality',
        'Using your project to land clients'
      ]
    },
    {
      icon: '📈',
      title: 'Next Steps Guidance',
      description: 'Get guidance on how to find your first clients, build on your portfolio, and continue growing as a freelance developer after the program.',
      benefits: [
        'Where to find first clients',
        'Building on your portfolio',
        'Scaling your freelance business',
        'Ongoing mentorship opportunities'
      ]
    }
  ];

  return (
    <section id="freelance-skills" className="freelance-ready-skills">
      <div className="freelance-container">
        <div className="section-header">
          <h2 className="section-title">💼 Built for Freelancers: Every Project is a Portfolio Piece</h2>
          <p className="section-subtitle">
            This program is designed with freelancers in mind. Beyond coding skills, you'll learn how to position yourself, 
            showcase your work, and land your first clients. Your deployed app isn't just a learning project—it's your first portfolio piece.
          </p>
        </div>

        <div className="skills-grid">
          {skills.map((skill, index) => (
            <div key={index} className="skill-card">
              <div className="skill-icon">{skill.icon}</div>
              <h3 className="skill-title">{skill.title}</h3>
              <p className="skill-description">{skill.description}</p>
              <ul className="skill-benefits">
                {skill.benefits.map((benefit, benefitIndex) => (
                  <li key={benefitIndex} className="benefit-item">
                    <span className="benefit-check">✓</span>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="freelance-cta">
          <h3 className="cta-title">Ready to Start Your Freelance Journey?</h3>
          <p className="cta-text">
            Begin building the portfolio project that will land you your first clients. 
            Schedule your first session to learn how we'll position you for freelance success.
          </p>
          <button 
            onClick={onScheduleClick}
            className="cta-button"
          >
            Start Building Your Portfolio →</button>
        </div>
      </div>
    </section>
  );
};

export default FreelanceReadySkills;

