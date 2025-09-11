import React from 'react';
import { TaskStats as TaskStatsType } from '../../pages/TaskManagerPage';
import '../../styles/Task Manager/TaskStats.css';

interface TaskStatsProps {
  stats: TaskStatsType;
  isLoading: boolean;
}

export const TaskStats: React.FC<TaskStatsProps> = ({ stats, isLoading }) => {
  if (isLoading) {
    return (
      <div className="task-stats">
        <h3>Statistics</h3>
        <div className="loading-stats">
          <div className="loading-spinner"></div>
          <p>Loading stats...</p>
        </div>
      </div>
    );
  }

  const completionRate = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

  return (
    <div className="task-stats">
      <h3>Statistics</h3>
      
      <div className="stats-grid">
        <div className="stat-card total">
          <div className="stat-icon">📊</div>
          <div className="stat-content">
            <div className="stat-number">{stats.total}</div>
            <div className="stat-label">Total Tasks</div>
          </div>
        </div>

        <div className="stat-card completed">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <div className="stat-number">{stats.completed}</div>
            <div className="stat-label">Completed</div>
          </div>
        </div>

        <div className="stat-card pending">
          <div className="stat-icon">⏳</div>
          <div className="stat-content">
            <div className="stat-number">{stats.pending}</div>
            <div className="stat-label">Pending</div>
          </div>
        </div>

        <div className="stat-card overdue">
          <div className="stat-icon">🚨</div>
          <div className="stat-content">
            <div className="stat-number">{stats.overdue}</div>
            <div className="stat-label">Overdue</div>
          </div>
        </div>

        <div className="stat-card assigned">
          <div className="stat-icon">👤</div>
          <div className="stat-content">
            <div className="stat-number">{stats.assignedToMe}</div>
            <div className="stat-label">My Tasks</div>
          </div>
        </div>

        <div className="stat-card completion-rate">
          <div className="stat-icon">📈</div>
          <div className="stat-content">
            <div className="stat-number">{completionRate}%</div>
            <div className="stat-label">Completion Rate</div>
          </div>
        </div>
      </div>
    </div>
  );
};
