import React, { useState, useRef, useEffect } from 'react';
import '../../styles/Coding Education/LearningSetupGuide.css';
import IntroVideo from './IntroVideo';

interface SetupStep {
  id: string;
  title: string;
  description: string;
  steps: string[];
  videoId?: string; // YouTube or video URL
  videoTitle?: string;
  completed: boolean;
}

interface LearningSetupGuideProps {
  onScheduleClick?: () => void;
}

const LearningSetupGuide: React.FC<LearningSetupGuideProps> = ({ onScheduleClick }) => {
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());
  const progressFillRef = useRef<HTMLDivElement>(null);

  const toggleStepComplete = (stepId: string) => {
    setCompletedSteps(prev => {
      const newSet = new Set(prev);
      if (newSet.has(stepId)) {
        newSet.delete(stepId);
      } else {
        newSet.add(stepId);
      }
      return newSet;
    });
  };

  const setupSteps: SetupStep[] = [
    {
      id: 'mental-prep',
      title: 'Mental Preparation for Your 8-Week Journey',
      description: 'Get ready mentally and understand what to expect during this intensive learning experience.',
      steps: [
        'Commit to 5-10 minute daily check-ins with your instructor',
        'Set realistic expectations: you will make mistakes, and that\'s part of learning',
        'Prepare your schedule: block out time for coding practice outside of sessions',
        'Understand this is a hands-on, project-based program - you\'ll build as you learn',
        'Be ready to ask questions - no question is too basic'
      ],
      videoId: 'YOUR_VIDEO_ID_1', // Replace with actual video ID
      videoTitle: 'Introduction: What to Expect in Your 8-Week Journey',
      completed: false
    },
    {
      id: 'cursor-ide',
      title: 'Install and Setup Cursor IDE',
      description: 'Cursor is the AI-powered code editor we\'ll use throughout the course. Let\'s get you set up.',
      steps: [
        'Visit cursor.sh and download Cursor for your operating system (Mac, Windows, or Linux)',
        'Install Cursor and open the application',
        'Sign in or create a free Cursor account',
        'Install the essential extensions: Prettier (code formatting) and ESLint (code quality)',
        'Familiarize yourself with Cursor\'s AI features - we\'ll use these heavily!',
        'Test that Cursor is working by creating a test file'
      ],
      videoId: 'YOUR_VIDEO_ID_2', // Replace with actual video ID
      videoTitle: 'Setting Up Cursor IDE: Your New Best Friend',
      completed: false
    },
    {
      id: 'github-setup',
      title: 'Create Your GitHub Account',
      description: 'GitHub is where we\'ll store all your code and deploy your projects.',
      steps: [
        'Visit github.com and create a free account',
        'Choose a professional username (this might be visible on your projects)',
        'Verify your email address',
        'Complete your GitHub profile with a photo and bio',
        'Create your first repository (we\'ll name it together in the first session)'
      ],
      videoId: 'YOUR_VIDEO_ID_3', // Replace with actual video ID
      videoTitle: 'GitHub Basics: Your Code\'s Home',
      completed: false
    },
    {
      id: 'development-env',
      title: 'Prepare Your Development Environment',
      description: 'Set up the tools you\'ll need for web development.',
      steps: [
        'Install Node.js (we\'ll use the LTS version) from nodejs.org',
        'Verify installation by opening terminal/command prompt and typing: node --version',
        'Install Git (if not already installed) - check with: git --version',
        'Install a modern web browser (Chrome, Firefox, or Edge)',
        'Set up your terminal preferences (we\'ll customize together)'
      ],
      videoId: 'YOUR_VIDEO_ID_4', // Replace with actual video ID
      videoTitle: 'Development Environment Setup',
      completed: false
    },
    {
      id: 'first-project',
      title: 'Create Your First Project Folder',
      description: 'Let\'s create the folder structure where all your learning will happen.',
      steps: [
        'Create a folder on your computer called "coding-projects" (or similar)',
        'Open this folder in Cursor IDE',
        'Create a subfolder called "week-1" inside it',
        'We\'ll populate this folder together in your first session!'
      ],
      videoId: 'YOUR_VIDEO_ID_5', // Replace with actual video ID
      videoTitle: 'Organizing Your Learning Space',
      completed: false
    },
    {
      id: 'freelance-foundation',
      title: 'Set Up Your Freelancer Foundation',
      description: 'Prepare your professional presence while you learn. This foundation will support your freelance journey.',
      steps: [
        'Create or update your LinkedIn profile (if you don\'t have one)',
        'Prepare a professional email address for client communication',
        'Think about your professional brand: what makes you unique?',
        'Set up a calendar system for scheduling (we\'ll use this for sessions and future client calls)',
        'Create a simple "Portfolio Coming Soon" page concept (we\'ll build the real one!)'
      ],
      videoId: 'YOUR_VIDEO_ID_6', // Replace with actual video ID
      videoTitle: 'Building Your Freelancer Foundation',
      completed: false
    }
  ];

  useEffect(() => {
    if (progressFillRef.current) {
      const progress = (completedSteps.size / setupSteps.length) * 100;
      progressFillRef.current.style.width = `${progress}%`;
    }
  }, [completedSteps, setupSteps.length]);

  return (
    <section className="learning-setup-guide">
      <div className="setup-container">
        <div className="setup-header">
          <h2 className="setup-title">🚀 Start Learning Immediately</h2>
          <p className="setup-subtitle">
            Don't wait for the program to start—begin setting up your learning environment right now. 
            Complete these steps to get ready for your 8-week journey!
          </p>
          <div className="progress-indicator">
            <span className="progress-text">
              Progress: {completedSteps.size} of {setupSteps.length} steps completed
            </span>
            <div className="progress-bar">
              <div className="progress-fill" ref={progressFillRef} />
            </div>
          </div>
        </div>

        <div className="setup-steps">
          {setupSteps.map((step, index) => (
            <div key={step.id} className={`setup-step-card ${completedSteps.has(step.id) ? 'completed' : ''}`}>
              <div className="step-header">
                <div className="step-number">{index + 1}</div>
                <div className="step-title-section">
                  <h3 className="step-title">{step.title}</h3>
                  <p className="step-description">{step.description}</p>
                </div>
                <button
                  className={`step-checkbox ${completedSteps.has(step.id) ? 'checked' : ''}`}
                  onClick={() => toggleStepComplete(step.id)}
                  aria-label={`Mark ${step.title} as ${completedSteps.has(step.id) ? 'incomplete' : 'complete'}`}
                >
                  {completedSteps.has(step.id) ? '✓' : ''}
                </button>
              </div>

              {step.videoId && (
                <IntroVideo
                  videoId={step.videoId}
                  title={step.videoTitle || step.title}
                  onScheduleClick={onScheduleClick}
                />
              )}

              <div className="step-content">
                <ol className="step-list">
                  {step.steps.map((subStep, stepIndex) => (
                    <li key={stepIndex} className="step-item">
                      {subStep}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          ))}
        </div>

        <div className="setup-cta">
          <h3 className="cta-title">Ready to Begin?</h3>
          <p className="cta-text">
            Once you've completed the setup steps above, schedule your first 1-on-1 session with Lamont.
            We'll review your progress and dive right into building your first project!
          </p>
          <button 
            onClick={onScheduleClick}
            className="cta-button"
          >
            Schedule Your First Session →
          </button>
        </div>
      </div>
    </section>
  );
};

export default LearningSetupGuide;

