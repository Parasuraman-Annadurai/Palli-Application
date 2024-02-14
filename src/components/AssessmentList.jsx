import React from "react";

import { Skeleton } from "antd";

import dayjs from "dayjs";

import { getPermission } from "../utils/validate";


import { useAuth } from "../context/AuthContext";


const TaskCard = ({
  loading,
  assessment,
  selectedAssessment,
  handleEdit,
  handleDelete,
  setIsStudentScoreOpen,
  isMode,
  setIsMode,
  currentAssessment
}) => {
  const truncateText = (text, maxLength) => {
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };
  const {user} = useAuth();
  return (
    <>
      <div
        className={`task-card ${
          assessment.id === selectedAssessment ? "active" : ""
        } flex`}
        key={assessment.id}
        id={assessment.id}
        onClick={() => {
          if(currentAssessment.draft){
            setIsStudentScoreOpen(false)
            handleEdit(assessment.id);
            setIsMode("edit")
          }else{
          setIsStudentScoreOpen(true)
          handleEdit(assessment.id);
          setIsMode("card")
        }
        }}
      >
        {loading ? (
          <Skeleton avatar={{ size: "small" }} active paragraph={{ rows: 1 }} />
        ) : (
          <>
            <div className="task-icon flex">
              <span>JS</span>
            </div>

            <div className="task-details">
              <div className="task-name-with-icon flex">
                <h2>{truncateText(assessment.task_title, 15)}</h2>
                <>
                    {getPermission(user.permissions, "Task", "update") && (
                  <img
                        src={selectedAssessment === assessment.id && isMode == "edit" ? "/icons/edit-pencil-fill.svg" : "/icons/edit-pencil.svg"}
                        className="edit-icon"
                        alt="edit-icon"
                        onClick={(event) => {
                          event.stopPropagation();
                          setIsStudentScoreOpen(false)
                          handleEdit(assessment.id);
                          setIsMode("edit")
                        }}
                      />
                    )}

                  {getPermission(user.permissions,"Task","delete") && (
                  //    <img
                  //    src="/icons/deleteIcon.svg"
                  //    alt="delete-icon"
                  //    className="delete-icon"
                  //    id={assessment.id}
                  //    onClick={(e) => {
                  //      handleDelete(assessment.id);
                  //      e.stopPropagation();
                  //    }}
                  //  />

                  <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      style={{alignItems:"center", justifyContent:""}}
                      onMouseOver={(e) => {
                        e.target.style.fill = "#C13939";
                      }}
                      onMouseOut={(e) => {
                        e.target.style.fill = "#EF4444";
                      }}
                      xmlns="http://www.w3.org/2000/svg"
                      className="delete-icon"
                      id={assessment.id}
                      onClick={(e) => {
                        handleDelete(assessment.id);
                        e.stopPropagation();
                      }}
                    >
                      <path
                        d="M6.5 7L6.5 11C6.5 11.2761 6.72386 11.5 7 11.5C7.27614 11.5 7.5 11.2761 7.5 11L7.5 7C7.5 6.72386 7.27614 6.5 7 6.5C6.72386 6.5 6.5 6.72386 6.5 7ZM9 6.5C9.27614 6.5 9.5 6.72386 9.5 7V11C9.5 11.2761 9.27614 11.5 9 11.5C8.72386 11.5 8.5 11.2761 8.5 11V7C8.5 6.72386 8.72386 6.5 9 6.5ZM10 4H13C13.2761 4 13.5 4.22386 13.5 4.5C13.5 4.77614 13.2761 5 13 5H12.4475L11.6946 11.7761C11.5539 13.0422 10.4838 14 9.20991 14H6.79008C5.51621 14 4.44605 13.0422 4.30537 11.7761L3.55247 5H3C2.72386 5 2.5 4.77614 2.5 4.5C2.5 4.22386 2.72386 4 3 4H6C6 2.89543 6.89543 2 8 2C9.10457 2 10 2.89543 10 4ZM8 3C7.44772 3 7 3.44772 7 4H9C9 3.44772 8.55229 3 8 3ZM4.55863 5L5.29925 11.6656C5.38366 12.4253 6.02575 13 6.79008 13H9.20991C9.97423 13 10.6163 12.4253 10.7007 11.6656L11.4414 5H4.55863Z"
                        fill="#EF4444"
                      />
                    </svg>
                  )}
                 
                </>
              </div>
              <p className="task-description">
                {truncateText(
                  assessment.task_description.replace(/<[^>]*>/g, ""),
                  60
                )}
              </p>
              <span className="btn btn-deadline">
                {dayjs(assessment.due_date).format("MMM,DD YYYY")}
              </span>
            </div>
          </>
        )}
      </div>
    </>
  );
};

const AssessmentList = ({
  mode,
  filterShow,
  handleEdit,
  assessmentList,
  setAssessmentSearchWord,
  loading,
  handleDelete,
  handleAdd,
  selectedAssessment,
  isStudentScoreOpen,
  setIsStudentScoreOpen,
  isMode,
  setIsMode,
  currentAssessment
}) => {
  const { user } = useAuth();

  return (
    <>
      <section className="listing-container">
        <h1>{mode} list</h1>
        <div className="search-container">
          <input
            type="input"
            placeholder="search..."
            onChange={(e) => setAssessmentSearchWord(e.target.value)}
          />{" "}
          <img
            src="/icons/searchIcon.svg"
            alt="search-icon"
            className="search-icon"
          />
          {filterShow && (
            <img
              src="/icons/filterIcon.svg"
              alt="filter-icon"
              className="filter-icon"
            />
          )}
        </div>
        <div className="create-container">
          {getPermission(user.permissions, "Task", "create") && (
            <button className="btn create-btn" onClick={handleAdd}>
              <span>+</span>Create {mode}
            </button>
          )}

        </div>
        <div className="task-list-container">
          {assessmentList &&
            assessmentList.map((assessment) => (
              <TaskCard
                key={assessment.id}
                loading={loading}
                assessment={assessment}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                selectedAssessment={selectedAssessment}
                setIsStudentScoreOpen={setIsStudentScoreOpen}
                isStudentScoreOpen={isStudentScoreOpen}
                isMode={isMode}
                setIsMode={setIsMode}
                currentAssessment={currentAssessment}
              />
            ))}
        </div>
      </section>
    </>
  );
};

export default AssessmentList;
