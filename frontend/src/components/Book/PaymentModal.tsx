import React, { useEffect } from 'react';
import '../../styles/Book/PaymentModal.css';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose }) => {
  const paymentLink = 'https://link.fastpaydirect.com/payment-link/691e1cc434b82f3ed673482b';

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
          <h2 className="payment-modal-title">Complete Your Purchase</h2>
          <p className="payment-modal-subtitle">
            Blueprint To Freelance Freedom - $29
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

