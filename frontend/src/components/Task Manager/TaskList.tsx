import React from 'react';
import { Task } from '../../pages/TaskManagerPage';
import { TaskCard } from './TaskCard';
import '../../styles/Task Manager/TaskList.css';

interface TaskListProps {
  tasks: Task[];
  isLoading: boolean;
  currentUser: string;
  getDeveloperName: (developerId: string) => string;
}

export const TaskList: React.FC<TaskListProps> = ({ 
  tasks, 
  isLoading, 
  currentUser,
  getDeveloperName
}) => {
  if (isLoading) {
    return (
      <div className="task-list">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading tasks...</p>
        </div>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="task-list">
        <div className="empty-state">
          <div className="empty-icon">📋</div>
          <h3>No tasks found</h3>
          <p>No tasks match your current filters. Try adjusting your search criteria.</p>
        </div>
      </div>
    );
  }

  // Group tasks by status for better organization
  const groupedTasks = {
    overdue: tasks.filter(task => {
      const now = new Date();
      const dueDate = new Date(task.dueDate);
      return !task.completed && dueDate < now;
    }),
    assignedToMe: tasks.filter(task => 
      task.assignedTo === currentUser && !task.completed
    ),
    inProgress: tasks.filter(task => 
      task.status === 'in_progress' && !task.completed
    ),
    pending: tasks.filter(task => 
      task.status === 'pending' && !task.completed && task.assignedTo !== currentUser
    ),
    completed: tasks.filter(task => task.completed)
  };

  const renderTaskGroup = (title: string, taskGroup: Task[], priority: boolean = false) => {
    if (taskGroup.length === 0) return null;

    return (
      <div key={title} className={`task-group ${priority ? 'priority-group' : ''}`}>
        <h3 className="group-title">
          {title} ({taskGroup.length})
        </h3>
        <div className="task-cards">
          {taskGroup.map((task, index) => (
  <TaskCard
    key={`${task.id}-${index}`}
    task={task}
    currentUser={currentUser}
    getDeveloperName={getDeveloperName}
  />
))}
        </div>
      </div>
    );
  };

  return (
    <div className="task-list">
      <div className="task-groups">
        {renderTaskGroup('🚨 Overdue Tasks', groupedTasks.overdue, true)}
        {renderTaskGroup('👤 Assigned to Me', groupedTasks.assignedToMe, true)}
        {renderTaskGroup('🔄 In Progress', groupedTasks.inProgress)}
        {renderTaskGroup('⏳ Pending', groupedTasks.pending)}
        {renderTaskGroup('✅ Completed', groupedTasks.completed)}
      </div>
    </div>
  );
};
