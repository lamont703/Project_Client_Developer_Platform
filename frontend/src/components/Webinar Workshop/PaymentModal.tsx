import React, { useEffect, useRef, useState } from 'react';
import '../../styles/Webinar Workshop/PaymentModal.css';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose }) => {
  const scriptLoaded = useRef(false);
  const bookingId = 'ThJEjpQHi0ajEB0UxJKJ';
  const [uniqueId] = useState(() => `${bookingId}_${Date.now()}`);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

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
      const timer = setTimeout(() => {
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
  }, [isOpen, uniqueId]);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Only close if clicking directly on overlay (desktop), not on modal content
    if (e.target === e.currentTarget && window.innerWidth > 768) {
        onClose();
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div 
      ref={overlayRef}
      className={`payment-modal-overlay ${isOpen ? 'open' : 'closed'}`}
      onClick={handleOverlayClick}
    >
      <div 
        className="payment-iframe-container" 
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="payment-modal-close-wrapper">
        <button 
          ref={closeButtonRef}
          className="payment-modal-close" 
            onClick={onClose} 
            aria-label="Close payment modal"
        >
          ×
        </button>
      </div>
          <iframe
            ref={iframeRef}
            src="https://api.leadconnectorhq.com/widget/booking/ThJEjpQHi0ajEB0UxJKJ"
            className="payment-iframe"
            title="Workshop Booking Calendar"
            frameBorder="0"
            scrolling="no"
            id={uniqueId}
            allowFullScreen
            loading="lazy"
            allow="payment; fullscreen"
          />
        </div>
      </div>
  );
};

export default PaymentModal;
