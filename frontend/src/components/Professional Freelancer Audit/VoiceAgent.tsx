import React, { useEffect, useRef } from 'react';
import '../../styles/Professional Freelancer Audit/VoiceAgent.css';

interface VoiceAgentProps {
  isUnlocked: boolean;
  onAgentUsed?: () => void;
}

const VoiceAgent: React.FC<VoiceAgentProps> = ({ isUnlocked, onAgentUsed }) => {
  const elevenlabsWrapperRef = useRef<HTMLDivElement>(null);

  const centerElevenLabsWidget = () => {
    if (elevenlabsWrapperRef.current) {
      const widget = elevenlabsWrapperRef.current.querySelector('elevenlabs-convai');
      if (widget) {
        const widgetEl = widget as HTMLElement;
        widgetEl.style.setProperty('position', 'relative', 'important');
        widgetEl.style.setProperty('left', 'auto', 'important');
        widgetEl.style.setProperty('right', 'auto', 'important');
        widgetEl.style.setProperty('top', 'auto', 'important');
        widgetEl.style.setProperty('bottom', 'auto', 'important');
        widgetEl.style.setProperty('margin', '0 auto', 'important');
        widgetEl.style.setProperty('display', 'block', 'important');
        widgetEl.style.setProperty('width', '100%', 'important');
        widgetEl.style.setProperty('max-width', '600px', 'important');
        widgetEl.style.setProperty('float', 'none', 'important');
      }
    }
  };

  useEffect(() => {
    if (isUnlocked) {
      const scriptUrl = 'https://unpkg.com/@elevenlabs/convai-widget-embed';
      const existingScript = document.querySelector(`script[src="${scriptUrl}"]`);
      
      if (!existingScript) {
        const script = document.createElement('script');
        script.src = scriptUrl;
        script.type = 'text/javascript';
        script.async = true;
        document.body.appendChild(script);
      }

      let observer: MutationObserver | null = null;
      if (elevenlabsWrapperRef.current) {
        observer = new MutationObserver(() => {
          if (elevenlabsWrapperRef.current) {
            const widget = elevenlabsWrapperRef.current.querySelector('elevenlabs-convai');
            if (widget) {
              centerElevenLabsWidget();
            }
          }
        });
        observer.observe(elevenlabsWrapperRef.current, {
          childList: true,
          subtree: true,
          attributes: true,
          attributeFilter: ['style']
        });
      }

      const handleWidgetInteraction = () => {
        if (onAgentUsed) {
          onAgentUsed();
        }
      };

      // Capture ref value for cleanup
      const wrapperElement = elevenlabsWrapperRef.current;
      
      if (wrapperElement) {
        wrapperElement.addEventListener('click', handleWidgetInteraction);
      }

      return () => {
        if (observer) {
          observer.disconnect();
        }
        if (wrapperElement) {
          wrapperElement.removeEventListener('click', handleWidgetInteraction);
        }
      };
    }
  }, [isUnlocked, onAgentUsed]);

  useEffect(() => {
    if (isUnlocked) {
      const timers = [
        setTimeout(() => centerElevenLabsWidget(), 500),
        setTimeout(() => centerElevenLabsWidget(), 1500),
        setTimeout(() => centerElevenLabsWidget(), 3000)
      ];

      return () => {
        timers.forEach(timer => clearTimeout(timer));
      };
    }
  }, [isUnlocked]);

  return (
    <div className="pf-voice-agent-container">
      <div className="pf-voice-agent-header">
        <div className="pf-voice-agent-icon">
          <span className="pf-voice-pulse"></span>
          <span className="pf-voice-icon-text">🎤</span>
        </div>
        <div className="pf-voice-agent-title-section">
          <h2 className="pf-voice-agent-title">Professional Freelancer Audit AI Voice Agent</h2>
          <p className="pf-voice-agent-subtitle">
            {isUnlocked 
              ? 'Your personalized AI Voice Agent is ready to help you discover your scaling bottleneck'
              : 'Enter your email to unlock your personalized AI Voice Agent'
            }
          </p>
        </div>
      </div>
      <div className="pf-voice-agent-content">
        {isUnlocked ? (
          <div className="pf-elevenlabs-wrapper" ref={elevenlabsWrapperRef}>
            <div className="pf-elevenlabs-instructions">
              <p className="pf-instructions-text">Click the microphone to start your conversation</p>
            </div>
            {React.createElement('elevenlabs-convai', {
              'agent-id': 'agent_4201kbwz7dzyerd8yp1yetva6tvf'
            })}
          </div>
        ) : (
          <div className="pf-agent-locked-placeholder">
            <div className="pf-locked-icon">🔒</div>
            <p className="pf-locked-text">Enter your email above to unlock the AI Voice Agent</p>
          </div>
        )}
      </div>
      <div className="pf-voice-agent-footer">
        <p className="pf-voice-agent-footer-text">
          <strong>Powered by AI Systems Architecture</strong> • Get instant insights via voice conversation
        </p>
      </div>
    </div>
  );
};

export default VoiceAgent;
