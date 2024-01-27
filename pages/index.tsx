import Header from 'components/layout/header/Header';
import Link from 'next/link';
import Image from 'next/image';


export default function Home() {

  return (
    <div className='min-w-screen min-h-screen relative'>
      <Header></Header>
      <div
        style={{
          zIndex: -1,
          position: 'fixed',
          width: '100vw',
          height: '100vh',
        }}
      >
        <Image 
          src="/map.png"
          layout='fill'
          objectFit='cover'
          >
        </Image>
      </div>
      <Link href="/room">
        <button className="bg-black/75 hover:bg-gray-700 text-white font-bold w-[155px] h-12 px-4 py-3 rounded-full absolute bottom-10 left-1/2 transform -translate-x-1/2">
          Danh sách
        </button>
      </Link>
    </div>
  );
}
