import React from 'react'
const ApplicationViewMore = ({viewMoreApplicant,handleViewMore}) => {
    return (

        viewMoreApplicant?.map((details) => {
            return (
                <main className="application-view-more-container" key={details.id}>
                    <div className="left-side">
                        <div className="top-section">
                            <div className="application-name">
                                <p className="heading" onClick={() => handleViewMore([])}>
                                    Applications list
                                </p>
                                <img src="/icons/dropdown.svg" alt="" />
                                <p className="name">
                                    {details.first_name} {details.last_name}
                                </p>
                            </div>
                            <div className="search-input">
                                <button
                                    className="btn primary-medium"
                                    onClick={() => handleViewMore([])}
                                >
                                    Back
                                </button>
                            </div>
                        </div>
                        <div className="personal-and-education-section">
                            <div className="main-personal-details">
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
                                            <p className="personal-detial-name">{details?.gender?.charAt(0).toUpperCase()}{details?.gender?.slice(1).toLowerCase()}</p>
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
                                    <div>
                                        <div className="personal-detial-background">
                                            <p className="personal-detial-title">Contact Number</p>
                                            <span className="personal-detial-name">
                                                {details.contact_number}
                                            </span>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="personal-detial-background">
                                            <p className="personal-detial-title">Whatsapp Number</p>
                                            <span className="personal-detial-name">
                                                {details.whatsapp_number}
                                            </span>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="personal-detial-background">
                                            <p className="personal-detial-title">Aadhar Number</p>
                                            <span className="personal-detial-name">
                                                {details.aadhaar_number}
                                                <a href={details?.aadhar_card} target="_blank">View document</a>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="main-Guardian-details">
                                <div className="Guardian-details-heading-section">
                                    <p className="heading-name">Guardian Details</p>
                                    <div className="horizon-line"></div>
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
                                            <p className="Guardian-detial-title">
                                                Ration/Family Card
                                            </p>

                                            <p className="Guardian-detial-name">
                                                <a href={details?.family_card} target="_blank">View document</a>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="main-Educational-details">
                                <div className="Educational-details-heading-section">
                                    <p className="heading-name">Educational Details</p>
                                    <div className="horizon-line"></div>
                                </div>
                                <div className="Educational-details-list-container">
                                    {details.applicant_academies.map((academy) => (
                                        <div
                                            key={academy.id}
                                            className="educational-background-second-container"
                                        >
                                            <div className="curent-qul">
                                                <p>
                                                    Educational Qualification:{" "}
                                                    <a href="">{academy.degree.name}</a>
                                                </p>
                                            </div>
                                            <div className="educational-details flex">
                                                <div className="school-type">
                                                    <span>School Type</span>
                                                    <p>{academy.insitution_type}</p>
                                                </div>
                                                <div className="year-completion">
                                                    <span>Year Completion</span>
                                                    <p>{academy.year_of_completion}</p>
                                                </div>
                                                <div className="medium">
                                                    <span>Medium</span>
                                                    <p>{academy.medium_of_instruction}</p>
                                                </div>
                                                {details.applicant_marks &&
                                                    details.applicant_marks.map((marks) => (
                                                        <div className="subject-score">
                                                            <span>
                                                                {marks.degree_subject.degree.name} Score
                                                            </span>
                                                            <p>{marks.mark}%</p>
                                                        </div>
                                                    ))}
                                                <div className="total-percentage">
                                                    <span>Total Percentage</span>
                                                    <p>
                                                        {academy.percentage}% <a href="">View document</a>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {/* <div className="main-skillset">
                      <div className="skillset-and-other-details flex">
                        <div className="skillset-container">
                          <div className="skillset-details-heading-section flex">
                            <p className="heading-name">Other Skillset</p>
                            <div className="horizon-line"></div>
                          </div>
      
                          <div className="skillset-detial-background-section">
                            <div className="details-section">
                              <p className="skillset-detial-title">
                                Extra cuticular certificates or creative work of yours
                              </p>
                              <p className="skillset-detial-name"></p>
                            </div>
                          </div>
                          <div className="skillset-detial-background-section">
                            <div className="details-section">
                              <p className="skillset-detial-title">
                                Computer course certification
                              </p>
                              <p className="skillset-detial-name"></p>
                            </div>
                          </div>
                        </div>
                        <div className="Learning-devices-section">
                          <div className="Learning-details-heading-section flex">
                            <p className="heading-name">Learning Devices</p>
                            <div className="horizon-line"></div>
                          </div>
      
                          <div className="Learning-detial-background">
                            <div className="details-section">
                              <p className="Learning-detial-title">
                                What Device You/ Your Famil own?
                              </p>
                              <p className="Learning-detial-name"></p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div> */}
                            {/* <div className="main-general-details">
                      <div className="genaral-details-section">
                        <div className="genaral-details-heading-section flex">
                          <p className="heading-name">Genaral Details</p>
                          <div className="horizon-line"></div>
                        </div>
      
                        <div className="general-details-list-container flex">
                          <div className="left-side-genaral-detial-background">
                            <div className="first-section">
                              <span>
                                How did you come to know DCKAP Palli Program?
                              </span>
                              <p></p>
                            </div>
                            <div className="second-section">
                              <span>
                                Please leave any additional information if you would
                                like to share with us
                              </span>
                              <p></p>
                            </div>
                          </div>
                          <div className="right-side-genaral-detial-background">
                            <div className="first-section">
                              <span> Why do you want to take up this training? </span>
                              <p></p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div> */}
                        </div>
                    </div>
                </main>
            );
        })
    );
}





export default ApplicationViewMore