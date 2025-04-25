import { useState, useRef, useEffect } from 'react';
import { motion, useSpring } from 'framer-motion';
import '../styles/GalleryCard.css';

interface GalleryCardProps {
  imageSrc: string;
  title: string;
  onClick: () => void;
  mousePosition?: { x: number, y: number };
  index?: number;
  videoSrc?: string;
}

const GalleryCard: React.FC<GalleryCardProps> = ({ 
  imageSrc, 
  title, 
  onClick, 
  mousePosition = { x: 0, y: 0 },
  index = 0,
  videoSrc
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [cardPosition, setCardPosition] = useState({ x: 0, y: 0, width: 0, height: 0 });
  
  // Create spring animations for smooth transitions
  const rotateX = useSpring(0, { stiffness: 300, damping: 25 });
  const rotateY = useSpring(0, { stiffness: 300, damping: 25 });
  const translateZ = useSpring(0, { stiffness: 400, damping: 30 });
  
  // Track whether component is mounted
  const isMounted = useRef(true);

  // Update card position on resize and initial load
  const updateCardPosition = () => {
    if (!cardRef.current || !isMounted.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setCardPosition({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
      width: rect.width,
      height: rect.height
    });
  };

  useEffect(() => {
    // Initial position calculation with a small delay to ensure DOM is ready
    const initialTimer = setTimeout(updateCardPosition, 100);
    
    // Add event listeners
    window.addEventListener('resize', updateCardPosition);
    window.addEventListener('scroll', updateCardPosition);
    
    // Update position periodically to catch any layout changes
    const positionInterval = setInterval(updateCardPosition, 1000);

    return () => {
      isMounted.current = false;
      window.removeEventListener('resize', updateCardPosition);
      window.removeEventListener('scroll', updateCardPosition);
      clearTimeout(initialTimer);
      clearInterval(positionInterval);
    };
  }, []);

  // Debug logging to help diagnose issues
  useEffect(() => {
    console.log(`Card ${index} position:`, cardPosition);
  }, [cardPosition, index]);

  // React to mouse position
  useEffect(() => {
    if (!cardRef.current || cardPosition.x === 0 || cardPosition.y === 0) {
      // If we don't have a valid position yet, try to update it
      updateCardPosition();
      return;
    }
    
    // Calculate direction from card center to mouse
    const dx = mousePosition.x - cardPosition.x;
    const dy = mousePosition.y - cardPosition.y;
    
    // Calculate distance from mouse to card center
    const distance = Math.sqrt(dx * dx + dy * dy) || 1; // Avoid division by zero
    
    // Maximum rotation to make cards face the mouse
    const maxRotation = 15;
    
    if (isHovered) {
      // When hovered, reset rotation and lift card up
      rotateX.set(0);
      rotateY.set(0);
      translateZ.set(50); // Lift the card up (in pixels)
    } else {
      // Calculate rotation relative to distance
      // Use a minimum distance to prevent extreme rotations when mouse is too close
      const minDistance = 100;
      const effectiveDistance = Math.max(distance, minDistance);
      const rotationFactor = Math.min(1, 600 / effectiveDistance);
      
      // Normalize dx and dy based on distance
      const normalizedDx = dx / distance;
      const normalizedDy = dy / distance;
      
      // Set rotation - positive values for Y axis make the card turn TOWARD the mouse
      // negative values for X axis make the card tilt TOWARD the mouse
      rotateY.set(normalizedDx * maxRotation * rotationFactor);
      rotateX.set(-normalizedDy * maxRotation * rotationFactor);
      translateZ.set(0);
      
      // Debug log the rotation values
      if (index === 0) {
        console.log('Mouse:', mousePosition, 'Card:', cardPosition, 
                   'Rotation:', { x: -normalizedDy * maxRotation * rotationFactor, 
                                 y: normalizedDx * maxRotation * rotationFactor });
      }
    }
  }, [mousePosition, cardPosition, isHovered, rotateX, rotateY, translateZ, index]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    updateCardPosition(); // Ensure position is accurate on hover
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <motion.div
      className="gallery-card"
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      initial={{ opacity: 0, y: 30 }}
      animate={{ 
        opacity: 1,
        y: 0,
        transition: {
          delay: index * 0.1, // Staggered animation based on index
          duration: 0.5
        }
      }}
      style={{
        transformStyle: "preserve-3d",
        rotateX,
        rotateY,
        translateZ,
        zIndex: isHovered ? 10 : 1
      }}
    >
      <div className={`gallery-card-image-container ${videoSrc ? 'video-thumbnail' : ''}`}>
        <img 
          src={imageSrc} 
          alt={title} 
          className="gallery-card-image"
          onError={(e) => console.error(`Error loading image: ${imageSrc}`, e)}
        />
        {videoSrc && (
          <div className="video-indicator">
            <span className="video-play-icon"></span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default GalleryCard; 