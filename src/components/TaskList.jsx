import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import { Skeleton } from "antd";

import { useAuth } from "../context/AuthContext";
import { API_END_POINT } from "../../config";
const TaskList = ({
  title,
  limit,
  filterType,
  filterShow,
  onEditClick,
  handleDelete,
  onEditModeChange,
}) => {
  const { id: batchId } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();
  const [taskLists, setTaskLists] = useState({ data: [] });
  const [taskSearchWord, setTaskSearchWord] = useState("");
  const [loading, setLoading] = useState(true);

  const headers = {
    Authorization: `Bearer ${token.access}`,
    "Content-type": "application/json",
  };

  useEffect(() => {
    setLoading(true);
    const url = `${API_END_POINT}/api/task/${batchId}/list_task/?limit=${limit}&page=1&filter_task_type=${filterType}&sort_key=&sort_order=&search=${taskSearchWord}`;
    axios
      .get(url, { headers })
      .then((res) => {
        if (res.status === 200 && res.data.message === "Success") {
          setTaskLists(res.data);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [taskSearchWord]);

  const TaskCard = ({ task }) => {
    const truncateText = (text, maxLength) => {
      return text.length > maxLength
        ? text.substring(0, maxLength) + "..."
        : text;
    };
    return (
      <>
        <div className="task-card active flex" key={task.id} id={task.id}>
          {loading ? (
            <Skeleton
              avatar={{ size: "small" }}
              active
              paragraph={{ rows: 1 }}
            />
          ) : (
            <>
              <div className="task-icon flex">
                <span>JS</span>
              </div>

              <div className="task-details">
                <div className="task-name-with-icon flex">
                  <h2>{truncateText(task.task_title, 15)}</h2>

                   <>
                   <img
                      src="/icons/edit-pencil.svg"
                      alt="edit-icon"
                      className="edit-icon"
                      id={task.id}
                      onClick={() => onEditClick(task.id)}
                    />
                      <img
                      src="/icons/deleteIcon.svg"
                      alt=""
                      
                      id={task.id}
                      onClick={() => handleDelete(task.id)}
                    />
                   </>
                    {/* <img src="/icons/deleteIcon.svg" alt="" onClick={()=>handleDelete(task.id)}/> */}
                </div>
                <p className="task-description">
                  {truncateText(
                    task.task_description.replace(/<[^>]*>/g, ""),
                    50
                  )}
                </p>
                <span className="btn btn-inprogress">Inprogress</span>
                <span className="btn btn-deadline">Dec 25 2023</span>
              </div>
            </>
          )}
        </div>
      </>
    );
  };

  return (
    <>
      <section className="listing-container">
        <h1>{title} list</h1>
        <div className="search-container">
          <input
            type="input"
            placeholder="search..."
            onChange={(e) => setTaskSearchWord(e.target.value)}
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
          <button className="btn create-btn" onClick={onEditModeChange}>
            <span>+</span>Create {title}
          </button>
        </div>
        <div className="task-list-container">
          {taskLists.data.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      </section>
    </>
  );
};

export default TaskList;
