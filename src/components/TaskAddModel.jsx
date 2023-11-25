import React from "react";
import { useState } from "react";
import { Modal, Tabs } from "antd";
import TabPane from "antd/es/tabs/TabPane";
import { validateAddTask } from "../utils/validate";

const TaskAddModal = ({ isVisible, handleCancel }) => {
  const [uploadMode, setUploadMode] = useState("link");
  const [errors, setErrors] = useState({});
  const handleModeChange = (key) => {
    setUploadMode(key);
  };

  const [addTaskData, setAddTaskData] = useState({
    taskTitile: "",
    taskDescription: "",
    taskDueDate: "",
    taskLink: "",
    taskType: "",
  });
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddTaskData({ ...addTaskData, [name]: value });
    if(errors[name])delete errors[name];
  };
  
  const handleTaskAdd =()=>{
    let isVaildTask = validateAddTask(addTaskData,setErrors);
    if(isVaildTask){
      //make API call for store the task
    }
  }
  const resetErrors = () => {
    handleCancel();
    setErrors({});
  };
  return (
    <Modal
      title="Add Task"
      open={isVisible}
      onCancel={resetErrors}
      footer={null}
      width={1200}
      centered
      style={{ height: '100vh' }}
    >
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
                  name="taskTitile"
                  value={addTaskData.taskTitile}
                  onChange={handleChange}
                />
                <p className="error-message">
                  {errors.taskTitile ? errors.taskTitile : ""}
                </p>
              </div>
              <div className="task-desc-sec">
                <label htmlFor="task description">Task Description</label>
                <textarea
                  value={addTaskData.taskDescription}
                  onChange={handleChange}
                  name="taskDescription"
                  placeholder="Type something here..."
                />
                <p className="error-message">
                  {errors.taskDescription ? errors.taskDescription : ""}
                </p>
              </div>
              {/* <div className="file-attach-sec">
                <label htmlFor="file attach">Attach File</label>
                <div className="file-upload-cont">
                  <div className="upload">
                    <span className="material-symbols-outlined">backup</span>
                    <p htmlFor="file upload">Upload</p>
                  </div>
                  <span className="or">OR</span>
                  <div className="link">
                    <span className="material-symbols-outlined">link</span>
                    <p htmlFor="file link">link</p>
                  </div>
                </div>
              </div> */}
              <div className="file-attach-sec">
                <label htmlFor="file attach">Attach File</label>
                <Tabs activeKey={uploadMode} onChange={handleModeChange}>
                  <TabPane tab="Upload" key="upload">
                    <div className="file-upload-cont">
                      <div className="upload">
                        <span className="material-symbols-outlined">
                          backup
                        </span>
                        <p htmlFor="file upload">Upload</p>
                      </div>
                    </div>
                  </TabPane>
                  <TabPane tab="Link" key="link">
                    <div className="file-upload-cont">
                      <div className="link">
                        <span className="material-symbols-outlined">link</span>
                      </div>
                      {/* Show paste link area */}
                      <input
                        type="text"
                        placeholder="Paste link here"
                        name="taskLink"
                        value={addTaskData.taskLink}
                        onChange={handleChange}
                      />
                    </div>
                    <p className="error-message">
                      {errors.taskLink ? errors.taskLink : ""}
                    </p>
                  </TabPane>
                </Tabs>
              </div>
            </div>
            <div className="right-container">
              <div className="right-contents">
                {/* <div className="batch-selection-sec">
                  <label htmlFor="select batch">For</label>
                  <input type="text" placeholder="Batch-1 students" />
                </div> */}
                <div className="due-date-sec">
                  <label htmlFor="due">Due</label>
                  <input
                    type="date"
                    placeholder="due date"
                    name="taskDueDate"
                    value={addTaskData.taskDueDate}
                    onChange={handleChange}
                  />
                  <p className="error-message">
                    {errors.taskDueDate ? errors.taskDueDate : ""}
                  </p>
                </div>
                <div className="due-date-sec">
                  <label htmlFor="due">Task Type</label>
                  <select
                    name="taskType"
                    id=""
                    className="task-type"
                    value={addTaskData.taskType}
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
                    {errors.taskType ? errors.taskType : ""}
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
                  ASSIGN
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </Modal>
  );
};

export default TaskAddModal;
