import React from "react";
import dayjs from "dayjs";

import { useAuth } from "../../context/AuthContext";

import "./scss/Comments.css";
import { getPermission } from "../../utils/validate";
const Comments = (props) => {
  const {
    comments,
    commenterId,
    role,
    commentText,
    setCommentText,
    isCommentEditId,
    setIsCommentEditId,
    handleSendComment,
    handleDeleteComment,
  } = props;

  const { user } = useAuth()

  return (
    <>
      {/* <button className="btn primary-medium" 
            onClick={() => handleSendComment(commenterId)}>{isCommentEditId ? "Update" : "Send"}
            </button> */}
      <div className="comments-list-container">
        <div>
          {comments?.length > 0 ? (
            <>
                {comments &&
            comments?.map((comment, index) => {
              return (
                <>
                  <div className="comments-main-container" key={index}>
                    <div className="comments-section flex">
                      <div className="profile-image flex">GG</div>

                      <div className="user-detail flex">
                        <div className="name">
                          {comment.commentor_details.first_name} (
                          {comment.commentor_details.role})
                          <div className="comment-date">
                            {dayjs().format("MMMM DD YYYY h:mm A")}
                          </div>
                        </div>
                        <div className="icons">
                          {getPermission(user.permissions,"TaskComments","update") && (
                             <img
                             src="/icons/edit-pencil.svg"
                             alt=""
                             onClick={() => {
                               setIsCommentEditId(comment.id);
                               setCommentText(comment?.comments);
                             }}
                           />
                          )}
                          {getPermission(user.permissions,"TaskComments","delete")&&(
                            <img
                            src="/icons/deleteIcon.svg"
                            alt=""
                            onClick={() => handleDeleteComment(comment.id)}
                          />
                          )}
                          
                        </div>
                      </div>
                    </div>
                    <div className="comments">
                      <p>{comment?.comments}</p>
                      {comment?.commentor_details?.role == role && <></>}
                    </div>
                  </div>
                </>
              );
            })}
            </>
          ) : (
            <>
              <div className="no-comments-container">
                <img src="/icons/no-data.svg" alt="" />
                {/* Ganesh change inline style to scss */}
                <p style={{textAlign:"center"}}>No comments here...</p>
              </div>
            </>
          )}
        
        </div>
      </div>
      {getPermission(user.permissions, "TaskComments", "create") && (
        <div className="Input-send">
          <div className="input-wrapper">
            <div className="send">
              <img
                src="/icons/Send.svg"
                alt="Send-icon"
                onClick={() => handleSendComment(commenterId)}
              />
            </div>
          </div>

          <textarea
            type="text"
            value={commentText}
            placeholder="Write a comment..."
            onChange={(e) => setCommentText(e.target.value)}
          />
        </div>
      )}

    </>
  );
};

export default Comments;
