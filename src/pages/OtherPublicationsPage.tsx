import React, { useState, useEffect } from 'react';
import CategoryPage from './CategoryPage';
import { logosGallery } from '../data/galleryData';
import { getImagesFromPublicDirectory } from '../utils/fileUtils';
import { GalleryItem } from '../components/Gallery';

const OtherPublicationsPage: React.FC = () => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPublications = async () => {
      try {
        setLoading(true);
        
        // Load images dynamically from /other-pubs folder
        const dynamicPublications = await getImagesFromPublicDirectory('/other-pubs');
        
        // Fall back to static data if no images found
        const galleryData = dynamicPublications.length > 0 
          ? dynamicPublications 
          : logosGallery;
        
        setItems(galleryData);
      } catch (error) {
        console.error('Error loading publications:', error);
        setItems(logosGallery);
      } finally {
        setLoading(false);
      }
    };
    
    loadPublications();
  }, []);

  return (
    <div className="other-publications-gallery">
      <CategoryPage 
        title="Other Publications" 
        items={items}
        loading={loading}
      />
    </div>
  );
};

export default OtherPublicationsPage; 