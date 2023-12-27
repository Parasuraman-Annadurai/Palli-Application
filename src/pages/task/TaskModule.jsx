import React, { useState, useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { Modal, notification } from "antd";
import axios from "axios";

import TaskList from "../../components/TaskList";
import TaskView from "../../components/TaskView";

import { useAuth } from "../../context/AuthContext";

import { API_END_POINT } from "../../../config";

const TaskModule = () => {
  const { token } = useAuth();
  const { id: batchId } = useParams();
  const [editId, setEditId] = useState("");
  const [taskLists, setTaskLists] = useState({ data: [] });
  const [taskSearchWord, setTaskSearchWord] = useState("");
  const [loading, setLoading] = useState(true);

  const headers = {
    Authorization: `Bearer ${token.access}`,
    "Content-type": "application/json",
  };
  useEffect(() => {
    //this useEffect used to fetch task list and will re-run whenever filter or search is updated
    const url = `${API_END_POINT}/api/task/${batchId}/list_task/?limit=5&page=1&filter_task_type=0&search=${taskSearchWord}`;
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

  const handleDelete = (deleteTaskId) => {
    const updateTask = taskLists.data.filter(
      (task) => task.id !== deleteTaskId
    );

    Modal.warning({
      title: "Success",
      content: "Task Deleted Successfully...",
      okButtonProps: {
        style: { background: "#49a843", borderColor: "#EAEAEA" },
      },

      onOk: () => {
        axios
          .delete(
            `${API_END_POINT}/api/task/${batchId}/delete_task/${deleteTaskId}`,
            {
              headers: {
                Authorization: `Bearer ${token.access}`,
              },
            }
          )
          .then((res) => {
            notification.success({
              message: "Success",
              description: `Task Deleted Successfully`,
              duration: 3,
            });
            setTaskLists({ data: updateTask });
          })
          .catch((error) => {
            console.log(error);
          });
      },
    });
  };

  return (
    <>
      <TaskList
        //this mode used create task or assessment
        mode={"Task"}
        onEditClick={setEditId}
        onEditModeChange={setEditId}
        taskLists={taskLists}
        setTaskSearchWord={setTaskSearchWord}
        loading={loading}
        filterShow={false}
        handleDelete={handleDelete}
      />
      <TaskView
        type={"task"}
        editId={editId}
      />
    </>
  );
};

export default TaskModule;
