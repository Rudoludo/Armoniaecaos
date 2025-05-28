import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function ModalButton({
  isOpen,         // Prop: boolean to control modal visibility
  onClose,        // Prop: function to call when modal needs to close
  onButtonClick,  // Prop: function to call when the button inside the modal is clicked
  buttonText = "My Action Button" // Prop: text for the button
}) {
  const buttonRef = useRef(null); // Ref for the actual button
  const modalOverlayRef = useRef(null); // Ref for the semi-transparent overlay (the 'modal div')

  // Animation variants for the overlay
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  };

  // Animation variants for the button itself
  const buttonVariants = {
    hidden: { y: 50, opacity: 0 }, // Starts 50px below and transparent
    visible: { y: 0, opacity: 1, transition: { duration: 0.4, type: "spring", stiffness: 100, damping: 10 } },
    exit: { y: 50, opacity: 0, transition: { duration: 0.2 } },
  };

  // Click handler for the modal overlay
  const handleClickOutsideButton = useCallback((event) => {
    // If the click occurred within the modal overlay (modalOverlayRef.current)
    // BUT NOT within the button itself (buttonRef.current)
    if (modalOverlayRef.current && !buttonRef.current.contains(event.target)) {
      onClose(); // Close the modal
    }
  }, [onClose]); // Dependency: onClose should be stable

  // Effect to add/remove event listener when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutsideButton);
      // Optional: Add event listener for Escape key to close modal
      const handleEscape = (event) => {
        if (event.key === 'Escape') {
          onClose();
        }
      };
      document.addEventListener('keydown', handleEscape);

      return () => {
        document.removeEventListener('mousedown', handleClickOutsideButton);
        document.removeEventListener('keydown', handleEscape);
      };
    }
  }, [isOpen, handleClickOutsideButton, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={modalOverlayRef}
          className="fixed inset-0 bg-opacity-0 flex justify-center items-end p-4 z-9999" // Flexbox to center, items-end to bottom, padding for spacing
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.button
            ref={buttonRef}
            onClick={onButtonClick} // This is your custom function
            className=" text-white f py-3 px-6 rounded-lg shadow-xl text-lg border-white border-solid focus:ring-4  focus:ring-opacity-50 transition-colors duration-200"
            variants={buttonVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {buttonText}
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ModalButton;