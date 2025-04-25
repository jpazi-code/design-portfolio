import React, { useState, useEffect } from 'react';
import CategoryPage from './CategoryPage';
import { infographicsGallery } from '../data/galleryData';
import { getImagesFromPublicDirectory } from '../utils/fileUtils';
import { GalleryItem } from '../components/Gallery';

const InfographicsPage: React.FC = () => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadInfographics = async () => {
      try {
        setLoading(true);
        
        // Load images dynamically from /infographics folder
        const dynamicInfographics = await getImagesFromPublicDirectory('/infographics');
        
        // Fall back to static data if no images found
        const galleryData = dynamicInfographics.length > 0 
          ? dynamicInfographics 
          : infographicsGallery;
        
        setItems(galleryData);
      } catch (error) {
        console.error('Error loading infographics:', error);
        setItems(infographicsGallery);
      } finally {
        setLoading(false);
      }
    };
    
    loadInfographics();
  }, []);

  return (
    <div className="infographics-gallery">
      <CategoryPage 
        title="Infographics" 
        items={items}
        loading={loading}
      />
    </div>
  );
};

export default InfographicsPage; 