import React from 'react';
import '../../styles/Coding Education/Testimonials.css';

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Frontend Developer",
      company: "TechCorp",
      content: "The AI-powered learning approach helped me understand complex concepts faster than traditional methods. The 1-on-1 mentorship was invaluable.",
      avatar: "👩‍💻"
    },
    {
      name: "Marcus Johnson",
      role: "Full-Stack Developer",
      company: "StartupXYZ",
      content: "I went from knowing basic HTML to building full applications in just 12 weeks. The personalized curriculum made all the difference.",
      avatar: "👨‍💻"
    },
    {
      name: "Emily Rodriguez",
      role: "Software Engineer",
      company: "InnovateLab",
      content: "The combination of AI assistance and human mentorship created the perfect learning environment. Highly recommend!",
      avatar: "👩‍🔬"
    }
  ];

  return (
    <section className="testimonials">
      <div className="testimonials-container">
        <div className="section-header">
          <h2 className="section-title">What Our Students Say</h2>
          <p className="section-subtitle">
            Hear from developers who transformed their careers with our AI-powered education
          </p>
        </div>
        
        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              <div className="testimonial-content">
                <div className="quote-icon">"</div>
                <p className="testimonial-text">{testimonial.content}</p>
              </div>
              <div className="testimonial-author">
                <div className="author-avatar">{testimonial.avatar}</div>
                <div className="author-info">
                  <div className="author-name">{testimonial.name}</div>
                  <div className="author-role">{testimonial.role}</div>
                  <div className="author-company">{testimonial.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="testimonials-cta">
          <h3>Ready to Start Your Journey?</h3>
          <p>Join hundreds of developers who have accelerated their careers with our AI-powered education platform.</p>
          <a href="#waitlist-form" className="cta-button">Join the Waitlist</a>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
