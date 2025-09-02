import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    // Multiple methods to ensure scroll to top works reliably
    const scrollToTop = () => {
      // Method 1: Immediate scroll
      window.scrollTo(0, 0);
      
      // Method 2: Smooth scroll as backup
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      
      // Method 3: Force scroll on document body
      if (document.body) {
        document.body.scrollTop = 0;
      }
      
      // Method 4: Force scroll on document element
      if (document.documentElement) {
        document.documentElement.scrollTop = 0;
      }
    };

    // Execute immediately
    scrollToTop();
    
    // Also execute after a brief delay to catch any late rendering
    setTimeout(scrollToTop, 10);
    setTimeout(scrollToTop, 50);
  }, [location.pathname]);

  return null; // This component doesn't render anything
};

export default ScrollToTop; 