import React from 'react';
import '../../styles/Coding Education/Testimonials.css';

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      name: "Alex Martinez",
      role: "Freelance Full-Stack Developer",
      company: "Self-Employed",
      content: "I had zero coding experience when I started. Just 2 weeks after completing the program and deploying my portfolio project, I landed my first client! The live app I built became the centerpiece of my freelance pitch.",
      avatar: "👨‍💼",
      highlight: "FIRST CLIENT IN 2 WEEKS"
    },
    {
      name: "Jordan Taylor",
      role: "Freelance Web Developer",
      company: "Tech Consultant",
      content: "The program didn't just teach me to code—it taught me skills clients actually pay for. My deployed project shows I can handle full-stack work, and that's what gets me hired. I'm now taking on multiple projects!",
      avatar: "👩‍💼",
      highlight: "MULTIPLE CLIENTS, FULL-STACK PRO"
    },
    {
      name: "Sam Williams",
      role: "Freelance Developer",
      company: "Design & Development",
      content: "I went from freelance designer to full-stack freelancer. Lamont's approach of building a real, deployed app gave me the confidence and portfolio piece I needed to charge professional rates.",
      avatar: "🎨",
      highlight: "UPGRADED FROM DESIGNER TO DEVELOPER"
    }
  ];

  return (
    <section className="testimonials">
      <div className="testimonials-container">
        <div className="section-header">
          <h2 className="section-title">Success Stories: From Zero to Freelancing</h2>
          <p className="section-subtitle">
            Hear from people who went from zero coding experience to landing freelance clients and building real client projects
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

export default Testimonials;
