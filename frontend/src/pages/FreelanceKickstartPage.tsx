import React, { useState } from 'react';
import '../styles/Freelance Kickstart/FreelanceKickstartPage.css';
import { 
  HeroSection, 
  WhatsIncludedSection, 
  HowItWorksSection, 
  TestimonialsSection, 
  CTASection, 
  FAQSection 
} from '../components/Freelance Kickstart';
import PaymentModal from '../components/Freelance Kickstart/PaymentModal';

interface FreelanceKickstartPageProps {
  navigateToHome?: () => void;
}

const FreelanceKickstartPage: React.FC<FreelanceKickstartPageProps> = ({ navigateToHome }) => {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const openPaymentModal = () => setIsPaymentModalOpen(true);
  const closePaymentModal = () => setIsPaymentModalOpen(false);

  return (
    <div className="freelance-kickstart-page">
      <HeroSection onOpenPaymentModal={openPaymentModal} />
      <WhatsIncludedSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <CTASection onOpenPaymentModal={openPaymentModal} />
      <FAQSection />
      <PaymentModal isOpen={isPaymentModalOpen} onClose={closePaymentModal} />
    </div>
  );
};

export default FreelanceKickstartPage;

