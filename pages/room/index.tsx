// pages/postlist.tsx

import Link from "next/link";
import Cards from "components/cards";
import Header from "components/layout/header";
import { GetServerSideProps } from "next";
import { PostList } from "models/PostList";

export const getServerSideProps: GetServerSideProps = async () => {
  
  const res = await fetch("http://47.128.244.84:8001/room");
  const data = await res.json();
  console.log(data);

  return {
    props: {
      data,
    },
  };
};

export default function PostListPage({ data }: PostList ) {
  return (
    <>
      <Header />
      <div className="bg-[#F5F5F5] px-36 py-6 grid grid-cols-4 gap-6">
        {data.map((item, index) => (
          <Link key={index} href={`/room/${item.id}`}>
            <a>
              <Cards image={item.image} title={item.title} address={item.address} price={item.price} area={item.area} />
            </a>
          </Link>
        ))}
      </div>
    </>
  );
}
