import React, { useEffect, useState } from 'react'
import { AnimatePresence, easeIn, motion } from 'framer-motion'
import DropdownActors from './DropdownActors';
import Slider from './Slider2';
import ModalButton from './ModalButton';
import rincuorami1 from "../assets/rincuorami/1.jpeg";
import rincuorami2 from "../assets/rincuorami/2.jpeg";
import rincuorami3 from "../assets/rincuorami/3.jpeg";
import rincuorami4 from "../assets/rincuorami/4.jpeg";
import rincuorami5 from "../assets/rincuorami/5.jpeg";
import rincuorami6 from "../assets/rincuorami/6.jpeg";
import fritta1 from "../assets/fritta/1.jpeg";
import fritta2 from "../assets/fritta/2.jpeg";
import fritta3 from "../assets/fritta/3.jpeg";
import fritta4 from "../assets/fritta/4.jpeg";
import fritta5 from "../assets/fritta/7.jpeg";
import fritta6 from "../assets/fritta/7.jpeg";

import secret1 from "../assets/secret/secret1.jpeg";
import secret2 from "../assets/secret/secret2.jpeg";
import secret3 from "../assets/secret/secret3.jpeg";
import secret4 from "../assets/secret/secret4.jpeg";

import riflesse2 from "../assets/riflesse/2.jpeg";
import riflesse3 from "../assets/riflesse/3.jpeg";
import riflesse4 from "../assets/riflesse/4.jpeg";
import riflesse5 from "../assets/riflesse/5.jpeg";
import riflesse6 from "../assets/riflesse/6.jpeg";
import riflesse7 from "../assets/riflesse/7.jpeg";
import riflesse8 from "../assets/riflesse/8.jpeg";




