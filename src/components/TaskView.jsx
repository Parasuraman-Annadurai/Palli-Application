import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import {
  notification,
  DatePicker,
  Checkbox,
  Menu,
  Dropdown,
  Button,
  Skeleton,
} from "antd";
import { useForm, Controller } from "react-hook-form";
import ReactQuill, { Quill } from "react-quill";
import axios from "axios";
import dayjs from "dayjs";

import WeightageList from "./WeightageList";

import { useAuth } from "../context/AuthContext";

import { API_END_POINT } from "../../config";

import "quill/dist/quill.snow.css";
import Title from "antd/es/skeleton/Title";

const TaskView = ({
  editId,
  type,
  weightageShow,
  handleUpdateOrAdd,
  currentTask,
  students,
  setSelectedStudents,
  selectedStudents,
  handleSave,
}) => {
  const { id: batchId } = useParams();

  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    setError,
    clearErrors,
    getValues,
    setValue,
    formState: { errors },
  } = useForm();


  // Destructure the current task
  const { task_title, task_description, due_date, draft , id } = currentTask[0] || {};

  useEffect(()=>{
    // console.log(currentTask);

    if(currentTask.length > 0){
      setValue("Title",task_title);
      setValue("Description",task_description);
      setValue("Deadline",dayjs(due_date));
    }
    else{
      setValue("Title","");
      setValue("Description","");
      setValue("Deadline","");
    }

   

  },[currentTask])

 

  

  const validateNotEmpty = (fieldName, value) => {
    const trimmedValue = value ? value.replace(/<[^>]*>/g, "").trim() : null;
    return trimmedValue ? null : `${fieldName} is required`;
  };

 

  const CustomIcons = () => {
    const icons = Quill.import("ui/icons");

    icons.bold = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 12 12" fill="none">
      <path d="M3 2H7C7.53043 2 8.03914 2.21071 8.41421 2.58579C8.78929 2.96086 9 3.46957 9 4C9 4.53043 8.78929 5.03914 8.41421 5.41421C8.03914 5.78929 7.53043 6 7 6H3V2Z" stroke="#969D88" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M3 6H7.5C8.03043 6 8.53914 6.21071 8.91421 6.58579C9.28929 6.96086 9.5 7.46957 9.5 8C9.5 8.53043 9.28929 9.03914 8.91421 9.41421C8.53914 9.78929 8.03043 10 7.5 10H3V6Z" stroke="#969D88" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`;
    icons.italic = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 12 12" fill="none">
    <path d="M9.5 2H5" stroke="#969D88" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M7 10H2.5" stroke="#969D88" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M7.5 2L4.5 10" stroke="#969D88" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;
    icons.underline = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 12 12" fill="none">
  <path d="M3 1.5V5C3 5.79565 3.31607 6.55871 3.87868 7.12132C4.44129 7.68393 5.20435 8 6 8C6.79565 8 7.55871 7.68393 8.12132 7.12132C8.68393 6.55871 9 5.79565 9 5V1.5" stroke="#969D88" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M2 10.5H10" stroke="#969D88" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;

    icons.alignLeft = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 12 12" fill="none">
  <path d="M8.5 5H1.5" stroke="#969D88" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M10.5 3H1.5" stroke="#969D88" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M10.5 7H1.5" stroke="#969D88" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M8.5 9H1.5" stroke="#969D88" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
    icons.alignCenter = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 12 12" fill="none">
     <path d="M9 5H3" stroke="#969D88" stroke-linecap="round" stroke-linejoin="round"/>
     <path d="M10.5 3H1.5" stroke="#969D88" stroke-linecap="round" stroke-linejoin="round"/>
     <path d="M10.5 7H1.5" stroke="#969D88" stroke-linecap="round" stroke-linejoin="round"/>
     <path d="M9 9H3" stroke="#969D88" stroke-linecap="round" stroke-linejoin="round"/>
   </svg>`;
    icons.alignRight = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 12 12" fill="none">
      <path d="M10.5 5H3.5" stroke="#969D88" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M10.5 3H1.5" stroke="#969D88" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M10.5 7H1.5" stroke="#969D88" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M10.5 9H3.5" stroke="#969D88" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`;
    icons.alignJustify = `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 10 8" fill="none">
    <path d="M9.5 3H0.5" stroke="#969D88" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M9.5 1H0.5" stroke="#969D88" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M9.5 5H0.5" stroke="#969D88" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M9.5 7H0.5" stroke="#969D88" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;
    return null; // This component doesn't render anything
  };

  const handleCheckboxChange = (studentId) => {
    const isSelected = selectedStudents.includes(studentId);

    if (isSelected) {
      setSelectedStudents(selectedStudents.filter((id) => id !== studentId));
    } else {
      setSelectedStudents([...selectedStudents, studentId]);
    }
  };

  const handleAllCheckboxChange = () => {
    const allSelected = students.every((student) =>
      selectedStudents.includes(student.id)
    );
    if (allSelected) {
      setSelectedStudents([]);
    } else {
      const allStudentIds = students.map((student) => student.id);
      setSelectedStudents(allStudentIds);
    }
  };

  const menu = (
    <Menu>
      <Menu.Item key="selectAll">
        <Checkbox
          id="selectAll"
          checked={selectedStudents.length === students.length}
          onChange={handleAllCheckboxChange}
        >
          {selectedStudents.length === students.length
            ? "Deselect All"
            : "Select All"}
        </Checkbox>
      </Menu.Item>
      {students.map((student) => (
        <Menu.Item key={student.id}>
          <Checkbox
            id={`student${student.id}`}
            checked={selectedStudents.includes(student.id)}
            onChange={() => handleCheckboxChange(student.id)}
          >
            {student.first_name} {student.last_name}
          </Checkbox>
        </Menu.Item>
      ))}
    </Menu>
  );

  const handleValidate =(formData)=>{

    //if student not assign show the error
    if (selectedStudents.length === 0) {
      setError("assignee", {
        type: "manual",
        message: "Assignee is required",
      });
      return;
    }

  
    handleSave(formData,draft);

    reset({
      Title: "",
      Description: "",
      Deadline: null,
      SubmissionLink: "",
    });
    
  }

  return (
    <>
      <main className="main-container">
        {loading ? (
          <Skeleton active paragraph={4} />
        ) : (
          <form onSubmit={handleSubmit(handleValidate)}>
            <div className="module-header-section-container">
              <div className="module-header-section flex">
                <div className="module-title-section flex">
                  <Controller
                    name="Title"
                    control={control}
                    rules={{
                      validate: (value) => validateNotEmpty("Title", value),
                    }}
                    render={({ field }) => (
                      <>
                        <input
                          {...field}
                          style={{
                            width: field.value
                              ? `${field.value.length * 8}px`
                              : "56px",
                          }}
                          type="text"
                          placeholder={"Untitled"}
                          className={`task-title ${
                            errors.Title ? "error-notify" : ""
                          } `}
                          readOnly={!isEditing}
                          onFocus={true}
                          onBlur={() => setIsEditing(false)}
                          onKeyUp={(e) => {
                            if (
                              e.key === "Enter" &&
                              field.value.trim() === ""
                            ) {
                              setValue("Title", "Untitled");
                            }
                          }}
                        />
                      </>
                    )}
                  />

                  {!isEditing && (
                    <img
                      src="/icons/edit-pencil.svg"
                      alt=""
                      onClick={() => setIsEditing(true)}
                      style={{ cursor: "pointer" }}
                    />
                  )}

                  {isEditing && (
                    <div>
                      <button
                        onClick={() => setIsEditing(false)}
                        className="yes-btn"
                      >
                        Yes
                      </button>
                      <button
                        className="no-btn"
                        onClick={() => {
                          setValue("Title", getValues("Title"));
                          setIsEditing(false);
                        }}
                      >
                        No
                      </button>
                    </div>
                  )}
                </div>

                <div className="task-create">
                  <button type="submit" className="btn primary-medium">
                    {draft ? "Create" : "Update"}
                  </button>
                </div>
              </div>
              <p className="error-message">
                {errors.Title ? errors.Title.message : ""}
              </p>
            </div>

            <div className="task-details-header-container">
              <div className="task-label-container flex">
                <h4>Task Details</h4>
                <div className="horizon-line"></div>
              </div>

              <div className="task-details-main-container flex">
                <div className="task-deadline-container common-property">
                  <p className="task-deadline-label">Deadline</p>

                  <Controller
                    name="Deadline"
                    control={control}
                    rules={{ required: "Deadline is required" }}
                    render={({ field }) => (
                      <>
                        <DatePicker
                          {...field}
                          showTime={{ format: "HH:mm:ss" }}
                          placeholder="Select here..."
                          format="YYYY-MM-DD HH:mm:ss"
                          className={`datepicker ${
                            errors.Deadline
                              ? "error-notify"
                              : "task-deadline-selector"
                          }`}
                          suffixIcon={<img src={`/icons/calendorIcon.svg`} />}
                        />
                        <p className="error-message">
                          {errors.Deadline ? errors.Deadline.message : ""}
                        </p>
                      </>
                    )}
                  />
                </div>

                <div className="task-assigner-container">
                  <p className="task-assigner-label">Assignee</p>
                  <Controller
                    name="assignee"
                    control={control}
                    render={({ field }) => (
                      <Dropdown overlay={menu} trigger={["click"]}>
                        <span
                          className={`task-assigner-selector  ${
                            errors.assignee ? "error-notify" : ""
                          }`}
                        >
                          {selectedStudents.length === students.length
                            ? `All Students`
                            : `${
                                selectedStudents.length === 0
                                  ? "Select Students"
                                  : `${selectedStudents.length} Student`
                              }`}
                          <img src="/icons/dropdown.svg" alt="" />
                        </span>
                      </Dropdown>
                    )}
                  />
                  <p className="error-message">
                    {errors.assignee ? errors.assignee.message : ""}
                  </p>
                </div>
              </div>

              <div className="task-editor-container">
                <p className="task-description-label">Description</p>
                <div className="task-editor">
                  <Controller
                    name="Description"
                    control={control}
                    rules={{
                      validate: (value) =>
                        validateNotEmpty("Description", value),
                    }}
                    render={({ field }) => (
                      <>
                        <CustomIcons />
                        <ReactQuill
                          placeholder="Type here"
                          {...field}
                          className={errors.Description ? "error-notify" : ""}
                          modules={{
                            toolbar: {
                              container: [
                                [{ header: [1, 2, false] }],
                                ["bold", "italic", "underline"],
                                [
                                  "alignLeft",
                                  "alignCenter",
                                  "alignRight",
                                  "alignJustify",
                                ],
                              ],
                            },
                          }}
                          formats={[
                            "header",
                            "bold",
                            "italic",
                            "underline",
                            "list",
                            "bullet",
                            "alignLeft",
                            "alignCenter",
                            "alignRight",
                            "alignJustify",
                          ]}
                          theme="snow"
                        />
                        <p className="error-message">
                          {errors.Description ? errors.Description.message : ""}
                        </p>
                      </>
                    )}
                  />
                </div>
              </div>

              <div className="submission-folder-link-container">
                <Controller
                  control={control}
                  name="SubmissionLink"
                  rules={{
                    validate: (value) =>
                      validateNotEmpty("SubmissionLink", value),
                  }}
                  render={({ field }) => (
                    <>
                      <input
                        {...field}
                        className={`task-submission-link ${
                          errors.SubmissionLink ? "error-notify" : ""
                        }`}
                        type="link"
                        placeholder="Paste your link here..."
                      />
                      <p className="error-message">
                        {errors.SubmissionLink
                          ? errors.SubmissionLink.message
                          : ""}
                      </p>
                    </>
                  )}
                />
              </div>

              <div>
                <div className="file-input-container">
                  <div className="upload-icon-container flex">
                    <img src="/icons/upload.svg" className="upload-icon" />
                    <p>
                      Drag your file or
                      <span className="highlight">click to upload</span>
                    </p>
                  </div>
                  <Controller
                    name="fileInput"
                    control={control}
                    render={({ field }) => (
                      <>
                        <input
                          {...field}
                          type="file"
                          className="file-input"
                          onChange={(e) =>
                            setValue("fileInput", e.target.value)
                          }
                        />
                      </>
                    )}
                  />
                </div>
                {weightageShow && <WeightageList />}
              </div>
            </div>
          </form>
        )}
      </main>
    </>
  );
};

export default TaskView;
