import React, { useState, useEffect } from 'react';
import BlogList from './BlogList';

const Home = () => {
  const [blogs, setBlogs] = useState(null);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState(null);

  const getData = async () => {
    try {
      const res = await fetch('http://localhost:8000/blogs');
      if (!res.ok) {
        throw new Error('something went Wrong');
      }
      const data = await res.json();
      setBlogs(data);
      setloading(false);
      seterror(null);
    } catch (err) {
      if (err.name === 'AbortError') console.log('fetchaborted');
      else {
        setloading(false);
        seterror(err.message);
      }
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <React.Fragment>
      {loading && <div>Loading......</div>}
      {error && <div>{error}</div>}
      {blogs && (
        <div className="home">
          <BlogList blogs={blogs} title="All Blogs" />
          <BlogList
            blogs={blogs.filter((blog) => blog.author === 'mario')}
            title="Mario Blogs"
          />
        </div>
      )}
    </React.Fragment>
  );
};

export default Home;
