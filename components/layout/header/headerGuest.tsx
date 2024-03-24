// components/HeaderGuest.tsx

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import logo from 'public/assets/icons/logousth.png';
import email from 'public/assets/icons/h-email.png'
import phone from 'public/assets/icons/h-phone.png'
import ModalFilter from 'components/modal';
import Searchbar from 'components/searchbar';

const HeaderGuest = ({ setSearchTerm }: { setSearchTerm: any }) => {
  const router = useRouter();
  const handleGoHome = () => {
    router.push('/');
  };
  return (
    <div>
      <div className="bg-white border-solid border-b-8 border-[#273895]">
        <div className="flex px-[120px] py-[8px] items-center justify-between">

          <div onClick={handleGoHome} className='flex cursor-pointer'>
            <Image src={logo} height='80px' className='object-scale-down' alt="Logo"></Image>
            {/* <div className="ml-[24px] py-[8px] border-solid border-l-[3px] border-red-500 text-zinc-800 text-[28px] font-medium font-['Montserrat Alternates']">
              SLI
            </div> */}
          </div>

          <div className="flex">
            <div className="flex w-[350px] border border-solid border-neutral-400 overflow-hidden rounded-full">
              <Searchbar setSearchTerm={setSearchTerm}></Searchbar>
            </div>
            {/* <div className="ml-6 w-[48px] border border-solid border-neutral-400 rounded-full flex justify-center items-center">
              <ModalFilter></ModalFilter>
            </div> */}
          </div>



          <div className='flex items-center justify-between'>
            <div className='flex items-center justify-between'>
              <Image src={email} height='48px' className='object-scale-down' ></Image>
              <div className='flex-col text-gray-600'>
                <p className='font-bold'>Email</p>
                <p className='text-[#273895] font-semibold'>linhtinh@gmail.com</p>
              </div>
            </div>
            <div className='flex items-center justify-between'>
              <Image src={phone} height='48px' className='object-scale-down' ></Image>
              <div className='flex-col text-gray-600'>
                <p className='font-bold'>Hotline</p>
                <p className='text-[#ec2227] font-semibold'>{`(+84) 247 772 7748`}</p>
              </div>
            </div>
          </div>



          <div>
            <Link href="/login">
              <button className="w-[130px] h-10 px-4 py-2.5 bg-[#273895] text-white text-center text-[17px] rounded-md">
                Login
              </button>
            </Link>
            <Link href="/register">
              <button className="h-10 ml-6 py-2.5 text-[#273895] bg-white text-center text-[17px] rounded-md">
                Sign up</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderGuest;
