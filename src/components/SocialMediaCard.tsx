import React from 'react';
import { Link } from 'react-router-dom';
import { SocialMediaProfile } from '../data/socialMediaData';
import '../styles/SocialMediaCard.css';

interface SocialMediaCardProps {
  profile: SocialMediaProfile;
}

const SocialMediaCard: React.FC<SocialMediaCardProps> = ({ profile }) => {
  return (
    <div className="social-media-card">
      <div className="profile-header">
        <div className="profile-picture">
          <img src={profile.profilePic} alt={profile.name} />
        </div>
        <div className="profile-info">
          <h2 className="profile-name">{profile.name}</h2>
          <p className="profile-description">{profile.description}</p>
        </div>
      </div>
      
      <div className="profile-stats">
        <div className="stat">
          <span className="stat-number">{profile.posts}</span> posts
        </div>
        <div className="stat">
          <span className="stat-number">{profile.followers.toLocaleString()}</span> followers
        </div>
        {profile.following && (
          <div className="stat">
            <span className="stat-number">{profile.following}</span> following
          </div>
        )}
      </div>
      
      <Link to={`/publications/${profile.slug}`} className="view-profile-button">
        View Profile
      </Link>
    </div>
  );
};

export default SocialMediaCard; 