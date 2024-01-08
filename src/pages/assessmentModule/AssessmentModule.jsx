import React, { useState, useEffect } from "react";

import { useParams } from "react-router-dom";

import { Modal, notification, Empty } from "antd";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import dayjs from "dayjs";

import AssessmentList from "../../components/AssessmentList";
import AssessmentView from "../../components/AssessmentView";

import { useAuth } from "../../context/AuthContext";

import { API_END_POINT } from "../../../config";

const AssessmentModule = ({ type }) => {
  const { token } = useAuth();
  const { id: batchId } = useParams();
  const [editId, setEditId] = useState("");
  const [assessmentList, setAssessmentList] = useState([]);
  const [assessmentSearchWord, setAssessmentSearchWord] = useState("");
  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [deleteAssessment, setDeleteAssessment] = useState({});
  const [assessmentType, setAssessmentType] = useState(type === "Task" ? 0 : 1);
  const headers = {
    Authorization: `Bearer ${token.access}`,
    "Content-type": "application/json",
  };

  useEffect(() => {
    //this useEffect used to fetch task list and will re-run whenever filter or search is updated
    const url = `${API_END_POINT}/api/task/${batchId}/list_task/?limit=10&page=1&filter_task_type=${assessmentType}&search=${assessmentSearchWord}`;
    axios
      .get(url, { headers })
      .then((res) => {
        if (res.status === 200 && res.data.message === "Success") {
          setAssessmentList(res.data.data);
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

  const handleConfirmDelete = () => {
    const isDraft = assessmentList.some(
      (task) => task.id === deleteAssessment.id && task.draft
    );

    const updatedTasks = assessmentList.filter(
      (task) => task.id !== deleteAssessment.id
    );

    if (isDraft) {
      setAssessmentList(updatedTasks);
      setEditId(null);
      notification.success({
        message: "Success",
        description: "Task Deleted Successfully",
        duration: 3,
      });
    } else {
      axios
        .delete(
          `${API_END_POINT}/api/task/${batchId}/delete_task/${deleteAssessment.id}`,
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
          setEditId(null);
          setDeleteAssessment({});
          setAssessmentList(updatedTasks);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleSave = (assessment) => {

    const isNew = "draft" in assessment;
    const {
      created_at,
      created_by,
      updated_at,
      batch,
      updated_by,
      is_deleted,
      ...currentAssessment
    } = assessment;

    if (isNew) {
      delete currentAssessment["draft"];
      delete currentAssessment["id"];
    } else {
    }

    const apiEndpoint = isNew
      ? `${API_END_POINT}/api/task/${batchId}/create_task/`
      : `${API_END_POINT}/api/task/${batchId}/update_task/${editId}`;
    const method = isNew ? "POST" : "PUT";

    const assignAssessment = {
      user: selectedStudents,
      task_status: 0,
      // submission_link: SubmissionLink,
    };

    // Existing taskslogic need to be handled here

    axios({
      method: method,
      url: apiEndpoint,
      headers: {
        Authorization: `Bearer ${token.access}`,
        "Content-Type": "application/json",
      },
      data: currentAssessment,
    }).then((res) => {
      notification.success({
        message: "Success",
        description: isNew
          ? `${type} Added Successfully`
          : `${type} Updated Successfully`,
        duration: 3,
      });



      let cloneAssessmentList = [...assessmentList];
      //finding and filtering the assessment which is new create the assessment

      if (isNew) {
        cloneAssessmentList = cloneAssessmentList.filter(
          (assessment) => "id" in assessment
        );
        currentAssessment["id"] = res.data.data.id;
        cloneAssessmentList = [currentAssessment, ...cloneAssessmentList];
      } else {
        cloneAssessmentList = cloneAssessmentList.map((assessment) => {
          if (assessment.id === res.data.data.id) {
            assessment = currentAssessment;
          }
          return assessment;
        });
      }

      setAssessmentList(cloneAssessmentList);

      // axios({
      //   method: "POST",
      //   url: `${API_END_POINT}/api/task/${batchId}/assign/task/${res.data.data.id}`,
      //   headers: {
      //     Authorization: `Bearer ${token.access}`,
      //     "Content-Type": "application/json",
      //   },
      //   data: assignAssessment,
      // }).then((res) => {});
    });
  };

  const handleAdd = () => {
    const uniqueId = uuidv4();

    const createAssessment = {
      id: uniqueId,
      task_title: "Untitled",
      task_description: "",
      due_date: dayjs().format("YYYY-MM-DD HH:mm:ss"),
      draft: true,
      task_type: type == "Assessment" ? 1 : 0,
    };

    const concatNewAssessment = [createAssessment, ...assessmentList];

    setAssessmentList(concatNewAssessment);
    setEditId(uniqueId)

  };

  const modalConfig = {
    title: "Delete Conformation",
    okButtonProps: {
      style: { background: "#49a843", borderColor: "#EAEAEA" },
    },
    onOk: handleConfirmDelete,
    onCancel: () => setDeleteAssessment({}),
  };

  const handleInputChange = (name, value) => {
    const cloneAssessmentList = [...assessmentList]
    const updatedList = cloneAssessmentList.map((assessment) => {
      if (assessment.id === editId) {
        return {
          ...assessment,
          [name]: value,
        };
      }
      return assessment;
    });

    setAssessmentList(updatedList);
  };

  return (
    <>
      {deleteAssessment.id && (
        <Modal open={true} {...modalConfig}>
          <p>{`Are you sure you want to delete ${type} ${deleteAssessment.task_title}?`}</p>
        </Modal>
      )}
      <AssessmentList
        //this mode used create task or assessment
        mode={type}
        filterShow={false}
        handleEdit={(editId) => setEditId(editId)}
        assessmentList={assessmentList}
        setAssessmentSearchWord={setAssessmentSearchWord}
        loading={loading}
        handleDelete={setDeleteAssessment}
        handleAdd={handleAdd}
        selectedAssessment={editId}
      />

      {editId ? (
        <>
          {assessmentList.map((assessment) => {
            if (assessment.id == editId) {
              return (
                <AssessmentView
                  currentAssessment={assessment}
                  students={students}
                  selectedStudents={selectedStudents}
                  setSelectedStudents={setSelectedStudents}
                  handleSave={handleSave}
                  handleInputChange={handleInputChange}
                  weightageShow={type === "Task" ? false : true}
                />
              );
            }
          })}
        </>
      ) : (
        <div className="select-something-container flex">
          <div className="image-container ">
            <img src="/icons/select-something.svg" alt="" />
            <p className="select-something-heading">
              Please Select any of the Available Tasks or Create New Task
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default AssessmentModule;
