import { delay, motion } from "framer-motion";
import { useState, useEffect } from "react";


import slideUpArrow from "../assets/slideUp2.png"; // Adjust path as needed


const swipeUpVariants = {
  animate: (delayOffset = 0) => ({
    y: [10, 0, 0],
    opacity: [0, 1, 0],
    transition: {
      type: "tween",
      duration: 1.5,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "loop",
      delay: delayOffset,
    },
  }),
};



export default function SwipeUpPrompt() {
    const [instruction, setInstruction] = useState("SCROLL");
    const [rotation, setRotation] = useState("0deg");

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    setInstruction(isTouch ? "SCORRI LENTAMENTE VERSO L'ALTO" : "SCORRI GIU'");
    setRotation(isTouch ? "0deg" : "180deg")
  }, []);
  return (
    <div className='relative top-[60vh] w-screen text-white font-ahero tracking-tight text-center flex flex-col items-center  z-99'>
      <motion.img
      style={{rotate:rotation}}
        custom={0.75} // top arrow starts later
        variants={swipeUpVariants}
        animate="animate"
        className = {`w-[75px] `}
        src={slideUpArrow}
        alt="Swipe Up Top"
      />
      <motion.img
      style={{rotate:rotation}}
        custom={0} // bottom arrow starts immediately
        variants={swipeUpVariants}
        animate="animate"
        className="w-[75px]"
        src={slideUpArrow}
        alt="Swipe Up Bottom"
      />
      <p className='pt-5 tracking-wider'>{instruction}</p>
      <p>PER INIZIARE</p>
    </div>
  );
}
