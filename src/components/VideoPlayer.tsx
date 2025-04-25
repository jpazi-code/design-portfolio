import React, { useState, useRef, useEffect } from 'react';
import '../styles/VideoGallery.css';

interface VideoPlayerProps {
  videoId: string;
  title: string;
  onLoad?: () => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoId, title, onLoad }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('');

  useEffect(() => {
    if (isPlaying) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;
      
      setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`);
    };

    const handleMouseLeave = () => {
      setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg)');
    };

    const element = containerRef.current;
    if (element) {
      element.addEventListener('mousemove', handleMouseMove);
      element.addEventListener('mouseleave', handleMouseLeave);
      
      return () => {
        element.removeEventListener('mousemove', handleMouseMove);
        element.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, [isPlaying]);

  const handlePlay = () => {
    setIsPlaying(true);
    setIsLoading(true);
  };

  const handleIframeLoad = () => {
    setIsLoading(false);
    if (onLoad) onLoad();
  };

  // Get high quality thumbnail with fallback
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  const fallbackThumbnail = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  return (
    <div 
      className="video-item"
      ref={containerRef}
      style={{ transform: transform }}
    >
      {isPlaying ? (
        <>
          {isLoading && (
            <div className="loading-spinner">
              <div className="spinner"></div>
            </div>
          )}
          <iframe
            className="video-frame"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
            title={title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            onLoad={handleIframeLoad}
          ></iframe>
        </>
      ) : (
        <>
          <img 
            src={thumbnailUrl}
            alt={title}
            className="video-thumbnail"
            onError={(e) => {
              // Fall back if maxresdefault doesn't exist
              (e.target as HTMLImageElement).src = fallbackThumbnail;
            }}
          />
          <div className="video-overlay" onClick={handlePlay}>
            <div className="play-button">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 5V19L19 12L8 5Z" />
              </svg>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default VideoPlayer; 