import React from "react";
import "./TaskModule.css";
import TaskAddModal from "../../components/TaskAddModel";
import { useState } from "react";
const TaskModule = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
 
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleCancel =()=>{
    setIsModalVisible(false);
  }

  return (
      <div className="main">
        <div className="content">
          <div className="task_container">
            <div className="task__start_page">
              <div className="breadcrumbs">
                <span className="material-symbols-outlined">groups</span>
                <span className="material-symbols-outlined">
                  arrow_right_alt
                </span>
                <span>Task</span>
              </div>
              <div className="test__module_mode">
                <div className="test_module" onClick={showModal}>
                  <span className="material-symbols-outlined">add_task</span>
                  <p>Task</p>
                </div>
                <div className="quizz_module">
                  <span className="material-symbols-outlined">lightbulb</span>
                  <p>Quizz</p>
                </div>
              </div>
            </div>
          </div>
          <TaskAddModal isVisible={isModalVisible}  handleCancel={handleCancel}/>
        </div>
      </div>
  );
};

export default TaskModule;
