import React from 'react';
import Gallery from '../components/Gallery';
import { GalleryItem } from '../components/Gallery';
import '../styles/Gallery.css';

interface CategoryPageProps {
  title: string;
  items: GalleryItem[];
  loading?: boolean;
}

const CategoryPage: React.FC<CategoryPageProps> = ({ title, items, loading = false }) => {
  return (
    <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
      <Gallery items={items} title={title} loading={loading} />
    </div>
  );
};

export default CategoryPage; 