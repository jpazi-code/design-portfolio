import React, { useState } from 'react';
import PageHeader from './PageHeader';
import VideoPlayer from './VideoPlayer';
import '../styles/VideoGallery.css';
import { GalleryItem } from './Gallery';

interface VideoGalleryProps {
  items: GalleryItem[];
  title: string;
  loading?: boolean;
}

const VideoGallery: React.FC<VideoGalleryProps> = ({ items, title, loading = false }) => {
  const [activeVideos, setActiveVideos] = useState<Set<number>>(new Set());

  if (loading) {
    return (
      <div className="video-gallery-container">
        <PageHeader title={title} showWorksLink={false} />
        <div className="loading-message">Loading videos...</div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="video-gallery-container">
        <PageHeader title={title} showWorksLink={false} />
        <div className="empty-message">
          <p>No videos found</p>
          <p className="empty-tip">
            Add YouTube video URLs to the corresponding text file to display videos here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="video-gallery-container">
      <PageHeader title={title} showWorksLink={false} />
      
      <div className="video-grid">
        {items.map((item, index) => (
          <VideoPlayer 
            key={item.id}
            videoId={item.youtubeId || ''}
            title={item.title}
          />
        ))}
      </div>
    </div>
  );
};

export default VideoGallery; 