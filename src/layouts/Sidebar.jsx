import React,{ useState, useEffect } from "react";
import { Link, useLocation, useParams,useNavigate } from "react-router-dom";

import { Button, Modal, List, Avatar,Tooltip } from "antd";

import { API_END_POINT } from "../../config";

import useAPI from "../hooks/useAPI";

import dckapLogo from "/images/dckap_palli_logo_sm.svg";

const Sidebar = ({ menuList, activeMenuItem }) => {
  const navigate = useNavigate();
  const { id: batchId } = useParams();
  const { data:batches, makeNetworkRequest } = useAPI();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [active, setActive] = useState(activeMenuItem);
  const currentPath = useLocation().pathname;
  const isDashboardPage = currentPath === "/dashboard";

  const handleSwitch = (id) => {
    navigate(`/batch/${id}/applications`);
    setIsModalOpen(false);
  };
  useEffect(() => {
    makeNetworkRequest(`${API_END_POINT}/api/list/batch/`, "GET", null);
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
