import React, { useState, useEffect, useRef } from 'react';
import '../../styles/Professional Freelancer Audit/EmailGate.css';

interface EmailGateProps {
  isOpen: boolean;
  onUnlock: (email: string) => void;
}

const STORAGE_KEY = 'pf_audit_email_unlocked';

const EmailGate: React.FC<EmailGateProps> = ({ isOpen, onUnlock }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUnlocking, setIsUnlocking] = useState(false);
  const emailInputRef = useRef<HTMLInputElement>(null);

  // Auto-focus email input when modal opens
  useEffect(() => {
    if (isOpen && emailInputRef.current) {
      setTimeout(() => {
        emailInputRef.current?.focus();
      }, 300);
    }
  }, [isOpen]);

  // Check if already unlocked when component opens
  useEffect(() => {
    if (isOpen) {
      const savedEmail = localStorage.getItem(STORAGE_KEY);
      if (savedEmail) {
        onUnlock(savedEmail);
      }
    }
  }, [isOpen, onUnlock]);

  const validateEmail = (emailValue: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(emailValue);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    if (error) {
      setError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setError('Email address is required');
      emailInputRef.current?.focus();
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      emailInputRef.current?.focus();
      return;
    }

    setIsSubmitting(true);
    setError('');

    await new Promise(resolve => setTimeout(resolve, 800));

    localStorage.setItem(STORAGE_KEY, email.trim());

    setIsUnlocking(true);
    
    setTimeout(() => {
      onUnlock(email.trim());
      setIsSubmitting(false);
      setIsUnlocking(false);
    }, 1200);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isSubmitting) {
      handleSubmit(e as any);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="pf-email-gate-overlay">
      <div className={`pf-email-gate-content ${isUnlocking ? 'pf-unlocking' : ''}`}>
        {isUnlocking ? (
          <div className="pf-unlock-animation">
            <div className="pf-unlock-icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h3 className="pf-unlock-title">Unlocking Your Agents...</h3>
            <p className="pf-unlock-text">Your AI Voice Agent and Notebook Agent are loading</p>
          </div>
        ) : (
          <>
            <div className="pf-email-gate-header">
              <div className="pf-email-gate-icon">
                <span className="pf-email-icon-text">🔒</span>
              </div>
              <h2 className="pf-email-gate-title">Unlock Your AI Agents</h2>
              <p className="pf-email-gate-subtitle">
                Enter your email to access your Professional Freelancer Audit AI Voice Agent and STAR Method AI Notebook Agent
              </p>
            </div>

            <form className="pf-email-gate-form" onSubmit={handleSubmit}>
              <div className="pf-email-input-wrapper">
                <input
                  ref={emailInputRef}
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  onKeyDown={handleKeyDown}
                  placeholder="Enter your email address"
                  className={`pf-email-input ${error ? 'pf-email-input-error' : ''}`}
                  disabled={isSubmitting}
                  autoComplete="email"
                />
                {error && (
                  <div className="pf-email-error-message">
                    <span className="pf-error-icon">⚠️</span>
                    {error}
                  </div>
                )}
              </div>

              <button
                type="submit"
                className={`pf-email-submit-button ${isSubmitting ? 'pf-submitting' : ''}`}
                disabled={isSubmitting || !email.trim()}
              >
                {isSubmitting ? (
                  <>
                    <span className="pf-submit-spinner"></span>
                    <span>Unlocking...</span>
                  </>
                ) : (
                  <>
                    <span className="pf-submit-icon">🚀</span>
                    <span>Unlock Agents</span>
                  </>
                )}
              </button>

              <p className="pf-email-privacy">
                🔒 We'll never spam you. Your email is secure and will only be used to send your audit results.
              </p>
            </form>

            <div className="pf-email-gate-preview">
              <div className="pf-preview-blur">
                <div className="pf-preview-agent-icon">🤖</div>
                <p className="pf-preview-text">Your AI Agents are ready...</p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default EmailGate;
