import React, { useState, useEffect } from "react";

import { useParams } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

import { API_END_POINT } from "../../../config";
import { notification, Modal } from "antd";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import dayjs from "dayjs";

import TaskList from "../../components/TaskList";
import TaskView from "../../components/TaskView";
const AssessmentModule = () => {
  const { token } = useAuth();
  const { id: batchId } = useParams();
  const [editId, setEditId] = useState("");
  const [assessmentList, setAssessmentList] = useState({ data: [] });
  const [assessmentSearchWord, setAssessmentSearchWord] = useState("");
  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [selectId, setSelectId] = useState(null);

  const headers = {
    Authorization: `Bearer ${token.access}`,
    "Content-type": "application/json",
  };
  useEffect(() => {
    //this useEffect used to fetch task list and will re-run whenever filter or search is updated
    const url = `${API_END_POINT}/api/task/${batchId}/list_task/?limit=5&page=1&filter_task_type=1&search=${assessmentSearchWord}`;
    axios
      .get(url, { headers })
      .then((res) => {
        if (res.status === 200 && res.data.message === "Success") {
          setAssessmentList(res.data);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(`${API_END_POINT}/api/applicant/${batchId}/list/students/`, {
        headers,
      })
      .then((res) => {
        if (res.status === 200 && res.data.message === "Success") {
          setStudents(res.data.data);
          setLoading(false);
          setSelectedStudents(res.data.data.map((student) => student.id));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [assessmentSearchWord]);

  const handleDelete = (deleteAssessmentId) => {
    const isDraft = assessmentList.data.some((assessment) => assessment.id === deleteAssessmentId && assessment.draft);

    const updateAssessment = {
      ...assessmentList,
      data: assessmentList.data.filter(
        (assessment) => assessment.id !== deleteAssessmentId
      ),
    };
    
    if(isDraft){
 

      Modal.confirm({
        title: "Delete Confirmation?",
        content: "Are you sure you want to delete this Assessment",
        okButtonProps: {
          style: { background: "#49a843", borderColor: "#EAEAEA" },
        },

        onOk: () => {
          setAssessmentList(updateAssessment);
          setEditId(null);

          notification.success({
            message: "Success",
            description: `Assessment Deleted Successfully`,
            duration: 3,
          });
        },
      });
    }
    else{
      Modal.confirm({
        title: "Delete Confirmation?",
        content: "Are you sure you want to delete this Assessment",
        okButtonProps: {
          style: { background: "#49a843", borderColor: "#EAEAEA" },
        },
  
        onOk: () => {
          axios
            .delete(
              `${API_END_POINT}/api/task/${batchId}/delete_task/${deleteAssessmentId}`,
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
              setAssessmentList(updateAssessment);
            })
            .catch((error) => {
              console.log(error);
            });
        },
      });
    }
  };

  const handleSave = (assessmentData, draft) => {
    const existingAssessmentIndex = assessmentList.data.findIndex(
      (assessment) => assessment.draft === draft
    );

    const { Title, Description, Deadline, SubmissionLink } = assessmentData;
    const formattedDate = Deadline.format("YYYY-MM-DD HH:mm:ss");

    const createAssessmentPayload = {
      task_title: Title,
      task_description: Description,
      task_type: 1,
      due_date: formattedDate,
    };

    const apiEndpoint = draft
      ? `${API_END_POINT}/api/task/${batchId}/create_task/`
      : `${API_END_POINT}/api/task/${batchId}/update_task/${editId}`;
    const method = draft ? "POST" : "PUT";

    const assignTask = {
      user: selectedStudents,
      task_status: 0,
      submission_link: SubmissionLink,
    };

    axios({
      method: method,
      url: apiEndpoint,
      headers: {
        Authorization: `Bearer ${token.access}`,
        "Content-Type": "application/json",
      },
      data: createAssessmentPayload,
    }).then((res) => {
      notification.success({
        message: "Success",
        description: draft
          ? `Assessment Added Successfully`
          : `Assessment Updated Successfully`,
        duration: 3,
      });

      const newAssessment = {
        id: res.data.data.id,
        task_title: Title,
        task_description: Description,
        task_type: 1,
        due_date: formattedDate,
      };

      if (existingAssessmentIndex !== -1) {
        // Remove 'draft' key from the task at the found index
        setAssessmentList((prevState) => ({
          ...prevState,
          data: prevState.data.map((assessment, index) =>
            index === existingAssessmentIndex
              ? (() => {
                  const updatedTask = {
                    ...assessment,
                    ...newAssessment,
                  };
                  delete updatedTask.draft;
                  return updatedTask;
                })()
              : assessment
          ),
        }));
      } 
      setEditId(null)
      axios({
        method: "POST",
        url: `${API_END_POINT}/api/task/${batchId}/assign/task/${res.data.data.id}`,
        headers: {
          Authorization: `Bearer ${token.access}`,
          "Content-Type": "application/json",
        },
        data: assignTask,
      }).then((res) => {});
    });

    //once task create or update tasklist state update
  };

  const handleAdd = () => {
    const uniqueId = uuidv4();

    const createAssessment = {
      id: uniqueId,
      task_title: "Untitled",
      task_description: "",
      due_date: dayjs(),
      draft: true,
    };

    const concatNewTask = {
      ...assessmentList,
      data: [createAssessment, ...assessmentList.data],
    };
    setEditId(uniqueId);
    setSelectId(uniqueId);
    setAssessmentList(concatNewTask);
  };

  return (
    <>
      <TaskList
        mode={"Assessment"}
        handleEdit={setEditId}
        taskLists={assessmentList}
        setTaskSearchWord={setAssessmentSearchWord}
        loading={loading}
        filterShow={false}
        handleDelete={handleDelete}
        handleAdd={handleAdd}
        selectedTask={selectId}
      />
      {editId ? (
        <TaskView
          type={"assessment"}
          editId={editId}
          currentTask={
            editId
              ? assessmentList?.data.filter((task) => task.id === editId)
              : {}
          }
          selectedStudents={selectedStudents}
          students={students}
          setSelectedStudents={setSelectedStudents}
          handleSave={handleSave}
          weightageShow={true}
        />
      ) : (
        <div className="select-something-container flex">
          <div className="image-container ">
            <img src="/icons/select-something.svg" alt="" />
            <p className="select-something-heading">Select Something</p>
          </div>
        </div>
      )}
    </>
  );
};

export default AssessmentModule;
