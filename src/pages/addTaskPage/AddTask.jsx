import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  notification,
  Select,
  Skeleton,
  Menu,
  Dropdown,
  Checkbox,
  DatePicker,
  TimePicker,
  Input,
  Button,
} from "antd";
import axios from "axios";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
dayjs.extend(utc);
dayjs.extend(timezone);

import { useForm, Controller } from "react-hook-form";

import { useAuth } from "../../context/AuthContext";

import { API_END_POINT } from "../../../config";

import "./AddTask.css";

const AddTask = () => {
  const navigate = useNavigate();
  const { taskId } = useParams();
  const { token } = useAuth();
  const { id: batchId } = useParams();
  const [studentList, setStudentList] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [selectAll, setSelectAll] = useState(true);
  const [weightageList, setWeightageList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectValues, setSelectValues] = useState([{}]);


  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

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
        setValue(
          "selectedStudents",
          selectAll ? studentList.map((student) => student.id) : []
        );

        if (taskDetails) {
          const { task_title, task_description, due_date, task_type } =
            taskDetails;

          const parsedDate = dayjs.utc(due_date);
          const formattedDate = parsedDate.format("YYYY-MM-DD");
          const formattedTime = parsedDate.format("HH:mm:ss");

          setValue("task_title", task_title);
          setValue("task_description", task_description);
          setValue("task_type", task_type === 0 ? "task" : "assessment");
          setValue("date", dayjs(formattedDate, "YYYY-MM-DD"));
          setValue("time", dayjs(formattedTime, "HH:mm:ss"));
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

  useEffect(() => {
    const headers = {
      Authorization: `Bearer ${token.access}`,
      "Content-type": "application/json",
    };

    axios
      .get(`${API_END_POINT}/api/task/${batchId}/list/weightage`, { headers })
      .then((res) => {
        setWeightageList(res.data.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);
  const handleSelectAllChange = (e) => {
    e.stopPropagation();
    const checked = e.target.checked;
    setSelectAll(checked);
    setSelectedStudents(
      checked ? studentList.map((student) => student.id) : []
    );
  };

  const handleStudentSelect = (value) => {
    setSelectedStudents(value);
    setSelectAll(false);
  };
  const handleTaskAdd = async (formData) => {

    const requests = selectValues.map( (item) => {
      const headers = {
        Authorization : `Bearer ${token.access}`,
        "Content-type" : "application/json"
      }
      const { weightage, weightage_percentage } = item;
      const endpoint = `${API_END_POINT}/api/task/${batchId}/assign/task_weightage/117`;

      const response =  axios.post(`${endpoint}`, {
        weightage,
        weightage_percentage,
      },{headers});

      return response.data;
    });

    console.log(requests);
    const {
      task_title,
      task_description,
      task_type,
      date,
      time,
      selectedStudents,
    } = formData;

    const parsedDate = dayjs(date);
    const parseTime = dayjs(time);

    // Format the date and time
    const formattedDate = parsedDate.format("YYYY-MM-DD");
    const formattedTime = parseTime.format("HH:mm:ss");

    const formattedData = {
      task_title,
      task_description,
      task_type: task_type === "task" ? 0 : 1,
      due_date: `${formattedDate} ${formattedTime}`,
    };

    const apiEndpoint = taskId
      ? `${API_END_POINT}/api/task/${batchId}/update_task/${taskId}`
      : `${API_END_POINT}/api/task/${batchId}/create_task/`;

    const method = taskId ? "PUT" : "POST";
    try {
      await axios({
        method,
        url: apiEndpoint,
        headers: {
          Authorization: `Bearer ${token.access}`,
          "Content-Type": "application/json",
        },
        data: formattedData,
      });

      notification.success({
        message: "Success",
        description: taskId
          ? "Task Updated Successfully"
          : "Task Added Successfully",
        duration: 3,
      });

      navigate(`/batch/${batchId}/module`);
    } catch (error) {
      console.error("Error:", error);
    }
  };


  const dropdownMenu = (
    <Menu onClick={(e) => e.stopPropagation()}>
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
          value={selectedStudents}
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
    navigate(`/batch/${batchId}/module`);
  };
  const handleAddSelect = () => {
    setSelectValues([...selectValues, { weightage: '', weightage_percentage: 0 }]);
  };
  const handleWeightageChange = (value, index) => {
    const updatedValues = [...selectValues];
    updatedValues[index].weightage = value;
    setSelectValues(updatedValues);
  };

  const handleInputChange = (event, index) => {
    const { value } = event.target;
    const updatedValues = [...selectValues];
    updatedValues[index].weightage_percentage = Number(value);
    setSelectValues(updatedValues);
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
                    <Controller
                      name="task_title"
                      control={control}
                      defaultValue=""
                      rules={{
                        required: "Task title is required",
                        maxLength: {
                          value: 50,
                          message: "Task title must not exceed 50 characters",
                        },
                      }}
                      render={({ field }) => (
                        <input placeholder="Title..." {...field} />
                      )}
                    />
                    <p className="error-message">
                      {errors.task_title && errors.task_title.message}
                    </p>
                  </div>
                  <div className="task-desc-sec">
                    <label htmlFor="task description">Description</label>
                    <Controller
                      name="task_description"
                      control={control}
                      defaultValue=""
                      rules={{
                        required: "Description is required",
                        maxLength: {
                          value: 200,
                          message: "Description must not exceed 200 characters",
                        },
                      }}
                      render={({ field }) => (
                        <textarea placeholder="Description..." {...field} />
                      )}
                    />
                    <p className="error-message">
                      {errors.task_description &&
                        errors.task_description.message}
                    </p>
                  </div>
                </div>
                <div className="right-container">
                  <div className="right-contents">
                    <div className="students">
                      <label htmlFor="students">Students</label>
                      <Controller
                        name="selectedStudents"
                        control={control}
                        defaultValue={[]}
                        render={({ field }) => (
                          <Dropdown
                            overlay={dropdownMenu}
                            trigger={["click"]}
                            className="ant-dropdown-link"
                            onClick={(e) => e.stopPropagation()}
                            {...field}
                          >
                            <a>
                              {studentList.length === selectedStudents.length
                                ? "All Students Selected"
                                : `${
                                    selectedStudents.length === 0
                                      ? "Select students"
                                      : `${selectedStudents.length} Selected`
                                  }`}
                            </a>
                          </Dropdown>
                        )}
                      />
                      <p className="error-message">
                        {errors.selectedStudents &&
                          errors.selectedStudents.message}
                      </p>
                    </div>
                    <div className="due-time-sec">
                      <label htmlFor="due">Due Date</label>
                      <Controller
                        name="date"
                        control={control}
                        defaultValue={null}
                        rules={{ required: "Date is required" }}
                        render={({ field }) => (
                          <DatePicker
                            format="YYYY-MM-DD"
                            placeholder="Select Date"
                            {...field}
                          />
                        )}
                      />
                      <p className="error-message">
                        {errors.date && errors.date.message}{" "}
                      </p>
                    </div>
                    <div className="due-time-sec">
                      <label htmlFor="due">Due Time</label>
                      <Controller
                        name="time"
                        control={control}
                        defaultValue={null}
                        rules={{ required: "Time is required" }}
                        render={({ field }) => (
                          <TimePicker {...field} format="HH:mm:ss" />
                        )}
                      />
                      <p className="error-message">
                        {errors.time && errors.time.message}
                      </p>
                    </div>
                    <div className="due-date-sec">
                      <label htmlFor="due">Task Type</label>
                      <Controller
                        name="task_type"
                        control={control}
                        defaultValue=""
                        rules={{ required: "Please select an option" }}
                        render={({ field }) => (
                          <Select
                            {...field}
                            placeholder="Select an option"
                            className="type-picker"
                          >
                            <Option value="" disabled>
                              Select an option
                            </Option>
                            <Option value="task">Task</Option>
                            <Option value="assessment">Assessment</Option>
                          </Select>
                        )}
                      />
                      <p className="error-message" data>
                        {errors.task_type && errors.task_type.message}
                      </p>
                    </div>

                    <div>
                      <label htmlFor="">Weightage</label>
                      {selectValues.map((select, index) => (
                        <div className="list-weightage" key={index}>
                          <Select
                            style={{ width: 300, marginRight: "8px" }}
                            placeholder={"select"}
                            value={select.weightage}
                            onChange={(value) =>
                              handleWeightageChange(value, index)
                            }
                          >
                            {weightageList.map((weightage, weightageIndex) => (
                              <Select.Option
                                key={weightageIndex}
                                value={weightage.id}
                              >
                                {weightage.weightage}
                              </Select.Option>
                            ))}
                          </Select> 
                          <Input
                            className="weightage-input"
                            placeholder="Enter value"
                            style={{ marginRight: "8px" }}
                            onChange={(e) => handleInputChange(e, index)}
                          />
                          {index === selectValues.length - 1 && (
                            <Button type="primary" onClick={handleAddSelect}>
                              + Add
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="btns-div">
                    <button
                      className="cancel-btn"
                      onClick={() => handleCancel()}
                    >
                      CANCEL
                    </button>
                    <button
                      className="assign-btn"
                      onClick={handleSubmit(handleTaskAdd)}
                    >
                      {taskId ? "UPDATE" : "SUBMIT"}
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
