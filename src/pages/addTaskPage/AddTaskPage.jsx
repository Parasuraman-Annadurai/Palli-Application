import React, { useEffect } from "react";
import "./AddTaskPage.css";
import { useState } from "react";
import { notification, Input, DatePicker, Button, Select } from "antd";
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

  const [selectedStudents, setSelectedStudents] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const [addTaskData, setAddTaskData] = useState({
    task_title: "",
    task_description: "",
    due_date: "",
    task_type: 0,
  });

  useEffect(() => {
    // Fetch task details for editing if taskId is present
    if (taskId) {
      makeNetworkRequest(
        `${API_END_POINT}/api/task/${batchId}/get/task/${taskId}`,
        "GET",
        null,
      );
    }
  }, [taskId]);

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
      const apiEndpoint = taskId
        ? `${API_END_POINT}/api/task/${batchId}/update_task/${taskId}`
        : `${API_END_POINT}/api/task/${batchId}/create_task/`;

      const method = taskId ? "PUT" : "POST";

      makeNetworkRequest(apiEndpoint, method, addTaskData);

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
  useEffect(() => {
    if (data && data.data) {
      const { task_title, task_description, due_date, task_type } = data.data;
      console.log(task_type);
      setAddTaskData({
        task_title,
        task_description,
        due_date,
        task_type,
      });
    }
  }, [data]);
  console.log(addTaskData);

  // useEffect(() => {
  //   makeNetworkRequest(
  //     `${API_END_POINT}/api/applicant/140/list/students/`,
  //     "GET",
  //     null,
  //     {
  //       headers: {
  //         Authorization: `Bearer ${token.access}`,
  //       },
  //     }
  //   );
  // }, []);




  // const renderOptions = () => {
  //   const options = [
  //     <Option key="all"  onChange={handleSelectAllChange} checked={selectAll}>
  //       All
  //     </Option>,
  //   ];
  
  //   if (data && data.data) {
  //     options.push(
  //       ...data.data.map((student) => (
  //         <Option key={student.id} value={student.id}>
  //            {student.first_name}{student.last_name}
  //         </Option>
  //       ))
  //     );
  //   }
  
  //   return options;
  // };
  console.log(selectAll);
  return (
    <div className="content">
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
                    value={taskId && moment(addTaskData.due_date)}
                    onChange={handleDate}
                  />
                  <p className="error-message">
                    {errors.due_date ? errors.due_date : ""}
                  </p>
                </div>
                <div className="due-date-sec">
                  <label htmlFor="due">Task Type</label>
                  <Select
                    value={addTaskData.task_type === 0 ? "Task" : "Assessment"}
                    style={{
                      width: 120,
                    }}
                    placeholder="Select a person"
                    name="task_type"
                    onChange={handleType}
                    options={[
                      {
                        value: 0,
                        label: "Tesk",
                      },
                      {
                        value: 1,
                        label: "Assessment",
                      },
                    ]}
                  />
                  <p className="error-message">
                    {errors.task_type ? errors.task_type : ""}
                  </p>
                </div>
                <div className="to">
                  <label htmlFor="">Assign to</label>
                  {/* <Select
                    mode="multiple"
                    style={{ width: 200, marginRight: 16 }}
                    placeholder="Select a section"
                    value={selectedStudents}
                    onChange={handleStudentSelect}
                  >
                    {renderOptions()}
                  </Select> */}
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
                  {taskId ? "UPDATE" : "SUMBIT"}
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
