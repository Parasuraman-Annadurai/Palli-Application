import React, { useEffect, useState } from "react";

import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import { Modal,Select } from "antd";
import { API_END_POINT } from "../../../config";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";

const TaskCard = ({ tasksLists,setSeletedTaskId }) => {
  const truncateText = (text, maxLength) => {
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };
  return (
    <>
      <div className={`task-card flex`} onClick={()=>setSeletedTaskId(tasksLists.id)} >
        <div className="task-icon flex">
          <span>JS</span>
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
          <span className="btn btn-inprogress">{tasksLists.task_status}</span>
          <span className="btn btn-deadline">
            {dayjs(tasksLists.task.due_date).format("MMM,DD YYYY")}
          </span>
        </div>
      </div>
    </>
  );
};

const StudentLogin = ({ type }) => {
  const taskType = type === "assessment" ? 1 : 0;
  const { token, user } = useAuth();
  const { id: batchId } = useParams();
  const [tasksList, setTaskLists] = useState([]);
  const [selectedTaskId, setSeletedTaskId] = useState(null);
  const [changeStatus, setChangeStatus] = useState("");
  const [submissionLink, setSubmissionLink] = useState("");
  const [isModalOpen,setIsModalOpen] = useState(false);

  const headers = {
    Authorization: `Bearer ${token.access}`,
    "Content-type": "application/json",
  };
  useEffect(() => {
    const url = `${API_END_POINT}/api/task/${batchId}/list/user/task/`;

    axios
      .get(`${API_END_POINT}/api/task/${batchId}/list/user/task/`, { headers })
      .then((res) => {
        const copyTaskList = [...res.data.data];
        // console.log(copyTaskList);
        //filter the task or assessment to show the students
        const filteredTasks = copyTaskList.filter(
          (task) => task.task.task_type === taskType
        );
        setTaskLists(filteredTasks);

        if (!selectedTaskId) {
          const getFirstTask =
            [...res.data.data].length > 0 ? [...res.data.data][0]["id"] : null;
          setSeletedTaskId(getFirstTask);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleChange = (value) => {
    if(value !== "SUBMITTED" && value !== "TODO"){
        setChangeStatus(value);
        axios.put(`${API_END_POINT}/api/task/${batchId}/update/task/user/${selectedTaskId}`,{task_status: value},{headers}).then((res)=>{
            console.log(res);
        }).catch((error)=>{
            console.log(error);
        })
    }
    else{
        setChangeStatus(value);
        setIsModalOpen(true);
    }
  };
  const handleSubmit = () => {
    const url = `${API_END_POINT}/api/task/${batchId}/update/task/user/${selectedTaskId}`;

    axios
      .put(
        url,
        {
          task_status: changeStatus,
          submission_link: submissionLink,
        },
        { headers }
      )
      .then((res) => {
        console.log(res);
        setIsModalOpen(false)
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <section className="listing-container">
        <h1> list</h1>
        <div className="search-container">
          <input type="input" placeholder="search..." />{" "}
          <img
            src="/icons/searchIcon.svg"
            alt="search-icon"
            className="search-icon"
          />
        </div>
        <div className="task-list-container">
          {tasksList &&
            tasksList.map((tasks) => {
              return <TaskCard key={tasks.id} tasksLists={tasks} setSeletedTaskId={setSeletedTaskId} />;
            })}
        </div>
      </section>

      {tasksList.map((tasksList) => {
        if (tasksList.id == selectedTaskId) {
         
          return (
            <main class="main-container" key={tasksList.id}>
              <div class="module-header-section flex">
                <div class="module-title-section flex">
                  <h3>{tasksList.task.task_title}</h3>
                </div>
              </div>

              <div class="task-details-header-container">
                <div class="background-div">
                  <div class="task-label-container flex">
                    <h3>Task Details</h3>
                    <div class="horizon-line"></div>
                  </div>

                  <div class="student-task-details-main-container flex">
                    <div class="student-task-status">
                      <p>Status</p>
                      <Select
                        name=""
                        id=""
                        placeholder="Select the status"
                        onChange={handleChange}
                        disabled={tasksList.task_status === "SUBMITTED"}
                        defaultValue={`${tasksList.task_status}`}
                      >
                        <Option value="TODO">Todo</Option>
                        <Option value="INPROGRESS">Inprogress</Option>
                        <Option value="SUBMITTED">Submitted</Option>
                      </Select>
                    </div>
                    <div class="student-task-deadline">
                      <p>Deadline</p>
                      <span>
                        {dayjs(tasksList.task.due_date).format("MMM,DD YYYY")}
                      </span>
                    </div>
                  
                  </div>

                  <div class="task-editor-container">
                    <p>Description</p>

                    <div class="task-instruction">
                      <span>
                        {tasksList.task.task_description.replace(
                          /<[^>]*>/g,
                          ""
                        )}
                      </span>
                    </div>
                  </div>

                  <div class="weightage-label-container flex">
                    <h3>Weightage Details</h3>
                    <div class="horizon-line"></div>
                  </div>

                  <div class="student-weightage-list flex">
                    <div class="student-weightage-card">
                      <p>UI Styling 25</p>
                    </div>
                    <div class="student-weightage-card">
                      <p>UI Styling 25</p>
                    </div>
                  </div>
                </div>
              </div>

              {changeStatus === "SUBMITTED" && (
                <Modal title="Submission Link" open={isModalOpen} onOk={handleSubmit} onCancel={()=>setIsModalOpen(false)}>
                  <input
                    type="url"
                    placeholder="paste submission link"
                    onChange={(e) => setSubmissionLink(e.target.value)}
                  />
                </Modal>
              )}
            </main>
          );
        }
        return null;
      })}
      {selectedTaskId === null && (
        <div className="select-something-container flex">
          <div className="image-container ">
            <img src="/icons/select-something.svg" alt="" />
            <p className="select-something-heading">
              Please Select any of the Available Tasks
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default StudentLogin;
