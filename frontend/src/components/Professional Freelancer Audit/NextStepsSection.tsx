import React from 'react';
import { useNavigate } from 'react-router-dom';

const NextStepsSection: React.FC = () => {
  const navigate = useNavigate();

  const handleAcceleratedPathClick = () => {
    navigate('/10Day-Freelance-Kickstart');
  };

  return (
    <section className="pf-next-steps-section">
      <div className="pf-section-container">
        <h2 className="pf-section-title">
          Next Steps & Implementation Options
        </h2>

        <p className="pf-next-steps-intro">
          You now have the <strong>"What"</strong> and <strong>"Why"</strong> from your audit. 
          The question is: <strong>How will you implement this systematic roadmap?</strong>
        </p>

        <div className="pf-implementation-paths">
          {/* Path A: Self-Guided */}
          <div className="pf-path-box pf-path-a">
            <div className="pf-path-header">
              <h3 className="pf-path-title">Path A: Self-Guided Implementation</h3>
              <span className="pf-path-label">Independent</span>
            </div>
            <div className="pf-path-content">
              <div className="pf-path-risks">
                <h4 className="pf-path-subtitle">Risks & Challenges:</h4>
                <ul className="pf-path-list">
                  <li>Slower progress due to learning curve</li>
                  <li>AI fatigue from tool exploration and setup</li>
                  <li>Inconsistency in implementation, which kills productivity</li>
                  <li>Lack of accountability and structured guidance</li>
                  <li>Potential for costly mistakes and wasted time</li>
                </ul>
              </div>
              <div className="pf-path-description">
                <p>
                  While this path is possible, it requires significant time investment and 
                  self-discipline. The risk of inconsistency and AI fatigue can derail your 
                  progress, making it difficult to maintain momentum.
                </p>
              </div>
            </div>
          </div>

          {/* Path B: Accelerated */}
          <div className="pf-path-box pf-path-b">
            <div className="pf-path-header">
              <h3 className="pf-path-title">Path B: Accelerated Implementation</h3>
              <span className="pf-path-label pf-path-recommended">Recommended</span>
            </div>
            <div className="pf-path-content">
              <div className="pf-path-value">
                <h4 className="pf-path-subtitle">10 Day AI Freelance Kickstart</h4>
                <p className="pf-path-program-name">
                  <strong>The STAR Method: Blueprint To Freelance Freedom</strong>
                </p>
              </div>
              <div className="pf-path-benefits">
                <h4 className="pf-path-subtitle">What You Get:</h4>
                <ul className="pf-path-list pf-path-benefits-list">
                  <li>Hands-on "how" to implement the systematic roadmap</li>
                  <li>Build a reliable, scalable, and efficient AI-driven tool stack</li>
                  <li>Structured guidance from a Systems Architect</li>
                  <li>Accountability and support throughout implementation</li>
                  <li>Accelerated timeline: 10 days vs. months of trial and error</li>
                  <li>Proven framework that eliminates guesswork</li>
                </ul>
              </div>
              <div className="pf-path-cta">
                <button 
                  className="pf-path-button"
                  onClick={handleAcceleratedPathClick}
                >
                  Learn More About the 10 Day AI Freelance Kickstart
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="pf-final-cta">
          <h3 className="pf-final-cta-title">Ready to Discuss Your Report?</h3>
          <p className="pf-final-cta-text">
            Schedule a follow-up meeting to discuss your audit results in detail and 
            determine the best implementation path for your specific situation.
          </p>
          <div className="pf-booking-calendar">
            <iframe 
              src="https://api.leadconnectorhq.com/widget/booking/0xe9wFX0qYwkldXA6ag5" 
              scrolling="yes" 
              id="0xe9wFX0qYwkldXA6ag5_report_1765140108768"
              title="Book Your Follow-Up Meeting"
              allow="fullscreen"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default NextStepsSection;

