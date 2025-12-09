import React, { useEffect, useState, useRef } from 'react';
import '../styles/Professional Freelancer Audit/ProfessionalFreelancerAuditPage.css';

interface ProfessionalFreelancerAuditPageProps {
  navigateToHome?: () => void;
}

const ProfessionalFreelancerAuditPage: React.FC<ProfessionalFreelancerAuditPageProps> = ({ navigateToHome }) => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [showVideoControls, setShowVideoControls] = useState(false);
  const [isPortraitVideoPlaying, setIsPortraitVideoPlaying] = useState(false);
  const [showPortraitVideoControls, setShowPortraitVideoControls] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const portraitVideoRef = useRef<HTMLVideoElement>(null);
  const elevenlabsWrapperRef = useRef<HTMLDivElement>(null);

  // Function to center ElevenLabs widget
  const centerElevenLabsWidget = () => {
    // First, try to find widget in our wrapper
    if (elevenlabsWrapperRef.current) {
      const widget = elevenlabsWrapperRef.current.querySelector('elevenlabs-convai');
      if (widget) {
        const widgetEl = widget as HTMLElement;
        // Override any inline styles that might position it
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
        
        // Also check for any child elements with fixed positioning
        const fixedElements = widget.querySelectorAll('*');
        fixedElements.forEach((el) => {
          const htmlEl = el as HTMLElement;
          const computedStyle = window.getComputedStyle(htmlEl);
          if (computedStyle.position === 'fixed' || computedStyle.position === 'absolute' || 
              htmlEl.style.position === 'fixed' || htmlEl.style.position === 'absolute') {
            htmlEl.style.setProperty('position', 'relative', 'important');
            htmlEl.style.setProperty('left', 'auto', 'important');
            htmlEl.style.setProperty('right', 'auto', 'important');
            htmlEl.style.setProperty('top', 'auto', 'important');
            htmlEl.style.setProperty('bottom', 'auto', 'important');
            htmlEl.style.setProperty('margin', '0 auto', 'important');
          }
        });
      }
    }

    // Also search document for any ElevenLabs elements that might be outside our wrapper
    const allElevenLabsWidgets = document.querySelectorAll('elevenlabs-convai');
    allElevenLabsWidgets.forEach((widget) => {
      const widgetEl = widget as HTMLElement;
      // Only reposition if it's not already in our wrapper or if it's floating
      const computedStyle = window.getComputedStyle(widgetEl);
      if (computedStyle.position === 'fixed' || computedStyle.position === 'absolute') {
        // Move it to our wrapper if possible
        if (elevenlabsWrapperRef.current && !elevenlabsWrapperRef.current.contains(widgetEl)) {
          elevenlabsWrapperRef.current.appendChild(widgetEl);
        }
        widgetEl.style.setProperty('position', 'relative', 'important');
        widgetEl.style.setProperty('left', 'auto', 'important');
        widgetEl.style.setProperty('right', 'auto', 'important');
        widgetEl.style.setProperty('top', 'auto', 'important');
        widgetEl.style.setProperty('bottom', 'auto', 'important');
        widgetEl.style.setProperty('margin', '0 auto', 'important');
      }
    });
  };

  useEffect(() => {
    document.title = 'Professional Freelancer Audit: Your Learning Path to Scalable Predictable Income';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Get your free Professional Freelancer Audit and unlock your STAR Method Roadmap. Identify your #1 scaling bottleneck and receive a customized Learning Path Report.');
    }

    // Load ElevenLabs voice agent script
    const scriptUrl = 'https://unpkg.com/@elevenlabs/convai-widget-embed';
    const existingScript = document.querySelector(`script[src="${scriptUrl}"]`);
    
    if (!existingScript) {
      const script = document.createElement('script');
      script.src = scriptUrl;
      script.type = 'text/javascript';
      script.async = true;
      document.body.appendChild(script);
    }

    // Set up MutationObserver to catch dynamically added elements
    let observer: MutationObserver | null = null;
    if (elevenlabsWrapperRef.current) {
      observer = new MutationObserver(() => {
        // Use the function defined outside
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

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, []);

  // Ensure videos start paused
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.pause();
      setIsVideoPlaying(false);
    }
    if (portraitVideoRef.current) {
      portraitVideoRef.current.pause();
      setIsPortraitVideoPlaying(false);
    }
  }, []);

  const handleVideoPlayClick = async (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    if (videoRef.current) {
      try {
        const video = videoRef.current;
        
        if (video.readyState < 2) {
          video.load();
          await new Promise((resolve) => {
            video.addEventListener('loadeddata', resolve, { once: true });
            setTimeout(resolve, 2000);
          });
        }
        
        const playPromise = video.play();
        
        if (playPromise !== undefined) {
          await playPromise;
          setIsVideoPlaying(true);
          setShowVideoControls(true);
        } else {
          setIsVideoPlaying(true);
          setShowVideoControls(true);
        }
      } catch (error: any) {
        console.error('Video play failed:', error);
        setShowVideoControls(true);
        
        if (videoRef.current) {
          videoRef.current.controls = true;
          setTimeout(() => {
            if (videoRef.current && videoRef.current.paused) {
              videoRef.current.play().catch(() => {
                console.error('Video play failed on retry');
              });
            }
          }, 100);
        }
      }
    }
  };

  const handleVideoPause = () => {
    setIsVideoPlaying(false);
  };

  const handleVideoPlay = () => {
    setIsVideoPlaying(true);
    setShowVideoControls(true);
  };

  const handlePortraitVideoPlayClick = async (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    if (portraitVideoRef.current) {
      try {
        const video = portraitVideoRef.current;
        
        if (video.readyState < 2) {
          video.load();
          await new Promise((resolve) => {
            video.addEventListener('loadeddata', resolve, { once: true });
            setTimeout(resolve, 2000);
          });
        }
        
        const playPromise = video.play();
        
        if (playPromise !== undefined) {
          await playPromise;
          setIsPortraitVideoPlaying(true);
          setShowPortraitVideoControls(true);
        } else {
          setIsPortraitVideoPlaying(true);
          setShowPortraitVideoControls(true);
        }
      } catch (error: any) {
        console.error('Portrait video play failed:', error);
        setShowPortraitVideoControls(true);
        
        if (portraitVideoRef.current) {
          portraitVideoRef.current.controls = true;
          setTimeout(() => {
            if (portraitVideoRef.current && portraitVideoRef.current.paused) {
              portraitVideoRef.current.play().catch(() => {
                console.error('Portrait video play failed on retry');
              });
            }
          }, 100);
        }
      }
    }
  };

  const handlePortraitVideoPause = () => {
    setIsPortraitVideoPlaying(false);
  };

  const handlePortraitVideoPlay = () => {
    setIsPortraitVideoPlaying(true);
    setShowPortraitVideoControls(true);
  };

  const handleShowForm = () => {
    setShowForm(true);
    // Scroll to form
    setTimeout(() => {
      const formSection = document.querySelector('.pf-form-section');
      if (formSection) {
        formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      // Center the ElevenLabs widget after form becomes visible
      centerElevenLabsWidget();
    }, 100);
  };

  // Center widget when form becomes visible
  useEffect(() => {
    if (showForm) {
      // Try multiple times as the widget may load asynchronously
      const timers = [
        setTimeout(() => centerElevenLabsWidget(), 500),
        setTimeout(() => centerElevenLabsWidget(), 1500),
        setTimeout(() => centerElevenLabsWidget(), 3000)
      ];

      return () => {
        timers.forEach(timer => clearTimeout(timer));
      };
    }
  }, [showForm]);

  return (
    <div className="pf-audit-page">
      <div className="pf-circuit-pattern"></div>
      
      {/* Hero Section with Audit Cover */}
      <section className="pf-hero-section">
        <div className="pf-container">
          <div className="pf-hero-content">
            <div className="pf-audit-cover-container">
              <img 
                src="/Professional Freelancer Audit.png" 
                alt="Professional Freelancer Audit: Learning Path to Scalable Predictable Income" 
                className="pf-audit-cover"
                loading="eager"
              />
            </div>
            
            <h1 className="pf-main-headline">
              The Professional Freelancer Audit: Unlock Your Scalable Predictable Income
            </h1>
            
            <h2 className="pf-subheading">
              Get the STAR Method Roadmap that identifies your #1 Scaling Bottleneck
            </h2>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="pf-video-section">
        <div className="pf-container">
          <h2 className="pf-video-header">
            WATCH NOW: Your Personal System Diagnosis and STAR Method Roadmap
          </h2>
          
          <div className="pf-video-player-container">
            <div className="pf-video-wrapper">
              <video
                ref={videoRef}
                src="https://storage.googleapis.com/msgsndr/QLyYYRoOhCg65lKW9HDX/media/69377954b480b33853addfd2.mov"
                poster="/pf thumbnail.jpeg"
                className="pf-authority-video"
                controls={isVideoPlaying || showVideoControls}
                controlsList="nodownload"
                onPause={handleVideoPause}
                onPlay={handleVideoPlay}
                onLoadedData={() => {
                  if (videoRef.current && !isVideoPlaying) {
                    videoRef.current.pause();
                  }
                }}
                onClick={(e) => {
                  if (isVideoPlaying || showVideoControls) {
                    e.stopPropagation();
                  }
                }}
                playsInline
                preload="auto"
              >
                Your browser does not support the video tag.
              </video>
              <div 
                className={`pf-video-overlay ${isVideoPlaying ? 'pf-video-overlay-hidden' : ''}`}
                onClick={(e) => {
                  if (!isVideoPlaying) {
                    e.preventDefault();
                    e.stopPropagation();
                    handleVideoPlayClick(e);
                  }
                }}
                onTouchStart={(e) => {
                  if (!isVideoPlaying) {
                    e.preventDefault();
                    e.stopPropagation();
                    handleVideoPlayClick();
                  }
                }}
              >
                <div className="pf-video-overlay-content">
                  <div className="pf-play-button">▶</div>
                  <p className="pf-video-overlay-text">Play Video</p>
                </div>
              </div>
            </div>
          </div>

          {/* Value Bullet Points */}
          <div className="pf-video-value-bullets">
            <div className="pf-bullet-item">
              <span className="pf-bullet-icon">✓</span>
              <p className="pf-bullet-text">
                <strong>Identifies the Core Scaling Bottleneck:</strong> Reveals why Fulfillment Consumption is preventing scaling.
              </p>
            </div>
            <div className="pf-bullet-item">
              <span className="pf-bullet-icon">✓</span>
              <p className="pf-bullet-text">
                <strong>Prescribes the STAR Method Fix:</strong> Explains the required focus on Showcase (S), Tools (T), Acquisition (A), and Retention (R) for scaling.
              </p>
            </div>
            <div className="pf-bullet-item">
              <span className="pf-bullet-icon">✓</span>
              <p className="pf-bullet-text">
                <strong>Confirms Tool Stack Necessity:</strong> Highlights the need for Enhanced Efficiency and Workflow Fit using tools like GoHighLevel.
              </p>
            </div>
          </div>

          {/* Primary CTA Button */}
          <div className="pf-video-cta-container">
            <button 
              className="pf-video-cta-button"
              onClick={handleShowForm}
            >
              <span className="pf-cta-icon">🤖</span>
              <span className="pf-cta-text">Talk to Our AI Agent & Get Your Personalized Audit Report</span>
            </button>
          </div>
        </div>
      </section>

      {/* Pain Point Validation Section */}
      <section className="pf-pain-points-section">
        <div className="pf-container">
          <h2 className="pf-section-title">
            Why You Need a Professional Audit Right Now
          </h2>
          
          <div className="pf-pain-points-content">
            <div className="pf-pain-point-item">
              <span className="pf-pain-icon">⚠️</span>
              <div className="pf-pain-content">
                <h3 className="pf-pain-title">Target the AI Reckoning</h3>
                <p className="pf-pain-text">
                  The market is shifting: <strong>21% overall decrease in demand</strong> for automation-prone jobs 
                  (like software development). Without a structured system, you're competing in a shrinking pool 
                  with outdated methods.
                </p>
              </div>
            </div>
            
            <div className="pf-pain-point-item">
              <span className="pf-pain-icon">💸</span>
              <div className="pf-pain-content">
                <h3 className="pf-pain-title">Target the Platform Trap</h3>
                <p className="pf-pain-text">
                  The cost of failure is real: <strong>70% of Fiverr freelancers make less than $100 a month</strong> 
                  due to huge fees (approximately 20%). You're working harder, not smarter, while platforms 
                  take a massive cut of your earnings.
                </p>
              </div>
            </div>
            
            <div className="pf-pain-point-item">
              <span className="pf-pain-icon">🔧</span>
              <div className="pf-pain-content">
                <h3 className="pf-pain-title">The System Gap</h3>
                <p className="pf-pain-text">
                  Traditional freelancing methods lack the <strong>Professional Organization</strong> and 
                  <strong> Enhanced Efficiency</strong> needed to compete. Without a structured approach, 
                  you're operating like a hobby, not a professional business.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portrait Video Section */}
      <section className="pf-portrait-video-section">
        <div className="pf-container">
          <div className="pf-portrait-video-player-container">
            <div className="pf-portrait-video-wrapper">
              <video
                ref={portraitVideoRef}
                src="https://storage.googleapis.com/msgsndr/QLyYYRoOhCg65lKW9HDX/media/692d0b8d96dd5b6e8620b030.mov"
                poster="https://storage.googleapis.com/msgsndr/QLyYYRoOhCg65lKW9HDX/media/693780cc4b202f0e28db5dbf.jpeg"
                className="pf-portrait-video"
                controls={isPortraitVideoPlaying || showPortraitVideoControls}
                controlsList="nodownload"
                onPause={handlePortraitVideoPause}
                onPlay={handlePortraitVideoPlay}
                onLoadedData={() => {
                  if (portraitVideoRef.current && !isPortraitVideoPlaying) {
                    portraitVideoRef.current.pause();
                  }
                }}
                onClick={(e) => {
                  if (isPortraitVideoPlaying || showPortraitVideoControls) {
                    e.stopPropagation();
                  }
                }}
                playsInline
                preload="auto"
              >
                Your browser does not support the video tag.
              </video>
              <div 
                className={`pf-portrait-video-overlay ${isPortraitVideoPlaying ? 'pf-portrait-video-overlay-hidden' : ''}`}
                onClick={(e) => {
                  if (!isPortraitVideoPlaying) {
                    e.preventDefault();
                    e.stopPropagation();
                    handlePortraitVideoPlayClick(e);
                  }
                }}
                onTouchStart={(e) => {
                  if (!isPortraitVideoPlaying) {
                    e.preventDefault();
                    e.stopPropagation();
                    handlePortraitVideoPlayClick();
                  }
                }}
              >
                <div className="pf-portrait-video-overlay-content">
                  <div className="pf-portrait-play-button">▶</div>
                  <p className="pf-portrait-video-overlay-text">Play Video</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Audit Value Proposition Section */}
      <section className="pf-value-proposition-section">
        <div className="pf-container">
          <h2 className="pf-section-title">
            What You Get in Your Customized Learning Path Report
          </h2>
          
          <div className="pf-value-items">
            <div className="pf-value-item">
              <div className="pf-value-number">1</div>
              <div className="pf-value-content">
                <h3 className="pf-value-title">Diagnosis</h3>
                <p className="pf-value-text">
                  Pinpoint your <strong>Core Scaling Bottleneck</strong> (e.g., Fulfillment Consumption). 
                  Understand exactly what's preventing you from scaling beyond your current income level.
                </p>
              </div>
            </div>
            
            <div className="pf-value-item">
              <div className="pf-value-number">2</div>
              <div className="pf-value-content">
                <h3 className="pf-value-title">Proprietary Roadmap</h3>
                <p className="pf-value-text">
                  Receive a custom <strong>STAR Phase breakdown</strong> detailing specific steps for 
                  <strong> Tools (T)</strong>, <strong>Acquisition (A)</strong>, and <strong>Retention (R)</strong>. 
                  This isn't generic advice—it's your personalized blueprint.
                </p>
              </div>
            </div>
            
            <div className="pf-value-item">
              <div className="pf-value-number">3</div>
              <div className="pf-value-content">
                <h3 className="pf-value-title">Authority Validation</h3>
                <p className="pf-value-text">
                  Validate your current strengths (e.g., successful avoidance of the "Platform Trap"). 
                  Know what you're doing right and where to focus your improvement efforts.
                </p>
              </div>
            </div>
            
            <div className="pf-value-item">
              <div className="pf-value-number">4</div>
              <div className="pf-value-content">
                <h3 className="pf-value-title">Implementation Goal</h3>
                <p className="pf-value-text">
                  A clear roadmap on how to build a <strong>reliable, scalable, and efficient AI-driven tool stack</strong>. 
                  Transform from chaotic freelancing to structured, predictable income generation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Professional Freelancer Audit AI Agent Section - Center of Page */}
      <section className={`pf-form-section ${showForm ? 'pf-form-section-visible' : ''}`}>
        <div className="pf-container">
          <div className="pf-ai-agent-container">
            <div className="pf-ai-agent-header">
              <div className="pf-ai-agent-icon">
                <span className="pf-ai-pulse"></span>
                <span className="pf-ai-icon-text">🤖</span>
              </div>
              <div className="pf-ai-agent-title-section">
                <h2 className="pf-ai-agent-title">Professional Freelancer Audit AI Agent</h2>
                <p className="pf-ai-agent-subtitle">Your personalized AI assistant is ready to help you discover your scaling bottleneck</p>
              </div>
            </div>
            <div className="pf-ai-agent-content">
              <div className="pf-elevenlabs-wrapper" ref={elevenlabsWrapperRef}>
                <div className="pf-elevenlabs-instructions">
                  <p className="pf-instructions-text">Click the microphone to start your conversation</p>
                </div>
                {React.createElement('elevenlabs-convai', {
                  'agent-id': 'agent_4201kbwz7dzyerd8yp1yetva6tvf'
                })}
              </div>
            </div>
            <div className="pf-ai-agent-footer">
              <p className="pf-ai-agent-footer-text">
                <strong>Powered by AI Systems Architecture</strong> • Get instant insights into your freelance business
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Authority Footer */}
      <footer className="pf-authority-footer">
        <div className="pf-container">
          <p className="pf-footer-text">
            This audit is provided by a <strong>Systems Architect</strong> who delivers structured processes, 
            not generic advice. You're accessing a valuable, proprietary business consultation that provides 
            the <strong>"Blueprint To Freelance Freedom"</strong>.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ProfessionalFreelancerAuditPage;

