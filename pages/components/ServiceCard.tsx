import React from 'react';
import Image from 'next/image';

interface ServiceCardProps {
  imgURL: string;
  label: string;
  subtext: string;
  label2: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ imgURL, label, subtext, label2 }) => {
  return (
    <div className='flex-1 sm:w-[350px] sm:min-w-[350px] w-full rounded-[20px] shadow-3xl px-10 py-16 mt-5'>
      <div className='w-11 h-11  flex justify-center items-center bg-coral-red rounded-full '>
        <Image src={imgURL} alt={label} width={24} height={24} />
      </div>
      <h3 className='mt-5 font-poppins text-xl leading-normal font-bold text-gray-400'>
        {label2} <span className='text-black'>{label}</span>
      </h3>
      <p className='mt-3 break-words font-poppins text-lg leading-normal  text-slate-gray'>{subtext}</p>
    </div>
  );
};

export default ServiceCard;
