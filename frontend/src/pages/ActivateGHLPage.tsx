import React from 'react';
import '../styles/GHL Activation/ActivateGHLPage.css';
import { 
  GHLActivationHero, 
  GHLBenefits, 
  GHLSignupCTA 
} from '../components/GHL Activation';

interface ActivateGHLPageProps {
  navigateToHome?: () => void;
}

const ActivateGHLPage: React.FC<ActivateGHLPageProps> = ({ navigateToHome }) => {
  return (
    <div className="activate-ghl-page">
      <GHLActivationHero />
      <GHLBenefits />
      <GHLSignupCTA />
    </div>
  );
};

export default ActivateGHLPage;

