import React, { useState, useEffect, useRef } from 'react';
import '../styles/YouTubeVideo.css';

interface YouTubeVideoProps {
  youtubeId: string;
  title: string;
}

const YouTubeVideo: React.FC<YouTubeVideoProps> = ({ youtubeId, title }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Generate the thumbnail URL - try to get high quality thumbnail
  const thumbnailUrl = `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`;
  
  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  const handlePlayClick = () => {
    setIsPlaying(true);
  };

  // Track mouse movement for 3D rotation effect
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (isPlaying) return; // Don't track when video is playing
      
      const rect = container.getBoundingClientRect();
      
      // Calculate mouse position relative to the center of the card
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      
      setMousePosition({ x, y });
    };

    // Add a mousemove listener to both window and container
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isPlaying]);

  // Apply more dramatic rotation
  const rotationStyle = isPlaying 
    ? {} 
    : {
        transform: `perspective(1000px) rotateY(${mousePosition.x * 10}deg) rotateX(${-mousePosition.y * 10}deg) scale(1.02)`,
        transition: 'transform 0.2s ease-out',
      };

  return (
    <div 
      className="youtube-video-container"
      ref={containerRef}
      style={rotationStyle}
    >
      <div className="youtube-video-wrapper">
        {!isPlaying ? (
          <div className="youtube-thumbnail" onClick={handlePlayClick}>
            <img 
              src={thumbnailUrl} 
              alt={title} 
              className="youtube-thumbnail-img"
              onError={(e) => {
                // Fallback to standard quality if maxresdefault doesn't exist
                (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`;
              }}
            />
            <div className="youtube-play-overlay">
              <div className="youtube-play-button">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 5V19L19 12L8 5Z" fill="currentColor" />
                </svg>
              </div>
            </div>
          </div>
        ) : (
          <>
            {isLoading && (
              <div className="youtube-loading">
                <div className="youtube-spinner"></div>
              </div>
            )}
            <iframe
              src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`}
              title={title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              onLoad={handleIframeLoad}
              className="youtube-iframe"
            ></iframe>
          </>
        )}
      </div>
    </div>
  );
};

export default YouTubeVideo; 