import emailjs from '@emailjs/browser';

// EmailJS configuration
// TODO: Replace these with your actual EmailJS credentials
// Get them from: https://www.emailjs.com/
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';

export interface WaitlistFormData {
  name: string;
  email: string;
  experience: string;
  goals: string;
  availability: string;
}

/**
 * Send a waitlist signup notification email
 * @param formData - The waitlist form data
 * @returns Promise that resolves when email is sent
 */
export const sendWaitlistEmail = async (formData: WaitlistFormData): Promise<void> => {
  try {
    // Initialize EmailJS with your public key
    emailjs.init(EMAILJS_PUBLIC_KEY);

    // Prepare template parameters
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      to_email: 'info@innergcomplete.com',
      experience_level: formData.experience,
      learning_goals: formData.goals,
      preferred_schedule: formData.availability,
      subject: 'New Waitlist Signup - Coding Education Program',
      message: `New waitlist signup received!

Name: ${formData.name}
Email: ${formData.email}
Experience Level: ${formData.experience}
Learning Goals: ${formData.goals}
Preferred Schedule: ${formData.availability}

Please follow up with this potential student.`
    };

    // Send the email
    await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams
    );

    console.log('Waitlist email sent successfully!');
  } catch (error) {
    console.error('Failed to send waitlist email:', error);
    // Don't throw error to user - still show success message
    // Log error to console for debugging
  }
};

