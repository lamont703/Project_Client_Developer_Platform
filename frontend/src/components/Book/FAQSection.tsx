import React, { useState } from 'react';
import '../../styles/Book/FAQSection.css';

const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "What format is the book in?",
      answer: "The book is delivered as a digital PDF that you receive immediately after ordering for $29. You can read it on any device - computer, tablet, or phone."
    },
    {
      question: "Is this only for developers?",
      answer: "No! While the book includes AI systems that are great for developers, the blueprint works for any type of freelancer - designers, writers, marketers, consultants, and more. The principles apply across all freelance niches."
    },
    {
      question: "How long will it take to see results?",
      answer: "Many readers start seeing results within the first few weeks of implementing the strategies. However, building a premium freelance business typically takes 2-3 months of consistent implementation. The book gives you the exact roadmap to follow."
    },
    {
      question: "Do I need experience with AI tools?",
      answer: "Not at all! The book explains which AI tools to use and how to use them. Even if you're completely new to AI, you'll learn everything you need to know to leverage these powerful tools in your freelance business."
    },
    {
      question: "What if I'm already successful on platforms?",
      answer: "This book will help you transition from platform dependency to independence. Even if you're doing well on Fiverr or Upwork, you'll learn how to attract direct clients who pay premium rates without platform fees."
    },
    {
      question: "Is there a money-back guarantee?",
      answer: "Yes! We offer a 100% money-back guarantee. If you're not satisfied with the book for any reason within 30 days, we'll refund your purchase - no questions asked."
    },
    {
      question: "Will I get updates to the book?",
      answer: "Yes! When you purchase the book, you get lifetime access to updates. As the freelance landscape and AI tools evolve, we'll update the book and you'll get the new version at no additional cost."
    },
    {
      question: "Can I share the book with others?",
      answer: "The book is for personal use only. Each purchase is licensed to one person. Sharing violates the terms of purchase and copyright."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="book-faq">
      <div className="faq-container">
        <div className="section-header">
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-subtitle">
            Everything you need to know about Blueprint To Freelance Freedom
          </p>
        </div>
        
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div key={index} className={`faq-item ${openIndex === index ? 'open' : ''}`}>
              <button 
                className="faq-question" 
                onClick={() => toggleFAQ(index)}
                aria-expanded={openIndex === index}
              >
                <span className="faq-question-text">{faq.question}</span>
                <span className="faq-icon">{openIndex === index ? '−' : '+'}</span>
              </button>
              <div className="faq-answer">
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;