const contentData = {



  rincuorami: {
    title: 'RINCUORAMI',
    year: "2025",
    fotografo:"ANDREA TOMBESI",
    directors: ['LUCA MARUCCIO', 'DAVIDE ARANCIO'],
    actors: [
      'CHIARA MOLITIERNO', 'VALENTINA MARTINA', 'ILARIA ROMANIELLO',
      'MATTEO PANDOLFO', 'LUCA SANTANGELO', 'LUCA MARUCCIO',
      'FRANCESCO CONTORNO', 'MATTEO SCANNAVINO', 'ANGELA ',
      'MICHAEL ZARCONE', 'AISHA '
    ],
    description: [
      "L'AMORE PER QUANTO SEMPLICE E UNIVERSALE, SI SCONTRA CONTINUAMENTE",
      "CON LE NOSTRE PAURE, ASPETTATIVE E LE MASCHERE CHE OGNI GIORNO INDOSSIAMO PER EVITARE DI SOFFRIRE.",
      "MA CHI È IL VERO AUTORE DI QUESTA SOFFOCANTE COMPLESSITÀ?"
    ],
    slider: {
      id: "rincuorami",
      images: [
        rincuorami1,
        rincuorami2,
        rincuorami3,
        rincuorami4,
        rincuorami5,
        rincuorami6,
      ],
      direction: "left"
    }


  },
  fritta: {
    title: "FRITTA E' ANCHE BUONA LA LUNA",
    year: "2024",
    fotografo:"ANDREA TOMBESI",
    directors: ['LUCA MARUCCIO'],
    actors: [
      'CHIARA MOLITIERNO', 'ILARIA ROMANIELLO',
      'FRANCESCO CONTORNO', 'MATTEO SCANNAVINO', 'ANGELA MAGNONI',
      'MICHAEL ZARCONE', 'AISHA', 'DAVIDE ARANCIO'
    ],
    description: [
      "IL NUOVO MONDO DIGITALE PERENNEMENTE CONNESSO CI HA OFFERTO NUOVI MODI PER ESPLORARE IL NOSTRO ESSERE E LE ALTRE PERSONE.",
      "ADESSO OGNUNO DI NOI CUSTODISCE UNA IDENTITÀ SEGRETA NEL PROPRIO TELEFONO CHE SPESSO NON È ALTRO CHE UNA SCATOLA NERA DELLE PARTI OSCURE DELLA NOSTRA ANIMA.",
      "COSA SUCCEDEREBBE SE DURANTE UN'ORDINARIA CENA TRA AMICI OGNUNO APRISSE IL PROPRIO VASO DI PANDORA?"
    ],
    slider: {
      id: "fritta",
      images: [
        fritta1,
        fritta2,
        fritta3,
        fritta4,
        fritta5,
        fritta6,
      ],
      direction: "left"
    }
  },
  secret: {
    title: "SECRET PROJECT",
    year: "+ ??? ",
    fotografo:"ARMONIA E CAOS",
    directors: ['DAVIDE ARANCIO'],
    actors: [
      '????'
    ],
    description: [
      "LA COMPAGNIA STA LAVORANDO ALLA SCRITTURA DI UN NUOVO SPETTACOLO ORIGINALE SCRITTO DA NOI",
      "È UNO SPETTACOLO CHE ALTERNA REALISMO URBANO E POESIA VISIONARIA, MUSICA DAL VIVO E DIALOGHI TAGLIENTI, CORPI IN MOVIMENTO E PAROLE SOSPESE.",
      "UNA STORIA SUL BISOGNO DI AMARE, E SUL TERRORE DI FARLO DAVVERO."
    ],
    slider: {
      id: "secret",
      images: [
        secret1,
        secret2,
        secret3,
        secret4

      ],
      direction: "left"
    }
  },
  beatrici: {
    title: "RIFLESSE NEL DESTINO",
    year: "2023",
    fotografo:"ARMONIA E CAOS",
    directors: ['LUCA MARUCCIO'],
    actors: [
      'CHIARA MOLITIERNO', 'NIKLA RIVALDO',
      'VALENTINA MARTINA', 'MATTEO SCANNAVINO', 'ANGELA MAGNONI',
      'ILARIA TACCOGNA', 'AISHA', 'MARTENA SALTA'
    ],
    description: [
      "UNA SUORA ASSATANATA, UNA DONNA IN CARRIERA, UNA VECCHIA BISBETICA, UN'ADOLESCENTE CRUDELE E UNA DONNA-LUPO.",
      "UN CONTINUUM DI IROSE CONTUMELIE, INVETTIVE, SPASMI AMOROSI, BAMBOLEGGIAMENTI, SPROLOQUI, POMPOSO SENTENZIARE, AMMICCANTI CONFIDENZE, VANEGGIAMENTI SESSUALI,",
      "SUSSURRI SOGNANTI, IMPETTITE DELIBERAZIONI."
    ],
    slider: {
      id: "riflesse",
      images: [
        
        riflesse2,
        riflesse3,
        riflesse4,
        riflesse5,
        riflesse6,
        riflesse7,
        riflesse8
      ],
      direction: "left"
    },


  },
  collab: {
    title: "LE BEATRICI",
    directors: ['LUCA MARUCCIO'],
    actors: [
      'CHIARA MOLITIERNO', 'NIKLA RIVALDO',
      'VALENTINA MARTINA', 'MATTEO SCANNAVINO', 'ANGELA MAGNONI',
      'ILARIA TACCOGNA', 'AISHA', 'MARTENA SALTA'
    ],
    description: [
      "UNA SUORA ASSATANATA, UNA DONNA IN CARRIERA, UNA VECCHIA BISBETICA, UN'ADOLESCENTE CRUDELE E UNA DONNA-LUPO.",
      "UN CONTINUUM DI IROSE CONTUMELIE, INVETTIVE, SPASMI AMOROSI, BAMBOLEGGIAMENTI, SPROLOQUI, POMPOSO SENTENZIARE, AMMICCANTI CONFIDENZE, VANEGGIAMENTI SESSUALI,",
      "SUSSURRI SOGNANTI, IMPETTITE DELIBERAZIONI."
    ]
  }
}

