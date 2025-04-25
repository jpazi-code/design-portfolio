import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import ImageModal from '../components/ImageModal';
import { illustrationsGallery } from '../data/galleryData';
import { getImagesFromPublicDirectory } from '../utils/fileUtils';
import '../styles/FloatingIllustrations.css';
import PageHeader from '../components/PageHeader';

interface FloatingItem {
  id: number;
  title: string;
  imageSrc: string;
  initialPosition: { x: number; y: number };
  currentPosition: { x: number; y: number };
  velocity?: { x: number; y: number };
  rotation: number;
}

// Force field parameters - reduced strength for smoother interactions
const FORCE_FIELD_RADIUS = 200;
const REPULSION_STRENGTH = 0.8; // Significantly reduced for smoother movement
const MINIMUM_DISTANCE = 120;
const VELOCITY_DAMPING = 0.9; // Damping factor for velocity

const IllustrationsPage: React.FC = () => {
  const [items, setItems] = useState<FloatingItem[]>([]);
  const [selectedImage, setSelectedImage] = useState<{ id: number; title: string; imageSrc: string } | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Reference to hold the current positions of all items
  const itemPositionsRef = useRef<Map<number, { x: number, y: number, vx?: number, vy?: number }>>(new Map());
  
  // Container boundaries
  const containerBoundsRef = useRef({ 
    width: 0, 
    height: 0,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  });
  
  // Reference to track if animation frame is already scheduled
  const animationFrameRef = useRef<number | null>(null);
  
  // Update container boundaries when needed
  const updateContainerBounds = () => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      containerBoundsRef.current = {
        width: rect.width,
        height: rect.height,
        top: rect.top,
        left: rect.left,
        right: rect.right,
        bottom: rect.bottom
      };
    }
  };
  
  // Ensure position stays within container bounds
  const keepWithinBounds = (position: { x: number, y: number }, itemSize: number = 100): { x: number, y: number } => {
    const halfItem = itemSize / 2;
    const bounds = containerBoundsRef.current;
    const halfWidth = bounds.width / 2;
    const halfHeight = bounds.height / 2;
    
    // Apply padding to keep items fully visible
    const padding = 20;
    
    return {
      x: Math.max(-halfWidth + halfItem + padding, Math.min(halfWidth - halfItem - padding, position.x)),
      y: Math.max(-halfHeight + halfItem + padding, Math.min(halfHeight - halfItem - padding, position.y))
    };
  };
  
  // Update all items with physics in a single animation frame
  const updateAllItemsWithPhysics = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    
    // Schedule the update for the next animation frame for smoother rendering
    animationFrameRef.current = requestAnimationFrame(() => {
      animationFrameRef.current = null;
      
      // Skip if no items
      if (itemPositionsRef.current.size === 0) return;
      
      // Create a copy of all current positions
      const positions = new Map(itemPositionsRef.current);
      
      // Calculate forces for all pairs of items
      const forces = new Map<number, { fx: number, fy: number }>();
      
      // Initialize forces
      positions.forEach((_, id) => {
        forces.set(id, { fx: 0, fy: 0 });
      });
      
      // Calculate repulsion forces between all pairs
      const ids = Array.from(positions.keys());
      for (let i = 0; i < ids.length; i++) {
        const id1 = ids[i];
        const pos1 = positions.get(id1);
        if (!pos1) continue;
        
        for (let j = i + 1; j < ids.length; j++) {
          const id2 = ids[j];
          const pos2 = positions.get(id2);
          if (!pos2) continue;
          
          // Calculate distance
          const dx = pos1.x - pos2.x;
          const dy = pos1.y - pos2.y;
          const distanceSquared = dx * dx + dy * dy;
          const distance = Math.sqrt(distanceSquared);
          
          // Apply force if within force field radius
          if (distance < FORCE_FIELD_RADIUS) {
            const forceMagnitude = 
              (FORCE_FIELD_RADIUS - distance) / FORCE_FIELD_RADIUS * 
              REPULSION_STRENGTH * 
              (distance < MINIMUM_DISTANCE ? 2 : 1); // Extra force if too close
              
            // Normalize direction
            const nx = dx / distance;
            const ny = dy / distance;
            
            // Force components
            const fx = nx * forceMagnitude;
            const fy = ny * forceMagnitude;
            
            // Apply to first item (push away)
            const force1 = forces.get(id1);
            if (force1) {
              force1.fx += fx;
              force1.fy += fy;
            }
            
            // Apply to second item (push away in opposite direction)
            const force2 = forces.get(id2);
            if (force2) {
              force2.fx -= fx;
              force2.fy -= fy;
            }
          }
        }
      }
      
      // Calculate new positions based on forces and current velocities
      const newPositions: { id: number, position: { x: number, y: number }, velocity: { x: number, y: number } }[] = [];
      
      positions.forEach((pos, id) => {
        const force = forces.get(id);
        if (!force) return;
        
        // Get current velocity or initialize
        const vx = pos.vx || 0;
        const vy = pos.vy || 0;
        
        // Apply force to velocity with damping
        const newVx = (vx + force.fx) * VELOCITY_DAMPING;
        const newVy = (vy + force.fy) * VELOCITY_DAMPING;
        
        // Apply velocity to position
        const newX = pos.x + newVx;
        const newY = pos.y + newVy;
        
        // Keep within bounds
        const boundedPosition = keepWithinBounds({ x: newX, y: newY });
        
        // Add to update list
        newPositions.push({ 
          id, 
          position: boundedPosition, 
          velocity: { x: newVx, y: newVy }
        });
        
        // Update position map
        itemPositionsRef.current.set(id, { 
          x: boundedPosition.x, 
          y: boundedPosition.y,
          vx: newVx,
          vy: newVy
        });
      });
      
      // Update all items at once
      if (newPositions.length > 0) {
        setItems(prevItems => {
          return prevItems.map(item => {
            const update = newPositions.find(p => p.id === item.id);
            if (update) {
              return {
                ...item,
                currentPosition: update.position,
                velocity: update.velocity
              };
            }
            return item;
          });
        });
      }
    });
  };
  
  // Function to update an item's position and trigger reactions
  const updateItemPosition = (id: number, position: { x: number, y: number }) => {
    // Only update if position actually changed
    const currentPos = itemPositionsRef.current.get(id);
    if (currentPos && 
        Math.abs(currentPos.x - position.x) < 0.1 && 
        Math.abs(currentPos.y - position.y) < 0.1) {
      return; // No significant change, skip update
    }
    
    // Keep position within container bounds
    const boundedPosition = keepWithinBounds(position);
    
    // Update position and velocity in the reference map
    // Calculate velocity based on position change
    const vx = currentPos ? (boundedPosition.x - currentPos.x) * 0.5 : 0;
    const vy = currentPos ? (boundedPosition.y - currentPos.y) * 0.5 : 0;
    
    itemPositionsRef.current.set(id, { 
      x: boundedPosition.x, 
      y: boundedPosition.y,
      vx,
      vy
    });
    
    // Schedule physics update
    updateAllItemsWithPhysics();
  };
  
  useEffect(() => {
    // Update container bounds on mount and window resize
    updateContainerBounds();
    
    const handleResize = () => {
      updateContainerBounds();
    };
    
    window.addEventListener('resize', handleResize);
    
    // Function to load illustrations from the public directory
    const loadIllustrations = async () => {
      try {
        setLoading(true);
        
        // Load images dynamically from /illustrations folder
        const dynamicIllustrations = await getImagesFromPublicDirectory('/illustrations');
        
        // Fall back to static data if no images found
        const galleryData = dynamicIllustrations.length > 0 
          ? dynamicIllustrations 
          : illustrationsGallery;
        
        // Wait for container to be mounted and sized before positioning items
        if (!containerRef.current) {
          // If container not ready, retry after a short delay
          setTimeout(loadIllustrations, 100);
          return;
        }
        
        // Update container bounds
        updateContainerBounds();
        const bounds = containerBoundsRef.current;
        
        // Calculate safe area considering the illustration size
        const safeWidth = bounds.width * 0.7;
        const safeHeight = bounds.height * 0.7;
        
        // Apply enhanced force field to prevent overlap
        const applyForceField = (positions: Array<{x: number, y: number}>, index: number, newX: number, newY: number): {x: number, y: number} => {
          // Start with the proposed position
          let finalX = newX;
          let finalY = newY;
          let attempts = 0;
          const maxAttempts = 50; // More attempts to find a good position
          
          // Loop until we find a good position or max attempts
          while (attempts < maxAttempts) {
            let hasTooCloseItem = false;
            
            // Check distance to all existing positions
            for (let i = 0; i < index; i++) {
              const otherPos = positions[i];
              
              // Calculate distance between points
              const dx = finalX - otherPos.x;
              const dy = finalY - otherPos.y;
              const distance = Math.sqrt(dx * dx + dy * dy);
              
              // If too close, apply repulsion and mark as needing another attempt
              if (distance < MINIMUM_DISTANCE) {
                hasTooCloseItem = true;
                
                // Calculate normalized direction vector
                const angle = Math.atan2(dy, dx);
                
                // Apply repulsion with a smoother, more gradual effect
                const repulsionStrength = (MINIMUM_DISTANCE - distance) / MINIMUM_DISTANCE * REPULSION_STRENGTH;
                
                finalX += Math.cos(angle) * repulsionStrength * 50;
                finalY += Math.sin(angle) * repulsionStrength * 50;
                
                // Keep within safe bounds
                const halfWidth = safeWidth / 2;
                const halfHeight = safeHeight / 2;
                finalX = Math.max(-halfWidth, Math.min(halfWidth, finalX));
                finalY = Math.max(-halfHeight, Math.min(halfHeight, finalY));
                
                break; // Try with the new position
              }
            }
            
            // If no items were too close, we found a good position
            if (!hasTooCloseItem) break;
            
            attempts++;
          }
          
          return { x: finalX, y: finalY };
        };
        
        // Store positions to avoid overlap
        const positions: Array<{x: number, y: number}> = [];
        
        // Initialize floating items with positions safely inside container
        const newItems = galleryData.map((item, index) => {
          // Initial random position
          let x = (Math.random() - 0.5) * safeWidth;
          let y = (Math.random() - 0.5) * safeHeight;
          
          // Apply force field from existing items
          const { x: adjustedX, y: adjustedY } = applyForceField(positions, index, x, y);
          x = adjustedX;
          y = adjustedY;
          
          // Ensure position is within bounds
          const boundedPosition = keepWithinBounds({ x, y });
          x = boundedPosition.x;
          y = boundedPosition.y;
          
          // Remember this position to avoid future overlap
          positions.push({ x, y });
          
          // More subtle rotation
          const rotation = (Math.random() - 0.5) * 15;
          
          // Initialize the position in our reference map
          itemPositionsRef.current.set(item.id, { 
            x, 
            y,
            vx: 0,
            vy: 0
          });
          
          return {
            id: item.id,
            title: item.title,
            imageSrc: item.imageSrc,
            initialPosition: { x, y },
            currentPosition: { x, y },
            velocity: { x: 0, y: 0 },
            rotation
          };
        });
        
        setItems(newItems);
        
        // Much gentler and less frequent random movements
        const forceFieldInterval = setInterval(() => {
          // Only apply occasional very subtle movements
          if (itemPositionsRef.current.size > 0 && Math.random() > 0.8) { // Only 20% chance
            // Pick a random item
            const itemIds = Array.from(itemPositionsRef.current.keys());
            const randomId = itemIds[Math.floor(Math.random() * itemIds.length)];
            const position = itemPositionsRef.current.get(randomId);
            
            if (position) {
              // Much smaller jitter
              const jitter = (Math.random() * 0.4 - 0.2); // Very small range
              const newPos = { 
                x: position.x + jitter, 
                y: position.y + jitter 
              };
              
              // Update position and trigger physics
              updateItemPosition(randomId, newPos);
            }
          }
        }, 3000); // Even less frequent updates (3 seconds)
        
        return () => {
          clearInterval(forceFieldInterval);
          window.removeEventListener('resize', handleResize);
        };
      } catch (error) {
        console.error('Error loading illustrations:', error);
        // Fallback to static data on error
        if (containerRef.current) {
          updateContainerBounds();
          const bounds = containerBoundsRef.current;
          const safeWidth = bounds.width * 0.5;
          const safeHeight = bounds.height * 0.5;
          
          setItems(illustrationsGallery.map((item) => {
            const x = (Math.random() - 0.5) * safeWidth;
            const y = (Math.random() - 0.5) * safeHeight;
            const boundedPosition = keepWithinBounds({ x, y });
            const rotation = (Math.random() - 0.5) * 15;
            
            // Initialize the position in our reference map
            itemPositionsRef.current.set(item.id, { 
              x: boundedPosition.x, 
              y: boundedPosition.y,
              vx: 0,
              vy: 0
            });
            
            return {
              id: item.id,
              title: item.title,
              imageSrc: item.imageSrc,
              initialPosition: boundedPosition,
              currentPosition: boundedPosition,
              velocity: { x: 0, y: 0 },
              rotation
            };
          }));
        }
      } finally {
        setLoading(false);
      }
    };
    
    loadIllustrations();
    
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);
  
  const openModal = (item: { id: number; title: string; imageSrc: string }) => {
    setSelectedImage(item);
    setModalOpen(true);
  };
  
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="floating-illustrations-container">
      <PageHeader title="Sticker Illustrations" showWorksLink={false} />
      
      <div className="illustrations-arena" ref={containerRef}>
        {loading ? (
          <div className="loading-indicator">Loading illustrations...</div>
        ) : items.length === 0 ? (
          <div className="no-illustrations">No illustrations found</div>
        ) : (
          items.map((item) => (
            <DraggableIllustration 
              key={item.id} 
              item={item} 
              onDoubleClick={() => openModal(item)}
              containerRef={containerRef}
              updatePosition={updateItemPosition}
              keepWithinBounds={keepWithinBounds}
            />
          ))
        )}
      </div>
      
      {selectedImage && (
        <ImageModal
          isOpen={modalOpen}
          onClose={closeModal}
          imageSrc={selectedImage.imageSrc}
          title={selectedImage.title}
        />
      )}
      
      <div className="instructions">
        <p>Drag illustrations around or double-click to view larger</p>
      </div>
    </div>
  );
};

