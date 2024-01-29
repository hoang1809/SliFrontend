// components/HeaderGuest.tsx

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import logo from 'public/assets/icons/logo.svg';
import ModalFilter from 'components/modal';
import Searchbar from 'components/searchbar';

const HeaderGuest = () => {
  const router = useRouter();
  const handleGoHome = () => {
    router.push('/');
  };
  return (
    <div>
      <div className="w-full bg-white shadow-md">
        <div className="flex h-24 px-[120px] py-[24px] justify-between">
          <div onClick={handleGoHome} className='flex cursor-pointer'>
            <Image src={logo} alt="Logo"></Image>
            <div className="ml-[24px] py-[8px] text-zinc-800 text-[28px] font-medium font-['Montserrat Alternates']">
              Sli Home
            </div>
          </div>

          <div className="flex">
            <div className="flex w-[656px] border border-solid border-neutral-400 overflow-hidden rounded-full">
              <Searchbar></Searchbar>
            </div>

            <div className="ml-6 w-[48px] border border-solid border-neutral-400 rounded-full flex justify-center items-center">
              <ModalFilter></ModalFilter>
            </div>
          </div>

          <div>
            <Link href="/login">
              <button className="w-[130px] h-10 px-4 py-2.5 bg-[#f2584c] text-white text-center text-[17px] rounded-2xl">
                Đăng nhập
              </button>
            </Link>
            <Link href="/register">
              <button className="h-10 ml-6 py-2.5 text-[#f2584c] bg-white text-center text-[17px] rounded-2xl">
                Đăng ký</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderGuest;
