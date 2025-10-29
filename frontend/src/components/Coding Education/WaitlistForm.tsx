import React, { useState } from 'react';
import '../../styles/Coding Education/WaitlistForm.css';

interface FormData {
  name: string;
  email: string;
  experience: string;
  goals: string;
  availability: string;
}

const WaitlistForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    experience: '',
    goals: '',
    availability: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Submit to our backend API
      const response = await fetch('https://qhlzjrcidehlpmiimmfm.supabase.co/functions/v1/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      console.log('Waitlist submission result:', result);
      
      // Show success message
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting waitlist form:', error);
      // Still show success message to user even if submission fails
      setIsSubmitted(true);
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <section className="waitlist-form">
        <div className="form-container">
          <div className="success-message">
            <div className="success-icon">🎉</div>
            <h2>You're on the waitlist!</h2>
            <p>Thank you for your interest in Lamont's One-on-One Full-Stack Developer Program. We'll be in touch soon with more details about personalized coaching.</p>
            <div className="next-steps">
              <h3>What's next?</h3>
              <ul>
                <li>Lamont will review your application personally</li>
                <li>Receive detailed program information</li>
                <li>Schedule a 1-on-1 consultation</li>
                <li>Confirm your spot in the 8-week program</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="waitlist-form">
      <div className="form-container">
        <div className="form-header">
          <h2 className="form-title">Join Lamont's Program</h2>
          <p className="form-subtitle">
            Practical, conversational, and results-focused coaching to build confidence, skills, and a professional portfolio
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="waitlist-form-content">
          <div className="form-group">
            <label htmlFor="name" className="form-label">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="form-input"
              required
              placeholder="Enter your full name"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="form-input"
              required
              placeholder="Enter your email address"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="experience" className="form-label">Current Experience Level</label>
            <select
              id="experience"
              name="experience"
              value={formData.experience}
              onChange={handleInputChange}
              className="form-select"
              required
            >
              <option value="">Select your experience level</option>
              <option value="beginner">Complete Beginner</option>
              <option value="some-experience">Some Programming Experience</option>
              <option value="intermediate">Intermediate Developer</option>
              <option value="advanced">Advanced Developer</option>
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="goals" className="form-label">Learning Goals</label>
            <textarea
              id="goals"
              name="goals"
              value={formData.goals}
              onChange={handleInputChange}
              className="form-textarea"
              rows={4}
              placeholder="Tell us about your learning goals and what you hope to achieve..."
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="availability" className="form-label">Preferred Schedule</label>
            <select
              id="availability"
              name="availability"
              value={formData.availability}
              onChange={handleInputChange}
              className="form-select"
              required
            >
              <option value="">Select your preferred schedule</option>
              <option value="weekday-morning">Weekday Mornings (9 AM - 12 PM)</option>
              <option value="weekday-afternoon">Weekday Afternoons (1 PM - 5 PM)</option>
              <option value="weekday-evening">Weekday Evenings (6 PM - 9 PM)</option>
              <option value="weekend">Weekends</option>
              <option value="flexible">Flexible</option>
            </select>
          </div>
          
          <button type="submit" className="submit-button" disabled={isLoading}>
            {isLoading ? (
              <>
                <span className="loading-spinner"></span>
                Joining Waitlist...
              </>
            ) : (
              'Join Waitlist'
            )}
          </button>
          
          <p className="form-note">
            By joining the waitlist, you agree to receive updates about the course. 
            We respect your privacy and will never share your information.
          </p>
        </form>
      </div>
    </section>
  );
};

export default WaitlistForm;
