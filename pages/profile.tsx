import Header from 'components/layout/header/Header'
import React from 'react'
import { Button, DatePicker, Form, Input, message } from 'antd';
import dvr from 'public/assets/icons/dvr.png'
import Image from 'next/image';
import { useRouter } from 'next/router';


function Test2() {
    const router = useRouter()

    // const onFinish = async (values: any) => {
    //     try {
    //         const month = values.DoB["$M"] + 1;
    //         const day = values.DoB["$D"];
    //         const year = values.DoB["$y"];
    //         const formattedDate = day + "/" + month + "/" + year;

    //         const dataToSend = {
    //             name: values.name,
    //             Student_ID: values.id,
    //             DoB: formattedDate,
    //             phoneNumber: values.phoneNumber
    //         };
    //         const response = await fetch('http://localhost:8001/user/update-account', {
    //             method: 'PUT',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify(dataToSend),
    //         });
    //         if (response.ok) {
    //             const responseData = await response.json();
    //             localStorage.setItem('access_token', responseData.access_token);
    //             router.push('/');
    //         } else {
    //             message.error('Đăng nhập thất bại, vui lòng điền đúng thông tin.');
    //         }
    //     } catch (error) {
    //         console.error('Error during login:', error);
    //         message.error('Login failed. Please try again later.');
    //     }
    // };

    const onFinish = async (values: any) => {
        try {
            const accessToken = localStorage.getItem('access_token');

            const month = values.DoB["$M"] + 1;
            const day = values.DoB["$D"];
            const year = values.DoB["$y"];
            const formattedDate = day + "/" + month + "/" + year;

            const dataToSend = {
                name: values.name,
                Student_ID: values.id,
                DoB: formattedDate,
                phoneNumber: values.phoneNumber
            };

            const response = await fetch('http://localhost:8001/user/update-account', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
                body: JSON.stringify(dataToSend),
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
                    <p className='font-semibold text-[#273895] text-3xl'>Update information</p>
                    <Image src={dvr}></Image>
                    <Form
                        layout="vertical"
                        style={{ maxWidth: 600 }}
                        onFinish={onFinish}
                        className='mt-5'
                    >

                        <Form.Item name='name' label="Name:">
                            <Input />
                        </Form.Item>
                        <Form.Item name='id' label="Student id:">
                            <Input />
                        </Form.Item>

                        <Form.Item name='DoB' label="Date of birth:">
                            <DatePicker />
                        </Form.Item>
                        <Form.Item name='phoneNumber' label="Phone number:">
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

export default Test2