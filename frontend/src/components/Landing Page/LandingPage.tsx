import React from 'react';
import { useNavigate } from 'react-router-dom';
import HeroSection from './HeroSection';
import FeaturesSection from './FeaturesSection';
import WaitlistForm from './WaitlistForm';
import StatsSection from './StatsSection';
import '../../styles/Landing Page/LandingPage.css';

interface LandingPageProps {
  navigateToHome?: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ navigateToHome }) => {
  const navigate = useNavigate();

  const handleNavigation = (route: string) => {
    try {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      navigate(route);
    } catch (error) {
      console.error('LandingPage navigation error:', error);
      window.location.hash = `#${route}`;
    }
  };

  return (
    <div className="landing-page">
      <HeroSection />
      <FeaturesSection />
      <WaitlistForm />
      <StatsSection />
    </div>
  );
};

export default LandingPage;
