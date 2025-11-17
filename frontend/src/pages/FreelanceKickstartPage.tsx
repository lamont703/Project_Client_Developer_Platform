import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    // Update page title
    document.title = '10-Day AI Freelance Kickstart - Launch Your Freelance Career | XRBlockDev';

    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Launch your AI freelance journey in just 10 days. Get hands-on with AI tools, start freelancing smarter, and test-drive GoHighLevel. Only $97 with a 100% money-back guarantee.');
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
    updateMetaTag('og:title', '10-Day AI Freelance Kickstart - Launch Your Freelance Career');
    updateMetaTag('og:description', 'Launch your AI freelance journey in just 10 days. Get hands-on with AI tools, start freelancing smarter, and test-drive GoHighLevel. Only $97 with a 100% money-back guarantee.');
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
    updateTwitterTag('twitter:title', '10-Day AI Freelance Kickstart - Launch Your Freelance Career');
    updateTwitterTag('twitter:description', 'Launch your AI freelance journey in just 10 days. Get hands-on with AI tools, start freelancing smarter, and test-drive GoHighLevel. Only $97 with a 100% money-back guarantee.');
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

