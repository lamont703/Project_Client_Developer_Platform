import React, { useEffect } from 'react';
import '../../styles/Accelerator Course/PaymentModal.css';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose }) => {
  // You'll need to update this with your actual payment link
  const paymentLink = 'https://link.fastpaydirect.com/payment-link/YOUR_ACCELERATOR_PAYMENT_LINK_ID';

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

  return (
    <div 
      className={`payment-modal-overlay ${isOpen ? 'open' : 'closed'}`}
      onClick={handleOverlayClick}
    >
      <div 
        className="payment-modal-content" 
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <button 
          className="payment-modal-close" 
          onClick={onClose} 
          aria-label="Close payment modal"
        >
          ×
        </button>
        <div className="payment-modal-header">
          <h2 className="payment-modal-title">Complete Your Enrollment</h2>
          <p className="payment-modal-subtitle">
            AI Freelance Accelerator Course - $1997
          </p>
        </div>
        <div className="payment-iframe-container">
          <iframe
            src={paymentLink}
            className="payment-iframe"
            title="Payment Form"
            frameBorder="0"
            allow="payment"
            allowFullScreen
            loading="eager"
          />
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;

