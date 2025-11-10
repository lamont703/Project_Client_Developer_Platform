import React from 'react';
import '../styles/Freelance Kickstart/FreelanceKickstartPage.css';
import { 
  HeroSection, 
  WhatsIncludedSection, 
  HowItWorksSection, 
  TestimonialsSection, 
  CTASection, 
  FAQSection 
} from '../components/Freelance Kickstart';

interface FreelanceKickstartPageProps {
  navigateToHome?: () => void;
}

const FreelanceKickstartPage: React.FC<FreelanceKickstartPageProps> = ({ navigateToHome }) => {
  const handleJoinClick = () => {
    // Navigate to checkout page
    // You can replace this with your actual checkout URL or payment integration
    window.location.href = '/checkout?product=10day-kickstart';
  };

  return (
    <div className="freelance-kickstart-page">
      <HeroSection />
      <WhatsIncludedSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <CTASection onJoinClick={handleJoinClick} />
      <FAQSection />
    </div>
  );
};

export default FreelanceKickstartPage;

