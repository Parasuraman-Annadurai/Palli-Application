import React, { useState, useEffect } from "react";

import { useParams } from "react-router-dom";

import { Modal, Skeleton, notification,message as messageApi } from "antd";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import dayjs from "dayjs";

import AssessmentList from "../../components/AssessmentList";
import AssessmentView from "../../components/AssessmentView";
import StudentLogin from "../studentLogin/StudentLogin";

import { useAuth } from "../../context/AuthContext";

import { API_END_POINT } from "../../../config";
import { getPermission } from "../../utils/validate";

const AssessmentModule = ({ type }) => {
  const { token, user } = useAuth();
  const { id: batchId } = useParams();
  const [editId, setEditId] = useState(null);
  const [assessmentList, setAssessmentList] = useState([]);
  const [assessmentSearchWord, setAssessmentSearchWord] = useState("");
  const [loading, setLoading] = useState(false);
  const [students, setStudents] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  //for check task or assessment new created or old;
  const [isDraft, setIsDraft] = useState(false);
  const [isStudentScoreOpen, setIsStudentScoreOpen] = useState(true);
  const [activeWeightageIndex, setActiveWeightageIndex] = useState(null);
  const [isMode,setIsMode] = useState("card")
  const [commentText,setCommentText] = useState("");
  const [isCommentEditId,setIsCommentEditId] = useState(null)
  const [formErrors, setFormErrors] = useState({});
  const [weightageErrors, setWeightageErros] = useState({});
  const [assigneeSearch,setAssigneeSearch] = useState("");
  const [isAssigneeLoading,setIsAssigneeLoading] = useState(false)
  const headers = {
    Authorization: `Bearer ${token.access}`,
    "Content-type": "application/json",
  };

  useEffect(() => {
    setLoading(true);
    //I have used this condition to prevent that when I click on the edit icon where the task is and then click on the assessment again, the same edit icon is highlighted.
    setIsMode("card")
    setIsStudentScoreOpen(true)
    //this useEffect used to fetch task list and will re-run whenever filter or search is updated
    if(getPermission(user.permissions,"Task","create")){
      const url = `${API_END_POINT}/api/task/${batchId}/list_task/?limit=10&page=1&filter_task_type=${
        type === "task" ? 0 : 1
      }&search=${assessmentSearchWord}`;
      let assessmentId = editId;

      axios
        .get(url, { headers })
        .then((res) => {
          if (res.status === 200 && res.data.message === "Success") {
            //manipulate the assessment list task type assessment put the 1 otherwise 0 and remove duplicate
            let assessmentList = [...res.data.data];
            assessmentList = assessmentList.map((assessment) => ({
              ...assessment,
              task_type: assessment.task_type === "ASSESSMENT" ? 1 : 0,
            }));

            setAssessmentList(assessmentList);

            setLoading(false);
            assessmentId =
              res.data.data.length > 0 ? res.data.data[0].id : null;

            setEditId(assessmentId);
            setFormErrors({});
          }
        })
        .catch((error) => {
          setLoading(false);

          console.log(error);
          if (
            error.response.data.status === 400 ||
            "errors" in error.response.data
          ) {
            const errorMessages = error.response.data.errors;
            notification.error({
              message: error.response.data?.message,
              description: errorMessages.detail,
              duration:1
            })
          }
        });
    }
   
  }, [assessmentSearchWord, type]);

  useEffect(() => {
    setIsAssigneeLoading(true)
    if (editId && assessmentList.length > 0) {
      const currentAssessment = assessmentList.find(
        (assessment) => assessment.id === editId
      );

      let assignedUsers = [];

      if ("task_users" in currentAssessment) {
        assignedUsers = currentAssessment?.task_users?.map(
          (assigned) => assigned.user.id
        );
      }

      let cloneAssessmentList = [...assessmentList];

      //formatting task_weightage object as per frontend need
      cloneAssessmentList = cloneAssessmentList?.map((assessment) => {
        if (assessment?.task_weightages?.length > 0) {
          assessment["task_weightages"] = assessment.task_weightages?.map(
            (weightage) => {
              const weightObject = {
                weightage_percentage: weightage.weightage_percentage,
                weightage: weightage.weightage,
                taskScore : weightage.task_score
              };

              if ("id" in weightage) {
                weightObject["id"] = weightage.id;
              }
              return weightObject;
            }
          );
        } else {
          assessment["task_weightages"] = [
            {
              weightage_percentage: null,
              weightage: null,
            },
          ];
        }

        return assessment;
      });

      setSelectedStudents(assignedUsers);
    }

    if(editId){

      if(getPermission(user.permissions,"TaskUser","create")){
        axios
        .get(`${API_END_POINT}/api/applicant/${batchId}/list/students/?search=${assigneeSearch}`, {
          headers,
        })
        .then((res) => {
          if (res.status === 200 && res.data.message === "Success") {
            setIsAssigneeLoading(false)
            setStudents(res.data.data);
          }
        })
        .catch((error) => {
          setIsAssigneeLoading(false)
          if (
            error.response.data.status === 400 ||
            "errors" in error.response.data
          ) {
            const errorMessages = error.response.data.errors;
            notification.error({
              message: error.response.data?.message,
              description: errorMessages.detail,
              duration:1
            })
          }
        });
      }
     
    }
  }, [editId,assigneeSearch]);

  const handleDeleteAssessment = (deleteId) => {
    setEditId(deleteId);
    setIsDeleteModalOpen(true);
    setIsDraft(
      [...assessmentList].some((task) => task.id === deleteId && task.draft)
    );
  };

  const handleConfirmDelete = () => {
    const updatedTasks = [...assessmentList].filter(
      (task) => task.id !== editId
    );

    if (isDraft) {
      setAssessmentList(updatedTasks);
      notification.success({
        message: "Success",
        description: "Task Discard Successfully",
        duration: 3,
      });
      setIsDeleteModalOpen(false);
      setEditId(updatedTasks.length > 0 ? updatedTasks[0].id : null);
    } else {
      axios
        .delete(`${API_END_POINT}/api/task/${batchId}/delete_task/${editId}`, {
          headers: {
            Authorization: `Bearer ${token.access}`,
          },
        })
        .then((res) => {
          notification.success({
            message: "Success",
            description: "Task Deleted Successfully",
            duration: 3,
          });
          setAssessmentList(updatedTasks);
          setIsDeleteModalOpen(false);

          setEditId(updatedTasks.length > 0 ? updatedTasks[0].id : null);
        })
        .catch((error) => {
          setIsDeleteModalOpen(false);
          console.log(error);
        });
    }
  };

  const handleSave = (assessment) => {

    const newTaskName = assessment.task_title.trim().toLowerCase();

    // Check if the task with the same task_title already exists
    const isDuplicateTask = assessmentList.some(
      (existingAssessment) =>
        existingAssessment.id !== assessment.id &&
        existingAssessment.task_title.trim().toLowerCase() === newTaskName
    );
    

  if (isDuplicateTask) {
    messageApi.open({
      type: 'error',
      content: `${newTaskName} already exits`,
      duration:1
    });
  } else {

    const isNew = "draft" in assessment;

    const {
      created_at,
      created_by,
      updated_at,
      batch,
      updated_by,
      is_deleted,
      ...currentAssessment
    } = assessment;

    if (isNew) {
      delete currentAssessment["draft"];
      delete currentAssessment["id"];
    }

    const apiEndpoint = isNew
      ? `${API_END_POINT}/api/task/${batchId}/create_task/`
      : `${API_END_POINT}/api/task/${batchId}/update_task/${editId}`;
    const method = isNew ? "POST" : "PUT";

   

    axios({
      method: method,
      url: apiEndpoint,
      headers: {
        Authorization: `Bearer ${token.access}`,
        "Content-Type": "application/json",
      },
      data: currentAssessment,
    })
      .then((res) => {
        notification.success({
          message: "Success",
          description: isNew
            ? `${type} Added Successfully`
            : `${type} Updated Successfully`,
          duration: 1,
        });


        let cloneAssessmentList = [...assessmentList];
        //finding and filtering the assessment which is new create the assessment

        if (isNew) {
          cloneAssessmentList = cloneAssessmentList.filter(
            (assessment) => !("draft" in assessment)
          );
          currentAssessment["id"] = res.data.data.id;
          cloneAssessmentList = [currentAssessment, ...cloneAssessmentList];
        } else {
          cloneAssessmentList = cloneAssessmentList.map((assessment) => {
            if (assessment.id === res.data.data.id) {
              assessment = currentAssessment;
            }
            return assessment;
          });
        }


        setAssessmentList(cloneAssessmentList);
        setEditId(
          cloneAssessmentList.length > 0 ? cloneAssessmentList[0].id : null
        );
      })
      .catch((error) => {
        if (
          error.response.data.status === 400 ||
          "errors" in error.response.data
        ) {
          const errorMessages = error.response.data.errors;

          Object.entries(errorMessages).forEach(([key, messages]) => {
            messages.forEach((message) =>
              notification.error({
                message: `${key} Error`,
                description: message,
              })
            );
          });
        }
      });

  }


    
  };

  const handleAdd = () => {
    const uniqueId = uuidv4();

    const createAssessment = {
      id: uniqueId,
      task_title: "Untitled",
      task_description: "",
      due_date: dayjs().format("YYYY-MM-DD HH:mm:ss"),
      draft: true,
      task_type: type == "assessment" ? 1 : 0,
    };

    const concatNewAssessment = [createAssessment, ...assessmentList];

    setAssessmentList(concatNewAssessment);

    setEditId(uniqueId);
    setIsStudentScoreOpen(false);
    setIsMode("edit");
  };

  const handleInputChange = (name, value) => {
    // if name present in formErrors state check and delete the key in onchange example task_name present in error state delete it the key  
    if (formErrors[name]) {
      delete formErrors[name];
    }
    const cloneAssessmentList = [...assessmentList];
    const updatedList = cloneAssessmentList.map((assessment) => {
      if (assessment.id === editId) {
        return {
          ...assessment,
          [name]: value,
        };
      }
      return assessment;
    });

    setAssessmentList(updatedList);
  };

  const makePostRequest = async (url, data, method) => {
    const response = await axios(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.access}`,
      },
      data: data,
    });
    return response;
  };

  const handleSaveWeightage = () => {
    let cloneAssessmentList = [...assessmentList];

    let currentAssessment = cloneAssessmentList.find(
      (assessment) => assessment.id == editId
    );

    let createPromise = [];
    let updatePromise = [];

    if (batchId && editId) {
      currentAssessment.task_weightages.map((weightage) => {
        if ("id" in weightage) {
          const url = `${API_END_POINT}/api/task/${batchId}/update/task_weightage/${weightage.id}`;
          //its for update
          const { id, ...postPayload } = weightage;
          updatePromise.push(makePostRequest(url, postPayload, "PUT"));
        } else {
          const url = `${API_END_POINT}/api/task/${batchId}/assign/task_weightage/${editId}`;
          createPromise.push(makePostRequest(url, weightage, "POST"));
        }
      });

      if (createPromise.length > 0) {
        Promise.all(createPromise)
          .then((results) => {
            notification.success({
              message: "Sucess",
              description: "Weightage Linked Successfully",
            });

            //need to rework, check with BE
            cloneAssessmentList = cloneAssessmentList.map((assessment) => {
              if (assessment.id == editId) {
                assessment["task_weightages"] = assessment.task_weightages.map(
                  (weightage, index) => {
                    for (const res of results) {
                      if (res.data.data.task === editId) {
                        weightage["id"] = res.data.data.id;
                      }
                      return weightage;
                    }
                  }
                );
              }
              return assessment;
            });

            setAssessmentList(cloneAssessmentList);
          })
          .catch((error) => {
            if (
              error.response.data.status === 400 ||
              "errors" in error.response.data
            ) {
              const errorMessages = error.response.data.errors;
              if (Array.isArray(errorMessages)) {
                notification.error({
                  message: `Error`,
                  description: errorMessages,
                });
              } else {
                Object.entries(errorMessages).forEach(([key, messages]) => {
                  messages.forEach((message) =>
                    notification.error({
                      message: `${key} Error`,
                      description: message,
                    })
                  );
                });
              }
            }
          });
      }

      if (updatePromise.length > 0) {
        Promise.all(updatePromise)
          .then((results) => {
            notification.success({
              message: "Sucess",
              description: "Weightage Update Successfully",
            });
          })
          .catch((error) => {
            if (
              error.response.data.status === 400 ||
              "errors" in error.response.data
            ) {
              const errorMessages = error.response.data.errors;
              if (Array.isArray(errorMessages)) {
                notification.error({
                  message: `Error`,
                  description: errorMessages,
                });
              } else {
                Object.entries(errorMessages).forEach(([key, messages]) => {
                  messages.forEach((message) =>
                    notification.error({
                      message: `${key} Error`,
                      description: message,
                    })
                  );
                });
              }
            }
          });
      }
    }
  };

  const handleAddWeightage = () => {
    const newWeightage = { weightage: null, weightage_percentage: null };

    const updatedAssessmentList = assessmentList.map((assessment) => {
      if (assessment.id === editId) {
        assessment.task_weightages = [
          ...assessment.task_weightages,
          newWeightage,
        ];
      }

      return assessment;
    });

    setAssessmentList(updatedAssessmentList);
  };

  const handleWeightageChange = (value, index, key) => {
    if(weightageErrors[key]){
      delete weightageErrors[key]
    }
    else if(key === "weightage_percentage"){
      delete weightageErrors["weightage"]
    }
    let copyAssessment = [...assessmentList];

    copyAssessment = copyAssessment.map((assessment) => {
      if (assessment.id === editId) {
        assessment.task_weightages[index][key] = parseFloat(value);
      }
      return assessment;
    });

    setAssessmentList(copyAssessment);
  };

  const handleStatusChange = (studentId, status) => {

    setLoading(true)
    const url = `${API_END_POINT}/api/task/${batchId}/update/task/user/${studentId}`;
    const payload = { task_status: status };

    //student task status changes

    //students status changed to Admin
    axios
      .put(url, payload, { headers })
      .then((res) => {
        setLoading(false)
        let copiedTaskStatusChangeStudents = assessmentList.map(
          (assessment) => {
            assessment["task_users"] = assessment.task_users.map((user) => {
              if (user.id === studentId) {
                user.task_status = status;
              }
              return user;
            });
            return assessment;
          }
        );

        setAssessmentList(copiedTaskStatusChangeStudents);
      })
      .catch((error) => {
        setLoading(false)
        console.log(error);
      });
  };

  const handleAddScore = (studentScores) => {
    setLoading(true)
   
   
    //weightage open and score added only submit the score
    studentScores.map((scores) => {
      const url = `${API_END_POINT}/api/task/${batchId}/create/task_score/`;
      axios
        .post(url, scores, { headers })
        .then((res) => {
          axios
            .put(
              `${API_END_POINT}/api/task/${batchId}/update/task/user/${scores.task_user}`,
              { task_status: "COMPLETED" },
              { headers }
            )
            .then((res) => {
              setLoading(false)
              let statusChangeAfterScore = [...assessmentList];

              statusChangeAfterScore = statusChangeAfterScore.map((assessment) => {
                assessment.task_users = assessment.task_users.map((student) => {
                  studentScores.forEach((scores) => {
                    if (student.id === scores.task_user) {
                      student.task_status = "COMPLETED";
                    }
                  });
                  return student;
                });
                return assessment;
              });
              setAssessmentList(statusChangeAfterScore);
              setActiveWeightageIndex(null);
              notification.success({
                message:"Success",
                description:"Score Added Successfully"
              })
            })
            .catch((error) => {
              console.log(error);
              setLoading(false)

            });
        })
        .catch((error) => {
          if("errors" in error.response.data){
            const errorMessages = error.response.data.errors;
            notification.error({
              message: 'Error',
              description: (
                <>
                  {errorMessages.map((message, index) => (
                    <p key={index}>{message}</p>
                  ))}
                </>
              ),
            });
            setLoading(false)

          }
        });
    });
  };

  const handleDeleteWeightage = (deleteWeightageId, index) => {
    let updatedAssessmentList = [...assessmentList];

    if (deleteWeightageId) {
      updatedAssessmentList = updatedAssessmentList.map((assessment) => {
        if (assessment.id === editId) {
          // Use map to create a new array of task_weightages without the specified deleteWeightageId
          const updatedTaskWeightages = assessment.task_weightages.filter(
            (weightage) => weightage.id !== deleteWeightageId
          );
          return {
            ...assessment,
            task_weightages: updatedTaskWeightages,
          };
        }
        return assessment;
      });

      const url = `${API_END_POINT}/api/task/${batchId}/delete/task_weightage/${deleteWeightageId}`;

      axios
        .delete(url, { headers })
        .then((res) => {
          if (res.data.status === 200) {
            notification.success({
              message: "Success",
              description: `${res.data.message}`,
            });
            setAssessmentList(updatedAssessmentList);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      updatedAssessmentList = updatedAssessmentList.map((assessment) => {
        if (assessment.id === editId) {
          // Use map to create a new array of task_weightages without the specified index
          const updatedTaskWeightages = [...assessment.task_weightages];
          updatedTaskWeightages.splice(index, 1);

          return {
            ...assessment,
            task_weightages: updatedTaskWeightages,
          };
        }
        return assessment;
      });

      setAssessmentList(updatedAssessmentList);
    }
  };

  //comments
  const handleSendComment=(commentId)=>{
    const url = isCommentEditId ? `${API_END_POINT}/api/task/${batchId}/update/task_comment/${isCommentEditId}` : `${API_END_POINT}/api/task/${batchId}/create/task_comment/${commentId}`
    const method = isCommentEditId ? "PUT" : "POST"
    axios({
      method: method,
      url: url,
      data: {comments:commentText},
      headers:headers
    }).then((res)=>{
      let updatedComment = res.data.data;
    const updatedAssessmentList = assessmentList.map((assessment) => {
      if (assessment.id === editId) {
        // Check if it's an edit or a new comment
        if (isCommentEditId) {
          // If it's an edit, update the specific comment
          assessment.task_users.map((users) => {
            users.comments.map((comment) => {
              if (comment.id === isCommentEditId) {
                // Update the existing comment
                Object.assign(comment, updatedComment);
              }
            });
          });
        } else {
          // If it's a new comment, add it to the task
          assessment.task_users.map((users) => {
            users.comments.push(updatedComment);
          });
        }
      }
      return assessment;
    });

      setAssessmentList(updatedAssessmentList)
      setIsCommentEditId(null)
      setCommentText(" ")
    }).catch((error)=>{
      if (
        error.response.data.status === 400 ||
        "errors" in error.response.data
      ) {
        const errorMessages = error.response.data.errors;

        Object.entries(errorMessages).forEach(([key, messages]) => {
          messages.forEach((message) =>
            notification.error({
              message: `${key} Error`,
              description: message,
            })
          );
        });
      }
    })
  }
  const handleDeleteComment =(commentId)=>{
    const url = `${API_END_POINT}/api/task/${batchId}/delete/task_comment/${commentId}`
    axios.delete(url,{headers}).then((res)=>{
      const updatedAssessmentList = assessmentList.map((assessment) => {
        if (assessment.id === editId) {
          // Use map to update the user's comments by excluding the comment with the specified ID
          assessment.task_users.map((user) => {
            user.comments = user.comments.filter((comment) => comment.id !== commentId);
          });
        }
        return assessment;
      });
      
      // Update the local state with the modified task lists
      setAssessmentList(updatedAssessmentList);
      
      if(res.data.status == 200){
        notification.success({
          message:"Success",
          description : res?.data?.message,
          duration:1
        })
      }
      
    }).catch((error)=>{
      console.log(error);
    })
  }

  return (
    <>
      {getPermission(user.permissions,"Task","create") ? (
        <>
          {isDeleteModalOpen && (
            <Modal
              open={true}
              title={`${isDraft ? "Discard" : "Delete"} Confirmation`}
              onOk={handleConfirmDelete}
              maskClosable={false}
              onCancel={() => {
                setIsDeleteModalOpen(false);
                setIsDraft(false);
              }}
              okButtonProps={{
                style: { background: "#49a843", borderColor: "#EAEAEA" },
              }}
            >
              <p>{`${
                isDraft
                  ? "Are you sure you want to discard the changes"
                  : "Are you sure you want to delete"
              } ${type} ${
                assessmentList.find((asses) => asses.id === editId).task_title
              }?`}</p>
            </Modal>
          )}
          <AssessmentList
            mode={type}
            filterShow={false}
            handleEdit={(editId) => setEditId(editId)}
            assessmentList={assessmentList}
            setAssessmentSearchWord={setAssessmentSearchWord}
            loading={loading}
            handleDelete={handleDeleteAssessment}
            handleAdd={handleAdd}
            selectedAssessment={editId}
            setIsStudentScoreOpen={setIsStudentScoreOpen}
            isStudentScoreOpen={isStudentScoreOpen}
            isMode={isMode}
            setIsMode={setIsMode}
            currentAssessment={assessmentList.find((assessment)=>assessment.id == editId)}
          />

          {loading ? (
            <div className="main-container">
              <Skeleton active={true} />
            </div>
          ) : (
            <>
              {assessmentList.map((assessment) => {
                if (assessment.id === editId) {
                  return (
                    <AssessmentView
                      key={assessment.id}
                      currentAssessment={assessment}
                      students={students}
                      selectedStudents={selectedStudents}
                      setSelectedStudents={setSelectedStudents}
                      handleSave={handleSave}
                      handleInputChange={handleInputChange}
                      weightageShow={type === "task" ? false : true}
                      handleSaveWeightage={handleSaveWeightage}
                      handleAddWeightage={handleAddWeightage}
                      handleWeightageChange={handleWeightageChange}
                      isStudentScoreOpen={isStudentScoreOpen}
                      setIsStudentScoreOpen={setIsStudentScoreOpen}
                      handleStatusChange={handleStatusChange}
                      handleAddScore={handleAddScore}
                      setActiveWeightageIndex={setActiveWeightageIndex}
                      activeWeightageIndex={activeWeightageIndex}
                      handleDeleteWeightage={handleDeleteWeightage}
                      type={type} 
                      handleSendComment={handleSendComment}
                      handleDeleteComment={handleDeleteComment}
                      commentText={commentText}
                      isCommentEditId={isCommentEditId}
                      setCommentText={setCommentText}
                      setIsCommentEditId={setIsCommentEditId}
                      formErrors={formErrors}
                      setFormErrors={setFormErrors}
                      weightageErrors={weightageErrors}
                      setWeightageErros={setWeightageErros}
                      setAssigneeSearch ={setAssigneeSearch}
                      isAssigneeLoading={isAssigneeLoading}
                      setIsMode={setIsMode}
                    />
                  );
                }
                return null;
              })}
              {editId === null && (
                <div className="main-container">
                  <div className="task-main-container">
                  <div className="select-something-container flex">
                  <div className="image-container ">
                    <img src="/icons/select-something.svg" alt="" />
                    <p className="select-something-heading">
                      Please Select any of the Available {type} or Create New {type}
                    </p>
                  </div>
                </div>
                  </div>
                </div>
              )}
            </>
          )}
        </>
      ) : (
        <StudentLogin type={type} />
      )}
    </>
  );
};

export default AssessmentModule;
