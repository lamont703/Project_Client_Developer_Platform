import React, { useEffect, useState, useRef } from 'react';
import '../styles/Professional Freelancer Audit/ProfessionalFreelancerAuditPage.css';
import PFAuditForm from '../components/Professional Freelancer Audit/PFAuditForm';

interface ProfessionalFreelancerAuditPageProps {
  navigateToHome?: () => void;
}

const ProfessionalFreelancerAuditPage: React.FC<ProfessionalFreelancerAuditPageProps> = ({ navigateToHome }) => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [showVideoControls, setShowVideoControls] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    document.title = 'Professional Freelancer Audit: Your Learning Path to Scalable Predictable Income';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Get your free Professional Freelancer Audit and unlock your STAR Method Roadmap. Identify your #1 scaling bottleneck and receive a customized Learning Path Report.');
    }
  }, []);

  // Ensure video starts paused
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.pause();
      setIsVideoPlaying(false);
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

  const handleShowForm = () => {
    setShowForm(true);
    // Scroll to form
    setTimeout(() => {
      const formSection = document.querySelector('.pf-form-section');
      if (formSection) {
        formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

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
                src="https://storage.googleapis.com/msgsndr/QLyYYRoOhCg65lKW9HDX/media/692d0b8d96dd5b6e8620b030.mov"
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
              <span className="pf-cta-icon">🚀</span>
              <span className="pf-cta-text">YES! Send Me My Professional Freelancer Audit & Learning Path Report</span>
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

      {/* Form Section - Center of Page */}
      <section className={`pf-form-section ${showForm ? 'pf-form-section-visible' : ''}`}>
        <div className="pf-container">
          <PFAuditForm />
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

