import React, { useState } from 'react';
import { Task, TaskFilters as TaskFiltersType } from '../../pages/TaskManagerPage';
import '../../styles/Task Manager/TaskFilters.css';

interface TaskFiltersProps {
  filters: TaskFiltersType;
  onFilterChange: (filters: TaskFiltersType) => void;
  tasks: Task[];
}

export const TaskFilters: React.FC<TaskFiltersProps> = ({ 
  filters, 
  onFilterChange, 
  tasks 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Get unique values for filter options
  const getUniqueAssignees = () => {
    const assignees = Array.from(new Set(tasks.map(task => task.assignedTo)));
    return assignees.sort();
  };

  const getUniquePipelines = () => {
    const pipelines = Array.from(new Set(tasks.map(task => task.pipelineName)));
    return pipelines.sort();
  };

  const handleFilterChange = (key: keyof TaskFiltersType, value: string | undefined) => {
    const newFilters = { ...filters };
    
    if (value === '' || value === undefined) {
      delete newFilters[key];
    } else {
      (newFilters as any)[key] = value;
    }
    
    onFilterChange(newFilters);
  };

  const handleDateRangeChange = (start: string, end: string) => {
    const newFilters = { ...filters };
    
    if (start && end) {
      newFilters.dueDateRange = { start, end };
    } else {
      delete newFilters.dueDateRange;
    }
    
    onFilterChange(newFilters);
  };

  const clearAllFilters = () => {
    onFilterChange({});
  };

  const hasActiveFilters = Object.keys(filters).length > 0;

  return (
    <div className="task-filters">
      <div className="filters-header">
        <h3>Filters</h3>
        <button 
          className="expand-toggle"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? '−' : '+'}
        </button>
      </div>

      {isExpanded && (
        <div className="filters-content">
          {/* Search Filter */}
          <div className="filter-group">
            <label htmlFor="search">Search</label>
            <input
              id="search"
              type="text"
              placeholder="Search tasks..."
              value={filters.search || ''}
              onChange={(e) => handleFilterChange('search', e.target.value || undefined)}
            />
          </div>

          {/* Status Filter */}
          <div className="filter-group">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              value={filters.status || ''}
              onChange={(e) => handleFilterChange('status', e.target.value || undefined)}
            >
              <option value="">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          {/* Priority Filter */}
          <div className="filter-group">
            <label htmlFor="priority">Priority</label>
            <select
              id="priority"
              value={filters.priority || ''}
              onChange={(e) => handleFilterChange('priority', e.target.value || undefined)}
            >
              <option value="">All Priorities</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>

          {/* Assignee Filter */}
          <div className="filter-group">
            <label htmlFor="assignee">Assignee</label>
            <select
              id="assignee"
              value={filters.assignee || ''}
              onChange={(e) => handleFilterChange('assignee', e.target.value || undefined)}
            >
              <option value="">All Assignees</option>
              {getUniqueAssignees().map(assignee => (
                <option key={assignee} value={assignee}>
                  {assignee}
                </option>
              ))}
            </select>
          </div>

          {/* Pipeline Filter */}
          <div className="filter-group">
            <label htmlFor="pipeline">Pipeline</label>
            <select
              id="pipeline"
              value={filters.pipelineId || ''}
              onChange={(e) => {
                const selectedPipeline = tasks.find(t => t.pipelineName === e.target.value);
                handleFilterChange('pipelineId', selectedPipeline?.pipelineId || undefined);
              }}
            >
              <option value="">All Pipelines</option>
              {getUniquePipelines().map(pipeline => (
                <option key={pipeline} value={pipeline}>
                  {pipeline}
                </option>
              ))}
            </select>
          </div>

          {/* Due Date Range Filter */}
          <div className="filter-group">
            <label htmlFor="due-date-start">Due Date Range</label>
            <div className="date-range-inputs">
              <input
                id="due-date-start"
                type="date"
                placeholder="Start date"
                value={filters.dueDateRange?.start || ''}
                onChange={(e) => handleDateRangeChange(e.target.value, filters.dueDateRange?.end || '')}
              />
              <input
                id="due-date-end"
                type="date"
                placeholder="End date"
                value={filters.dueDateRange?.end || ''}
                onChange={(e) => handleDateRangeChange(filters.dueDateRange?.start || '', e.target.value)}
              />
            </div>
          </div>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <button 
              className="clear-filters"
              onClick={clearAllFilters}
            >
              Clear All Filters
            </button>
          )}
        </div>
      )}
    </div>
  );
};
