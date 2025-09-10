import React from 'react';
import '../../styles/FeatureCard.css';

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string | React.ReactNode;
  className?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, className = '' }) => {
  return (
    <div className={`feature-card ${className}`}>
      <div className="feature-icon">{icon}</div>
      <div className="feature-title">{title}</div>
      <div className="feature-description">{description}</div>
    </div>
  );
};

export default FeatureCard;