export default function ShowInfo({ children, onClose, isOpen, contentKey }) {
  const content = contentData[contentKey];
  const [isButtonUp, setIsButtonUp] = useState(false); // State to control button position

  const toggleButtonPosition = () => {
    setIsButtonUp(prev => !prev); // Toggle the state
    console.log("Button position toggled. isButtonUp:", !isButtonUp);
  };

  // Define the y position based on the state
  // 0 means original position (bottom), -20vh means 20vh up
  const buttonYPosition = isButtonUp ? '-20vh' : 0;
  

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const variants = {
    initial: { y: '100vh', opacity: 0 },
    animate: { y: '0vh', opacity: 1, transition: { ease: easeIn, duration: 0.2 } },
    exit: { y: '100vh', opacity: 0, transition: { duration: 0.3 } }
  };

  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="h-screen w-screen z-99 bg-storybg fixed font-hero text-white "

    >
      <div className="h-full w-full flex flex-col pt-3 justify-between">
        {/* titolo X */}
        <div>


          <div className="flex flex-row justify-between mb-2">
            <h1 className='pl-2'>{content.title}</h1>
            <h1 className="text-right pr-2" onClick={onClose}>X</h1>
          </div>

          {/* <div className="w-[70%] aspect-square m-[10%] bg-white"></div> */}

        </div>
        <Slider
          key={content["slider"].id}
          id={content["slider"].id}
          images={content["slider"].images}
          direction={content["slider"].direction}
        />
        <div className="hidden md:block h-[6vh]"></div>

        <div className="text-left h-[50vh] flex flex-row flex-wrap justify-around mt-4 ">

          <div className="mb-[5] max-h-[19vh] min-w-[370px] pl-2 pr-2 max-w-[512px]">
            <div className="flex flex-row">
              <div className="w-[50%]">
                <p className="mb-1">REGIA:</p>
                {content.directors.map((name, index) => (
                  <p key={index} className='text-xs sm:text-sm '>{name}</p>
                ))}
                <p className="mb-1 mt-1">TEATRO:</p>
                <p className='text-xs sm:text-sm '>ATTOZERO {content.year}</p>
                <div className='hidden  md:block'>
                  <p className='text-xs pt-1'>FOTOGRAFIE</p>
                  <p className='text-xs'>{content.fotografo}</p>

                </div>

              </div>

              
              <div className="w-[50%] text-xs">
                {/* The DropdownActors component - shown on mobile, hidden on larger screens */}
                <div className="md:hidden">
                  <DropdownActors actors={content.actors} fotografo={content.fotografo} /> {/* Add md:hidden */}

                </div>


                {/* The plain actors list - hidden on mobile, shown on larger screens */}
                <div className="hidden md:block"> {/* Add hidden md:block */}
                  <p className="w-[50%] text-sm mb-1">ATTORI:</p> {/* Adjust width if needed for desktop */}
                  {content.actors.map((name, index) => (
                    <p key={index} className='text-xs sm:text-sm'>{name}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>


          <div className='max-w-[420px] pl-3 ' onClick={toggleButtonPosition} >


            {content.description.map((line, index) => (
              <p key={index} className={index === 2 ? 'text-xs sm:text-sm pl-[10%] pt-[5%]' : index === 1 ? 'text-xs sm:text-sm pt-[5%]' : 'text-xs sm:text-sm pt-[5%]'}>
                {line}
              </p>
            ))}
            <p className=' md:hidden text-center text-2xl mt-2 pr-3'>▼</p>
            
          </div>

        </div>
        <div className='text-center h-[8vh]' style={{
          background: 'linear-gradient(to top, #212121 0%, #212121 50%, transparent 100%)'
        }}>
          <motion.button
        initial={{ y: 0 }} // Start at original position
        animate={{ y: buttonYPosition }} // Animate to the determined position
        transition={{ type: "spring", stiffness: 100, damping: 20 }} // Smooth spring animation
        onClick={onClose} // Your button's inherent action
        className="relative bottom-[20px] border-2  bg-storybg rounded-2l border-solid border-white pl-3 pr-3 pt-1 pb-1 rounded " // z-20 to ensure it's above other content
      >
        Chiudi
      </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
