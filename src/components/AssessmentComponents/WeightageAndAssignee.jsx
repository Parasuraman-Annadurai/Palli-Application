import React from 'react';
import { getPermission } from '../../utils/validate';
import { Skeleton } from 'antd';

import WeightageList from './WeightageList/WeightageList';
function WeightageAndAssignee(props) {

  const { draft, user, assigneeloader, toggleAssigneeWeightage, weightageShow, weightageLists, taskId, task_weightages,
    handleSaveWeightage, handleAddWeightage, handleWeightageChange, handleDeleteWeightage, selectedStudents, weightageErrors, setWeightageErros, setToggleAssigneeWeightage,
    isAssigneeLoading, students,setAssigneeSearch,handleAllCheckboxChange,handleCheckboxChange,assigneLoadingMessage
  } = props

  console.log('====================================');
  console.log(weightageShow);
  console.log('====================================');
  return (
    <>
      {!draft && (
        <>
          {getPermission(user.permissions, "TaskWeightage", "create") || getPermission(user.permissions, "TaskUser", "create") ? (
            <section className="assignee-and-weightage-container">
              {assigneeloader ? (
                <>
                  <Skeleton active={true} />
                  <p style={{ fontFamily: "roboto", fontSize: "16px", paddingTop: "15px" }}>{assigneLoadingMessage}</p>
                </>

              ) : (
                <>
                  <div className={`title-section flex`}>
                    <div
                      className={`weightage-title selection ${toggleAssigneeWeightage === 1 ? "active" : ""
                        }`}
                    >
                      {weightageShow && (
                        <h4
                          onClick={() => setToggleAssigneeWeightage(1)}
                          className={
                            toggleAssigneeWeightage === 1 ? "active" : ""
                          }
                        >
                          Weightage
                        </h4>
                      )}
                    </div>
                    {getPermission(user.permissions, "TaskUser", "create") && (
                      <div
                        className={`assignee-title selection ${toggleAssigneeWeightage === 0 ? "active" : ""
                          }`}
                      >
                        <h4
                          onClick={() => setToggleAssigneeWeightage(0)}
                          className={
                            toggleAssigneeWeightage === 0 ? "active" : ""
                          }
                        >
                          Assignee
                        </h4>
                      </div>
                    )}

                  </div>
                  {toggleAssigneeWeightage === 0 ? (
                    <>
                      {getPermission(user.permissions, "TaskUser", "create") && (
                        <>
                          <div className="assign-listing-container">
                            <div className="assignee-search-container">
                              <input type="input" placeholder="search..." onChange={(e) => setAssigneeSearch(e.target.value)} />
                              <img
                                src="/icons/searchIcon.svg"
                                alt="search-icon"
                                className="search-icon"
                              />


                            </div>
                            {isAssigneeLoading ? <Skeleton active paragraph={4} /> : (
                              <>
                                {students?.length ? (
                                  <>
                                    <div className="select-all flex">
                                      <input
                                        className="global-checkbox"
                                        type="checkbox"
                                        onChange={handleAllCheckboxChange}
                                        checked={selectedStudents.length == students.length}
                                      />
                                      <span>
                                        {selectedStudents.length === students.length
                                          ? "All Students Assigned"
                                          : !selectedStudents.length
                                            ? "Assign All Students"
                                            : `${selectedStudents.length} student Assigned`}
                                      </span>
                                    </div>
                                    <div className="assignee-card-listing-container">
                                      {students.map((student) => {
                                        return (
                                          <div
                                            className="individual-assignee-card flex"
                                            key={student.id}
                                          >
                                            <input
                                              className="student-checkbox "
                                              type="checkbox"
                                              onChange={() =>
                                                handleCheckboxChange(student.id)
                                              }
                                              checked={selectedStudents.includes(
                                                student.id
                                              )}
                                            />
                                            <div className="profile flex">
                                              <div className="profile-letter">
                                                <span>
                                                  {student?.first_name[0]}
                                                  {student?.last_name[0]}
                                                </span>
                                              </div>
                                              <div className="assignee-name">
                                                <p>
                                                  {student.first_name} {student.last_name}
                                                </p>
                                              </div>
                                            </div>
                                          </div>
                                        );
                                      })}
                                    </div>
                                  </>
                                ) : (
                                  <div className="select-something-container flex">
                                    <div className="image-container ">
                                      <img src="/icons/select-something.svg" alt="" />
                                      <p className="select-something-heading">
                                        No students Available in this batch

                                      </p>
                                    </div>
                                  </div>
                                )}

                              </>
                            )}
                          </div>

                        </>

                      )}
                    </>
                  ) : (
                    weightageShow && (
                      <WeightageList
                        taskId={taskId}
                        taskWeightages={task_weightages}
                        handleSaveWeightage={handleSaveWeightage}
                        handleAddWeightage={handleAddWeightage}
                        handleWeightageChange={handleWeightageChange}
                        handleDeleteWeightage={handleDeleteWeightage}
                        weightages={weightageLists}
                        selectedStudents={selectedStudents}
                        weightageErrors={weightageErrors}
                        setWeightageErros={setWeightageErros}
                      />
                    )
                  )}
                </>
              )}
            </section>
          ) : null}
        </>
      )}
    </>
  );
}

export default WeightageAndAssignee;