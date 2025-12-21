import React, { useEffect, useState } from 'react';
import '../styles/Ebook/AIFatigueCureEbookPage.css';

interface AIFatigueCureEbookPageProps {
  navigateToHome?: () => void;
}

const AIFatigueCureEbookPage: React.FC<AIFatigueCureEbookPageProps> = ({ navigateToHome }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10; // Increased from 7 to 10 for better content distribution

  useEffect(() => {
    document.title = 'The AI Fatigue Cure - E-Book | From Tool-Chasing Technician to Systems Architect';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Discover the F.I.T.S. Method to eliminate AI Fatigue and transform from a tool-chasing technician to a systems architect. Free ebook.');
    }
  }, []);

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="ebook-page">
      <div className="circuit-pattern"></div>
      <div className="ebook-reader-wrapper">
        
        {/* Book Container */}
        <div className="book-container">
          {/* Navigation - Previous */}
          {currentPage > 1 && (
            <button 
              className="book-nav book-nav-prev"
              onClick={handlePrevious}
              aria-label="Previous page"
            >
              <span className="nav-arrow">←</span>
            </button>
          )}

          {/* Book Pages */}
          <div className="book-pages">
            {/* Page 1: Cover */}
            {currentPage === 1 && (
              <div className="book-page book-page-cover">
                <div className="cover-content">
                  <h1 className="cover-title">E-Book</h1>
                  <h2 className="cover-main-title">The AI Fatigue Cure</h2>
                  <p className="cover-subtitle">From Tool-Chasing Technician to Systems Architect</p>
                  <div className="cover-decoration"></div>
                </div>
              </div>
            )}

            {/* Page 2: Introduction Part 1 */}
            {currentPage === 2 && (
              <div className="book-page book-page-content">
                <div className="page-content">
                  <h2 className="page-title">Introduction: The Invisible Productivity Killer</h2>
                  <p className="page-text">
                    You are currently living through the <strong>"AI Reckoning,"</strong> a fundamental shift where the middle market of freelancing is disappearing, leaving only high-paying complex roles and low-wage roles.
                  </p>
                  <p className="page-text">
                    In this environment, you likely feel the weight of <strong>AI Fatigue</strong>—the overwhelming, exhaustive process of testing every new tool that hits the market, which ultimately kills your momentum and productivity.
                  </p>
                  <p className="page-text">
                    This happens because "stuff is coming out too fast," and the impulse to adopt every new "shiny object" traps you in a <strong>"Technician's Nightmare"</strong> where you are constantly working <em>in</em> your business rather than <em>on</em> it.
                  </p>
                </div>
                <div className="page-number">2</div>
              </div>
            )}

            {/* Page 3: Damning Data Hook */}
            {currentPage === 3 && (
              <div className="book-page book-page-content">
                <div className="page-content">
                  <div className="highlight-box">
                    <p className="highlight-text">
                      Recent research has delivered a <strong>"Damning Data Hook"</strong> for those relying on AI alone: six leading AI agents were tested on real-world freelance tasks and failed to perform more than <strong>3%</strong> of the work correctly.
                    </p>
                  </div>
                  <p className="page-text">
                    This proves that tools are not a substitute for a professional system; they are merely components that must be managed by a <strong>Systems Architect</strong>.
                  </p>
                  <p className="page-text">
                    To escape the "Platform Trap" and achieve <strong>Scalable Predictable Income</strong>, you must stop chasing novelty and start implementing a documented, repeatable plan.
                  </p>
                </div>
                <div className="page-number">3</div>
              </div>
            )}

            {/* Page 4: Phase 1 Part 1 */}
            {currentPage === 4 && (
              <div className="book-page book-page-content">
                <div className="page-content">
                  <h2 className="page-title">Phase 1: Diagnosing the Fulfillment Bottleneck</h2>
                  <p className="page-text">
                    The core problem isn't a lack of tools, but <strong>Fulfillment Consumption</strong>—the bottleneck where you must "pause" your marketing and scaling whenever you land a new client because your manual effort is at 100% capacity.
                  </p>
                  <p className="page-text">
                    When you lack a mandated, integrated tool stack, you feel slow and less capable than a full agency. You may spend hours troubleshooting "free" tools, which is a classic trap because <strong>consistency over novelty</strong> is the only way to maintain a professional organization.
                  </p>
                </div>
                <div className="page-number">4</div>
              </div>
            )}

            {/* Page 5: Phase 1 Part 2 */}
            {currentPage === 5 && (
              <div className="book-page book-page-content">
                <div className="page-content">
                  <p className="page-text">
                    I've learned from my own transition from a highly skilled developer to an agency owner that if a business depends entirely on your manual presence, you don't own a business—you own a job, and it's likely the worst job in the world because your boss is a lunatic.
                  </p>
                  <p className="page-text">
                    To break this cycle, you must adopt the <strong>F.I.T.S. Method</strong> to ensure your tools enhance, rather than distract from, your business growth.
                  </p>
                </div>
                <div className="page-number">5</div>
              </div>
            )}

            {/* Page 6: FITS Method Intro */}
            {currentPage === 6 && (
              <div className="book-page book-page-content">
                <div className="page-content">
                  <h2 className="page-title">Phase 2: The F.I.T.S. Method</h2>
                  <p className="page-text center-text">
                    The <strong>F.I.T.S. Method</strong> is the strategic framework designed to eliminate AI Fatigue by mandating a stable, integrated ecosystem.
                  </p>
                  
                  <div className="fits-list">
                    <div className="fits-item-compact">
                      <span className="fits-letter-small">F</span>
                      <div>
                        <strong>Fulfillment Focus:</strong> Use AI tools to accelerate project delivery and <strong>free up your time</strong> for business development.
                      </div>
                    </div>
                    <div className="fits-item-compact">
                      <span className="fits-letter-small">I</span>
                      <div>
                        <strong>Integrated Categories:</strong> Organize around <strong>Productivity</strong>, <strong>Design</strong>, <strong>Development</strong>, and <strong>Content</strong>.
                      </div>
                    </div>
                  </div>
                </div>
                <div className="page-number">6</div>
              </div>
            )}

            {/* Page 7: FITS Method Part 2 */}
            {currentPage === 7 && (
              <div className="book-page book-page-content">
                <div className="page-content">
                  <div className="fits-list">
                    <div className="fits-item-compact">
                      <span className="fits-letter-small">T</span>
                      <div>
                        <strong>Tool Selection Test:</strong> Prioritize <strong>Workflow Fit</strong> over "troubleshooting for free." Constant switching kills the speed necessary to manage high-ticket sales cycles.
                      </div>
                    </div>
                    <div className="fits-item-compact">
                      <span className="fits-letter-small">S</span>
                      <div>
                        <strong>Speed and System:</strong> Mastery of a stable stack allows a solo freelancer to <strong>appear as capable as a full agency</strong>, providing the professional organization needed to complete projects faster.
                      </div>
                    </div>
                  </div>
                </div>
                <div className="page-number">7</div>
              </div>
            )}

            {/* Page 8: Tool Stack */}
            {currentPage === 8 && (
              <div className="book-page book-page-content">
                <div className="page-content">
                  <h2 className="page-title">Phase 3: The Mandated Agency Stack</h2>
                  <p className="page-text">
                    To cure fatigue, you must stop searching and start installing. My <strong>Mandated AI Tool Stack</strong> for workflow fit and enhanced efficiency includes:
                  </p>
                  
                  <div className="tool-list-compact">
                    <div className="tool-item-compact">
                      <strong>1. GoHighLevel:</strong> Your central command center for CRM, pipelines, and automated follow-ups.
                    </div>
                    <div className="tool-item-compact">
                      <strong>2. Cursor:</strong> The AI-powered code editor that allows you to build software and applications at 10x speed.
                    </div>
                    <div className="tool-item-compact">
                      <strong>3. Vercel & Supabase:</strong> The high-speed infrastructure for deployment and backend data management.
                    </div>
                    <div className="tool-item-compact">
                      <strong>4. NotebookLM:</strong> For deep research and turning raw data into structured frameworks.
                    </div>
                  </div>
                </div>
                <div className="page-number">8</div>
              </div>
            )}

            {/* Page 9: Tool Stack Conclusion & Path Choice */}
            {currentPage === 9 && (
              <div className="book-page book-page-content">
                <div className="page-content">
                  <p className="page-text">
                    By sticking to this stable stack, you leverage the fact that big companies will eventually adopt effective features anyway, so you can "gladly wait" for them to integrate new tech into your existing workflow.
                  </p>
                  
                  <h2 className="page-title">Conclusion: Your Implementation Path</h2>
                  <p className="page-text">
                    You now face a critical choice: <strong>Path A</strong> is self-guided implementation, where you continue to research and test systems on your own, carrying the high risk of continued <strong>AI Fatigue</strong>.
                  </p>
                  <p className="page-text">
                    <strong>Path B</strong> is the <strong>Accelerated Implementation</strong> through the <strong>10 Day AI Freelance Kickstart</strong>.
                  </p>
                </div>
                <div className="page-number">9</div>
              </div>
            )}

            {/* Page 10: Final Conclusion & Analogy */}
            {currentPage === 10 && (
              <div className="book-page book-page-content">
                <div className="page-content">
                  <p className="page-text">
                    It is "not time to play anymore"; you must commit to a professional, repeatable system to secure predictable monthly income. The <strong>STAR Method</strong> gives you the "what" and the "why," but the Kickstart program provides the hands-on "how" to build a reliable, efficient AI-driven business.
                  </p>
                  
                  <div className="analogy-box">
                    <h3 className="analogy-title">Analogy</h3>
                    <p className="analogy-text">
                      Curing AI Fatigue is like a professional chef finally stopping the search for "magic" knives and instead designing a <strong>high-tech kitchen layout</strong>. Once the equipment is mandated and the workflow is set, the chef stops worrying about the tools and starts focusing on the <strong>masterpiece</strong>.
                    </p>
                  </div>
                </div>
                <div className="page-number">10</div>
              </div>
            )}
          </div>

          {/* Navigation - Next */}
          {currentPage < totalPages && (
            <button 
              className="book-nav book-nav-next"
              onClick={handleNext}
              aria-label="Next page"
            >
              <span className="nav-arrow">→</span>
              <span className="nav-text">Next</span>
            </button>
          )}
        </div>

        {/* Page Indicators */}
        <div className="page-indicators">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              className={`page-dot ${currentPage === page ? 'active' : ''}`}
              onClick={() => goToPage(page)}
              aria-label={`Go to page ${page}`}
            />
          ))}
        </div>

        {/* Page Counter */}
        <div className="page-counter">
          Page {currentPage} of {totalPages}
        </div>

      </div>
    </div>
  );
};

export default AIFatigueCureEbookPage;
