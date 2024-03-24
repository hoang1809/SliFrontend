import Header from 'components/layout/header/Header'
import React, { useEffect, useState } from 'react'
import { SendOutlined } from "@ant-design/icons";
import dvr from 'public/assets/icons/dvr.png'
import Image from 'next/image';
import { Button, Form, Input, message } from 'antd';
import { RoomDetails } from 'models/model';
import { useRouter } from 'next/router';

function RoomDetailPage() {
    const router = useRouter();
    const { id } = router.query;
    const [roomDetails, setRoomDetails] = useState<RoomDetails | null>(null);
    // const [accessToken, setAccessToken] = useState<string | null>(null);
    const currentDate = new Date();
    const [isRenting, setIsRenting] = useState(false);
    const [form] = Form.useForm();
    const formatter = (value: any) => `${value}đ`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    const userMail = localStorage.getItem('user_email');

    // const storedAccessToken = localStorage.getItem('access_token');
    // setAccessToken(storedAccessToken);

    useEffect(() => {

        // try {
        //     const response = fetch(`http://localhost:8001/room/${id}`);
        //     if (response.ok) {
        //         const data: RoomDetails = response.json();
        //         setRoomDetails(data);
        //     } else {
        //         throw new Error('Failed to fetch room details');
        //     }
        // } catch (error) {
        //     console.error('Error fetching room details:', error);
        // }

        fetch(`http://localhost:8001/room/${id}`)
            .then((res) => res.json())
            .then((postData: RoomDetails) => {
                setRoomDetails(postData);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });

    }, [])



    const onFinish = async (values: any) => {
        const accessToken = localStorage.getItem('access_token');
        try {
            if (!accessToken) {
                message.error('Login required');
                return;
            }
            const response = await fetch(`http://47.128.244.84:8001/room/${id}/comment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${accessToken}`,
                },
                body: JSON.stringify(values),
            });
            if (response.ok) {
                console.log('Comment posted successfully');
                form.resetFields();
            }
        } catch (error) {
            console.error('Error posting comment:', error);
        }
    };




    return (
        <div className='min-w-screen h-screen bg-[#f3f5f9] relative'>
            <Header setSearchTerm=''></Header>
            <div className='w-full p-12'>
                <div className=' w-full bg-white p-12  rounded-2xl'>
                    <div className='mb-9'>
                        <p className='font-semibold text-[#273895] text-3xl'>Room information</p>
                        <Image src={dvr}></Image>
                    </div>
                    <div className='flex space-x-10'>
                        <div className='flex-col w-7/12 space-y-6'>
                            <div className='rounded-lg p-10 border-solid border border-slate-400'>
                                <div className='flex text-[#273895] text-2xl'>
                                    <p className='font-semibold'>{`P${roomDetails?.title}`}</p>
                                    <p className='font-semibold text-4xl mx-10'>-</p>
                                    <p className='font-semibold'>{`Floor ${roomDetails?.floor}`}</p>
                                    <p className='text-green-600 font-thin italic text-lg ml-5'>(Current renting)</p>
                                </div>
                                <div className='flex space-x-10'>
                                    <div className='flex mt-10 space-x-5 text-2xl'>
                                        <p className='text-lg font-semibold'>Area: </p>
                                        <p className='text-lg '>{roomDetails?.area}</p>
                                    </div>
                                    <div className='flex mt-10 space-x-5 text-2xl'>
                                        <p className='text-lg font-semibold'>Capacity:</p>
                                        <p className='text-lg '>{roomDetails?.capacity}</p>
                                    </div>
                                </div>

                            </div>
                            <div className='mt-5 p-10 rounded-lg border-solid border border-slate-400 justify-between'>

                                <div className='flex justify-between'>
                                    <div>
                                        <p className='text-xl font-semibold'>Monthly rental price:</p>
                                        <p className='font-semibold text-[#273895] text-3xl'>{`${formatter(roomDetails?.price)}đ/tháng`}</p>
                                    </div>
                                    <div>
                                        <p className='text-xl font-semibold'>Payment deadline:</p>
                                        <p className='text-xl font-semibold italic'>{`${roomDetails?.deadline}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`}</p>
                                    </div>
                                    {currentDate > new Date(`${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${roomDetails?.deadline}`) ?
                                        <p className='text-red-600 font-thin italic text-lg ml-5'>OVERDUE</p> :
                                        <p className='text-red-600 font-thin italic text-lg ml-5'></p>
                                    }
                                </div>

                            </div>
                            <div className='mt-5 p-10 rounded-lg border-solid border border-slate-400'>
                                <p className='text-xl font-semibold pb-3'>Service price:</p>
                                <div className="grid grid-cols-3 gap-6">
                                    <div>
                                        <div className="text-zinc-800 text-base font-normal">Electricity</div>
                                        <div className="text-zinc-800 text-xl font-medium">{`${formatter(roomDetails?.electricity)}/số`}</div>
                                    </div>
                                    <div>
                                        <div className="text-zinc-800 text-base font-normal">Water</div>
                                        <div className="text-zinc-800 text-xl font-medium">{`${formatter(roomDetails?.water)}/m3`}</div>
                                    </div>
                                    <div>
                                        <div className="text-zinc-800 text-base font-normal">Wifi</div>
                                        <div className="text-zinc-800 text-xl font-medium">{`${formatter(roomDetails?.wifi)}/phòng`}</div>
                                    </div>
                                </div>
                            </div>

                            <div className=' flex space-x-8 mt-5 p-10 rounded-lg border-solid border border-slate-400'>
                                <p className='text-xl font-semibold'>Contract term: </p>
                                <p className='text-xl italic'>1/1/2024 - 1/1/2025</p>
                                <p className='text-xl text-[#273895] italic underline'>(view contract)</p>
                            </div>
                        </div>
                        <div className='flex-col flex-1 space-y-6'>
                            <div className=' flex p-10 space-y-4 rounded-lg border-solid border overflow-y-auto border-slate-400'>
                                <div>
                                    <p className='text-xl font-semibold'>Students</p>
                                    {roomDetails?.users && roomDetails.users.map((student) => (
                                        <div key={student.id} className='mt-5'>
                                            <p className='font-semibold text-base'>{student.name}</p>
                                            <p className='font-normal text-base'>{student.email}</p>
                                        </div>
                                    ))}

                                    {/* <div className='mt-5'>
                                        <p className='font-semibold text-base'>Phạm Văn Zũng</p>
                                        <p className='font-normal text-base'>PhạmVănZũng@gmail.com</p>
                                    </div> */}
                                </div>
                            </div>
                            <div className="flex-col p-10 space-y-4 rounded-lg border-solid border border-slate-400">
                                <div className="text-xl font-semibold mb-6">Issues</div>
                                <div className="space-y-3 max-h-[250px] overflow-auto">
                                    {roomDetails?.issues ?
                                        (roomDetails?.issues?.map(issue => {
                                            return (
                                                <div key={issue.id} className="text-zinc-800 text-[17px] mb-3 break-words font-normal">{issue.content}</div>

                                            )
                                        })) : (
                                            <div className="text-zinc-800 text-[17px] mb-3 break-words font-normal">No issue, everything is ok</div>
                                        )
                                    }
                                    {/* <div className="text-zinc-800 text-[17px] mb-3 break-words font-normal">Phòng hỏng điều hoà</div>
                                    <hr />
                                    <div className="text-zinc-800 text-[17px] mb-3 break-words font-normal">Tường thủng thông sang phòng khác</div>
                                    <hr />
                                    <div className="text-zinc-800 text-[17px] mb-3 break-words font-normal">Vỡ ống nước</div>
                                    <hr /> */}
                                </div>

                                <Form onFinish={onFinish} layout="inline">
                                    <Form.Item className="w-full" name="content" rules={[{ required: true, message: 'ohnoooooooo' }]}>
                                        <Input className="w-full" suffix={<Button htmlType="submit" icon={<SendOutlined />} />} />
                                    </Form.Item>
                                </Form>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default RoomDetailPage