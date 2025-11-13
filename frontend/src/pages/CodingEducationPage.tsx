import React, { useState } from 'react';
import '../styles/Coding Education/CodingEducationPage.css';
import { WaitlistHero, CourseOverview, Testimonials, LearningSetupGuide, CodingEducationFooter, BookingModal, FreelanceReadySkills, FreelanceTimeline, AgencyPipelineOpportunities, WaitlistOverlay } from '../components/Coding Education';

interface CodingEducationPageProps {
  navigateToHome?: () => void;
}

const CodingEducationPage: React.FC<CodingEducationPageProps> = ({ navigateToHome }) => {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  // Show waitlist overlay by default (page not ready for public)
  const [showWaitlistOverlay, setShowWaitlistOverlay] = useState(true);

  const openBookingModal = () => setIsBookingModalOpen(true);
  const closeBookingModal = () => setIsBookingModalOpen(false);

  return (
    <div className="coding-education-page">
      <WaitlistOverlay isVisible={showWaitlistOverlay} />
      <WaitlistHero onScheduleClick={openBookingModal} />
      <LearningSetupGuide onScheduleClick={openBookingModal} />
      <CourseOverview />
      <FreelanceReadySkills onScheduleClick={openBookingModal} />
      <AgencyPipelineOpportunities onScheduleClick={openBookingModal} />
      <FreelanceTimeline />
      <Testimonials />
      <CodingEducationFooter onScheduleClick={openBookingModal} />
      <BookingModal isOpen={isBookingModalOpen} onClose={closeBookingModal} />
    </div>
  );
};

export default CodingEducationPage;
