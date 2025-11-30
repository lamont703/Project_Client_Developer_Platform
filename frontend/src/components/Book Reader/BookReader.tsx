import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/Book Reader/BookReader.css';

interface BookReaderProps {
  onOrderClick?: () => void;
}

const BookReader: React.FC<BookReaderProps> = ({ onOrderClick }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const totalPages = 4;

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

  const handleOrderClick = () => {
    if (onOrderClick) {
      onOrderClick();
    } else {
      navigate('/blueprint-to-freelance-freedom');
    }
  };

  return (
    <div className="book-reader-container">
      <div className="book-reader-wrapper">
        {/* Navigation Arrow - Previous */}
        {currentPage > 1 && (
          <button 
            className="book-reader-nav book-reader-nav-prev"
            onClick={handlePrevious}
            aria-label="Previous page"
          >
            <span className="book-reader-arrow">←</span>
          </button>
        )}

        {/* Book Pages */}
        <div className="book-reader-pages">
          {/* Page 1: Book Cover */}
          {currentPage === 1 && (
            <div className="book-reader-page book-reader-page-cover">
              <img 
                src="/EVANS_BOOK_BLUEPRINT.jpeg" 
                alt="Blueprint To Freelance Freedom Book Cover" 
                className="book-reader-cover-image"
                loading="lazy"
              />
            </div>
          )}

          {/* Page 2: The Core Problem */}
          {currentPage === 2 && (
            <div className="book-reader-page book-reader-page-content">
              <div className="book-reader-page-header">
                <h2 className="book-reader-page-title">The Freelance Crisis</h2>
              </div>
              <div className="book-reader-page-body">
                <div className="book-reader-stat-box">
                  <div className="book-reader-stat-number">70%</div>
                  <div className="book-reader-stat-label">of Fiverr freelancers make less than $100/month</div>
                </div>
                <div className="book-reader-divider"></div>
                <p className="book-reader-text">
                  The platform trap is real. With fees averaging <strong>20%</strong>, most freelancers 
                  are working harder, not smarter—trapped in a race to the bottom where platforms profit 
                  while you struggle to break even.
                </p>
                <div className="book-reader-chart">
                  <div className="book-reader-chart-item">
                    <div className="book-reader-chart-bar book-reader-chart-bar-high" style={{ width: '30%' }}>
                      <span className="book-reader-chart-label">High Skill / High Pay</span>
                    </div>
                  </div>
                  <div className="book-reader-chart-item">
                    <div className="book-reader-chart-bar book-reader-chart-bar-low" style={{ width: '70%' }}>
                      <span className="book-reader-chart-label">Low Skill / Low Pay</span>
                    </div>
                  </div>
                </div>
                <p className="book-reader-text book-reader-text-emphasis">
                  The split is clear: Without a system, you're competing in the wrong category.
                </p>
              </div>
            </div>
          )}

          {/* Page 3: The System Solution */}
          {currentPage === 3 && (
            <div className="book-reader-page book-reader-page-content">
              <div className="book-reader-page-header">
                <h2 className="book-reader-page-title">The STAR Method Framework</h2>
              </div>
              <div className="book-reader-page-body">
                <div className="book-reader-star-acronym">
                  <div className="book-reader-star-letter">
                    <span className="book-reader-star-char">S</span>
                    <span className="book-reader-star-label">Showcase</span>
                  </div>
                  <div className="book-reader-star-letter">
                    <span className="book-reader-star-char">T</span>
                    <span className="book-reader-star-label">Tools</span>
                    <span className="book-reader-star-desc">Enhanced Efficiency & Professional Organization</span>
                  </div>
                  <div className="book-reader-star-letter">
                    <span className="book-reader-star-char">A</span>
                    <span className="book-reader-star-label">Acquisition</span>
                    <span className="book-reader-star-desc">Frictionless Client Closing</span>
                  </div>
                  <div className="book-reader-star-letter">
                    <span className="book-reader-star-char">R</span>
                    <span className="book-reader-star-label">Retention</span>
                  </div>
                </div>
                <div className="book-reader-divider"></div>
                <p className="book-reader-text">
                  This proprietary framework provides the <strong>structured process</strong> needed to 
                  escape platform dependency and build a reliable, scalable freelance business using 
                  AI-powered systems.
                </p>
                <p className="book-reader-text book-reader-text-emphasis">
                  Not generic advice. A proven system for predictable income.
                </p>
              </div>
            </div>
          )}

          {/* Page 4: Conversion Gate */}
          {currentPage === 4 && (
            <div className="book-reader-page book-reader-page-cta">
              <div className="book-reader-cta-content">
                <h2 className="book-reader-cta-title">Ready to Implement the Full System?</h2>
                <p className="book-reader-cta-text">
                  The STAR Method provides the blueprint for building a <strong>reliable, scalable, 
                  and efficient AI-driven tool stack</strong>. Stop relying on platforms and secure 
                  predictable monthly income now.
                </p>
                <button 
                  className="book-reader-cta-button"
                  onClick={handleOrderClick}
                >
                  Order the Full Blueprint To Freelance Freedom ($29)
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Arrow - Next */}
        {currentPage < totalPages && (
          <button 
            className="book-reader-nav book-reader-nav-next"
            onClick={handleNext}
            aria-label="Next page"
          >
            <span className="book-reader-arrow">→</span>
            <span className="book-reader-nav-text">Tap to Continue</span>
          </button>
        )}

        {/* Page Indicator */}
        <div className="book-reader-indicator">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <span 
              key={page}
              className={`book-reader-dot ${currentPage === page ? 'active' : ''}`}
              onClick={() => setCurrentPage(page)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookReader;

