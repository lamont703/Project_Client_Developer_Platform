import React, { useState } from 'react';
import '../../styles/Star Method Framework/StarMethodFrameworkPage.css';

interface StarMethodFrameworkFormProps {}

interface FormData {
  fullName: string;
  email: string;
  phone: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
}

const StarMethodFrameworkForm: React.FC<StarMethodFrameworkFormProps> = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Full Name validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Full name must be at least 2 characters';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
    }

    // Phone is optional, but if provided, validate it
    if (formData.phone.trim()) {
      const phoneRegex = /^[+]?[1-9][\d\s\-()]{7,}$/;
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
      // Redirect to the sign-up link with form data as URL parameters
      const signUpUrl = 'https://innergcomplete.app.clientclub.net/courses/offers/7f92b682-50d8-4dbc-a5bf-c9f0090676ba';
      
      // You can append form data as query parameters if the platform supports it
      // For now, we'll just redirect to the sign-up page
      window.location.href = signUpUrl;
    } catch (error) {
      console.error('Form submission error:', error);
      // Still redirect even if there's an error
      window.location.href = 'https://innergcomplete.app.clientclub.net/courses/offers/7f92b682-50d8-4dbc-a5bf-c9f0090676ba';
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="star-framework-form-container">
      <form onSubmit={handleSubmit} className="star-framework-form">
        <div className="star-framework-form-group">
          <label htmlFor="fullName" className="star-framework-form-label">
            Full Name <span className="star-framework-required">*</span>
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            className={`star-framework-form-input ${errors.fullName ? 'star-framework-input-error' : ''}`}
            placeholder="Enter your full name"
            required
          />
          {errors.fullName && (
            <span className="star-framework-error-message">{errors.fullName}</span>
          )}
        </div>

        <div className="star-framework-form-group">
          <label htmlFor="email" className="star-framework-form-label">
            Email Address <span className="star-framework-required">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={`star-framework-form-input ${errors.email ? 'star-framework-input-error' : ''}`}
            placeholder="Enter your email address"
            required
          />
          {errors.email && (
            <span className="star-framework-error-message">{errors.email}</span>
          )}
        </div>

        <div className="star-framework-form-group">
          <label htmlFor="phone" className="star-framework-form-label">
            Phone Number <span className="star-framework-optional">(Optional)</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className={`star-framework-form-input ${errors.phone ? 'star-framework-input-error' : ''}`}
            placeholder="Enter your phone number"
          />
          {errors.phone && (
            <span className="star-framework-error-message">{errors.phone}</span>
          )}
        </div>

        <button
          type="submit"
          className="star-framework-cta-button"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <span className="star-framework-loading-spinner"></span>
              Processing...
            </>
          ) : (
            <>
              <span className="star-framework-cta-icon">🚀</span>
              GET INSTANT ACCESS TO THE STAR METHOD FRAMEWORK (FREE)
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default StarMethodFrameworkForm;

