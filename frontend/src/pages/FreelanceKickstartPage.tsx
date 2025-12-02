import React, { useEffect, useState, useRef } from 'react';
import '../styles/Freelance Kickstart/FreelanceKickstartPage.css';
import PaymentModal from '../components/Freelance Kickstart/PaymentModal';

interface FreelanceKickstartPageProps {
  navigateToHome?: () => void;
}

const FreelanceKickstartPage: React.FC<FreelanceKickstartPageProps> = ({ navigateToHome }) => {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [showVideoControls, setShowVideoControls] = useState(false);
  const [videoError, setVideoError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(null);
  const lastToggleTimeRef = useRef<number>(0);

  // Ensure video starts paused
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.pause();
      setIsVideoPlaying(false);
    }
  }, []);

  const openPaymentModal = () => setIsPaymentModalOpen(true);
  const closePaymentModal = () => setIsPaymentModalOpen(false);

  const handleVideoPlayClick = async (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    if (videoRef.current) {
      try {
        const video = videoRef.current;
        
        // Ensure video is ready to play
        if (video.readyState < 2) {
          video.load();
          await new Promise((resolve) => {
            video.addEventListener('loadeddata', resolve, { once: true });
            setTimeout(resolve, 2000); // Timeout after 2 seconds
          });
        }
        
        // Try to play the video
        const playPromise = video.play();
        
        if (playPromise !== undefined) {
          await playPromise;
          setIsVideoPlaying(true);
          setShowVideoControls(true);
          setVideoError(null);
        } else {
          // If play() returns undefined, video should be playing
          setIsVideoPlaying(true);
          setShowVideoControls(true);
          setVideoError(null);
        }
      } catch (error: any) {
        // If autoplay fails, show controls so user can manually play
        console.error('Video play failed:', error);
        setShowVideoControls(true);
        
        // Try to enable controls and let user click native play button
        if (videoRef.current) {
          videoRef.current.controls = true;
          // Try one more time after a short delay
          setTimeout(() => {
            if (videoRef.current && videoRef.current.paused) {
              videoRef.current.play().catch(() => {
                setVideoError('Please click the play button on the video player to start playback');
              });
            }
          }, 100);
        } else {
          setVideoError('Please click the play button on the video player to start playback');
        }
      }
    }
  };

  const handleVideoPause = () => {
    setIsVideoPlaying(false);
  };

  const handleVideoPlay = () => {
    // Only update state if video is actually playing (not just triggered)
    if (videoRef.current && !videoRef.current.paused) {
      setIsVideoPlaying(true);
      setShowVideoControls(true);
      setVideoError(null);
    }
  };

  const handleVideoTap = (e: React.MouseEvent<HTMLVideoElement> | React.TouchEvent<HTMLVideoElement>, shouldPreventDefault: boolean = false) => {
    // Only handle tap-to-pause when video is playing
    if (!isVideoPlaying && !showVideoControls) {
      return false; // Let overlay handle play
    }

    if (!videoRef.current) return false;

    // Get click/touch coordinates
    let clientX = 0;
    let clientY = 0;
    
    if ('touches' in e && e.touches.length > 0) {
      // Touch event - use first touch point
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else if ('changedTouches' in e && e.changedTouches.length > 0) {
      // TouchEnd event - use changed touches
      clientX = e.changedTouches[0].clientX;
      clientY = e.changedTouches[0].clientY;
    } else if ('clientX' in e) {
      // Mouse event
      clientX = e.clientX;
      clientY = e.clientY;
    }

    // Get video element position and dimensions
    const video = videoRef.current;
    const rect = video.getBoundingClientRect();
    const videoHeight = rect.height;
    const videoWidth = rect.width;
    
    // Calculate relative position within video
    const relativeX = clientX - rect.left;
    const relativeY = clientY - rect.top;
    
    // Check if tap is within video bounds
    if (relativeX < 0 || relativeX > videoWidth || relativeY < 0 || relativeY > videoHeight) {
      return false; // Tap outside video
    }
    
    // Controls are typically in the bottom 25% of the video
    // If tap is in the bottom 25%, let native controls handle it
    const controlAreaHeight = videoHeight * 0.25;
    const isInControlArea = relativeY > (videoHeight - controlAreaHeight);
    
    // If tap is in control area, don't toggle (let native controls work)
    if (isInControlArea) {
      return false;
    }

    // Prevent default and stop propagation to avoid double-handling
    if (shouldPreventDefault) {
      e.preventDefault();
      e.stopPropagation();
    }

    // Prevent rapid toggling (debounce)
    const now = Date.now();
    if (now - lastToggleTimeRef.current < 300) {
      return false; // Too soon after last toggle, ignore
    }
    lastToggleTimeRef.current = now;

    // Toggle play/pause on video tap (outside control area)
    const wasPaused = video.paused;
    
    if (wasPaused) {
      // Video is paused, play it
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          console.error('Video play failed on tap');
        });
      }
    } else {
      // Video is playing, pause it
      video.pause();
    }
    
    return true; // Indicate we handled the tap
  };

  const handleVideoError = () => {
    setVideoError('There was an error loading the video. Please try refreshing the page.');
    setShowVideoControls(true);
    if (videoRef.current) {
      videoRef.current.controls = true;
    }
  };

  useEffect(() => {
    document.title = '10 Day AI Freelance Kickstart – Premium Implementation Training';

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        'content',
        'The 10 Day AI Freelance Kickstart gives you hands-on implementation of the STAR Method so you can attract $5K–$10K+ AI clients without relying on Upwork or Fiverr. Full program: $497.'
      );
    }

    const updateMetaTag = (property: string, content: string) => {
      let meta = document.querySelector(`meta[property="${property}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('property', property);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    const currentUrl = window.location.href;

    updateMetaTag('og:type', 'website');
    updateMetaTag('og:url', currentUrl);
    updateMetaTag('og:title', '10 Day AI Freelance Kickstart – Implement the STAR Method');
    updateMetaTag(
      'og:description',
      'Hands-on 10 day implementation program to install the STAR Method, build AI-powered demos, and set up your AI tool stack and CRM so you can close high-paying freelance clients.'
    );
    updateMetaTag('og:image', 'https://www.xrwebsites.io/XRBlockDev%20Logo.png');
    updateMetaTag('og:site_name', 'XRBlockDev Services');

    const updateTwitterTag = (name: string, content: string) => {
      let meta = document.querySelector(`meta[name="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', name);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    updateTwitterTag('twitter:card', 'summary_large_image');
    updateTwitterTag('twitter:url', currentUrl);
    updateTwitterTag('twitter:title', '10 Day AI Freelance Kickstart – Implement the STAR Method');
    updateTwitterTag(
      'twitter:description',
      'Hands-on 10 day implementation program to install the STAR Method, build AI-powered demos, and set up your AI tool stack and CRM so you can close high-paying freelance clients.'
    );
    updateTwitterTag('twitter:image', 'https://www.xrwebsites.io/XRBlockDev%20Logo.png');

    return () => {
      document.title = 'Client Developer Platform';
      if (metaDescription) {
        metaDescription.setAttribute('content', 'Developer Platform - Connect developers with opportunities');
      }
    };
  }, []);

  return (
    <div className="freelance-kickstart-page">
      <div className="circuit-pattern"></div>

      {/* Section 1: Hero & Immediate Value Proposition */}
      <section className="kickstart-hero">
        <div className="hero-inner">
          <div className="hero-product-visual">
            <img
              src="/KICKSTART_10DAY_PRODUCT.jpeg"
              alt="10 Day AI Freelance Kickstart Product Display"
              className="hero-product-image"
            />
          </div>

          <div className="hero-copy">
            <h1 className="hero-title">
              The 10 Day AI Freelance Kickstart:
              <span className="hero-title-accent"> Get the Hands-On HOW to Implement the STAR Method</span>
            </h1>
            <p className="hero-subtitle">
              Stop just knowing the system. Start implementing the AI tools and workflows that make you as capable as a
              full agency.
            </p>

            <div className="hero-pricing-block">
              <div className="hero-price-label">Enrollment Investment</div>
              <div className="hero-price-amount">
                <span className="hero-price-currency">$</span>
                <span className="hero-price-number">497</span>
              </div>
              <p className="hero-price-subcopy">Single Payment • Full Access to All 10 Days & Assets</p>

              <button className="hero-enroll-button" onClick={openPaymentModal}>
                <span className="hero-enroll-icon">🔥</span>
                <span className="hero-enroll-text">Enroll Now: Stop Paying Fees, Start Earning Predictably</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Video Deep Dive */}
      <section className="kickstart-video-section">
        <div className="section-container">
          <h2 className="video-section-title">
            WATCH NOW: The STAR Method Blueprint – Your Accelerated Path to Predictable Income.
          </h2>
          
          <div className="video-player-container">
            <div className="video-wrapper">
              <video
                ref={videoRef}
                src="https://storage.googleapis.com/msgsndr/QLyYYRoOhCg65lKW9HDX/media/692cc54b96dd5b625314f1b9.mp4"
                poster="/10Day Kickstart Video Thumbnail.jpeg"
                className="kickstart-video"
                controls={isVideoPlaying || showVideoControls}
                controlsList="nodownload"
                onPause={handleVideoPause}
                onPlay={handleVideoPlay}
                onError={handleVideoError}
                onLoadedData={() => {
                  // Ensure video is paused when loaded
                  if (videoRef.current && !isVideoPlaying) {
                    videoRef.current.pause();
                  }
                }}
                onClick={(e) => {
                  // Handle tap-to-pause on desktop
                  if (isVideoPlaying || showVideoControls) {
                    // Check if click was directly on video element (not a child control element)
                    const target = e.target as HTMLElement;
                    if (target === videoRef.current || target.tagName === 'VIDEO') {
                      const handled = handleVideoTap(e, true);
                      if (handled) {
                        // We handled it, prevent native controls from also handling
                        e.stopPropagation();
                        e.preventDefault();
                      }
                    }
                    // If click was on controls or other elements, let native controls work
                  } else {
                    // Video not playing, let overlay handle it
                    e.stopPropagation();
                  }
                }}
                onTouchStart={(e) => {
                  // Track touch start for tap detection
                  if (isVideoPlaying || showVideoControls) {
                    const touch = e.touches[0];
                    touchStartRef.current = {
                      x: touch.clientX,
                      y: touch.clientY,
                      time: Date.now()
                    };
                  }
                }}
                onTouchEnd={(e) => {
                  // Handle tap-to-pause on mobile
                  if ((isVideoPlaying || showVideoControls) && touchStartRef.current) {
                    const touch = e.changedTouches[0];
                    const touchEnd = {
                      x: touch.clientX,
                      y: touch.clientY,
                      time: Date.now()
                    };
                    
                    // Check if this was a tap (not a swipe or long press)
                    const deltaX = Math.abs(touchEnd.x - touchStartRef.current.x);
                    const deltaY = Math.abs(touchEnd.y - touchStartRef.current.y);
                    const deltaTime = touchEnd.time - touchStartRef.current.time;
                    
                    // If it's a quick tap (not a swipe), handle it
                    if (deltaTime < 300 && deltaX < 10 && deltaY < 10) {
                      // Create a synthetic event for handleVideoTap
                      const syntheticEvent = {
                        ...e,
                        clientX: touchEnd.x,
                        clientY: touchEnd.y,
                        changedTouches: e.changedTouches
                      } as React.TouchEvent<HTMLVideoElement>;
                      
                      handleVideoTap(syntheticEvent);
                    }
                    
                    touchStartRef.current = null;
                  }
                }}
                playsInline
                preload="auto"
              >
                Your browser does not support the video tag.
              </video>
              <div 
                className={`video-overlay ${isVideoPlaying ? 'video-overlay-hidden' : ''}`}
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
                <div className="video-overlay-content">
                  <div className="play-button">▶</div>
                  <p className="video-overlay-text">Play Video</p>
                </div>
              </div>
              {videoError && (
                <div className="video-error-message">
                  <p>{videoError}</p>
                </div>
              )}
            </div>
          </div>

          {/* STAR Method Phases */}
          <div className="star-method-breakdown">
            <h3 className="star-breakdown-title">The Four Phases of the STAR Method</h3>
            <div className="star-phases-grid">
              <div className="star-phase-card">
                <div className="phase-letter-badge">S</div>
                <h4 className="phase-card-title">Showcase</h4>
                <p className="phase-card-description">Build visibility and credibility</p>
              </div>
              <div className="star-phase-card">
                <div className="phase-letter-badge">T</div>
                <h4 className="phase-card-title">Tools</h4>
                <p className="phase-card-description">Select and integrate AI systems for Enhanced Efficiency</p>
              </div>
              <div className="star-phase-card">
                <div className="phase-letter-badge">A</div>
                <h4 className="phase-card-title">Acquisition</h4>
                <p className="phase-card-description">Achieve Frictionless Client Closing</p>
              </div>
              <div className="star-phase-card">
                <div className="phase-letter-badge">R</div>
                <h4 className="phase-card-title">Retention</h4>
                <p className="phase-card-description">Secure Predictable Monthly Income</p>
              </div>
            </div>
          </div>

          {/* Proprietary Tools Showcase */}
          <div className="tools-showcase">
            <h3 className="tools-showcase-title">Proprietary Tool Stack</h3>
            <p className="tools-showcase-subtitle">
              The curated tools that achieve Workflow Fit and accelerate development
            </p>
            <div className="tools-logo-grid">
              <div className="tool-logo-item">
                <div className="tool-logo-name">GoHighLevel</div>
                <div className="tool-logo-category">CRM/Automation</div>
              </div>
              <div className="tool-logo-item">
                <div className="tool-logo-name">ChatGPT</div>
                <div className="tool-logo-category">AI Reasoning/Communication</div>
              </div>
              <div className="tool-logo-item">
                <div className="tool-logo-name">Cursor</div>
                <div className="tool-logo-category">Development IDE</div>
              </div>
              <div className="tool-logo-item">
                <div className="tool-logo-name">Vercel</div>
                <div className="tool-logo-category">Deployment Platform</div>
              </div>
            </div>
            <p className="tools-outcome">
              <strong>Result:</strong> Building a reliable, scalable, and efficient AI-driven tool stack
            </p>
          </div>

          {/* Video CTA */}
          <div className="video-cta-container">
            <button className="video-cta-button" onClick={openPaymentModal}>
              <span className="video-cta-icon">🚀</span>
              <span className="video-cta-text">ENROLL NOW: Get the Full 10 Day AI Freelance Kickstart System</span>
            </button>
            <p className="video-cta-price">Final Price: $497</p>
          </div>
        </div>
      </section>

      {/* Section 3: The Crisis */}
      <section className="kickstart-crisis">
        <div className="section-container">
          <h2 className="section-headline-gold">The AI Reckoning is Here. It's Not Time to Play Anymore.</h2>
          <div className="crisis-stats-row">
            <div className="crisis-stat-card">
              <div className="crisis-stat-value">21%</div>
              <div className="crisis-stat-label">
                Overall decrease in demand for automation-prone freelance jobs
              </div>
            </div>
            <div className="crisis-stat-card">
              <div className="crisis-stat-value">20%</div>
              <div className="crisis-stat-label">Drop in Software Development demand</div>
            </div>
          </div>
          <p className="crisis-message">
            This program teaches the high-value AI skills needed for high-budget roles that are not being replaced.
          </p>
        </div>
      </section>

      {/* Section 4: Curriculum Breakdown */}
      <section className="kickstart-curriculum">
        <div className="section-container">
          <h2 className="section-headline-gold">What You Do Over the 10 Days</h2>
          <p className="section-intro">
            Each day stacks a new piece of the STAR Method into your real workflow so you leave with systems installed,
            not just notes.
          </p>

          <div className="curriculum-timeline">
            <div className="timeline-line"></div>

            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <h3 className="timeline-title">Showcase Implementation</h3>
                <p className="timeline-description">
                  Build AI-powered demo projects (landing pages, automations, mini systems) that prove you can deliver
                  outcomes. Learn how to track Direct Messages (DMs) as your strongest lead indicator instead of chasing
                  vanity metrics.
                </p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <h3 className="timeline-title">Tool Stack Integration</h3>
                <p className="timeline-description">
                  Install your AI Tool Stack using Workflow Fit criteria. Set up GoHighLevel (CRM) to organize leads,
                  manage long sales cycles, and keep every opportunity visible so you stop leaking revenue.
                </p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <h3 className="timeline-title">Acquisition Mastery</h3>
                <p className="timeline-description">
                  Practice handling inbound leads with AI-assisted discovery prompts, needs assessments, and polished
                  proposals. Turn warm DMs into booked calls and clear project scopes without sounding salesy.
                </p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <h3 className="timeline-title">Retention & Automation</h3>
                <p className="timeline-description">
                  Set up CRM pipelines, automations, and follow-up sequences that drive upsells, renewals, and referrals
                  so your income becomes predictable instead of project-to-project.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Tool Stack */}
      <section className="kickstart-tool-stack">
        <div className="section-container">
          <h2 className="section-headline-gold">Master Your AI Tool Stack: Deliver Work Like a Full Agency</h2>
          <p className="section-intro">
            You are not just learning concepts — you&rsquo;re installing a tool stack that lets you ship work at a
            professional level, even if you&rsquo;re a solo freelancer.
          </p>

          <div className="tool-stack-grid">
            <div className="tool-stack-column">
              <h3 className="tool-category-title">Productivity</h3>
              <ul className="tool-list">
                <li className="tool-pill">ChatGPT</li>
                <li className="tool-pill">NotebookLM</li>
                <li className="tool-pill">GoHighLevel (CRM)</li>
              </ul>
            </div>
            <div className="tool-stack-column">
              <h3 className="tool-category-title">Development</h3>
              <ul className="tool-list">
                <li className="tool-pill">Cursor (IDE)</li>
                <li className="tool-pill">Vercel</li>
                <li className="tool-pill">Supabase</li>
              </ul>
            </div>
            <div className="tool-stack-column">
              <h3 className="tool-category-title">Content & Design</h3>
              <ul className="tool-list">
                <li className="tool-pill">Gemini</li>
                <li className="tool-pill">Canva</li>
              </ul>
            </div>
          </div>

          <p className="tool-benefits">
            These tools are chosen for Workflow Fit — they enhance your efficiency, fill skill gaps, and keep your
            client delivery organized so you can confidently work with high-ticket projects.
          </p>
        </div>
      </section>

      {/* Section 6: Value Stack & Bonuses */}
      <section className="kickstart-value-stack">
        <div className="section-container">
          <h2 className="section-headline-gold">
            Your Total Package Value: Enroll Today and Get Exclusive Bonuses
          </h2>

          <div className="value-grid">
            <div className="value-item">
              <img
                src="/EVANS_BOOK_BLUEPRINT.jpeg"
                alt="Blueprint To Freelance Freedom Book Cover"
                className="value-image"
              />
              <div className="value-copy">
                <h3 className="value-title">Bonus 1: The Blueprint</h3>
                <p className="value-description">
                  Free digital copy of <strong>Blueprint To Freelance Freedom</strong>, the master guide behind the
                  STAR Method so you can revisit the strategy any time.
                </p>
              </div>
            </div>

            <div className="value-item">
              <img
                src="/AI_SUPPORT_NETWORK_HUB.jpeg"
                alt="AI Freelance Support Network"
                className="value-image"
              />
              <div className="value-copy">
                <h3 className="value-title">Bonus 2: Private Network Access</h3>
                <p className="value-description">
                  12 Months access to the{' '}
                  <strong>Private AI Freelance Support Network (Normal Cost: $240)</strong> where you&rsquo;ll connect on
                  real world projects and get ongoing implementation support.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 7: Final Enrollment & Guarantee */}
      <section className="kickstart-final-cta">
        <div className="section-container final-cta-container">
          <div className="final-price-block">
            <div className="final-price-label">Enrollment Today</div>
            <div className="final-price-amount">
              <span className="final-price-currency">$</span>
              <span className="final-price-number">497</span>
            </div>
            <p className="final-price-subcopy">
              One-time payment. Full access to the 10 Day AI Freelance Kickstart, Blueprint, and Support Network.
            </p>
          </div>

          <button className="hero-enroll-button final-enroll-button" onClick={openPaymentModal}>
            <span className="hero-enroll-icon">✅</span>
            <span className="hero-enroll-text">
              Yes, I Want the STAR Method: Enroll in the Kickstart for $497
            </span>
          </button>

          <p className="guarantee-copy">
            This is a systems-focused implementation program. If you do the work, you&rsquo;ll leave with AI-powered
            demos, a working tool stack, and a client-ready process you can rely on as the market shifts.
          </p>
        </div>
      </section>

      <PaymentModal isOpen={isPaymentModalOpen} onClose={closePaymentModal} />
    </div>
  );
};

export default FreelanceKickstartPage;

