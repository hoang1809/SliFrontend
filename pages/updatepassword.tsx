import { Button, Form, Input, message } from 'antd'
import Header from 'components/layout/header/Header'
import React from 'react'
import Image from 'next/image'
import dvr from 'public/assets/icons/dvr.png'

function test8() {

    const onFinish = async (values: any) => {
        try {
            const accessToken = localStorage.getItem('access_token');

            const response = await fetch('http://localhost:8001/user/update/password', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
                body: JSON.stringify(values),
            });

            if (response.ok) {
                message.success('Cập nhật thành công');
            } else {
                message.error(`Error updating account: ${response.statusText}`);
            }
        } catch (error) {
            console.error('Error updating account:', error);
        }
    };
    return (
        <div className='min-w-screen h-screen bg-[#f3f5f9]'>
            <Header setSearchTerm=''></Header>
            <div className='w-full flex justify-center p-10'>
                <div className='w-1/3 bg-white p-9 rounded-2xl'>
                    <p className='font-semibold text-[#273895] text-3xl'>Password setting</p>
                    <Image src={dvr}></Image>
                    <Form
                        layout="vertical"
                        style={{ maxWidth: 600 }}
                        onFinish={onFinish}
                        className='mt-5'
                    >

                        <Form.Item label="Old password" name="oldPassword">
                            <Input />
                        </Form.Item>
                        <Form.Item label="New password" name="newPassword">
                            <Input />
                        </Form.Item>

                        <Form.Item className='flex justify-end'>
                            <Button type="primary" htmlType="submit" style={{ backgroundColor: '#273895', color: '#fff' }}>
                                Save
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default test8