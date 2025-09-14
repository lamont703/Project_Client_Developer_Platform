import React from 'react';
import '../styles/Coding Education/CodingEducationPage.css';
import { WaitlistHero, CourseOverview, WaitlistForm, Testimonials } from '../components/Coding Education';

interface CodingEducationPageProps {
  navigateToHome?: () => void;
}

const CodingEducationPage: React.FC<CodingEducationPageProps> = ({ navigateToHome }) => {
  return (
    <div className="coding-education-page">
      <WaitlistHero navigateToHome={navigateToHome} />
      <CourseOverview />
      <WaitlistForm />
      <Testimonials />
    </div>
  );
};

export default CodingEducationPage;
