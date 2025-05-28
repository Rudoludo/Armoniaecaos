

import React, { useRef, useState, useEffect, forwardRef } from 'react'
import { useScroll, useTransform, motion, AnimatePresence, transform, useSpring, scale } from "framer-motion";
import FuzzyText from './FuzzyText';

import SwipeUp from './swipeUp';
import cuoreBW from "../assets/cuoreBW.png";
import star from "../assets/star.png";
import starry from "../assets/starry.png";
import people from "../assets/people.png";
import sipariofull from "../assets/sipariofull.png";





/* export default function Hero2({storyScroll, heroRef, heroScroll}) { */
const Hero2 = forwardRef(({ storyScroll, heroScroll, heroRef }, ref) => {

    









    const [scrollValue, setScrollValue] = useState(0);
    const [triggerDec, setTriggerDec] = useState(0)

    useEffect(() => {
        
        return heroScroll.on("change", (v) => {
            setScrollValue(v);
            if (v > 0.2) {
                setTriggerDec(1)
            }
        });
    }, [heroScroll]);

    
    const firstItemX = useTransform(
        heroScroll,
        [0, 0.15, 0.45, 0.5],
        ["100vw", "0vw", "0vw", "0vw"]
    );

    const secondItemX = useTransform(
        heroScroll,
        [0, 0.15, 0.20, 0.5],
        ["90vw", "90vw", "0vw", "0vw"]
    );

    const thirdItemX = useTransform(
        heroScroll,
        [0, 0.20, 0.30, 0.5],
        ["0vh", "0vh", "5vh", "5vh"]
    );


    const caosX = useTransform(
        heroScroll,
        [0, 0.28, 0.45, 0.50],
        ["116vw", "116vw", "-40vw", "-100vw"]
    );
    const caosXR = useTransform(
        heroScroll,
        [0, 0.28, 0.45, 0.50],
        ["-200vw", "-140vw", "16vw", "56vw"]
    );

    const caosOpacity = useTransform(
        heroScroll,
        [0, 0.28, 0.33, 0.45, 0.5],
        [0, 0, 1, 1, 0]
    );

    const cuoreOpacity = useTransform(
        heroScroll,
        [0, 0.28, 0.33, 0.52, 0.55],
        [0, 0, 1, 1, 0]
    );

    const subOpacity = useTransform(
        heroScroll,
        [0.50, 0.55, 0.64, 0.96, 1],
        [0, 1, 1, 0, 0]
    );

    const creareOpacity = useTransform(
        heroScroll,
        [0.50, 0.55, 0.85, 0.9, 1],
        [0, 1, 1, 0, 0]
    );

    const subOpacity2 = useTransform(
        heroScroll,
        [0.61, 0.65, 0.86, 0.92, 1],
        [0, 1, 1, 0, 0]
    );

    const skyRotateRaw = useTransform(
        heroScroll,
        [0.50, 0.52],
        ["-40deg", "-10deg"]
    );
    const skyScaleRaw = useTransform(
        heroScroll,
        [0.49, 0.52],
        ["1", "2"]
    );

    const skyRotate = useSpring(skyRotateRaw, {
        stiffness: 100, // Controls the "springiness"
        damping: 20,    // Controls how much it bounces
        mass: 1         // Adjust for feel, optional
    });


    const skyScale = useSpring(skyScaleRaw, {
        stiffness: 100, // Controls the "springiness"
        damping: 20,    // Controls how much it bounces
        mass: 1         // Adjust for feel, optional
    });


    const antiOpacity = useTransform(
        heroScroll,
        [0.34, 0.38, 0.84],
        [1, 0, 0]
    );

    
    const cosmoScale = useTransform(
        heroScroll,
        [0, 0.31, 0.38, 0.42, 0.49, 0.55, 1],
        [2, 2, 4, 2, 4, 0, 0]
    );


    const rotateVariants = {
        animate: {
            rotate: 360,
            transition: {
                repeat: Infinity,
                duration: 50,
                ease: "linear"
            }
        }
    };

    const scaleRotateVariants = {
        animate: {
            rotate: 360,
            scale: [1, 1.3, 1], // Pulsing effect
            transition: {
                rotate: {
                    repeat: Infinity,
                    duration: 50,
                    ease: "linear",
                },
                scale: {
                    repeat: Infinity,
                    duration: 2, // Adjust for pulse speed
                    ease: "easeInOut",
                },
            },
        },
    };

    const swipeUpOpacity = useTransform(
        heroScroll,
        [0, 0.02, 0.05],
        [1, 1, 0]
    );

    //people

    const peopleYRaw = useTransform(
        heroScroll,
        [0, 0.47, 0.53, 1],
        ["20vh", "20vh", "0vh", "0vh"]
    );
    const peopleY = useSpring(peopleYRaw, {
        stiffness: 100, // Controls the "springiness"
        damping: 20,    // Controls how much it bounces
        mass: 1         // Adjust for feel, optional
    });

    //stella 

    const stellaOpacity = useTransform(
        heroScroll,
        [0.6, 0.65, 0.91, 1],
        [0, 1, 1, 0]
    );

    // stellacheDanzi

    const danziYRaw = useTransform(
        heroScroll,
        [0, 0.53, 0.65, 1],
        ["20vh", "20vh", "0vh", "0vh"]
    );
    const danziY = useSpring(danziYRaw, {
        stiffness: 100, // Controls the "springiness"
        damping: 20,    // Controls how much it bounces
        mass: 1         // Adjust for feel, optional
    });

    //siparopacity

    const siparioOpacity = useTransform(
        storyScroll,
        [0.00, 0.01, 0.5, 0.55],
        [0, 1, 1, 0]
    );



    return (

        <motion.div ref={heroRef} className=' relative w-screen top-0 h-[200vh] z-5 bg-black ' /* style={{ backgroundColor: bgColor }} */>
            <div className='sticky top-0 h-screen overflow-hidden'>

                {scrollValue > 0.28 & scrollValue < 0.55 ?
                    <motion.img src={cuoreBW} variants={rotateVariants}
                        animate={"animate"} style={{ scale: cosmoScale, opacity: cuoreOpacity }}
                        className='absolute top-0  left-[30%] rotate-[-11deg]'
                    /> : null}

                {scrollValue > 0.51 & scrollValue < 0.98 ?
                    <motion.img src={star} variants={scaleRotateVariants}
                        animate="animate" style={{ opacity: stellaOpacity }}
                        className='absolute top-0  left-[30%] rotate-[-11deg] z-10 scale-200'
                    /> : null}

                <motion.img src={starry}
                    style={{ opacity: subOpacity, rotate: skyRotate, scale: skyScale }}
                    className='absolute  z-4'
                />
                <motion.img src={people}
                    style={{ opacity: subOpacity, y: peopleY }}
                    className='absolute  top-[75vh] scale-300'
                />

                {scrollValue < 0.06 ?
                <motion.div style={{ opacity: swipeUpOpacity }}>
                    <div className='absolute top-[30vh] w-screen  text-white font-ahero tracking-normal text-center'>
                        <p>COMPAGNIA TEATRALE </p>
                        <p className='tracking-widest'>ARMONIA E CAOS</p>
                        <p className='text-xs'> DAL 2013</p>
                        <p> Sassuolo (MO)</p>
                    </div>
                    <SwipeUp />

                </motion.div> : null }



                <div className='absolute top-0   h-screen w-screen'>
                    <div className='h-[21vh] w-screen font-ahero text-white'>
                        <div className='h-[21vh]'></div>
                    </div>

                    {scrollValue < 0.51 ? <div>
                        <motion.div style={{ opacity: antiOpacity }} className='w-[100vw]  flex flex-col justify-center font-ahero text-mywhite text-6xl'>

                            <div className='flex flex-col justify-around'>
                                <div className='h-[12vh]'></div>
                                <motion.h1 style={{ x: firstItemX }} className='font-ahero text-white text-6xl h-[33%] pl-[10%] tracking-wider'>BISOGNA  </motion.h1>
                                <motion.h1 style={{ x: secondItemX }} className='font-ahero text-white text-5xl h-[33%] w-[150%]  pl-[15%] tracking-wider'> AVERE IN SE'</motion.h1>
                                <div className='font-ahero text-white text-4xl h-[33%] w-[150%]  pl-[20%] tracking-wider overflow-hidden'>
                                    <motion.h1 className="overflow-hidden" style={{ height: thirdItemX }} >  IL </motion.h1>
                                </div>

                            </div>


                        </motion.div>
                        <div className="flex flex-col items-center justify-center  relative top-[-4vh]  " >
                            <motion.div style={{ opacity: caosOpacity }}  >
                                <FuzzyText baseIntensity={0.2} fontSize={"20vh"}  >
                                    CAOS
                                </FuzzyText>

                            </motion.div>

                            <div>
                                <motion.div style={{ opacity: caosOpacity, x: caosX }} >

                                    <FuzzyText baseIntensity={1.5} fontSize={"50vh"}>
                                        CAOS
                                    </FuzzyText>

                                </motion.div>

                                <motion.div style={{ opacity: caosOpacity, x: caosXR , y:"-88vh"}} >

                                    <FuzzyText baseIntensity={1.5} fontSize={"50vh"}>
                                        CAOS
                                    </FuzzyText>

                                </motion.div>




                            </div>




                        </div>
                    </div> : null}


                    <div className='w-[100vw] h-[32vh]'>
                        <div className='h-[20vh]'></div>
                        <motion.h1 style={{ opacity: creareOpacity, y: peopleY }} className='font-ahero text-mywhite text-2xl  text-center tracking-wider'> PER CREARE </motion.h1>
                        <motion.h1 style={{ opacity: subOpacity2, y: danziY }} className='font-ahero text-mywhite text-5xl  text-center tracking-wider'>  UNA STELLA CHE DANZI</motion.h1>




                    </div>


                    {/* SIPARIO ONLY ON MOBILE? */}
                    <div className='w-[100vw] h-[47vh] flex flex-col justify-end '>
                        <motion.div style={{ opacity: siparioOpacity ,backgroundImage:`url(${sipariofull})`, backgroundSize: 'contain',  }} className='w-screen h-[24vh] bg-storybg'>
                            

                        </motion.div>

                    </div>



                </div>
            </div>
        </motion.div>


    )
});

export default Hero2;
