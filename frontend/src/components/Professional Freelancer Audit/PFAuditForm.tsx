import React, { useState } from 'react';
import '../../styles/Professional Freelancer Audit/PFAuditForm.css';

interface PFAuditFormProps {}

const PFAuditForm: React.FC<PFAuditFormProps> = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // TODO: Integrate with your form submission service (e.g., GoHighLevel, LeadConnector, etc.)
      // For now, this is a placeholder that simulates form submission
      
      // Example integration:
      // const response = await fetch('/api/submit-audit-request', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // If using GoHighLevel or LeadConnector, you might use their embed form instead
      // For now, we'll show success message
      setSubmitStatus('success');
      
      // Reset form
      setFormData({ name: '', email: '', phone: '' });
      
      // TODO: Redirect to thank you page or show next steps
      // You might want to trigger a webhook or integration here
      
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pf-form-container">
      <div className="pf-form-wrapper">
        <h2 className="pf-form-title">Get Your Free Professional Freelancer Audit</h2>
        <p className="pf-form-subtitle">
          Enter your information below to receive your customized Learning Path Report
        </p>
        
        {submitStatus === 'success' ? (
          <div className="pf-form-success">
            <div className="pf-success-icon">✓</div>
            <h3 className="pf-success-title">Thank You!</h3>
            <p className="pf-success-text">
              Your request has been received. We'll be in touch shortly to schedule your Discovery Call 
              and deliver your Professional Freelancer Audit.
            </p>
          </div>
        ) : (
          <form className="pf-audit-form" onSubmit={handleSubmit}>
            <div className="pf-form-group">
              <label htmlFor="name" className="pf-form-label">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="pf-form-input"
                placeholder="Enter your full name"
                required
              />
            </div>
            
            <div className="pf-form-group">
              <label htmlFor="email" className="pf-form-label">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="pf-form-input"
                placeholder="Enter your email"
                required
              />
            </div>
            
            <div className="pf-form-group">
              <label htmlFor="phone" className="pf-form-label">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="pf-form-input"
                placeholder="Enter your phone number"
                required
              />
            </div>
            
            {submitStatus === 'error' && (
              <div className="pf-form-error">
                There was an error submitting your request. Please try again.
              </div>
            )}
            
            <button 
              type="submit" 
              className="pf-form-submit-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Send Me My Free Professional Freelancer Audit Now!'}
            </button>
            
            <p className="pf-form-privacy">
              By submitting this form, you agree to be contacted about your Professional Freelancer Audit. 
              We respect your privacy and will never share your information.
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default PFAuditForm;

