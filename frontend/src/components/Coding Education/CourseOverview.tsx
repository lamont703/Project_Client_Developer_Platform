import React, { useState } from 'react';
import '../../styles/Coding Education/CourseOverview.css';

const CourseOverview: React.FC = () => {
  const [expandedWeek, setExpandedWeek] = useState<number | null>(null);

  const curriculum = [
    {
      week: 1,
      theme: "Foundations & AI-Assisted Coding Mindset",
      icon: "🧭",
      technical: [
        "HTML, CSS, JS basics",
        "Local environment setup",
        "Git/GitHub fundamentals",
        "Cursor AI setup & configuration"
      ],
      freelance: [
        "Setting up personal brand (LinkedIn, portfolio page)",
        "How to introduce yourself as an 'AI-assisted developer'",
        "Understanding freelance business models (hourly vs. fixed vs. retainer)"
      ],
      deliverables: [
        "Portfolio skeleton page + short 'About Me' blurb",
        "Profile setup on one freelance network (Upwork, Contra, Fiverr Pro)"
      ]
    },
    {
      week: 2,
      theme: "JavaScript Logic + Freelancer Operations",
      icon: "⚙️",
      technical: [
        "JS variables, functions, loops, DOM",
        "Cursor for debugging + code explanation",
        "Problem-solving with AI assistance"
      ],
      freelance: [
        "How to read client briefs & write strong proposals",
        "Setting up project pipelines in GoHighLevel / Trello / Notion",
        "Writing first contract templates & NDAs (AI-assisted legal drafts)"
      ],
      deliverables: [
        "Mini JS app",
        "Signed sample NDA template generated with AI"
      ]
    },
    {
      week: 3,
      theme: "React Frontend & Client Prototyping",
      icon: "⚛️",
      technical: [
        "React basics, components, state, props",
        "Tailwind CSS styling",
        "Component architecture"
      ],
      freelance: [
        "How to scope front-end features & create clickable mockups",
        "Using AI to estimate project timelines",
        "How to present prototypes to clients effectively"
      ],
      deliverables: [
        "React portfolio homepage",
        "'Client demo' prototype of a simple landing page"
      ]
    },
    {
      week: 4,
      theme: "Backend APIs + Managing Deliverables",
      icon: "🔌",
      technical: [
        "Node.js & Express fundamentals",
        "REST APIs, routes, JSON handling",
        "API design best practices"
      ],
      freelance: [
        "Structuring repositories for hand-off",
        "Deliverable formatting (readme, docs, deployment links)",
        "Revision policy & change request handling"
      ],
      deliverables: [
        "API for sample project",
        "'Client delivery pack' (zip + docs)"
      ]
    },
    {
      week: 5,
      theme: "Databases, Auth, and Payment Handling",
      icon: "🔐",
      technical: [
        "Supabase setup & configuration",
        "Row Level Security (RLS)",
        "CRUD operations",
        "User authentication systems"
      ],
      freelance: [
        "Integrating Stripe/PayPal for project payments",
        "Handling deposits, milestones, and invoices",
        "Using AI to write scopes & contracts that protect both sides"
      ],
      deliverables: [
        "Authenticated full-stack 'Notes' app",
        "Auto-generated invoice template"
      ]
    },
    {
      week: 6,
      theme: "Full-Stack Integration + Client Project Management",
      icon: "🔗",
      technical: [
        "Connect React frontend + Node backend + Supabase",
        "State management across stack",
        "Deploy to Vercel + Supabase",
        "Production deployment best practices"
      ],
      freelance: [
        "Managing client feedback cycles in pipelines (proposal → contract → build → revision → delivery)",
        "Using AI to summarize client messages and write update emails",
        "Time-tracking & reporting best practices"
      ],
      deliverables: [
        "Fully deployed task-tracking app",
        "Pipeline dashboard screenshot (with one mock project in each stage)"
      ]
    },
    {
      week: 7,
      theme: "AI Workflows & Scaling as a Freelancer",
      icon: "🤖",
      technical: [
        "AI pair programming best practices in Cursor",
        "Auto-documentation, refactoring, and testing with AI",
        "Code optimization with AI assistance"
      ],
      freelance: [
        "How to package services into 'productized offers'",
        "Building automation for your freelance business (GHL or Zapier)",
        "Using analytics & CRM to track leads and conversions"
      ],
      deliverables: [
        "AI-generated reusable project boilerplate",
        "Productized service page ('Prototype + Pitch Deck Package')"
      ]
    },
    {
      week: 8,
      theme: "Capstone Project & Freelance Launch",
      icon: "🚀",
      technical: [
        "Build & deploy final capstone project",
        "Your niche SaaS or client-type solution",
        "Production-ready deployment"
      ],
      freelance: [
        "Prepare and present live demo + proposal as if pitching a client",
        "AI-optimized LinkedIn bio + Upwork profile rewrite",
        "How to find your first $5k client & scale to $20k/mo"
      ],
      deliverables: [
        "Live full-stack app",
        "Polished portfolio with 'case study' section",
        "Signed first contract or proposal (real or mock)"
      ]
    }
  ];

  const toggleWeek = (week: number) => {
    setExpandedWeek(expandedWeek === week ? null : week);
  };

  return (
    <section id="course-overview" className="course-overview">
      <div className="overview-container">
        <div className="section-header">
          <h2 className="section-title">8-Week Curriculum</h2>
          <p className="section-subtitle">
            Most "AI-powered coding bootcamps" teach you how to code, but not how to make money as a developer. By baking freelancing fundamentals + client acquisition systems directly into your 8-week AI Full-Stack Developer Program, you'll produce independent, income-ready devs, not just job seekers.
          </p>
          <p className="section-subtitle section-subtitle-italic">
            Learn to code, ship, and sell full-stack software solutions with AI as your teammate.
          </p>
        </div>
        
        <div className="curriculum-timeline">
          {curriculum.map((week) => (
            <div 
              key={week.week} 
              className={`week-card ${expandedWeek === week.week ? 'expanded' : ''}`}
            >
              <div 
                className="week-header" 
                onClick={() => toggleWeek(week.week)}
              >
                <div className="week-number-badge">
                  <span className="week-number">{week.week}</span>
                </div>
                <div className="week-content-header">
                  <div className="week-icon">{week.icon}</div>
                  <div className="week-header-text">
                    <h3 className="week-title">Week {week.week}</h3>
                    <p className="week-theme">{week.theme}</p>
                  </div>
                </div>
                <button className="expand-button">
                  {expandedWeek === week.week ? '−' : '+'}
                </button>
              </div>
              
              {expandedWeek === week.week && (
                <div className="week-details">
                  <div className="week-section">
                    <h4 className="week-section-title">
                      <span className="section-icon">💻</span>
                      Technical Skills
                    </h4>
                    <ul className="week-list">
                      {week.technical.map((item, index) => (
                        <li key={index} className="week-list-item">
                          <span className="list-check">✓</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="week-section">
                    <h4 className="week-section-title">
                      <span className="section-icon">💼</span>
                      Freelance Layer
                    </h4>
                    <ul className="week-list">
                      {week.freelance.map((item, index) => (
                        <li key={index} className="week-list-item">
                          <span className="list-check">✓</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="week-section deliverables-section">
                    <h4 className="week-section-title">
                      <span className="section-icon">✅</span>
                      Deliverables
                    </h4>
                    <ul className="week-list deliverables-list">
                      {week.deliverables.map((item, index) => (
                        <li key={index} className="week-list-item deliverable-item">
                          <span className="deliverable-check">✓</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
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
            <div className="stat-number">100%</div>
            <div className="stat-label">Freelance-Ready</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">$5k+</div>
            <div className="stat-label">First Client Goal</div>
          </div>
        </div>

        <div className="program-outcomes">
          <h3 className="outcomes-title">🎯 Program Outcomes</h3>
          <p className="outcomes-intro">By graduation, students will:</p>
          <ul className="outcomes-list">
            <li>Have built and deployed multiple full-stack apps</li>
            <li>Know how to use AI like Cursor to code 3× faster</li>
            <li>Own a professional portfolio, branded freelancer profiles, and templated contracts</li>
            <li>Be able to attract, close, and manage real clients</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default CourseOverview;
