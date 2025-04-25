import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, PanInfo } from 'framer-motion';
import { Link } from 'react-router-dom';
import ImageModal from './ImageModal';
import '../styles/DynamicGallery.css';

interface Image {
  id: string;
  src: string;
  title?: string;
  x: number;
  y: number;
  alt?: string;
  isDragging?: boolean;
}

interface DynamicGalleryProps {
  title: string;
  folderPath: string;
  fileExtension?: string;
  useForceField?: boolean;
  onBack?: () => void;
}

interface GalleryItemProps {
  image: Image;
  onClick: (image: Image) => void;
  onDragStart: () => void;
  onDrag: (x: number, y: number) => void;
  onDragEnd: () => void;
  useForceField?: boolean;
}

const DynamicGallery: React.FC<DynamicGalleryProps> = ({ 
  title, 
  folderPath, 
  fileExtension = 'png',
  useForceField = false,
  onBack
}) => {
  const [images, setImages] = useState<Image[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const draggingRef = useRef<string | null>(null);
  const positionsRef = useRef<Image[]>([]);
  
  useEffect(() => {
    const loadImages = async () => {
      try {
        setIsLoading(true);
        
        // In a production environment, you would handle this with an API call
        // Here we're using a simulated approach
        const response = await fetch(`/api/images?folder=${folderPath}`).catch(() => {
          // Fallback - simulate loading images from the folder
          return { ok: false } as Response;
        });
        
        let imageList: Image[] = [];
        
        if (response.ok) {
          const data = await response.json();
          imageList = data.images;
        } else {
          // Fallback - simulate loading from public folder
          // This would need to be replaced with an actual API call in production
          const simulatedImages = Array.from({ length: 10 }, (_, i) => ({
            src: `/${folderPath}/${i + 1}.${fileExtension}`,
            title: `${title} ${i + 1}`,
            id: `${i + 1}`,
            x: Math.random() * (window.innerWidth * 0.8),
            y: Math.random() * (window.innerHeight * 0.8)
          }));
          imageList = simulatedImages;
        }
        
        // Add random positions for force field layout
        if (useForceField && containerRef.current) {
          const container = containerRef.current;
          const containerWidth = container.clientWidth;
          const containerHeight = container.clientHeight;
          
          imageList = imageList.map(img => ({
            ...img,
            x: Math.random() * (containerWidth - 200),
            y: Math.random() * (containerHeight - 200)
          }));
        }
        
        setImages(imageList);
        positionsRef.current = imageList;
      } catch (error) {
        console.error('Error loading images:', error);
        setImages([]);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadImages();
    
    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [folderPath, title, fileExtension, useForceField]);
  
  const applyForceField = useCallback((id: string) => {
    if (!useForceField || positionsRef.current.length === 0) return;
    
    const newPositions = [...positionsRef.current];
    
    // Apply forces between items
    for (let i = 0; i < newPositions.length; i++) {
      for (let j = i + 1; j < newPositions.length; j++) {
        const dx = newPositions[j].x - newPositions[i].x;
        const dy = newPositions[j].y - newPositions[i].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Minimum distance to maintain between items
        const minDistance = 150;
        
        if (distance < minDistance && distance > 0) {
          // Calculate repulsion force
          const force = (minDistance - distance) / distance * 0.05;
          const forceX = dx * force;
          const forceY = dy * force;
          
          // Don't move the item being dragged
          if (draggingRef.current !== newPositions[i].id) {
            newPositions[i].x -= forceX;
            newPositions[i].y -= forceY;
          }
          
          if (draggingRef.current !== newPositions[j].id) {
            newPositions[j].x += forceX;
            newPositions[j].y += forceY;
          }
        }
      }
    }
    
    // Apply boundary constraints
    if (containerRef.current) {
      const container = containerRef.current;
      const containerWidth = container.clientWidth;
      const containerHeight = container.clientHeight;
      
      for (let i = 0; i < newPositions.length; i++) {
        // Don't constrain the item being dragged
        if (draggingRef.current === newPositions[i].id) continue;
        
        const minX = 50;
        const maxX = containerWidth - 150;
        const minY = 50;
        const maxY = containerHeight - 150;
        
        newPositions[i].x = Math.max(minX, Math.min(maxX, newPositions[i].x));
        newPositions[i].y = Math.max(minY, Math.min(maxY, newPositions[i].y));
      }
    }
    
    positionsRef.current = newPositions;
    setImages(newPositions);
    
    animationRef.current = requestAnimationFrame(() => applyForceField(id));
  }, [useForceField]);
  
  useEffect(() => {
    // Initialize force field animation
    if (useForceField && images.length > 0) {
      animationRef.current = requestAnimationFrame(() => applyForceField(images[0].id));
      
      return () => {
        if (animationRef.current !== null) {
          cancelAnimationFrame(animationRef.current);
        }
      };
    }
  }, [images.length, useForceField, applyForceField]);
  
  const handleDragStart = (id: string) => {
    draggingRef.current = id;
  };
  
  const handleDrag = (id: string, info: PanInfo) => {
    setImages(images.map(img => 
      img.id === id 
        ? { ...img, x: img.x + info.delta.x, y: img.y + info.delta.y, isDragging: true } 
        : img
    ));
    
    // This will trigger the force field logic if it's enabled
    if (useForceField) {
      applyForceField(id);
    }
  };
  
  const handleDragEnd = (id: string) => {
    draggingRef.current = null;
  };
  
  const handleImageClick = (image: Image) => {
    setSelectedImage(image);
  };
  
  const handleCloseModal = () => {
    setSelectedImage(null);
  };
  
  if (isLoading) {
    return (
      <div className="dynamic-gallery-container">
        {onBack && (
          <div className="gallery-header">
            <button className="back-button" onClick={onBack}>
              ← Back
            </button>
            <h1 className="gallery-title">{title}</h1>
          </div>
        )}
        <div className="gallery-loading">Loading...</div>
      </div>
    );
  }
  
  if (images.length === 0) {
    return (
      <div className="dynamic-gallery-container">
        {onBack && (
          <div className="gallery-header">
            <button className="back-button" onClick={onBack}>
              ← Back
            </button>
            <h1 className="gallery-title">{title}</h1>
          </div>
        )}
        <div className="gallery-empty">No images found</div>
      </div>
    );
  }
  
  return (
    <div className="dynamic-gallery-container" ref={containerRef}>
      {onBack && (
        <div className="gallery-header">
          <button className="back-button" onClick={onBack}>
            ← Back
          </button>
          <h1 className="gallery-title">{title}</h1>
        </div>
      )}
      
      {useForceField ? (
        <div className="force-field-container">
          {images.map((image) => (
            <motion.div
              key={image.id}
              className="draggable-item"
              drag
              dragMomentum={false}
              dragElastic={0.1}
              onDragStart={() => handleDragStart(image.id || '')}
              onDragEnd={() => handleDragEnd(image.id || '')}
              onDrag={(_, info) => {
                handleDrag(
                  image.id || '',
                  info
                );
              }}
              initial={{ x: image.x, y: image.y }}
              animate={{ x: image.x, y: image.y }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 1.1 }}
              style={{ position: 'absolute', width: 200, height: 200 }}
            >
              <img 
                src={image.src} 
                alt={image.title}
                onClick={() => handleImageClick(image)}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="gallery-grid">
          {images.map((image) => (
            <GalleryItem
              key={image.id}
              image={image}
              useForceField={useForceField}
              onClick={() => handleImageClick(image)}
              onDragStart={() => handleDragStart(image.id)}
              onDrag={(x: number, y: number) => handleDrag(image.id, { delta: { x, y } } as PanInfo)}
              onDragEnd={() => handleDragEnd(image.id)}
            />
          ))}
        </div>
      )}
      
      {selectedImage && (
        <ImageModal
          isOpen={!!selectedImage}
          onClose={handleCloseModal}
          imageSrc={selectedImage.src}
          title={selectedImage.title || ''}
        />
      )}
    </div>
  );
};

const GalleryItem: React.FC<GalleryItemProps> = ({
  image,
  onClick,
  onDragStart,
  onDrag,
  onDragEnd,
  useForceField
}) => {
  const handleDragStart = () => {
    onDragStart();
  };
  
  const handleDrag = (_: any, info: PanInfo) => {
    onDrag(info.delta.x, info.delta.y);
  };
  
  const handleDragEnd = () => {
    onDragEnd();
  };
  
  return (
    <motion.div
      className="gallery-item"
      style={{
        position: 'absolute',
        left: image.x,
        top: image.y,
        cursor: 'grab',
        zIndex: image.isDragging ? 10 : 1
      }}
      drag
      dragMomentum={false}
      onDragStart={handleDragStart}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
      whileHover={{ scale: 1.05 }}
    >
      <img 
        src={image.src} 
        alt={image.alt || 'Gallery image'} 
        onClick={() => onClick(image)} 
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
    </motion.div>
  );
};

export default DynamicGallery; 