import React from 'react';
import '../../styles/Slide.css';

interface SlideProps {
  children: React.ReactNode;
  className?: string;
  isActive?: boolean;
}

const Slide: React.FC<SlideProps> = ({ children, className = '', isActive = true }) => {
  return (
    <div className={`slide ${className} ${isActive ? 'active' : ''}`}>
      {children}
    </div>
  );
};

export default Slide;
