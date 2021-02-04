import React from 'react';
import BlogList from './BlogList';
import useFetch from './useFetch';
const Home = () => {
  const { data: blogs, loading, error } = useFetch(
    'http://localhost:8000/blogs'
  );
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
