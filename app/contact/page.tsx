import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';

const styles = {
  contactContainer: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '2rem',
  },
  title: {
    fontSize: '2rem',
    marginBottom: '0.5rem',
    color: '#333',
  },
  subtitle: {
    fontSize: '1.1rem',
    color: '#666',
    marginBottom: '2rem',
  },
  contactForm: {
    display: 'flex',
    flexDirection: 'column' as const,
    marginBottom: '2rem',
  },
  formGroup: {
    marginBottom: '1.5rem',
  },
  input: {
    width: '100%',
    padding: '0.75rem',
    border: '1px solid #e2e8f0',
    borderRadius: '0.375rem',
    fontSize: '1rem',
  },
  textarea: {
    width: '100%',
    padding: '0.75rem',
    border: '1px solid #e2e8f0',
    borderRadius: '0.375rem',
    fontSize: '1rem',
    minHeight: '150px',
  },
  submitButton: {
    backgroundColor: '#3b82f6',
    color: 'white',
    border: 'none',
    padding: '0.75rem 1.5rem',
    borderRadius: '0.375rem',
    fontSize: '1rem',
    fontWeight: 'bold' as const,
    cursor: 'pointer',
  },
  resultMessage: {
    padding: '1rem',
    marginTop: '1rem',
    borderRadius: '0.375rem',
  },
  success: {
    backgroundColor: '#dcfce7',
    color: '#16a34a',
  },
  error: {
    backgroundColor: '#fee2e2',
    color: '#dc2626',
  },
  contactInfoSection: {
    marginTop: '2rem',
    padding: '1.5rem',
    backgroundColor: '#f8fafc',
    borderRadius: '0.5rem',
  },
  contactInfoTitle: {
    fontSize: '1.5rem',
    color: '#333',
    marginBottom: '1rem',
  },
  socialLinks: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '1rem',
  },
  socialLink: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '1rem',
    backgroundColor: 'white',
    borderRadius: '0.375rem',
    color: '#333',
    textDecoration: 'none',
    border: '1px solid #eee',
    transition: 'transform 0.2s, box-shadow 0.2s',
  },
  socialIcon: {
    width: '28px',
    height: '28px',
    flexShrink: 0,
  }
};

export default function ContactPage() {
  const form = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<null | { success: boolean; message: string }>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionResult(null);

    try {
      if (form.current) {
        // Initialize EmailJS with your public key
        emailjs.init("V9vD_sOkg06ZXhYSx"); 
        
        // Prepare template parameters
        const templateParams = {
          name: formData.name,
          title: formData.subject,
          email: formData.email,
          message: formData.message
        };
        
        const result = await emailjs.sendForm(
          'service_m7xrsqo',
          'template_3lfiq3j',
          form.current,
          'V9vD_sOkg06ZXhYSx'
        );

        setSubmissionResult({
          success: true,
          message: 'Your message has been sent successfully! We will get back to you within 3 business days.'
        });
        
        // Reset form after successful submission
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      }
    } catch (error) {
      console.error('Email sending failed:', error);
      setSubmissionResult({
        success: false,
        message: 'Failed to send your message. Please try again or contact us directly.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={styles.contactContainer}>
      <h1 style={styles.title}>Contact Me</h1>
      <p style={styles.subtitle}>Fill out the form below to get in touch with me.</p>
      
      <form style={styles.contactForm} ref={form} onSubmit={handleSubmit}>
        <div style={styles.formGroup}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Your name"
            style={styles.input}
          />
        </div>
        
        <div style={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Your email address"
            style={styles.input}
          />
        </div>
        
        <div style={styles.formGroup}>
          <label htmlFor="subject">Subject</label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            placeholder="Message subject"
            style={styles.input}
          />
        </div>
        
        <div style={styles.formGroup}>
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            placeholder="Your message"
            style={styles.textarea}
            rows={5}
          />
        </div>
        
        <button
          type="submit"
          style={{
            ...styles.submitButton,
            opacity: isSubmitting ? 0.7 : 1
          }}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
      </form>
      
      {submissionResult && (
        <div style={{
          ...styles.resultMessage,
          ...(submissionResult.success ? styles.success : styles.error)
        }}>
          {submissionResult.message}
        </div>
      )}

      <div style={styles.contactInfoSection}>
        <h2 style={styles.contactInfoTitle}>Contact Information</h2>
        <div style={styles.socialLinks}>
          <a 
            href="https://www.behance.net/dynamwa" 
            target="_blank" 
            rel="noopener noreferrer" 
            style={styles.socialLink}
          >
            <img 
              src="/behanceLogo.png" 
              alt="Behance" 
              style={styles.socialIcon} 
            />
            <span>dynamwa</span>
          </a>
          <a 
            href="https://www.linkedin.com/in/jasmine-martha-abaquita-88b59629a/" 
            target="_blank" 
            rel="noopener noreferrer" 
            style={styles.socialLink}
          >
            <img 
              src="/linkedinLogo.png" 
              alt="LinkedIn" 
              style={styles.socialIcon} 
            />
            <span>Jasmine Martha Abaquita</span>
          </a>
        </div>
      </div>
    </div>
  );
} 