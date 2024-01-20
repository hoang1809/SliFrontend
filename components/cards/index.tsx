import React from 'react';
import Image from 'next/image';

interface CardProps {
  title: string;
  address: string;
  image: string[];
  price: number;
  area: number;
}

const Cards = ({title, address, image,  price, area,}: CardProps) => {
  return (

    <div className="hover:shadow-lg h-[557px] w-[402px] flex flex-col rounded-2xl border border-none bg-white">
      <div>
        <img className="w-full h-[360px] border-none rounded-t-2xl overflow-hidden mb-4" src='/bg.png' />
      </div>
      <div className="px-4 pb-4 flex-col flex-1">
        <div className="text-zinc-800 text-xl font-medium leading-7">{title}</div>
        <div className="text-neutral-400 text-[17px] font-normal leading-normal ">{address}</div>
        <div className="flex justify-between">
          <div className="text-[32px] font-semibold leading-[44.80px] text-[#F2584C]">{price}đ</div>
          <div className="flex justify-between w-1/5 text-zinc-800 self-center text-[17px] font-normal">
            <Image src='/assets/icons/area.svg' height='24px' width='24px'></Image>
            <div>{area}m2</div>
          </div>
        </div>
      </div>
    </div>


  )
}

export default Cards