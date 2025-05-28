import React, { useRef, useState, useEffect } from 'react'
import { useScroll, useTransform, motion , useSpring} from "framer-motion";
import miniFritta2 from "../assets/square/miniFritta2.jpeg";
import miniRincuorami from "../assets/square/miniRincuorami.jpg";
import miniRiflesse from "../assets/square/miniRiflesse.jpeg";
import sfondo3 from "../assets/square/sfondo3.jpeg";

export default function Square({ showScroll, onClick, order , title ,showId }) {
        let item;

        const squares =  {
            "102":miniFritta2,
            "101":miniRincuorami,
            "103":miniRiflesse,
             "110":sfondo3   
        }       

        const size = "100%"

        const upcomingRaw = useTransform(
            showScroll,
            [0, 0.18, 0.25,0.65,0.72],
            ["0%", "0%", size, size, "0%"]
        )

        const upcoming = useSpring(upcomingRaw, {
            stiffness: 100, // Controls the "springiness"
            damping: 20,    // Controls how much it bounces
            mass: 1         // Adjust for feel, optional
        });
    
    
        const legacyRaw = useTransform(
            showScroll,
            [0, 0.68, 0.75],
            ["00%", "00%", size]

            
        )

        const legacy = useSpring(legacyRaw, {
            stiffness: 100, // Controls the "springiness"
            damping: 20,    // Controls how much it bounces
            mass: 1         // Adjust for feel, optional
        });

    if (order == "1"){
         item = upcoming
    } else {
        item = legacy
    }
    
    return (
        <motion.div 
        onClick={onClick} 
        className='  font-hero   right-7  w-[33vw] max-w-[250px] aspect-square bg-amber-950 text-white  ' 
        style={{ 
            height: item ,
            backgroundImage: `url(${squares[showId]})`,
            backgroundSize: 'cover',      
            backgroundPosition: 'center', 
            backgroundRepeat:'no-repeat'}}> 
            <p className='p-1 overflow-hidden'>
            {title}
                </p>

        </motion.div>
    )
}
