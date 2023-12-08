import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";

import { Image, Modal, notification } from "antd";

import ListWeightage from "./components/ListWeightage";

import { useForm } from "react-hook-form";

import { useAuth } from "../../context/AuthContext";

import { API_END_POINT } from "../../../config";

import dataNotFound from "/images/no_data_found.svg";

import "./WeightAge.css";

const Weightage = () => {
  const { token } = useAuth();
  const { id: batchId } = useParams();

  const [listWeightage, setListWeightage] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState("");
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    setError,
    clearErrors,
    reset,
  } = useForm();
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    clearErrors();
    reset();
    setEditMode(false);
  };
  const handleAddWeightage = (formData) => {
    const trimmedWeightage = formData.weightage.trim(); // Trim the input value

    if (!trimmedWeightage) {
      setError("weightage", {
        type: "manual",
        message: "Weightage name cannot be empty",
      });
      return;
    }
    const isExisting = listWeightage.some(
      (item) => item.weightage.toLowerCase() === trimmedWeightage.toLowerCase()
    );

    if (isExisting) {
      setError("weightage", {
        type: "manual",
        message: "Weightage name already exists",
      });
      return;
    }
    const weightageData = {
      weightage: trimmedWeightage,
    };

    const headers = {
      Authorization: `Bearer ${token.access}`,
      "Content-Type": "application/json",
    };

    const url = editMode
      ? `${API_END_POINT}/api/task/${batchId}/update/weightage/${editId}`
      : `${API_END_POINT}/api/task/${batchId}/create/weightage`;

    const requestConfig = {
      method: editMode ? "PUT" : "POST",
      url,
      data: weightageData,
      headers,
    };
    axios(requestConfig)
      .then((res) => {
        setIsModalOpen(false);
        setEditMode(false);
        reset();
        notification.success({
          message: "Success",
          description: editMode
            ? "Weightage Updated Successfully"
            : "Weightage Added Successfully",
          duration: 3,
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    const headers = {
      Authorization: `Bearer ${token.access}`,
      "Content-Type": "application/json",
    };

    axios
      .get(`${API_END_POINT}/api/task/${batchId}/list/weightage`, { headers })
      .then((res) => {
        setListWeightage(res.data.data);
      });
  }, []);

  const handleDelete = (deleteId) => {
    const updatedListWeightage = listWeightage.filter(
      (weightage) => weightage.id !== deleteId
    );

    const headers = {
      Authorization: `Bearer ${token.access}`,
      "Content-type": "application/json",
    };
    Modal.confirm({
      title: "Confirm Deletion",
      content: "Are you sure you want to delete this Weightage Name?",
      okText: "Delete",
      okType: "danger",
      cancelText: "No",
      onOk: async () => {
        if (updatedListWeightage) {
          setListWeightage(updatedListWeightage);
        }
        await axios.delete(
          `${API_END_POINT}/api/task/${batchId}/delete_weightage/${deleteId}/`,
          { headers }
        );

        notification.success({
          message: "Success",
          description: "Weightage Deleted Successfully",
          duration: 3,
        });
      },
    });
  };
  const handleEdit = (editId) => {
    const editedWeightage = listWeightage.find(
      (weightage) => weightage.id === editId
    );

    if (editedWeightage) {
      const { weightage } = editedWeightage;
      setIsModalOpen(true);
      setValue("weightage", weightage);
      setEditMode(true);
      setEditId(editedWeightage.id);
    }
  };

  return (
    <div className="content">
      <div className="list-weightage-container">
        <div className="add-weightage">
          <div>
            <h4>Weightage</h4>
          </div>
          {listWeightage.length > 0 ? (
            <button className="btn weightage-btn" onClick={showModal}>
              Add Weightage
            </button>
          ) : (
            ""
          )}
        </div>
        {listWeightage.length > 0 ? (
          <ListWeightage
            listWeightage={listWeightage}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        ) : (
          <div className="no-data-found-container">
            <Image
              className="no-data-found"
              src={dataNotFound}
              preview={false}
              alt="no date found"
            />
            <button className="btn weightage-btn" onClick={showModal}>
              Add Weightage
            </button>
          </div>
        )}
      </div>
      <Modal
        title={`${editMode ? "Update" : "Add"} Weightage`}
        open={isModalOpen}
        onOk={handleSubmit(handleAddWeightage)}
        onCancel={handleCancel}
      >
        <div className="add-weightage-container">
          <form onSubmit={handleSubmit(handleAddWeightage)}>
            <div className="add-weightage-inputs">
              <label htmlFor="inputField">Weightage Name</label>
              <input
                id="inputField"
                type="text"
                placeholder="e.g: Code Standard"
                {...register("weightage", {
                  required: "Weightage name is required",
                })}
              />
              <p className="error-message">
                {errors.weightage ? errors.weightage.message : ""}
              </p>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default Weightage;
