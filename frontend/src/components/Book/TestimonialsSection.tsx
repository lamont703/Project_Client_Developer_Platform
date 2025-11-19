import React from 'react';
import '../../styles/Book/TestimonialsSection.css';

const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      name: "Alex Martinez",
      role: "Freelance Designer",
      content: "This book completely changed how I approach freelancing. I went from struggling on Upwork to landing my first $5K project within 2 months. The AI systems section alone was worth 10x the price!",
      avatar: "🎨",
      highlight: "First $5K Project in 2 Months"
    },
    {
      name: "Jordan Kim",
      role: "Freelance Developer",
      content: "The blueprint gave me the exact steps to break free from Fiverr. I now have a steady stream of premium clients who value my work and pay what I'm worth. Best $29 I've ever spent.",
      avatar: "👨‍💻",
      highlight: "Premium Client Pipeline"
    },
    {
      name: "Sam Taylor",
      role: "Content Creator",
      content: "I was skeptical at first, but the strategies in this book are game-changers. The AI tools and client acquisition methods helped me triple my freelance income in just 3 months.",
      avatar: "✍️",
      highlight: "Tripled Income in 3 Months"
    }
  ];

  return (
    <section className="book-testimonials">
      <div className="testimonials-container">
        <div className="section-header">
          <h2 className="section-title">What Readers Are Saying</h2>
          <p className="section-subtitle">
            Real results from freelancers who used the Blueprint To Freelance Freedom
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

