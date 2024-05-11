import React from 'react'

import dayjs from "dayjs";
import { DatePicker } from 'antd';

import ReactQuill from "react-quill";
import "quill/dist/quill.snow.css";

import { toolbarConfig,getPermission, validateTask} from '../utils/validate';

import { LoadingOutlined } from "@ant-design/icons";

export default function AssessmentCreation(props) {

  const {task_title,formErrors,due_date,task_description,draft,currentAssessment,user,assigneeloader,
    isAssessmentLoading,setFormErrors,handleSave,handleInputChange,handleRemoveFile
  } = props
  return (
    <>
         <section className="main-container">
              <>
                <div className="module-header-section-container">
                  <div className="module-header-section flex">
                    <div className="module-title-section grid">
                      <input
                        value={task_title ? task_title : ""}
                        name="task_title"
                        type="text"
                        onChange={(e) =>
                          handleInputChange("task_title", e.target.value)
                        }
                        placeholder={"Untitled"}
                        className={` ${
                          formErrors["task_title"] ? "error-notify" : ""
                        } `}
                      />
                      
                    </div>
                  </div>
                  <p className="error-message title-message">
                    {formErrors["task_title"] ? formErrors["task_title"] : ""}
                  </p>
                </div>
                <div className="task-details-header-container">
                  <div className="task-label-container flex">
                    <h4>Task Details </h4>
                    <div className="horizon-line"></div>
                  </div>
                  <div className="task-details-main-container flex">
                    <div className="task-deadline-container common-property">
                      <p className="task-deadline-label">Deadline <span>*</span></p>
                      <DatePicker
                        prefixCls={`${
                          formErrors["due_date"] ? "error-notify" : ""
                        }`}
                        value={due_date ? dayjs(due_date) : null}
                        showTime={{ format: "HH:mm" }}
                        placeholder="Select here..."
                        format="YYYY-MM-DD HH:mm"
                        onChange={(date, dateString) =>
                          handleInputChange("due_date", dateString)
                        }
                        suffixIcon={<img src={`/icons/calendorIcon.svg`} />}
                        disabledDate={(current) =>
                          current && current < dayjs().startOf("day")
                        }
                      />
                      <p className="error-message">
                        {formErrors["due_date"] ? formErrors["due_date"] : ""}
                      </p>
                    </div>
                  </div>
                  <div className="task-editor-container">
                    <p className="task-description-label">Description <span>*</span></p>
                    <div className="task-editor">
                      <>
                        <ReactQuill
                          placeholder="Type here"
                          className={`${
                            formErrors["task_description"] ? "react-quill error-notify" : "react-quill"
                          }`}
                          value={task_description ? task_description : ""}
                          modules={toolbarConfig}
                          theme="snow"
                          onChange={(value) =>
                            handleInputChange("task_description", value)
                          }
                        />
                        <p className="error-message">
                          {formErrors["task_description"]
                            ? formErrors["task_description"]
                            : ""}
                        </p>
                      </>
                    </div>
                  </div>
                <div className="student-task-label-container flex">
                  <h3>Task File</h3>
                  <div className="horizon-line">
                  </div>
                </div>
                {currentAssessment?.supporting_document && (
                  <div className="student-task-file-container flex">
                    <div className="file-content-container flex">
                      <img src="/icons/fileicon.svg" alt="" />
                      <div className="file-details">
                        {!currentAssessment?.supporting_document?.name && <a href={currentAssessment?.supporting_document} target="_blank">view document</a>}
                        {currentAssessment?.supporting_document?.name && <p>{currentAssessment?.supporting_document?.name}</p>}
                        {currentAssessment?.supporting_document?.size && <span>File size  {formatFileSize(currentAssessment?.supporting_document?.size)}</span>}
                      </div>
                    </div>
                    <div className="file-download flex">
                      {currentAssessment?.supporting_document?.name && <img src="/icons/Cancel.svg" alt="" onClick={handleRemoveFile} />}
                    </div>
                  </div>
                )}

                <div className="file-input-container">
                  <div className="upload-icon-container flex">
                    <img src="/icons/upload.svg" className="upload-icon" />
                    <label for="file-input"
                    >Drag your file or
                      <span className="highlight"> click to upload your task</span></label
                    >
                  </div>
                  <input type="file" className="file-input" onChange={(e) => handleInputChange("supporting_document", e.target.files[0])} />
                </div>
                  <div className="task-create-btn-section flex">
                    <div className="main-create-btn">
                        {getPermission(user.permissions, "Task", "create") && (
                          <button
                            type="submit"
                            className={`${assigneeloader
                              ? "btn primary-medium-default"
                              : "btn primary-medium"
                              }`}
                            onClick={() => !assigneeloader && validateTask(currentAssessment, setFormErrors) ? handleSave(currentAssessment) : null}
                            disabled={isAssessmentLoading}
                          >
                        {isAssessmentLoading ? (
                          <span>
                            {draft ? "Creating" : "Updating"}
                            <LoadingOutlined className="loader" />
                          </span>
                        ) : (
                          draft ? "Create" : "Update"
                        )}
                          </button>
                        )}
                    </div>
                  </div>
                </div>
              </>
          </section>
    </>
  )
}
