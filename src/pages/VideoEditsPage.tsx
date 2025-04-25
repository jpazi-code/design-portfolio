import React, { useState, useEffect } from 'react';
import { videoEditsGallery } from '../data/galleryData';
import { getVideosFromPublicDirectory, getYouTubeVideosFromTextFile } from '../utils/fileUtils';
import { GalleryItem } from '../components/Gallery';
import VideoGallery from '../components/VideoGallery';

const VideoEditsPage: React.FC = () => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadVideoEdits = async () => {
      try {
        setLoading(true);
        
        // Try loading YouTube URLs from the text file first
        const youtubeVideos = await getYouTubeVideosFromTextFile('/video-edits', 'video-edits-urls');
        
        // If we have YouTube videos, use those
        if (youtubeVideos.length > 0) {
          setItems(youtubeVideos);
        } else {
          // Otherwise, try loading videos from the public directory
          const dynamicVideoEdits = await getVideosFromPublicDirectory('/video-edits');
          
          // Fall back to static data if no videos found
          const galleryData = dynamicVideoEdits.length > 0 
            ? dynamicVideoEdits 
            : videoEditsGallery;
          
          setItems(galleryData);
        }
      } catch (error) {
        console.error('Error loading video edits:', error);
        setItems(videoEditsGallery);
      } finally {
        setLoading(false);
      }
    };
    
    loadVideoEdits();
  }, []);

  return (
    <VideoGallery 
      title="Video Edits" 
      items={items}
      loading={loading}
    />
  );
};

export default VideoEditsPage; 