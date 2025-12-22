import React, { useState, useEffect } from 'react';
import ApiService from '../../utils/apiConfig';
import '../../styles/Kanban Board/KanbanBoard.css';

export interface KanbanProject {
  id: string;
  title: string;
  student_name: string;
  description?: string;
  stage: string;
  created_at: string;
  updated_at: string;
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

// Mock projects for demonstration
const MOCK_PROJECTS: KanbanProject[] = [
  {
    id: 'mock-1',
    title: 'E-Commerce Platform',
    student_name: 'Sarah Johnson',
    description: 'Building a full-stack e-commerce platform with React and Node.js',
    stage: 'New Lead',
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'mock-2',
    title: 'Task Management App',
    student_name: 'Michael Chen',
    description: 'A collaborative task management application for teams',
    stage: 'Discovery Call (Book Appointment)',
    created_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'mock-3',
    title: 'Social Media Dashboard',
    student_name: 'Emily Rodriguez',
    description: 'Analytics dashboard for social media management',
    stage: 'Initial Prototype',
    created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'mock-4',
    title: 'Fitness Tracking App',
    student_name: 'David Kim',
    description: 'Mobile app for tracking workouts and nutrition',
    stage: 'Cost Analysis & Timeline Review',
    created_at: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'mock-5',
    title: 'Online Learning Platform',
    student_name: 'Jessica Martinez',
    description: 'Platform for online courses and student management',
    stage: 'Contract & Proposal',
    created_at: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'mock-6',
    title: 'Restaurant Ordering System',
    student_name: 'James Wilson',
    description: 'Web and mobile app for restaurant order management',
    stage: 'Proposal Paid & Accepted',
    created_at: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'mock-7',
    title: 'Real Estate Portal',
    student_name: 'Amanda Taylor',
    description: 'Property listing and search platform',
    stage: 'Developer Agreements',
    created_at: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'mock-8',
    title: 'Healthcare Appointment System',
    student_name: 'Robert Brown',
    description: 'System for scheduling and managing medical appointments',
    stage: 'Setup Project Environment',
    created_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'mock-9',
    title: 'Music Streaming Service',
    student_name: 'Lisa Anderson',
    description: 'Streaming platform with playlist and recommendation features',
    stage: 'In Development',
    created_at: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'mock-10',
    title: 'Event Management Platform',
    student_name: 'Christopher Lee',
    description: 'Platform for creating and managing events',
    stage: 'MVP Delivered - LIVE Testing',
    created_at: new Date(Date.now() - 40 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'mock-11',
    title: 'Budget Tracker App',
    student_name: 'Nicole Thompson',
    description: 'Personal finance app for tracking expenses and budgets',
    stage: 'New Lead',
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'mock-12',
    title: 'Recipe Sharing Platform',
    student_name: 'Daniel Garcia',
    description: 'Community platform for sharing and discovering recipes',
    stage: 'Discovery Call (Book Appointment)',
    created_at: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'mock-13',
    title: 'Weather Forecast App',
    student_name: 'Rachel White',
    description: 'Mobile app with detailed weather forecasts and alerts',
    stage: 'Pending NDA',
    created_at: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'mock-14',
    title: 'Inventory Management System',
    student_name: 'Kevin Moore',
    description: 'System for tracking inventory and stock levels',
    stage: 'Initial Prototype',
    created_at: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'mock-15',
    title: 'Video Conferencing Tool',
    student_name: 'Sophia Davis',
    description: 'Web-based video conferencing solution for remote teams',
    stage: 'Prototype Review Call (Book Appointment)',
    created_at: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'mock-16',
    title: 'Job Board Platform',
    student_name: 'Andrew Jackson',
    description: 'Platform connecting job seekers with employers',
    stage: 'Prototype Update Round',
    created_at: new Date(Date.now() - 22 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'mock-17',
    title: 'Pet Care Management',
    student_name: 'Olivia Harris',
    description: 'App for managing pet health records and appointments',
    stage: 'Prototype Experiments',
    created_at: new Date(Date.now() - 26 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 13 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'mock-18',
    title: 'Code Collaboration Tool',
    student_name: 'Benjamin Martinez',
    description: 'Real-time code collaboration platform for developers',
    stage: '2nd Prototype Update Round',
    created_at: new Date(Date.now() - 28 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'mock-19',
    title: 'Travel Planning App',
    student_name: 'Isabella Clark',
    description: 'Comprehensive travel planning and booking platform',
    stage: 'Prototype Update Review Call (Book Appointment)',
    created_at: new Date(Date.now() - 32 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 16 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'mock-20',
    title: 'Document Management System',
    student_name: 'Ethan Lewis',
    description: 'Cloud-based document storage and collaboration system',
    stage: 'Final Prototype Review',
    created_at: new Date(Date.now() - 36 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 19 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'mock-21',
    title: 'Gym Membership Portal',
    student_name: 'Mia Walker',
    description: 'Portal for managing gym memberships and class bookings',
    stage: 'Technical Developer Review',
    created_at: new Date(Date.now() - 38 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'mock-22',
    title: 'Crowdfunding Platform',
    student_name: 'Noah Hall',
    description: 'Platform for launching and supporting crowdfunding campaigns',
    stage: 'Cost Analysis & Timeline Review',
    created_at: new Date(Date.now() - 42 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 22 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'mock-23',
    title: 'Language Learning App',
    student_name: 'Ava Allen',
    description: 'Interactive app for learning new languages',
    stage: 'Cost Analysis Review Call',
    created_at: new Date(Date.now() - 44 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 24 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'mock-24',
    title: 'Parking Management System',
    student_name: 'Lucas Young',
    description: 'System for managing parking spaces and reservations',
    stage: 'Contract & Proposal',
    created_at: new Date(Date.now() - 46 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 26 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'mock-25',
    title: 'Subscription Box Service',
    student_name: 'Emma King',
    description: 'Platform for managing subscription box deliveries',
    stage: 'Proposal Paid & Accepted',
    created_at: new Date(Date.now() - 48 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 28 * 24 * 60 * 60 * 1000).toISOString()
  }
];

interface KanbanBoardProps {
  onAddProject?: () => void;
  refreshKey?: number;
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({ onAddProject, refreshKey }) => {
  const [projects, setProjects] = useState<KanbanProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [draggedProject, setDraggedProject] = useState<KanbanProject | null>(null);
  const [dragOverColumn, setDragOverColumn] = useState<string | null>(null);

  useEffect(() => {
    fetchProjects();
  }, [refreshKey]);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await ApiService.getKanbanProjects();
      console.log('Kanban projects API response:', response);
      if (response.success) {
        const apiProjects = response.projects || [];
        // If API returns projects, use them; otherwise use mock data
        setProjects(apiProjects.length > 0 ? apiProjects : MOCK_PROJECTS);
      } else {
        // If API fails, use mock data for demonstration
        console.warn('API failed, using mock data:', response.error || response.message);
        setProjects(MOCK_PROJECTS);
        setError(null); // Don't show error if we have mock data
      }
    } catch (err: any) {
      const errorMessage = err?.message || err?.error || 'Error loading projects. Please try again later.';
      console.error('Error fetching projects:', err);
      
      // Check if it's a table not found error (migration not run) or 404
      if (errorMessage.includes('404') || 
          errorMessage.includes('relation "kanban_projects" does not exist') || 
          errorMessage.includes('relation "public.kanban_projects" does not exist')) {
        // Use mock data instead of showing error
        console.log('Using mock data due to API error');
        setProjects(MOCK_PROJECTS);
        setError(null);
      } else {
        setError(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDragStart = (e: React.DragEvent, project: KanbanProject) => {
    setDraggedProject(project);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', project.id);
    e.dataTransfer.setData('application/json', JSON.stringify({ id: project.id, stage: project.stage }));
    
    // Set drag image opacity
    if (e.currentTarget instanceof HTMLElement) {
      e.currentTarget.style.opacity = '0.5';
      e.currentTarget.style.cursor = 'grabbing';
    }
  };

  const handleDragEnd = (e: React.DragEvent) => {
    // Reset opacity and cursor
    if (e.currentTarget instanceof HTMLElement) {
      e.currentTarget.style.opacity = '1';
      e.currentTarget.style.cursor = 'grab';
    }
    setDraggedProject(null);
    setDragOverColumn(null);
  };

  const handleDragOver = (e: React.DragEvent, stage: string) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = 'move';
    setDragOverColumn(stage);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    // Only clear drag over if we're actually leaving the column
    const relatedTarget = e.relatedTarget as HTMLElement;
    if (!e.currentTarget.contains(relatedTarget)) {
      setDragOverColumn(null);
    }
  };

  const handleDrop = async (e: React.DragEvent, targetStage: string) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOverColumn(null);
    
    if (!draggedProject) return;

    if (draggedProject.stage === targetStage) {
      setDraggedProject(null);
      return;
    }

    // Optimistically update the UI
    const updatedProjects = projects.map(project =>
      project.id === draggedProject.id
        ? { ...project, stage: targetStage, updated_at: new Date().toISOString() }
        : project
    );
    setProjects(updatedProjects);

    // Only try to save to API if it's not a mock project
    if (!draggedProject.id.startsWith('mock-')) {
      try {
        const response = await ApiService.updateKanbanProject(draggedProject.id, {
          stage: targetStage
        });

        if (!response.success) {
          // Revert on error
          setProjects(projects.map(project =>
            project.id === draggedProject.id
              ? { ...project, stage: draggedProject.stage }
              : project
          ));
          throw new Error(response.error || 'Failed to update project');
        }
      } catch (err) {
        console.error('Error updating project stage:', err);
        alert('Failed to move project. Please try again.');
        // Revert on error
        setProjects(projects.map(project =>
          project.id === draggedProject.id
            ? { ...project, stage: draggedProject.stage }
            : project
        ));
      }
    }
    
    setDraggedProject(null);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getProjectsByStage = (stage: string) => {
    return projects.filter(project => project.stage === stage);
  };

  if (loading) {
    return (
      <div className="kanban-loading">
        <div className="loading-spinner"></div>
        <p>Loading kanban board...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="kanban-error">
        <h3>Error loading kanban board</h3>
        <p>{error}</p>
        {error.includes('table not found') || error.includes('relation') ? (
          <div className="migration-notice">
            <p><strong>⚠️ Database Migration Required</strong></p>
            <p>The kanban_projects table hasn't been created yet. Please run the migration:</p>
            <ol style={{ textAlign: 'left', maxWidth: '600px', margin: '20px auto' }}>
              <li>Go to <a href="https://supabase.com/dashboard" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', textDecoration: 'underline' }}>Supabase Dashboard</a></li>
              <li>Select your project and open SQL Editor</li>
              <li>Run the migration from: <code>backend/supabase/migrations/20250115000000_create_kanban_projects_table.sql</code></li>
            </ol>
          </div>
        ) : null}
        <button onClick={fetchProjects} className="retry-button">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="kanban-board-container" style={{ width: '100%', maxWidth: '100%', padding: 0, margin: 0 }}>
      <div className="kanban-header">
        <h2>School Communities Project Kanban Board</h2>
        {onAddProject && (
          <button onClick={onAddProject} className="add-project-button">
            + Add Project
          </button>
        )}
      </div>

      <div className="kanban-board">
        {KANBAN_STAGES.map((stage) => {
          const stageProjects = getProjectsByStage(stage);
          return (
            <div
              key={stage}
              className={`kanban-column ${dragOverColumn === stage ? 'drag-over' : ''}`}
              onDragOver={(e) => handleDragOver(e, stage)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, stage)}
            >
              <div className="kanban-column-header">
                <h3>{stage}</h3>
                <span className="project-count">{stageProjects.length}</span>
              </div>
              <div className="kanban-column-content">
                {stageProjects.map((project) => (
                  <div
                    key={project.id}
                    className={`kanban-card ${draggedProject?.id === project.id ? 'dragging' : ''}`}
                    draggable
                    onDragStart={(e) => handleDragStart(e, project)}
                    onDragEnd={handleDragEnd}
                  >
                    <div className="kanban-card-header">
                      <h4>{project.title}</h4>
                    </div>
                    <div className="kanban-card-body">
                      <div className="kanban-card-field">
                        <strong>Student:</strong> {project.student_name}
                      </div>
                      {project.description && (
                        <div className="kanban-card-field">
                          <strong>Description:</strong>
                          <p>{project.description}</p>
                        </div>
                      )}
                      <div className="kanban-card-field">
                        <strong>Added:</strong> {formatDate(project.created_at)}
                      </div>
                    </div>
                  </div>
                ))}
                {stageProjects.length === 0 && (
                  <div className="kanban-empty-state">
                    <p>No projects in this stage</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default KanbanBoard;

