import React, { useState, useEffect } from "react";
import { Link, useLocation, useParams, useNavigate } from "react-router-dom";

import { Button, Modal, List, Avatar, Tooltip } from "antd";
import axios from "axios";

import { useAuth } from "../context/AuthContext";

import { API_END_POINT } from "../../config";

import dckapLogo from "/images/dckap_palli_logo_sm.svg";

const Sidebar = ({ menuList, activeMenuItem }) => {
  const navigate = useNavigate();
  const { id: batchId } = useParams();
  const {token} = useAuth()
  const [batches,setBatches] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [active, setActive] = useState(activeMenuItem);
  const currentPath = useLocation().pathname;
  const isDashboardPage = currentPath === "/dashboard";

  const handleSwitch = (id,batchName) => {
    Modal.confirm({
      title: `Confirm Swith to ${batchName}`,
      content: "Are you sure you want to Switch this Batch?",
      onOk: () => {
        navigate(`/batch/${id}/applications`);
        setIsModalOpen(false);
        window.location.reload()
      },
    });

  };
  useEffect(() => {
    const headers = {
      Authorization : `Bearer ${token.access}`,
      "Content-type":"application/json"
    }
    axios.get(`${API_END_POINT}/api/list/batch/`,{headers}).then((res)=>{
      setBatches(res.data.data);
    })
  }, []);

  return (
    <div className="sidebar">
      <div className="logo">
        <img src={dckapLogo} alt="dckap-logo-sm" />
      </div>

      <div className="menus">
        {!isDashboardPage && (
          <Link to="/dashboard">
            <Tooltip title="Dashboard" placement="right" color={"#223F64"}>
              <div className="dashboard-container menu-container">
                <div className="applicants flex">
                  <span className="material-symbols-outlined">arrow_back</span>
                  <p>Back Dashboard</p>
                </div>
              </div>
            </Tooltip>
          </Link>
        )}

        {menuList.map((menu, index) => (
          <Link
            to={isDashboardPage ? "/dashboard" : `/batch/${batchId}/${menu.id}`}
            key={index}
            onClick={() => setActive(menu.id)}
          >
            <Tooltip title={menu.label} placement="right" color={"#223F64"}>
              <div
                className={`${menu.id}-container menu-container ${
                  menu.id === active ? "active" : ""
                }`}
                onClick={() => setActive(menu.id)}
              >
                <div className="applicants flex">
                  <span className="material-symbols-outlined">view_list</span>
                  <p>{menu.label}</p>
                </div>
              </div>
            </Tooltip>
          </Link>
        ))}
      </div>

      {!isDashboardPage && (
        <div className="setting flex" onClick={() => setIsModalOpen(true)}>
          <span class="material-symbols-outlined">switch_account</span>
          <p className="switch">Switch</p>
        </div>
      )}

      <div className="">
        <Modal
          open={isModalOpen}
          footer={null}
          onCancel={() => setIsModalOpen(false)}
          centered
        >
          <List
            itemLayout="horizontal"
            dataSource={batches}
            renderItem={(batch, index) => (
              <List.Item
                onClick={() => handleSwitch(batch.id,batch.batch_name)}
                style={{ cursor: "pointer" }}
              >
                <List.Item.Meta
                  avatar={
                    <Avatar
                      size="small"
                      icon={
                        <span className="material-symbols-outlined">
                          {" "}
                          account_circle{" "}
                        </span>
                      }
                    />
                  }
                  title={batch.batch_name}
                  description={`Start Date: ${batch.start_date}, End Date: ${batch.end_date}`}
                />
              </List.Item>
            )}
          />
        </Modal>
      </div>
    </div>
  );
};

export default Sidebar;