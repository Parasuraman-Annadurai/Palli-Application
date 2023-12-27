import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import { API_END_POINT } from "../../../config";
import { notification,Modal } from "antd";
import axios from "axios";

import TaskList from "../../components/TaskList";
import TaskView from "../../components/TaskView";
const AssessmentModule = () => {
  const {token} = useAuth();
  const {id:batchId} = useParams()
  const [editId, setEditId] = useState("");
  const [assessmentList, setAssessmentList] = useState({ data: [] });
  const [assessmentTaskWord, setAssessmentTaskWord] = useState("");
  const [loading, setLoading] = useState(true); 
  

  const headers = {
    Authorization: `Bearer ${token.access}`,
    "Content-type": "application/json",
  };
  useEffect(() => {
    //this useEffect used to fetch task list and will re-run whenever filter or search is updated
    const url = `${API_END_POINT}/api/task/${batchId}/list_task/?limit=5&page=1&filter_task_type=1&search=${assessmentTaskWord}`
    axios
      .get(url, { headers })
      .then((res) => {
        if (res.status === 200 && res.data.message === "Success") {
          setAssessmentList(res.data);
          setLoading(false)
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);


 
  const handleDelete = (deleteTaskId) => {

    const updateAssessment = assessmentList.data.filter((task) => task.id !== deleteTaskId);

    Modal.warning({
      title: "Success",
      content: "Assessment Deleted Successfully...",
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
              description: `Assessment Deleted Successfully`,
              duration: 3,
            });
            setAssessmentList({ data: updateAssessment });
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
       mode={"Assessment"}
       onEditClick={setEditId}
       onEditModeChange={setEditId}
       taskLists={assessmentList}
       setTaskSearchWord={setAssessmentTaskWord}
       loading={loading}
       filterShow={false}
       handleDelete={handleDelete}
      />
      <TaskView type={"assessment"} editId={editId} weightageShow={true}/>
    </>
  );
};

export default AssessmentModule;
