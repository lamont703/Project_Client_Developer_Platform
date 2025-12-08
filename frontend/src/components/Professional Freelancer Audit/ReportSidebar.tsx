import React, { useState, useEffect } from 'react';

interface ReportSidebarProps {
  activeSection: string;
  onSectionClick: (sectionId: string) => void;
}

const ReportSidebar: React.FC<ReportSidebarProps> = ({ activeSection, onSectionClick }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const sections = [
    { id: 'header', label: 'Report Header', shortLabel: 'Header', icon: '📋' },
    { id: 'summary', label: 'Audit Summary', shortLabel: 'Summary', icon: '📊' },
    { id: 'bottleneck', label: 'Core Bottleneck', shortLabel: 'Bottleneck', icon: '⚠️' },
    { id: 'roadmap', label: 'STAR Roadmap', shortLabel: 'Roadmap', icon: '🗺️' },
    { id: 'next-steps', label: 'Next Steps', shortLabel: 'Next Steps', icon: '🚀' }
  ];

  const handleSectionClick = (sectionId: string) => {
    onSectionClick(sectionId);
    setIsMobileMenuOpen(false); // Close mobile menu after selection
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isMobileMenuOpen && !target.closest('.pf-report-sidebar') && !target.closest('.pf-mobile-menu-button')) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('click', handleClickOutside);
      document.body.style.overflow = 'hidden'; // Prevent body scroll when menu is open
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="pf-mobile-menu-button"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Toggle navigation menu"
        aria-expanded={isMobileMenuOpen}
      >
        <span className={`pf-hamburger ${isMobileMenuOpen ? 'open' : ''}`}>
          <span></span>
          <span></span>
          <span></span>
        </span>
      </button>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="pf-sidebar-overlay"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`pf-report-sidebar ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
        <div className="pf-sidebar-content">
          <div className="pf-sidebar-header">
            <h3 className="pf-sidebar-title">Report Navigation</h3>
            <button
              className="pf-sidebar-close-button"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              ✕
            </button>
          </div>
          <nav className="pf-sidebar-nav">
            {sections.map((section) => (
              <button
                key={section.id}
                className={`pf-sidebar-nav-item ${activeSection === section.id ? 'active' : ''}`}
                onClick={() => handleSectionClick(section.id)}
              >
                <span className="pf-sidebar-nav-icon">{section.icon}</span>
                <span className="pf-sidebar-nav-label">{section.label}</span>
                <span className="pf-sidebar-nav-short-label">{section.shortLabel}</span>
              </button>
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
};

export default ReportSidebar;

