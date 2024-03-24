import React, { useEffect, useState } from 'react';
import logo from 'public/assets/icons/logousth.png';
import email from 'public/assets/icons/h-email.png'
import phone from 'public/assets/icons/h-phone.png'
import Image from 'next/image';
import { Avatar, Dropdown, MenuProps, Space, message } from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { UserProfile } from 'models/model';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Searchbar from 'components/searchbar';



const items: MenuProps['items'] = [
    {
        label: <Link href="/profile">Profile</Link>,
        key: '0',
    },
    {
        label: <Link href="/updatepassword">Password setting</Link>,
        key: '1',
    },
    {
        type: 'divider',
    },
    {
        label: 'Logout',
        key: '3',
    },
];

const HeaderLogin = ({ setSearchTerm }: { setSearchTerm: any }) => {
    const router = useRouter();

    const handleGoHome = () => {
        router.push('/');
    };


    const handleLogout = () => {
        localStorage.removeItem('access_token');
        if (window.location.pathname === '/') {
            window.location.reload();
        } else {
            router.push('/');
        }
    };

    const onClick: MenuProps['onClick'] = ({ key }) => {
        if (key === '3') {
            handleLogout();
        }
    };

    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const accessToken = localStorage.getItem('access_token');
                const response = await fetch('http://47.128.244.84:8001/auth/profile', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                if (response.ok) {
                    const userData = await response.json();
                    setUserProfile(userData);
                } else {
                    console.error('Error fetching user profile');
                }
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };

        fetchUserProfile();
    }, []);

    return (
        <div>
            <div className="bg-white border-solid border-b-8 border-[#273895]">
                <div className="flex px-[120px] py-[8px] items-center justify-between">

                    <div onClick={handleGoHome} className='flex cursor-pointer'>
                        <Image src={logo} height='80px' className='object-scale-down' alt="Logo"></Image>
                        {/* <div className="ml-[24px] py-[8px] border-solid border-l-[3px] border-red-500 text-zinc-800 text-[28px] font-medium font-['Montserrat Alternates']">
                            SLI
                        </div> */}
                    </div>

                    <div className="flex">
                        <div className="flex w-[350px] border border-solid border-neutral-400 overflow-hidden rounded-full">
                            <Searchbar setSearchTerm={setSearchTerm}></Searchbar>
                        </div>
                        {/* <div className="ml-6 w-[48px] border border-solid border-neutral-400 rounded-full flex justify-center items-center">
                            <ModalFilter></ModalFilter>
                        </div> */}
                    </div>

                    <div className='flex items-center justify-between'>
                        <div className='flex items-center justify-between'>
                            <Image src={email} height='48px' className='object-scale-down' ></Image>
                            <div className='flex-col text-gray-600'>
                                <p className='font-bold'>Email</p>
                                <p className='text-[#273895] font-semibold'>linhtinh@gmail.com</p>
                            </div>
                        </div>
                        <div className='flex items-center justify-between'>
                            <Image src={phone} height='48px' className='object-scale-down' ></Image>
                            <div className='flex-col text-gray-600'>
                                <p className='font-bold'>Hotline</p>
                                <p className='text-[#ec2227] font-semibold'>{`(+84) 247 772 7748`}</p>
                            </div>
                        </div>
                    </div>

                    <div className='self-center'>
                        <Dropdown className=' inline-block h-full' menu={{ items, onClick }} trigger={['click']} >
                            <a onClick={(e) => e.preventDefault()}>
                                <Space>
                                    {/* {userProfile && userProfile.avatar !== null ? (
                                        <Avatar className='border border-solid border-neutral-400' src={`http://47.128.244.84:8001/user/uploaded/${userProfile.avatar}`} size={48} />
                                    ) : (
                                        <Avatar className='border border-solid border-neutral-400' size={48} icon={<UserOutlined />} />
                                    )} */}
                                    <Avatar className='border border-solid border-neutral-400' size={48} icon={<UserOutlined />} />
                                    <DownOutlined />
                                </Space>
                            </a>
                        </Dropdown>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeaderLogin;