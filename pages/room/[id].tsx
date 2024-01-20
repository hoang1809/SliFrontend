import { GetServerSideProps } from "next";
import Header from "components/layout/header";
import { RoomDetails } from "models/PostList";

interface RoomDetailPageProps {
  data: RoomDetails;
}

export const getServerSideProps: GetServerSideProps<RoomDetailPageProps> = async ({ params }) => {
  const id = params!.id;
  const res = await fetch(`http://47.128.244.84:8001/room/${id}`);
  const data: RoomDetails = await res.json();

  return {
    props: {
      data,
    },
  };
};

export default function RoomDetailPage({ data }: RoomDetailPageProps) {

  let utilities: string[] = JSON.parse('[' + data.utilities.slice(1, -1).replace(/([^,]+)/g, '"$1"') + ']'); 
  return (
    <>
      <Header></Header>
      <div className="bg-[#F5F5F5] py-6 w-full flex-col px-[120px] space-y-6">

        <div className="h-[700px] w-full bg-white">
          <img className="object-none h-full w-full rounded-2xl" src="/bg.png" alt="" />
        </div>


        <div>
          <div className="text-zinc-800 text-[32px] font-semibold ">{data.title}</div>
          <div className="text-neutral-400 text-[17px] font-normal">{data.updatedAt}</div>
        </div>

        <div className="flex w-full space-x-6">
          <div className="flex-col w-2/3 space-y-6">


            <div className="p-6 bg-white space-y-6 rounded-2xl">
              <div className="text-zinc-800 text-xl font-medium">Thông tin phòng</div>
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <div className="text-zinc-800 mb-1 text-[17px] font-normal">Giá phòng</div>
                  <div className="text-zinc-800 text-xl font-medium">{data.price}đ</div>
                </div>
                <div>
                  <div className="text-zinc-800 mb-1 text-[17px] font-normal">Diện tích</div>
                  <div className="text-zinc-800 text-xl font-medium">{data.area}m2</div>
                </div>
                <div>
                  <div className="text-zinc-800 mb-1 text-[17px] font-normal">Sức chứa</div>
                  <div className="text-zinc-800 text-xl font-medium">{data.capacity} người</div>
                </div>
                <div>
                  <div className="text-zinc-800 mb-1 text-[17px] font-normal">Giá điện</div>
                  <div className="text-zinc-800 text-xl font-medium">{data.electricityPrice}đ/số</div>
                </div>
                <div>
                  <div className="text-zinc-800 mb-1 text-[17px] font-normal">Giá nước</div>
                  <div className="text-zinc-800 text-xl font-medium">{data.waterPrice}đ/m3</div>
                </div>
                <div>
                  <div className="text-zinc-800 mb-1 text-[17px] font-normal">Wifi</div>
                  <div className="text-zinc-800 text-xl font-medium">{data.wifiPrice}k/phòng</div>
                </div>
              </div>
            </div>


            <div className="p-6 bg-white space-y-6 rounded-2xl">
              <div className="text-zinc-800 text-xl font-medium">Tiện ích</div>
              <div className="grid grid-cols-4 gap-6">
                {utilities.map((utility, index) => (
                  <div className="text-zinc-800 text-[17px] font-normal" key={index}>{utility}</div>
                ))}
              </div>
            </div>


            <div className="p-6 bg-white space-y-6 rounded-2xl">
              <div className="text-zinc-800 text-xl font-medium">Mô tả</div>
              <div className="text-zinc-800 text-[17px] font-normal">{data.description}</div>
            </div>


          </div>

          <div className="flex-col flex-1 space-y-6">
            <div className="p-6 bg-white rounded-2xl space-y-6">
              <div className="text-zinc-800 text-xl font-medium">Thông tin chủ nhà</div>
              <div className="text-zinc-800 text-[17px] font-normal">{data.description}</div>
            </div>

            <div className="p-6 bg-white rounded-2xl space-y-6">
              <div className="text-zinc-800 text-xl font-medium">Địa chỉ</div>
              <div className="text-zinc-800 text-[17px] font-normal">{data.address}</div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
