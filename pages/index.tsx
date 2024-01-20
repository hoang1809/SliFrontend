import Header from 'components/layout/header';
import Link from 'next/link';


export default function Home() {
  return (
    <div className='min-w-screen min-h-screen relative'>
      <Header></Header>
      <Link href="/room">
        <button className="bg-gray-500/75 hover:bg-gray-700 text-white font-bold w-[155px] h-12 px-4 py-3 rounded-full absolute bottom-16 left-1/2 transform -translate-x-1/2">
          Danh sách
        </button>
      </Link>
    </div>
  );
}
