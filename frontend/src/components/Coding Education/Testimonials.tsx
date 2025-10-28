import React from 'react';
import '../../styles/Coding Education/Testimonials.css';

interface TestimonialsProps {
  onJoinWaitlist?: () => void;
}

const Testimonials: React.FC<TestimonialsProps> = ({ onJoinWaitlist }) => {
  const testimonials = [
    {
      name: "Alex Martinez",
      role: "Former Marketing Professional",
      company: "Freelancer",
      content: "I had zero coding experience when I started. Lamont's practical approach and short sessions made learning manageable. I deployed my first app in 8 weeks!",
      avatar: "👨‍💼"
    },
    {
      name: "Jordan Taylor",
      role: "Entrepreneur",
      company: "Tech Startup",
      content: "The 1-on-1 coaching was exactly what I needed. Lamont breaks down complex concepts into small, digestible chunks. I now build my own apps!",
      avatar: "👩‍💼"
    },
    {
      name: "Sam Williams",
      role: "Creative Professional",
      company: "Freelance Designer",
      content: "Lamont's teaching style is conversational and results-focused. Every session taught me something new I could immediately use. The personal mentorship is unmatched.",
      avatar: "🎨"
    }
  ];

  return (
    <section className="testimonials">
      <div className="testimonials-container">
        <div className="section-header">
          <h2 className="section-title">Success Stories from Complete Beginners</h2>
          <p className="section-subtitle">
            Hear from people who went from zero coding experience to building their own live web applications
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
          <h3>Ready to Build Your First Live App?</h3>
          <p>Join beginners who went from zero to deployed applications with Lamont's personalized 8-week program.</p>
          <button onClick={onJoinWaitlist} className="cta-button">Join the Waitlist</button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
