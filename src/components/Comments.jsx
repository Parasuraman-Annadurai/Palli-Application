import React from 'react'
import dayjs from 'dayjs';
const Comments = (props) => {
    const { comments,commenterId, role,commentText, setCommentText, isCommentEditId,setIsCommentEditId,handleSendComment ,handleDeleteComment} = props;
    return (
        <>
            <input type="text" value={commentText} placeholder="comments here" style={{ border: "1px solid black", cursor: "pointer" }} onChange={(e) => setCommentText(e.target.value)} />
            <button className="btn primary-medium" onClick={() => handleSendComment(commenterId)}>{isCommentEditId ? "Update" : "Send"}</button>
            <div className="comments-list-container">
                <div>
                    {comments && comments?.map((comment) => {
                        console.log(comment);
                        return (
                            <>
                                <div className="profile-section">
                                    <div className="name">{comment.commentor_details.first_name} ({comment.commentor_details.role})</div>
                                    <div className="date">{dayjs().format("MMMM DD YYYY h:mm A")}</div>
                                </div>
                                <div className="comments">

                                    <p>{comment?.comments}</p>
                                    {comment?.commentor_details?.role == role && (
                                        <>
                                            <img src="/icons/deleteIcon.svg" alt="" style={{ width: "16px" }} onClick={() => handleDeleteComment(comment.id)} />
                                            <img src="/icons/edit-pencil.svg" alt="" style={{ width: "16px" }} onClick={() => {
                                                setIsCommentEditId(comment.id)
                                                setCommentText(comment?.comments)
                                            }} />
                                        </>
                                    )}

                                </div>
                            </>
                        )
                    })}
                </div>


            </div>
        </>
    );
}

export default Comments;
