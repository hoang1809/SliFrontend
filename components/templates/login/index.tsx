import React from 'react'
import Image from 'next/image';

import { LayoutProps } from 'models/common';
import { Layout } from 'antd';
const { Content } = Layout;
const TempalteLogin = ({ children }: LayoutProps) => {
  return (
    <>
      <div
        style={{
          zIndex: -1,
          position: 'fixed',
          width: '150vw',
          height: '100vh',
        }}
      >
        <Image 
          src="/bg2.jpg"
          layout='fill'
          objectFit='fill'
          className="filter blur-sm">
        </Image>
      </div>
          <Content className='flex justify-end'>
            <div className="w-1/3 min-h-[929px] max-h-full flex flex-col items-center p-[90px] m-8 space-y-20 bg-white rounded-lg">{children}</div>
          </Content>
    </>
  );
};

export default TempalteLogin;