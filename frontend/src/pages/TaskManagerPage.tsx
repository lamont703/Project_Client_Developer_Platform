import React, { useState, useEffect } from 'react';
import { API_CONFIG } from '../utils/apiConfig';
import { TaskList } from '../components/Task Manager/TaskList';
import { TaskFilters } from '../components/Task Manager/TaskFilters';
import { TaskStats } from '../components/Task Manager/TaskStats';
import { TaskManagerHeader } from '../components/Task Manager/TaskManagerHeader';
import { DeveloperTabs } from '../components/Task Manager/DeveloperTabs';
import '../styles/Task Manager/TaskManagerPage.css';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  assignedTo: string;
  assignedBy: string;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
  pipelineId: string;
  pipelineName: string;
  completed: boolean;
}

export interface TaskFilters {
  status?: string;
  assignee?: string;
  search?: string;
  pipelineId?: string;
  priority?: string;
  dueDateRange?: {
    start: string;
    end: string;
  };
}

export interface TaskStats {
  total: number;
  completed: number;
  pending: number;
  overdue: number;
  assignedToMe: number;
}

interface TaskManagerPageProps {
  navigateToHome: () => void;
}

const TaskManagerPage: React.FC<TaskManagerPageProps> = ({ navigateToHome }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [stats, setStats] = useState<TaskStats>({
    total: 0,
    completed: 0,
    pending: 0,
    overdue: 0,
    assignedToMe: 0
  });
  const [filters, setFilters] = useState<TaskFilters>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentUser] = useState('current-user'); // This would come from auth context
  const [selectedDeveloper, setSelectedDeveloper] = useState<string | null>(null);

  const getDeveloperName = (developerId: string): string => {
    const developerMap: { [key: string]: string } = {
      '68m7FKXhWCRZALwW9Ge8': 'Julian Faulkner',
      'SqbVVbHNjxmEHxJTw59e': 'Lamont Evans', 
      'ZYtMsRlvyzY8Y3JwMPpl': 'Dantee Fluellen',
      'current-user': 'Current User'
    };
    return developerMap[developerId] || developerId;
  };

  // Fetch tasks from API
  const fetchTasks = async (filterParams?: TaskFilters) => {
    try {
      setIsLoading(true);
      setError(null);

      const url = new URL(API_CONFIG.getUrl('/tasks'));
      
      
      // Add query parameters
      // Use the Client Software Development Pipeline ID
      url.searchParams.set('pipelineId', 'uR2CMkTiwqoUOYuf8oGR');
      if (filterParams?.status) url.searchParams.set('status', filterParams.status);
      if (filterParams?.assignee) url.searchParams.set('assignee', filterParams.assignee);
      if (filterParams?.search) url.searchParams.set('search', filterParams.search);

      console.log('🔍 Fetching tasks from:', url.toString());

      const response = await fetch(url.toString(), {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_CONFIG.SUPABASE_ANON_KEY}`,
          'apikey': API_CONFIG.SUPABASE_ANON_KEY,
        },
      });

      console.log('🔍 Response status:', response.status);

      if (!response.ok) {
        // Try to get error details from response
        let errorMessage = `API request failed with status ${response.status}`;
        try {
          const errorData = await response.json();
          if (errorData.error) {
            errorMessage = `${errorMessage}: ${errorData.error}`;
          }
        } catch (jsonError) {
          // If we can't parse JSON, use text
          try {
            const errorText = await response.text();
            if (errorText) {
              errorMessage = `${errorMessage}: ${errorText}`;
            }
          } catch (textError) {
            // Use generic message
          }
        }
        
        // Don't throw error for 500 status, just log it and use fallback
        if (response.status === 500) {
          console.warn('⚠️ API temporarily unavailable, using mock data');
          setError('API temporarily unavailable - showing sample data');
          setTasks(getMockTasks());
          return;
        }
        
        throw new Error(errorMessage);
      }

      const data = await response.json();
      setTasks(data.tasks || []);
    } catch (err) {
      console.warn('⚠️ Error fetching tasks, using mock data:', err);
      
      // Provide user-friendly error messages
      let userMessage = 'Unable to fetch tasks from server';
      if (err instanceof Error) {
        if (err.message.includes('Failed to fetch')) {
          userMessage = 'Network connection error - please check your internet connection';
        } else if (err.message.includes('500')) {
          userMessage = 'Server temporarily unavailable - showing sample data';
        } else {
          userMessage = err.message;
        }
      }
      
      setError(userMessage);
      setTasks(getMockTasks());
    } finally {
      setIsLoading(false);
    }
  };

  // Mock data for development
  const getMockTasks = (): Task[] => [
    {
      id: '1',
      title: 'Implement user authentication',
      description: 'Add JWT-based authentication system with login/logout functionality',
      status: 'in_progress',
      priority: 'high',
      assignedTo: 'SqbVVbHNjxmEHxJTw59e', // Lamont Evans
      assignedBy: 'manager@example.com',
      dueDate: '2024-01-15',
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-10T00:00:00Z',
      pipelineId: 'pipeline-1',
      pipelineName: 'Client Software Development Pipeline',
      completed: false
    },
    {
      id: '2',
      title: 'Design database schema',
      description: 'Create database schema for user management and task tracking',
      status: 'completed',
      priority: 'medium',
      assignedTo: '68m7FKXhWCRZALwW9Ge8', // Julian Faulkner
      assignedBy: 'manager@example.com',
      dueDate: '2024-01-10',
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-08T00:00:00Z',
      pipelineId: 'pipeline-1',
      pipelineName: 'Client Software Development Pipeline',
      completed: true
    },
    {
      id: '3',
      title: 'Write API documentation',
      description: 'Document all REST API endpoints with examples',
      status: 'pending',
      priority: 'low',
      assignedTo: 'current-user',
      assignedBy: 'manager@example.com',
      dueDate: '2024-01-20',
      createdAt: '2024-01-05T00:00:00Z',
      updatedAt: '2024-01-05T00:00:00Z',
      pipelineId: 'pipeline-1',
      pipelineName: 'Client Software Development Pipeline',
      completed: false
    },
    {
      id: '4',
      title: 'Setup CI/CD pipeline',
      description: 'Configure automated testing and deployment pipeline',
      status: 'pending',
      priority: 'high',
      assignedTo: 'ZYtMsRlvyzY8Y3JwMPpl', // Dantee Fluellen
      assignedBy: 'manager@example.com',
      dueDate: '2024-01-12',
      createdAt: '2024-01-03T00:00:00Z',
      updatedAt: '2024-01-03T00:00:00Z',
      pipelineId: 'pipeline-1',
      pipelineName: 'Client Software Development Pipeline',
      completed: false
    }
  ];

  // Calculate stats
  const calculateStats = (taskList: Task[]): TaskStats => {
    const now = new Date();
    const overdue = taskList.filter(task => 
      !task.completed && new Date(task.dueDate) < now
    ).length;
    
    const assignedToMe = taskList.filter(task => 
      task.assignedTo === currentUser
    ).length;

    return {
      total: taskList.length,
      completed: taskList.filter(task => task.completed).length,
      pending: taskList.filter(task => !task.completed).length,
      overdue,
      assignedToMe
    };
  };

  // Apply filters
  const applyFilters = (taskList: Task[], filterParams: TaskFilters): Task[] => {
    return taskList.filter(task => {
      // Exclude completed tasks
      if (task.completed) return false;
      // Filter by selected developer
      if (selectedDeveloper && task.assignedTo !== selectedDeveloper) return false;
      
      if (filterParams.status && task.status !== filterParams.status) return false;
      if (filterParams.assignee && task.assignedTo !== filterParams.assignee) return false;
      if (filterParams.pipelineId && task.pipelineId !== filterParams.pipelineId) return false;
      if (filterParams.priority && task.priority !== filterParams.priority) return false;
      if (filterParams.search) {
        const searchLower = filterParams.search.toLowerCase();
        if (!task.title.toLowerCase().includes(searchLower) && 
            !task.description.toLowerCase().includes(searchLower)) return false;
      }
      if (filterParams.dueDateRange) {
        const taskDate = new Date(task.dueDate);
        const startDate = new Date(filterParams.dueDateRange.start);
        const endDate = new Date(filterParams.dueDateRange.end);
        if (taskDate < startDate || taskDate > endDate) return false;
      }
      return true;
    });
  };

  // Update task status
  const updateTaskStatus = async (taskId: string, completed: boolean) => {
    try {
      const response = await fetch(API_CONFIG.getUrl(`/tasks/${taskId}/status`), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_CONFIG.SUPABASE_ANON_KEY}`,
          'apikey': API_CONFIG.SUPABASE_ANON_KEY,
        },
        body: JSON.stringify({ completed, userId: currentUser }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Update local state
      setTasks(prevTasks => 
        prevTasks.map(task => 
          task.id === taskId 
            ? { ...task, completed, status: completed ? 'completed' : 'pending' }
            : task
        )
      );
    } catch (err) {
      console.error('Error updating task status:', err);
      setError(err instanceof Error ? err.message : 'Failed to update task');
    }
  };

  // Handle filter changes
  const handleFilterChange = (newFilters: TaskFilters) => {
    setFilters(newFilters);
  };

  // Load tasks on component mount
  useEffect(() => {
    fetchTasks();
  }, []);

  // Apply filters when tasks or filters change
  useEffect(() => {
    const filtered = applyFilters(tasks, filters);
    setFilteredTasks(filtered);
    setStats(calculateStats(filtered));
  }, [tasks, filters, currentUser, selectedDeveloper]);

  return (
    <div className="task-manager-page">
      <TaskManagerHeader 
        navigateToHome={navigateToHome}
        stats={stats}
        isLoading={isLoading}
      />
      
      <div className="task-manager-content">
        <div className="task-manager-sidebar">
          <TaskFilters 
            filters={filters}
            onFilterChange={handleFilterChange}
            tasks={tasks}
          />
          
          <TaskStats 
            stats={stats}
            isLoading={isLoading}
          />
        </div>
        
        <div className="task-manager-main">
          <DeveloperTabs
            selectedDeveloper={selectedDeveloper}
            onDeveloperSelect={setSelectedDeveloper}
            getDeveloperName={getDeveloperName}
          />
          {error && (
            <div className="error-message">
              <p>⚠️ {error}</p>
              <button onClick={() => fetchTasks()}>Retry</button>
            </div>
          )}
          
          <TaskList 
  tasks={filteredTasks}
  isLoading={isLoading}
  currentUser={currentUser}
  getDeveloperName={getDeveloperName}
/>
        </div>
      </div>
    </div>
  );
};

export default TaskManagerPage;
