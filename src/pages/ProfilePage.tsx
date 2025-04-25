import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { socialMediaProfiles, profilePostsMap, SocialMediaPost } from '../data/socialMediaData';
import SocialMediaPostModal from '../components/SocialMediaPostModal';
import '../styles/ProfilePage.css';

// Random usernames and comments for post modal
const randomUsernames = [
  'alex_design',
  'sarahj92',
  'photo_lover',
  'mike_explorer',
  'jessicatravel',
  'david.smith',
  'emma_creative',
  'james.walker',
  'fashion_lisa',
  'tech_ryan'
];

const genericComments = [
  'This is amazing! 😍',
  'Love this content! Keep it up 👏',
  'Wow, absolutely stunning!',
  'So cool! Where is this?',
  'This made my day ❤️',
  'Fantastic shot!',
  'Can\'t believe how good this is!',
  'Great work as always 🔥',
  'This is perfect 👌',
  'I need to try this!',
  'Incredible vibes ✨',
  'Obsessed with this 💯',
  'Goals right here!',
  'This is everything 🙌',
  'Saving this for inspiration',
  'Your content never disappoints!',
  'This belongs in a gallery!',
  'Love the composition here',
  'I\'m speechless! Amazing!',
  'The colors are just perfect!'
];

// Function to generate a random comment
const getRandomComment = () => {
  const randomUsername = randomUsernames[Math.floor(Math.random() * randomUsernames.length)];
  const randomComment = genericComments[Math.floor(Math.random() * genericComments.length)];
  return {
    username: randomUsername,
    text: randomComment
  };
};

const ProfilePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [profile, setProfile] = useState(socialMediaProfiles.find(p => p.slug === slug));
  const [posts, setPosts] = useState<SocialMediaPost[]>([]);
  const [selectedPost, setSelectedPost] = useState<SocialMediaPost | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followerCount, setFollowerCount] = useState(0);

  useEffect(() => {
    // Find the profile and posts based on the slug
    const currentProfile = socialMediaProfiles.find(p => p.slug === slug);
    setProfile(currentProfile);

    if (currentProfile) {
      setFollowerCount(currentProfile.followers);
    }

    if (slug && profilePostsMap[slug]) {
      setPosts(profilePostsMap[slug]);
    } else {
      setPosts([]);
    }
  }, [slug]);

  const openModal = (post: SocialMediaPost) => {
    setSelectedPost(post);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    if (!isFollowing) {
      setFollowerCount(prevCount => prevCount + 1);
    } else {
      setFollowerCount(prevCount => prevCount - 1);
    }
  };

  // Generate post comments for modal
  const generatePostComments = (count: number) => {
    const comments = Array(count).fill(0).map((_, i) => ({
      id: `comment-${i+1}`,
      ...getRandomComment()
    }));
    
    // Add current user comment if there are at least 3 comments
    if (count >= 3) {
      const currentUserComment = {
        id: 'comment-current',
        username: 'currentuser',
        text: '3hr'
      };
      comments.splice(2, 0, currentUserComment);
    }
    
    return comments;
  };

  if (!profile) {
    return (
      <div className="profile-not-found">
        <h2>Profile not found</h2>
        <Link to="/publications" className="back-button">← Back to Publications</Link>
      </div>
    );
  }

  return (
    <div className="profile-page-container">
      <div className="back-to-publications">
        <Link to="/publications" className="back-button">← Back to Publications</Link>
      </div>
      
      <div className="profile-header">
        <div className="profile-header-content">
          <div className="profile-avatar">
            <img src={profile.profilePic} alt={profile.name} />
          </div>
          
          <div className="profile-info-section">
            <div className="profile-username-actions">
              <h2 className="profile-username">{profile.name}</h2>
              <div className="profile-actions">
                <button 
                  className={`follow-button ${isFollowing ? 'following' : ''}`} 
                  onClick={handleFollow}
                >
                  {isFollowing ? 'Following' : 'Follow'}
                </button>
                <button className="message-button">Message</button>
                <button className="more-options-button">
                  <svg aria-label="More options" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24">
                    <circle cx="12" cy="12" r="1.5"></circle>
                    <circle cx="6" cy="12" r="1.5"></circle>
                    <circle cx="18" cy="12" r="1.5"></circle>
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="profile-stats-row">
              <div className="profile-stat">
                <span className="stat-value">{profile.posts}</span> posts
              </div>
              <div className="profile-stat">
                <span className="stat-value">{followerCount.toLocaleString()}</span> followers
              </div>
              {profile.following !== undefined && (
                <div className="profile-stat">
                  <span className="stat-value">{profile.following}</span> following
                </div>
              )}
            </div>
            
            <div className="profile-details">
              <p className="profile-display-name">{profile.name}</p>
              <p className="profile-bio">{profile.description}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="profile-content">
        <div className="profile-tab-bar">
          <div className="profile-tab active">
            <svg aria-label="Posts" className="tab-icon" viewBox="0 0 48 48">
              <path d="M45 1.5H3c-.8 0-1.5.7-1.5 1.5v42c0 .8.7 1.5 1.5 1.5h42c.8 0 1.5-.7 1.5-1.5V3c0-.8-.7-1.5-1.5-1.5zm-40.5 3h11v11h-11v-11zm0 14h11v11h-11v-11zm0 14h11v11h-11v-11zm14-28h11v11h-11v-11zm0 14h11v11h-11v-11zm0 14h11v11h-11v-11zm14-28h11v11h-11v-11zm0 14h11v11h-11v-11zm0 14h11v11h-11v-11z" fillRule="evenodd"></path>
            </svg>
            <span>POSTS</span>
          </div>
          <div className="profile-tab">
            <svg aria-label="Tagged" className="tab-icon" viewBox="0 0 48 48">
              <path d="M41.5 5.5H30.4c-.5 0-1-.2-1.4-.6l-4-4c-.6-.6-1.5-.9-2.4-.9h-6.9c-.9 0-1.8.3-2.4.9l-4 4c-.4.4-.9.6-1.4.6H6.5C5.1 5.5 4 6.6 4 8v33.5c0 1.4 1.1 2.5 2.5 2.5h35c1.4 0 2.5-1.1 2.5-2.5V8c0-1.4-1.1-2.5-2.5-2.5zM24 35.8c-6.5 0-11.8-5.3-11.8-11.8s5.3-11.8 11.8-11.8 11.8 5.3 11.8 11.8-5.3 11.8-11.8 11.8z"></path>
              <circle cx="24" cy="24" r="8"></circle>
            </svg>
            <span>TAGGED</span>
          </div>
        </div>
        
        <div className="posts-grid">
          {posts.map(post => (
            <div 
              key={post.id} 
              className="post-item"
              onClick={() => openModal(post)}
            >
              <img src={post.imageSrc} alt={`Post ${post.id}`} />
              <div className="post-overlay">
                <div className="post-info">
                  <span className="likes-count">
                    <svg aria-label="Like" fill="white" height="18" role="img" viewBox="0 0 24 24" width="18">
                      <path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path>
                    </svg>
                    {post.likes}
                  </span>
                  <span className="comments-count">
                    <svg aria-label="Comment" fill="white" height="18" role="img" viewBox="0 0 24 24" width="18">
                      <path d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></path>
                    </svg>
                    {post.comments}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {selectedPost && (
        <SocialMediaPostModal 
          isOpen={modalOpen}
          onClose={closeModal}
          post={{
            id: String(selectedPost.id),
            user: {
              username: profile.name,
              profilePic: profile.profilePic
            },
            image: selectedPost.imageSrc,
            caption: selectedPost.caption,
            location: profile.description,
            likes: selectedPost.likes,
            comments: generatePostComments(selectedPost.comments),
            timeAgo: selectedPost.date
          }}
        />
      )}
    </div>
  );
};

export default ProfilePage; 