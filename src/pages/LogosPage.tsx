import React, { useState, useEffect } from 'react';
import CategoryPage from './CategoryPage';
import { logosGallery } from '../data/galleryData';
import { getImagesFromPublicDirectory } from '../utils/fileUtils';
import { GalleryItem } from '../components/Gallery';

const LogosPage: React.FC = () => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadLogos = async () => {
      try {
        setLoading(true);
        
        // Load images dynamically from /logos folder
        const dynamicLogos = await getImagesFromPublicDirectory('/logos');
        
        // Fall back to static data if no images found
        const galleryData = dynamicLogos.length > 0 
          ? dynamicLogos 
          : logosGallery;
        
        setItems(galleryData);
      } catch (error) {
        console.error('Error loading logos:', error);
        setItems(logosGallery);
      } finally {
        setLoading(false);
      }
    };
    
    loadLogos();
  }, []);

  return (
    <div className="logos-gallery">
      <CategoryPage 
        title="Logo Designs" 
        items={items}
        loading={loading}
      />
    </div>
  );
};

export default LogosPage; 