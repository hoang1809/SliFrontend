import { useEffect, useState } from 'react'
import { PostList } from 'models/model';
import Header from 'components/layout/header/Header';
import Link from 'next/link';

export default function Favorite() {
    const [posts, setPosts] = useState<PostList['data']>([]);
    const [accessToken, setAccessToken] = useState<string | null>(null);


    const fetchData = () => {
        const accessToken = localStorage.getItem('access_token');


        fetch('http://47.128.244.84:8001/room/liked', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })
            .then((res) => res.json())
            .then((postData: PostList['data']) => {
                setPosts(postData);
                console.log(postData)
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    };

    const formatter = (value: any) => `${value}đ`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');


    useEffect(() => {
        const accessToken = localStorage.getItem('access_token');
        setAccessToken(accessToken);
        console.log(accessToken)
        fetchData();
    }, []);

    const handleClick = async (roomId: any, event: React.MouseEvent<HTMLImageElement>) => {
        event.preventDefault();
        const url = `http://47.128.244.84:8001/room/${roomId}/unlike`;
        const method = 'DELETE';
        try {
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsImVtYWlsIjoiYmJiQGdtYWlsLmNvbSIsImlhdCI6MTcwNjUwNzE1NCwiZXhwIjoxNzA2NTkzNTU0fQ.2DcJeu5lhcJcF9uL2WD0Xk9QZHQVhLBfDPo8XVLgqAE`,
                },
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            fetchData();
        } catch (error) {
            console.error('Error:', (error as Error).message);
        }
    };

    return (
        <div className='bg-[#F5F5F5] h-screen'>
            <Header />
            <div className="bg-[#F5F5F5] px-36 py-6 grid grid-cols-4 gap-6">
                {posts.map((item, index) => (
                    <Link key={index} href={`/room/${item.id}`}>
                        <div className="h-[557px] relative rounded-2xl hover:shadow-md bg-white flex flex-col">
                            <div className='absolute top-4 right-4'>
                                <img src="assets/icons/redHeart.svg" onClick={(e) => handleClick(item.id, e)} style={{ cursor: 'pointer' }} />
                            </div>
                            <div className='static'>
                                <img className="w-full h-[360px] rounded-t-2xl overflow-hidden mb-4" src={`http://47.128.244.84:8001/room/uploaded/${String(item.image[0])}`} alt="Property" />
                            </div>
                            <div className="flex-1 flex-col pb-4 px-4">
                                <div className='h-[70px] text-ellipsis overflow-hidden'>
                                    <div className="text-zinc-800 w-full text-xl font-medium leading-7 text-ellipsis overflow-hidden">{item.title}</div>
                                </div>
                                <div className="text-neutral-400 h-[45px] text-ellipsis overflow-hidden text-[17px] font-normal leading-normal">{item.address}</div>
                                <div className="flex justify-between">
                                    <div className="text-[32px] font-semibold leading-[44.80px] text-[#F2584C]">{formatter(item.price)}</div>
                                    <div className='flex space-x-2'>
                                        <img src="assets/icons/area.svg" alt="m2" />
                                        <div className="text-zinc-800 self-center text-[17px] font-normal">{item.area}m2</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}
