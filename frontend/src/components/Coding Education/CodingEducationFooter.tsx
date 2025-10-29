import React from 'react';
import '../../styles/Coding Education/CodingEducationFooter.css';

const CodingEducationFooter: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="coding-education-footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-title">8-Week Full-Stack Program</h3>
            <p className="footer-description">
              Transform from complete beginner to deployed developer with personalized 1-on-1 coaching.
            </p>
          </div>

          <div className="footer-section">
            <h4 className="footer-heading">Get Started</h4>
            <ul className="footer-links">
              <li>
                <a 
                  href="https://calendly.com/lamont-evans" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="footer-link"
                >
                  Schedule Your First Session
                </a>
              </li>
              <li>
                <a href="/coding-education" className="footer-link">
                  Learning Setup Guide
                </a>
              </li>
              <li>
                <a href="/coding-education#course-overview" className="footer-link">
                  Course Overview
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-heading">Contact</h4>
            <ul className="footer-links">
              <li>
                <a href="mailto:info@innergcomplete.com" className="footer-link">
                  info@innergcomplete.com
                </a>
              </li>
              <li>
                <a 
                  href="https://calendly.com/lamont-evans" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="footer-link"
                >
                  Book a Consultation
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-heading">Program</h4>
            <ul className="footer-links">
              <li>
                <span className="footer-link-text">8 Weeks</span>
              </li>
              <li>
                <span className="footer-link-text">1-on-1 Coaching</span>
              </li>
              <li>
                <span className="footer-link-text">Live Project</span>
              </li>
              <li>
                <span className="footer-link-text">Complete Beginners Welcome</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-brand">
            <span className="brand-icon">🚀</span>
            <span className="brand-name">XRBlockDev Services</span>
          </div>
          <div className="footer-copyright">
            <p>&copy; {currentYear} XRBlockDev Services. All rights reserved.</p>
            <p className="footer-tagline">Empowering complete beginners to become deployed developers.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default CodingEducationFooter;

