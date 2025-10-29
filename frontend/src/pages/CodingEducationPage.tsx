import React, { useState } from 'react';
import '../styles/Coding Education/CodingEducationPage.css';
import { WaitlistHero, CourseOverview, Testimonials } from '../components/Coding Education';

interface CodingEducationPageProps {
  navigateToHome?: () => void;
}

const CodingEducationPage: React.FC<CodingEducationPageProps> = ({ navigateToHome }) => {
  const [showWaitlistModal, setShowWaitlistModal] = useState(false);

  const handleOpenWaitlist = () => {
    setShowWaitlistModal(true);
  };

  const handleCloseWaitlist = () => {
    setShowWaitlistModal(false);
  };

  return (
    <div className="coding-education-page">
      <WaitlistHero 
        showWaitlistModal={showWaitlistModal}
        handleOpenWaitlist={handleOpenWaitlist}
        handleCloseWaitlist={handleCloseWaitlist}
      />
      <CourseOverview />
      <Testimonials onJoinWaitlist={handleOpenWaitlist} />
    </div>
  );
};

export default CodingEducationPage;
