import React from 'react';

//const { Meta } = Card;
interface CardProps {
  title: string;
  address: number;
  image: string[];
  price: number;
  area: string;
}

const Cards = ({title, address, image,  price, area,}: CardProps) => {
  return (
    // <Card
    //   className="w-[402px] h-[557px] rounded-2xl"
    //   hoverable
    //   cover={<img alt="example" src={urlToImage} />}>
    //     <Meta title={title} description={description} />
    // </Card>

    // <div className="w-[402px] min-h-[557px] hover:shadow-md bg-white rounded-2xl flex-col justify-start items-start gap-4 inline-flex">
    //   <div className="w-[402px] h-[360px] relative">
    //     <img className="w-[402px] h-[360px] rounded-2xl overflow-hidden" src={download_url} />
    //     <div className="w-8 h-8 left-[354px] top-[16px] overflow-hidden absolute"></div>
    //   </div>
    //   <div className="self-stretch h-[181px] px-4 pb-4 flex-col justify-start items-start gap-2 flex">
    //     <div className="self-stretch overflow-hidden text-zinc-800  text-xl font-medium leading-7">{id}</div>
    //     <div className="self-stretch  text-neutral-400 text-[17px] font-normal leading-normal">{author}</div>
    //     <div className="self-stretch justify-between items-center inline-flex">
    //       <div className="text-red-500 text-[32px] font-semibold font-['Montserrat Alternates']">2.750.000đ</div>
    //       <div className="justify-start items-center gap-2 flex">
    //         <div className="w-6 h-6 relative"></div>
    //         <div className="text-zinc-800 text-[17px] font-normal font-['Montserrat Alternates'] leading-normal">35m2</div>
    //       </div>
    //     </div>
    //   </div>
    // </div>

    <div className="h-[557px] w-[402px] rounded-2xl hover:shadow-md bg-white">
      <div>
        <img className="w-[402px] h-[360px] rounded-t-2xl overflow-hidden mb-4" src={image[0]} />
      </div>
      <div className="px-4 pb-4">
        <div className="text-zinc-800 text-xl font-medium leading-7">{title}</div>
        <div className="text-neutral-400 text-[17px] font-normal leading-normal ">{address}</div>
        <div className="flex justify-between">
          <div className="text-[32px] font-semibold leading-[44.80px] text-[#F2584C]">{price}</div>
          <div className="text-zinc-800 self-center text-[17px] font-normal">{area}</div>
        </div>
      </div>
      

    </div>


  )
}

export default Cards