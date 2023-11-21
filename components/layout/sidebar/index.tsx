/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Sider from 'antd/lib/layout/Sider';
import { useRouter } from 'next/router';
import Link from 'next/link';
interface Navbar {
  id: number | string;
  name: string;
  pathname: string;
}
const nav: Navbar[] = [
  {
    id: 0,
    name: 'Component',
    pathname: '/components',
  },
  {
    id: 1,
    name: 'login',
    pathname: '/login',
  },
];
const Sidebar = () => {
  const router = useRouter();
  return (
    <Sider trigger={null} collapsible width={256} collapsedWidth={100} className="bg-white">
      <div className="w-full flex flex-col items-center min-h-screen px-[12px]">
        <section className={`mt-[10px] mb-[32px] w-full`}>
          {nav.map((item, key) => {
            const { id, name, pathname } = item;
            const active = router.pathname === pathname;
            return (
              <Link href={pathname} key={key} className="hover:text-black cursor-pointer">
                <div
                  className={`mb-[2px] p-[10px] flex cursor-pointer text-xs justify-center ${
                    active ? 'bg-active' : 'bg-white'
                  }`}
                >
                  {name}
                </div>
              </Link>
            );
          })}
        </section>
      </div>
    </Sider>
  );
};

export default Sidebar;
