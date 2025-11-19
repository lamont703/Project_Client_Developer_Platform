import React, { useState } from 'react';
import '../../styles/Accelerator Course/FAQSection.css';

const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "How is this different from the 10-Day Kickstart?",
      answer: "The Accelerator Course is an advanced program designed for freelancers who have completed the Kickstart or are already earning $5K+ monthly. It includes 1-on-1 coaching, advanced strategies, AI automation systems, and comprehensive support to scale to $50K+ monthly."
    },
    {
      question: "What does the 1-on-1 coaching include?",
      answer: "You'll get regular 1-on-1 coaching sessions with experienced mentors who will help you overcome challenges, optimize your systems, and create customized action plans for your specific business. The frequency and format will be detailed upon enrollment."
    },
    {
      question: "How long does the course take to complete?",
      answer: "The course is self-paced, but most students see significant results within 3-6 months of implementation. You'll have ongoing access to all materials, coaching, and community support to work at your own pace."
    },
    {
      question: "Do I need to have completed the 10-Day Kickstart first?",
      answer: "While it's recommended, it's not required. If you're already earning $5K+ monthly and ready to scale, you can enroll directly in the Accelerator Course. However, the Kickstart provides a solid foundation that complements the advanced strategies."
    },
    {
      question: "What kind of support do I get?",
      answer: "You'll receive 1-on-1 coaching sessions, access to the exclusive community, course materials, templates, and ongoing support from mentors and peers. The level of support is comprehensive and designed to help you succeed."
    },
    {
      question: "Is there a money-back guarantee?",
      answer: "Yes! We offer a 100% money-back guarantee. If you're not satisfied with the course for any reason within 30 days, we'll refund your purchase - no questions asked."
    },
    {
      question: "Can I access the materials forever?",
      answer: "Yes! You get lifetime access to all course materials, updates, and the community. As we add new content and strategies, you'll get access to those updates at no additional cost."
    },
    {
      question: "What if I'm not ready to scale yet?",
      answer: "If you're not yet earning $5K+ monthly, we recommend starting with the 10-Day Kickstart and Blueprint book first. The Accelerator Course is designed for those ready to take the next step in scaling their business."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="accelerator-faq">
      <div className="faq-container">
        <div className="section-header">
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-subtitle">
            Everything you need to know about the AI Freelance Accelerator Course
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

