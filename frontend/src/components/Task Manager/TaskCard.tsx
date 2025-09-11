import React from 'react';
import { Task } from '../../pages/TaskManagerPage';
import '../../styles/Task Manager/TaskCard.css';

interface TaskCardProps {
  task: Task;
  currentUser: string;
  getDeveloperName: (developerId: string) => string;
}

export const TaskCard: React.FC<TaskCardProps> = ({ 
  task, 
  currentUser,
  getDeveloperName
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const isOverdue = () => {
    const now = new Date();
    const dueDate = new Date(task.dueDate);
    return !task.completed && dueDate < now;
  };

  const isAssignedToMe = task.assignedTo === currentUser;

  const getPriorityColor = () => {
    switch (task.priority) {
      case 'high': return '#ff4444';
      case 'medium': return '#ffaa00';
      case 'low': return '#44aa44';
      default: return '#888888';
    }
  };

  const getStatusColor = () => {
    switch (task.status) {
      case 'completed': return '#44aa44';
      case 'in_progress': return '#ffaa00';
      case 'pending': return '#888888';
      default: return '#888888';
    }
  };

  return (
    <div className={`task-card ${task.completed ? 'completed' : ''} ${isOverdue() ? 'overdue' : ''} ${isAssignedToMe ? 'assigned-to-me' : ''}`}>
      <div className="task-card-header">
        <div className="task-priority" style={{ backgroundColor: getPriorityColor() }}>
          {task.priority}
        </div>
        <div className="task-status" style={{ backgroundColor: getStatusColor() }}>
          {task.status?.replace('_', ' ') || 'in progress'}
        </div>
        {isAssignedToMe && (
          <div className="assigned-to-me-badge">
            👤 You
          </div>
        )}
      </div>

      <div className="task-card-content">
        <h4 className="task-title">{task.title}</h4>
        <p className="task-description">{task.description}</p>
        
        <div className="task-meta">
          <div className="task-assignment">
            <span className="meta-label">Assigned to:</span>
            <span className="meta-value">{getDeveloperName(task.assignedTo)}</span>
          </div>
          
          <div className="task-due-date">
            <span className="meta-label">Due:</span>
            <span className={`meta-value ${isOverdue() ? 'overdue' : ''}`}>
              {formatDate(task.dueDate)}
            </span>
          </div>
          
          <div className="task-pipeline">
            <span className="meta-label">Pipeline:</span>
            <span className="meta-value">{task.pipelineName}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
