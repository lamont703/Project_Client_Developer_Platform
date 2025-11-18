import React, { useState } from 'react';
import '../../styles/Coding Education/WaitlistOverlay.css';

interface WaitlistOverlayProps {
  isVisible: boolean;
}

const WaitlistOverlay: React.FC<WaitlistOverlayProps> = ({ isVisible }) => {
  const [formData, setFormData] = useState({
    email: '',
    phone: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; phone?: string }>({});

  const validateForm = (): boolean => {
    const newErrors: { email?: string; phone?: string } = {};

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
    }

    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else {
      const phoneRegex = /^[+]?[1-9][\d]{0,15}$/;
      const cleanPhone = formData.phone.replace(/[\s\-()]/g, '');
      if (!phoneRegex.test(cleanPhone)) {
        newErrors.phone = 'Please enter a valid phone number';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
      // Submit to waitlist API
      const response = await fetch('https://qhlzjrcidehlpmiimmfm.supabase.co/functions/v1/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'Waitlist Signup', // Default name since we only collect email/phone
          email: formData.email,
          phone: formData.phone,
          experience: 'Not specified',
          goals: 'Interested in coding education program',
          availability: 'Not specified'
        }),
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

  if (!isVisible) {
    return null;
  }

  if (isSubmitted) {
    return (
      <div className="waitlist-overlay">
        <div className="waitlist-overlay-content">
          <div className="success-message">
            <div className="success-icon">🎉</div>
            <h2>You're on the waitlist!</h2>
            <p>Thank you for your interest. We'll notify you as soon as the program is ready.</p>
            <p className="success-subtext">
              We'll send updates to <strong>{formData.email}</strong> and <strong>{formData.phone}</strong>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="waitlist-overlay">
      <div className="waitlist-overlay-content">
        <div className="waitlist-header">
          <h2 className="waitlist-title">Join the Waitlist</h2>
          <p className="waitlist-subtitle">
            We're putting the finishing touches on our AI-Powered Full-Stack Freelancer Accelerator program. 
            Be the first to know when it launches!
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="waitlist-form">
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`form-input ${errors.email ? 'error' : ''}`}
              required
              placeholder="Enter your email address"
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="phone" className="form-label">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className={`form-input ${errors.phone ? 'error' : ''}`}
              required
              placeholder="Enter your phone number"
            />
            {errors.phone && <span className="error-message">{errors.phone}</span>}
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
            By joining the waitlist, you agree to receive updates about the program. 
            We respect your privacy and will never share your information.
          </p>
        </form>
      </div>
    </div>
  );
};

export default WaitlistOverlay;




