import React, { useEffect, useReducer, useState } from "react";

import ReactQuill from "react-quill";
import "quill/dist/quill.snow.css";

import { LoadingOutlined } from "@ant-design/icons";

import {
  DatePicker,
  Dropdown,
  Skeleton,
  notification,
  Drawer,
} from "antd";

import axios from "axios";
import dayjs from "dayjs";


import { API_END_POINT } from "../../config";

import { useParams } from "react-router-dom";

import { useAuth } from "../context/AuthContext";


import StudentEvaluation from "./StudentEvaluation";
import WeightageAndAssignee from "./WeightageAndAssignee";
import AssessmentCreation from "./AssessmentCreation";

import { assessmentViewState } from "../reducer/Assessment/AssessmentState";

import { assessmentViewReducer } from "../reducer/Assessment/AssessmentReducer";

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
  isAssigneeLoading,
  handleSendComment,
  handleDeleteComment,
  commentText,
  isCommentEditId,
  setCommentText,
  setIsCommentEditId,
  setIsMode,
  handleRemoveFile,
  isAssessmentLoading
}) => {
  const { id: batchId } = useParams();
  const { token, user } = useAuth();


  const headers = {
    Authorization: `Bearer ${token.access}`,
    "Content-type": "application/json",
  };

  const [state, dispatch] = useReducer(assessmentViewReducer, assessmentViewState);

  const {studentScore,toggleAssigneeWeightage, assigneeloader,assigneLoadingMessage, weightageLists, openComments,studentLoading, assignedUsers, assignedUsersSearch} = state;
  useEffect(() => {
    axios
      .get(`${API_END_POINT}/api/task/${batchId}/list/weightage`, { headers })
      .then((res) => {
        if (res.status === 200 && res.data.message === "Success") {
          const copyWeightageLists = [...res.data.data];
          // setWeightageLists(copyWeightageLists);
          dispatch({ type: "SET_WEIGHTAGE_LISTS", payload: copyWeightageLists })
        }
      }).catch((error)=>{
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
      })
  }, []);
  // Destructure the current task
  const {
    id: taskId,
    task_title,
    task_description,
    due_date,
    draft,
    task_weightages = [],
  } = currentAssessment;


  useEffect(() => {
    if(!draft){
      // setStudentLoading(true)
      dispatch({ type: "SET_STUDENT_LOADING", payload: true })

      axios.get(`${API_END_POINT}/api/task/${batchId}/get/task/${taskId}`, { headers }).then((res) => {
        // setAssignedUsers(res.data.data)
        dispatch({ type: "SET_ASSIGNED_USERS", payload: res.data.data })

        // setStudentLoading(false)
        dispatch({ type: "SET_STUDENT_LOADING", payload: false })

      }).catch((error)=>{
        // setStudentLoading(false)
      dispatch({ type: "SET_STUDENT_LOADING", payload: false })
        
        console.log(error);
      })
    }
   
  }, [taskId,isStudentScoreOpen])

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
          setAssigneeloader(false);
          console.log(error);
          if (error.response && error.response.data && error.response.data.message) {
            const errorMessage = error.response.data.message;
            notification.error({
              message: 'Error',
              description: errorMessage,
            });
          }
        });
    } else {
      const updatedStudents = [...selectedStudents, studentId];
      setAssigneLoadingMessage("Sending email to students...")

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
          setAssigneLoadingMessage("")

        }
      }).catch((error)=>{
        if (error.response && error.response.data && error.response.data.message) {
          const errorMessage = error.response.data.message;
          notification.error({
            message: 'Error',
            description: errorMessage,
          });
        }
      })
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
          setAssigneeloader(false);
          console.log(error);
          if (error.response && error.response.data && error.response.data.message) {
            const errorMessage = error.response.data.message;
            notification.error({
              message: 'Error',
              description: errorMessage,
            });
          }
        });
    } else {
      //selectAll students in tasks
      setAssigneLoadingMessage("Sending email to All students...")

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
            setAssigneLoadingMessage("")

          }
        })
        .catch((error) => {
          setAssigneeloader(false);
          console.log(error, "error");
          if (error.response && error.response.data && error.response.data.message) {
            const errorMessage = error.response.data.message;
            notification.error({
              message: 'Error',
              description: errorMessage,
            });
          }
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
    const scoreValue = e.target.value;
    const { name, value } = e.target;
    if(formErrors[name]){
      delete formErrors[name];
    }

    if (scoreValue === "" ) {
      // If the score is null or not a number, remove the corresponding object from the state
      const filteredStudentScores = studentScore.filter(
        (score) =>
          score.task_user !== students.id ||
          score.task_weightage !== weightage.id
      );
      setStudentScore(filteredStudentScores);
    } else {
      // If the score is a number, update or add the score to the state
      const updatedScore = {
        task_user: students.id,
        task_weightage: weightage.id,
        task_score: Number(value),
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
         <AssessmentCreation
          task_title={task_title}
          formErrors={formErrors}
          due_date={due_date}
          task_description={task_description}
          draft={draft}
          currentAssessment={currentAssessment}
          user={user}
          assigneeloader={assigneeloader}
          isAssessmentLoading={isAssessmentLoading}
          setFormErrors={setFormErrors}
          handleSave={handleSave}
          handleInputChange={handleInputChange}
          handleRemoveFile={handleRemoveFile}
         />
          <WeightageAndAssignee draft={draft} user={user}
          assigneeloader={assigneeloader}
          toggleAssigneeWeightage={toggleAssigneeWeightage}
          weightageShow={weightageShow}
          taskId={taskId}
          task_weightages={task_weightages}
          weightageLists={weightageLists}
          handleSaveWeightage={handleSaveWeightage}
          handleAddWeightage={handleAddWeightage}
          handleWeightageChange={handleWeightageChange}
          handleDeleteWeightage={handleDeleteWeightage}
          selectedStudents={selectedStudents}
          weightageErrors={weightageErrors}
          setWeightageErros={setWeightageErros}
          setToggleAssigneeWeightage={(toggleValue)=>dispatch({ type: "SET_TOGGLE_ASSIGNEE_WEIGHTAGE", payload: toggleValue })}
          isAssigneeLoading={isAssigneeLoading}
          students={students}
          setAssigneeSearch={setAssigneeSearch}     
          handleAllCheckboxChange={handleAllCheckboxChange}
          handleCheckboxChange={handleCheckboxChange}
          setAssigneeloader={(isLoading)=>dispatch({ type: "SET_ASSIGNEELOADER", payload: isLoading })}     
          />
        </>
      ) : (
        <StudentEvaluation 
        studentLoading={studentLoading}
        assignedUsers={assignedUsers}
        draft={draft}
        type={type}
        isStudentScoreOpen={isStudentScoreOpen}
        setIsStudentScoreOpen={setIsStudentScoreOpen}
        setToggleAssigneeWeightage={(toggleValue)=>dispatch({ type: "SET_TOGGLE_ASSIGNEE_WEIGHTAGE", payload: toggleValue })}
        setIsMode={setIsMode}
        assginesUsersSeacrh={assignedUsersSearch}
        weightageShow={weightageShow}
        openComments={openComments}
        user={user}
        currentAssessment={currentAssessment}
        commentText={commentText}
        isCommentEditId={isCommentEditId}
        setIsCommentEditId={setIsCommentEditId}
        setCommentText={setCommentText}
        handleSendComment={handleSendComment}
        handleDeleteComment={handleDeleteComment}
        formErrors={formErrors}
        setFormErrors={setFormErrors}
        activeWeightageIndex={activeWeightageIndex}
        setAssignedUsersSearch={(assigneSearch)=>dispatch({ type: "SET_ASSIGNED_USERS_SEARCH", payload: assigneSearch })}
        setOpenComments={(isOpen)=>dispatch({ type: "SET_OPEN_COMMENTS", payload: isOpen })}
        setActiveWeightageIndex={setActiveWeightageIndex}
        handleAddScore={handleAddScore}
        />
      )}
    </>
  );
};
export default AssessmentView;
