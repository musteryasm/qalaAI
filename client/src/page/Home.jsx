import React, { useEffect, useState } from 'react';
import { Card, FormField, Loader } from '../components';

const RenderCards = ({ data, title }) => {
  if (data?.length > 0) {
    return data.map((post) => <Card key={post._id} {...post} />);
  }

  return <h2 className="mt-5 font-bold text-yellow-700 text-xl uppercase">{title}</h2>;
};

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [allPosts, setAllPosts] = useState(null);

  const [searchText, setSearchText] = useState('');
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState(null);

  const fetchPosts = async () => {
    setLoading(true);

    try {
      const response = await fetch('http://localhost:8080/api/v1/post', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const result = await response.json();
        setAllPosts(result.data.reverse());
      }
    } catch (err) {
      alert(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = allPosts.filter(
          (item) =>
            item.name.toLowerCase().includes(searchText.toLowerCase()) ||
            item.prompt.toLowerCase().includes(searchText.toLowerCase())
        );
        setSearchedResults(searchResult);
      }, 500)
    );
  }; 
  

  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <center><h1 className="font-extrabold text-5xl text-yellow-700">Welcome to qalaAI</h1></center>
        <center><p className="mt-2 text-yellow-700 text-lg max-w-[1000px]">
          Welcome to our qalaAI display website, where art comes alive. Immerse yourself in a world
          of vibrant creativity.Explore the passion and talent of Ai as it inspires and uplifts your soul. Step into our digital gallery and let qala
          captivate your senses.
        </p>
        </center>
      </div>

      <div className="mt-16">
        <p style={{ fontSize: '2rem' , color: 'brown'}}>Search something</p>
        <FormField
          value={searchText}
          onChange={handleSearchChange}
          placeholder="Search"
        />
      </div>

      <div className="mt-10">
        {loading ? (
          <div className="flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <>
            {searchText && (
              <h2 className="font-medium text-gray-600 text-xl mb-3">
                Showing Results for <span className="text-gray-900">{searchText}</span>:
              </h2>
            )}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {searchText ? (
                <RenderCards data={searchedResults} title="No Search Results Found" />
              ) : (
                <RenderCards data={allPosts} title="No Posts Yet" style={{color: 'brown'}}/>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Home;