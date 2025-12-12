import React from 'react';
import '../../styles/Professional Freelancer Audit/NotebookAgentModal.css';

interface NotebookAgentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onContinue: () => void;
}

const NotebookAgentModal: React.FC<NotebookAgentModalProps> = ({ isOpen, onClose, onContinue }) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="pf-notebook-modal-overlay" onClick={handleOverlayClick}>
      <div className="pf-notebook-modal-content" onClick={(e) => e.stopPropagation()}>
        <button 
          className="pf-notebook-modal-close" 
          onClick={onClose}
          aria-label="Close modal"
        >
          ×
        </button>
        
        <div className="pf-notebook-modal-header">
          <div className="pf-notebook-modal-icon">📓</div>
          <h2 className="pf-notebook-modal-title">Access Your STAR Method Notebook Agent</h2>
        </div>

        <div className="pf-notebook-modal-body">
          <div className="pf-notebook-modal-benefits">
            <h3 className="pf-notebook-modal-subtitle">What you'll get:</h3>
            <div className="pf-notebook-benefit-list">
              <div className="pf-notebook-benefit-item">
                <span className="pf-benefit-check">✓</span>
                <span className="pf-benefit-text">Full access to STAR Method resources and documentation</span>
              </div>
              <div className="pf-notebook-benefit-item">
                <span className="pf-benefit-check">✓</span>
                <span className="pf-benefit-text">Text chat with AI agent for your Professional Freelancer Audit</span>
              </div>
              <div className="pf-notebook-benefit-item">
                <span className="pf-benefit-check">✓</span>
                <span className="pf-benefit-text">Deep dive into Showcase, Tools, Acquisition, and Retention strategies</span>
              </div>
            </div>
          </div>

          <div className="pf-notebook-modal-next-step">
            <h3 className="pf-notebook-modal-subtitle">Next step:</h3>
            <p className="pf-notebook-modal-instruction">
              You'll be asked to <strong>sign in with Google</strong> to access your notebook. 
              This is a one-time authentication that gives you secure access to your personalized STAR Method resources.
            </p>
            <div className="pf-notebook-modal-google-note">
              <span className="pf-google-icon">🔐</span>
              <span>Your session is secure and private. We never access your Google account data.</span>
            </div>
          </div>
        </div>

        <div className="pf-notebook-modal-footer">
          <button 
            className="pf-notebook-modal-cancel"
            onClick={onClose}
          >
            Cancel
          </button>
          <button 
            className="pf-notebook-modal-continue"
            onClick={onContinue}
          >
            <span>Continue to Notebook Agent</span>
            <span className="pf-continue-arrow">→</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotebookAgentModal;
