import React from "react";
import dckapLogo from "../../public/images/dckap_palli_logo_sm.svg";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useLocation, useParams } from "react-router-dom";
import { API_END_POINT } from "../../config";
import { Button, Modal, List, Avatar } from "antd";
import { useNavigate } from "react-router-dom";
import useAPI from "../hooks/useAPI";
import { Tooltip } from "antd";

const Sidebar = ({ menuList, activeMenuItem }) => {
  
  const navigate = useNavigate();
  const [active, setActive] = useState(activeMenuItem);
  const { token } = useAuth();
  const { data, makeNetworkRequest } = useAPI();
  const { id: batchId } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const currentPath = useLocation().pathname;
  const isDashboardPage = currentPath === "/dashboard";

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
