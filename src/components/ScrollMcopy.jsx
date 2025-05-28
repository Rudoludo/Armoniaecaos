import React, { useRef, useState, useEffect } from 'react'
import { useScroll, useTransform, motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";

import Fede from './Fede';

import ShowTitle from './ShowTitle'
import Square from './Square';
import ShowInfo from './ShowInfo';
import Hero2 from './Hero2';

import cuoreSK from "../assets/cuoreSK.png";
import moon from "../assets/moon.png"
import tendaHalf from "../assets/creditsTendaHalf.png"
import attoZeroLogo from "../assets/attozero.png"
import peek from "../assets/peek3.png"
import tendaColor from "../assets/tendaColor.png"





export default function ScrollM() {
    const heroRef = useRef(null);
    const { scrollYProgress: rawHeroScroll } = useScroll({ target: heroRef, offset: ["start start", "end end"] });
    const heroScroll = useSpring(rawHeroScroll, {
        stiffness: 60,  // Lower stiffness makes it slower/softer to catch up
        damping: 20,    // Adjust for bounciness
        mass: 2         // Adjust for weight/feel
    });

    const [launchModal, setLaunchModal] = useState(false)
    const [backContent, setBackContent] = useState("")

    const modalControl = (content) => {
        setBackContent(content)
        setLaunchModal(!launchModal)

    }


    const heroCanvas = ['src/assets/blank.png', 'src/assets/eyeSk.png', 'src/assets/cuoreSK.png', 'src/assets/3.png', 'src/assets/4.png', 'src/assets/6.png', 'src/assets/5.png', 'src/assets/blank.png', 'src/assets/blank.png']
    const [currentIndex, setCurrentIndex] = useState(0);


    const storyRef = useRef(null);
    const showRef = useRef(null);
    const creditRef = useRef(null);
    const { scrollYProgress: storyScroll } = useScroll({ target: storyRef, offset: ["start start", "end end"] });
    const { scrollYProgress: showScroll } = useScroll({ target: showRef, offset: ["start start", "end end"] });
    const { scrollYProgress: creditScroll } = useScroll({ target: creditRef, offset: ["start start", "end end"] });




    const [totalScrollValue, setTotalScrollValue] = useState(0);
    const [scrollValue, setScrollValue] = useState(0);

    const [storyscrollValue, setStoryscrollValue] = useState(0);
    const [showscrollValue, setShowscrollValue] = useState(0);
    const [creditscrollValue, setCreditscrollValue] = useState(0);

    const [tracker, setTracker] = useState(0)




    useEffect(() => {
        return creditScroll.on("change", (v) => {
            setCreditscrollValue(v);
        });
    }, [creditscrollValue]);

    useEffect(() => {
        return showScroll.on("change", (v) => {
            setShowscrollValue(v);
            v > 0 && v < 1 ? setTracker(3) : null
        });
    }, [showScroll]);

    useEffect(() => {
        return heroScroll.on("change", (v) => {
            setScrollValue(v);
        });
    }, [heroScroll]);

    useEffect(() => {
        return storyScroll.on("change", (v) => {
            setStoryscrollValue(v);
        });
    }, [storyScroll]);



    const fixedSub1 = useTransform(
        storyScroll,
        [0, 0.38, 0.4],
        ["3vh", "3vh", "0vh"]
    );
    const fixedSub1V = useTransform(
        storyScroll,
        [0, 0.48, 0.5],
        ["0", "0", "1"]
    );
    const fixedSub1S = useTransform(
        storyScroll,
        [0, 0.5, 0.51],
        ["1", "1", "0"]
    );

    const fixedSub2 = useTransform(
        showScroll,
        [0, 0.38, 0.4],
        ["3vh", "3vh", "0vh"]
    );

    const logoShowHide = useTransform(
        showScroll,
        [0, 0.40, 0.42, 0.95, 0.96],
        ["4vh", "4vh", "0vh", "0vh", "4vh"]
    );

    const logoColorChange = useTransform(
        showScroll,
        [0, 0.94, 0.95],
        ["white", "white", "black"]
    );
    const logoColorChangeR = useTransform(
        showScroll,
        [0, 0.96, 0.98],
        ["black", "black", "white"]
    );

    const logoScale = useTransform(
        heroScroll,
        [0, 0.96, 1],
        ["0vh", "0vh", "10vh"]
    );

    const finalFade = useTransform(
        creditScroll,
        [0, 0.4, 0.42],
        [1, 1, 0]
    );


    //BIO


    const text2Reveal = useTransform(
        storyScroll,
        [0, 0.58, 0.64],
        ["0%", "0%", "50%"]
    );

    const text3Reveal = useTransform(
        storyScroll,
        [0, 0.68, 0.72],
        ["0%", "0%", "75%"]
    );

    const text4Reveal = useTransform(
        storyScroll,
        [0, 0.80, 0.86],
        ["0%", "0%", "100%"]
    );


    //show
    const heartOpacity = useTransform(
        showScroll,
        [0, 0.07, 0.15, 0.6, 0.75],
        [0, 0, 1, 1, 0]
    )


    const moonOpacity = useTransform(
        showScroll,
        [0, 0.65, 0.8],
        [0, 0, 1]
    )

    //credits

    const attoZero4Reveal = useTransform(
        creditScroll,
        [0, 0.50, 0.56],
        ["20vh", "20vh", "0vh"]
    );

    const tendaRevealRaw = useTransform(
        creditScroll,
        [0.25, 0.50, 0.56],
        ["20px", "-50px", "-50px"]
    );

    const tendaReveal = useSpring(tendaRevealRaw, {
        stiffness: 100, // Controls the "springiness"
        damping: 20,    // Controls how much it bounces
        mass: 1         // Adjust for feel, optional
    });











    return (
        <>
            <AnimatePresence mode="wait">

                {launchModal === true ? <ShowInfo isOpen={launchModal} contentKey={backContent} onClose={() => setLaunchModal(false)} /> : null}
            </AnimatePresence>

            <div className='main w-screen top-0 h-[800vh] '>
                <motion.div style={{ height: logoScale, color: logoColorChange }} className="fixed top-[16vh] w-screen z-[98] flex flex-row text-[6.5vh] text-white font-ahero tracking-wide text-center overflow-hidden ">
                    <div className='h-full w-[35vw]'></div>
                    <div className='flex flex-col w-[62vw]'>
                        {!launchModal ? <motion.p style={{ height: logoShowHide, color: logoColorChange, opacity: finalFade }} className="text-[3vh] h-[4vh] overflow-hidden text-white" >ARMONIA e CAOS</motion.p> : null}
                        <motion.h2 style={{ height: fixedSub1 }} className='relative font-ahero text-sm text-center leading-[3vh] min-w-[54px] tracking-tight overflow-hidden'>COMPAGNIA TEATRALE</motion.h2>
                        <motion.h2 style={{ opacity: fixedSub1V, height: fixedSub2 }} className='relative font-ahero text-sm text-center leading-[3vh] min-w-[54px] tracking-tight overflow-hidden'>BIO</motion.h2>

                    </div>


                </motion.div>

                <Hero2 storyScroll={storyScroll} heroRef={heroRef} heroScroll={heroScroll} />





                <div ref={storyRef} className='relative w-screen top-[-100vh] h-[300vh]  bg-storybg  z-3  '>
                    <div className='sticky top-0'>
                        <div className='h-screen font-hero  text-white relative top-0  flex flex-col align-middle justify-start pointer-events-auto z-3 '>
                            <div className='h-[26vh] w-screen'>
                                <div className='h-[16vh] w-[100%] flex justify-center'>

                                    <p className=' text-xs sm:text-sm  pr-[25%] pt-[8%] text-white w-[77%] min-w-[300px] max-w-[750px]  '>SIAMO UN COLLETTIVO DI ARTISTI MODENESI IMPEGNATO NEL MONDO DEL TEATRO, DANZA, MUSICA</p>
                                </div>
                                <div className='h-[4vh] w-[100%]'>

                                </div>

                                <div className='w-screen flex flex-row'>
                                    <div className='h-full w-[35vw]'></div>
                                    <div >
                                        <motion.h2 style={{ opacity: fixedSub1S }} className='w-[62vw] font-ahero text-sm text-center leading-[3vh] min-w-[54px] tracking-tight'>BIO</motion.h2>

                                    </div>

                                </div>
                            </div>
                            <Fede bioScroll={storyScroll} />
                            <div className='relative top-[-3vh] min-h-[27vh] flex flex-col justify-between items-center'>
                                <div>
                                    <motion.p style={{ height: text2Reveal }} className=' text-xs sm:text-sm pl-[20%] pt-0 text-white w-[90%] min-w-[325px] max-w-[700px] overflow-hidden'>VOGLIAMO CREARE SPETTACOLI TEATRALI IN GRADO DI RAPPRESENTARE LE NOSTRE IDEE ED EMOZIONI, </motion.p>

                                    <motion.p style={{ height: text3Reveal }} className=' text-xs sm:text-sm pl-[30%] pt-[2vh] text-white w-[90%] min-w-[325px] max-w-[800px] overflow-hidden'> CERCANDO SEMPRE DI MIGLIORARCI E PROPORRE QUALCOSA DI NUOVO NONOSTANTE LE RISORSE LIMITATE. </motion.p>


                                </div>

                                <div className=' text-xl p-2.5 text-white w-[100%] pt-[4%] pb-[5%] tracking-wide text-center'>
                                    <motion.p style={{ height: text4Reveal }} className=' overflow-hidden'>IL NOSTRO UNICO LIMITE E' L'IMMAGINAZIONE </motion.p>
                                </div>


                            </div>

                        </div>

                    </div>
                </div>

                <div className='absolute  w-screen top-[300vh] h-[300vh]  bg-white z-2' ref={showRef}>
                    <div className='sticky top-0 overflow-hidden'>
                        <motion.div style={{ opacity: heartOpacity }}>
                            <img src={cuoreSK} style={{
                                right: "-17vw",
                                opacity: 0.2,
                                scale: "1.5",
                            }}
                                className='absolute top-[8vh]   rotate-[-11deg]  '
                            />

                        </motion.div>
                        <motion.div style={{ opacity: moonOpacity }}>
                            <img src={moon} style={{
                                left: "-42vw",
                                opacity: 0.2,
                                scale: 1.5,
                            }}
                                className='absolute top-[8vh]   rotate-[-11deg]  '
                            />

                        </motion.div>

                        <div className=' h-screen relative top-0 pb-[2%] flex flex-col items-center align-middle justify-between pointer-events-auto z-3 '>

                            <div className='flex flex-col'>
                                <div className='h-[16vh] w-screen'>

                                </div>




                                <div className='flex flex-row'>
                                    <div className='w-[35vw] h-[10vh]'></div>

                                    <div className='w-[62vw] flex flex-col font-ahero text-sm text-center  min-w-[54px] ' >
                                        <motion.p style={{ color: logoColorChangeR }} className="text-[3vh] h-[4vh]  text-black font-ahero tracking-wider text-center" >ARMONIA e CAOS</motion.p>
                                        <ShowTitle showScroll={showScroll} order="1" caption="PROSSIMAMENTE" />
                                        <ShowTitle showScroll={showScroll} order="2" caption="SPETTACOLI PASSATI" />
                                    </div>

                                </div>



                            </div>


                            <div className=' text-[2.5vh]  text-right font-hero w-[55%]'>

                            </div>

                            <div className='flex flex-col h-[73vw] pb-3 gap-3.5 justify-end'>
                                <div className='upcoming flex flex-row  gap-3.5 h-[33vw] max-h-[250px]'>

                                    <Square showScroll={showScroll} onClick={() => modalControl("rincuorami")} order="1" showId="101" title="RINCUORAMI" />
                                    <Square showScroll={showScroll} onClick={() => modalControl("secret")} order="1" showId="110" title="SECRET PROJECT" />

                                </div>
                                <div className='legacy flex flex-row min-h-[16vh] gap-3.5'>
                                    <Square showScroll={showScroll} onClick={() => modalControl("fritta")} order="2" showId="102" title="FRITTA E' ANCHE BUONA LA LUNA" />
                                    <Square showScroll={showScroll} onClick={() => modalControl("beatrici")} order="2" showId="103" title="RIFLESSE NEL DESTINO" />



                                </div>
                            </div>


                        </div>
                    </div>
                </div>
                <div className='absolute  w-screen top-[500vh] h-[300vh] bg-storybg z-1' ref={creditRef} >
                    <div className='sticky top-0'>

                        <motion.img style={{ x: tendaReveal }} src={tendaColor}

                            className='absolute  top-0  h-[100vh] left-[-38px] z-4'
                        />

                        <motion.img  src={peek}

                            className='absolute  top-[41vh] h-[30vh] left-[10vh] scale-100 '
                        />

                        <div className=' h-screen relative top-0  pb-[2%] flex flex-col items-center align-middle pointer-events-auto z-3 '>
                            <div className='flex flex-col'>
                                <div className='h-[16vh] w-screen'>
                                    <div className='  font-hero  w-[100vw]  pl-[66vw] font-light text-xs text-right  p-3 text-white'>
                                        SASSUOLO, MODENA
                                    </div>

                                </div>



                                <div className='flex flex-row'>
                                    <div className='w-[35vw] h-[10vh]'>

                                    </div>

                                    <div className='w-[62vw] flex flex-col font-ahero text-sm text-center  min-w-[54px] ' >
                                        <p className="text-[3vh] h-[4vh]  text-white font-ahero tracking-wider text-center" >ARMONIA e CAOS</p>
                                        <div >
                                            <h2 className='w-[62vw] font-ahero text-sm text-white text-center leading-[3vh] min-w-[54px] tracking-tight'>CONTACTS</h2>

                                        </div>

                                    </div>

                                </div>



                            </div>
                            <div className='flex flex-col items-center align-middle justify-between h-[74vh]'>


                                <div className='flex flex-col w-screen'>
                                    <div className='pl-[35vw]'>
                                        <div className='p-3'>
                                            <p className='font-hero text-sm text-white'>INSTAGRAM </p>
                                            <a href="https://www.instagram.com/armoniaecaos__" target="_blank" rel="noopener noreferrer">
                                                <p className='font-hero text-sm text-white tracking-tight'>@ARMONIAECHAOS</p>
                                            </a>


                                        </div>
                                        <div className='p-3'>
                                            <p className='font-hero text-sm text-white'>E-MAIL </p>
                                            <p className='font-hero text-sm text-white tracking-tighter'>ARMONIAECHAOS@GMAIL.COM</p>

                                        </div>

                                        <div className='p-3'>
                                            <p className='font-hero text-sm text-white'>FOTOGRAFIE DI : </p>
                                            <a href="https://andreatombesi.wordpress.com/" target="_blank" rel="noopener noreferrer">
                                                <p className='font-hero text-sm text-white tracking-tight'>@ANDREA TOMBESI</p>
                                            </a>

                                        </div>






                                    </div>



                                </div>
                                <motion.div style={{ y: attoZero4Reveal }} className='flex flex-col justify-center items-center align-middle pb-4'>
                                    <p className='font-hero text-xs text-white p-3'>IN COLLABORAZIONE CON</p>
                                    <img className="w-[200px] " src={attoZeroLogo} />

                                </motion.div>

                            </div>


                        </div>
                    </div>
                </div>







            </div>
        </>

    )
}
