import React, { useEffect, useState } from "react";

import ReactQuill from "react-quill";
import "quill/dist/quill.snow.css";

import {
  DatePicker,
  Dropdown,
  Skeleton,
  notification,
} from "antd";
import axios from "axios";
import colorObject from "../utils/validate";
import dayjs from "dayjs";

import { API_END_POINT } from "../../config";

import { useParams } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import WeightageList from "./WeightageList";

import { CustomIcons,toolbarConfig,validateTask,isScoreValidate } from "../utils/validate";

const AssessmentView = ({
  weightageShow,
  currentAssessment,
  students,
  setSelectedStudents,
  selectedStudents,
  handleSave,
  handleInputChange,
  isStudentScoreOpen,
  setIsStudentScoreOpen,
  handleStatusChange,
  handleAddScore,
  activeWeightageIndex,
  setActiveWeightageIndex,
  handleSaveWeightage,
  handleAddWeightage,
  handleWeightageChange,
  handleDeleteWeightage,
  type,
  formErrors,
  setFormErrors,
  weightageErrors,
  setWeightageErros,
  setAssigneeSearch,
  isAssigneeLoading
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
  const [weightageLists, setWeightageLists] = useState([]);
  const [studentScoreErrors,setStudentsErrors] = useState({})

  const headers = {
    Authorization: `Bearer ${token.access}`,
    "Content-type": "application/json",
  };

  useEffect(()=>{
    axios
    .get(`${API_END_POINT}/api/task/${batchId}/list/weightage`, { headers })
    .then((res) => {
      if (res.status === 200 && res.data.message === "Success") {
        const copyWeightageLists = [...res.data.data];
        setWeightageLists(copyWeightageLists);
      }
    });
  },[])
  // Destructure the current task
  const {
    id: taskId,
    task_title,
    task_description,
    due_date,
    draft,
    task_weightages = [],
  } = currentAssessment;

 

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

  const handleScoreOnchange = (e, students, weightage) => {
    const scoreValue = Number(e.target.value);
  
    // Treat score of 0 as null
    const normalizedScore = scoreValue === 0 ? null : scoreValue;
  
    if (normalizedScore === null) {
      // If the normalized score is null or not a number, remove the corresponding object from the state
      const filteredStudentScores = studentScore.filter(
        (score) =>
          score.task_user !== students.id ||
          score.task_weightage !== weightage.id
      );
      setStudentScore(filteredStudentScores);
    } else {
      // If the normalized score is a number, update or add the score to the state
      const updatedScore = {
        task_user: students.id,
        task_weightage: weightage.id,
        task_score: normalizedScore,
      };
  
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
                        className={` ${formErrors["task_title"] ? "error-notify" : ""} `}
                        // readOnly={!isEditing}
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
                  <p className="error-message">{formErrors["task_title"] ? formErrors["task_title"]:""}</p>
                    
                </div>
                <div className="task-details-header-container">
                  <div className="task-label-container flex">
                    <h4>Task Details </h4>
                    <div className="horizon-line"></div>
                  </div>
                  <div className="task-details-main-container flex">
                    <div className="task-deadline-container common-property">
                      <p className="task-deadline-label">Deadline *</p>
                      <DatePicker
                        prefixCls={`${formErrors["due_date"] ? "error-notify" :""}`}
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
                      <p className="error-message">{formErrors["due_date"] ? formErrors["due_date"]:""}</p>
                    </div>
                  </div>
                  <div className="task-editor-container">
                    <p className="task-description-label">Description *</p>
                    <div className="task-editor">
                      <>
                        <CustomIcons />
                        <ReactQuill
                          placeholder="Type here"
                          className={`${formErrors["task_description"] ? "error-notify":""}`}
                          value={task_description ? task_description : ""}
                          modules={toolbarConfig}
                          theme="snow"
                          onChange={(value) =>
                            handleInputChange("task_description", value)
                          }
                        
                        />
                        <p className="error-message">{formErrors["task_description"] ? formErrors["task_description"]:""}</p>
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
                        className={`${
                          assigneeloader
                            ? "btn primary-medium-default"
                            : "btn primary-medium"
                        }`}
                        onClick={() => !assigneeloader && validateTask(currentAssessment,setFormErrors) ? handleSave(currentAssessment) : null}

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
                      
                      <div className="assign-listing-container">
                        

                         <div className="assignee-search-container">
                            <input type="input" placeholder="search..." onChange={(e)=>setAssigneeSearch(e.target.value)}/>
                            <img
                              src="/icons/searchIcon.svg"
                              alt="search-icon"
                              className="search-icon"
                            />

                        
                          </div>
                        {isAssigneeLoading ? <Skeleton active paragraph={4}/> : (
                          <>
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
                          </>
                        )}
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
                        weightages={weightageLists}
                        selectedStudents={selectedStudents}
                        weightageErrors={weightageErrors}
                        setWeightageErros={setWeightageErros}
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
           {currentAssessment?.task_users?.length > 0 && (
               <div className="task-heading">
               <p>{task_title}</p>
   
               <div className="search-container">
                 <input type="input" placeholder="search..." />
                 <img
                   src="/icons/searchIcon.svg"
                   alt="search-icon"
                   className="search-icon"
                 />
   
                 <img
                   src="/icons/filterIcon.svg"
                   alt="filter-icon"
                   className="filter-icon"
                 />
               </div>
                  </div>
           )}
          {currentAssessment?.task_users?.length > 0 ? (
            currentAssessment.task_users.map((students, index) => {
              return (
                <>
                  <div className="task-container" >
                   
                    <div className="task-user-list-container flex" key={index}>
                      <div className="student-info flex">
                        <div className="student-name-container">
                          <p>
                            {students["user_details"]["first_name"][0]?.toUpperCase()}
                            {students["user_details"]["last_name"][0]?.toUpperCase()}
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
                        <span
                          style={{
                            backgroundColor:
                              colorObject[students?.task_status]
                                ?.backgroundColor ,
                            color:
                              colorObject[students?.task_status]?.color 
                          }}
                        >
                          {students?.task_status}
                        </span>{" "}
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
                        <p>
                          {students["submission_link"] !== null ? <a  href={`${students["submission_link"]}` } target="_blank">{students["submission_link"]}</a> : "N/A"}
                        </p>
                      </div>
                      <div className="student-work">
                        {weightageShow
                          ? students["task_status"] === "SUBMITTED" && (
                              <button
                                className="secondary-btn-sm"
                                onClick={(e) => {
                                  setActiveWeightageIndex(index);
                                  if(activeWeightageIndex === index){
                                    if(isScoreValidate(task_weightages,studentScore,setStudentsErrors)){
                                      handleAddScore(studentScore);
                                    }
                                  }
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
                                <button
                                  className="ant-dropdown-link secondary-btn-sm"
                                  onClick={(e) => {
                                    e.preventDefault();
                                  }}
                                >
                                  Take action
                                </button>
                              </Dropdown>
                            )}
                      </div>
                    </div>
                   

                    {activeWeightageIndex === index && (
                     <>
                       <div className="applied-weightage-list-container flex" style={{gap:"10px"}}>
                        {currentAssessment.task_weightages &&
                          currentAssessment.task_weightages.map(
                            (weightage, weightageIndex) => (
                              <div
                                key={weightageIndex}
                                className="applied-weightage-card flex"
                              >
                                
                                <div className="applied-weightage-name">
                                    <p>
                                      
                                    {weightageLists && weightageLists.length > 0 && (
                                      (() => {
                                        const foundWeightage = weightageLists.find((weightageName) => weightageName.id === weightage.weightage);

                                        return foundWeightage && (
                                          <>
                                            <p>{foundWeightage.weightage} {Number(weightage.weightage_percentage)}</p>
                                          </>
                                        );
                                      })()
                                    )}


                                    </p>
                                 </div>


                                <div className="weightage-checkbox">
                                  <input
                                    type="text"
                                    onChange={(e) => {handleScoreOnchange(e,students, weightage);
                                    }}
                                  />
                                </div>
                              </div>
                            )
                          )}
                         
                      </div>
                      <p className="error-message">{studentScoreErrors["score"] ? studentScoreErrors["score"]:""}</p>
                     </>
                    )}
                  </div>
                </>
              );
            })
          ) : (
            <div className="select-something-container flex">
              <div className="image-container ">
                <img src="/icons/select-something.svg" alt="" />
                <p className="select-something-heading">
                  No Assignee has been assigned to this {type}
                  <button className="btn primary-medium" style={{marginTop:"10px"}} onClick={()=>{
                    setIsStudentScoreOpen(!isStudentScoreOpen)
                    setToggleAssigneeWeightage(0)
                  }}>Add Assignee</button>
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
