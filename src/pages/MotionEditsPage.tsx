import React, { useState, useEffect } from 'react';
import CategoryPage from './CategoryPage';
import { motionEditsGallery } from '../data/galleryData';
import { getVideosFromPublicDirectory } from '../utils/fileUtils';
import { GalleryItem } from '../components/Gallery';

const MotionEditsPage: React.FC = () => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMotionEdits = async () => {
      try {
        setLoading(true);
        
        // Load videos dynamically from /motion-edits folder
        const dynamicMotionEdits = await getVideosFromPublicDirectory('/motion-edits');
        
        // Fall back to static data if no videos found
        const galleryData = dynamicMotionEdits.length > 0 
          ? dynamicMotionEdits 
          : motionEditsGallery;
        
        // Process the items to ensure they have proper thumbnails and no unwanted titles
        const processedItems = galleryData.map(item => {
          // Extract just the file name without path or extension for the title
          const simplifiedTitle = item.title.split('/').pop()?.split('.')[0] || item.title;
          
          // Return the processed item
          return {
            ...item,
            // Use simplified title
            title: simplifiedTitle
          };
        });
        
        setItems(processedItems);
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
    <div className="motion-edits-gallery">
      <CategoryPage 
        title="Motion Edits" 
        items={items}
        loading={loading}
      />
    </div>
  );
};

export default MotionEditsPage; 