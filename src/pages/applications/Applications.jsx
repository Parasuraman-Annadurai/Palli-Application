import React, { useEffect, useState } from "react";

import { useParams} from "react-router-dom";

import axios from "axios";
import {
  notification
} from "antd";


import { API_END_POINT } from "../../../config";

import { useAuth } from "../../context/AuthContext";

import FilterComponent from "../../components/FilterComponent";

import ApplicationViewMore from "../../components/ApplicationViewMore";
import ApplicationListView from "../../components/ApplicationList";


import useFilter from "../../hooks/useFilter";

import "./scss/css/Applications.css";

import { getPermission } from "../../utils/validate";

const Applications = () => {
  const filterFields = useFilter("applicant");  
  const { id: batchId } = useParams();
  const { token, user } = useAuth();
  const [isLoading, setLoading] = useState(true);
  const [popoverVisible, setPopoverVisible] = useState(false);

  const [viewMoreApplicant, setViewMoreApplicant] = useState([]);
  const [applications, setApplications] = useState({ data: [] });
  const [applicationSearch, setApplicationSearch] = useState("");
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const [filterValues, setFilterValues] = useState({});

  const headers = {
    Authorization: `Bearer ${token.access}`,
    "Content-type": "application/json",
  };

  useEffect(() => {
    setLoading(true);
    if (getPermission(user.permissions, "Applicant", "read")) {
      let urlBuild = `${API_END_POINT}/api/applicant/${batchId}/list/applicants/?limit=${limit}&page=${page}&`;
      if (Object.keys(filterValues).length > 0) {
        Object.keys(filterValues).forEach((key) => {
          urlBuild += `filter_${key}=${filterValues[key]}&`;
        });
      }
      if (applicationSearch) {
        urlBuild += `search=${applicationSearch}`;
      }
      axios
        .get(urlBuild, { headers })
        .then((res) => {
          setApplications(res.data);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          if (
            error.response.data.status === 400 ||
            "errors" in error.response.data
          ) {
            const errorMessages = error.response.data.errors;
  
            Object.entries(errorMessages).forEach(([key, messages]) => {
              notification.error({
                message: `${key} Error`,
                description: messages,
                duration:1
              })
            });
          }
        });
    }
  }, [filterValues, batchId, limit, page, applicationSearch]);

  const handleRemoveFilter = (fieldName) => {
    const updatedFilterState = { ...filterValues };

    if (fieldName in updatedFilterState) {
      // Use the 'delete' operator to remove the specified key
      delete updatedFilterState[fieldName];

      // Update the state with the modified filterValues
      setFilterValues(updatedFilterState);
    }
  };

  const content = (
    <div>
      <FilterComponent
        filter={filterFields}
        setPopoverVisible={setPopoverVisible}
        filterValues={filterValues}
        setFilterValues={setFilterValues}
      />
    </div>
  );

  const handleViewMore = (applicantId) => {
    let copyApplications = [...applications.data];
    copyApplications = copyApplications.filter(
      (application) => application.id === applicantId
    );

    setViewMoreApplicant(copyApplications);
  };



  return viewMoreApplicant?.length > 0 ? (
    <ApplicationViewMore viewMoreApplicant={viewMoreApplicant} handleViewMore={handleViewMore}/>
  ) : (
    <ApplicationListView 
    applicationSearch={applicationSearch}
    popoverVisible={popoverVisible}
    content={content}
    limit={limit}
    handleRemoveFilter={handleRemoveFilter}
    setPage={setPage}
    handleViewMore={handleViewMore}
    setApplicationSearch={setApplicationSearch}
    setPopoverVisible={setPopoverVisible}
    user={user} applications={applications} filterValues={filterValues} isLoading={isLoading} getPermission={getPermission}/>

  );
};

export default Applications;
