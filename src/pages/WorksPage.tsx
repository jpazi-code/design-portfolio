import React from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import '../styles/WorksPage.css';

const WorksPage: React.FC = () => {
  // List of services/content types
  const contentTypes = [
    {
      title: 'Logo Design',
      description: 'Professional and memorable logos for your brand identity',
      link: '/logos'
    },
    {
      title: 'Illustrations',
      description: 'Custom illustrations for publications, websites, and marketing materials',
      link: '/illustrations'
    },
    {
      title: 'Posters & Prints',
      description: 'Eye-catching poster designs for events, promotions, and decorative purposes',
      link: '/posters'
    },
    {
      title: 'Infographics',
      description: 'Visual representation of data and information for clearer communication',
      link: '/infographics'
    },
    {
      title: 'Photography',
      description: 'Professional photography services for products, events, and more',
      link: '/photography'
    },
    {
      title: 'Social Media Publications',
      description: 'Engaging content designed specifically for social media platforms',
      link: '/publications'
    },
    {
      title: 'Motion Graphics',
      description: 'Animated visual elements to bring your content to life',
      link: '/motion-edits'
    },
    {
      title: 'Video Editing',
      description: 'Professional video editing services for your content needs',
      link: '/video-edits'
    }
  ];

  return (
    <div className="works-page">
      <PageHeader title="Services & Expertise" showWorksLink={false} />
      <p className="works-subtitle">Explore the range of creative services I offer to help bring your vision to life</p>

      <div className="content-types-grid">
        {contentTypes.map((type, index) => (
          <div className="content-type-card" key={index}>
            <h2>{type.title}</h2>
            <p>{type.description}</p>
            <Link to={type.link} className="view-examples-btn">
              View Examples
            </Link>
          </div>
        ))}
      </div>

      <div className="custom-projects">
        <h2>Custom Projects</h2>
        <p>Have a specific project in mind that doesn't fit into these categories? I'm always open to discussing custom creative solutions tailored to your unique needs.</p>
        <Link to="/contact" className="contact-btn">Get in Touch</Link>
      </div>
    </div>
  );
};

export default WorksPage; 