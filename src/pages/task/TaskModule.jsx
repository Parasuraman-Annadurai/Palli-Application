import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import axios from "axios";

import { API_END_POINT } from "../../../config";

import TaskList from "../../components/TaskList";
import TaskView from "../../components/TaskView";
import { Modal, notification } from "antd";

const TaskModule = () => {
  const { id: batchId } = useParams();
  const { token } = useAuth();
  const [editId, setEditId] = useState("");

  const activateEditMode = (id) => {
    setEditId(id);
  };

  const deactivateEditMode = () => {
    setEditId("");
  };


  const handleDelete = (deleteId) => {

    Modal.warning({
      title: "Success",
      content: "Task Deleted Successfully...",
      okButtonProps: {
        style: { background: "#49a843", borderColor: "#EAEAEA" },
      },

      onOk: () => {
        axios
          .delete(
            `${API_END_POINT}/api/task/${batchId}/delete_task/${deleteId}`,
            {
              headers: {
                Authorization: `Bearer ${token.access}`,
              },
            }
          )
          .then((res) => {
            notification.success({
              message: "Success",
              description: "Task Deleted Successfully",
              duration: 3,
            });

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
        title={"Task"}
        filterType={0}
        limit={5}
        onEditClick={activateEditMode}
        onEditModeChange={deactivateEditMode}
        handleDelete={handleDelete}
        filterShow={false}
      />
      <TaskView type={"task"} editId={editId} />
    </>
  );
};

export default TaskModule;