interface DraggableIllustrationProps {
  item: FloatingItem;
  onDoubleClick: () => void;
  containerRef: React.RefObject<HTMLDivElement | null>;
  updatePosition: (id: number, position: { x: number, y: number }) => void;
  keepWithinBounds: (position: { x: number, y: number }, itemSize?: number) => { x: number, y: number };
}

const DraggableIllustration: React.FC<DraggableIllustrationProps> = ({ 
  item, 
  onDoubleClick,
  containerRef,
  updatePosition,
  keepWithinBounds
}) => {
  // Use springs for all motion values for smoother animations
  const x = useSpring(item.currentPosition.x, {
    stiffness: 100,  // Lower stiffness for smoother motion
    damping: 15,     // Higher damping to reduce oscillation
    mass: 1.2        // Slightly higher mass for more inertia
  });
  
  const y = useSpring(item.currentPosition.y, {
    stiffness: 100,
    damping: 15,
    mass: 1.2
  });
  
  const rotate = useSpring(item.rotation, {
    stiffness: 70,
    damping: 12,
    mass: 1
  });
  
  // Create a reference to track if we're dragging
  const isDragging = useRef(false);
  const dragStartPosition = useRef({ x: 0, y: 0 });
  
  // Calculate the constraints to keep illustrations within container
  const [constraints, setConstraints] = useState({ top: 0, left: 0, right: 0, bottom: 0 });
  const illustrationRef = useRef<HTMLDivElement>(null);
  
  // Update position whenever x or y changes, but with throttling for smoother updates
  useEffect(() => {
    let lastUpdate = 0;
    const throttleTime = 100; // More aggressive throttling for smoother updates
    
    const updateWithThrottle = (newX: number, newY: number) => {
      const now = Date.now();
      if (now - lastUpdate > throttleTime || isDragging.current) {
        lastUpdate = now;
        // Keep position in bounds
        const boundedPosition = keepWithinBounds({ x: newX, y: newY }, illustrationRef.current?.offsetWidth || 100);
        updatePosition(item.id, boundedPosition);
      }
    };
    
    const unsubscribeX = x.onChange((newX) => {
      if (isDragging.current) {
        const currentY = y.get();
        updateWithThrottle(newX, currentY);
      }
    });
    
    const unsubscribeY = y.onChange((newY) => {
      if (isDragging.current) {
        const currentX = x.get();
        updateWithThrottle(currentX, newY);
      }
    });
    
    return () => {
      unsubscribeX();
      unsubscribeY();
    };
  }, [item.id, x, y, updatePosition, keepWithinBounds]);
  
  // Update position from props changes
  useEffect(() => {
    if (!isDragging.current) {
      // Only update from props when not dragging
      x.set(item.currentPosition.x);
      y.set(item.currentPosition.y);
    }
  }, [item.currentPosition.x, item.currentPosition.y, x, y]);
  
  useEffect(() => {
    // Ensure both container and illustration are mounted
    if (containerRef.current && illustrationRef.current) {
      const updateConstraints = () => {
        const container = containerRef.current?.getBoundingClientRect();
        const illustration = illustrationRef.current?.getBoundingClientRect();
        
        if (!container || !illustration) return;
        
        // Set constraints with a safety margin to keep illustrations fully in view
        const safetyMargin = 20;
        setConstraints({
          top: -container.height / 2 + illustration.height / 2 + safetyMargin,
          left: -container.width / 2 + illustration.width / 2 + safetyMargin,
          right: container.width / 2 - illustration.width / 2 - safetyMargin,
          bottom: container.height / 2 - illustration.height / 2 - safetyMargin
        });
      };
      
      // Update constraints initially
      updateConstraints();
      
      // Update constraints on window resize
      window.addEventListener('resize', updateConstraints);
      return () => window.removeEventListener('resize', updateConstraints);
    }
  }, [containerRef]);
  
  // Track drag start position for rotation calculation
  const onDragStart = () => {
    isDragging.current = true;
    dragStartPosition.current = { x: x.get(), y: y.get() };
  };
  
  // Apply rotation based on drag direction
  const onDrag = (event: any, info: any) => {
    if (!isDragging.current) return;
    
    // Calculate drag angle and distance for realistic rotation
    const dragX = x.get() - dragStartPosition.current.x;
    
    // Calculate rotation based on horizontal drag
    const newRotation = item.rotation + (dragX * 0.02); // Further reduced for smoother rotation
    
    // Apply rotation with limits
    const clampedRotation = Math.max(-15, Math.min(15, newRotation));
    rotate.set(clampedRotation);
    
    // The position updates through the onChange handlers will trigger the forcefield
  };
  
  const onDragEnd = () => {
    // Set the final position after drag
    const boundedPosition = keepWithinBounds(
      { x: x.get(), y: y.get() }, 
      illustrationRef.current?.offsetWidth || 100
    );
    updatePosition(item.id, boundedPosition);
    
    // Mark as no longer dragging
    isDragging.current = false;
  };

  return (
    <motion.div
      ref={illustrationRef}
      className="floating-illustration"
      initial={{ 
        x: item.initialPosition.x, 
        y: item.initialPosition.y,
        rotate: item.rotation,
        opacity: 0
      }}
      animate={{ 
        opacity: 1,
        transition: { duration: 0.8 }
      }}
      whileHover={{ 
        scale: 1.05,
        transition: { duration: 0.3 } 
      }}
      drag
      dragTransition={{ 
        bounceStiffness: 200,
        bounceDamping: 50, // Higher damping for much less oscillation
        power: 0.3, // Lower power for smoother drag
        timeConstant: 550 // Much higher time constant for very smooth motion
      }}
      dragElastic={0.05} // Almost no elasticity for precise movement
      dragConstraints={constraints}
      dragMomentum={true}
      onDragStart={onDragStart}
      onDrag={onDrag}
      onDragEnd={onDragEnd}
      style={{ 
        x, 
        y, 
        rotate,
        transformOrigin: 'center center'
      }}
      onDoubleClick={onDoubleClick}
    >
      <img src={item.imageSrc} alt={item.title} />
    </motion.div>
  );
};

export default IllustrationsPage; 