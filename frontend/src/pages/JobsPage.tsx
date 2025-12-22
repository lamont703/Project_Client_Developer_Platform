import React, { useState } from 'react';
import { KanbanBoard, AddProjectForm } from '../components/Kanban Board';
import '../styles/PageLayout.css';

interface JobsPageProps {
  navigateToHome: () => void;
}

const JobsPage: React.FC<JobsPageProps> = ({ navigateToHome }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleAddProject = () => {
    setShowAddForm(true);
  };

  const handleProjectAdded = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="page-layout">
      <div className="page-header">
        <h1>📋 School Communities Project Kanban Board</h1>
        <p>Track student projects through the Client Software Pipeline</p>
      </div>
      
      <div className="page-content">
        <KanbanBoard key={refreshKey} onAddProject={handleAddProject} />
      </div>

      {showAddForm && (
        <AddProjectForm
          onClose={() => setShowAddForm(false)}
          onSuccess={handleProjectAdded}
        />
      )}
    </div>
  );
};

export default JobsPage; 