import React, { useEffect } from 'react';
import '../../styles/AICommunitySupportModal.css';

interface SupportNetworkModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SUPPORT_NETWORK_URL =
  'https://innergcomplete.app.clientclub.net/communities/groups/ai-freelance-support-network/home';

const SupportNetworkModal: React.FC<SupportNetworkModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="support-modal-overlay" onClick={handleOverlayClick}>
      <div className="support-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="support-modal-close" onClick={onClose} aria-label="Close support network modal">
          ×
        </button>
        <iframe
          src={SUPPORT_NETWORK_URL}
          className="support-modal-iframe"
          title="AI Freelance Support Network"
          frameBorder="0"
          allow="payment; fullscreen"
        />
      </div>
    </div>
  );
};

export default SupportNetworkModal;






