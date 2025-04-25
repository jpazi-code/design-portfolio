import React from 'react';
import YouTubeVideo from './YouTubeVideo';
import PageHeader from './PageHeader';
import '../styles/YouTubeGallery.css';
import { GalleryItem } from './Gallery';

interface YouTubeGalleryProps {
  items: GalleryItem[];
  title: string;
  loading?: boolean;
}

const YouTubeGallery: React.FC<YouTubeGalleryProps> = ({ items, title, loading = false }) => {
  return (
    <div className="youtube-gallery-container">
      <PageHeader title={title} showWorksLink={false} />
      
      {loading ? (
        <div className="youtube-gallery-loading">
          <p>Loading videos...</p>
          <div className="youtube-gallery-spinner"></div>
        </div>
      ) : items.length === 0 ? (
        <div className="youtube-gallery-empty">
          <p>No videos found</p>
          <p className="youtube-gallery-tip">
            Add YouTube video URLs to the corresponding text file to display videos here.
          </p>
        </div>
      ) : (
        <div className="youtube-gallery-grid">
          {items.map((item) => (
            item.youtubeId ? (
              <div key={item.id} className="youtube-gallery-item">
                <YouTubeVideo 
                  youtubeId={item.youtubeId} 
                  title={item.title} 
                />
              </div>
            ) : null
          ))}
        </div>
      )}
    </div>
  );
};

export default YouTubeGallery; 