import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Pagination, Popover, Tag, Skeleton, Dropdown } from "antd";
import { API_END_POINT } from "../../../config";

import { useAuth } from "../../context/AuthContext";

import "./scss/Applications.css";
import useFilter from "../../hooks/useFilter";

import FilterComponent from "../../components/FilterComponent";

const Applications = () => {
  const filterFields = useFilter("applicant");
  const { id: batchId } = useParams();
  const { token } = useAuth();
  const [isLoading, setLoading] = useState(false);
  const [viewMoreApplicant, setViewMoreApplicant] = useState([]);
  const [applications, setApplications] = useState({ data: [] });
  const [applicationSearch, setApplicationSearch] = useState("");
  const [appliedFilterShow, setAppliedFilterShow] = useState({});
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const [filterState, setFilterState] = useState({
    district: null,
    annualIncomeMin: 0,
    annualIncomeMax: 0,
    userStatus: 0,
    degree: 0,
    venue: null,
    pincode: null,
    subject: null,
    markMin: 0,
    markMax: 0,
  });

  const headers = {
    Authorization: `Bearer ${token.access}`,
    "Content-type": "application/json",
  };
  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `${API_END_POINT}/api/applicant/${batchId}/list/applicants/?limit=${limit}&page=${page}&search=${applicationSearch}`,
        { headers }
      )
      .then((res) => {
        setApplications(res.data);
        setLoading(false);
      });
  }, [applicationSearch, limit, page]);

  const handleApplyFilter = (filterData) => {
    setAppliedFilterShow(filterData);
    Object.keys(filterData).map((key) => {
      filterState[key] = filterData[key];
    });
  };

  const content = (
    <div>
      <FilterComponent filter={filterFields} applyFilter={handleApplyFilter} />
    </div>
  );

  const handleViewMore = (applicantId) => {
    const applicantDetails = applications.data.filter(
      (applicant) => applicant.id === applicantId
    );
    setViewMoreApplicant(applicantDetails);
  };

  return viewMoreApplicant.length > 0 ? (
    viewMoreApplicant.map((details) => {
      return (
        <main className="application-view-more-container" key={details.id}>
          <div className="left-side">
            <div className="top-section">
              <div className="application-name">
                <p className="heading">Applications list</p>
                <img src="/public/icons/dropdown.svg" alt="" />
                <p className="name">
                  {details.first_name} {details.last_name}
                </p>
              </div>
              <div className="search-input">
                {/* <input type="text" placeholder="Search here" /> */}
                <button
                  className="btn primary-medium"
                  onClick={() => handleViewMore([])}
                >
                  Back
                </button>
              </div>
            </div>
            <div className="personal-and-education-section">
              <div className="personal-details-heading-section flex">
                <h1 className="heading-name">Personal Details</h1>
                <div className="horizon-line"></div>
              </div>
              <div className="personal-details-section flex">
                <div className="personal-detial-background">
                  <div className="details-section">
                    <p className="personal-detial-title">Name</p>
                    <p className="personal-detial-name">
                      {details.first_name} {details.last_name}
                    </p>
                  </div>
                </div>
                <div className="personal-detial-background">
                  <div className="details-section">
                    <p className="personal-detial-title">Email id</p>
                    <p className="personal-detial-name">{details.email}</p>
                  </div>
                </div>
                <div className="personal-detial-background">
                  <div className="details-section">
                    <p className="personal-detial-title">Gender</p>
                    <p className="personal-detial-name">Male</p>
                  </div>
                </div>
                <div className="personal-detial-background">
                  <div className="details-section">
                    <p className="personal-detial-title">Date of Birth</p>
                    <p className="personal-detial-name">{details.dob}</p>
                  </div>
                </div>
                <div className="personal-detial-background">
                  <div className="details-section">
                    <p className="personal-detial-title">Street Address</p>
                    <p className="personal-detial-name">{details.address}</p>
                  </div>
                </div>
              </div>
              <div className="personal-details-section-two flex">
                <div className="personal-detial-background">
                  <p className="personal-detial-title">Contact Number</p>
                  <span className="personal-detial-name">
                    {details.contact_number}
                  </span>
                </div>
                <div className="personal-detial-background">
                  <p className="personal-detial-title">Whatsapp Number</p>
                  <span className="personal-detial-name">
                    {details.whatsapp_number}
                  </span>
                </div>
                <div className="personal-detial-background">
                  <p className="personal-detial-title">Aadhar Number</p>
                  <span className="personal-detial-name">
                    {details.aadhaar_number}
                    <a>View document</a>
                  </span>
                </div>
              </div>
              <div className="Guardian-details-heading-section">
                <p className="heading-name">Guardian Details</p>
                <div className="line"></div>
              </div>
              <div className="Guardian-details-section flex">
                <div className="Guardian-detial-background">
                  <div className="details-section">
                    <p className="Guardian-detial-title">
                      Guardian/Parent Name
                    </p>
                    <p className="Guardian-detial-name">
                      {details.care_taker_name}
                    </p>
                  </div>
                </div>
                <div className="Guardian-detial-background">
                  <div className="details-section">
                    <p className="Guardian-detial-title">
                      Guardian/Parent Relationship
                    </p>
                    <p className="Guardian-detial-name">
                      {details.care_taker_relation}
                    </p>
                  </div>
                </div>
                <div className="Guardian-detial-background">
                  <div className="details-section">
                    <p className="Guardian-detial-title">
                      Guardian/Parent Phone Number
                    </p>
                    <p className="Guardian-detial-name">
                      {details.care_taker_number}
                    </p>
                  </div>
                </div>
                <div className="Guardian-detial-background">
                  <div className="details-section">
                    <p className="Guardian-detial-title">
                      Annual Family Income
                    </p>
                    <p className="Guardian-detial-name">
                      {details.annual_income}
                    </p>
                  </div>
                </div>
                <div className="Guardian-detial-background">
                  <div className="details-section">
                    <p className="Guardian-detial-title">Ration/Family Card</p>
                    <p className="Guardian-detial-name">
                      <a>View document</a>
                    </p>
                  </div>
                </div>
              </div>
              <div className="Educational-details-heading-section">
                <p className="heading-name">Educational Details</p>
                <div className="line"></div>
              </div>
              <div className="Educational-details-list-container">
                <div className="educational-background-one-container">
                  <div className="curent-qul">
                    <p>
                      Currently Eductional Qualification:
                      <a>Completed Diploma</a>
                    </p>
                  </div>
                  <div className="educational-details flex">
                    <div className="institution">
                      <span>Institute or School</span>
                      <p>Government</p>
                    </div>
                    <div className="year-completion">
                      <span>Year completion</span>
                      <p>2019</p>
                    </div>
                    <div className="medium">
                      <span>Medium</span>
                      <p>English</p>
                    </div>
                    <div className="score">
                      <span>English score</span>
                      <p>067</p>
                    </div>
                    <div className="math-score">
                      <span>Maths score</span>
                      <p>092</p>
                    </div>
                    <div className="total-percentage">
                      <span>Total Percentage</span>
                      <p>
                        84% <a href="">View document</a>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="educational-background-second-container">
                  <div className="curent-qul">
                    <p>
                      Currently Eductional Qualification: <a href="">SSLC</a>
                    </p>
                  </div>
                  <div className="educational-details flex">
                    <div className="school-type">
                      <span>School Type</span>
                      <p>Government</p>
                    </div>
                    <div className="year-completion">
                      <span>Year Completion</span>
                      <p>2023</p>
                    </div>
                    <div className="medium">
                      <span>Medium</span>
                      <p>English</p>
                    </div>
                    <div className="english">
                      <span>English score</span>
                      <p>067</p>
                    </div>
                    <div className="math">
                      <span>Maths score</span>
                      <p>092</p>
                    </div>
                    <div className="total-percentage">
                      <span>Total Percentage</span>
                      <p>
                        84% <a href="">View document</a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="skillset-and-other-details flex">
                <div className="skillset-container">
                  <div className="skillset-details-heading-section">
                    <p className="heading-name">Other Skillset</p>
                    <div className="line"></div>
                  </div>

                  <div className="skillset-detial-background-section">
                    <div className="details-section">
                      <p className="skillset-detial-title">
                        Extra cuticular certificates or creative work of yours
                      </p>
                      <p className="skillset-detial-name">
                        to popular belief, Lorem Ipsum is not simply random
                        text. It has roots in a piece of classNameical Latin
                        literature from 45 BC, making it over 2000 years old.
                        Richard
                      </p>
                    </div>
                  </div>
                  <div className="skillset-detial-background-section">
                    <div className="details-section">
                      <p className="skillset-detial-title">
                        Computer course certification
                      </p>
                      <p className="skillset-detial-name">
                        to popular belief, Lorem Ipsum is not simply random
                        text. It has roots in a piece of classNameical Latin
                        literature from 45 BC, making it over 2000 years old.
                        Richard
                      </p>
                    </div>
                  </div>
                </div>
                <div className="Learning-devices-section">
                  <div className="Learning-details-heading-section">
                    <p className="heading-name">Learning Devices</p>
                    <div className="line"></div>
                  </div>

                  <div className="Learning-detial-background">
                    <div className="details-section">
                      <p className="Learning-detial-title">
                        What Device You/ Your Famil own?
                      </p>
                      <p className="Learning-detial-name">
                        I dont have accessibility to phone or any devices. Look
                        forward to your support to appear in entrance exam
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="genaral-details-section">
                <div className="genaral-details-heading-section">
                  <p className="heading-name">Genaral Details</p>
                  <div className="line"></div>
                </div>

                <div className="general-details-list-container flex">
                  <div className="left-side-genaral-detial-background">
                    <div className="first-section">
                      <span>How did you come to know DCKAP Palli Program?</span>
                      <p>DCKAP Employee</p>
                    </div>
                    <div className="second-section">
                      <span>
                        Please leave any additional information if you would
                        like to share with us
                      </span>
                      <p>
                        To popular belief, Lorem Ipsum is not simply random
                        text. It has roots in a piece of classNameical Latin
                        literature from 45 BC, making it over 2000 years old.
                        Richard
                      </p>
                    </div>
                  </div>
                  <div className="right-side-genaral-detial-background">
                    <div className="first-section">
                      <span> Why do you want to take up this training? </span>
                      <p>
                        to popular belief, Lorem Ipsum is not simply random
                        text. It has roots in a piece of classNameical Latin
                        literature from 45 BC, making it over 2000 years old.
                        Richard
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      );
    })
  ) : (
    <main className="application-full-container">
      <div className="application-main-container flex">
        <div className="header-name">
          <h1>Application list</h1>
        </div>
        <div className="application-actions flex">
          <div className="import">
            <button className="btn primary-medium">Import</button>
          </div>
        </div>
      </div>
      <div className="application-inner-container">
        <div className="search-container">
          <img
            src="/public/icons/searchIcon.svg"
            alt=""
            className="search-icon"
          />
          <input
            type="text"
            placeholder="Search here"
            onChange={(e) => setApplicationSearch(e.target.value)}
          />

          <Popover placement="leftTop" content={content} title="Title">
            <img
              src="/public/icons/filterIcon.svg"
              alt=""
              className="filter-icon"
            />{" "}
          </Popover>
        </div>
        <div className="filter-or-search-container">
          {applicationSearch ? (
            <Tag color="#49a843">Search : {applicationSearch}</Tag>
          ) : (
            ""
          )}
          {appliedFilterShow &&
            Object.keys(appliedFilterShow).map((filterName) => (
              <Tag color="#49a843">{`${filterName} : ${appliedFilterShow[filterName]} `}</Tag>
            ))}
        </div>

        <div className="application-list-container">
          {isLoading ? (
            <Skeleton active paragraph={20} />
          ) : (
            applications.data.map((application) => (
              <div
                className="application-card-container"
                key={application.id}
                onClick={() => handleViewMore(application.id)}
              >
                <div className="application-details-container flex">
                  <div className="application-info flex">
                    <div className="application-name-container">
                      <p>
                        {application.first_name[0]}
                        {application.last_name[0]}
                      </p>
                    </div>
                    <div class="application-email-container">
                      <p class="application-name">
                        {application.first_name} {application.last_name}
                      </p>
                      <p className="application-email">{application.email}</p>
                    </div>
                  </div>
                  <div className="application-gender">
                    <p>Aadhaar No</p>
                    <span>{application.aadhaar_number}</span>
                  </div>
                  <div className="application-dob">
                    <p>Date of Birth</p>
                    <span>{application.dob}</span>
                  </div>
                  <div className="application-district">
                    <p>District</p>
                    <span>{application.district}</span>
                  </div>
                  <div className="application-qualification">
                    <p>State</p>
                    <span>{application.state}</span>
                  </div>
                  <div className="application-mobile-no">
                    <p>Mobile No</p>
                    <span>{application.contact_number}</span>
                  </div>
                  <div className="application-10th-percentage">
                    <p>Care Taker Name</p>
                    <span>{application.care_taker_name}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="application-pagination-container flex">
          {applications.data.length > 0 && (
            <Pagination
              className="pagination"
              current={applications.currentPage}
              pageSize={limit}
              total={applications.total}
              onChange={(page) => setPage(page)}
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default Applications;
