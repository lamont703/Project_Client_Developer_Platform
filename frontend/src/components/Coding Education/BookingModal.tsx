import React, { useEffect, useRef } from 'react';
import '../../styles/Coding Education/BookingModal.css';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
  const scriptRef = useRef<HTMLScriptElement | null>(null);
  const scriptLoadedRef = useRef(false);

  useEffect(() => {
    // The booking widget iframe works without the script
    // The script is optional and may cause errors, so we'll skip it for now
    // The iframe will function perfectly without it
    scriptLoadedRef.current = true;
    
    // Optional: Load script only in production if needed
    // Uncomment below if you want to attempt script loading with error suppression
    /*
    if (!scriptLoadedRef.current && typeof document !== 'undefined') {
      const existingScript = document.querySelector('script[src*="form_embed.js"]');
      
      if (!existingScript && document.body) {
        const script = document.createElement('script');
        script.src = 'https://link.msgsndr.com/js/form_embed.js';
        script.type = 'text/javascript';
        script.async = true;
        script.crossOrigin = 'anonymous';
        
        // Catch and suppress all errors
        const originalErrorHandler = window.onerror;
        window.onerror = (msg, url, line, col, error) => {
          if (url?.includes('form_embed.js')) {
            return true; // Suppress error
          }
          if (originalErrorHandler) {
            return originalErrorHandler(msg, url, line, col, error);
          }
          return false;
        };
        
        script.onerror = () => {
          window.onerror = originalErrorHandler;
          scriptLoadedRef.current = true;
        };
        
        script.onload = () => {
          window.onerror = originalErrorHandler;
          scriptLoadedRef.current = true;
        };
        
        try {
          document.body.appendChild(script);
          scriptRef.current = script;
        } catch {
          window.onerror = originalErrorHandler;
          scriptLoadedRef.current = true;
        }
      } else {
        scriptLoadedRef.current = true;
      }
    }
    */
  }, []);

  useEffect(() => {
    // Prevent body scroll when modal is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const bookingWidgetId = 'jIQYKx6O1KNu8P7QJgUj';

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Only close if clicking directly on overlay (desktop), not on modal content
    // On mobile, we don't want this to interfere with iframe touches
    if (e.target === e.currentTarget && window.innerWidth > 768) {
      onClose();
    }
  };

  return (
    <div 
      className="booking-modal-overlay" 
      onClick={handleOverlayClick}
      onTouchStart={(e) => {
        // On mobile, only handle touch on overlay itself to close
        // Don't let overlay touches interfere with modal content
        if (e.target === e.currentTarget) {
          // Could close on touch outside, but let's not interfere with iframe
        }
      }}
    >
      <div 
        className="booking-modal-content" 
        onClick={(e) => {
          // Stop click propagation but don't prevent default
          e.stopPropagation();
        }}
        onTouchStart={(e) => {
          // On mobile, don't stop touch propagation - let touches reach iframe
          // Only prevent overlay from closing if touching modal content
          const target = e.target as HTMLElement;
          if (target.classList.contains('booking-modal-content') || 
              target.closest('.booking-iframe-container') ||
              target.closest('.booking-iframe')) {
            // Don't stop propagation - let iframe receive the touch
            return;
          }
          // Only stop if it's header or close button
          if (target.closest('.booking-modal-header') || target.closest('.booking-modal-close')) {
            e.stopPropagation();
          }
        }}
      >
        <button className="booking-modal-close" onClick={onClose} aria-label="Close booking modal">
          ×
        </button>
        <div className="booking-modal-header">
          <h2 className="booking-modal-title">Book Your First Session</h2>
          <p className="booking-modal-subtitle">
            Select a time that works for you and let's start your coding journey!
          </p>
        </div>
        <div className="booking-iframe-container">
          <iframe
            src={`https://api.leadconnectorhq.com/widget/booking/${bookingWidgetId}`}
            scrolling="yes"
            id={`${bookingWidgetId}_${Date.now()}`}
            title="Book Your Session"
            className="booking-iframe"
            allow="fullscreen"
            allowFullScreen
            sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox allow-modals allow-top-navigation-by-user-activation allow-pointer-lock"
          />
        </div>
      </div>
    </div>
  );
};

export default BookingModal;

