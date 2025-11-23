import React, { useEffect, useRef, useState } from 'react';
import '../../styles/Webinar Workshop/PaymentModal.css';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose }) => {
  const scriptLoaded = useRef(false);
  const bookingId = 'ACNzCcCMVzQqXjSV79zG';
  const [uniqueId] = useState(() => `${bookingId}_${Date.now()}`);

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

  useEffect(() => {
    // Load the booking script after iframe is mounted
    if (isOpen) {
      // Small delay to ensure iframe is in DOM
      const timer = setTimeout(() => {
        // Check if script already exists
        const existingScript = document.querySelector(`script[src="https://link.msgsndr.com/js/form_embed.js"]`);
        
        if (!existingScript && !scriptLoaded.current) {
          try {
            const script = document.createElement('script');
            script.src = 'https://link.msgsndr.com/js/form_embed.js';
            script.type = 'text/javascript';
            script.async = true;
            script.onerror = () => {
              console.error('Failed to load booking script');
              scriptLoaded.current = false;
            };
            script.onload = () => {
              scriptLoaded.current = true;
            };
            document.body.appendChild(script);
          } catch (error) {
            console.error('Error loading booking script:', error);
          }
        } else if (existingScript) {
          scriptLoaded.current = true;
        }
      }, 100);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [isOpen]);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Don't close on overlay click for full-screen modal
    e.stopPropagation();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div 
      className={`payment-modal-overlay ${isOpen ? 'open' : 'closed'}`}
      onClick={handleOverlayClick}
    >
      <button 
        className="payment-modal-close" 
        onClick={onClose} 
        aria-label="Close booking modal"
      >
        ×
      </button>
      <div className="payment-iframe-container">
        <iframe
          src="https://api.leadconnectorhq.com/widget/booking/ACNzCcCMVzQqXjSV79zG"
          className="payment-iframe"
          title="Workshop Booking Calendar"
          frameBorder="0"
          scrolling="yes"
          id={uniqueId}
          style={{ width: '100%', border: 'none' }}
          allowFullScreen
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default PaymentModal;

