import React, { useState, useEffect } from 'react';
import CategoryPage from './CategoryPage';
import { photographyGallery } from '../data/galleryData';
import { getImagesFromPublicDirectory } from '../utils/fileUtils';
import { GalleryItem } from '../components/Gallery';

const PhotographyPage: React.FC = () => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPhotography = async () => {
      try {
        setLoading(true);
        
        // Load images dynamically from /photography folder
        const dynamicPhotos = await getImagesFromPublicDirectory('/photography');
        
        // Fall back to static data if no images found
        const galleryData = dynamicPhotos.length > 0 
          ? dynamicPhotos 
          : photographyGallery;
        
        setItems(galleryData);
      } catch (error) {
        console.error('Error loading photography:', error);
        setItems(photographyGallery);
      } finally {
        setLoading(false);
      }
    };
    
    loadPhotography();
  }, []);

  return (
    <div className="photography-gallery">
      <CategoryPage 
        title="Photography" 
        items={items}
        loading={loading}
      />
    </div>
  );
};

export default PhotographyPage; 