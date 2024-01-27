import Cards from 'components/cards';
import Header from 'components/layout/header/Header';
import { PostList } from 'models/model';
import Link from 'next/link';
import { useState, useEffect } from 'react';

function PostListPage() {
  const [posts, setPosts] = useState<PostList['data']>([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = () => {
      fetch('http://47.128.244.84:8001/room')
        .then((res) => res.json())
        .then((postData: PostList['data']) => {
          setPosts(postData);
          console.log(postData)
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
          setLoading(false);
        });
    };

    // Fetch data initially
    fetchData();

    // Set up interval to fetch data every 5 seconds
    const intervalId = setInterval(fetchData, 5000);

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (!posts || posts.length === 0) return <p>No posts available</p>;

  return (
    <>
      <Header />
      <div className="bg-[#F5F5F5] px-36 py-6 grid grid-cols-4 gap-6">
        {posts.map((item, index) => (
          <Link key={index} href={`/room/${item.id}`}>
            <a>
              <Cards
                image={item.image}
                title={item.title}
                address={item.address}
                price={item.price}
                area={item.area}
              />
            </a>
          </Link>
        ))}
      </div>
    </>
  );
}

export default PostListPage;
