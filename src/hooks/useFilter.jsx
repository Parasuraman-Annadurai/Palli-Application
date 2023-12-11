import React, { useState, useEffect } from "react";

import useAPI from "./useAPI";

import { useAuth } from "../context/AuthContext";

import { API_END_POINT } from "../../config";

const useFilter = (url) => {
  const [filters, setFilters] = useState([]);
  const { token } = useAuth();
  const { data, makeNetworkRequest } = useAPI();
  useEffect(() => {
    makeNetworkRequest(
      `${API_END_POINT}/api/${url}/get/filter/fields/`,
      "GET",
      null
    );
  }, [token]);
  useEffect(() => {
    if (data && data.status === 200) {
      setFilters(
        Object.entries(data.data).map(([key, value]) => ({
          name: key,
          ...value,
        }))
      );
    }
  }, [data]);

  return filters;
};

export default useFilter;