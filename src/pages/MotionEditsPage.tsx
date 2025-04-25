import React, { useState, useEffect } from 'react';
import { motionEditsGallery } from '../data/galleryData';
import { getVideosFromPublicDirectory, getYouTubeVideosFromTextFile } from '../utils/fileUtils';
import { GalleryItem } from '../components/Gallery';
import VideoGallery from '../components/VideoGallery';

const MotionEditsPage: React.FC = () => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMotionEdits = async () => {
      try {
        setLoading(true);
        
        // Try loading YouTube URLs from the text file first
        const youtubeVideos = await getYouTubeVideosFromTextFile('/motion-edits', 'motion-edits-urls');
        
        // If we have YouTube videos, use those
        if (youtubeVideos.length > 0) {
          setItems(youtubeVideos);
        } else {
          // Otherwise, try loading videos from the public directory
          const dynamicMotionEdits = await getVideosFromPublicDirectory('/motion-edits');
          
          // Fall back to static data if no videos found
          const galleryData = dynamicMotionEdits.length > 0 
            ? dynamicMotionEdits 
            : motionEditsGallery;
          
          setItems(galleryData);
        }
      } catch (error) {
        console.error('Error loading motion edits:', error);
        setItems(motionEditsGallery);
      } finally {
        setLoading(false);
      }
    };
    
    loadMotionEdits();
  }, []);

  return (
    <VideoGallery 
      title="Motion Edits" 
      items={items}
      loading={loading}
    />
  );
};

export default MotionEditsPage; 