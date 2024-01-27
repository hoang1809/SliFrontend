// components/HeaderGuest.tsx

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import logo from 'public/assets/icons/logo.svg';
import searchIcon from 'public/assets/icons/search-normal.svg';

const HeaderGuest = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const handleGoHome = () => {
    router.push('/');
  };

  const handleSearch = (event: any) => {
    event.preventDefault();
    // Redirect to search results page with search query
    router.push(`/search?search_query=${encodeURIComponent(searchQuery)}`);
  };

  const handleChange = (event: any) => {
    setSearchQuery(event.target.value);
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
              <form className="flex w-full px-4 items-center" onSubmit={handleSearch}>
                <input
                  name='address'
                  type="search"
                  className="flex-1 text-[17] focus:outline-none"
                  placeholder="Bạn muốn an cư nơi nào?"
                  value={searchQuery}
                  onChange={handleChange}
                />
                <button type="submit" className="h-[24px]">
                  <Image src={searchIcon} alt="Search"></Image>
                </button>
              </form>
            </div>
            <div className="ml-6 w-[48px] border border-solid border-neutral-400 rounded-full justify-center items-center inline-flex">
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
