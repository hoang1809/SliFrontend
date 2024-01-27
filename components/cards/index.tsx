import React from 'react';

interface CardProps {
  title: string;
  address: string;
  image: string[];
  price: number;
  area: number;
}



const Cards = ({ title, address, image, price, area, }: CardProps) => {
  let src: string = `http://47.128.244.84:8001/room/uploaded/${String(image[0])}`;
  return (
    <div className="h-[557px] rounded-2xl hover:shadow-md bg-white flex flex-col">
      <div>
        <img className="w-full h-[360px] rounded-t-2xl overflow-hidden mb-4" src={src} alt="Property" />
      </div>
      <div className="flex-1 flex-col pb-4 px-4">
        <div className="text-zinc-800 text-xl font-medium leading-7 text-ellipsis overflow-hidden">{title}</div>
        <div className="text-neutral-400 text-[17px] font-normal leading-normal">{address}</div>
        <div className="flex justify-between">
          <div className="text-[32px] font-semibold leading-[44.80px] text-[#F2584C]">{price}</div>
          <div className="text-zinc-800 self-center text-[17px] font-normal">{area}</div>
        </div>
      </div>
    </div>




  )
}

export default Cards