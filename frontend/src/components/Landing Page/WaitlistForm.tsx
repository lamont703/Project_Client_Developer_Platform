import React, { useState } from 'react';

interface FormData {
  name: string;
  phone: string;
  email: string;
  projectSummary: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  email?: string;
  projectSummary?: string;
}

const WaitlistForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    projectSummary: ''
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else {
      const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
      const cleanPhone = formData.phone.replace(/[\s\-\(\)]/g, '');
      if (!phoneRegex.test(cleanPhone)) {
        newErrors.phone = 'Please enter a valid phone number';
      }
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
    }

    // Project summary validation
    if (!formData.projectSummary.trim()) {
      newErrors.projectSummary = 'Project idea summary is required';
    } else if (formData.projectSummary.trim().length < 50) {
      newErrors.projectSummary = 'Please provide at least 50 characters describing your project idea';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
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

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Here you would typically send the data to your backend
      console.log('Form submitted:', formData);
      
      setIsSubmitted(true);
    } catch (error) {
      console.error('Form submission error:', error);
      alert('There was an error submitting your form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="waitlist-form" id="waitlist-form">
        <div className="form-container">
          <div className="success-message">
            <div className="success-icon">🎉</div>
            <h2>Welcome to the Waitlist!</h2>
            <p>Thank you for joining our exclusive waitlist. We'll be in touch soon with next steps.</p>
            <div className="success-details">
              <p><strong>What happens next?</strong></p>
              <ul>
                <li>We'll review your project idea</li>
                <li>You'll receive priority access when spots open</li>
                <li>We'll send you exclusive updates and tips</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="waitlist-form" id="waitlist-form">
      <div className="form-container">
        <div className="form-header">
          <h2 className="form-title">Join Our Exclusive Waitlist</h2>
          <p className="form-subtitle">
            Be among the first 10 projects each month to get professional prototype + pitch deck service
          </p>
          <div className="form-badge">
            <span className="badge-text">Limited Spots Available</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={`form-input ${errors.name ? 'error' : ''}`}
              placeholder="Enter your full name"
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="phone" className="form-label">
              Phone Number *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className={`form-input ${errors.phone ? 'error' : ''}`}
              placeholder="Enter your phone number"
            />
            {errors.phone && <span className="error-message">{errors.phone}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`form-input ${errors.email ? 'error' : ''}`}
              placeholder="Enter your email address"
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="projectSummary" className="form-label">
              Project Idea Summary *
            </label>
            <textarea
              id="projectSummary"
              name="projectSummary"
              value={formData.projectSummary}
              onChange={handleInputChange}
              className={`form-textarea ${errors.projectSummary ? 'error' : ''}`}
              placeholder="Describe your tech idea in detail. What problem does it solve? Who is your target audience? What makes it unique? (Minimum 50 characters)"
              rows={5}
            />
            <div className="character-count">
              {formData.projectSummary.length}/50 minimum
            </div>
            {errors.projectSummary && <span className="error-message">{errors.projectSummary}</span>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`submit-button ${isSubmitting ? 'submitting' : ''}`}
          >
            {isSubmitting ? (
              <>
                <span className="spinner"></span>
                Joining Waitlist...
              </>
            ) : (
              'Join Waitlist'
            )}
          </button>

          <div className="form-footer">
            <p className="privacy-text">
              By joining our waitlist, you agree to receive updates about our service. 
              We respect your privacy and will never share your information.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WaitlistForm;
