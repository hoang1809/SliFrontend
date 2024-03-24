import Header from 'components/layout/header/Header';
import Link from 'next/link';
import React from 'react';
import dvr from 'public/assets/icons/dvr.png'
import sortIcon from 'public/assets/icons/sort.svg'
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Room, UserProfile } from 'models/model';



export default function Home() {
    const [posts, setPosts] = useState<Room[]>([]);
    const [rentingId, setRentingId] = useState<number | null>(null);
    const currentDate = new Date();
    const formatter = (value: any) => `${value}đ`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [ascending, setAscending] = useState<boolean>(true);
    const fetchData = async () => {
        if (searchTerm) {
            fetch('http://localhost:8001/room/search', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: searchTerm,
                }),
            })
                .then((res) => res.json())
                .then((postData: Room[]) => {
                    setPosts(postData);
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                });
        } else {
            fetch('http://localhost:8001/room/')
                .then((res) => res.json())
                .then((postData: Room[]) => {
                    setPosts(postData);
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                });
        }
    };

    useEffect(() => {
        const accessToken = localStorage.getItem('access_token');
        fetchData();

        if (accessToken) {
            fetch('http://localhost:8001/user/profile', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
                .then((res) => res.json())
                .then((userProfile: UserProfile | null) => {
                    if (userProfile) {
                        setRentingId(userProfile.room?.id);
                    }
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                });
        }
    }, [searchTerm]);

    const sortTitle = () => {
        const sorted = [...posts].sort(function(a, b){return a.title-b.title});
        setPosts(ascending ? sorted : sorted.reverse());
        setAscending(!ascending);
    };
    const sortPrice = () => {
        const sorted = [...posts].sort(function(a, b){return a.price-b.price});
        setPosts(ascending ? sorted : sorted.reverse());
        setAscending(!ascending);
    };
    const sortArea = () => {
        const sorted = [...posts].sort(function(a, b){return a.area-b.area});
        setPosts(ascending ? sorted : sorted.reverse());
        setAscending(!ascending);
    };
    
    const sortCapacity = () => {
        const sorted = [...posts].sort(function(a, b){return a.capacity-b.capacity});
        setPosts(ascending ? sorted : sorted.reverse());
        setAscending(!ascending);
    };
    const sortFloor = () => {
        const sorted = [...posts].sort(function(a, b){return a.floor-b.floor});
        setPosts(ascending ? sorted : sorted.reverse());
        setAscending(!ascending);
    };
    const sortStatus = () => {
        const sorted = [...posts].sort(function(a, b){return Number(a.available) - Number(b.available)});
        setPosts(ascending ? sorted : sorted.reverse());
        setAscending(!ascending);
    };
    



    return (
        <div className='min-w-screen h-screen bg-[#f3f5f9] relative'>
            <Header setSearchTerm={setSearchTerm}></Header>
            <div className='w-full p-12'>
                <div className=' w-full bg-white p-12 rounded-2xl'>
                    {rentingId && (
                        <div>
                            <p className='font-semibold text-[#273895] text-3xl'>Current renting</p>
                            <Image src={dvr}></Image>
                            {posts?.map((item) => (
                                item.id === rentingId &&
                                <Link key={item.id} href={`/${item.id}`}>
                                    <div className=' flex p-9 mt-6 mb-16 overflow-x-auto items-center justify-around rounded-xl border-solid border-2 border-[#273895]'>
                                        <div>
                                            <p className='text-[#273895] text-2xl font-semibold pl-6'>{`P${item.title}`}</p>
                                            <p className=' text-xl pl-6'>{`Floor ${item.floor}`}</p>
                                        </div>
                                        <div className='flex items-center'>
                                            <p className='text-xl'>{`Number of student: `}</p>
                                            <p className='text-[#273895] text-2xl font-semibold pl-4'>{`${item.users.length}/${item.capacity}`}</p>
                                        </div>
                                        <div className='flex items-center'>
                                            <p className='text-xl'>{`Monthly rental price: `}</p>
                                            <p className='text-[#273895] text-2xl font-semibold pl-4'>{`${formatter(item.price)}`}</p>
                                        </div>
                                        <div>
                                            <div className='flex items-center'>
                                                <p className='text-xl'>{`Payment deadline: `}</p>
                                                <p className='text-[#273895] text-2xl font-semibold pl-4'>{`${item.deadline}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`}</p>
                                            </div>
                                            {currentDate > new Date(`${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${item.deadline}`) &&
                                                <p className='italic text-xl text-red-600 font-thin pl-[190px]'>{`(Overdue)`}</p>
                                            }
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )
                    }
                    <p className='font-semibold text-[#273895] text-3xl'>Room list</p>
                    <Image src={dvr}></Image>
                    <div className="mt-6 overflow-x-auto rounded-xl border-solid border-2 border-[#273895]">
                        <table className="w-full  text-sm  text-left text-gray-500">
                            <thead className="text-base font-bold text-[#273895] uppercase bg-[#f3f5f9]">
                                <tr>
                                    <th className="items-center px-6 py-3">
                                        Room id
                                        <button className='pl-3' onClick={sortTitle}><Image src={sortIcon}/></button>
                                    </th>
                                    <th className="px-6 py-3 items-center">
                                        Floor
                                        <button className='pl-3' onClick={sortFloor}><Image src={sortIcon}/></button>
                                    </th>
                                    <th className="px-6 py-3 items-center">
                                        Area
                                        <button className='pl-3' onClick={sortArea}><Image src={sortIcon}/></button>
                                    </th>
                                    <th className="px-6 py-3 items-center">
                                        Capacity
                                        <button className='pl-3' onClick={sortCapacity}><Image src={sortIcon}/></button>
                                    </th>
                                    <th className="px-6 py-3 items-center">
                                        Status
                                        <button className='pl-3' onClick={sortStatus}><Image src={sortIcon}/></button>
                                    </th>
                                    <th className="px-6 py-3 items-center">
                                        Monthly rental price
                                        <button className='pl-3' onClick={sortPrice}><Image src={sortIcon}/></button>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {posts?.map((item) => {
                                    return (
                                        <Link key={item.id} href={`/${item.id}`}>
                                            <tr key={item.id} className="bg-white border-solid border-b-2 border-[#f3f5f9] hover:bg-[#f3f5f9]">
                                                <td scope="row" className="py-4 pl-9 font-semibold text-gray-900 whitespace-nowrap dark:text-white">
                                                    {item.title}
                                                </td>
                                                <td className="pl-9 py-4">
                                                    {item.floor}
                                                </td>
                                                <td className="pl-8 py-4">
                                                    {`${item.area}m2`}
                                                </td>
                                                <td className="pl-14 py-4">
                                                    {item.capacity}
                                                </td>
                                                {item.available === true ? <td className="px-6 py-4 text-green-600 italic">Available</td> : <td className="px-6 py-4 text-red-600 italic">Unavailable</td>}
                                                <td className="pl-[90px] py-4">
                                                    {formatter(item.price)}
                                                </td>
                                            </tr>
                                        </Link>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
