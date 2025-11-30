import React, { useEffect, useRef } from 'react';
import '../../styles/Freelance Kickstart/PaymentModal.css';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose }) => {
  const paymentLink = 'https://innergcomplete.app.clientclub.net/courses/offers/4311e147-57f9-4b89-a315-a061e83c5e16';
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
    <>
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
      <div 
        ref={overlayRef}
        className={`payment-modal-overlay ${isOpen ? 'open' : 'closed'}`}
        onClick={handleOverlayClick}
      >
        <div className="payment-modal-circuit-bg"></div>
        <div className="payment-modal-container">
          {/* Logo */}
          <div className="payment-modal-logo">
            <img 
              src="/XRBlockDev Logo.png" 
              alt="Inner G Complete Agency" 
              className="payment-modal-logo-img"
            />
          </div>

          {/* Value Confirmation Header */}
          <div className="payment-modal-value-header">
            <h1 className="payment-modal-main-headline">
              Secure Your Accelerated Path to Predictable Income
            </h1>
            <h2 className="payment-modal-sub-headline">
              The 10 Day AI Freelance Kickstart
            </h2>
            <p className="payment-modal-sub-headline-detail">
              (The STAR Method: Blueprint To Freelance Freedom)
            </p>
            <div className="payment-modal-price-display">
              <span className="payment-modal-price-label">Today's Investment:</span>
              <span className="payment-modal-price-amount">$497</span>
            </div>
            <ul className="payment-modal-value-recap">
              <li>
                <span className="payment-modal-checkmark">✓</span>
                Full STAR Method Implementation Training
              </li>
              <li>
                <span className="payment-modal-checkmark">✓</span>
                Proprietary Guide to Building a Reliable, Scalable, and Efficient AI-Driven Tool Stack
              </li>
              <li>
                <span className="payment-modal-checkmark">✓</span>
                Immediate Access to Core AI Productivity Tools (e.g., GoHighLevel & ChatGPT integration)
              </li>
              <li>
                <span className="payment-modal-checkmark">✓</span>
                All Bonuses Included (e.g., Blueprint To Freelance Freedom Book & Private Support Network Access)
              </li>
            </ul>
          </div>

          {/* Embedded Payment Container */}
          <div className="payment-modal-payment-container">
            <p className="payment-modal-security-text">
              100% Secure Transaction. Begin Implementing the STAR Method Now.
            </p>
            <div className="payment-modal-iframe-wrapper">
              <iframe
                ref={iframeRef}
                src={paymentLink}
                className="payment-iframe"
                title="10 Day AI Freelance Kickstart Payment"
                frameBorder="0"
                scrolling="yes"
                allowFullScreen
                loading="lazy"
                allow="payment; fullscreen"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentModal;
