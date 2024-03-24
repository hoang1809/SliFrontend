import React, { useState } from 'react'
import searchIcon from 'public/assets/icons/search-normal.svg';
import Image from 'next/image';
import { Form } from 'antd';
import { InputCustom } from './common/input';
import { useRouter } from 'next/router';

export default function Searchbar({ setSearchTerm }: { setSearchTerm: any }) {
    const router = useRouter();
    // const onFinish = (values: any) => {
    //     const { room } = values;
    //     if(!room) {
    //         return;
    //     }
    //     router.push({
    //         pathname: '/newsearch',
    //         query: {
    //             room
    //         }
    //     });
    // };
    const onFinish = (values: any) => {
        const { room } = values;
        setSearchTerm(room);
        console.log(room);
        router.push('/');
    }

    return (
        <div className="w-full px-4">
            <Form  onFinish={onFinish} className='flex justify-between'>
                <Form.Item name="room" className='mb-0'>

                    <InputCustom
                        style={{ border: 'none', boxShadow: 'none', outline: 'none', width: '200px' }}
                        placeholder="Search room id/floor"
                    ></InputCustom>
                </Form.Item>

                <Form.Item className='self-center' style={{ height: '24px', margin: '0px' }}>
                    <button type="submit" className="h-[24px]">
                        <Image src={searchIcon} alt="Search"></Image>
                    </button>
                </Form.Item>
            </Form>
        </div>
    )
}
