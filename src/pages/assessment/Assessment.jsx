import React, { useState, useEffect } from "react";

import TaskList from "../../components/TaskList";
import TaskView from "../../components/TaskView";
const AssessmentModule = () => {
  const [editId, setEditId] = useState("");

  const activateEditMode = (id) => {
    setEditId(id);
  };

  const deactivateEditMode = () => {
    setEditId("");
  };
  return (
    <>
      <TaskList
        title={"Assessment"}
        filterType={0}
        limit={5}
        onEditClick={activateEditMode}
        onEditModeChange={deactivateEditMode}
        filterShow={false}
      />
      <TaskView type={"assessment"} editId={editId} weightageShow={true}/>
    </>
  );
};

export default AssessmentModule;
