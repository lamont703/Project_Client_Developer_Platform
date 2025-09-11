import React from 'react';
import { TaskStats } from '../../pages/TaskManagerPage';

interface TaskManagerHeaderProps {
  navigateToHome: () => void;
  stats: TaskStats;
  isLoading: boolean;
}

export const TaskManagerHeader: React.FC<TaskManagerHeaderProps> = ({ 
  navigateToHome, 
  stats, 
  isLoading 
}) => {
  return (
    <header className="task-manager-header">
      <div className="header-content">
        <div className="header-left">
          <button 
            className="back-button" 
            onClick={navigateToHome}
            title="Back to Home"
          >
            ← Back
          </button>
          <h1 className="page-title">Task Manager</h1>
        </div>
        
        <div className="header-right">
          <div className="quick-stats">
            {isLoading ? (
              <div className="loading-indicator">Loading...</div>
            ) : (
              <>
                <div className="stat-item">
                  <span className="stat-number">{stats.total}</span>
                  <span className="stat-label">Total</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">{stats.assignedToMe}</span>
                  <span className="stat-label">My Tasks</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">{stats.overdue}</span>
                  <span className="stat-label">Overdue</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
