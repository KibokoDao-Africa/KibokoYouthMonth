import React from 'react'
import { ConnectWallet } from "@thirdweb-dev/react";
import {hamburger} from "../../public/assets/icons"
import Image from 'next/image';

const Navbar = () => {
  return (
    <header className='padding-x py-8 absolute z-10 w-full'>
    <nav className='flex justify-between items-center max-container'>
      <a href='/'>
     Lisk
      </a>
      <ul className='flex-1 flex justify-center items-center gap-16 max-lg:hidden'>
        
      </ul>
      <div className='flex gap-2 text-lg leading-normal font-medium font-montserrat max-lg:hidden wide:mr-24'>
      <ConnectWallet
            btnTitle="Sign in"
            modalTitle="Select Sign in Method "
            
              dropdownPosition={{
                side: "bottom",
                align: "center",  
              }}
            />
      
      </div>
      <div className='hidden max-lg:block'>
        <Image src={hamburger} alt='hamburger icon' width={25} height={25} />
      </div>
    </nav>
  </header>

  )
}

export default Navbar