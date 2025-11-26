import React, { useState, useEffect } from 'react';
import '../styles/Webinar Workshop/WebinarWorkshopPage.css';
import { 
  HeroSection, 
  WhatsIncludedSection, 
  HowItWorksSection, 
  WhoIsThisForSection,
  BonusSection, 
  CTASection, 
  FAQSection 
} from '../components/Webinar Workshop';
import PaymentModal from '../components/Webinar Workshop/PaymentModal';

interface WebinarWorkshopPageProps {
  navigateToHome?: () => void;
}

const WebinarWorkshopPage: React.FC<WebinarWorkshopPageProps> = ({ navigateToHome }) => {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const openPaymentModal = () => setIsPaymentModalOpen(true);
  const closePaymentModal = () => setIsPaymentModalOpen(false);

  useEffect(() => {
    // Update page title
    document.title = 'Escape Lowball Clients & 20% Fees - S.T.A.R. Method AI Freelancing System Workshop | XRBlockDev';

    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Tired of lowball clients and 20% platform fees? Learn the S.T.A.R. Method to our AI-freelancing system that gets you $5K+ clients — fast. Join our live workshop and escape Fiverr/Upwork forever.');
    }

    // Update Open Graph tags
    const updateMetaTag = (property: string, content: string) => {
      let meta = document.querySelector(`meta[property="${property}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('property', property);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    const currentUrl = window.location.href;
    
    updateMetaTag('og:type', 'website');
    updateMetaTag('og:url', currentUrl);
    updateMetaTag('og:title', 'Escape Lowball Clients & 20% Fees - S.T.A.R. Method AI Freelancing System Workshop');
    updateMetaTag('og:description', 'Tired of lowball clients and 20% platform fees? Learn the S.T.A.R. Method to our AI-freelancing system that gets you $5K+ clients — fast. Join our live workshop and escape Fiverr/Upwork forever.');
    updateMetaTag('og:image', 'https://www.xrwebsites.io/XRBlockDev%20Logo.png');
    updateMetaTag('og:site_name', 'XRBlockDev Services');

    // Update Twitter Card tags
    const updateTwitterTag = (name: string, content: string) => {
      let meta = document.querySelector(`meta[name="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', name);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    updateTwitterTag('twitter:card', 'summary_large_image');
    updateTwitterTag('twitter:url', currentUrl);
    updateTwitterTag('twitter:title', 'Escape Lowball Clients & 20% Fees - S.T.A.R. Method AI Freelancing System Workshop');
    updateTwitterTag('twitter:description', 'Tired of lowball clients and 20% platform fees? Learn the S.T.A.R. Method to our AI-freelancing system that gets you $5K+ clients — fast. Join our live workshop and escape Fiverr/Upwork forever.');
    updateTwitterTag('twitter:image', 'https://www.xrwebsites.io/XRBlockDev%20Logo.png');

    // Cleanup function to restore original meta tags when component unmounts
    return () => {
      document.title = 'Client Developer Platform';
      if (metaDescription) {
        metaDescription.setAttribute('content', 'Developer Platform - Connect developers with opportunities');
      }
    };
  }, []);

  return (
    <div className="webinar-workshop-page">
      <HeroSection onOpenPaymentModal={openPaymentModal} />
      <WhatsIncludedSection />
      <HowItWorksSection />
      <WhoIsThisForSection />
      <BonusSection />
      <CTASection onOpenPaymentModal={openPaymentModal} />
      <FAQSection />
      <PaymentModal isOpen={isPaymentModalOpen} onClose={closePaymentModal} />
    </div>
  );
};

export default WebinarWorkshopPage;
