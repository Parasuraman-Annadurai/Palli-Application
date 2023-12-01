import React, { useEffect } from "react";
import "./AddTaskPage.css";
import { useState } from "react";
import { notification, Input, DatePicker, Skeleton, Select } from "antd";
import { validateAddTask } from "../../utils/validate";
import { API_END_POINT } from "../../../config";
import { useAuth } from "../../context/AuthContext";
import useAPI from "../../hooks/useAPI";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import moment from "moment";
const { TextArea } = Input;

const AddTask = () => {
  const navigate = useNavigate();
  const { taskId } = useParams();
  const { data, loading, error, makeNetworkRequest } = useAPI();
  const { token } = useAuth();
  const { id: batchId } = useParams();

  const [errors, setErrors] = useState({});

  const [addTaskData, setAddTaskData] = useState({
    task_title: "",
    task_description: "",
    due_date: "",
    task_type: "task",
  });

  useEffect(() => {
    // Fetch task details for editing if taskId is present
    if (taskId) {
      makeNetworkRequest(
        `${API_END_POINT}/api/task/${batchId}/get/task/${taskId}`,
        "GET",
        null,
        {
          headers: {
            Authorization: `Bearer ${token.access}`,
          },
        }
      );
    }
  }, [taskId]);

  useEffect(() => {
    if (data && data.data) {
      const { task_title, task_description, due_date, task_type } = data.data;
      
      setAddTaskData({
        task_title,
        task_description,
        due_date,
        task_type: task_type === 0 ? "test" : "assesment",
      });
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddTaskData({ ...addTaskData, [name]: value });
    if (errors[name]) delete errors[name];
  };
  const handleType = (taskType) => {
    setAddTaskData({ ...addTaskData, task_type: taskType });
  };
  const handleDate = (date, dataString) => {
    console.log(dataString);
    setAddTaskData({ ...addTaskData, due_date: dataString });
  };
  const resetErrors = () => {
    setErrors({});
    navigate(`/batch/${batchId}/module`);
  };
  const handleTaskAdd = () => {
    const isValidTask = validateAddTask(addTaskData, setErrors);

    if (isValidTask) {
      addTaskData.task_type === "test" ? 0 : 1;
      const apiEndpoint = taskId
        ? `${API_END_POINT}/api/task/${batchId}/update_task/${taskId}`
        : `${API_END_POINT}/api/task/${batchId}/create_task/`;

      const method = taskId ? "PUT" : "POST";

      makeNetworkRequest(apiEndpoint, method, addTaskData, {
        headers: {
          Authorization: `Bearer ${token.access}`,
          "Content-Type": "application/json",
        },
      });

      notification.success({
        message: "Success",
        description: taskId
          ? "Task Updated Successfully"
          : "Task Added Successfully",
        duration: 3,
      });

      setAddTaskData({
        task_title: "",
        task_description: "",
        due_date: "",
        task_type: "",
      });

      resetErrors();

      // Redirect to the appropriate page after adding/updating the task
      if (taskId) {
        navigate(`/batch/${batchId}/module`);
      } else {
        navigate(`/batch/${batchId}/module`);
      }
    }
  };
  return (
 
    <div className="content">
       {loading ? (
      <Skeleton active paragraph={{ rows: 10 }} />
    ) : (
      <>
        <div className="task-add-page">
        <main className="container">
          <div className="inner-container">
            <div className="left-container">
              <div className="page-logo">
                <span className="material-symbols-outlined">check_circle</span>
                <span className="task-txt">Module</span>
              </div>
              <div className="task-name-sec">
                <label htmlFor="task name">Title</label>
                <Input
                  placeholder="Title"
                  name="task_title"
                  value={addTaskData.task_title}
                  onChange={handleChange}
                />
                <p className="error-message">
                  {errors.task_title ? errors.task_title : ""}
                </p>
              </div>
              <div className="task-desc-sec">
                <label htmlFor="task description">Description</label>
                <TextArea
                  rows={4}
                  name="task_description"
                  placeholder="Description"
                  value={addTaskData.task_description}
                  onChange={handleChange}
                />
                <p className="error-message">
                  {errors.task_description ? errors.task_description : ""}
                </p>
              </div>
            </div>
            <div className="right-container">
              <div className="right-contents">
                <div className="due-date-sec">
                  <label htmlFor="due">Due</label>

                  <DatePicker
                    name="due_date"
                    placeholder="Select Date"
                    value={moment(addTaskData.due_date)}
                    onChange={handleDate}
                  />
                  <p className="error-message">
                    {errors.due_date ? errors.due_date : ""}
                  </p>
                </div>
                <div className="due-date-sec">
                  <label htmlFor="due">Task Type</label>
                  <Select
                    value={addTaskData.task_type}
                    style={{
                      width: 120,
                    }}
                    placeholder="Select a person"
                    onChange={handleType}
                    options={[
                      {
                        value: "test",
                        label: "Test",
                      },
                      {
                        value: "assessment",
                        label: "Assessment",
                      },
                    ]}
                  />
                  <p className="error-message">
                    {errors.task_type ? errors.task_type : ""}
                  </p>
                </div>
                <div className="weightage">
                  <label htmlFor="">Weightage</label>
                  <button>
                    <a href="">weightage</a>
                  </button>
                </div>
              </div>
              <div className="btns-div">
                <button className="cancel-btn" onClick={resetErrors}>
                  CANCEL
                </button>
                <button className="assign-btn" onClick={handleTaskAdd}>
                  {taskId ? "UPDATE" : "ASSIGN"}
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
      </>
    )}
     
    </div>
  );
};

export default AddTask;
