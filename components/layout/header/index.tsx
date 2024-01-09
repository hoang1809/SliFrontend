import React from 'react';
import logo from 'public/assets/icons/logo.svg'
import searchIcon from 'public/assets/icons/search-normal.svg'
import filterIcon from 'public/assets/icons/filter.svg'
import Image from 'next/image';
import Link from 'next/link';
//import FilterModal from 'components/modal';

const Header = () => {
  return (
    <div>
      <div className="w-full bg-white shadow">
        <div className="flex h-24 px-[120px] py-[24px] justify-between">

          <div className='flex'>
            <Image src={logo}></Image>
            <div className="ml-[24px] py-[8px] text-zinc-800 text-[28px] font-medium font-['Montserrat Alternates']">
              Sli Home
            </div>
          </div>

          <div className="flex">
            <div className="flex w-[656px] border border-solid border-neutral-400 overflow-hidden rounded-full">
              <form className="flex w-full px-4 items-center">
                <input
                  type="search"
                  className="flex-1 text-[17] focus:outline-none"
                  placeholder="Bạn muốn an cư nơi nào?"
                />
                <button type="submit" className="h-[24px]">
                  <Image src={searchIcon}></Image>
                </button>
              </form>
            </div>
            <div className="ml-6 w-[48px] border border-solid border-neutral-400 rounded-full justify-center items-center inline-flex">
              {/* <FilterModal></FilterModal> */}
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

export default Header;
