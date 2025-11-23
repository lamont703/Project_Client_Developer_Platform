import React, { useState } from 'react';
import '../../styles/Webinar Workshop/FAQSection.css';

const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "Do I need to attend live to get the bonus?",
      answer: "Yes, the exclusive bonus is only available to those who attend the live workshop session. However, you'll still receive access to the workshop recording if you register, but the bonus is reserved for live attendees."
    },
    {
      question: "What if I can't attend the live session?",
      answer: "If you register but can't attend live, you'll still receive access to the full workshop recording. However, the exclusive bonus is only available to live attendees. We recommend attending live to get the most value and claim your bonus."
    },
    {
      question: "How long is the workshop?",
      answer: "The workshop typically runs for 60-90 minutes, including the presentation, Q&A session, and bonus reveal. We'll send you the exact schedule when you register."
    },
    {
      question: "Do I need the 10-Day AI Freelance Kickstart to benefit from this workshop?",
      answer: "No! This workshop is designed to teach foundational concepts that stand alone. However, understanding these concepts will make the 10-Day Kickstart even more effective if you decide to enroll. The workshop complements the Kickstart but is valuable on its own."
    },
    {
      question: "What technology do I need to attend?",
      answer: "You just need a device with internet connection (computer, tablet, or phone) and a web browser. We'll send you a link to join the workshop via Zoom or our preferred platform when you register."
    },
    {
      question: "Will the workshop be recorded?",
      answer: "Yes! All registered attendees will receive access to the full workshop recording, even if they can't attend live. However, remember that the exclusive bonus is only available to live attendees."
    },
    {
      question: "What makes this different from the 10-Day Kickstart?",
      answer: "The workshop focuses on the 'what' and 'why' - the foundational concepts, strategies, and mindset. The 10-Day Kickstart focuses on the 'how' - practical implementation. Together, they provide a complete understanding and actionable roadmap for AI freelancing success."
    },
    {
      question: "Can I ask questions during the workshop?",
      answer: "Absolutely! We have a dedicated Q&A session where you can ask questions live. You can also submit questions in advance when you register, and we'll address them during the workshop."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="webinar-faq">
      <div className="faq-container">
        <div className="section-header">
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-subtitle">
            Everything you need to know about the Live Webinar Workshop
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


