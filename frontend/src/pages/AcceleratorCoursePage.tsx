import React, { useState, useEffect } from 'react';
import '../styles/Accelerator Course/AcceleratorCoursePage.css';
import { 
  HeroSection, 
  WhatsIncludedSection, 
  HowItWorksSection, 
  WhoIsThisForSection,
  TestimonialsSection, 
  CTASection, 
  FAQSection 
} from '../components/Accelerator Course';
import PaymentModal from '../components/Accelerator Course/PaymentModal';

interface AcceleratorCoursePageProps {
  navigateToHome?: () => void;
}

const AcceleratorCoursePage: React.FC<AcceleratorCoursePageProps> = ({ navigateToHome }) => {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const openPaymentModal = () => setIsPaymentModalOpen(true);
  const closePaymentModal = () => setIsPaymentModalOpen(false);

  useEffect(() => {
    // Update page title
    document.title = 'AI Freelance Accelerator Course - Scale Your Freelance Business | XRBlockDev';

    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Take your freelance business to the next level with our comprehensive AI Freelance Accelerator Course. Advanced strategies, systems, and support to scale your income. $1997 investment.');
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
    updateMetaTag('og:title', 'AI Freelance Accelerator Course - Scale Your Freelance Business');
    updateMetaTag('og:description', 'Take your freelance business to the next level with our comprehensive AI Freelance Accelerator Course. Advanced strategies, systems, and support to scale your income.');
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
    updateTwitterTag('twitter:title', 'AI Freelance Accelerator Course - Scale Your Freelance Business');
    updateTwitterTag('twitter:description', 'Take your freelance business to the next level with our comprehensive AI Freelance Accelerator Course. Advanced strategies, systems, and support to scale your income.');
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
    <div className="accelerator-course-page">
      <HeroSection onOpenPaymentModal={openPaymentModal} />
      <WhatsIncludedSection />
      <HowItWorksSection />
      <WhoIsThisForSection />
      <TestimonialsSection />
      <CTASection onOpenPaymentModal={openPaymentModal} />
      <FAQSection />
      <PaymentModal isOpen={isPaymentModalOpen} onClose={closePaymentModal} />
    </div>
  );
};

export default AcceleratorCoursePage;

