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
import WeightageList from "./WeightageList";

import "quill/dist/quill.snow.css";

const AssessmentView = ({
  weightageShow,
  currentAssessment,
  students,
  setSelectedStudents,
  selectedStudents,
  handleSave,
  handleInputChange,
  isStudentScoreOpen,
  handleStatusChange,
  handleAddScore,
  activeWeightageIndex,
  setActiveWeightageIndex,
  handleSaveWeightage,
  handleAddWeightage,
  handleWeightageChange,
  handleDeleteWeightage,
  type,
}) => {
  const { id: batchId } = useParams();
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [initialTitle, setInitialTitle] = useState("");
  const [studentScore, setStudentScore] = useState([]);
  const [toggleAssigneeWeightage, setToggleAssigneeWeightage] = useState(
    type == "task" ? 0 : 1
  );

  const [assigneeloader, setAssigneeloader] = useState(false);
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
    task_weightages = [],
  } = currentAssessment;

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
    setAssigneeloader(true);
    if (isSelected) {
      let updateTheStudent = [...selectedStudents];
      updateTheStudent = updateTheStudent.filter((id) => id != studentId);
      //remove user API call
      const url = `${API_END_POINT}/api/task/${batchId}/remove/user/${taskId}/`;

      const payload = { user: [studentId] };
      axios
        .delete(url, { data: payload, headers })
        .then((res) => {
          if (res.data.status === 200) {
            notification.success({
              message: "Success",
              description: `${res.data.message}`,
              duration: 1,
            });
            setAssigneeloader(false);
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
          setAssigneeloader(false);
          setSelectedStudents(updatedStudents);
        }
      });
    }
  };

  const handleAllCheckboxChange = () => {
    const isNotAllSelected = [...students].every((student) =>
      selectedStudents.includes(student.id)
    );
    const allStudentIds = [...students].map((student) => student.id);


    setAssigneeloader(true);
    if (isNotAllSelected) {
      //Deselect all students in tasks
      const url = `${API_END_POINT}/api/task/${batchId}/remove/user/${taskId}/`;

      const payload = { user: allStudentIds };
      axios
        .delete(url, { data: payload, headers })
        .then((res) => {
          if (res.data.status === 200) {
            notification.success({
              message: "Success",
              description: "All Students unAssigned Successfully",
              duration: 1,
            });
            setSelectedStudents([]);
            setAssigneeloader(false);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {

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
            setAssigneeloader(false);
          }
        })
        .catch((error) => {
          console.log(error, "error");
        });
    }
  };

  //student id send to handleStatus change student rework or completed
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

  const handleScoreOnchange = (e, students, weightage) => {
    const updatedScore = {
      task_user: students.id,
      task_weightage: weightage.id,
      task_score: Number(e.target.value),
    };
    // Check if the score for the same student and weightage ID already exists
    const existingScoreIndex = studentScore.findIndex(
      (score) =>
        score.task_user === updatedScore.task_user &&
        score.task_weightage === updatedScore.task_weightage
    );

    if (existingScoreIndex !== -1) {
      // If the score exists, update it
      const updatedStudentScores = [...studentScore];
      updatedStudentScores[existingScoreIndex].task_score =
        updatedScore.task_score;
      setStudentScore(updatedStudentScores);
    } else {
      // If the score doesn't exist, add it to the state
      setStudentScore([...studentScore, updatedScore]);
    }
  };

  return (
    <>
      {!isStudentScoreOpen ? (
        <>
          <section className="main-container">
            {loading ? (
              <Skeleton active paragraph={4} />
            ) : (
              <>
                <div className="module-header-section-container">
                  <div className="module-header-section flex">
                    <div className="module-title-section grid">
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
                  {/* <div className="link">
                    <input
                      className="submission-folder-link-container"
                      type="link"
                      placeholder="Paste your link here..."
                    />
                  </div> */}
                  <div className="task-create-btn-section flex">
                    <div className="main-create-btn">
                      <button
                        type="submit"
                       className={`${assigneeloader ? "btn primary-medium-default" : "btn primary-medium"}`}
                        onClick={() => handleSave(currentAssessment)}
                      >
                        {draft ? "Create" : "Update"}
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </section>
          {!draft && (
            <section className="assignee-and-weightage-container">
              {assigneeloader ? (
                <Skeleton active={true} />
              ) : (
                <>
                  <div className={`title-section flex`}>
                    <div
                      className={`weightage-title selection ${
                        toggleAssigneeWeightage === 1 ? "active" : ""
                      }`}
                    >
                      {weightageShow && (
                        <h4
                          onClick={() => setToggleAssigneeWeightage(1)}
                          className={
                            toggleAssigneeWeightage === 1 ? "active" : ""
                          }
                        >
                          Weightage
                        </h4>
                      )}
                    </div>
                    <div
                      className={`assignee-title selection ${
                        toggleAssigneeWeightage === 0 ? "active" : ""
                      }`}
                    >
                      <h4
                        onClick={() => setToggleAssigneeWeightage(0)}
                        className={
                          toggleAssigneeWeightage === 0 ? "active" : ""
                        }
                      >
                        Assignee
                      </h4>
                    </div>
                  </div>
                  {toggleAssigneeWeightage === 0 ? (
                    <>
                      {/* <div className="assignee-search-container">
          <input
            type="text"
            style={{ border: "1px solid grey" }}
            placeholder="Search here..."
          />
        </div> */}
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
                              ? "All Students Selected"
                              : selectedStudents.length == 0
                              ? "Select All Students"
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
                                  className="student-checkbox "
                                  type="checkbox"
                                  onChange={() =>
                                    handleCheckboxChange(student.id)
                                  }
                                  checked={selectedStudents.includes(
                                    student.id
                                  )}
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
                    </>
                  ) : (
                    weightageShow && (
                      <WeightageList
                        taskId={taskId}
                        taskWeightages={task_weightages}
                        handleSaveWeightage={handleSaveWeightage}
                        handleAddWeightage={handleAddWeightage}
                        handleWeightageChange={handleWeightageChange}
                        handleDeleteWeightage={handleDeleteWeightage}
                      />
                    )
                  )}
                </>
              )}
            </section>
          )}
        </>
      ) : (
        <main className="main-container">
          {currentAssessment?.task_users?.length > 0 ? (
            currentAssessment.task_users.map((students, index) => {
              return (
                <>
                  <div className="task-container">
                    <div className="task-user-list-container flex" key={index}>
                      <div className="student-info flex">
                        <div className="student-name-container">
                          <p>
                            {students["user_details"]["first_name"][0]}
                            {students["user_details"]["last_name"][0]}
                          </p>
                        </div>
                        <div className="student-email-container">
                          <p className="student-name">
                            {students.user_details.first_name}{" "}
                            {students.user_details.last_name}
                          </p>
                          <p className="student-email">
                            {students.user_details.email}
                          </p>{" "}
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
                        <a href={`${students["submission_link"]}`} target="_blank">{students["submission_link"]}</a>
                      </div>
                      <div className="student-work">
                        {weightageShow
                          ? students["task_status"] === "SUBMITTED" && (
                              <button
                                className="secondary-btn-sm"
                                onClick={() => {
                                  setActiveWeightageIndex(index),
                                    handleAddScore(studentScore);
                                }}
                              >
                                {activeWeightageIndex === index
                                  ? "Submit"
                                  : " Add mark"}
                              </button>
                            )
                          : students["task_status"] === "SUBMITTED" && (
                              <Dropdown
                                className="secondary-btn-sm"
                                menu={{ items: itemRenderer(students.id) }}
                                placement="bottomLeft"
                                trigger={["click"]}
                              >
                                <a
                                  className="ant-dropdown-link secondary-btn-sm"
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
                    {/* <hr /> */}

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
                                  <p>
                                    {" "}
                                    {weightage.weightage_details?.weightage}
                                  </p>
                                </div>
                                <div className="weightage-checkbox">
                                  <input
                                    type="number"
                                   
                                    onChange={(e) => {
                                      handleScoreOnchange(
                                        e,
                                        students,
                                        weightage
                                      );
                                    }}
                                  />
                                </div>
                              </div>
                            )
                          )}
                      </div>
                    )}
                  </div>
               
                </>
              );
            })
          ) : (
            <div className="select-something-container flex">
              <div className="image-container ">
                <img src="/public/icons/select-something.svg" alt="" />
                <p className="select-something-heading">
                  No Assignee has been assigned to this {type}
                </p>
              </div>
            </div>
          )}
        </main>
      )}
    </>
  );
};
export default AssessmentView;
