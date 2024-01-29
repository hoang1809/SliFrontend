import React from 'react'
import searchIcon from 'public/assets/icons/search-normal.svg';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Form } from 'antd';
import { InputCustom } from './common/input';

export default function Searchbar() {
    const router = useRouter();
    const onFinish = (values: any) => {
        if(values.address == "") {
            return;
        }
        const { address } = values;
        router.push({
            pathname: '/search',
            query: {
                address
            }
        });
    };
    return (
        <div className="w-full px-4">
            <Form  onFinish={onFinish} className='flex justify-between'>
                <Form.Item name="address" className='mb-0'>

                    <InputCustom
                        style={{ border: 'none', boxShadow: 'none', outline: 'none', width: '550px' }}
                        placeholder="Bạn muốn an cư nơi nào?"
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
