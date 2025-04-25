import React from 'react';
import { Link } from 'react-router-dom';
import SocialMediaCard from '../components/SocialMediaCard';
import { socialMediaProfiles } from '../data/socialMediaData';
import '../styles/PublicationsPage.css';

const PublicationsPage: React.FC = () => {
  return (
    <div className="publications-container">
      <div className="publications-header">
        <h1 className="publications-title">Suggested for you</h1>
      </div>
      
      <div className="social-media-profiles">
        {socialMediaProfiles.map(profile => (
          <SocialMediaCard key={profile.id} profile={profile} />
        ))}
      </div>
      
      <div className="back-to-home">
        <Link to="/" className="back-button">← Back to Works</Link>
      </div>
    </div>
  );
};

export default PublicationsPage; 