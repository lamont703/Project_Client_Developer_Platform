import React, { useState, useEffect } from 'react';
import '../styles/Book/BookLandingPage.css';
import { 
  HeroSection, 
  WhatsIncludedSection, 
  HowItWorksSection, 
  WhoIsThisForSection,
  TestimonialsSection, 
  CTASection, 
  FAQSection 
} from '../components/Book';
import PaymentModal from '../components/Book/PaymentModal';

interface BookLandingPageProps {
  navigateToHome?: () => void;
}

const BookLandingPage: React.FC<BookLandingPageProps> = ({ navigateToHome }) => {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const openPaymentModal = () => setIsPaymentModalOpen(true);
  const closePaymentModal = () => setIsPaymentModalOpen(false);

  useEffect(() => {
    // Update page title
    document.title = 'Blueprint To Freelance Freedom - Break Free From Platforms | XRBlockDev';

    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Learn how to break free from platforms like Fiverr and Upwork, and land premium clients using AI systems. Get your copy of Blueprint To Freelance Freedom for just $29.');
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
    updateMetaTag('og:title', 'Blueprint To Freelance Freedom - Break Free From Platforms');
    updateMetaTag('og:description', 'Learn how to break free from platforms like Fiverr and Upwork, and land premium clients using AI systems. Get your copy for just $29.');
    updateMetaTag('og:image', '/Book Cover.PNG');
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
    updateTwitterTag('twitter:title', 'Blueprint To Freelance Freedom - Break Free From Platforms');
    updateTwitterTag('twitter:description', 'Learn how to break free from platforms like Fiverr and Upwork, and land premium clients using AI systems. Get your copy for just $29.');
    updateTwitterTag('twitter:image', '/Book Cover.PNG');

    // Cleanup function to restore original meta tags when component unmounts
    return () => {
      document.title = 'Client Developer Platform';
      if (metaDescription) {
        metaDescription.setAttribute('content', 'Developer Platform - Connect developers with opportunities');
      }
    };
  }, []);

  return (
    <div className="book-landing-page">
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

export default BookLandingPage;

