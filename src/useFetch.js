import { useState, useEffect } from 'react';

const useFetch = (url) => {
  const [data, setdata] = useState(null);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState(null);

  const getData = async () => {
    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error('something went Wrong');
      }
      const data = await res.json();
      setdata(data);
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
  }, [url]);

  return { data, loading, error };
};
export default useFetch;
