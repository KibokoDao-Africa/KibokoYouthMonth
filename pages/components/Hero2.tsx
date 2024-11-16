import React from 'react'
// import Button from './But÷ton'
import { services } from '../constants'
import ServiceCard from './ServiceCard'
const Hero2 = () => {
  return (
    <section className='max-container max:sm:mt-5' id="about">
   
      <div className='flex-col flex justify-start gap-5'>
      
        {/* <Button /> */}
        <p className='text-4xl font-poppins '> We Believe that <b>Users should</b> <br />  Be able to<span className='font-bold text-coral-red '> Vote Peacefully </span></p>
        {/* <p className='lg:max-w-lg text-xl font-poppins text-slate-grazy'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. </p> */}
      </div>

      <div className='flex justify-center flex-col xl:flex-row lg:flex-row gap-9 max-container'>
      {services.map((service) => (
        <ServiceCard key={service.label} {...service}/>
      ))}
      </div>

    </section>
  )
}

export default Hero2