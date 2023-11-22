import { useState, useEffect } from 'react';

const useAPI = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const makeNetworkRequest = async (url, method = 'GET', body = null, headers = {}) => {
    setLoading(true);

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
        body: body ? JSON.stringify(body) : null,
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const result = await response.json();
      setData(result);
      setError(null);
    } catch (error) {
      setData(null);
      setError(error.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };


  return { data, loading, error, makeNetworkRequest };
};

export default useAPI;