import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import '../styles/Card.css';

interface CardProps {
  title: string;
  routePath: string;
  color: string;
  index: number;
  position: { x: number, y: number };
  rotation: number;
  rotationZ: number;
  isActive: boolean;
  zIndex: number;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  cardImageUrl: string;
}

const Card = ({ 
  title, 
  routePath, 
  index, 
  position, 
  rotation,
  rotationZ,
  isActive, 
  zIndex,
  onMouseEnter,
  onMouseLeave,
  cardImageUrl
}: CardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Debug image path
    console.log(`Card ${index} image path: ${cardImageUrl}`);
    
    // Test loading the image
    const img = new Image();
    img.onload = () => console.log(`Card ${index} image loaded successfully`);
    img.onerror = () => console.error(`Card ${index} failed to load image: ${cardImageUrl}`);
    img.src = cardImageUrl;
  }, [cardImageUrl, index]);
  
  const handleMouseEnter = () => {
    setIsHovered(true);
    onMouseEnter();
  };
  
  const handleMouseLeave = () => {
    setIsHovered(false);
    onMouseLeave();
  };
  
  const handleClick = () => {
    navigate(routePath);
  };

  // Calculate transform for card
  const getCardTransform = () => {
    // Add more dramatic lift when card is active/hovered
    const liftAmount = isActive ? position.y + 40 : position.y; // Increased from 20 to 40
    return `translateY(calc(-50% - ${liftAmount}px)) rotate(${rotation}deg) rotateZ(${rotationZ}deg)`;
  };

  return (
    <motion.div
      className={`card-stack-item ${isActive ? 'active' : ''}`}
      ref={cardRef}
      style={{ 
        zIndex: zIndex,
        left: `${position.x}px`,
        transform: getCardTransform(),
        transition: isActive 
          ? 'transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), left 0.3s ease' 
          : 'transform 0.4s ease, left 0.4s ease'
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <img 
        src={cardImageUrl}
        alt={title}
        className="card"
      />
    </motion.div>
  );
};

export default Card; 