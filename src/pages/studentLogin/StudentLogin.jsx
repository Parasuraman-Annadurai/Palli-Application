import React, { useEffect, useState } from "react";

import axios from "axios";
import { Modal, Select } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

import { API_END_POINT } from "../../../config";

import { useAuth } from "../../context/AuthContext";

import { useParams } from "react-router-dom";

const TaskCard = ({ tasksLists, setSeletedTaskId,selectedTaskId }) => {
  const truncateText = (text, maxLength) => {
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };
  return (
    <>
      <div
        className={`task-card  flex ${tasksLists.id === selectedTaskId ? "active":""}`}
        onClick={() => setSeletedTaskId(tasksLists.id)}
      >
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
  const [tasksLists, setTaskLists] = useState([]);
  const [selectedTaskId, setSeletedTaskId] = useState(null);
  const [changeStatus, setChangeStatus] = useState("");
  const [submissionLink, setSubmissionLink] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const headers = {
    Authorization: `Bearer ${token.access}`,
    "Content-type": "application/json",
  };
  useEffect(() => {
    axios
      .get(`${API_END_POINT}/api/task/${batchId}/list/user/task/`, { headers })
      .then((res) => {
        const copyTaskList = [...res.data.data];
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

  const handleChange = (status) => {
    if (status !== "SUBMITTED") {
      axios
        .put(
          `${API_END_POINT}/api/task/${batchId}/update/task/user/${selectedTaskId}`,
          { task_status: status },
          { headers }
        )
        .then((res) => {
          let updatedTask = [
            {
              ...tasksLists[
                tasksLists.findIndex((task) => task.id === selectedTaskId)
              ],
              task_status: status,
            },
          ];
          setTaskLists(updatedTask);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setIsModalOpen(true);
      setChangeStatus(status);
    }
  };

  const handleSubmit = () => {
    const url = `${API_END_POINT}/api/task/${batchId}/update/task/user/${selectedTaskId}`;
    setIsLoading(true);
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
        if (res.status === 200) {
          let updatedTask = [ {...tasksLists[tasksLists.findIndex((task) => task.id === selectedTaskId)], task_status: changeStatus} ]
          setTaskLists(updatedTask);
          setIsLoading(false);
          setIsModalOpen(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <section className="listing-container">
        <h1>{type} list</h1>
        <div className="search-container">
          <input type="input" placeholder="search..." />{" "}
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
                />
              );
            })}
        </div>
      </section>

      {tasksLists.map((tasksList) => {
        if (tasksList.id == selectedTaskId) {
          return (
            <main className="main-container" key={tasksList.id}>
              <div className="module-header-section flex">
                <div className="module-title-section flex">
                  <h3>{tasksList.task.task_title}</h3>
                </div>
              </div>

              <div className="task-details-header-container">
                <div className="background-div">
                  <div className="task-label-container flex">
                    <h3>Task Details</h3>
                    <div className="horizon-line"></div>
                  </div>

                  <div className="student-task-details-main-container flex">
                    <div className="student-task-status">
                      <p>Status</p>
                      <Select
                        name=""
                        id=""
                        placeholder="Select the status"
                        onChange={handleChange}
                        disabled={tasksList.task_status === "SUBMITTED"}
                        defaultValue={`${tasksList.task_status}`}
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
                        {dayjs(tasksList.task.due_date).format("MMM,DD YYYY")}
                      </span>
                    </div>
                  </div>

                  <div className="task-editor-container">
                    <p>Description</p>

                    <div className="task-instruction">
                      <span>
                        {tasksList.task.task_description.replace(
                          /<[^>]*>/g,
                          ""
                        )}
                      </span>
                    </div>
                  </div>

                  <div className="weightage-label-container flex">
                    <h3>Weightage Details</h3>
                    <div className="horizon-line"></div>
                  </div>

                  <div className="student-weightage-list flex">
                    {tasksList.weightage_details &&
                      tasksList.weightage_details.map((weightageDetails) => (
                        <div className="student-weightage-card">
                          <p>
                            {weightageDetails.weightage_details.weightage}{" "}
                            {Number(weightageDetails.weightage_percentage)}
                          </p>
                        </div>
                      ))}
                  </div>
                </div>
              </div>

              <Modal
                title="Submission Link"
                open={isModalOpen}
                onOk={handleSubmit}
                onCancel={() => setIsModalOpen(false)}
                footer={[
                  <button
                    key="cancel"
                    className="btn primary-default"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Cancel
                  </button>,
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
                  </button>,
                ]}
              >
                <input
                  type="url"
                  placeholder="paste submission link"
                  onChange={(e) => setSubmissionLink(e.target.value)}
                />
              </Modal>
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
