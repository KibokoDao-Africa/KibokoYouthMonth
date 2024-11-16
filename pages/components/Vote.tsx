import React from 'react'
import {  customer1 } from '../../public/assets/images'
import Image from 'next/image'

import { shoes } from '../constants'
// import Button from './Button'
// import { quote } from '@/public/assets/icons'

const Investment = () => {
  return (
    <section id="products" className='w-full flex xl:flex-row  flex-col justify-center min-h-screen gap-40 max-container'>

      <div className='relative xl:w-2/5 flex flex-col justify-center items-start w-full  max-xl:padding-x pt-28'>
        {/* <Button /> */}
        <p className='font-bold text-gray-300 text-[50px] mb-5'> - 03 </p>
        <p className='text-black-500 font-medium text-[40px] max:sm:text-[72px] max:sm:leading-[82px]'> What Our <br /> <b>Client's</b> Say <b>About Us!</b></p>

        <div className='flex-1 sm:w-[350px] sm:min-w-[550px] w-full rounded-[20px] shadow-3xl px-10 py-12 mt-5'>
          {/* <Image src={quote} alt="quote" width={25} height={25} /> */}
          <div className='rounded-full mt-4 flex-row flex gap-2'>
            <div className='w-11 h-11  flex justify-center rounded-full'>
            <Image src={customer1} alt="quote" width={50} height={50} className='object-contain rounded-full' />
            </div>
        
          <p className='mt-2 font-poppins font-bold xl:text-[25px] sm:text-[15px] text-[20px]' > Chess Homes</p>

          </div>
          <p className='text-slate-gray mt-5 '> Best Company To Collaborate With Never Had Issues With Funds Exchange. Helped Get By Business Off The Ground</p>
        </div>
      </div>






    </section>
  )
}

export default Investment