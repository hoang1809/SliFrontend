import FilterModal from 'components/modal';
import { GetServerSideProps } from "next"
import Header from 'components/layout/header';
import Cards from 'components/modules/cards';
import { PostList } from 'models/PostList';


export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch('http://47.128.244.84:8001/room')
  
  //const res = await fetch('http://47.128.244.84:8001/room');
  const data = await res.json();
  console.log(data);


  return {
      props: {
          data
      }
  }
}


export default function Home({data} : PostList) {
  return (
    <div className='min-w-screen min-h-screen relative'>
      <Header></Header>
      {/* <FilterModal></FilterModal> */}
      {/* <Link href="/list">
        <button className="bg-gray-500/75 hover:bg-gray-700 text-white font-bold w-[155px] h-12 px-4 py-3 rounded-full absolute bottom-16 left-1/2 transform -translate-x-1/2">
          Danh sách
        </button>
      </Link> */}
      <div className="flex justify-center pt-6">
        <div className="grid grid-cols-4 gap-6">
          {data.map((item, index) => (
            <Cards key={index} title={item.title} address={item.address} image={item.image} price={item.price} area={item.area} />
          ))}

        </div>
      </div>
    </div>
  );
}
