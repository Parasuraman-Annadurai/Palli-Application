import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

//external packages
import {
  notification,
  Select,
  Skeleton,
  Menu,
  Dropdown,
  Checkbox,
  DatePicker,
  TimePicker,
} from "antd";
import axios from "axios";
import moment from "moment";
import dayjs from "dayjs";
import 'dayjs/locale/en'; // Import the desired locale
import utc from "dayjs/plugin/utc"; // Import the utc plugin
dayjs.locale('en'); // Set the locale


//custom hook paste here
import useForm from "../../hooks/useForm";

//context paste here
import { useAuth } from "../../context/AuthContext";
//API endpoint here
import { API_END_POINT } from "../../../config";

//supporting utilits here
import { validateAddTask } from "../../utils/validate";
//css here
import "./AddTask.css";
const AddTask = () => {
  dayjs.extend(utc);
  const navigate = useNavigate();
  const { taskId } = useParams();
  const { token } = useAuth();
  const { id: batchId } = useParams();
  const initialState = {
    task_title: "",
    task_description: "",
    due_date: null,
    task_type: 0,
  };
  const [studentList, setStudentList] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [selectAll, setSelectAll] = useState(true);
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const { formData, errors, setErrors, handleChange, resetForm, setFormData } =
    useForm(initialState);

  const handleType = (taskType) => {
    handleChange({
      target: { name: "task_type", value: taskType === "task" ? 0 : 1 },
    });
  };
  useEffect(() => {
    setLoading(true);

    const headers = {
      Authorization: `Bearer ${token.access}`,
      "Content-type": "application/json",
    };

    // Initialize variables for task details and student list requests
    let fetchTaskDetails;
    const fetchStudentList = axios.get(
      `${API_END_POINT}/api/applicant/${batchId}/list/students/`,
      { headers }
    );

    // Conditionally fetch task details if taskId is truthy
    if (taskId) {
      fetchTaskDetails = axios.get(
        `${API_END_POINT}/api/task/${batchId}/get/task/${taskId}`,
        { headers }
      );
    }

    Promise.all([fetchTaskDetails, fetchStudentList])
      .then(([taskDetailsRes, studentListRes]) => {
        setLoading(true);
        const taskDetails = taskDetailsRes ? taskDetailsRes.data.data : null;
        const studentList = studentListRes.data
          ? studentListRes?.data?.data
          : [];
        setStudentList(studentList);
        setSelectedStudents(
          selectAll ? studentList.map((student) => student.id) : []
        );

        if (taskDetails) {
          const { task_title, task_description, due_date, task_type } =
            taskDetails;

          // Parse the dueDate string using dayjs with UTC
          const parsedDate = dayjs.utc(due_date);
          parsedDate.locale('en');
          // Get the formatted date and time
          const formattedDate = parsedDate.format("YYYY-MM-DD");
          const formattedTime = parsedDate.format("HH:mm:ss");

          setSelectedDate(dayjs(formattedDate, "YYYY-MM-DD"));
        setSelectedTime(dayjs(formattedTime, "HH:mm:ss"));


          setFormData({
            task_title,
            task_description,
            task_type,
            // due_date,
          });
        }
      })
      .catch((error) => {
        // Handle errors
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [taskId, batchId, token]);
  const handleSelectAllChange = (e) => {
    e.stopPropagation();
    setSelectAll(e.target.checked);
    setSelectedStudents(
      e.target.checked ? studentList.map((student) => student.id) : []
    );
  };

  const handleStudentSelect = (value) => {
    setSelectedStudents(value);
    setSelectAll(false);
  };
  const handleTaskAdd = async () => {
    const isVaild = validateAddTask(formData, setErrors);

    if (isVaild) {
      const apiEndpoint = taskId
        ? `${API_END_POINT}/api/task/${batchId}/update_task/${taskId}`
        : `${API_END_POINT}/api/task/${batchId}/create_task/`;

      const method = taskId ? "PUT" : "POST";
      try {
        await axios({
          method,
          url: apiEndpoint,
          headers: {
            Authorization: `Bearer ${token.access}`, // Include your authentication token
            "Content-Type": "application/json",
          },
          data: formData,
        });

        notification.success({
          message: "Success",
          description: taskId
            ? "Task Updated Successfully"
            : "Task Added Successfully",
          duration: 3,
        });

        navigate(`/batch/${batchId}/module`);

        resetForm();
      } catch (error) {
        console.error("Error:", error);
        // Handle error notification or other logic
      }
    }
  };

  const dropdownMenu = (
    <Menu>
      <Menu.Item key="selectAll">
        <Checkbox onChange={handleSelectAllChange} checked={selectAll}>
          Select All
        </Checkbox>
      </Menu.Item>

      <Menu.Divider />
      <Menu.Item key="students">
        <Select
          mode="multiple"
          placeholder="Select students"
          style={{ minWidth: "200px" }}
          value={
            selectAll
              ? studentList.map((student) => student.id)
              : selectedStudents
          }
          onChange={handleStudentSelect}
        >
          {studentList && [
            ...studentList.map((student) => (
              <Select.Option key={student.id} value={student.id}>
                {`${student.first_name} ${student.last_name}`}
              </Select.Option>
            )),
          ]}
        </Select>
      </Menu.Item>
    </Menu>
  );
  const handleCancel = () => {
    resetForm();
    navigate(`/batch/${batchId}/module`);
  };

  const handleDateChange = (date, dateString) => {
    setSelectedDate(date);
    handleChange({ target: { name: "due_date", value: dateString } });
  };

  const handleTimeChange = (time, timeString) => {
    setSelectedTime(time);
    const formattedTime = timeString ? `T${timeString}` : ""; // Add time if it exists
    handleChange({
      target: {
        name: "due_date",
        value: `${selectedDate.format("YYYY-MM-DD")}${formattedTime}`,
      },
    });
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
                    <span className="material-symbols-outlined">
                      check_circle
                    </span>
                    <span className="task-txt">Module</span>
                  </div>
                  <div className="task-name-sec">
                    <label htmlFor="task name">Title</label>
                    <input
                      placeholder="Title"
                      name="task_title"
                      value={formData.task_title}
                      onChange={handleChange}
                    />
                    <p className="error-message">
                      {errors.task_title ? errors.task_title : ""}
                    </p>
                  </div>
                  <div className="task-desc-sec">
                    <label htmlFor="task description">Description</label>
                    <textarea
                      rows={4}
                      name="task_description"
                      placeholder="Description"
                      value={formData.task_description}
                      onChange={handleChange}
                    />
                    <p className="error-message">
                      {errors.task_description ? errors.task_description : ""}
                    </p>
                  </div>
                </div>
                <div className="right-container">
                  <div className="right-contents">
                    <div className="students">
                      <label htmlFor="students">Students</label>
                      <Dropdown
                        overlay={dropdownMenu}
                        trigger={["click"]}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <a
                          className="ant-dropdown-link"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                          }}
                        >
                          {studentList.length === selectedStudents.length
                            ? "All Students Selected"
                            : `${
                                selectedStudents.length === 0
                                  ? "Select students"
                                  : `${selectedStudents.length} Selected`
                              }`}
                        </a>
                      </Dropdown>
                      <p className="error-message"></p>
                    </div>
                    <div className="due-date-sec">
                      <label htmlFor="due">Due Date</label>
                      <DatePicker
                        format="YYYY-MM-DD"
                        placeholder="Select Date"
                        value={selectedDate}
                        onChange={handleDateChange}
                      />

                      {selectedDate && (
                        <>
                          <label htmlFor="due">Due Time</label>
                          <TimePicker
                            format="HH:mm:ss"
                            placeholder="Select Time"
                            value={selectedTime}
                            onChange={handleTimeChange}
                          />
                        </>
                      )}
                      <p className="error-message">
                        {errors.due_date ? errors.due_date : ""}
                      </p>
                    </div>
                    <div className="due-date-sec">
                      <label htmlFor="due">Task Type</label>
                      <Select
                        name="task_type"
                        className="type-picker"
                        value={formData.task_type === 0 ? "task" : "assessment"}
                        placeholder="Select a task type"
                        onChange={handleType}
                        options={[
                          {
                            value: "task",
                            label: "Task",
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
                        <a href={`/batch/${batchId}/module/add/task/weightage`}>
                          Weightage
                        </a>
                      </button>
                    </div>
                  </div>
                  <div className="btns-div">
                    <button
                      className="cancel-btn"
                      onClick={() => handleCancel()}
                    >
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
        </>
      )}
    </div>
  );
};

export default AddTask;
