import React, { useEffect, useState } from "react";

import ReactQuill, { Quill } from "react-quill";
import {
  DatePicker,
  Popover,
  Menu,
  Dropdown,
  Skeleton,
  notification,
} from "antd";
import axios from "axios";

import dayjs from "dayjs";

import { API_END_POINT } from "../../config";

import { useParams } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import "quill/dist/quill.snow.css";

const AssessmentView = ({
  weightageShow,
  currentAssessment,
  students,
  setSelectedStudents,
  selectedStudents,
  handleSave,
  handleInputChange,
  isCardClick,
}) => {
  const { id: batchId } = useParams();
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [initialTitle, setInitialTitle] = useState("");
  const [activeWeightageIndex, setActiveWeightageIndex] = useState(null);
  const [studentScore, setStudentScore] = useState([]);

  const headers = {
    Authorization: `Bearer ${token.access}`,
    "Content-type": "application/json",
  };
  // Destructure the current task
  const {
    id: taskId,
    task_title,
    task_description,
    due_date,
    draft,
    task_users = [],
  } = currentAssessment;

  //default which students assigned the task
  useEffect(() => {
    if (task_users) {
      const taskAssignedUsers = task_users.map((assigned) => assigned.user);
      const updatedSelectedStudents = taskAssignedUsers;

      // Check if the state actually needs to be updated
      if (
        JSON.stringify(selectedStudents) !==
        JSON.stringify(updatedSelectedStudents)
      ) {
        setSelectedStudents(updatedSelectedStudents);
      }
    }
  }, [task_users]);

  const validateNotEmpty = (fieldName, value) => {
    const trimmedValue = value ? value.replace(/<[^>]*>/g, "").trim() : null;
    return trimmedValue ? null : `${fieldName} is required`;
  };

  const CustomIcons = () => {
    const icons = Quill.import("ui/icons");

    icons.bold = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 12 12" fill="none">
      <path d="M3 2H7C7.53043 2 8.03914 2.21071 8.41421 2.58579C8.78929 2.96086 9 3.46957 9 4C9 4.53043 8.78929 5.03914 8.41421 5.41421C8.03914 5.78929 7.53043 6 7 6H3V2Z" stroke="#969D88" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M3 6H7.5C8.03043 6 8.53914 6.21071 8.91421 6.58579C9.28929 6.96086 9.5 7.46957 9.5 8C9.5 8.53043 9.28929 9.03914 8.91421 9.41421C8.53914 9.78929 8.03043 10 7.5 10H3V6Z" stroke="#969D88" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`;
    icons.italic = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 12 12" fill="none">
    <path d="M9.5 2H5" stroke="#969D88" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M7 10H2.5" stroke="#969D88" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M7.5 2L4.5 10" stroke="#969D88" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;
    icons.underline = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 12 12" fill="none">
  <path d="M3 1.5V5C3 5.79565 3.31607 6.55871 3.87868 7.12132C4.44129 7.68393 5.20435 8 6 8C6.79565 8 7.55871 7.68393 8.12132 7.12132C8.68393 6.55871 9 5.79565 9 5V1.5" stroke="#969D88" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M2 10.5H10" stroke="#969D88" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;

    icons.alignLeft = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 12 12" fill="none">
  <path d="M8.5 5H1.5" stroke="#969D88" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M10.5 3H1.5" stroke="#969D88" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M10.5 7H1.5" stroke="#969D88" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M8.5 9H1.5" stroke="#969D88" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
    icons.alignCenter = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 12 12" fill="none">
     <path d="M9 5H3" stroke="#969D88" stroke-linecap="round" stroke-linejoin="round"/>
     <path d="M10.5 3H1.5" stroke="#969D88" stroke-linecap="round" stroke-linejoin="round"/>
     <path d="M10.5 7H1.5" stroke="#969D88" stroke-linecap="round" stroke-linejoin="round"/>
     <path d="M9 9H3" stroke="#969D88" stroke-linecap="round" stroke-linejoin="round"/>
   </svg>`;
    icons.alignRight = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 12 12" fill="none">
      <path d="M10.5 5H3.5" stroke="#969D88" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M10.5 3H1.5" stroke="#969D88" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M10.5 7H1.5" stroke="#969D88" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M10.5 9H3.5" stroke="#969D88" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`;
    icons.alignJustify = `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 10 8" fill="none">
    <path d="M9.5 3H0.5" stroke="#969D88" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M9.5 1H0.5" stroke="#969D88" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M9.5 5H0.5" stroke="#969D88" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M9.5 7H0.5" stroke="#969D88" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;
    return null; // This component doesn't render anything
  };

  const handleCheckboxChange = (studentId) => {
    const isSelected = [...selectedStudents].includes(studentId);

    if (isSelected) {
      let updateTheStudent = [...selectedStudents];
      updateTheStudent = updateTheStudent.filter((id) => id != studentId);
      //remove user API call
      const url = `${API_END_POINT}/api/task/${batchId}/remove/user/${taskId}/`;
      axios
        .delete(url, { user: [studentId] }, { headers })
        .then((res) => {
          if (res.data.status === 200) {
            notification.success({
              message: "Success",
              description: `${res.data.message}`,
              duration: 1,
            });

            //update the local state
            setSelectedStudents(updateTheStudent);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      const updatedStudents = [...selectedStudents, studentId];

      //students add in task
      const url = `${API_END_POINT}/api/task/${batchId}/assign/task/${taskId}`;
      axios.post(url, { user: [studentId] }, { headers }).then((res) => {
        if (res.data.status === 200) {
          notification.success({
            message: "Success",
            description: `${res.data.message}`,
            duration: 1,
          });
          setSelectedStudents(updatedStudents);
        }
      });
    }
  };

  const handleAllCheckboxChange = () => {
    const isNotAllSelected = [...students].every((student) =>
      selectedStudents.includes(student.id)
    );

    if (isNotAllSelected) {
      //Deselect all students in tasks

      axios
        .delete(`${API_END_POINT}/api/task/${batchId}/remove/user/${taskId}/`, {
          data: { user: "__all__" },
          headers: headers,
        })
        .then((res) => {
          if (res.data.status === 200) {
            setSelectedStudents([]);
            notification.success({
              message: "Success",
              description: "All Students Removed Successfully",
              duration: 1,
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      const allStudentIds = [...students].map((student) => student.id);

      //selectAll students in tasks
      axios
        .post(
          `${API_END_POINT}/api/task/${batchId}/assign/task/${taskId}`,
          { user: allStudentIds },
          { headers: headers }
        )
        .then((res) => {
          if (res.data.status === 200) {
            notification.success({
              message: "Success",
              description: "All Students Assigned Successfully",
              duration: 1,
            });
            setSelectedStudents(allStudentIds);
          }
        })
        .catch((error) => {
          console.log(error, "error");
        });
    }
  };

  //handle this four functions later
  const handleValidate = (formData) => {
    //if student not assign show the error
    if (selectedStudents.length === 0) {
      setError("assignee", {
        type: "manual",
        message: "Assignee is required",
      });
      return;
    }

    handleSave(formData, draft);

    reset({
      Title: "",
      Description: "",
      Deadline: null,
      SubmissionLink: "",
    });
  };

  const handleTick = () => {
    setIsEditing(false);
  };
  const handleCancelClick = () => {
    setValue("Title", initialTitle);
    setIsEditing(false);
  };

  const onDoubleClick = () => {
    setInitialTitle(getValues("Title"));
    setIsEditing(true);
  };

  //end

  const handleAddScore = () => {
    //weightage open and score added only submit the score
    if (activeWeightageIndex) {
      const url = `${API_END_POINT}/api/task/${batchId}/create/task_score/`;
      console.log(studentScore);
      // axios
      //   .post(url, requestBody, { headers })
      //   .then((res) => {
      //     console.log(res);

      //     axios
      //       .post(
      //         `${API_END_POINT}/api/task/${batchId}/update/task/user/${task_user}`,
      //         { user_status: "COMPLETED" },
      //         { headers }
      //       )
      //       .then((res) => {
      //         console.log(res, "update");
      //       })
      //       .catch((error) => {
      //         console.log(error);
      //       });
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   });
    }
  };
  const handleStatusChange = (studentId, status) => {
    const url = `${API_END_POINT}/api/task/${batchId}/update/task/user/${studentId}`;
    const payload = { task_status: status };

    //students status changed to Admin
    axios
      .put(url, payload, { headers })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const itemRenderer = (studentId) => {
    return [
      {
        label: (
          <p onClick={() => handleStatusChange(studentId, "REWORK")}>Rework</p>
        ),
        key: "0",
      },
      {
        label: (
          <p onClick={() => handleStatusChange(studentId, "COMPLETED")}>
            Completed
          </p>
        ),
        key: "1",
      },
    ];
  };

  // // Function to remove duplicates based on the 'task_weightage' property
  // const removeDuplicates = (arr) => {
  //   const seenWeightages = new Set();
  //   const uniqueArray = arr.filter(obj => {
  //     if (!seenWeightages.has(obj.task_weightage)) {
  //       seenWeightages.add(obj.task_weightage);
  //       return true;
  //     }
  //     return false;
  //   });

  //   return uniqueArray;
  // };

  const handleChange = (e, students, weightage) => {
    const payload = {
      task_user: students.id,
      task_weightage: weightage.id,
      task_score: Number(e.target.value),
    };

    const scoreForStudent = {task_user:students.id,task_details:[{task_weightage:weightage.id,task_score:Number(e.target.value)}]}

    setStudentScore([...studentScore,scoreForStudent]);

  };

console.log(studentScore);
  return (
    <>
      {!isCardClick ? (
        <>
          <section className="main-container">
            {loading ? (
              <Skeleton active paragraph={4} />
            ) : (
              <>
                <div className="module-header-section-container">
                  <div className="module-header-section flex">
                    <div className="module-title-section flex">
                      <input
                        value={task_title ? task_title : ""}
                        name="task_title"
                        type="text"
                        onChange={(e) =>
                          handleInputChange("task_title", e.target.value)
                        }
                        // onDoubleClick={onDoubleClick}
                        placeholder={"Untitled"}
                        // className={` ${errors.Title ? "error-notify" : ""} `}
                        // readOnly={!isEditing}
                        autoFocus={true}
                      />

                      {/* {isEditing && (
                    <div>
                      <span className="yes-btn">
                        <img
                          src="/public/icons/tick.svg"
                          alt=""
                          onClick={handleTick}
                        />
                      </span>
                      <span className="no-btn">
                        <img
                          src="/public/icons/remove.svg"
                          alt=""
                          onClick={handleCancelClick}
                        />
                      </span>
                    </div>
                  )} */}
                    </div>
                  </div>
                  <p className="error-message"></p>
                </div>

                <div className="task-details-header-container">
                  <div className="task-label-container flex">
                    <h4>Task Details</h4>
                    <div className="horizon-line"></div>
                  </div>

                  <div className="task-details-main-container flex">
                    <div className="task-deadline-container common-property">
                      <p className="task-deadline-label">Deadline</p>

                      <DatePicker
                        value={due_date ? dayjs(due_date) : null}
                        showTime={{ format: "HH:mm" }}
                        placeholder="Select here..."
                        format="YYYY-MM-DD HH:mm"
                        onChange={(date, dateString) =>
                          handleInputChange("due_date", dateString)
                        }
                        suffixIcon={<img src={`/icons/calendorIcon.svg`} />}
                        disabledDate={(current) =>
                          current && current < dayjs().startOf("day")
                        }
                      />
                      <p className="error-message"></p>
                    </div>
                  </div>

                  <div className="task-editor-container">
                    <p className="task-description-label">Description</p>
                    <div className="task-editor">
                      <>
                        <CustomIcons />
                        <ReactQuill
                          placeholder="Type here"
                          value={task_description ? task_description : ""}
                          modules={{
                            toolbar: {
                              container: [
                                [{ header: [1, 2, false] }],
                                ["bold", "italic", "underline"],
                                [
                                  "alignLeft",
                                  "alignCenter",
                                  "alignRight",
                                  "alignJustify",
                                ],
                              ],
                            },
                          }}
                          formats={[
                            "header",
                            "bold",
                            "italic",
                            "underline",
                            "list",
                            "bullet",
                            "alignLeft",
                            "alignCenter",
                            "alignRight",
                            "alignJustify",
                          ]}
                          theme="snow"
                          onChange={(value) =>
                            handleInputChange("task_description", value)
                          }
                        />
                        <p className="error-message"></p>
                      </>
                    </div>
                  </div>

                  <div className="submission-folder-link-container">
                    <input type="link" placeholder="Paste your link here..." />
                  </div>
                  <div className="task-create-btn-section flex">
                    <button
                      type="submit"
                      className="btn primary-medium"
                      onClick={() => handleSave(currentAssessment)}
                    >
                      {draft ? "Create" : "Update"}
                    </button>
                  </div>
                </div>
              </>
            )}
          </section>
          {!draft && (
            <section className="assignee-and-weightage-container">
              <div className="title-section flex">
                <div className="assignee-title selection active">
                  <h4>Assignee</h4>
                </div>
                <div className="weightage-title selection ">
                  <h4>Weightage</h4>
                </div>
              </div>
              <div className="assignee-search-container">
                {/* search bar use in future */}
                <input
                  type="text"
                  style={{ border: "1px solid grey" }}
                  placeholder="Search here..."
                />
              </div>
              <div className="assign-listing-container">
                <div className="select-all flex">
                  <input
                    className="global-checkbox"
                    type="checkbox"
                    onChange={handleAllCheckboxChange}
                    checked={selectedStudents.length == students.length}
                  />
                  <span>
                    {selectedStudents.length === students.length
                      ? "All Students"
                      : selectedStudents.length == 0
                      ? "Select Students"
                      : `${selectedStudents.length} Selected`}
                  </span>
                </div>
                <div className="assignee-card-listing-container">
                  {students.map((student) => {
                    return (
                      <div
                        className="individual-assignee-card flex"
                        key={student.id}
                      >
                        <input
                          type="checkbox"
                          onChange={() => handleCheckboxChange(student.id)}
                          checked={selectedStudents.includes(student.id)}
                        />
                        <div className="profile flex">
                          <div className="profile-letter">
                            <span>
                              {student?.first_name[0]}
                              {student?.last_name[0]}
                            </span>
                          </div>

                          <div className="assignee-name">
                            <p>
                              {student.first_name} {student.last_name}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>
          )}
        </>
      ) : (
        <>
          <main className="main-container">
            {currentAssessment.task_users &&
              currentAssessment.task_users.map((students, index) => {
                return (
                  <>
                    <div className="task-user-list-container flex" key={index}>
                      <div className="student-info flex">
                        <div className="student-name-container">
                          <p>
                            {students["user_details"]["first_name"].slice(0, 1)}
                            {students["user_details"]["last_name"].slice(0, 1)}
                          </p>
                        </div>
                        <div className="student-email-container">
                          <p className="student-name"></p>
                          <p className="student-email"></p>
                        </div>
                      </div>
                      <div className="student-status">
                        <p>Status</p>
                        <span>{students["task_status"]}</span>
                      </div>
                      <div className="sumbitted-date">
                        <p>Deadline</p>
                        <span>
                          {dayjs(students["task"]["due_date"]).format(
                            "MMMM, DD YYYY"
                          )}
                        </span>
                      </div>
                      <div className="student-file">
                        <p>Submission Link</p>
                        <span>{students["submission_link"]}</span>
                      </div>
                      <div className="student-work">
                        {weightageShow
                          ? students["task_status"] === "SUBMITTED" && (
                              <button
                                className="secondary-btn-sm"
                                onClick={() => {
                                  handleAddScore(),
                                    setActiveWeightageIndex(index);
                                }}
                              >
                                {activeWeightageIndex === index
                                  ? "Submit"
                                  : " add mark"}
                              </button>
                            )
                          : students["task_status"] === "SUBMITTED" && (
                              <Dropdown
                                menu={{ items: itemRenderer(students.id) }}
                                placement="bottomLeft"
                                trigger={["click"]}
                              >
                                <a
                                  className="ant-dropdown-link"
                                  onClick={(e) => {
                                    e.preventDefault();
                                  }}
                                >
                                  Take action
                                </a>
                              </Dropdown>
                            )}
                      </div>
                    </div>

                    {activeWeightageIndex === index && (
                      <div className="applied-weightage-list-container flex">
                        {currentAssessment.task_weightages &&
                          currentAssessment.task_weightages.map(
                            (weightage, weightageIndex) => (
                              <div
                                key={weightageIndex}
                                className="applied-weightage-card flex"
                              >
                                <div className="applied-weightage-name">
                                  {weightage.weightage_details.weightage}
                                </div>
                                <div className="weightage-checkbox">
                                  <input
                                    type="number"
                                    style={{
                                      border: "1px solid grey",
                                    }}
                                    onChange={(e) =>
                                      {
                                        handleChange(e, students, weightage)

                                        
                                      }

                                    
                                    }
                                  />
                                </div>
                                
                              </div>
                            )
                          )}
                      </div>
                    )}
                  </>
                );
              })}
          </main>
        </>
      )}
    </>
  );
};

export default AssessmentView;
