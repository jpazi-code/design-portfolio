import React from 'react';
import { Link } from 'react-router-dom';
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
    <Gallery items={items} title={title} loading={loading} />
  );
};

export default CategoryPage; 