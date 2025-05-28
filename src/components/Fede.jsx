import React, { useRef, useState, useEffect } from 'react'
import { useScroll, useTransform, motion } from "framer-motion";
import f1 from "../assets/fede/1.png";
import f2 from "../assets/fede/2.png";
import f3 from "../assets/fede/3.png";
import f4 from "../assets/fede/4.png";
import f5 from "../assets/fede/5.png";
import f6 from "../assets/fede/6.png";
import f7 from "../assets/fede/7.png";

export default function Fede({bioScroll}) {
 
const [currentIndex, setCurrentIndex] = useState(0);

  const heroFede = [f1,f2,f3,f4,f5,f6,f7]
  
  
  useEffect(() => {
      const unsubscribe = bioScroll.onChange(value => {
        const segmentSize = 1 / heroFede.length
        const imageIndex = Math.min(
          Math.floor(value / segmentSize),
          heroFede.length - 1
        )
        setCurrentIndex(imageIndex);
      })
      return () => unsubscribe();
    }, [])

    return (
        
          <div className='flex items-center justify-center  '>
      {/* Sticky container in center of viewport */}
      <div className="max-h-[48vh] w-[512px] max-w-[100vw] aspect-square min-w-[320px]">
        {/* Absolute image stack */}
        <div className="relative w-full h-full">
          {heroFede.map((src, index) => (
            <motion.img
              key={src}
              src={src}
              alt={`fall ${index + 1}`}
              className="absolute inset-0 w-full h-full object-contain"
              style={{
                opacity: currentIndex === index ? 1 : 0,
                transition: 'opacity 0.5s ease-in-out',
              }}
            />
          ))}
        </div>
      </div>
      </div>
    
      )
}