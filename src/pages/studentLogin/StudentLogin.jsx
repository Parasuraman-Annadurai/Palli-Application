import React, { useEffect, useState } from "react";

import axios from "axios";
import { Modal, Select, Skeleton, notification, Drawer } from "antd";

import { LoadingOutlined } from "@ant-design/icons";
import dayjs from "dayjs";


import { API_END_POINT } from "../../../config";

import { useAuth } from "../../context/AuthContext";

import { useParams, useNavigate } from "react-router-dom";

import "../studentLogin/scss/StudentLogin.css";

import colorObject, { validUrl } from "../../utils/validate";
import Comments from "../../components/CommentsModule/Comments";

import { valueTrim } from "../../utils/validate";

const TaskCard = ({
  tasksLists,
  setSeletedTaskId,
  selectedTaskId,
  isLoading,
}) => {
  const truncateText = (text, maxLength) => {
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  return (
    <>
      <div
        style={{ marginTop: "12px" }}
        className={`task-card  flex ${
          tasksLists.id === selectedTaskId ? "active" : ""
        }`}
        onClick={() => setSeletedTaskId(tasksLists.id)}
      >
        {isLoading ? (
          <Skeleton avatar={{ size: "small" }} active paragraph={{ rows: 1 }} />
        ) : (
          <>
            <div className="task-icon flex">
              <span>{tasksLists?.task?.task_title?.split(" ").slice(0, 2).map(word => word[0].toUpperCase()).join("")}</span>
            </div>

            <div className="task-details">
              <div className="task-name-with-icon flex">
                <h2>{truncateText(tasksLists.task.task_title, 15)}</h2>
              </div>
              <p className="task-description">
                {truncateText(
                  tasksLists.task.task_description.replace(/<[^>]*>/g, ""),
                  50
                )}
              </p>
              <span
                className="btn btn-inprogress"
                style={{
                  backgroundColor:
                    colorObject[tasksLists?.task_status]?.backgroundColor,
                  color: colorObject[tasksLists?.task_status]?.color,
                }}
              >
                {tasksLists.task_status}
              </span>
              <span className="btn btn-deadline">
                {dayjs.utc(tasksLists.task.due_date).format("MMM DD YYYY")}
              </span>
            </div>
          </>
        )}
      </div>
    </>
  );
};

const StudentLogin = ({ type }) => {
  const navigate = useNavigate();
  const { token, user } = useAuth();
  const { id: batchId } = useParams();
  const [tasksLists, setTaskLists] = useState([]);
  const [selectedTaskId, setSeletedTaskId] = useState(null);
  const [changeStatus, setChangeStatus] = useState("");
  const [submissionLink, setSubmissionLink] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [taskComments,setTaskComments] = useState("");
  const [isCommentEditId,setIsCommentEditId] = useState(null);
  const [openCommentSection,setOpenCommentSection] = useState(false);
  const [formErrors,setFormErrors] = useState({})
  const [taskSearch,setTaskSearch] = useState("")

  const headers = {
    Authorization: `Bearer ${token.access}`,
    "Content-type": "application/json",
  };
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        `${API_END_POINT}/api/task/${batchId}/list/user/task/?filter_task_type=${
          type === "assessment" ? 1 : 0
        }&search=${taskSearch}`,
        { headers }
      )
      .then((res) => {
        setIsLoading(false);
        const copyTaskList = [...res.data.data];
        setTaskLists(copyTaskList);
        const getFirstTask =
          [...res.data.data].length > 0 ? [...res.data.data][0]["id"] : null;
        setSeletedTaskId(getFirstTask);
      })
      .catch((error) => {
        if (
          error.response.data.status === 400 ||
          "errors" in error.response.data
        ) {
          const errorMessages = error.response.data.errors;
          if (errorMessages && errorMessages.detail) {
            notification.error({
              message: error.response.data.message,
              description: errorMessages.detail,
              duration: 1,
            });
          }
          setIsLoading(false);
        }
      });
  }, [type,taskSearch]);

  const handleChange = (status) => {
    setIsLoading(true);
    if (status !== "SUBMITTED") {
      axios
        .put(
          `${API_END_POINT}/api/task/${batchId}/update/task/user/${selectedTaskId}`,
          { task_status: status },
          { headers }
        )
        .then((res) => {
          setIsLoading(false);
          let copiedTaskList = tasksLists.map((task) => {
            if (task.id === selectedTaskId) {
              task["task_status"] = status;
            }
            return task;
          });

          setTaskLists(copiedTaskList);
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);

          if (
            error.response.data.status === 400 ||
            "errors" in error.response.data
          ) {
            const errorMessages = error.response.data.errors;
            notification.error({
              message: `Permission denied Error`,
              description: errorMessages.detail,
              duration:1
            })
          }
        });
    } else {
      setIsModalOpen(true);
      setChangeStatus(status);
      setIsLoading(false);
    }
  };

  const handleSubmit = () => {

    if(valueTrim(submissionLink,"Submission link",setFormErrors) && validUrl(submissionLink,"Submission link",setFormErrors)){
      const url = `${API_END_POINT}/api/task/${batchId}/update/task/user/${selectedTaskId}`;
    setIsLoading(true);
    axios
      .put(
        url,
        {
          task_status: changeStatus,
          submission_link: submissionLink,
          reviewer: 62,
        },
        { headers }
      )
      .then((res) => {
        if (res.status === 200) {
          let updatedTask = tasksLists.map((task) => {
            if (task.id === selectedTaskId) {
              return {
                ...task,
                task_status: changeStatus,
              };
            }
            return task;
          });
          notification.success({
            message: "Success",
            description: `${type} Submitted`,
          });
          setTaskLists(updatedTask);
          setIsLoading(false);
          setIsModalOpen(false);
        }
      })
      .catch((error) => {
        setIsLoading(false);
          setIsModalOpen(false);
        console.log(error);
      });
    }
    
  };

  const handleAddComment =(id)=>{

    const url = isCommentEditId ? `${API_END_POINT}/api/task/${batchId}/update/task_comment/${isCommentEditId}` : `${API_END_POINT}/api/task/${batchId}/create/task_comment/${id}`
    const method = isCommentEditId ? "PUT" : "POST"
    

    axios({
      method: method,
      url: url,
      data: {comments:taskComments},
      headers:headers
    }).then((res)=>{

      let updatedComment = res.data.data;

      const updatedTaskLists = tasksLists.map((task) => {
        if (task.id === selectedTaskId) {
          // Check if it's an edit or a new comment
          if (isCommentEditId) {
            // If it's an edit, update the specific comment
            task.comments = task.comments.map((comment) => {
              if (comment.id === isCommentEditId) {
                return updatedComment;
              }
              return comment;
            });
          } else {
            // If it's a new comment, concatenate it
            task.comments = [updatedComment, ...task.comments];
          }
        }
        return task;
      });
    
      setTaskComments(" ")
      setTaskLists(updatedTaskLists);
      setIsCommentEditId(null)
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
      const updatedTaskLists = tasksLists.map((task) => {
        if (task.id === selectedTaskId) {
          // Use filter to exclude the comment with the specified ID
          task.comments = task.comments.filter((comment) => comment.id !== commentId);
        }
        return task;
      });
      
      // Update the local state with the modified task lists
      setTaskLists(updatedTaskLists);
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
      <section className="listing-container">
        <h1>{type} list</h1>
        <div className="search-container">
          <input type="input" placeholder="search..." onChange={(e)=>setTaskSearch(e.target.value)}/>{" "}
          <img
            src="/icons/searchIcon.svg"
            alt="search-icon"
            className="search-icon"
          />
        </div>
        <div className="task-list-container">
          {tasksLists &&
            tasksLists.map((tasks) => {
              return (
                <TaskCard
                  key={tasks.id}
                  tasksLists={tasks}
                  setSeletedTaskId={setSeletedTaskId}
                  selectedTaskId={selectedTaskId}
                  isLoading={isLoading}
                />
              );
            })}
        </div>
      </section>
      <div className="main-container">
        {isLoading ? <Skeleton active paragraph={6}/> : (
          <>
             {tasksLists.map((tasksList) => {
            if (tasksList.id == selectedTaskId) {
              return (
                <>
                  <div className="module-header-section flex" key={tasksList.id}>
                    <div className="module-title-section flex">
                      <h3>{tasksList.task.task_title}</h3>
                    </div>
                    <div className="comments" onClick={()=>setOpenCommentSection(true)}>
                      <img src="/icons/comment-border.svg" alt="" />
                      <button className="secondary-border-btn" >Comments</button>
                    </div>
                  </div>

                  <div className="task-details-header-container">
                    <div className="background-div">
                      <div className="task-label-container flex">
                        <h3>Task Details</h3>
                        <div className="horizon-line"></div>
                      </div>

                      <div className="student-task-details-main-container flex">
                        <div className="student-task-trainer-name">
                          <p>Trainer Name</p>
                          <span>{tasksList?.reviewer?.first_name}</span>
                        </div>

                        <div className="student-task-status">
                          <p>Status</p>
                          <Select
                            onChange={handleChange}
                            prefixCls={`students-status-${tasksList.task_status}-status`}
                            disabled={
                              tasksList.task_status === "SUBMITTED" ||
                              tasksList.task_status === "COMPLETED"
                            }
                            defaultValue={tasksList.task_status}
                            style={{ width: "70%" }}
                            suffixIcon={
                              <img src="/icons/drop.svg" alt="Sample SVG" />
                            }
                            dropdownStyle={{ zIndex: 9999 }}
                          >
                            <Select.Option value="TODO">Todo</Select.Option>
                            <Select.Option value="INPROGRESS">
                              Inprogress
                            </Select.Option>
                            <Select.Option value="SUBMITTED">
                              Submitted
                            </Select.Option>
                          </Select>
                        </div>
                        <div className="student-task-deadline">
                          <p>Deadline</p>
                          <span>
                            {dayjs(tasksList.task.due_date).format(
                              "MMM,DD YYYY"
                            )}
                          </span>
                        </div>
                      </div>

                      <div className="task-editor-container">
                        <p>Description</p>

                        <div className="task-instruction">
                          <span
                            dangerouslySetInnerHTML={{
                              __html: tasksList.task.task_description,
                            }}
                          ></span>
                        </div>
                      </div>
                      {type !== "task" && (
                        <>
                          <div className="weightage-label-container flex">
                            <h3>Weightage Details</h3>
                            <div className="horizon-line"></div>
                          </div>
                          <div className="student-weightage-list flex">
                            {tasksList?.weightage_details &&
                              tasksList?.weightage_details?.map(
                                (weightageDetails, index) => (
                                  <div className="student-weightage-card flex">
                                    <p>
                                      {
                                        weightageDetails.weightage_details
                                          .weightage
                                      }
                                      {""}
                                    </p>
                                    <span>
                                      {Number(
                                        weightageDetails.weightage_percentage
                                      )}
                                    </span>
                                    <span className="score">
                                      {weightageDetails?.task_score?.map((a) =>
                                        Number(a.task_score)
                                      )}
                                    </span>{" "}
                                  </div>
                                )
                              )}
                          </div>
                        </>
                      )}

                      {tasksList?.submission_link && (
                        <div className="submission-link-container">
                          <div className="heading-line flex">
                            <h3>Submitted Link</h3>
                            <div className="horizon-line"></div>
                          </div>
                          <a
                            href={`${tasksList.submission_link}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {tasksList.submission_link}
                          </a>
                        </div>
                      )}
                    </div>
                      
                    
                    <div className="comments-container">
                      <Drawer title="Comments" onClose={()=>{
                        setOpenCommentSection(false)
                        setIsCommentEditId(null)
                        setTaskComments("")
                      }} open={openCommentSection}>
                      <Comments commentErrors={formErrors} setCommentsErrors={setFormErrors} comments={tasksList?.comments} commenterId={tasksList.id} commentText={taskComments} isCommentEditId={isCommentEditId} setIsCommentEditId={setIsCommentEditId} setCommentText={setTaskComments} handleSendComment={handleAddComment} handleDeleteComment={handleDeleteComment} role={"Student"}/>
                      </Drawer>
                    </div>
                  </div>

                  {/* Future used */}
                  
                  {/* <div className="student-task-label-container flex">
                    <h3>Task File</h3>
                    <div className="horizon-line"></div>
                  </div>

                  <div className="file-input-container">
                    <div className="upload-icon-container flex">
                      <img src="/icons/upload.svg" className="upload-icon" />
                      <label for="file-input">
                        Drag your file or
                        <span className="highlight">
                          {" "}
                          click to upload your task
                        </span>
                      </label>
                    </div>
                    <input type="file" className="file-input" />
                  </div> */}
                  <Modal
                    prefixCls="submission-modal"
                    title={<span>Submission Link</span>}
                    open={isModalOpen}
                    onOk={handleSubmit}
                    onCancel={() => setIsModalOpen(false)}
                    footer={[
                      <div className="over-all-btns">
                        <div className="all-btn flex">
                          <button
                            key="cancel"
                            className="btn primary-default"
                            onClick={() => setIsModalOpen(false)}
                          >
                            Cancel
                          </button>
                          <div className="submit-btn">
                            <button
                              key="submit"
                              type="primary"
                              className="btn primary-medium"
                              onClick={handleSubmit}
                              loading={isLoading}
                            >
                              {isLoading ? (
                                <span>
                                  Submitting...
                                  <LoadingOutlined className="loader" />
                                </span>
                              ) : (
                                "Submit"
                              )}
                            </button>
                          </div>
                        </div>
                        ,
                      </div>,
                    ]}
                  >
                    <div className="submission-link-input">
                      <input
                        className="input-link"
                        type="url"
                        name="Submission link"
                        placeholder="Paste submission link"
                        onChange={(e) =>{
                          const {value,name} = e.target
                          setSubmissionLink(value)
                          if(formErrors[name]){
                            delete formErrors[name];
                          }
                        }}
                        
                      />
                      <p className="error-message">{formErrors["Submission link"] ? formErrors["Submission link"] :""}</p>
                    </div>
                  </Modal>
                </>
              );
            }
            return null;
          })}

          {selectedTaskId === null && (
            <div className="select-something-container flex">
              <div className="image-container ">
                <img src="/icons/select-something.svg" alt="" />
                <p className="select-something-heading">
                  {selectedTaskId !== null
                    ? `Please Select any of the Available ${type}`
                    : `No ${type} are currently available here.`}
                </p>
              </div>
            </div>
          )}
          </>
        )}
      </div>
    </>
  );
};

export default StudentLogin;
