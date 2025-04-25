import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Card from '../components/Card';
import '../styles/Home.css';

interface CardData {
  title: string;
  path: string;
  color: string;
  image: string;
}

const Home = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [cardPositions, setCardPositions] = useState<Array<{ left: number, rotation: number, rotationZ: number }>>([]);
  const [initialized, setInitialized] = useState(false);
  
  // Fixed image paths with correct URLs
  const cardData: CardData[] = [
    { title: 'LOGOS', path: '/logos', color: '#2196F3', image: '/cardfaces/Artboard 1@2x.png' },
    { title: 'ANIMATIONS', path: '/illustrations', color: '#E64A19', image: '/cardfaces/Artboard 2@2x.png' },
    { title: 'POSTERS', path: '/posters', color: '#FBC02D', image: '/cardfaces/Artboard 3@2x.png' },
    { title: 'GRAPHICS', path: '/infographics', color: '#4CAF50', image: '/cardfaces/Artboard 4@2x.png' },
    { title: 'PUBS', path: '/publications', color: '#E91E63', image: '/cardfaces/Artboard 5@2x.png' },
    { title: 'MOTION EDITS', path: '/motion-edits', color: '#9C27B0', image: '/cardfaces/Artboard 6@2x.png' },
    { title: 'PHOTOGRAPHY', path: '/photography', color: '#388E3C', image: '/cardfaces/Artboard 7@2x.png' },
    { title: 'VIDEO EDITS', path: '/video-edits', color: '#FFC107', image: '/cardfaces/Artboard 8@2x.png' },
  ];

  // Calculate base position and rotation for cards in a fan layout
  const getCardPosition = (index: number) => {
    if (!containerRef.current) return { left: 0, rotation: 0, rotationZ: 0 };

    const totalCards = cardData.length;
    const containerWidth = containerRef.current.clientWidth;
    
    // Card dimensions - Updated for larger cards
    const cardWidth = 220;
    
    // Calculate spread width based on container size - Increased for more space
    const availableWidth = containerWidth - 200; // Increased padding for better spacing
    const spreadWidth = Math.min(90, Math.max(60, availableWidth / totalCards));
    
    // Calculate the center position of the container
    const centerX = containerWidth / 2;
    
    // Calculate the total width of all cards when spread out
    const totalSpreadWidth = (totalCards - 1) * spreadWidth;
    
    // Start position (left edge of leftmost card)
    const startX = centerX - (totalSpreadWidth / 2) - (cardWidth / 2);
    
    // Calculate spread angle - Adjusted for better appearance
    const totalAngle = 18; // Slightly reduced from 20 for less extreme fan
    const anglePerCard = totalAngle / (totalCards - 1 || 1);
    const startAngle = -totalAngle / 2;
    
    // Calculate position and rotation
    const horizontalPosition = startX + (index * spreadWidth);
    const cardAngle = startAngle + (index * anglePerCard);
    
    // Calculate Z rotation based on position from center
    const middleIndex = Math.floor(totalCards / 2);
    const distanceFromCenter = index - middleIndex;
    
    // Cards on the right rotate right, cards on the left rotate left
    // Reduced max rotation slightly for better visibility
    const maxZRotation = 15; // Reduced from 20
    const rotationZ = distanceFromCenter * (maxZRotation / middleIndex);
    
    return { 
      left: horizontalPosition,
      rotation: cardAngle,
      rotationZ: rotationZ
    };
  };

  useEffect(() => {
    // Debug function to verify paths
    console.log('Debug - Image Paths:');
    cardData.forEach((card, index) => {
      console.log(`Card ${index}: ${card.image}`);
    });
    
    // Reset state when component mounts
    setCardPositions([]);
    setInitialized(false);
    
    // Initial calculation and setup
    const calculateLayout = () => {
      if (!containerRef.current) return;
      
      // Calculate and set positions for all cards
      const newPositions = cardData.map((_, index) => getCardPosition(index));
      setCardPositions(newPositions);
      setInitialized(true);
    };

    // Calculate layout on mount and with delays to ensure DOM is fully rendered
    calculateLayout();
    const timer1 = setTimeout(calculateLayout, 100);
    const timer2 = setTimeout(calculateLayout, 500);
    
    // Handle window resize
    const handleResize = () => {
      setInitialized(false);
      setTimeout(calculateLayout, 100);
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [cardData.length]);

  // Handle mouse movement
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    
    // Calculate mouse position relative to container
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Update mouse position
    setMousePos({ x, y });
  };

  // Calculate distance from mouse to card center
  const getDistanceToCard = (index: number) => {
    if (!containerRef.current || cardPositions.length === 0) return Infinity;
    
    const cardWidth = 220;
    const position = cardPositions[index] || getCardPosition(index);
    const cardCenterX = position.left + cardWidth / 2;
    const containerHeight = containerRef.current.clientHeight;
    const cardCenterY = containerHeight / 2;
    
    const dx = mousePos.x - cardCenterX;
    const dy = mousePos.y - cardCenterY;
    
    return Math.sqrt(dx * dx + dy * dy);
  };

  // Calculate how much to lift card based on cursor proximity
  const getCardLift = (index: number) => {
    const distance = getDistanceToCard(index);
    const maxDistance = 180; // Reduced from 200 for more controlled effect range
    
    if (distance > maxDistance) return 0;
    
    // Simple linear relationship - closer means more lift
    const liftFactor = 1 - (distance / maxDistance);
    return Math.floor(liftFactor * 40); // Reduced from 50 for less dramatic lift
  };

  // Calculate horizontal shift to create isolation effect
  const getCardShift = (index: number) => {
    // Find the closest card to cursor
    let closestCard = null;
    let minDistance = Infinity;
    
    for (let i = 0; i < cardData.length; i++) {
      const distance = getDistanceToCard(i);
      if (distance < minDistance) {
        minDistance = distance;
        closestCard = i;
      }
    }
    
    // If no card is close to cursor or cursor isn't in the area, don't shift
    if (closestCard === null || minDistance > 180) { // Reduced from 200
      return 0;
    }
    
    // Direction to shift: away from closest card
    const direction = index < closestCard ? -1 : index > closestCard ? 1 : 0;
    
    // No shift if this is the closest card
    if (direction === 0) return 0;
    
    // Calculate distance from closest card
    const cardDistance = Math.abs(index - closestCard);
    
    // Less dramatic shift effect
    const baseShift = 200; // Reduced from 250 for less extreme spread
    
    // Calculate proximity factor - closer means more dramatic the effect
    const proximityFactor = Math.max(0, 1 - (minDistance / 180)); // Adjusted from 200
    
    // More controlled shift calculation for nearby cards
    const shift = baseShift * proximityFactor / (cardDistance * 0.4 + 0.3); // Adjusted factors
    
    // Apply more consistent but less extreme shifting
    const minShiftPerCard = 100 * proximityFactor; // Reduced from 120
    const dynamicShift = Math.max(shift, minShiftPerCard * cardDistance);
    
    return direction * Math.min(dynamicShift, baseShift);
  };

  // Handle card hover state
  const handleCardMouseEnter = (index: number) => {
    setHoveredCard(index);
  };
  
  const handleCardMouseLeave = () => {
    setHoveredCard(null);
  };
  
  // Handle mouse leaving the card area
  const handleContainerMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
    setHoveredCard(null);
  };

  return (
    <motion.div 
      className="home-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleContainerMouseLeave}
    >
      <div className="card-stack">
        {cardData.map((card, index) => {
          const position = initialized ? cardPositions[index] : getCardPosition(index);
          const lift = getCardLift(index);
          const shift = getCardShift(index);
          const isActive = hoveredCard === index;
          
          // Z-index: hovered card should be on top
          const zIndex = isActive ? 100 : cardData.length - index;
          
          // Use 0 rotationZ when card is hovered
          const rotationZ = isActive ? 0 : position.rotationZ;
          
          return (
            <Card
              key={index}
              title={card.title}
              routePath={card.path}
              color=""
              index={index}
              position={{ 
                x: position.left + shift, 
                y: lift 
              }}
              rotation={position.rotation}
              rotationZ={rotationZ}
              isActive={isActive}
              zIndex={zIndex}
              onMouseEnter={() => handleCardMouseEnter(index)}
              onMouseLeave={handleCardMouseLeave}
              cardImageUrl={card.image}
            />
          );
        })}
      </div>
    </motion.div>
  );
};

export default Home; 