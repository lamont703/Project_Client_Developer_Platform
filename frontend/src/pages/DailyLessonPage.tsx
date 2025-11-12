import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/Freelance Kickstart/DailyLessonPage.css';
import LessonHeader from '../components/Freelance Kickstart/LessonHeader';
import TheoryVideoSection from '../components/Freelance Kickstart/TheoryVideoSection';
import PracticalVideosSection from '../components/Freelance Kickstart/PracticalVideosSection';
import LessonNavigation from '../components/Freelance Kickstart/LessonNavigation';
import { 
  getLessonByDay, 
  getNextLesson, 
  getPreviousLesson 
} from '../data/freelanceKickstartLessons';

interface DailyLessonPageProps {
  navigateToHome?: () => void;
}

const DailyLessonPage: React.FC<DailyLessonPageProps> = ({ navigateToHome }) => {
  const { day } = useParams<{ day: string }>();
  const navigate = useNavigate();
  const dayNumber = day ? parseInt(day, 10) : null;

  useEffect(() => {
    // Validate day parameter
    if (!dayNumber || dayNumber < 1 || dayNumber > 10) {
      navigate('/10Day-Freelance-Kickstart');
      return;
    }

    const lesson = getLessonByDay(dayNumber);
    if (!lesson) {
      navigate('/10Day-Freelance-Kickstart');
      return;
    }

    // Update page title
    document.title = `Day ${dayNumber}: ${lesson.title} - 10-Day Freelance Kickstart | XRBlockDev`;

    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', lesson.description);
    }

    // Update Open Graph tags
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
    updateMetaTag('og:title', `Day ${dayNumber}: ${lesson.title}`);
    updateMetaTag('og:description', lesson.description);
    updateMetaTag('og:image', 'https://www.xrwebsites.io/XRBlockDev%20Logo.png');
    updateMetaTag('og:site_name', 'XRBlockDev Services');

    // Cleanup function
    return () => {
      document.title = 'Client Developer Platform';
      if (metaDescription) {
        metaDescription.setAttribute('content', 'Developer Platform - Connect developers with opportunities');
      }
    };
  }, [dayNumber, navigate]);

  if (!dayNumber || dayNumber < 1 || dayNumber > 10) {
    return null;
  }

  const lesson = getLessonByDay(dayNumber);
  if (!lesson) {
    return null;
  }

  const hasNext = getNextLesson(dayNumber) !== null;
  const hasPrevious = getPreviousLesson(dayNumber) !== null;

  return (
    <div className="daily-lesson-page">
      <LessonHeader
        day={lesson.day}
        title={lesson.title}
        description={lesson.description}
      />
      
      <div className="lesson-content">
        <TheoryVideoSection 
          day={lesson.day}
          theoryVideo={lesson.theoryVideo} 
          resources={lesson.resources}
          learningOutcomes={lesson.learningOutcomes}
          checklistItems={lesson.checklistItems}
        />
        <PracticalVideosSection practicalVideos={lesson.practicalVideos} />
      </div>

      <LessonNavigation
        currentDay={dayNumber}
        hasNext={hasNext}
        hasPrevious={hasPrevious}
      />
    </div>
  );
};

export default DailyLessonPage;

