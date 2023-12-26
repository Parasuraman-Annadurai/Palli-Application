import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { API_END_POINT } from "../../../config";
import "./scss/Applications.css";

const Applications = () => {
  const { id: batchId } = useParams();
  const { token } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    setLoading(true)
    const headers = {
      Authorization: `Bearer ${token.access}`,
      "Content-type": "application/json"
    }
    axios.get(`${API_END_POINT}/api/applicant/${batchId}/list/applicants/`, { headers })
      .then((res) => {
        setApplications(res.data);
        setLoading(false)
      })
  }, []);

  const handleSearch = (e) => {
    setSearchInput(e.target.value);
  };

  const filteredApplications = applications.data?.filter((application) => {
    const fullName = `${application.first_name} ${application.last_name}`.toLowerCase();
    const email = application.email.toLowerCase();
    const searchValue = searchInput.toLowerCase();
    return fullName.includes(searchValue) || email.includes(searchValue);
  });

  return (
    <main className="main-container">
      {/* ... (rest of your JSX remains unchanged) */}
      <div className="search-container">
        <img src="/public/icons/searchIcon.svg" alt="" className="search-icon" />
        <input
          type="text"
          placeholder="Search here"
          value={searchInput}
          onChange={handleSearch}
        />
        <img src="/public/icons/filterIcon.svg" alt="" className="filter-icon" />
      </div>
      <div className="application-list-container">
        {filteredApplications && (
          filteredApplications.map((application) => {
            const firstNameInitial = application.first_name.charAt(0);
            const lastNameInitial = application.last_name.charAt(0);

            return (
              <div className="application-card-container" key={application.id}>
                {/* ... (rest of your application card JSX remains unchanged) */}
              </div>
            )
          })
        )}
      </div>
    </main>
  );
};

export default Applications;
