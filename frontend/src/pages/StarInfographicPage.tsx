import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/StarInfographicPage.css';

interface StarInfographicPageProps {
  navigateToHome?: () => void;
}

const StarInfographicPage: React.FC<StarInfographicPageProps> = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'STAR Method Infographic – Predictable Income Blueprint';
  }, []);

  const handleKickstartClick = () => {
    navigate('/10Day-Freelance-Kickstart');
  };

  const handleWorkshopClick = () => {
    navigate('/webinar-workshop');
  };

  return (
    <div className="star-infographic-page">
      <div className="star-infographic-circuit" />

      {/* Section 1: Hero & Infographic */}
      <section className="star-hero">
        <div className="star-container">
          <h1 className="star-hero-title">Your STAR Method Blueprint: Predictable Income System.</h1>
          <p className="star-hero-subtitle">
            <span className="star-hero-highlight">
              The complete four-phase framework to attract premium clients without relying on Fiverr or Upwork.
            </span>
          </p>

          <div className="star-hero-image-wrapper">
            <img
              src="/Updated STAR Method.jpeg"
              alt="STAR Method Infographic"
              className="star-hero-image"
            />
          </div>

          <div className="star-download-wrapper">
            <a
              href="/Updated STAR Method.jpeg"
              download="Updated_STAR_Method_Infographic.jpeg"
              className="star-download-button"
            >
              Download High-Res PDF/Image
            </a>
          </div>
        </div>
      </section>

      {/* Section 2: Conversion Bridge */}
      <section className="star-conversion">
        <div className="star-container">
          <h2 className="star-section-headline">Ready to Implement the System?</h2>
          <p className="star-conversion-text">
            The infographic gives you the <strong>what</strong>. The{' '}
            <strong>10 Day AI Freelance Kickstart</strong> teaches the <strong>hands-on how</strong> — installing the
            STAR Method into your daily workflow so you can close and retain high-value clients with confidence.
          </p>

          <div className="star-conversion-ctas">
            <button className="star-primary-cta" onClick={handleKickstartClick}>
              Enroll in the 10 Day AI Freelance Kickstart (Get the Hands-On How)
            </button>

            <button className="star-secondary-cta" onClick={handleWorkshopClick}>
              Register for the FREE Live STAR Method Workshop
            </button>
          </div>
        </div>
      </section>

      {/* Section 3: Final Assurance */}
      <section className="star-assurance">
        <div className="star-container">
          <p className="star-assurance-text">
            This framework is designed to help freelancers build a reliable, scalable, and efficient AI-driven tool
            stack — so you can stop guessing and start running your business like a professional system.
          </p>
        </div>
      </section>
    </div>
  );
};

export default StarInfographicPage;


