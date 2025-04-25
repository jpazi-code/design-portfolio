import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import GalleryCard from './GalleryCard';
import ImageModal from './ImageModal';
import '../styles/Gallery.css';

export interface GalleryItem {
  id: number;
  title: string;
  imageSrc: string;
  videoSrc?: string;
}

interface GalleryProps {
  items: GalleryItem[];
  title: string;
  loading?: boolean;
}

const Gallery: React.FC<GalleryProps> = ({ items, title, loading = false }) => {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const gridRef = useRef<HTMLDivElement>(null);

  // Handle mouse movement globally
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    // Add event listener to window
    window.addEventListener('mousemove', handleMouseMove);

    // Remove event listener on cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const openModal = (item: GalleryItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="gallery-container">
      <div className="gallery-header">
        <div className="back-button">
          <Link to="/">← Back to Works</Link>
        </div>
        <h1 className="gallery-title">{title}</h1>
      </div>
      
      {loading ? (
        <div className="gallery-loading">
          <p>Loading images...</p>
        </div>
      ) : items.length === 0 ? (
        <div className="gallery-empty">
          <p>No images found</p>
        </div>
      ) : (
        <div 
          className="gallery-grid"
          ref={gridRef}
        >
          {items.map((item, index) => (
            <div key={item.id} className="gallery-card-container">
              <GalleryCard
                imageSrc={item.imageSrc}
                title={item.title}
                onClick={() => openModal(item)}
                mousePosition={mousePosition}
                index={index}
                videoSrc={item.videoSrc}
              />
            </div>
          ))}
        </div>
      )}

      {selectedItem && (
        <ImageModal
          isOpen={isModalOpen}
          onClose={closeModal}
          imageSrc={selectedItem.imageSrc}
          title={selectedItem.title}
          videoSrc={selectedItem.videoSrc}
        />
      )}
    </div>
  );
};

export default Gallery; 