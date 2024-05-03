import React, { useState } from "react";
import { Tabs } from "antd";
const { TabPane } = Tabs;
import "./scss/ApplicationForm.css";

const ApplicationForm = () => {
  const [applicationForm, setApplicationFrom] = useState({});
  const [currentTab, setCurrentTab] = useState("1");
  const onchange = (event) => {
    const { name, value, type, files } = event.target;

    // If the target is a file input
    if (type === "file") {
      // Access the uploaded file(s)
      const file = files[0]; // Assuming single file upload

      // Update state with both file and its name
      setApplicationFrom({
        ...applicationForm,
        [name]: { file, fileName: file.name },
      });
    } else {
      // For other input types (text, select, radio, etc.)
      setApplicationFrom({ ...applicationForm, [name]: value });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  };

  const handleNextTab = () => {
    let nextTab = parseInt(currentTab) + 1;
    setCurrentTab(nextTab.toString());
  };

  const handlePreviousTab = () => {
    let previousTab = parseInt(currentTab) - 1;
    setCurrentTab(previousTab.toString());
  };

  return (
    <div className="application-form-main-container">
      <div className="form-header flex">
        <div className="form-logo">
          <img
            className="logo"
            src="/images/dckap_palli_logo_sm.svg"
            alt="logo"
          />
        </div>
        <div className="form-tittle">
          <h3>Application Form 2024 - 2025</h3>
        </div>
      </div>
      <div className="sub-container flex">
        <div className="requirement-criteria-container">
          <div className="criteria-heading">Eligibility criteria</div>
          <div className="criteria-content">
            <p> 1. Only Students from Tamilnadu are eligible to apply</p>
            <p>2. DOB: After Jan 1, 2003, Before December 31, 2007</p>
            <p>
              {" "}
              3. Highest Qualification: Class12/ 10+3 Diploma / 12+2 Diploma (At
              least in the final/semester of Diploma) - the year of passing:
              2024
            </p>
            <p>
              {" "}
              4. Students from an underprivileged or low-incom background with
              an annual family income of less than 3 laks{" "}
            </p>
            <p>
              {" "}
              5. Mandatory Subject: Maths/Business Maths, Science / Computer
              Science, English (Medium of schooling in Native language is not a
              barrier).
            </p>
            <p>
              {" "}
              6. Degree holders or those who are currently in their graduation
              are not eligible.
            </p>
            <p>
              <span> Note:</span> This form requires you to upload Aadhar,
              Ration Card, Income Certificate, and extracurricular activities
              certificates (optional) and share details on 10th & 12th/ Diploma
              marks and other details. Please keep the information handy while
              filling out the form.
            </p>
          </div>
        </div>
        <div className="application-form-container">
          <div className="meu-content">
            <Tabs
              rootClassName="all-tabs"
              activeKey={currentTab}
              defaultActiveKey="1"
              items={[
                {
                  key: "1",
                  label: (
                    <span>
                      <img
                        style={{ width: "20px" }}
                        src="/icons/personal.svg"
                      />
                      Personal Details
                    </span>
                  ),
                  children: (
                    <div className="personal-container">
                      <div className="personal-form">
                        <div className="row-one flex">
                          <div className="applicant-name">
                            <p>
                              Student Name <span>*</span>
                            </p>
                            <input
                              placeholder="Type here"
                              type="text"
                              name="student-name"
                              onChange={onchange}
                            />
                          </div>
                          <div className="applicant-dob">
                            <p>
                              Student Date of Birth <span>*</span>
                            </p>
                            <input type="date" name="dob" onChange={onchange} />
                          </div>
                          <div className="applicant-gender">
                            <p>
                              Gender <span>*</span>
                            </p>
                            <input
                              placeholder="Type here"
                              type="text"
                              name="gender"
                              onChange={onchange}
                            />
                          </div>
                        </div>


                        <div className="row-two flex">
                          <div className="applicant-email">
                            <p>Email id <span>*</span></p>
                            <input
                              placeholder="Type here"
                              type="text"
                              name="email"
                              onChange={onchange}
                            />
                          </div>
                          <div className="applicant-contact-number">
                            <p>Contact Number <span>*</span></p>
                            <input
                              placeholder="Type here"
                              type="text"
                              name="content-number"
                              onChange={onchange}
                            />
                          </div>
                        </div>


                        <div className="row-three flex">
                          <div className="applicant-whatsapp-number">
                            <p>Whatsapp Phone Number <span>*</span></p>
                            <input
                              placeholder="Type here"
                              type="text"
                              name="whatsapp-number"
                              onChange={onchange}
                            />
                          </div>
                          <div className="applicant-address">
                            <p>Street Address <span>*</span></p>
                            <input
                              placeholder="Type here"
                              type="text"
                              name="address"
                              onChange={onchange}
                            />
                          </div>
                          <div className="applicant-apartment">
                            <p>Apartment, suite, etc <span>*</span></p>
                            <input
                              placeholder="Type here"
                              type="text"
                              name="apartment"
                              onChange={onchange}
                            />
                          </div>
                        </div>


                        <div className="row-four flex">
                          <div className="applicant-postcode">
                            <p>ZIP / Postal Code <span>*</span></p>
                            <input
                              placeholder="Type here"
                              type="text"
                              name="post-code"
                              onChange={onchange}
                            />
                          </div>
                          <div className="applicant-city">
                            <p>City<span>*</span></p>
                            <input
                              placeholder="Type here"
                              type="text"
                              name="city"
                              onChange={onchange}
                            />
                          </div>
                          <div className="applicant-whatsapp-number">
                            <p>Country<span>*</span></p>
                            <input
                              placeholder="Type here"
                              type="text"
                              name="country"
                              onChange={onchange}
                            />
                          </div>
                        </div>


                        <div className="row-five flex">
                          <div className="applicant-whatsapp-number">
                            <p>Aadhar Card Number <span>*</span></p>
                            <input
                              placeholder="Type here"
                              type="text"
                              name="aadhar-number"
                              onChange={onchange}
                            />
                          </div>
                          <div className="applicant-postcode">
                            <p>Upload the Aadhar Card <span>*</span></p>
                            <input
                              placeholder="Type here"
                              type="file"
                              name="aadhar-doc"
                              onChange={onchange}
                            />
                          </div>
                        </div>

                      </div>
                    </div>
                  ),
                },
                {
                  key: "2",
                  label: (
                    <span>
                      <img
                        style={{ width: "20px" }}
                        src="/icons/guardian.svg"
                      />
                      Parent/Guardian Details
                    </span>
                  ),
                  children: (
                    <div className="guardian-details-container">
                      <div className="guardian-form">
                        <div className="row-one">
                          <div className="parent-name">
                            <label>Guardian/Parent Name <span>*</span></label>
                            <input
                              type="text"
                              placeholder="Type here"
                              name="parent-name"
                              onChange={onchange}
                            />
                          </div>
                          <div className="parent-name">
                            <label>Guardian/Parent Relationship <span>*</span></label>
                            <input
                              type="text"
                              placeholder="Type here"
                              name="guardian-relationship"
                              onChange={onchange}
                            />
                          </div>
                          <div className="parent-name">
                            <label>Guardian/Parent Phone Number <span>*</span></label>
                            <input
                              type="text"
                              placeholder="Type here"
                              name="guardian-number"
                              onChange={onchange}
                            />
                          </div>
                        </div>
                        <div className="row-two">
                          <div className="annual-income">
                            <label>Annual Family Income <span>*</span></label>
                            <input
                              type="text"
                              placeholder="Type here"
                              name="annual-income"
                              onChange={onchange}
                            />
                          </div>
                          <div className="smart-card">
                            <label>Upload the Smart Card <span>*</span></label>
                            <input
                              type="file"
                              
                              name="smart-card-file"
                              onChange={onchange}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  key: "3",
                  label: (
                    <span>
                      <img
                        style={{ width: "20px" }}
                        src="/icons/education.svg"
                      />
                      Education Details
                    </span>
                  ),
                  children: (
                    <div className="education-details-container">
                      <div className="education-form">
                        <div className="row-one">
                          <div className="current-education">
                            <label>Currently Eductional Qualification <span>*</span></label>
                            <div className="education-options">
                              <div className="one">
                                <input
                                  type="radio"
                                  name="current-12"
                                  onChange={onchange}
                                />
                                <label>Currently in 12th</label>

                              </div>
                              <div className="two">
                                <input
                                  type="radio"
                                  name="completed-12"
                                  onChange={onchange}
                                />
                                <label>Completed 12th</label>

                              </div>
                              <div className="three">
                                <input
                                  type="radio"
                                  name="pursuing-diploma"
                                  onChange={onchange}
                                />
                                <label>Currently pursuing Diploma</label>

                              </div>
                              <div className="four">
                                <input
                                  type="radio"
                                  name="completed-diploma"
                                  onChange={onchange}
                                />
                                <label>Completed Diploma</label>

                              </div>
                              <div className="five">
                                <input
                                  type="radio"
                                  name="others"
                                  onChange={onchange}
                                />
                                <label>others</label>

                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row-two">
                          <div className="heading">
                            <h6>10th Standard Details</h6>
                            <div className="hr-line"></div>
                          </div>
                          <div className="tenth-container">
                            <div className="tenth">
                              <label>10th: Medium of Instruction <span>*</span></label>
                              <select
                                id=""
                                name="10th-medium"
                                onChange={onchange}
                              >
                                <option value="">Select</option>
                              </select>
                            </div>
                            <div className="tenth">
                              <label>10th: School Type <span>*</span></label>
                              <select
                                id=""
                                name="10th-school-type"
                                onChange={onchange}
                              >
                                <option value="">Select</option>
                              </select>
                            </div>
                            <div className="tenth">
                              <label>10th: Year of Completion <span>*</span></label>
                              <select
                                id=""
                                name="10th-year-completion"
                                onChange={onchange}
                              >
                                <option value="">Select</option>
                              </select>
                            </div>
                          </div>

                        </div>
                        <div className="row-three">
                          <div className="tenth">
                            <label>10th: Math & English Score <span>*</span></label>
                            <div className="two-inputs">
                              <input
                                type="text"
                                placeholder="Type here"
                                name="English Score"
                                onChange={onchange}
                              />
                              <input
                                type="text"
                                placeholder="Type here"
                                name="English Score"
                                onChange={onchange}
                              />
                            </div>

                          </div>
                          <div className="tenth">
                            <label>Total Percentage <span>*</span></label>
                            <input
                              type="text"
                              name="Percentage"
                              placeholder="Type here"
                              onChange={onchange}
                            />
                          </div>
                          <div className="tenth">{/* mark sheet view*/}</div>
                        </div>
                        <div className="row-four">
                          <div className="heading">
                            <h6>12th Standard or Diploma Details</h6>
                            <div className="hr-line"></div>
                          </div>
                          <div className="three-inputs">
                          <div className="tenth">
                            <label>Medium of Instruction <span>*</span></label>
                            <select name="" id="">
                              <option value="">Select</option>
                            </select>
                          </div>
                          <div className="tenth">
                            <label>School Type <span>*</span></label>
                            <select name="" id="">
                              <option value="">Select</option>
                            </select>
                          </div>
                          <div className="tenth">
                            <label>Year of Completion <span>*</span></label>
                            <select name="" id="">
                              <option value="">Select</option>
                            </select>
                          </div>
                          </div>
                        
                        </div>
                        <div className="row-five">
                          <div className="match-english-score">
                            <label>Math & English Score <span>*</span></label>
                            <div className="two-inputs">
                            <input
                              type="text"
                              placeholder="Type here"
                              name="English Score"
                              onChange={onchange}
                            />
                            <input
                              type="text"
                              placeholder="Type here"
                              name="English Score"
                              onChange={onchange}
                            />
                            </div>
                         
                          </div>
                          <div className="total-percentage">
                            <label>Total Percentage <span>*</span></label>
                            <input
                              type="text"
                              placeholder="Type here"
                              name="Percentage"
                              onChange={onchange}
                            />
                          </div>
                          <div className="upload-mark-sheet">
                            <label>Upload the Mark sheet <span>*</span></label>
                            <input type="file" />
                          </div>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  key: "4",
                  label: (
                    <span>
                      <img style={{ width: "20px" }} src="/icons/others.svg" />
                      Other Details
                    </span>
                  ),
                  children: (
                    <div className="other-details-container">
                      <div className="other-details-form">
                        <div className="row-one">
                          <div className="other-cer-section">
                            <div className="extra-cur">
                              <label>
                                Mention any extra curricular certificates or
                                creative work of yours
                              </label>
                              <input
                                type="text"
                                placeholder="Type here"
                                name="curricular"
                                onChange={onchange}
                              />
                            </div>
                            <div className="computer-certificate">
                              <label>
                                Computer Course Completion Certification - if
                                any
                              </label>
                              <input
                                type="text"
                                placeholder="Type here"
                                name="Course-Completion"
                                onChange={onchange}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row-two">
                          <div className="heading">
                            <h6>Learning Devices</h6>
                            <div className="hr-line"></div>
                          </div>
                          <div className="others">
                            <p>
                              We would like to understand the student’s
                              accessibility to devices to take up the
                              preliminary entrance post their application
                              screening
                            </p>
                            <div className="device">
                              <p>What device you / your family own? <span>*</span></p>
                              <div className="options">
                                <div className="option-row-one">
                                  <div className="sub-row-one">
                                    <input type="radio" />
                                    <label>
                                      Smart Phone with Internet Connectivity
                                    </label>
                                  </div>
                                  <div className="sub-row-two">
                                    <input type="radio" />
                                    <label>
                                      Laptop with Internet Connectivity
                                    </label>
                                  </div>
                                </div>
                                <div className="option-row-two">
                                  <div className="sub-row-one">
                                    <input type="radio" />
                                    <label>
                                      Tablet with Internet Connectivity
                                    </label>
                                  </div>
                                  <div className="sub-row-two">
                                    <input type="radio" />
                                    <label>
                                      Desktop with Internet Connectivity
                                    </label>
                                  </div>
                                </div>
                                <div className="option-row-three">
                                  <div className="sub-row-one">
                                    <input type="radio" />
                                    <label>
                                      I don’t have accessibility to phone or any
                                      devices. Looking forward to your support
                                      to appear in entrance exam
                                    </label>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row-three">
                          <div className="heading">
                            <h6>General Questions</h6>
                            <div className="hr-line"></div>
                          </div>
                          <div className="palli">
                            <label>
                              How did you come to know about DCKAP Palli
                              Program? <span>*</span>
                            </label>
                            <select name="" id="">
                              <option value="">Select</option>
                            </select>
                          </div>
                        </div>
                        <div className="row-four">

                          <div className="training-inputs">
                          <div className="trainering">
                            <label>
                              Why do you want to take up this training? <span>*</span>
                            </label>
                            <input
                              type="text"
                              placeholder="Type here"
                              name="training"
                              onChange={onchange}
                            />
                          </div>
                          <div className="trainering">
                            <label>
                              Please leave any additional information if you
                              would like to share with us <span>*</span>
                            </label>
                            <input
                              type="text"
                              placeholder="Type here"
                              name="information"
                              onChange={onchange}
                            />
                          </div>
                          </div>
                      
                          <div className="agree-button">
                            <div className="agree">
                              <input type="checkbox" />
                              <p>
                                I AGREE that the given data is true to the best
                                of my knowledger
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ),
                },
              ]}
            />
            <div
              className="save-per-button-section"
            // style={{ display: "flex", justifyContent: "end" }}
            >
              {currentTab !== "1" && (
                <button
                  className="btn secondary-medium prevBtn"
                  onClick={handlePreviousTab}
                >
                  Previous
                </button>
              )}
              {currentTab !== "4" && (
                <button
                  className="btn primary-medium nextBtn"
                  // style={{ width: "100px" }}
                  onClick={handleNextTab}
                >
                  Next
                </button>
              )}
              {currentTab === "4" && (
                <button
                  className="btn primary-medium"
                  // style={{ width: "100px" }}
                  onClick={handleSubmit}
                >
                  Save
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationForm;
