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

  // Debug logging
  useEffect(() => {
    console.log('[PaymentModal] isOpen changed:', isOpen);
    if (isOpen) {
      console.log('[PaymentModal] Modal opened, uniqueId:', uniqueId);
      // Expose debug function to window for console access
      (window as any).debugPaymentModal = () => {
        console.log('[PaymentModal] ===== MANUAL DEBUG =====');
        console.log('[PaymentModal] isOpen:', isOpen);
        console.log('[PaymentModal] uniqueId:', uniqueId);
        console.log('[PaymentModal] Close button ref:', closeButtonRef.current);
        console.log('[PaymentModal] Overlay ref:', overlayRef.current);
        console.log('[PaymentModal] Iframe ref:', iframeRef.current);
        
        const closeBtn = document.querySelector('.payment-modal-close');
        const wrapper = document.querySelector('.payment-modal-close-wrapper');
        const overlay = document.querySelector('.payment-modal-overlay');
        const iframe = document.querySelector(`#${uniqueId}`);
        
        console.log('[PaymentModal] Elements in DOM:');
        console.log('  - Close button:', closeBtn);
        console.log('  - Wrapper:', wrapper);
        console.log('  - Overlay:', overlay);
        console.log('  - Iframe:', iframe);
        
        if (closeBtn) {
          const styles = window.getComputedStyle(closeBtn);
          console.log('[PaymentModal] Close button styles:', {
            zIndex: styles.zIndex,
            pointerEvents: styles.pointerEvents,
            display: styles.display,
            visibility: styles.visibility,
            opacity: styles.opacity,
            position: styles.position,
            top: styles.top,
            right: styles.right
          });
        }
        console.log('[PaymentModal] ===== END MANUAL DEBUG =====');
      };
      console.log('[PaymentModal] Debug function available: window.debugPaymentModal()');
    } else {
      delete (window as any).debugPaymentModal;
    }
  }, [isOpen, uniqueId]);

  useEffect(() => {
    // Prevent body scroll when modal is open, but allow modal overlay to scroll
    if (isOpen) {
      // Simple overflow hidden - doesn't interfere with touch events
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
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

        // Try to resize iframe to fit content after a delay
        const resizeTimer = setTimeout(() => {
          const iframe = iframeRef.current || document.getElementById(uniqueId);
          if (iframe) {
            // Set iframe to auto height to allow full content display
            iframe.style.height = 'auto';
            iframe.style.minHeight = '100vh';
            
            // Listen for iframe load to potentially adjust height
            iframe.onload = () => {
              try {
                // Try to get iframe content height (may fail due to CORS)
                const iframeDoc = (iframe as HTMLIFrameElement).contentDocument || 
                                 (iframe as HTMLIFrameElement).contentWindow?.document;
                if (iframeDoc) {
                  const height = Math.max(
                    iframeDoc.body.scrollHeight,
                    iframeDoc.body.offsetHeight,
                    iframeDoc.documentElement.clientHeight,
                    iframeDoc.documentElement.scrollHeight,
                    iframeDoc.documentElement.offsetHeight
                  );
                  if (height > 0) {
                    iframe.style.height = `${height}px`;
                  }
                }
              } catch (e) {
                // CORS restriction - can't access iframe content
                // This is expected for external iframes
                console.log('[PaymentModal] Cannot access iframe content (CORS), using auto height');
              }
            };
          }
        }, 500);

        return () => {
          clearTimeout(resizeTimer);
        };
      }, 100);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [isOpen, uniqueId]);

  // Unified close handler that works on both desktop and mobile
  const handleClose = () => {
    onClose();
  };

  // Add native event listeners for mobile close button as backup
  useEffect(() => {
    if (!isOpen) {
      // Modal is closed, skip event listener setup
      return;
    }

    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      if (!closeButtonRef.current) {
        console.error('[PaymentModal] Close button ref is null!');
        console.log('[PaymentModal] Searching for close button in DOM...');
        const foundButton = document.querySelector('.payment-modal-close');
        console.log('[PaymentModal] Found button in DOM:', foundButton);
        return;
      }

      const button = closeButtonRef.current;
      console.log('[PaymentModal] Close button found, setting up event listeners:', button);
      console.log('[PaymentModal] Button computed styles:', window.getComputedStyle(button));
      console.log('[PaymentModal] Button z-index:', window.getComputedStyle(button).zIndex);
      console.log('[PaymentModal] Button pointer-events:', window.getComputedStyle(button).pointerEvents);
      console.log('[PaymentModal] Button visibility:', window.getComputedStyle(button).visibility);
      console.log('[PaymentModal] Button display:', window.getComputedStyle(button).display);
      
      const handleNativeClose = (e: Event) => {
        console.log('[PaymentModal] Native close event triggered:', e.type);
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        onClose();
      };

      // Add event listeners with capture phase to ensure they fire first
      button.addEventListener('click', handleNativeClose, { capture: true, passive: false });
      button.addEventListener('touchend', handleNativeClose, { capture: true, passive: false });
      console.log('[PaymentModal] Event listeners attached to close button');

      return () => {
        button.removeEventListener('click', handleNativeClose, { capture: true });
        button.removeEventListener('touchend', handleNativeClose, { capture: true });
      };
    }, 100);

    return () => {
      clearTimeout(timer);
    };
  }, [isOpen, onClose]);

  const handleCloseClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.nativeEvent) {
      e.nativeEvent.stopImmediatePropagation();
    }
    handleClose();
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLButtonElement>) => {
    // Allow touch to start, but mark that we want to close
    e.stopPropagation();
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLButtonElement>) => {
    // Close on touch end
    e.preventDefault();
    e.stopPropagation();
    if (e.nativeEvent) {
      e.nativeEvent.stopImmediatePropagation();
    }
    handleClose();
  };

  const handleTouchCancel = (e: React.TouchEvent<HTMLButtonElement>) => {
    // Handle touch cancel to prevent issues
    e.stopPropagation();
  };

  // Debug DOM elements after render
  useEffect(() => {
    if (!isOpen) return;

    const debugTimer = setTimeout(() => {
      console.log('[PaymentModal] ===== DOM DEBUG START =====');
      console.log('[PaymentModal] isOpen:', isOpen);
      console.log('[PaymentModal] uniqueId:', uniqueId);
      
      // Check close button
      const closeButton = closeButtonRef.current;
      console.log('[PaymentModal] Close button ref:', closeButton);
      if (closeButton) {
        console.log('[PaymentModal] Close button in DOM:', document.contains(closeButton));
        console.log('[PaymentModal] Close button parent:', closeButton.parentElement);
        const rect = closeButton.getBoundingClientRect();
        const styles = window.getComputedStyle(closeButton);
        console.log('[PaymentModal] Close button position:', {
          top: rect.top,
          right: window.innerWidth - rect.right,
          left: rect.left,
          bottom: rect.bottom,
          width: rect.width,
          height: rect.height,
          visible: rect.width > 0 && rect.height > 0,
          onScreen: rect.top >= 0 && rect.left >= 0 && rect.right <= window.innerWidth && rect.bottom <= window.innerHeight
        });
        console.log('[PaymentModal] Close button clickable test:', {
          zIndex: styles.zIndex,
          pointerEvents: styles.pointerEvents,
          display: styles.display,
          visibility: styles.visibility,
          opacity: styles.opacity,
          position: styles.position
        });
        
        // Test if element is actually clickable
        const elementAtPoint = document.elementFromPoint(rect.left + rect.width / 2, rect.top + rect.height / 2);
        console.log('[PaymentModal] Element at button center:', elementAtPoint);
        console.log('[PaymentModal] Is button at center?', elementAtPoint === closeButton || closeButton.contains(elementAtPoint));
      } else {
        console.warn('[PaymentModal] Close button ref is null!');
      }

      // Check wrapper
      const wrapper = document.querySelector('.payment-modal-close-wrapper');
      console.log('[PaymentModal] Close wrapper found:', wrapper);
      if (wrapper) {
        const wrapperRect = wrapper.getBoundingClientRect();
        console.log('[PaymentModal] Wrapper position:', {
          top: wrapperRect.top,
          right: wrapperRect.right,
          width: wrapperRect.width,
          height: wrapperRect.height
        });
        console.log('[PaymentModal] Wrapper computed styles:', {
          zIndex: window.getComputedStyle(wrapper).zIndex,
          pointerEvents: window.getComputedStyle(wrapper).pointerEvents,
          display: window.getComputedStyle(wrapper).display,
          visibility: window.getComputedStyle(wrapper).visibility
        });
      }

      // Check overlay
      const overlay = overlayRef.current || document.querySelector('.payment-modal-overlay');
      console.log('[PaymentModal] Overlay found:', overlay);
      if (overlay) {
        const overlayRect = overlay.getBoundingClientRect();
        console.log('[PaymentModal] Overlay position:', {
          top: overlayRect.top,
          left: overlayRect.left,
          width: overlayRect.width,
          height: overlayRect.height
        });
        console.log('[PaymentModal] Overlay computed styles:', {
          zIndex: window.getComputedStyle(overlay).zIndex,
          pointerEvents: window.getComputedStyle(overlay).pointerEvents,
          display: window.getComputedStyle(overlay).display,
          visibility: window.getComputedStyle(overlay).visibility,
          opacity: window.getComputedStyle(overlay).opacity
        });
      }

      // Check iframe
      const iframe = iframeRef.current || document.querySelector(`#${uniqueId}`);
      console.log('[PaymentModal] Iframe found:', iframe);
      if (iframe) {
        const iframeRect = iframe.getBoundingClientRect();
        console.log('[PaymentModal] Iframe position:', {
          top: iframeRect.top,
          left: iframeRect.left,
          width: iframeRect.width,
          height: iframeRect.height
        });
        console.log('[PaymentModal] Iframe computed styles:', {
          zIndex: window.getComputedStyle(iframe).zIndex,
          pointerEvents: window.getComputedStyle(iframe).pointerEvents,
          display: window.getComputedStyle(iframe).display
        });
      }

      // Check mobile viewport
      const isMobile = window.innerWidth <= 768;
      console.log('[PaymentModal] Is mobile view:', isMobile);
      console.log('[PaymentModal] Viewport size:', {
        width: window.innerWidth,
        height: window.innerHeight
      });

      // Check all modal elements in DOM
      const allModalElements = document.querySelectorAll('[class*="payment-modal"]');
      console.log('[PaymentModal] All modal elements found:', allModalElements.length);
      allModalElements.forEach((el, index) => {
        console.log(`[PaymentModal] Element ${index}:`, {
          className: el.className,
          tagName: el.tagName,
          inDOM: document.contains(el),
          visible: window.getComputedStyle(el).display !== 'none'
        });
      });

      console.log('[PaymentModal] ===== DOM DEBUG END =====');
    }, 200);

    return () => {
      clearTimeout(debugTimer);
    };
  }, [isOpen, uniqueId]);

  if (!isOpen) {
    // Modal is closed, do not render anything
    return null;
  }

  console.log('[PaymentModal] Rendering modal components');

  return (
    <>
      <div className="payment-modal-close-wrapper" data-debug="close-wrapper">
        <button 
          ref={closeButtonRef}
          className="payment-modal-close" 
          onClick={handleCloseClick}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={handleTouchCancel}
          type="button"
          aria-label="Close booking modal"
          data-debug="close-button"
        >
          ×
        </button>
      </div>
      <div 
        ref={overlayRef}
        className={`payment-modal-overlay ${isOpen ? 'open' : 'closed'}`}
        data-debug="overlay"
      >
        <div 
          className="payment-iframe-container" 
          data-debug="iframe-container"
        >
          <iframe
            ref={iframeRef}
            src="https://api.leadconnectorhq.com/widget/booking/ThJEjpQHi0ajEB0UxJKJ"
            className="payment-iframe"
            title="Workshop Booking Calendar"
            frameBorder="0"
            scrolling="no"
            id={uniqueId}
            style={{ 
              width: '100%', 
              border: 'none',
              overflow: 'hidden',
              pointerEvents: 'auto',
              touchAction: 'manipulation',
              minHeight: '100vh',
              height: 'auto'
            }}
            allowFullScreen
            loading="lazy"
            allow="payment; fullscreen"
            data-debug="iframe"
          />
        </div>
      </div>
    </>
  );
};

export default PaymentModal;

