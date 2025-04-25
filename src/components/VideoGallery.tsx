import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import GalleryCard from './GalleryCard';
import VideoModal from './VideoModal';
import '../styles/Gallery.css';

export interface VideoItem {
  id: number;
  title: string;
  imageSrc: string; // Thumbnail image
  videoSrc: string; // Actual video file
}

interface VideoGalleryProps {
  items: VideoItem[];
  title: string;
  loading?: boolean;
}

const VideoGallery: React.FC<VideoGalleryProps> = ({ items, title, loading = false }) => {
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
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

  const openModal = (item: VideoItem) => {
    setSelectedVideo(item);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
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
          <p>Loading videos...</p>
        </div>
      ) : items.length === 0 ? (
        <div className="gallery-empty">
          <p>No videos found</p>
        </div>
      ) : (
        <div 
          className="gallery-grid"
          ref={gridRef}
        >
          {items.map((item, index) => (
            <div key={item.id} className="gallery-card-container">
              <div className="video-thumbnail">
                <GalleryCard
                  imageSrc={item.imageSrc}
                  title={item.title}
                  onClick={() => openModal(item)}
                  mousePosition={mousePosition}
                  index={index}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedVideo && (
        <VideoModal
          isOpen={modalOpen}
          onClose={closeModal}
          videoSrc={selectedVideo.videoSrc}
          title={selectedVideo.title}
        />
      )}
    </div>
  );
};

export default VideoGallery; 