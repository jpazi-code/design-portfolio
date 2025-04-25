import { motion } from 'framer-motion';
import React, { useEffect } from 'react';
import '../styles/ImageModal.css';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoSrc: string;
  title: string;
}

const VideoModal: React.FC<VideoModalProps> = ({ isOpen, onClose, videoSrc, title }) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    // Prevent body scrolling when modal is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }

    window.addEventListener('keydown', handleEscape);
    return () => {
      window.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'auto';
    };
  }, [onClose, isOpen]);

  if (!isOpen) return null;

  return (
    <motion.div 
      className="modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
    >
      <motion.div 
        className="modal-content video-modal-content"
        initial={{ scale: 0.8, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ 
          type: 'spring', 
          damping: 25,
          stiffness: 300
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose}>×</button>
        <div className="modal-video-container">
          <video 
            src={videoSrc} 
            controls 
            className="modal-video"
            autoPlay
            controlsList="nodownload"
          >
            Your browser does not support the video tag.
          </video>
        </div>
        <h3 className="modal-title">{title}</h3>
      </motion.div>
    </motion.div>
  );
};

export default VideoModal; 