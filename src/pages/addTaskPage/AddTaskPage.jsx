import React from "react";
import "./AddTaskPage.css"
import { useState } from "react";
import {notification } from "antd";
import { validateAddTask } from "../../utils/validate";
import { API_END_POINT } from "../../../config";
import { useAuth } from "../../context/AuthContext";
import useAPI from "../../hooks/useAPI";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const AddTask = () => {
    const navigate = useNavigate()
    const {data,loading,error,makeNetworkRequest} = useAPI();
    const {token} = useAuth();
    const {id:batchId} = useParams();
    const [uploadMode, setUploadMode] = useState("link");
    const [errors, setErrors] = useState({});
    const handleModeChange = (key) => {
      setUploadMode(key);
    };
    const [addTaskData, setAddTaskData] = useState({
      task_title: "",
      task_description: "",
      due_date: "",
      task_type: "",
    });
  
   
    const handleChange = (e) => {
      const { name, value } = e.target;
      setAddTaskData({ ...addTaskData, [name]: value });
      if(errors[name])delete errors[name];
    };
    
    
    const resetErrors = () => {
      setErrors({});
      
    };
    
    const handleTaskAdd =()=>{
      let isVaildTask = validateAddTask(addTaskData,setErrors);
      if(isVaildTask){
        //make API call for store the task
        makeNetworkRequest(`${API_END_POINT}/api/task/${batchId}/create_task/`,'POST',addTaskData,{
          headers:{
            Authorization: `Bearer ${token.access}`,
            "Content-Type": "application/json"
          }
        })
        
      
        notification.success({
          message: 'Success',
          description: "Task Add Successfully",
          duration: 3, 
        });
        setAddTaskData({
          task_title: "",
          task_description: "",
          due_date: "",
          task_type: "",
        });
        resetErrors();
        navigate(`/batch/${batchId}/module`);
      }
     
    }

  return (
    <div className="content">
       <div className="task-add-page">
      <main className="container">
        <div className="inner-container">
          <div className="left-container">
            <div className="page-logo">
              <span className="material-symbols-outlined">check_circle</span>
              <span className="task-txt">TASKS</span>
            </div>
            <div className="task-name-sec">
              <label htmlFor="task name">Task Name</label>
              <input
                type="text"
                placeholder="Enter the task title "
                name="task_title"
                value={addTaskData.task_title}
                onChange={handleChange}
              />
              <p className="error-message">
                {errors.task_title ? errors.task_title : ""}
              </p>
            </div>
            <div className="task-desc-sec">
              <label htmlFor="task description">Task Description</label>
              <textarea
                value={addTaskData.task_description}
                onChange={handleChange}
                name="task_description"
                placeholder="Type something here..."
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

                <input
                  type="date"
                  placeholder="due date"
                  name="due_date"
                  value={addTaskData.due_date}
                  onChange={handleChange}
                />
                <p className="error-message">
                  {errors.due_date ? errors.due_date : ""}
                </p>
              </div>
              <div className="due-date-sec">
                <label htmlFor="due">Task Type</label>
                <select
                  name="task_type"
                  id=""
                  className="task-type"
                  value={addTaskData.task_type}
                  onChange={handleChange}
                  placeholder="select task type"
                >
                  <option value="" disabled hidden>
                    Select an task type
                  </option>
                  <option value="task">Task</option>
                  <option value="assessment">Assessment</option>
                </select>
                <p className="error-message">
                  {errors.task_type ? errors.task_type : ""}
                </p>
              </div>
              <div className="weightage">
                <label htmlFor="">Weightage</label>
                <button>
                  <a href={`/batch/${batchId}/add/task/weightage`}>weightage</a>
                </button>
              </div>
            </div>
            <div className="btns-div">
              <button className="cancel-btn" onClick={resetErrors}>
                CANCEL
              </button>
              <button className="assign-btn" onClick={handleTaskAdd}>
                ASSIGN
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
    </div>
  );
};

export default AddTask;
