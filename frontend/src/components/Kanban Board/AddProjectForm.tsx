import React, { useState } from 'react';
import ApiService from '../../utils/apiConfig';
import '../../styles/Kanban Board/AddProjectForm.css';

interface AddProjectFormProps {
  onClose: () => void;
  onSuccess: () => void;
}

const KANBAN_STAGES = [
  'New Lead',
  'Discovery Call (Book Appointment)',
  'Pending NDA',
  'Initial Prototype',
  'Prototype Review Call (Book Appointment)',
  'Prototype Update Round',
  'Prototype Experiments',
  '2nd Prototype Update Round',
  'Prototype Update Review Call (Book Appointment)',
  'Final Prototype Review',
  'Technical Developer Review',
  'Cost Analysis & Timeline Review',
  'Cost Analysis Review Call',
  'Contract & Proposal',
  'Proposal Paid & Accepted',
  'Developer Agreements',
  'Development Roadmap',
  'Setup Project Environment',
  'Confirm Developers Setup',
  'In Development',
  'MVP Delivered - LIVE Testing',
  'Product Delivery'
];

const AddProjectForm: React.FC<AddProjectFormProps> = ({ onClose, onSuccess }) => {
  const [title, setTitle] = useState('');
  const [studentName, setStudentName] = useState('');
  const [description, setDescription] = useState('');
  const [stage, setStage] = useState('New Lead');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !studentName.trim()) {
      setError('Title and student name are required');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await ApiService.createKanbanProject({
        title: title.trim(),
        student_name: studentName.trim(),
        description: description.trim() || undefined,
        stage: stage
      });

      if (response.success) {
        onSuccess();
        onClose();
      } else {
        throw new Error(response.error || 'Failed to create project');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create project. Please try again.');
      console.error('Error creating project:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="add-project-modal-overlay" onClick={onClose}>
      <div className="add-project-modal" onClick={(e) => e.stopPropagation()}>
        <div className="add-project-header">
          <h2>Publish Project to Kanban Board</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit} className="add-project-form">
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="title">Project Title *</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter project title"
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="form-group">
            <label htmlFor="studentName">Student Name *</label>
            <input
              type="text"
              id="studentName"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              placeholder="Enter student name"
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter a brief description of the project"
              rows={4}
              disabled={isSubmitting}
            />
          </div>

          <div className="form-group">
            <label htmlFor="stage">Initial Stage *</label>
            <select
              id="stage"
              value={stage}
              onChange={(e) => setStage(e.target.value)}
              required
              disabled={isSubmitting}
            >
              {KANBAN_STAGES.map((stageOption) => (
                <option key={stageOption} value={stageOption}>
                  {stageOption}
                </option>
              ))}
            </select>
          </div>

          <div className="form-actions">
            <button
              type="button"
              onClick={onClose}
              className="cancel-button"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="submit-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Publishing...' : 'Publish Project'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProjectForm;

