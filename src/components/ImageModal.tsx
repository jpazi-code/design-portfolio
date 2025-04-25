import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/ImageModal.css';

export interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  title: string;
  videoSrc?: string;
}

const ImageModal: React.FC<ImageModalProps> = ({ 
  isOpen, 
  onClose, 
  imageSrc, 
  title,
  videoSrc
}) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div 
            className="modal-content"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="modal-close" onClick={onClose}>×</button>
            
            {/* Never show title for videos, and optionally for images based on config */}
            {!videoSrc && <h3 className="modal-title">{title}</h3>}
            
            {videoSrc ? (
              <video 
                className="modal-video" 
                src={videoSrc} 
                controls 
                autoPlay
                poster={imageSrc}
              />
            ) : (
              <img className="modal-image" src={imageSrc} alt={title} />
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ImageModal; 