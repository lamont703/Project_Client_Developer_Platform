import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Webinar Workshop/WebinarWorkshopPage.css';
import PaymentModal from '../components/Webinar Workshop/PaymentModal';

interface WebinarWorkshopPageProps {
  navigateToHome?: () => void;
}

const WebinarWorkshopPage: React.FC<WebinarWorkshopPageProps> = ({ navigateToHome }) => {
  const navigate = useNavigate();
  const [isCalendarModalOpen, setIsCalendarModalOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    document.title = 'THE STAR METHOD: Your Blueprint to $10K+ AI Freelance Clients | Live Workshop';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Join the FREE Live STAR Method Workshop. Learn the repeatable system to attract $10K+ AI freelance clients without Upwork or Fiverr. Hosted by Lamont T. Evans.');
    }

    // Countdown timer - set to next workshop (example: 7 days from now)
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const nextWorkshop = new Date();
      nextWorkshop.setDate(nextWorkshop.getDate() + 7);
      nextWorkshop.setHours(19, 0, 0, 0); // 7 PM
      const difference = nextWorkshop.getTime() - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      }
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleRegisterClick = () => {
    setIsCalendarModalOpen(true);
  };

  const handleCloseCalendarModal = () => {
    setIsCalendarModalOpen(false);
  };

  return (
    <div className="webinar-workshop-page">
      <div className="circuit-pattern"></div>
      
      {/* Section 1: The Hero (Urgency & Primary Conversion Zone) */}
      <section className="workshop-hero">
        <div className="hero-container">
          <h1 className="hero-title">
            THE STAR METHOD: Your Blueprint to $10K+ AI Freelance Clients
            <span className="hero-subtitle-line">(Without Upwork or Fiverr)</span>
          </h1>
          
          <div className="host-section">
            <img 
              src="/XRBlockDev Logo.png" 
              alt="Lamont T. Evans" 
              className="host-image"
            />
            <p className="host-title">Hosted by Lamont T. Evans, AI Freelance Systems Architect</p>
          </div>

          <div className="cta-timer-container">
            <button 
              className="primary-cta-button"
              onClick={handleRegisterClick}
            >
              <span className="cta-icon">🚨</span>
              <span className="cta-text">SECURE YOUR SPOT FOR THE NEXT LIVE WORKSHOP (IT'S FREE)</span>
            </button>

            <div className="urgency-timer">
              <div className="timer-label">Next Session Starts In:</div>
              <div className="timer-display">
                <div className="timer-unit">
                  <span className="timer-value">{String(timeLeft.days).padStart(2, '0')}</span>
                  <span className="timer-label-small">Days</span>
                </div>
                <span className="timer-separator">:</span>
                <div className="timer-unit">
                  <span className="timer-value">{String(timeLeft.hours).padStart(2, '0')}</span>
                  <span className="timer-label-small">Hours</span>
                </div>
                <span className="timer-separator">:</span>
                <div className="timer-unit">
                  <span className="timer-value">{String(timeLeft.minutes).padStart(2, '0')}</span>
                  <span className="timer-label-small">Minutes</span>
                </div>
                <span className="timer-separator">:</span>
                <div className="timer-unit">
                  <span className="timer-value">{String(timeLeft.seconds).padStart(2, '0')}</span>
                  <span className="timer-label-small">Seconds</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: The Crisis (Validation & Motivation) */}
      <section className="crisis-section">
        <div className="crisis-container">
          <h2 className="crisis-headline">
            Why Your Traditional Freelance Strategy is Failing: The AI Reckoning
          </h2>
          
          <div className="crisis-stats">
            <div className="stat-card">
              <div className="stat-value">21%</div>
              <div className="stat-label">Overall Decrease in demand for automation-prone freelance jobs</div>
            </div>
            
            <div className="stat-card">
              <div className="stat-value">20%</div>
              <div className="stat-label">Software Development Decline</div>
            </div>
            
            <div className="stat-card">
              <div className="stat-value">70%</div>
              <div className="stat-label">of Fiverr Freelancers make less than $100/month</div>
            </div>
          </div>

          <div className="crisis-message">
            <p className="crisis-text">
              The middle is disappearing; you must learn AI skills to access remaining high-budget roles.
            </p>
          </div>
        </div>
      </section>

      {/* Section 3: The Solution (The STAR Method Framework) */}
      <section className="star-method-section">
        <div className="star-container">
          <h2 className="star-headline">
            The STAR Method: The Repeatable System to Attract High-Paying Inbound Clients
          </h2>
          
          <div className="star-framework">
            <div className="star-phase">
              <div className="phase-letter">S</div>
              <div className="phase-content">
                <h3 className="phase-title">Showcase</h3>
                <p className="phase-description">
                  Focus on Building Visibility and Inbound Leads by using content to show what you do, rather than telling.
                </p>
              </div>
            </div>

            <div className="star-connector"></div>

            <div className="star-phase">
              <div className="phase-letter">T</div>
              <div className="phase-content">
                <h3 className="phase-title">Tools</h3>
                <p className="phase-description">
                  Focus on Efficiency, Speed, and Professionalism. The solo freelancer must appear as capable as a full agency.
                </p>
              </div>
            </div>

            <div className="star-connector"></div>

            <div className="star-phase">
              <div className="phase-letter">A</div>
              <div className="phase-content">
                <h3 className="phase-title">Acquisition</h3>
                <p className="phase-description">
                  Focus on Frictionless Client Closing using polished proposals and clarity.
                </p>
              </div>
            </div>

            <div className="star-connector"></div>

            <div className="star-phase">
              <div className="phase-letter">R</div>
              <div className="phase-content">
                <h3 className="phase-title">Retention</h3>
                <p className="phase-description">
                  Focus on Predictable Monthly Income using automation for follow-ups and upsells.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: The Tool Stack (Professional Organization) */}
      <section className="tool-stack-section">
        <div className="tool-stack-container">
          <h2 className="tool-stack-headline">
            The AI Tool Stack: Consistency & Workflow Fit
          </h2>
          
          <p className="tool-stack-message">
            These tools are selected for Workflow Fit to build a reliable, scalable, and efficient AI-driven tool stack.
          </p>

          <div className="tool-categories">
            <div className="tool-category">
              <h3 className="category-title">Productivity</h3>
              <div className="tool-logos">
                <div className="tool-logo">ChatGPT</div>
                <div className="tool-logo">NotebookLM</div>
                <div className="tool-logo">GoHighLevel (CRM)</div>
              </div>
            </div>

            <div className="tool-category">
              <h3 className="category-title">Development</h3>
              <div className="tool-logos">
                <div className="tool-logo">Cursor (IDE)</div>
                <div className="tool-logo">Vercel</div>
                <div className="tool-logo">Supabase</div>
              </div>
            </div>

            <div className="tool-category">
              <h3 className="category-title">Design</h3>
              <div className="tool-logos">
                <div className="tool-logo">Canva</div>
              </div>
            </div>

            <div className="tool-category">
              <h3 className="category-title">Content</h3>
              <div className="tool-logos">
                <div className="tool-logo">Gemini</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: The Offer Tease (Bonuses & Value) */}
      <section className="bonus-section">
        <div className="bonus-container">
          <h2 className="bonus-headline">
            What You Get When You Commit: The Exclusive Bonus Package
          </h2>
          
          <div className="bonus-items">
            <div className="bonus-item">
              <img 
                src="/KICKSTART_10DAY_PRODUCT.jpeg" 
                alt="10 Day AI Freelance Kickstart Training" 
                className="bonus-image"
              />
              <p className="bonus-label">The 10 Day AI Freelance Kickstart Training</p>
            </div>

            <div className="bonus-item">
              <img 
                src="/EVANS_BOOK_BLUEPRINT.jpeg" 
                alt="Blueprint To Freelance Freedom" 
                className="bonus-image"
              />
              <p className="bonus-label">Free Copy of Blueprint To Freelance Freedom</p>
            </div>

            <div className="bonus-item">
              <img 
                src="/AI_SUPPORT_NETWORK_HUB.jpeg" 
                alt="AI Freelance Support Network" 
                className="bonus-image"
              />
              <p className="bonus-label">
                12 Months Access to the Private AI Freelance Support Network
                <span className="bonus-value">(Normal Value: $240)</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Final CTA */}
      <section className="final-cta-section">
        <div className="final-cta-container">
          <button 
            className="primary-cta-button final-cta-button"
            onClick={handleRegisterClick}
          >
            <span className="cta-icon">🚨</span>
            <span className="cta-text">SECURE YOUR SPOT NOW FOR THE FREE LIVE WORKSHOP</span>
          </button>
        </div>
      </section>

      {/* Calendar Booking Modal */}
      <PaymentModal isOpen={isCalendarModalOpen} onClose={handleCloseCalendarModal} />
    </div>
  );
};

export default WebinarWorkshopPage;
