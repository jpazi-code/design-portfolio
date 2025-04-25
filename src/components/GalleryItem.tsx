import React from 'react';
import '../styles/DynamicGallery.css';

export interface GalleryItemProps {
  image: {
    src: string;
    title: string;
    id?: string;
  };
  onClick: (image: { src: string; title: string; id?: string }) => void;
}

const GalleryItem: React.FC<GalleryItemProps> = ({ image, onClick }) => {
  return (
    <div 
      className="gallery-item" 
      onClick={() => onClick(image)}
      role="button"
      tabIndex={0}
      aria-label={`View ${image.title}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick(image);
        }
      }}
    >
      <img 
        src={image.src} 
        alt={image.title}
        loading="lazy"
      />
      <div className="gallery-item-overlay">
        <h3>{image.title}</h3>
      </div>
    </div>
  );
};

export default GalleryItem; 