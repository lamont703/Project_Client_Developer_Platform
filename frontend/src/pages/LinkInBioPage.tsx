import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LinkInBio/LinkInBioPage.css';
import BookReader from '../components/Book Reader/BookReader';

interface LinkInBioPageProps {
  navigateToHome?: () => void;
}

const LinkInBioPage: React.FC<LinkInBioPageProps> = ({ navigateToHome }) => {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    document.title = 'Lamont T. Evans - AI Freelance Systems Architect';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Lamont T. Evans - AI Freelance Systems Architect. Learn the STAR Method to get $10K+ AI clients without Upwork or Fiverr.');
    }

    // Load chat widget script on page load to make icon visible
    const existingScript = document.querySelector<HTMLScriptElement>(
      'script[data-widget-id="668475f9178c3150954773ef"]'
    );

    if (!existingScript) {
      const script = document.createElement('script');
      script.src = 'https://beta.leadconnectorhq.com/loader.js';
      script.setAttribute('data-resources-url', 'https://beta.leadconnectorhq.com/chat-widget/loader.js');
      script.setAttribute('data-widget-id', '668475f9178c3150954773ef');
      script.async = true;
      
      // Add error handling for script loading
      script.onerror = () => {
        // Silently handle script loading errors - widget may not be available
        console.debug('Chat widget script failed to load (this is expected if widget is not configured)');
      };
      
      // Suppress errors from the loaded script
      script.onload = () => {
        // Script loaded successfully, but errors may still occur if widget isn't configured
        // These errors are handled by the global error handler in index.tsx
      };
      
      document.body.appendChild(script);
    }

    // Ensure video plays when ready and prevent user interaction
    if (videoRef.current) {
      const video = videoRef.current;
      
      // Detect TikTok browser
      const isTikTokBrowser = /TikTok|Musical/i.test(navigator.userAgent) || 
                              /aweme/i.test(navigator.userAgent) ||
                              (window as any).__tiktok !== undefined;
      
      // Set video properties for autoplay and looping
      video.muted = true;
      video.loop = true;
      video.playsInline = true;
      video.controls = false;
      
      // Prevent fullscreen in TikTok and other browsers
      video.setAttribute('webkit-playsinline', 'true');
      video.setAttribute('playsinline', 'true');
      video.setAttribute('x5-playsinline', 'true'); // For some Android browsers
      video.setAttribute('x5-video-player-type', 'h5');
      video.setAttribute('x5-video-player-fullscreen', 'false');
      video.setAttribute('x5-video-orientation', 'portraint');
      
      // Prevent user from pausing/playing the video
      const preventInteraction = (e: Event) => {
        e.preventDefault();
        e.stopPropagation();
        // If video was paused, resume it
        if (video.paused) {
          video.play().catch(() => {
            // Ignore play errors
          });
        }
      };
      
      // Auto-resume if paused
      const handlePause = () => {
        if (!video.ended) {
          video.play().catch(() => {
            // Ignore play errors
          });
        }
      };
      
      // Try to play video with retry logic
      const tryPlayVideo = async (retries = 3) => {
        for (let i = 0; i < retries; i++) {
          try {
            if (video.paused) {
              const playPromise = video.play();
              if (playPromise !== undefined) {
                await playPromise;
                return true; // Successfully playing
              }
            } else {
              return true; // Already playing
            }
          } catch (error) {
            if (i < retries - 1) {
              // Wait before retry
              await new Promise(resolve => setTimeout(resolve, 300 * (i + 1)));
            }
          }
        }
        return false;
      };
      
      // Try to play when video can play
      const handleCanPlay = async () => {
        await tryPlayVideo();
      };
      
      // TikTok-specific: Try to play on first user interaction
      const handleFirstInteraction = async () => {
        if (isTikTokBrowser && video.paused) {
          await tryPlayVideo();
          // Remove listeners after first interaction
          document.removeEventListener('touchstart', handleFirstInteraction);
          document.removeEventListener('click', handleFirstInteraction);
          window.removeEventListener('focus', handleFirstInteraction);
        }
      };
      
      // TikTok-specific: Try to play when page becomes visible
      const handleVisibilityChange = async () => {
        if (isTikTokBrowser && !document.hidden && video.paused) {
          await tryPlayVideo();
        }
      };
      
      // TikTok-specific: Try to play on scroll (this is when TikTok allows it)
      let scrollPlayAttempted = false;
      const handleScroll = async () => {
        if (isTikTokBrowser && !scrollPlayAttempted && video.paused) {
          scrollPlayAttempted = true;
          await tryPlayVideo();
          // Keep trying on subsequent scrolls if still paused
          if (video.paused) {
            scrollPlayAttempted = false;
          }
        }
      };
      
      // Handle video errors gracefully
      const handleVideoError = (e: Event) => {
        const videoElement = e.target as HTMLVideoElement;
        if (videoElement.error) {
          console.error('Video error:', videoElement.error.code, videoElement.error.message);
        }
      };
      
      // Prevent fullscreen
      const preventFullscreen = (e: Event) => {
        e.preventDefault();
        e.stopPropagation();
        // Exit fullscreen if somehow entered
        if (document.fullscreenElement === video || 
            (document as any).webkitFullscreenElement === video ||
            (document as any).mozFullScreenElement === video ||
            (document as any).msFullscreenElement === video) {
          if (document.exitFullscreen) {
            document.exitFullscreen();
          } else if ((document as any).webkitExitFullscreen) {
            (document as any).webkitExitFullscreen();
          } else if ((document as any).mozCancelFullScreen) {
            (document as any).mozCancelFullScreen();
          } else if ((document as any).msExitFullscreen) {
            (document as any).msExitFullscreen();
          }
        }
      };
      
      // Prevent click/tap interactions on video
      video.addEventListener('click', preventInteraction, true);
      video.addEventListener('touchstart', preventInteraction, true);
      video.addEventListener('touchend', preventInteraction, true);
      video.addEventListener('pause', handlePause);
      video.addEventListener('canplay', handleCanPlay, { once: true });
      video.addEventListener('loadeddata', handleCanPlay, { once: true });
      video.addEventListener('error', handleVideoError);
      video.addEventListener('webkitbeginfullscreen', preventFullscreen);
      video.addEventListener('webkitendfullscreen', preventFullscreen);
      document.addEventListener('fullscreenchange', preventFullscreen);
      document.addEventListener('webkitfullscreenchange', preventFullscreen);
      
      // TikTok-specific handlers
      if (isTikTokBrowser) {
        // Try to play on scroll (TikTok allows video play on scroll)
        window.addEventListener('scroll', handleScroll, { passive: true });
        document.addEventListener('scroll', handleScroll, { passive: true });
        
        // Try to play on first user interaction
        document.addEventListener('touchstart', handleFirstInteraction, { once: true, passive: true });
        document.addEventListener('click', handleFirstInteraction, { once: true, passive: true });
        window.addEventListener('focus', handleFirstInteraction, { once: true });
        
        // Try to play when page becomes visible
        document.addEventListener('visibilitychange', handleVisibilityChange);
        
        // Try to play after a short delay (TikTok sometimes needs time to initialize)
        setTimeout(() => {
          tryPlayVideo();
        }, 500);
        
        // Additional retry after longer delay
        setTimeout(() => {
          tryPlayVideo();
        }, 1500);
      }
      
      // If video is already ready, try to play
      if (video.readyState >= 3) {
        handleCanPlay();
      }
      
      return () => {
        video.removeEventListener('click', preventInteraction, true);
        video.removeEventListener('touchstart', preventInteraction, true);
        video.removeEventListener('touchend', preventInteraction, true);
        video.removeEventListener('pause', handlePause);
        video.removeEventListener('canplay', handleCanPlay);
        video.removeEventListener('loadeddata', handleCanPlay);
        video.removeEventListener('error', handleVideoError);
        video.removeEventListener('webkitbeginfullscreen', preventFullscreen);
        video.removeEventListener('webkitendfullscreen', preventFullscreen);
        document.removeEventListener('fullscreenchange', preventFullscreen);
        document.removeEventListener('webkitfullscreenchange', preventFullscreen);
        
        if (isTikTokBrowser) {
          window.removeEventListener('scroll', handleScroll);
          document.removeEventListener('scroll', handleScroll);
          document.removeEventListener('touchstart', handleFirstInteraction);
          document.removeEventListener('click', handleFirstInteraction);
          window.removeEventListener('focus', handleFirstInteraction);
          document.removeEventListener('visibilitychange', handleVisibilityChange);
        }
      };
    }
  }, []);

  const handleNavigation = (route: string) => {
    navigate(route);
  };

  const handleStarFrameworkClick = () => {
    handleNavigation('/star-method-framework');
  };

  const handlePFAuditClick = () => {
    handleNavigation('/professional-freelancer-audit');
  };

  const handleGHLTrialClick = () => {
    // Navigate to activate-ghl page
    handleNavigation('/activate-ghl');
  };


  return (
    <div className="link-in-bio-page">
      <div className="circuit-pattern"></div>
      <div className="link-in-bio-container">
        
        {/* Section 1: Authority & Crisis Header */}
        <div className="authority-header">
          <div className="profile-section">
            <img 
              src="/XRBlockDev Logo.png" 
              alt="Lamont T. Evans" 
              className="profile-image"
            />
            <h1 className="authority-title">Lamont T. Evans: AI Freelance Systems Architect</h1>
          </div>
          
          <div className="urgency-headline-block">
            <p className="urgency-headline">
              The AI Reckoning is Here. Stop Losing Income to Fees & Automation.
            </p>
            <p className="urgency-subheadline">
              (21% Decrease in Simple Jobs)
            </p>
          </div>
        </div>

        {/* Video Section - High-Authority Loop */}
        <div className="video-hero-section">
          <div className="video-container">
            <video
              ref={videoRef}
              className="kickstart-video"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              controls={false}
              disablePictureInPicture
              disableRemotePlayback
              webkit-playsinline="true"
              x5-playsinline="true"
              x5-video-player-type="h5"
              x5-video-player-fullscreen="false"
            >
              <source src="/10Day Kickstart Product Video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          
          {/* STAR Method & Authority Icons */}
          <div className="video-context-section">
            <div className="star-method-display">
              <div className="star-method-item">
                <span className="star-char">S</span>
                <span className="star-label">Showcase</span>
              </div>
              <div className="star-method-item">
                <span className="star-char">T</span>
                <span className="star-label">Tools</span>
              </div>
              <div className="star-method-item">
                <span className="star-char">A</span>
                <span className="star-label">Acquisition</span>
              </div>
              <div className="star-method-item">
                <span className="star-char">R</span>
                <span className="star-label">Retention</span>
              </div>
            </div>
            
            <div className="authority-icons">
              <div className="authority-icon-item">
                <span className="authority-icon-text">GoHighLevel</span>
              </div>
              <div className="authority-icon-item">
                <span className="authority-icon-text">ChatGPT</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tier 1: Highest Lead Capture - Top of Page */}
        <div className="tier-1-ctas-section">
          {/* STAR Method Framework Course Button */}
          <button 
            className="star-framework-button"
            onClick={handleStarFrameworkClick}
          >
            <div className="star-framework-button-content">
              <span className="star-framework-icon">🔓</span>
              <div className="star-framework-text-wrapper">
                <span className="star-framework-main-text">FREE Course: Escape the Platform Trap & Get the STAR Framework</span>
                <span className="star-framework-sub-text">AI Systems Roadmap to Predictable Income</span>
              </div>
            </div>
          </button>

          {/* Professional Freelancer Audit Button */}
          <button 
            className="pf-audit-button"
            onClick={handlePFAuditClick}
          >
            <div className="pf-audit-button-content">
              <span className="pf-audit-icon">📊</span>
              <div className="pf-audit-text-wrapper">
                <span className="pf-audit-main-text">Start Your Free Professional Freelancer Audit</span>
                <span className="pf-audit-sub-text">The STAR Method Roadmap</span>
              </div>
            </div>
          </button>

          {/* Free Workshop Button */}
          <button 
            className="workshop-button primary-cta-button"
            onClick={() => handleNavigation('/webinar-workshop')}
          >
            <div className="workshop-button-content">
              <span className="workshop-icon">🚨</span>
              <div className="workshop-text">
                <span className="workshop-label">LIVE:</span>
                <span className="workshop-title">The STAR Method Workshop</span>
                <span className="workshop-subtitle">Register for the Next Session</span>
              </div>
            </div>
            <div className="workshop-annotation">
              Learn the Blueprint to $10K+ AI Clients (Without Upwork or Fiverr)
            </div>
          </button>
        </div>

        {/* Tier 2: Hands-On Implementation & Immediate Value - Mid-Page */}
        <div className="tier-2-ctas-section">
          {/* GoHighLevel Trial Button */}
          <button 
            className="ghl-trial-button"
            onClick={handleGHLTrialClick}
          >
            <div className="ghl-trial-button-content">
              <span className="ghl-trial-icon">⚡</span>
              <div className="ghl-trial-text-wrapper">
                <span className="ghl-trial-main-text">14-Day Free Trial: Build Your Professional AI System</span>
                <span className="ghl-trial-sub-text">Powered by GoHighLevel</span>
              </div>
            </div>
          </button>

          {/* Book Order Link with Image */}
          <div className="cta-with-image-block">
            <button 
              className="book-download-button"
              onClick={() => handleNavigation('/blueprint-to-freelance-freedom')}
            >
              <div className="book-button-content">
                <span className="book-icon">📚</span>
                <div className="book-text-wrapper">
                  <span className="book-main-text">Order the Blueprint To Freelance Freedom Book</span>
                  <span className="book-bonus-badge">($29)</span>
                </div>
              </div>
            </button>
            <div className="book-image-container">
              <BookReader onOrderClick={() => handleNavigation('/blueprint-to-freelance-freedom')} />
            </div>
          </div>
        </div>

        {/* Tier 3: Primary Paid Offer - Bottom of Page */}
        <div className="tier-3-ctas-section">
          {/* Direct Enrollment Link - Premium Gold Button */}
          <button 
            className="enroll-kickstart-button"
            onClick={() => handleNavigation('/10Day-Freelance-Kickstart')}
          >
            <div className="enroll-button-content">
              <span className="enroll-icon">🚀</span>
              <div className="enroll-text-wrapper">
                <span className="enroll-main-text">Enroll in the 10 Day AI Freelance Kickstart</span>
                <span className="enroll-price-badge">($497 Today Only!)</span>
              </div>
            </div>
          </button>

          {/* Support Network Link with Image */}
          <div className="cta-with-image-block">
            <button 
              className="support-network-button"
              onClick={() => handleNavigation('/ai-community-member')}
            >
              <div className="support-button-content">
                <span className="support-icon">🤝</span>
                <div className="support-text-wrapper">
                  <span className="support-main-text">Join the Private AI Freelance Support Network</span>
                  <span className="support-value-badge">($240 Annual Value)</span>
                </div>
              </div>
            </button>
            <div className="support-image-container">
              <img 
                src="/AI_SUPPORT_NETWORK_HUB.jpeg" 
                alt="AI Freelance Support Network" 
                className="support-network-image"
              />
            </div>
          </div>
        </div>

        {/* Section 4: Tertiary CTAs (Utility & Engagement) */}
        <div className="tertiary-ctas-section">
          <a 
            className="tertiary-text-link tool-stack-link"
            onClick={(e) => {
              e.preventDefault();
              handleNavigation('/ai-tool-stack');
            }}
            href="/ai-tool-stack"
          >
            My Essential AI Tool Stack (Ensure Workflow Fit)
          </a>

          <a 
            className="tertiary-text-link dm-infographic-link"
            onClick={(e) => {
              e.preventDefault();
              handleNavigation('/infographic');
            }}
            href="/infographic"
          >
            Messaged 'STAR'? Click here for your Infographic
          </a>
        </div>

        {/* Footer */}
        <div className="link-in-bio-footer">
          <p className="footer-text">© {new Date().getFullYear()} Lamont T. Evans. All rights reserved.</p>
        </div>

      </div>
    </div>
  );
};

export default LinkInBioPage;
