import React, { useState, useEffect } from 'react';
import WLFIService, { BountyData, BountySubmission as BountySubmissionType } from '../../utils/wlfiService';
import '../../styles/Gamification/BountySubmission.css';

interface BountySubmissionProps {
  bountyId?: string;
}

const BountySubmission: React.FC<BountySubmissionProps> = ({ bountyId }) => {
  const [bounty, setBounty] = useState<BountyData | null>(null);
  const [submissions, setSubmissions] = useState<BountySubmissionType[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionForm, setSubmissionForm] = useState({
    submissionUrl: '',
    description: ''
  });

  useEffect(() => {
    if (bountyId) {
      loadBountyData();
    }
    loadSubmissions();
  }, [bountyId]);

  const loadBountyData = async () => {
    if (!bountyId) return;
    try {
      const wlfiService = WLFIService.getInstance();
      const bountyData = wlfiService.getBountyById(bountyId);
      setBounty(bountyData || null);
    } catch (error) {
      console.error('Failed to load bounty:', error);
    }
  };

  const loadSubmissions = async () => {
    try {
      const wlfiService = WLFIService.getInstance();
      const submissionData = wlfiService.getSubmissions();
      setSubmissions(submissionData);
    } catch (error) {
      console.error('Failed to load submissions:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bountyId || !submissionForm.submissionUrl || !submissionForm.description) return;

    setIsSubmitting(true);
    try {
      const wlfiService = WLFIService.getInstance();
      const success = await wlfiService.submitBounty(bountyId, {
        developerId: 'current-user', // TODO: Get from auth context
        submissionUrl: submissionForm.submissionUrl,
        description: submissionForm.description
      });

      if (success) {
        setSubmissionForm({ submissionUrl: '', description: '' });
        await loadSubmissions();
        alert('Submission successful! Your work is now under review.');
      } else {
        alert('Failed to submit. Please try again.');
      }
    } catch (error) {
      console.error('Failed to submit bounty:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatStatus = (status: string) => {
    switch (status) {
      case 'Pending': return { text: 'Under Review', color: '#f59e0b' };
      case 'Approved': return { text: 'Approved', color: '#10b981' };
      case 'Rejected': return { text: 'Rejected', color: '#ef4444' };
      case 'Under Review': return { text: 'Under Review', color: '#3b82f6' };
      default: return { text: status, color: '#6b7280' };
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bounty-submission">
      <div className="submission-header">
        <h2>Bounty Submissions</h2>
        <p>Submit your work and track your bounty progress</p>
      </div>

      {bounty && (
        <div className="current-bounty">
          <h3>Current Bounty</h3>
          <div className="bounty-info">
            <div className="bounty-title">{bounty.title}</div>
            <div className="bounty-reward">{bounty.reward} WLFI</div>
          </div>
        </div>
      )}

      <div className="submission-form-section">
        <h3>Submit Your Work</h3>
        <form onSubmit={handleSubmit} className="submission-form">
          <div className="form-group">
            <label htmlFor="submissionUrl">Submission URL</label>
            <input
              id="submissionUrl"
              type="url"
              placeholder="https://github.com/your-repo or https://your-demo.com"
              value={submissionForm.submissionUrl}
              onChange={(e) => setSubmissionForm({ ...submissionForm, submissionUrl: e.target.value })}
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              placeholder="Describe your implementation, any challenges faced, and how you solved them..."
              value={submissionForm.description}
              onChange={(e) => setSubmissionForm({ ...submissionForm, description: e.target.value })}
              required
              rows={4}
              className="form-textarea"
            />
          </div>

          <button 
            type="submit" 
            className="submit-btn"
            disabled={isSubmitting || !bountyId}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Work'}
          </button>
        </form>
      </div>

      <div className="submissions-history">
        <h3>Submission History</h3>
        {submissions.length === 0 ? (
          <div className="empty-submissions">
            <div className="empty-icon">📝</div>
            <p>No submissions yet</p>
            <p>Complete a bounty to see your submissions here</p>
          </div>
        ) : (
          <div className="submissions-list">
            {submissions.map(submission => {
              const bountyData = WLFIService.getInstance().getBountyById(submission.bountyId);
              const statusInfo = formatStatus(submission.status);
              
              return (
                <div key={submission.id} className="submission-item">
                  <div className="submission-header">
                    <div className="submission-title">
                      {bountyData?.title || 'Unknown Bounty'}
                    </div>
                    <div 
                      className="submission-status"
                      style={{ backgroundColor: statusInfo.color }}
                    >
                      {statusInfo.text}
                    </div>
                  </div>
                  
                  <div className="submission-details">
                    <div className="submission-url">
                      <span className="url-label">URL:</span>
                      <a 
                        href={submission.submissionUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="url-link"
                      >
                        {submission.submissionUrl}
                      </a>
                    </div>
                    
                    <div className="submission-description">
                      <span className="desc-label">Description:</span>
                      <p className="desc-text">{submission.description}</p>
                    </div>
                    
                    {submission.reviewerNotes && (
                      <div className="reviewer-notes">
                        <span className="notes-label">Reviewer Notes:</span>
                        <p className="notes-text">{submission.reviewerNotes}</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="submission-meta">
                    <span className="submission-date">
                      Submitted: {formatDate(submission.submittedAt)}
                    </span>
                    {bountyData && (
                      <span className="submission-reward">
                        Reward: {bountyData.reward} WLFI
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default BountySubmission; 