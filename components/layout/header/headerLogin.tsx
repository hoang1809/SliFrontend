import React, { useEffect, useState } from 'react';
import logo from 'public/assets/icons/logo.svg'
import searchIcon from 'public/assets/icons/search-normal.svg'
import filterIcon from 'public/assets/icons/filter.svg'
import Image from 'next/image';
import { Avatar, Dropdown, MenuProps, Space, message } from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { UserProfile } from 'models/model';
import { useRouter } from 'next/router';
import Link from 'next/link';



const items: MenuProps['items'] = [
    {
        label: <Link href="/profile">Thiết lập tài khoản</Link>,
        key: '0',
    },
    {
        label: <Link href="/favorite">Yêu thích</Link>,
        key: '1',
    },
    {
        type: 'divider',
    },
    {
        label: 'Đăng xuất',
        key: '3',
    },
];

const HeaderLogin = () => {
    const router = useRouter();

    const handleGoHome = () => {
        router.push('/');
    };


    const handleLogout = () => {
        localStorage.removeItem('access_token');
        router.push('/');
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


    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (event: any) => {
        event.preventDefault();
        // Redirect to search results page with search query
        router.push(`/search?search_query=${encodeURIComponent(searchQuery)}`);
    };

    const handleChange = (event: any) => {
        setSearchQuery(event.target.value);
    };


    return (
        <div>
            <div className="w-full bg-white shadow-md">
                <div className="flex h-24 px-[120px] py-[24px] justify-between">

                    <div onClick={handleGoHome} className='flex cursor-pointer'>
                        <Image src={logo} alt="Logo"></Image>
                        <div className="ml-[24px] py-[8px] text-zinc-800 text-[28px] font-medium font-['Montserrat Alternates']">
                            Sli Home
                        </div>
                    </div>

                    <div className="flex">
                        <div className="flex w-[656px] border border-solid border-neutral-400 overflow-hidden rounded-full">
                            <form className="flex w-full px-4 items-center" onSubmit={handleSearch}>
                                <input
                                    name='address'
                                    type="search"
                                    className="flex-1 text-[17] focus:outline-none"
                                    placeholder="Bạn muốn an cư nơi nào?"
                                    value={searchQuery}
                                    onChange={handleChange}
                                />
                                <button type="submit" className="h-[24px]">
                                    <Image src={searchIcon} alt="Search"></Image>
                                </button>
                            </form>
                        </div>
                        <div className="ml-6 w-[48px] border border-solid border-neutral-400 rounded-full justify-center items-center inline-flex">
                            <Image src={filterIcon}></Image>
                        </div>
                    </div>

                    <div className='self-center'>
                        <Dropdown className=' inline-block h-full' menu={{ items, onClick }} trigger={['click']} >
                            <a onClick={(e) => e.preventDefault()}>
                                <Space>
                                    {userProfile && userProfile.avatar !== null ? (
                                        <Avatar className='border border-solid border-neutral-400' src={`http://47.128.244.84:8001/user/uploaded/${userProfile.avatar}`} size={48} />
                                    ) : (
                                        <Avatar className='border border-solid border-neutral-400' size={48} icon={<UserOutlined />} />
                                    )}
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