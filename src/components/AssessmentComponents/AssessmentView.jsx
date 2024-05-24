import React, { useEffect, useReducer } from "react";

import {
  notification,
} from "antd";

import axios from "axios";



import { API_END_POINT } from "../../../config";

import { useParams } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";


import StudentEvaluation from "./StudentEvaluation";
import WeightageAndAssignee from "./WeightageAndAssignee";
import AssessmentCreation from "./AssessmentCreation";

import { assessmentViewState } from "../../reducer/Assessment/AssessmentState";

import { assessmentViewReducer } from "../../reducer/Assessment/AssessmentReducer";
import { assessmentMode } from "../../utils/validate";

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
  // handleRemoveFile, do later
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
    dispatch({ type: "SET_TOGGLE_ASSIGNEE_WEIGHTAGE", payload: type === assessmentMode ? 0 :1 })
    axios
      .get(`${API_END_POINT}/api/task/${batchId}/list/weightage`, { headers })
      .then((res) => {
        if (res.status === 200 && res.data.message === "Success") {
          const copyWeightageLists = [...res.data.data];
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


  useEffect(() => {
    if(!currentAssessment?.draft){
      dispatch({ type: "SET_STUDENT_LOADING", payload: true })
      axios.get(`${API_END_POINT}/api/task/${batchId}/get/task/${currentAssessment?.id}`, { headers }).then((res) => {
        dispatch({ type: "SET_ASSIGNED_USERS", payload: res.data.data })
        dispatch({ type: "SET_STUDENT_LOADING", payload: false })
      }).catch((error)=>{
      dispatch({ type: "SET_STUDENT_LOADING", payload: false })
        console.log(error);
      })
    }
   
  }, [currentAssessment?.id,isStudentScoreOpen])

  const handleCheckboxChange = (studentId) => {
    const isSelected = [...selectedStudents].includes(studentId);
    dispatch({ type: "SET_ASSIGNEELOADER", payload: true })
    if (isSelected) {
      let updateTheStudent = [...selectedStudents];
      updateTheStudent = updateTheStudent.filter((id) => id != studentId);
      //remove user API call
      const url = `${API_END_POINT}/api/task/${batchId}/remove/user/${currentAssessment?.id}/`;

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
            dispatch({ type: "SET_ASSIGNEELOADER", payload: false })
            setSelectedStudents(updateTheStudent);
          }
        })
        .catch((error) => {
          dispatch({ type: "SET_ASSIGNEELOADER", payload: false })
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
      // setAssigneLoadingMessage("Sending email to students...")
      dispatch({ type: "SET_ASSIGNE_LOADING_MESSAGE", payload: "Sending email to students..." })


      //students add in task
      const url = `${API_END_POINT}/api/task/${batchId}/assign/task/${currentAssessment?.id}`;
      axios.post(url, { user: [studentId] }, { headers }).then((res) => {
        if (res.data.status === 200) {
          notification.success({
            message: "Success",
            description: `${res.data.message}`,
            duration: 1,
          });
          dispatch({ type: "SET_ASSIGNEELOADER", payload: false })
          setSelectedStudents(updatedStudents);
          dispatch({ type: "SET_ASSIGNE_LOADING_MESSAGE", payload: "" })



        }
      }).catch((error)=>{
        dispatch({ type: "SET_ASSIGNEELOADER", payload: false })
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

    dispatch({ type: "SET_ASSIGNEELOADER", payload: true })

    if (isNotAllSelected) {
      //Deselect all students in tasks
      const url = `${API_END_POINT}/api/task/${batchId}/remove/user/${currentAssessment?.id}/`;

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
            dispatch({ type: "SET_ASSIGNEELOADER", payload: false })

            
          }
        })
        .catch((error) => {
          dispatch({ type: "SET_ASSIGNEELOADER", payload: false })

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
      dispatch({ type: "SET_ASSIGNE_LOADING_MESSAGE", payload: "Sending email to All students..."})
      axios
        .post(
          `${API_END_POINT}/api/task/${batchId}/assign/task/${currentAssessment?.id}`,
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
           dispatch({ type: "SET_ASSIGNEELOADER", payload: false})
           dispatch({ type: "SET_ASSIGNE_LOADING_MESSAGE", payload: ""})
          }
        })
        .catch((error) => {
          dispatch({ type: "SET_ASSIGNEELOADER", payload: false})
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
      // setStudentScore(filteredStudentScores);
      dispatch({ type: "SET_STUDENT_SCORE", payload: filteredStudentScores})

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
        // setStudentScore(updatedStudentScores);
      dispatch({ type: "SET_STUDENT_SCORE", payload: updatedStudentScores})

      } else {
        // If the score doesn't exist, add it to the state
        // setStudentScore([...studentScore, updatedScore]);
      dispatch({ type: "SET_STUDENT_SCORE", payload: [...studentScore, updatedScore]})
        
      }
    }
  };
  

  
  
  


 
  return (
    <>
      {!isStudentScoreOpen ? (
        <>
         <AssessmentCreation
          formErrors={formErrors}
          currentAssessment={currentAssessment}
          user={user}
          assigneeloader={assigneeloader}
          isAssessmentLoading={isAssessmentLoading}
          setFormErrors={setFormErrors}
          handleSave={handleSave}
          handleInputChange={handleInputChange}
          // handleRemoveFile={handleRemoveFile} do later
         />
          <WeightageAndAssignee 
          user={user}
          currentAssessment={currentAssessment}
          assigneeloader={assigneeloader}
          toggleAssigneeWeightage={toggleAssigneeWeightage}
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
          assigneLoadingMessage={assigneLoadingMessage}
          
          />
        </>
      ) : (
        <StudentEvaluation 
        studentLoading={studentLoading}
        assignedUsers={assignedUsers}
        isStudentScoreOpen={isStudentScoreOpen}
        setIsStudentScoreOpen={setIsStudentScoreOpen}
        setToggleAssigneeWeightage={(toggleValue)=>dispatch({ type: "SET_TOGGLE_ASSIGNEE_WEIGHTAGE", payload: toggleValue })}
        assginesUsersSeacrh={assignedUsersSearch}
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
        weightageLists={weightageLists}
        handleScoreOnchange={handleScoreOnchange}
        studentScore={studentScore}
        itemRenderer={itemRenderer}
        />
      )}
    </>
  );
};
export default AssessmentView;
