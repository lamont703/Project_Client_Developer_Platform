import React, { useState } from 'react';
import '../../styles/Professional Freelancer Audit/NotebookAgent.css';
import NotebookAgentModal from './NotebookAgentModal';

interface NotebookAgentProps {
  isUnlocked: boolean;
  onAgentUsed?: () => void;
}

const NOTEBOOK_LM_URL = 'https://notebooklm.google.com/notebook/588fac9b-bb3f-464e-8009-2b050b2fd164';

const NotebookAgent: React.FC<NotebookAgentProps> = ({ isUnlocked, onAgentUsed }) => {
  const [showModal, setShowModal] = useState(false);

  const handleOpenNotebook = () => {
    // Track agent usage
    if (onAgentUsed) {
      onAgentUsed();
    }
    
    // Open NotebookLM in new tab
    window.open(NOTEBOOK_LM_URL, '_blank', 'noopener,noreferrer');
    
    // Close modal
    setShowModal(false);
  };

  return (
    <>
      <div className="pf-notebook-agent-container">
        <div className="pf-notebook-agent-header">
          <div className="pf-notebook-agent-icon">
            <span className="pf-notebook-pulse"></span>
            <span className="pf-notebook-icon-text">📓</span>
          </div>
          <div className="pf-notebook-agent-title-section">
            <h2 className="pf-notebook-agent-title">STAR Method AI Notebook Agent</h2>
            <p className="pf-notebook-agent-subtitle">
              {isUnlocked 
                ? 'Access STAR Method resources and get your personalized audit via text chat'
                : 'Enter your email to unlock your STAR Method AI Notebook Agent'
              }
            </p>
          </div>
        </div>
        <div className="pf-notebook-agent-content">
          {isUnlocked ? (
            <div className="pf-notebook-agent-unlocked">
              <div className="pf-notebook-features">
                <div className="pf-notebook-feature-item">
                  <span className="pf-feature-icon">📚</span>
                  <span className="pf-feature-text">Full STAR Method Resources</span>
                </div>
                <div className="pf-notebook-feature-item">
                  <span className="pf-feature-icon">💬</span>
                  <span className="pf-feature-text">Text Chat with AI Agent</span>
                </div>
                <div className="pf-notebook-feature-item">
                  <span className="pf-feature-icon">📊</span>
                  <span className="pf-feature-text">Professional Freelancer Audit</span>
                </div>
              </div>
              <button 
                className="pf-notebook-open-button"
                onClick={() => setShowModal(true)}
              >
                <span className="pf-notebook-button-icon">📓</span>
                <span className="pf-notebook-button-text">Open STAR Method Notebook Agent</span>
                <span className="pf-notebook-button-arrow">→</span>
              </button>
              <p className="pf-notebook-note">
                You'll be asked to sign in with Google to access your notebook
              </p>
            </div>
          ) : (
            <div className="pf-agent-locked-placeholder">
              <div className="pf-locked-icon">🔒</div>
              <p className="pf-locked-text">Enter your email above to unlock the STAR Method AI Notebook Agent</p>
            </div>
          )}
        </div>
        <div className="pf-notebook-agent-footer">
          <p className="pf-notebook-agent-footer-text">
            <strong>Powered by Google NotebookLM</strong> • Deep dive into STAR Method resources
          </p>
        </div>
      </div>

      <NotebookAgentModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onContinue={handleOpenNotebook}
      />
    </>
  );
};

export default NotebookAgent;
