import React, { useState, useEffect } from 'react';
import CategoryPage from './CategoryPage';
import { postersGallery } from '../data/galleryData';
import { getImagesFromPublicDirectory } from '../utils/fileUtils';
import { GalleryItem } from '../components/Gallery';

const PostersPage: React.FC = () => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPosters = async () => {
      try {
        setLoading(true);
        
        // Load images dynamically from /posters folder
        const dynamicPosters = await getImagesFromPublicDirectory('/posters');
        
        // Fall back to static data if no images found
        const galleryData = dynamicPosters.length > 0 
          ? dynamicPosters 
          : postersGallery;
        
        setItems(galleryData);
      } catch (error) {
        console.error('Error loading posters:', error);
        setItems(postersGallery);
      } finally {
        setLoading(false);
      }
    };
    
    loadPosters();
  }, []);

  return (
    <CategoryPage 
      title="Posters" 
      items={items}
      loading={loading}
    />
  );
};

export default PostersPage; 