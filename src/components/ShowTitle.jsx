import React from 'react'
import {motion, useTransform} from 'framer-motion'

export default function ShowTitle({showScroll, order , caption}) {
  const upcoming = useTransform(
    showScroll,
    [0, 0.07, 0.15,0.6,0.7],
    ["0vh", "0vh", "3vh", "3vh", "0vh"]
)

const legacy = useTransform(
    showScroll,
    [0, 0.75, 0.80,0.94,1],
    ["0vh", "0vh", "3vh","3vh","0vh"]
)

  return (
    <motion.h1 className='overflow-hidden font-ahero text-shadow-amber-700 text-shadow-2xs' style={{height: (order == "1")? upcoming : legacy}} >{caption}</motion.h1>
  )
}
