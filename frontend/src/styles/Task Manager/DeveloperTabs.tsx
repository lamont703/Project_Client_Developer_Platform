import React from 'react';
import '../../styles/Task Manager/DeveloperTabs.css';

interface DeveloperTabsProps {
  selectedDeveloper: string | null;
  onDeveloperSelect: (developerId: string | null) => void;
  getDeveloperName: (developerId: string) => string;
}

export const DeveloperTabs: React.FC<DeveloperTabsProps> = ({
  selectedDeveloper,
  onDeveloperSelect,
  getDeveloperName
}) => {
  const developers = [
    { id: '68m7FKXhWCRZALwW9Ge8', name: 'Julian Faulkner' },
    { id: 'SqbVVbHNjxmEHxJTw59e', name: 'Lamont Evans' },
    { id: 'ZYtMsRlvyzY8Y3JwMPpl', name: 'Dantee Fluellen' },
    { id: 'current-user', name: 'Current User' }
  ];

  return (
    <div className="developer-tabs">
      <div className="tabs-container">
        <button
          className={`tab ${selectedDeveloper === null ? 'active' : ''}`}
          onClick={() => onDeveloperSelect(null)}
        >
          All Tasks
        </button>
        {developers.map(developer => (
          <button
            key={developer.id}
            className={`tab ${selectedDeveloper === developer.id ? 'active' : ''}`}
            onClick={() => onDeveloperSelect(developer.id)}
          >
            {developer.name}
          </button>
        ))}
      </div>
    </div>
  );
};
