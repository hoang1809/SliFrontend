import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { PostList, UserProfile } from 'models/model'; // Importing the PostList interface from the models directory
import Link from 'next/link';
import Header from 'components/layout/header/Header';
import { message } from 'antd';

const ResultsPage = () => {
  const router = useRouter();
  const [posts, setPosts] = useState<PostList['data']>([]);
  const [userId, setUserId] = useState<number | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const { address } = router.query;

  const formatter = (value: any) => `${value}đ`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');


  const fetchData = async () => {
    try {
      const response = await fetch('http://47.128.244.84:8001/room/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          address
        })
      });

      if (response.ok) {
        const data = await response.json();
        setPosts(data);
        console.log(data)
      } else {
        console.error('Error filtering rooms:', response.statusText);
      }
    } catch (error) {
      console.error('Error filtering rooms:');
    }
  };

  useEffect(() => {
    const storedAccessToken = localStorage.getItem('access_token');
    setAccessToken(storedAccessToken);
    fetchData();
    if (storedAccessToken) {
      fetchUserId(storedAccessToken);
    }
    if (address) {
      fetchData();
    }
  }, [address]);


  const fetchUserId = async (accessToken: string) => {
    const headers = {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    };
    try {
      const response = await fetch('http://47.128.244.84:8001/auth/profile', {
        method: 'GET',
        headers: headers
      });
      if (response.ok) {
        const userData: UserProfile = await response.json();
        setUserId(userData.id);
      } else {
        console.error('Failed to fetch user profile:', response.status);
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const handleClick = async (roomId: any, liked: any, event: React.MouseEvent<HTMLImageElement>) => {
    event.preventDefault();
    if (!accessToken) {
      message.error("Bạn cần đăng nhập để thích bài viết");
      return;
    }
    const url = liked ? `http://47.128.244.84:8001/room/${roomId}/unlike` : `http://47.128.244.84:8001/room/${roomId}/like`;
    const method = liked ? 'DELETE' : 'POST';
    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
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
        {posts.map((item, index) => {
          const liked = userId ? item.likedBy.some(like => like.user.id === userId) : false;
          return (
            <Link key={index} href={`/room/${item.id}`}>
              <div className="h-[557px] relative rounded-2xl hover:shadow-md bg-white flex flex-col">
                <div className='absolute top-4 right-4'>
                  <img src={liked ? "assets/icons/redHeart.svg" : "assets/icons/Heart.svg"} alt={liked ? "You liked this post" : "You didn't like this post"} onClick={(e) => handleClick(item.id, liked, e)} style={{ cursor: 'pointer' }} />
                </div>
                <div className='static'>
                  <img className="w-full h-[360px] rounded-t-2xl overflow-hidden mb-4" src={`http://47.128.244.84:8001/room/uploaded/${String(item.image[0])}`} alt="Property" />
                </div>
                <div className="flex-1 flex-col pb-4 px-4">
                  <div className='h-[65px] text-ellipsis overflow-hidden'>
                    <div className="text-zinc-800 w-full text-xl font-medium leading-7 text-ellipsis overflow-hidden">{item.title}</div>
                  </div>
                  <div className="text-neutral-400 h-[50px] text-ellipsis overflow-hidden text-[17px] font-normal leading-normal">{item.address}</div>
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
          );
        })}
      </div>
    </div>
  );
};

export default ResultsPage;
