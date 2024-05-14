import React,{useState} from 'react'
import { Skeleton,Dropdown,Drawer } from 'antd';
import dayjs from "dayjs";
import { getPermission } from '../../utils/validate';
import colorObject from '../../utils/validate';
import Comments from '../CommentsModule/Comments';
import { assessmentMode } from '../../utils/validate';
import { isScoreValidate } from '../../utils/validate';


const StudentEvaluation = (props) => {
    const {studentLoading,assignedUsers,draft,type,isStudentScoreOpen,setIsStudentScoreOpen
    ,setToggleAssigneeWeightage,assginesUsersSeacrh,weightageShow,
    openComments,user,currentAssessment,commentText,isCommentEditId,setIsCommentEditId,setCommentText,handleSendComment,
    handleDeleteComment,
    formErrors,setFormErrors,activeWeightageIndex,setAssignedUsersSearch,setOpenComments,setActiveWeightageIndex,handleAddScore,
    weightageLists,handleScoreOnchange,task_weightages,studentScore,itemRenderer
    } = props
 
    return (
        <main className="main-container" >
            {studentLoading ? <Skeleton active /> : (
                <>
                    <div className="task-heading">
                        <p>{assignedUsers[0]?.task_users?.length ? currentAssessment.task_title : ""}</p>
                        {/* the fetch particular its return one array of object that's why I'm use 0 index hardcoded */}
                        {assignedUsers[0]?.task_users && assignedUsers[0].task_users.length && (
                            <div className="search-container">
                                <input
                                    type="input"
                                    placeholder="Search..."
                                    onChange={(e) => setAssignedUsersSearch(e.target.value)}
                                />
                                <img
                                    src="/icons/searchIcon.svg"
                                    alt="Search icon"
                                    className="search-icon"
                                />
                            </div>
                        )}
                    </div>
                    {assignedUsers?.map((taskAssignedUsers,key) => {
                        const filteredUsers = taskAssignedUsers?.task_users?.filter((student) => {
                            // Customize this condition according to your search requirements
                            return (
                                student.user_details.first_name.toLowerCase().includes(assginesUsersSeacrh.toLowerCase()) ||
                                student.user_details.last_name.toLowerCase().includes(assginesUsersSeacrh.toLowerCase()) ||
                                student.user_details.email.toLowerCase().includes(assginesUsersSeacrh.toLowerCase())
                            );
                        });
                        return (
                            <>
                                <div className="task-main-container" key={key}>
                                    {taskAssignedUsers?.task_users?.length ? (
                                        <>
                                            {filteredUsers?.map((students, index) => {
                                                return (
                                                    <>

                                                        <div className="task-container" key={index} >
                                                            <div className="task-user-list-container flex" key={index}>
                                                                <div className="student-info flex">
                                                                    <div className="student-name-container">
                                                                        <p>
                                                                            {students["user_details"][
                                                                                "first_name"
                                                                            ][0]?.toUpperCase()}
                                                                            {students["user_details"][
                                                                                "last_name"
                                                                            ][0]?.toUpperCase()}
                                                                        </p>
                                                                    </div>
                                                                    <div className="student-email-container">
                                                                        <p className="student-name">
                                                                            {students.user_details.first_name}{" "}
                                                                            {students.user_details.last_name}
                                                                        </p>
                                                                        <p className="student-email">
                                                                            {students.user_details.email}
                                                                        </p>{" "}
                                                                    </div>
                                                                </div>
                                                                <div className="student-status">
                                                                    <p>Status</p>
                                                                    <span
                                                                        style={{
                                                                            backgroundColor:
                                                                                colorObject[students?.task_status]
                                                                                    ?.backgroundColor,
                                                                            color: colorObject[students?.task_status]?.color,
                                                                        }}
                                                                    >
                                                                        {students?.task_status}
                                                                    </span>{" "}
                                                                </div>
                                                                <div className="sumbitted-date">
                                                                    <p>Deadline</p>
                                                                    <span>
                                                                        {dayjs(students["task"]["due_date"]).format(
                                                                            "MMMM, DD YYYY"
                                                                        )}
                                                                    </span>
                                                                </div>
                                                                <div className="student-file">
                                                                    <p>Submission Link</p>
                                                                    <p>
                                                                        {students["submission_link"] !== null ? (
                                                                            <a
                                                                                href={`${students["submission_link"]}`}
                                                                                target="_blank"
                                                                            >
                                                                                {students["submission_link"]}
                                                                            </a>
                                                                        ) : (
                                                                            "N/A"
                                                                        )}
                                                                    </p>
                                                                </div>
                                                                <div className="student-comment">
                                                                    <img
                                                                        src="/icons/comment-fill.svg"
                                                                        onClick={() => setOpenComments(students.id)}
                                                                        alt="comment-icon"
                                                                        onMouseOver={(e) => {
                                                                            e.target.src = "/icons/comment-fill-hover.svg";
                                                                        }}
                                                                        onMouseOut={(e) => {
                                                                            e.target.src = "/icons/comment-fill.svg";
                                                                        }}
                                                                    />
                                                                </div>
                                                                <div className="student-work">

                                                                    {weightageShow
                                                                        ? students["task_status"] === "SUBMITTED" && (
                                                                            <>
                                                                                {getPermission(user.permissions, "TaskScore", "create") && (
                                                                                    <button
                                                                                        className="secondary-btn-sm"
                                                                                        onClick={(e) => {
                                                                                            e.stopPropagation()
                                                                                            setActiveWeightageIndex(index);
                                                                                            if (activeWeightageIndex === index) {
                                                                                                if (isScoreValidate(task_weightages, studentScore, setFormErrors)) {
                                                                                                    handleAddScore(studentScore);
                                                                                                }
                                                                                            }
                                                                                        }}
                                                                                    >
                                                                                        {activeWeightageIndex === index
                                                                                            ? "Submit"
                                                                                            : " Add Score"}
                                                                                    </button>
                                                                                )}

                                                                            </>

                                                                        )
                                                                        : students["task_status"] === "SUBMITTED" && (
                                                                            <>
                                                                                {getPermission(user.permissions, "TaskScore", "create") && (
                                                                                    <Dropdown
                                                                                        className="secondary-btn-sm"
                                                                                        menu={{ items: itemRenderer(students.id) }}
                                                                                        placement="bottomLeft"
                                                                                        trigger={["click"]}
                                                                                    >
                                                                                        <button
                                                                                            className="ant-dropdown-link secondary-btn-sm"
                                                                                            onClick={(e) => {
                                                                                                e.preventDefault();
                                                                                            }}
                                                                                        >
                                                                                            Take action
                                                                                        </button>
                                                                                    </Dropdown>
                                                                                )}
                                                                            </>
                                                                        )}
                                                                </div>
                                                            </div>
                                                            {/* this modal open comment section for Admin  for functionality purpose*/}

                                                            <Drawer
                                                                title={<div style={{ fontWeight: 500, fontSize: "16px", fontFamily: "Roboto" }}>Comments</div>}
                                                                onClose={() => {
                                                                    setOpenComments(null)
                                                                    setCommentText("")
                                                                    setIsCommentEditId(null)
                                                                }}
                                                                open={openComments !== null}
                                                            >
                                                                {getPermission(user.permissions, "TaskComments", "read") && (
                                                                    <Comments
                                                                        comments={
                                                                            currentAssessment?.task_users?.find(
                                                                                (student) => student.id === openComments
                                                                            )?.comments || []
                                                                        }
                                                                        role={"Admin"}
                                                                        commenterId={openComments}
                                                                        commentText={commentText}
                                                                        isCommentEditId={isCommentEditId}
                                                                        setIsCommentEditId={setIsCommentEditId}
                                                                        setCommentText={setCommentText}
                                                                        handleSendComment={handleSendComment}
                                                                        handleDeleteComment={handleDeleteComment}
                                                                        commentErrors={formErrors}
                                                                        setCommentsErrors={setFormErrors}
                                                                    />
                                                                )}

                                                            </Drawer>

                                                            {activeWeightageIndex === index && (
                                                                <>
                                                                    <div
                                                                        className="applied-weightage-list-container flex"
                                                                        style={{ gap: "10px" }}
                                                                    >
                                                                        {currentAssessment.task_weightages &&
                                                                            currentAssessment.task_weightages.map(
                                                                                (weightage, weightageIndex) => (
                                                                                    <div
                                                                                        key={weightageIndex}
                                                                                        className="applied-weightage-card flex"
                                                                                    >
                                                                                        <div className="applied-weightage-name">
                                                                                            <p>
                                                                                                {weightageLists &&
                                                                                                    weightageLists.length &&
                                                                                                    (() => {
                                                                                                        const foundWeightage =
                                                                                                            weightageLists.find(
                                                                                                                (weightageName) =>
                                                                                                                    weightageName.id ===
                                                                                                                    weightage.weightage
                                                                                                            );

                                                                                                        return (
                                                                                                            foundWeightage && (
                                                                                                                <>
                                                                                                                    <p>
                                                                                                                        {foundWeightage.weightage}{" "}
                                                                                                                        {Number(
                                                                                                                            weightage.weightage_percentage
                                                                                                                        )}
                                                                                                                    </p>
                                                                                                                </>
                                                                                                            )
                                                                                                        );
                                                                                                    })()}
                                                                                            </p>
                                                                                        </div>

                                                                                        <div className="weightage-checkbox">
                                                                                            <input
                                                                                                type="number"
                                                                                                name="score"
                                                                                                onChange={(e) => {
                                                                                                    handleScoreOnchange(
                                                                                                        e,
                                                                                                        students,
                                                                                                        weightage
                                                                                                    );
                                                                                                }}
                                                                                            />
                                                                                        </div>
                                                                                    </div>
                                                                                )
                                                                            )}
                                                                    </div>
                                                                    <p className="error-message">
                                                                        {formErrors["score"]
                                                                            ? formErrors["score"]
                                                                            : ""}
                                                                    </p>
                                                                </>
                                                            )}
                                                        </div>

                                                    </>
                                                )
                                            })}
                                            {!filteredUsers?.length && (
                                                <div className="select-something-container flex">
                                                    <div className="image-container ">
                                                        <img src="/icons/select-something.svg" alt="" />
                                                        <p className="select-something-heading">
                                                            No search results found
                                                        </p>
                                                    </div>
                                                </div>
                                            )}
                                        </>
                                    ) : (
                                        <>
                                            {!draft && (
                                                <div className="select-something-container flex">
                                                    <div className="image-container ">
                                                        <img src="/icons/select-something.svg" alt="" />
                                                        <p className="select-something-heading">
                                                            No Assignee has been assigned to this {type?.charAt(0)?.toUpperCase()}{type?.slice(1).toLowerCase()}
                                                            <button className="btn primary-medium" style={{ marginTop: "10px" }} onClick={() => {
                                                                setIsStudentScoreOpen(!isStudentScoreOpen)
                                                                if (type != assessmentMode) {
                                                                    setToggleAssigneeWeightage(1)
                                                                } else {
                                                                    setToggleAssigneeWeightage(0)
                                                                }
                                                                setIsStudentScoreOpen(false)
                                                            }}>Add Assignee</button>
                                                        </p>
                                                    </div>
                                                </div>
                                            )}
                                        </>
                                    )}
                                </div>

                            </>
                        )
                    })}
                </>
            )}
        </main>
    );
}

export default StudentEvaluation;