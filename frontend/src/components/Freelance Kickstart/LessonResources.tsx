import React from 'react';
import { Lesson } from '../../data/freelanceKickstartLessons';
import '../../styles/Freelance Kickstart/LessonResources.css';

interface LessonResourcesProps {
  resources?: Lesson['resources'];
}

const LessonResources: React.FC<LessonResourcesProps> = ({ resources }) => {
  if (!resources || (!resources.worksheets?.length && !resources.checklists?.length)) {
    return null;
  }

  const handleDownload = (url: string, filename: string) => {
    // Open PDF in new tab for download
    window.open(url, '_blank');
  };

  return (
    <div className="lesson-resources">
      <div className="resources-header">
        <h3 className="resources-title">📥 Download Resources</h3>
        <p className="resources-subtitle">Get your worksheets and checklists to follow along with the lesson</p>
      </div>

      <div className="resources-grid">
        {resources.worksheets && resources.worksheets.length > 0 && (
          <div className="resource-category">
            <h4 className="category-title">📋 Worksheets</h4>
            <div className="resource-list">
              {resources.worksheets.map((pdfUrl, index) => {
                const filename = pdfUrl.split('/').pop() || `worksheet-${index + 1}.pdf`;
                return (
                  <button
                    key={index}
                    className="resource-download-btn"
                    onClick={() => handleDownload(pdfUrl, filename)}
                  >
                    <span className="download-icon">📄</span>
                    <span className="download-text">Download Worksheet {index + 1}</span>
                    <span className="download-arrow">↓</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {resources.checklists && resources.checklists.length > 0 && (
          <div className="resource-category">
            <h4 className="category-title">✅ Checklists</h4>
            <div className="resource-list">
              {resources.checklists.map((pdfUrl, index) => {
                const filename = pdfUrl.split('/').pop() || `checklist-${index + 1}.pdf`;
                return (
                  <button
                    key={index}
                    className="resource-download-btn checklist"
                    onClick={() => handleDownload(pdfUrl, filename)}
                  >
                    <span className="download-icon">📋</span>
                    <span className="download-text">Download Checklist {index + 1}</span>
                    <span className="download-arrow">↓</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LessonResources;

