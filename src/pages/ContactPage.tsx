import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import PageHeader from '../components/PageHeader';
import '../styles/ContactPage.css';

const ContactPage: React.FC = () => {
  const form = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{ success: boolean; message: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitResult(null);

    try {
      if (form.current) {
        // Initialize EmailJS with your public key
        emailjs.init("V9vD_sOkg06ZXhYSx");
        
        // Prepare template parameters - ensure these match your EmailJS template variables
        const templateParams = {
          name: formData.name,
          title: formData.subject,
          email: formData.email,
          message: formData.message
        };
        
        // Send the email
        const result = await emailjs.sendForm(
          'service_m7xrsqo',
          'template_3lfiq3j',
          form.current,
          'V9vD_sOkg06ZXhYSx'
        );
        
        console.log('Email sent successfully:', result.text);
        
        // Reset form after successful submission
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
        
        setSubmitResult({
          success: true,
          message: 'Thank you for your message! I will get back to you within 3 business days.'
        });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitResult({
        success: false,
        message: 'There was a problem sending your message. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-page">
      <PageHeader title="Get in Touch" showWorksLink={false} />
      <p className="contact-subtitle">Have a project in mind or want to discuss a potential collaboration? I'd love to hear from you!</p>

      <div className="contact-content">
        <div className="contact-form-container">
          <form className="contact-form" ref={form} onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Your Name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Your Email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                placeholder="Subject"
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                placeholder="Your Message"
              />
            </div>

            <button 
              type="submit" 
              className="submit-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>

            {submitResult && (
              <div className={`submission-result ${submitResult.success ? 'success' : 'error'}`}>
                {submitResult.message}
              </div>
            )}
          </form>
        </div>

        <div className="contact-info">
          <h2>Where to find me!</h2>
          <div className="social-links">
            <a href="https://www.behance.net/dynamwa" target="_blank" rel="noopener noreferrer" className="social-link">
              <img src="/behanceLogo.png" alt="Behance" className="social-icon behance-icon" />
              <span>dynamwa</span>
            </a>
            <a href="https://www.linkedin.com/in/jasmine-martha-abaquita-88b59629a/" target="_blank" rel="noopener noreferrer" className="social-link">
              <img src="/linkedinLogo.png" alt="LinkedIn" className="social-icon linkedin-icon" />
              <span>Jasmine Martha Abaquita</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage; 