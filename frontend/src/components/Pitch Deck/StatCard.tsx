import React from 'react';
import '../../styles/StatCard.css';

interface StatCardProps {
  number: string;
  label: string;
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({ number, label, className = '' }) => {
  return (
    <div className={`stat-card ${className}`}>
      <div className="stat-number">{number}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
};

export default StatCard;
