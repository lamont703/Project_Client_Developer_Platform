import React from 'react';
import '../../styles/LinkInBio/LinkButton.css';

interface LinkButtonProps {
  title: string;
  icon?: string;
  onClick: () => void;
  external?: boolean;
  priority?: 'primary' | 'secondary' | 'tertiary';
  accentColor?: 'green' | 'gold' | 'default';
}

const LinkButton: React.FC<LinkButtonProps> = ({ title, icon, onClick, external, priority = 'tertiary', accentColor = 'default' }) => {
  const buttonClass = `link-button link-button-${priority} link-button-${accentColor}`;
  
  return (
    <button 
      className={buttonClass} 
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



