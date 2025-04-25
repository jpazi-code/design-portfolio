import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SocialMediaPost, SocialMediaProfile } from '../data/socialMediaData';
import '../styles/SocialMediaPostModal.css';

interface Comment {
  username: string;
  text: string;
  id: string;
}

interface SocialMediaPostModalProps {
  isOpen: boolean;
  onClose: () => void;
  post?: {
    id: string;
    user: {
      username: string;
      profilePic: string;
    };
    image: string;
    caption: string;
    location?: string;
    likes: number;
    comments: Array<{
      id: string;
      username: string;
      text: string;
    }>;
    timeAgo: string;
  };
}

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

const getRandomComment = () => {
  const randomUsername = randomUsernames[Math.floor(Math.random() * randomUsernames.length)];
  const randomComment = genericComments[Math.floor(Math.random() * genericComments.length)];
  return {
    username: randomUsername,
    text: randomComment
  };
};

const defaultComments = Array(12).fill(0).map((_, i) => ({
  id: `comment-${i+1}`,
  ...getRandomComment()
}));

// Special case for current user comment
const currentUserComment = {
  id: 'comment-current',
  username: 'currentuser',
  text: '3hr'
};

// Add current user comment at index 2
defaultComments.splice(2, 0, currentUserComment);

const defaultPost = {
  id: 'default',
  user: {
    username: 'User',
    profilePic: 'https://via.placeholder.com/32'
  },
  image: 'https://via.placeholder.com/600x400',
  caption: 'No caption available',
  location: '',
  likes: 0,
  comments: defaultComments,
  timeAgo: 'just now'
};

const SocialMediaPostModal: React.FC<SocialMediaPostModalProps> = ({ isOpen, onClose, post = defaultPost }) => {
  const [comment, setComment] = useState('');
  const [showHeartAnimation, setShowHeartAnimation] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(post?.likes || 0);
  const [allComments, setAllComments] = useState(post?.comments || defaultComments);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (post) {
      setLikes(post.likes);
      setAllComments(post.comments && post.comments.length > 0 ? post.comments : defaultComments);
    }
  }, [post]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleImageDoubleClick = () => {
    if (!isLiked) {
      setShowHeartAnimation(true);
      setIsLiked(true);
      setLikes(likes + 1);
      setTimeout(() => {
        setShowHeartAnimation(false);
      }, 1500);
    }
  };

  const handleLikeClick = () => {
    if (isLiked) {
      setIsLiked(false);
      setLikes(likes - 1);
    } else {
      setIsLiked(true);
      setLikes(likes + 1);
    }
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim()) {
      const newComment = {
        id: `comment-${Date.now()}`,
        username: 'currentuser',
        text: comment
      };
      setAllComments([...allComments, newComment]);
      setComment('');
    }
  };

  const modalVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const contentVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { delay: 0.1 } }
  };

  if (!post && isOpen) {
    console.error("SocialMediaPostModal: No post data provided");
    return null;
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="social-media-modal-overlay"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={modalVariants}
          onClick={handleOverlayClick}
        >
          <motion.div 
            className="social-media-modal-content" 
            variants={contentVariants}
            ref={modalRef}
          >
            <button className="modal-close-button" onClick={onClose}>
              ×
            </button>
            
            <div className="social-media-post">
              <div className="post-image-container">
                <img 
                  src={post.image} 
                  alt="Post" 
                  className="post-image" 
                  onDoubleClick={handleImageDoubleClick}
                />
                {showHeartAnimation && (
                  <motion.div
                    className="heart-animation"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1.2, opacity: 1 }}
                    exit={{ scale: 1, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <svg className="heart-svg" viewBox="0 0 24 24" fill="#ed4956">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>
                  </motion.div>
                )}
              </div>
              
              <div className="post-details">
                <div className="post-header">
                  <div className="post-profile">
                    <img 
                      src={post.user.profilePic} 
                      alt={`${post.user.username}'s profile`} 
                      className="profile-pic" 
                    />
                    <div className="profile-info">
                      <span className="profile-name">{post.user.username}</span>
                      {post.location && <span className="post-location">{post.location}</span>}
                    </div>
                  </div>
                  <button className="more-options-button">
                    •••
                  </button>
                </div>
                
                <div className="post-comments-section">
                  <div className="post-caption-container">
                    <span className="caption-username">{post.user.username}</span>
                    <span className="caption-text">{post.caption}</span>
                  </div>
                  
                  {allComments.map((comment) => (
                    <div key={comment.id} className="comment-container">
                      <span className="comment-username">{comment.username}</span>
                      {comment.username === 'currentuser' ? (
                        <span className="comment-time">{comment.text}</span>
                      ) : (
                        <span className="comment-text">{comment.text}</span>
                      )}
                    </div>
                  ))}
                  
                  <div className="post-time">
                    <span className="time-ago">{post.timeAgo}</span>
                  </div>
                </div>
                
                <div className="post-footer">
                  <div className="post-actions">
                    <div className="action-buttons-left">
                      <button 
                        className={`action-button heart-button ${isLiked ? 'liked' : ''}`}
                        onClick={handleLikeClick}
                      >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill={isLiked ? "#ed4956" : "none"} stroke={isLiked ? "none" : "currentColor"} strokeWidth="2">
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                      </button>
                      <button className="action-button">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                        </svg>
                      </button>
                      <button className="action-button">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <line x1="22" y1="2" x2="11" y2="13" />
                          <polygon points="22 2 15 22 11 13 2 9 22 2" />
                        </svg>
                      </button>
                    </div>
                    <button className="action-button bookmark">
                      <svg height="24" viewBox="0 0 48 48" width="24" fill="currentColor">
                        <path d="M43.5 48c-.4 0-.8-.2-1.1-.4L24 29 5.6 47.6c-.4.4-1.1.6-1.6.3-.6-.2-1-.8-1-1.4v-45C3 .7 3.7 0 4.5 0h39c.8 0 1.5.7 1.5 1.5v45c0 .6-.4 1.2-.9 1.4-.2.1-.4.1-.6.1zM24 26c.8 0 1.6.3 2.2.9l15.8 16V3H6v39.9l15.8-16c.6-.6 1.4-.9 2.2-.9z"></path>
                      </svg>
                    </button>
                  </div>
                  
                  <div className="post-likes">
                    {likes} likes
                  </div>
                  
                  <form className="add-comment" onSubmit={handleCommentSubmit}>
                    <button type="button" className="emoji-button">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                        <line x1="9" y1="9" x2="9.01" y2="9"></line>
                        <line x1="15" y1="9" x2="15.01" y2="9"></line>
                      </svg>
                    </button>
                    <input
                      type="text"
                      placeholder="Add a comment..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    />
                    <button
                      type="submit"
                      className="post-comment-button"
                      disabled={!comment.trim()}
                    >
                      Post
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SocialMediaPostModal; 