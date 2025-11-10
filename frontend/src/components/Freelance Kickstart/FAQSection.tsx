import React, { useState } from 'react';
import '../../styles/Freelance Kickstart/FAQSection.css';

const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "What if I'm not a developer?",
      answer: "The 10-Day AI Freelance Kickstart is designed for freelancers in all niches, including digital marketing, design, writing, and more. The AI tools and techniques you'll learn apply across various freelance disciplines."
    },
    {
      question: "What happens after 10 days?",
      answer: "After completing the 10-day program, you'll have the knowledge and tools to continue freelancing with AI. You'll also have access to the community for ongoing support, and you can continue using GoHighLevel if you choose to subscribe (the 14-day trial gives you plenty of time to evaluate it)."
    },
    {
      question: "How does the GoHighLevel trial work?",
      answer: "When you sign up for the Kickstart, you'll receive instructions to activate your 14-day free trial of GoHighLevel. This gives you full access to the platform to manage your freelance business, automate workflows, and handle client communications. No credit card required for the trial."
    },
    {
      question: "Do I need prior experience with AI tools?",
      answer: "No prior experience is needed! The program is beginner-friendly and designed to teach you everything from the ground up. We'll guide you through setting up and using AI tools like Cursor step by step."
    },
    {
      question: "What kind of support is available?",
      answer: "You'll have access to a supportive community of fellow freelancers, daily lesson materials, and step-by-step guidance throughout the 10 days. The community is there to help answer questions and share experiences."
    },
    {
      question: "Can I get a refund if I'm not satisfied?",
      answer: "Yes! We offer a 30-day money-back guarantee. If you're not satisfied with the program, simply contact us within 30 days for a full refund."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="kickstart-faq">
      <div className="faq-container">
        <div className="section-header">
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-subtitle">
            Everything you need to know about the 10-Day AI Freelance Kickstart
          </p>
        </div>
        
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`faq-item ${openIndex === index ? 'open' : ''}`}
            >
              <button 
                className="faq-question" 
                onClick={() => toggleFAQ(index)}
              >
                <span className="faq-question-text">{faq.question}</span>
                <span className="faq-toggle">{openIndex === index ? '−' : '+'}</span>
              </button>
              {openIndex === index && (
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;

