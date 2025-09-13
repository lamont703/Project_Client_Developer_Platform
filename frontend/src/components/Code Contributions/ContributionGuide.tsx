import React from 'react';

const ContributionGuide: React.FC = () => {
  const steps = [
    {
      number: 1,
      title: 'Fork the Repository',
      description: 'Create your own copy of the repository to work on',
      details: [
        'Go to the GitHub repository page',
        'Click the "Fork" button in the top right',
        'This creates a copy in your GitHub account'
      ],
      code: 'https://github.com/lamont703/Project_Client_Developer_Platform'
    },
    {
      number: 2,
      title: 'Clone Your Fork',
      description: 'Download your forked repository to your local machine',
      details: [
        'Open your terminal or command prompt',
        'Navigate to your desired directory',
        'Run the clone command with your username'
      ],
      code: 'git clone https://github.com/YOUR_USERNAME/Project_Client_Developer_Platform.git'
    },
    {
      number: 3,
      title: 'Set Up Development Environment',
      description: 'Install dependencies and set up the project locally',
      details: [
        'Navigate to the project directory',
        'Install frontend dependencies',
        'Install backend dependencies',
        'Set up environment variables'
      ],
      code: `cd Project_Client_Developer_Platform
cd frontend && npm install
cd ../backend && npm install
cp .env.example .env`
    },
    {
      number: 4,
      title: 'Create a Feature Branch',
      description: 'Create a new branch for your contribution',
      details: [
        'Always create a new branch for your work',
        'Use descriptive branch names',
        'Keep branches focused on single features'
      ],
      code: 'git checkout -b feature/your-feature-name'
    },
    {
      number: 5,
      title: 'Make Your Changes',
      description: 'Implement the bounty requirements',
      details: [
        'Follow the coding standards',
        'Write clean, documented code',
        'Test your changes thoroughly',
        'Ensure responsive design'
      ],
      code: '# Make your changes and test locally\nnpm run dev # Start development server'
    },
    {
      number: 6,
      title: 'Commit Your Changes',
      description: 'Save your changes with descriptive commit messages',
      details: [
        'Stage your changes',
        'Write clear commit messages',
        'Follow conventional commit format',
        'Commit frequently with logical chunks'
      ],
      code: `git add .
git commit -m "feat: implement dark mode toggle

- Add theme context and provider
- Create toggle component in navigation
- Persist theme preference in localStorage
- Update CSS variables for dark theme

Closes #12"`
    },
    {
      number: 7,
      title: 'Push to Your Fork',
      description: 'Upload your changes to your GitHub fork',
      details: [
        'Push your feature branch',
        'Ensure all commits are included',
        'Verify changes on GitHub'
      ],
      code: 'git push origin feature/your-feature-name'
    },
    {
      number: 8,
      title: 'Create Pull Request',
      description: 'Submit your changes for review',
      details: [
        'Go to the original repository',
        'Click "New Pull Request"',
        'Select your branch',
        'Fill out the PR template',
        'Link to the bounty issue'
      ],
      code: '# PR Title: feat: implement dark mode toggle\n# Reference: Bounty B001 - Closes #12'
    }
  ];

  const bestPractices = [
    {
      icon: '📝',
      title: 'Code Quality',
      tips: [
        'Follow TypeScript best practices',
        'Use meaningful variable names',
        'Add comments for complex logic',
        'Keep functions small and focused'
      ]
    },
    {
      icon: '🎨',
      title: 'UI/UX Guidelines',
      tips: [
        'Maintain consistent design patterns',
        'Ensure mobile responsiveness',
        'Follow accessibility standards',
        'Test on different screen sizes'
      ]
    },
    {
      icon: '🧪',
      title: 'Testing',
      tips: [
        'Test your changes thoroughly',
        'Check for edge cases',
        'Verify cross-browser compatibility',
        'Test mobile interactions'
      ]
    },
    {
      icon: '🚀',
      title: 'Performance',
      tips: [
        'Optimize images and assets',
        'Minimize bundle size',
        'Use lazy loading where appropriate',
        'Avoid memory leaks'
      ]
    }
  ];

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    // Add toast notification here
  };

  return (
    <div className="contribution-guide">
      <div className="guide-container">
        <div className="guide-header">
          <h2>How to Contribute</h2>
          <p>Step-by-step guide to contributing code and claiming bounties</p>
        </div>

        <div className="steps-section">
          <h3>Getting Started</h3>
          <div className="steps-timeline">
            {steps.map((step, index) => (
              <div key={step.number} className="step-item">
                <div className="step-number">{step.number}</div>
                <div className="step-content">
                  <h4>{step.title}</h4>
                  <p>{step.description}</p>
                  <ul className="step-details">
                    {step.details.map((detail, detailIndex) => (
                      <li key={detailIndex}>{detail}</li>
                    ))}
                  </ul>
                  {step.code && (
                    <div className="code-block">
                      <div className="code-header">
                        <span className="code-label">Command</span>
                        <button 
                          className="copy-button"
                          onClick={() => handleCopyCode(step.code!)}
                        >
                          📋 Copy
                        </button>
                      </div>
                      <pre className="code-content">
                        <code>{step.code}</code>
                      </pre>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="best-practices-section">
          <h3>Best Practices</h3>
          <div className="practices-grid">
            {bestPractices.map((practice, index) => (
              <div key={index} className="practice-card">
                <div className="practice-icon">{practice.icon}</div>
                <h4>{practice.title}</h4>
                <ul className="practice-tips">
                  {practice.tips.map((tip, tipIndex) => (
                    <li key={tipIndex}>{tip}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="resources-section">
          <h3>Helpful Resources</h3>
          <div className="resources-grid">
            <div className="resource-card">
              <div className="resource-icon">📚</div>
              <h4>Documentation</h4>
              <p>Project documentation and API references</p>
              <button className="resource-link">View Docs</button>
            </div>
            <div className="resource-card">
              <div className="resource-icon">💬</div>
              <h4>Discord Community</h4>
              <p>Join our developer community for help and discussions</p>
              <button className="resource-link">Join Discord</button>
            </div>
            <div className="resource-card">
              <div className="resource-icon">🐛</div>
              <h4>Issue Tracker</h4>
              <p>Browse existing issues and feature requests</p>
              <button className="resource-link">View Issues</button>
            </div>
            <div className="resource-card">
              <div className="resource-icon">🎯</div>
              <h4>Contribution Guidelines</h4>
              <p>Detailed guidelines for contributing to the project</p>
              <button className="resource-link">Read Guidelines</button>
            </div>
          </div>
        </div>

        <div className="faq-section">
          <h3>Frequently Asked Questions</h3>
          <div className="faq-list">
            <div className="faq-item">
              <h4>How long do I have to complete a bounty?</h4>
              <p>Most bounties have a 2-week deadline from when you claim them. This gives you enough time to complete the work while keeping bounties active.</p>
            </div>
            <div className="faq-item">
              <h4>Can I work on multiple bounties at once?</h4>
              <p>Yes, but we recommend focusing on one bounty at a time to ensure quality work. You can claim multiple bounties if you're confident you can complete them within the deadlines.</p>
            </div>
            <div className="faq-item">
              <h4>What happens if my pull request is rejected?</h4>
              <p>Don't worry! We'll provide feedback on what needs to be improved. You can make the requested changes and resubmit. We want you to succeed!</p>
            </div>
            <div className="faq-item">
              <h4>When do I receive WLFI tokens?</h4>
              <p>WLFI tokens are distributed after your pull request is merged and the bounty is marked as completed. This typically happens within 24-48 hours of merge.</p>
            </div>
            <div className="faq-item">
              <h4>Do I need to be an experienced developer?</h4>
              <p>Not at all! We have bounties for all skill levels. Start with "Easy" bounties to get familiar with the codebase and gradually take on more challenging tasks.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContributionGuide;
