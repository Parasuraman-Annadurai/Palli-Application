import React from "react";

import "./scss/studentsView.css";
import AssessmentList from "../../components/AssessmentList";

function StudentsView({ type }) {
  return (
    <>
      <AssessmentList
        mode={type}
        filterShow={false}
        // handleEdit={(editId) => setEditId(editId)}
        // assessmentList={assessmentList}
        // setAssessmentSearchWord={setAssessmentSearchWord}
        // loading={loading}
        // handleDelete={handleDeleteAssessment}
        // handleAdd={handleAdd}
        // selectedAssessment={editId}
      />

      <main className="main-container">
        <div className="task-heading">
          <p>Calculator Task</p>

          <div className="search-container">
            <input type="input" placeholder="search..." />
            <img
              src="/icons/searchIcon.svg"
              alt="search-icon"
              className="search-icon"
            />

            <img
              src="/icons/filterIcon.svg"
              alt="filter-icon"
              className="filter-icon"
            />
          </div>
        </div>

        <div className="task-container">
          <div className="task-user-list-container flex">
            <div className="student-info flex">
              <div className="student-name-container">
                <p>GM</p>
              </div>
              <div className="student-email-container">
                <p className="student-name">Ganesh Murali</p>
                <p className="student-email">ganeshmurali@gmail.com</p>
              </div>
            </div>
            <div className="student-status">
              <p>Status</p>
              <span>Completed</span>
            </div>
            <div className="sumbitted-date">
              <p>Submitted Date</p>
              <span>22 Dec 2023</span>
            </div>
            <div className="student-file">
              <p>File</p>
              <p className="upload-file-name">Download</p>
              <img src="/icons/download.svg" alt="download" />
            </div>
            <div className="student-work">
              <button className="secondary-btn-sm">REVIEW</button>
              {/* <img src="icons/primary-dropdown.svg" alt="" /> */}
            </div>
          </div>
          <hr />
          <div className="applied-weightage-list-container flex">
            <div className="applied-weightage-card flex">
              <div className="applied-weightage-name">
                <p>
                  Code Performance <span>25 </span>
                </p>
              </div>
              <div className="weightage-checkbox">
                <input type="type" />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default StudentsView;
