import React from 'react';
import '../../styles/Freelance Kickstart/TestimonialsSection.css';

const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Freelance Developer",
      content: "The 10-day Kickstart gave me exactly what I needed to get started. I learned how to use AI tools effectively and landed my first client within two weeks of completing the program!",
      avatar: "👩‍💻",
      highlight: "First Client in 2 Weeks"
    },
    {
      name: "Marcus Johnson",
      role: "Digital Marketer",
      content: "I was skeptical about AI tools, but this program showed me how to integrate them into my workflow. GoHighLevel has been a game-changer for managing my freelance business.",
      avatar: "👨‍💼",
      highlight: "Workflow Transformed"
    },
    {
      name: "Emily Rodriguez",
      role: "Freelance Designer",
      content: "The community support and daily guidance made all the difference. I went from struggling to find clients to having a steady stream of work using the AI tools I learned.",
      avatar: "🎨",
      highlight: "Steady Client Stream"
    }
  ];

  return (
    <section className="kickstart-testimonials">
      <div className="testimonials-container">
        <div className="section-header">
          <h2 className="section-title">What Our Freelancers Say</h2>
          <p className="section-subtitle">
            Real results from freelancers who completed the 10-Day AI Freelance Kickstart
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
                  {testimonial.highlight && (
                    <div className="author-highlight">{testimonial.highlight}</div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;

