import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { PostList } from 'models/model'; // Importing the PostList interface from the models directory
import Link from 'next/link';
import Cards from 'components/cards';
import Header from 'components/layout/header/Header';
import { message } from 'antd';

const ResultsPage = () => {
  const router = useRouter();
  const [searchResults, setSearchResults] = useState<PostList['data']>([]); // Adjusting the state type to match the data property of PostList

  useEffect(() => {
    const fetchSearchResults = async (address: string) => {
      try {
        const response = await fetch('http://47.128.244.84:8001/room/search', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ address }),
        });
        const data: PostList['data'] = await response.json();
        console.log(data);
        setSearchResults(data);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    };

    const { search_query } = router.query;
    if (search_query) {
      fetchSearchResults(search_query as string);
    }
  }, [router.query]);


  return (
    <>
    <Header></Header>
      <div className="bg-[#F5F5F5] px-36 py-6 grid grid-cols-4 gap-6">
        {searchResults?.map((item, index) => (
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
};

export default ResultsPage;
