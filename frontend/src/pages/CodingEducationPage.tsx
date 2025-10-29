import React from 'react';
import '../styles/Coding Education/CodingEducationPage.css';
import { WaitlistHero, CourseOverview, Testimonials, LearningSetupGuide, CodingEducationFooter } from '../components/Coding Education';

interface CodingEducationPageProps {
  navigateToHome?: () => void;
}

const CodingEducationPage: React.FC<CodingEducationPageProps> = ({ navigateToHome }) => {
  return (
    <div className="coding-education-page">
      <WaitlistHero />
      <LearningSetupGuide />
      <CourseOverview />
      <Testimonials />
      <CodingEducationFooter />
    </div>
  );
};

export default CodingEducationPage;
