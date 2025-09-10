import React from 'react';
import '../../styles/PitchDeckNavigation.css';

interface PitchDeckNavigationProps {
  currentSlide: number;
  totalSlides: number;
  onPrevious: () => void;
  onNext: () => void;
}

const PitchDeckNavigation: React.FC<PitchDeckNavigationProps> = ({
  currentSlide,
  totalSlides,
  onPrevious,
  onNext
}) => {
  return (
    <>
      {/* Navigation Buttons */}
      <div className="pitch-navigation">
        <button className="nav-button" onClick={onPrevious} aria-label="Previous slide">
          ←
        </button>
        <button className="nav-button" onClick={onNext} aria-label="Next slide">
          →
        </button>
      </div>
      
      {/* Slide Counter */}
      <div className="slide-counter">
        <span>{currentSlide + 1}</span> / <span>{totalSlides}</span>
      </div>
    </>
  );
};

export default PitchDeckNavigation;
