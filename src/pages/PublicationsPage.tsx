import React from 'react';
import { Link } from 'react-router-dom';
import SocialMediaCard from '../components/SocialMediaCard';
import { socialMediaProfiles } from '../data/socialMediaData';
import PageHeader from '../components/PageHeader';
import '../styles/PublicationsPage.css';

const PublicationsPage: React.FC = () => {
  return (
    <div className="publications-container">
      <PageHeader title="Sample Pages" showWorksLink={false} />
      
      <div className="social-media-profiles">
        {socialMediaProfiles.map(profile => (
          <SocialMediaCard key={profile.id} profile={profile} />
        ))}
      </div>
      
      <div className="view-more-button-container">
        <Link to="/other-publications" className="view-more-button">
          View Other Publications
        </Link>
      </div>
    </div>
  );
};

export default PublicationsPage; 