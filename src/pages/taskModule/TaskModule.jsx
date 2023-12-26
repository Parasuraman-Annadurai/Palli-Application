import React, { useState } from "react";

import TaskList from "../../components/TaskList";
import TaskView from "../../components/TaskView";

import { useAuth } from "../../context/AuthContext";

const TaskModule = () => {
  const { token } = useAuth();
  const headers = {
    Authorization: `Bearer ${token.access}`,
    "Content-type": "application/json",
  };

  const [editId, setEditId] = useState("");

  const activateEditMode = (id) => {
    setEditId(id);
  };

  const deactivateEditMode = () => {
    setEditId("")
  };

  return (
    <>
      {/* <TaskList onEditClick={activateEditMode} onEditModeChange={deactivateEditMode}/>
      <TaskView editId={editId}  /> */}
    </>
  );
};

export default TaskModule;
