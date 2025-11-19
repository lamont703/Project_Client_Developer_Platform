import React from 'react';
import '../../styles/Accelerator Course/TestimonialsSection.css';

const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      name: "Michael Chen",
      role: "Freelance Developer",
      content: "The Accelerator Course took my business from $8K to $45K monthly in just 6 months. The 1-on-1 coaching was invaluable, and the advanced AI systems helped me automate so much of my workflow. Best investment I've made in my business.",
      avatar: "👨‍💻",
      highlight: "$8K to $45K in 6 Months"
    },
    {
      name: "Jessica Martinez",
      role: "Freelance Designer",
      content: "I was stuck at $12K monthly and couldn't figure out how to scale. The Accelerator Course gave me the systems, strategies, and support I needed. Now I'm consistently hitting $50K+ monthly with premium clients. The coaching sessions alone were worth the investment.",
      avatar: "🎨",
      highlight: "Consistent $50K+ Monthly"
    },
    {
      name: "David Thompson",
      role: "Freelance Consultant",
      content: "The advanced modules and AI automation strategies transformed my business. I went from working 60+ hours a week to 30 hours while doubling my income. The community support and coaching made all the difference.",
      avatar: "💼",
      highlight: "Doubled Income, Half the Hours"
    }
  ];

  return (
    <section className="accelerator-testimonials">
      <div className="testimonials-container">
        <div className="section-header">
          <h2 className="section-title">What Accelerator Students Are Saying</h2>
          <p className="section-subtitle">
            Real results from freelancers who completed the AI Freelance Accelerator Course
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

