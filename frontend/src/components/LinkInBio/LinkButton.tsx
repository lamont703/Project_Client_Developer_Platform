import React from 'react';
import '../../styles/LinkInBio/LinkButton.css';

interface LinkButtonProps {
  title: string;
  icon?: string;
  onClick: () => void;
  external?: boolean;
}

const LinkButton: React.FC<LinkButtonProps> = ({ title, icon, onClick, external }) => {
  return (
    <button 
      className="link-button" 
      onClick={onClick}
      aria-label={`${title}${external ? ' (opens in new tab)' : ''}`}
    >
      <div className="link-button-content">
        {icon && <span className="link-icon">{icon}</span>}
        <span className="link-title">{title}</span>
        {external && (
          <span className="link-external-indicator" aria-hidden="true">
            ↗
          </span>
        )}
      </div>
    </button>
  );
};

export default LinkButton;



