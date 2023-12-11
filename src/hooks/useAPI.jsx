import { useState } from 'react';

import axios from 'axios';

import { useAuth } from '../context/AuthContext';

const useAPI = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false)
  const {token} = useAuth()

  const makeNetworkRequest = async (url, method = 'GET', body = null, headers = {}) => {
    setLoading(true);
    try {
      const result = await axios({
        url,
        method,
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token.access}`,
          "Content-Type": "application/json",
          ...headers,
        },
        data: body ? JSON.stringify(body) : null,
      });

      setData(result.data);
      setIsCompleted(true);
      setError(null);
    } catch (error) {
      setData(null);
      setError(error.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, isCompleted, makeNetworkRequest };
};

export default useAPI;
