import { useState, useEffect } from 'react';
import { RoomDetails } from 'models/model'; // Adjust the path as per your project structure
import Header from 'components/layout/header/Header';
import { Avatar, Button, Form, Image, Input, message } from "antd";
import { SendOutlined, UserOutlined } from "@ant-design/icons";
import { useRouter } from 'next/router';

function RoomDetailsPage() {
    const router = useRouter();
    const { id } = router.query;
    const [roomDetails, setRoomDetails] = useState<RoomDetails | null>(null);
    const [isLoading, setLoading] = useState(true);
    const [form] = Form.useForm();

    console.log(id)


    const fetchData = async () => {
        try {
            const response = await fetch(`http://47.128.244.84:8001/room/${id}`);
            if (response.ok) {
                const data: RoomDetails = await response.json();
                setRoomDetails(data);
                setLoading(false);
            } else {
                throw new Error('Failed to fetch room details');
            }
        } catch (error) {
            console.error('Error fetching room details:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [id]);



    const onFinish = async (values: any) => {
        try {
            const accessToken = localStorage.getItem('access_token');
            if (!accessToken) {
                message.error('Bạn cần đăng nhập để bình luận');
                return;
            }
            const response = await fetch(`http://47.128.244.84:8001/room/${id}/comment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
                body: JSON.stringify(values),
            });
            if (response.ok) {
                console.log('Comment posted successfully');
                form.resetFields();
            }
            fetchData();
        } catch (error) {
            console.error('Error posting comment:', error);
        }
    };

    if (isLoading) return <p>Loading...</p>;
    if (!roomDetails) return <p></p>;

    let utilities: string[] = JSON.parse('[' + (roomDetails?.utilities || '').slice(1, -1).replace(/([^,]+)/g, '"$1"') + ']');


    return (
        <>
            <Header></Header>
            <div className="bg-[#F5F5F5] py-6 w-full flex-col px-[120px] space-y-6 rounded-2xl">

                <Image.PreviewGroup
                    items={roomDetails.image.map(img => `http://47.128.244.84:8001/room/uploaded/${img}`)}
                >
                    <div className="w-[1680px] h-[568px] rounded-2xl overflow-hidden justify-start items-start gap-3 inline-flex">
                        <Image className="object-cover " width={748} height={568} src={`http://47.128.244.84:8001/room/uploaded/${roomDetails.image[0]}`} />
                        <div className="grow shrink basis-0 self-stretch flex-col justify-start items-start gap-3 inline-flex">
                            <Image className="object-cover" width={454} height={278} src={`http://47.128.244.84:8001/room/uploaded/${roomDetails.image[1]}`} />
                            <Image className="object-cover" width={454} height={278} src={`http://47.128.244.84:8001/room/uploaded/${roomDetails.image[2]}`} />
                        </div>
                        <div className="grow shrink basis-0 self-stretch flex-col justify-start items-start gap-3 inline-flex">
                            <Image className="object-cover" width={454} height={278} src={`http://47.128.244.84:8001/room/uploaded/${roomDetails.image[3]}`} />
                            <div className="w-[454px] h-[278px] relative">
                                <Image className="object-cover" width={454} height={278} src={`http://47.128.244.84:8001/room/uploaded/${roomDetails.image[4]}`} />
                                <div className="w-[454px] h-[278px] py-[94px] left-0 top-0 absolute bg-black bg-opacity-50 justify-center items-center inline-flex pointer-events-none">
                                    <div className="text-center text-white text-[64px] leading-[89.60px]">+{roomDetails.image.length - 5}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Image.PreviewGroup>


                <div>
                    <div className="text-zinc-800 text-[32px] font-semibold ">{roomDetails.title}</div>
                    <div className="text-neutral-400 text-[17px] font-normal">{roomDetails.updatedAt}</div>
                </div>

                <div className="flex w-full space-x-6">
                    <div className="flex-col w-2/3 space-y-6">
                        <div className="p-6 bg-white space-y-6 rounded-2xl">
                            <div className="text-zinc-800 text-xl font-medium">Thông tin phòng</div>
                            <div className="grid grid-cols-3 gap-6">
                                <div>
                                    <div className="text-zinc-800 mb-1 text-[17px] font-normal">Giá phòng</div>
                                    <div className="text-zinc-800 text-xl font-medium">{roomDetails.price}đ</div>
                                </div>
                                <div>
                                    <div className="text-zinc-800 mb-1 text-[17px] font-normal">Diện tích</div>
                                    <div className="text-zinc-800 text-xl font-medium">{roomDetails.area}m2</div>
                                </div>
                                <div>
                                    <div className="text-zinc-800 mb-1 text-[17px] font-normal">Sức chứa</div>
                                    <div className="text-zinc-800 text-xl font-medium">{roomDetails.capacity} người</div>
                                </div>
                                <div>
                                    <div className="text-zinc-800 mb-1 text-[17px] font-normal">Giá điện</div>
                                    <div className="text-zinc-800 text-xl font-medium">{roomDetails.electricityPrice}đ/số</div>
                                </div>
                                <div>
                                    <div className="text-zinc-800 mb-1 text-[17px] font-normal">Giá nước</div>
                                    <div className="text-zinc-800 text-xl font-medium">{roomDetails.waterPrice}đ/m3</div>
                                </div>
                                <div>
                                    <div className="text-zinc-800 mb-1 text-[17px] font-normal">Wifi</div>
                                    <div className="text-zinc-800 text-xl font-medium">{roomDetails.wifiPrice}k/phòng</div>
                                </div>
                            </div>
                        </div>


                        <div className="p-6 bg-white space-y-6 rounded-2xl">
                            <div className="text-zinc-800 text-xl font-medium">Tiện ích</div>
                            <div className="grid grid-cols-4 gap-6">
                                {utilities.map((utility, index) => (
                                    <div className="text-zinc-800 text-[17px] font-normal" key={index}>{utility}</div>
                                ))}
                            </div>
                        </div>


                        <div className="p-6 bg-white space-y-6 rounded-2xl">
                            <div className="text-zinc-800 text-xl font-medium">Mô tả</div>
                            <div className="text-zinc-800 text-[17px] font-normal">{roomDetails.description}</div>
                        </div>
                    </div>

                    <div className="flex-col max-w-[500px] h-full flex-1 space-y-6">
                        <div className="p-6 bg-white rounded-2xl space-y-4">
                            <div className="text-zinc-800 text-xl font-medium">Thông tin chủ nhà</div>
                            <div className="text-zinc-800 text-[17px] font-semibold">{roomDetails.user.name}</div>
                            <div className="text-zinc-800 text-[17px] font-normal">{roomDetails.user.email}</div>
                            <div className="text-zinc-800 text-[17px] font-normal">{roomDetails.user.phoneNumber}</div>
                        </div>

                        <div className="p-6 bg-white rounded-2xl space-y-6">
                            <div className="text-zinc-800 text-xl font-medium">Địa chỉ</div>
                            <div className="text-zinc-800 text-[17px] font-normal">{roomDetails.address}</div>
                        </div>

                        <div className="p-6 bg-white rounded-2xl space-y-6">
                            <div className="text-zinc-800 text-xl font-medium mb-6">Bình luận</div>
                            <div className="space-y-3 max-h-[250px] overflow-auto">
                                {roomDetails.comments.map(comment => (
                                    <div key={comment.id}>
                                        <div className="flex gap-x-2 ">
                                            {comment.user && comment.user.avatar !== null ? (
                                                <Avatar className='border border-solid border-neutral-400' src={`http://47.128.244.84:8001/user/uploaded/${comment.user.avatar}`} size={36} />
                                            ) : (
                                                <Avatar className='border border-solid border-neutral-400' size={36} icon={<UserOutlined />} />
                                            )}
                                            <div className="text-zinc-800 text-[20px] font-bold">{comment.user.name}</div>
                                        </div>
                                        <div className="text-zinc-800 text-[17px] mb-3 ml-[44px] break-words font-normal">{comment.content}</div>
                                        <hr />
                                    </div>
                                ))}
                            </div>

                            <Form form={form} onFinish={onFinish} layout="inline">
                                <Form.Item className="w-full" name="content" rules={[{ required: true, message: 'Nhập bình luận' }]}>
                                    <Input className="w-full" placeholder="Nhập bình luận" suffix={<Button htmlType="submit" icon={<SendOutlined />} />} />
                                </Form.Item>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default RoomDetailsPage;
