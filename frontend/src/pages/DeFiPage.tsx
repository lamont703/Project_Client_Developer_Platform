import React from 'react';
import { DeFiPlatform } from '../components/Peer to Peer DeFi Lending Platform';

interface DeFiPageProps {
  navigateToHome?: () => void;
}

const DeFiPage: React.FC<DeFiPageProps> = ({ navigateToHome }) => {
  return (
    <div className="defi-page">
      <DeFiPlatform navigateToHome={navigateToHome} />
    </div>
  );
};

export default DeFiPage;
