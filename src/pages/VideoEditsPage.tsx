import React, { useState, useEffect } from 'react';
import CategoryPage from './CategoryPage';
import { videoEditsGallery } from '../data/galleryData';
import { getVideosFromPublicDirectory } from '../utils/fileUtils';
import { GalleryItem } from '../components/Gallery';

const VideoEditsPage: React.FC = () => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadVideoEdits = async () => {
      try {
        setLoading(true);
        
        // Load videos dynamically from /video-edits folder
        const dynamicVideoEdits = await getVideosFromPublicDirectory('/video-edits');
        
        // Fall back to static data if no videos found
        const galleryData = dynamicVideoEdits.length > 0 
          ? dynamicVideoEdits 
          : videoEditsGallery;
        
        // Create multiple copies of the video to test layout
        // Only do this if we only have one video
        let processedItems = [...galleryData];
        if (processedItems.length === 1) {
          const originalItem = processedItems[0];
          // Create 2 more copies for testing the layout
          processedItems = [
            originalItem,
            { ...originalItem, id: 2, title: 'Video 2' },
            { ...originalItem, id: 3, title: 'Video 3' }
          ];
        }
        
        setItems(processedItems);
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
    <div className="video-edits-gallery">
      <CategoryPage 
        title="Video Edits" 
        items={items}
        loading={loading}
      />
    </div>
  );
};

export default VideoEditsPage; 