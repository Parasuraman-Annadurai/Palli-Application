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
  const [editId, setEditId] = useState(null);
  const [assessmentList, setAssessmentList] = useState([]);
  const [assessmentSearchWord, setAssessmentSearchWord] = useState("");
  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  //for check task or assessment new created or old;
  const [isDraft, setIsDraft] = useState(false);

  const headers = {
    Authorization: `Bearer ${token.access}`,
    "Content-type": "application/json",
  };

  useEffect(() => {
    //this useEffect used to fetch task list and will re-run whenever filter or search is updated
    const url = `${API_END_POINT}/api/task/${batchId}/list_task/?limit=10&page=1&filter_task_type=${
      type === "task" ? 0 : 1
    }&search=${assessmentSearchWord}`;
    axios
      .get(url, { headers })
      .then((res) => {
        if (res.status === 200 && res.data.message === "Success") {
          //manipulate the assessment list task type assessment put the 1 otherwise 0 and remove duplicate
          let assessmentList = [...res.data.data];
          assessmentList = assessmentList.map((assessment) => ({
            ...assessment,
            task_type: assessment.task_type === "ASSESSMENT" ? 1 : 0,
          }));

          setAssessmentList(assessmentList);

          setLoading(false);
          if (!editId) {
            // Set the editId to the first task's id in the updated list
            setEditId(res.data.data.length > 0 ? res.data.data[0].id : null);
          }
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
          // setSelectedStudents(res.data.data.map((student) => student.id));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [assessmentSearchWord]);

  const handleDeleteAssessment = (deleteId) => {
    setEditId(deleteId);
    setIsDeleteModalOpen(true);
    setIsDraft(
      [...assessmentList].some((task) => task.id === deleteId && task.draft)
    );
  };

  const handleConfirmDelete = () => {
    const updatedTasks = [...assessmentList].filter(
      (task) => task.id !== editId
    );

    if (isDraft) {
      setAssessmentList(updatedTasks);
      notification.success({
        message: "Success",
        description: "Task Discard Successfully",
        duration: 3,
      });
      setIsDeleteModalOpen(false);
      setEditId(updatedTasks.length > 0 ? updatedTasks[0].id : null);
    } else {
      axios
        .delete(`${API_END_POINT}/api/task/${batchId}/delete_task/${editId}`, {
          headers: {
            Authorization: `Bearer ${token.access}`,
          },
        })
        .then((res) => {
          notification.success({
            message: "Success",
            description: "Task Deleted Successfully",
            duration: 3,
          });
          setAssessmentList(updatedTasks);
          setIsDeleteModalOpen(false);

          setEditId(updatedTasks.length > 0 ? updatedTasks[0].id : null);
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

    axios({
      method: method,
      url: apiEndpoint,
      headers: {
        Authorization: `Bearer ${token.access}`,
        "Content-Type": "application/json",
      },
      data: currentAssessment,
    })
      .then((res) => {
        console.log(res.message);
        notification.success({
          message: "Success",
          description: isNew
            ? `${type} Added Successfully`
            : `${type} Updated Successfully`,
          duration: 1,
        });

        // console.log(res.response.data,"jjj");

        let cloneAssessmentList = [...assessmentList];
        //finding and filtering the assessment which is new create the assessment

        if (isNew) {
          cloneAssessmentList = cloneAssessmentList.filter(
            (assessment) => !("draft" in assessment)
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
        setEditId(
          cloneAssessmentList.length > 0 ? cloneAssessmentList[0].id : null
        );

        // axios({
        //   method: "POST",
        //   url: `${API_END_POINT}/api/task/${batchId}/assign/task/${res.data.data.id}`,
        //   headers: {
        //     Authorization: `Bearer ${token.access}`,
        //     "Content-Type": "application/json",
        //   },
        //   data: assignAssessment,
        // }).then((res) => {});
      })
      .catch((error) => {
        if (
          error.response.data.status === 400 ||
          "errors" in error.response.data
        ) {
          const errorMessages = error.response.data.errors;

          Object.entries(errorMessages).forEach(([key, messages]) => {
            messages.forEach(message => notification.error({ message: `${key} Error`, description: message }));
          });

        
        }
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
      task_type: type == "assessment" ? 1 : 0,
    };

    const concatNewAssessment = [createAssessment, ...assessmentList];

    setAssessmentList(concatNewAssessment);

    setEditId(uniqueId);
  };

  const handleInputChange = (name, value) => {
    const cloneAssessmentList = [...assessmentList];
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
      {isDeleteModalOpen && (
        <Modal
          open={true}
          title={`${isDraft ? "Discard" : "Delete"} Confirmation`}
          onOk={handleConfirmDelete}
          onCancel={() => {
            setIsDeleteModalOpen(false);
            setIsDraft(false);
          }}
          okButtonProps={{
            style: { background: "#49a843", borderColor: "#EAEAEA" },
          }}
        >
          <p>{`${
            isDraft
              ? "Are you sure you want to discard the changes"
              : "Are you sure you want to delete"
          } ${type} ${
            assessmentList.find((asses) => asses.id === editId).task_title
          }?`}</p>
        </Modal>
      )}

      <AssessmentList
        mode={type}
        filterShow={false}
        handleEdit={(editId) => setEditId(editId)}
        assessmentList={assessmentList}
        setAssessmentSearchWord={setAssessmentSearchWord}
        loading={loading}
        handleDelete={handleDeleteAssessment}
        handleAdd={handleAdd}
        selectedAssessment={editId}
      />

      {assessmentList.map((assessment) => {
        if (assessment.id == editId) {
          return (
            <AssessmentView
              key={assessment.id}
              currentAssessment={assessment}
              students={students}
              selectedStudents={selectedStudents}
              setSelectedStudents={setSelectedStudents}
              handleSave={handleSave}
              handleInputChange={handleInputChange}
              weightageShow={type === "task" ? false : true}
            />
          );
        }
        return null;
      })}

      {editId === null && (
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
