import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function DropdownActors({ actors, fotografo }) {
  const photo = fotografo
  console.log(photo)
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Define animation variants for height and opacity
  const variants = {
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1, height: 'auto', transition: { duration: 0.3, ease: "easeOut" } },
    exit: { opacity: 0, height: 0, transition: { duration: 0.2, ease: "easeOut" } },
  };

  return (
    // The parent div remains w-[50%] for its own flex context
    <div className="w-[65%] text-xs relative "> {/* Added relative for potential absolute positioning later if needed */}
      {/* Title/Toggle Button - NO BACKGROUND */}
      <button
        onClick={toggleDropdown}
        className="w-full text-sm flex items-center justify-between py-1 px-0 focus:outline-none  rounded-md" // Removed bg-gray classes, added focus styles
        aria-expanded={isOpen}
        aria-controls="actors-dropdown-content"
      >
        <p className="text-sm ">ATTORI:</p>
        {/* Simple arrow indicator for dropdown state */}
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-lg"
        >
          ▼
        </motion.span>
      </button>

      {/* Animated Dropdown Content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="actors-dropdown-content"
            className="bg-[#212121] text-white p-2 mt-1  overflow-hidden shadow-lg border-solid border-2 border-white " // Dark grey background, white text, more shadow
            style={{ minWidth: '200%' }} // At least 2x wider than its direct parent (w-[50%])
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {actors && actors.length > 0 ? (
              actors.map((name, index) => (
                <p key={index} className='text-xs sm:text-sm leading-tight mb-0.5 last:mb-0'>
                  {name}
                </p>
              ))
            ) : (
              <p className="text-xs sm:text-sm text-gray-400">Nessun attore disponibile</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      {!isOpen && <div><p className="text-sm ">FOTO:</p><p>{photo}</p></div>}
    </div>
  );
}

export default DropdownActors;