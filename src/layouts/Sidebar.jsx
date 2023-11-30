import React from "react";
import dckapLogo from "../../public/images/dckap_palli_logo_sm.svg";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useParams } from "react-router-dom";
import { API_END_POINT } from "../../config";
import { Button, Modal, List, Avatar } from "antd";
import { useNavigate } from "react-router-dom";
import useAPI from "../hooks/useAPI";
const Sidebar = ({ menuList }) => {
  const navigate = useNavigate();
  const [active, setActive] = useState("applications");
  const { token } = useAuth();
  const { data, makeNetworkRequest } = useAPI();
  const { id: batchId } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSwitch = (id) => {
    navigate(`/batch/${id}/applications`);
    setIsModalOpen(false);
  };
  useEffect(() => {
    makeNetworkRequest(`${API_END_POINT}/api/list/batch/`, "GET", null, {
      headers: {
        Authorization: `Bearer ${token.access}`,
      },
    });
  }, []);
  const batches = data.data || [];
  return (
    <div className="sidebar">
      <div className="logo">
        <img src={dckapLogo} alt="dckap-logo-sm" />
      </div>

      <div className="menus">
        {menuList.map((menu, index) => (
          <Link to={`/batch/${batchId}/${menu.id}`} key={index}>
            <div
              className={`${menu.id}-container  menu-container ${
                active === menu.id ? "active" : ""
              }`}
              onClick={() => setActive(menu.id)}
            >
              <div className="applicants flex">
                <span className="material-symbols-outlined">view_list</span>
                <p>{menu.label}</p>
              </div>
            </div>
          </Link>
        ))}
        {/* <Link to={"/dashboard"}>
          <div className={`application-container  menu-container `}>
            <div className="applicants flex">
              <span className="material-symbols-outlined">view_list</span>
              <p>Back to Dasboard</p>
            </div>
          </div>
        </Link>

        <Link to={`/batch/${batchId}/applications`}>
          <div
            className={`application-container  menu-container ${
              active === "application" ? "active" : ""
            }`}
            onClick={() => setActive("application")}
          >
            <div className="applicants flex">
              <span className="material-symbols-outlined">view_list</span>
              <p>Application</p>
            </div>
          </div>
        </Link> */}

        {/* <Link to={`/batch/${batchId}/module`}>
          <div
            className={`test-container menu-container ${
              active === "task" ? "active" : ""
            }`}
            onClick={() => setActive("task")}
          >
            <div className="task flex">
              <span className="material-symbols-outlined">inventory</span>
              <p>Module</p>
            </div>
          </div>
        </Link> */}
      </div>

      <div className="setting flex">
        <span className="material-symbols-outlined">settings</span>
        <a>Settings</a>
      </div>
      <div className="switch">
        <Button onClick={() => setIsModalOpen(true)}>Switch</Button>
      </div>
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
                onClick={() => handleSwitch(batch.id)}
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
