"use client"

import { useState } from "react";

// import { shoes, statistics } from "../constants";
// import { Button, ShoeCard } from "./components";
import { bigShoe1 } from "../../public/assets/images";
import { arrowRight } from "../../public/assets/icons";


const Hero = () => {
  return (
    <section
    id='home'
    className='w-full flex justify-center min-h-screen gap-10 max-container text-center  '
  >
    <div className='relative flex flex-col justify-center w-full  max-xl:padding-x pt-28 text-center'>
      <p className='text-xl font-montserrat text-coral-red text-center'>
        VOTING APPLICATION
      </p>

      <h1 className='mt-2 font-palanquin text-[130px] max-sm:text-[72px] max-sm:leading-[82px] text-center font-bold'>
        <span className='xl:whitespace-nowrap relative z-10 pr-10'>
          The New Arrival
        </span>
        <br />
        <span className='text-coral-red text-center'>Vote</span> Wisely 
      </h1>
  

    
    </div>

    
  </section>
  )
}

export default Hero