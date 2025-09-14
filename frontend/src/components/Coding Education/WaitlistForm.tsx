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
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitted(true);
    setIsLoading(false);
  };

  if (isSubmitted) {
    return (
      <section className="waitlist-form">
        <div className="form-container">
          <div className="success-message">
            <div className="success-icon">🎉</div>
            <h2>You're on the waitlist!</h2>
            <p>Thank you for your interest in our AI Coding Education Course. We'll be in touch soon with more details about the program.</p>
            <div className="next-steps">
              <h3>What's next?</h3>
              <ul>
                <li>We'll review your application</li>
                <li>Send you detailed course information</li>
                <li>Schedule a brief interview</li>
                <li>Confirm your spot in the program</li>
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
          <h2 className="form-title">Join the Waitlist</h2>
          <p className="form-subtitle">
            Be among the first to experience our revolutionary AI-powered coding education
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
