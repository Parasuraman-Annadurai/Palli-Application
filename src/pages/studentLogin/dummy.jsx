// <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Palli Application</title>
    <link rel="stylesheet" href="./scss/css/style.css" />
    <link
      href="https://cdn.quilljs.com/1.3.6/quill.snow.css"
      rel="stylesheet"
    />
    <script src="https://cdn.quilljs.com/1.3.6/quill.js"></script>
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap"
    />
  </head> 

  <body class="task-list-page">
    <div class="container">
      {/* <!-- <nav class="side-nav-container flex">
        <div class="logo">
          <img src="images/master-logo.png" alt="DCKAP Palli logo" />
        </div>
        <div class="nav-links">
          <ul>
            <li class="main-link">
              <a href="#" class="flex">
                <img src="icons/Shape.svg" alt="home icon" />
                <span>Home</span>
              </a>
            </li>
            <li class="main-link">
              <a href="#" class="flex">
                <img src="icons/Shape.svg" alt="home icon" />
                <span>Home</span>
              </a>
            </li>
            <li class="main-link">
              <a href="#" class="flex">
                <img src="icons/Shape.svg" alt="home icon" />
                <span>Home</span>
              </a>
            </li>
            <li class="main-link main-active">
              <a href="#" class="flex">
                <img src="icons/Shape.svg" alt="home icon" />
                <span>Home</span>
              </a>
              <ul class="sub-links">
                <li class="sub-link sub-active"><a href="#">Task</a></li>
                <li class="sub-link"><a href="#">Assessment</a></li>
                <li class="sub-link"><a href="#">Quiz</a></li>
              </ul>
            </li>
            <li class="main-link home">
              <a href="#" class="flex">
                <img src="icons/Shape.svg" alt="home icon" />
                <span>Home</span>
              </a>
            </li>
            <li class="main-link home">
              <a href="#" class="flex">
                <img src="icons/Shape.svg" alt="home icon" />
                <span>Home</span>
              </a>
            </li>
          </ul>
        </div>

        <div class="user-profile flex">
          <div class="profile-img">
            <img src="icons/profile.svg" alt="" />
          </div>
          <div class="user-details">
            <p>Kate Bishop</p>
            <span>Trainer</span>
          </div>
        </div>
      </nav> --> */}

      {/* <!-- <section class="listing-container">
        <h1>Task list</h1>
        <div class="search-container">
          <input type="input" placeholder="search..." />
          <img
            src="./icons/searchIcon.svg"
            alt="search-icon"
            class="search-icon"
          />
          <img
            src="./icons/filterIcon.svg"
            alt="filter-icon"
            class="filter-icon"
          />
        </div>
        <div class="create-container">
          <button><span>+</span>Create Task</button>
        </div>
        <div class="task-list-container">
          <div class="task-card active flex">
            <div class="task-icon">
              <span>JS</span>
            </div>
            <div class="task-details">
              <h2>Calculator Task</h2>
              <p>
                Sed ut perspiciatis unde omnis iste natus error sit volupta...
              </p>
              <span class="btn btn-inprogress">Inprogress</span>
              <span class="btn btn-deadline">Dec 25 2023</span>
            </div>
          </div>

          <div class="task-card flex">
            <div class="task-icon">
              <span>JS</span>
            </div>
            <div class="task-details">
              <h2>Calculator Task</h2>
              <p>
                Sed ut perspiciatis unde omnis iste natus error sit volupta...
              </p>
              <span class="btn btn-inprogress">Inprogress</span>
              <span class="btn btn-deadline">Dec 25 2023</span>
            </div>
          </div>
          <div class="task-card flex">
            <div class="task-icon">
              <span>JS</span>
            </div>
            <div class="task-details">
              <h2>Calculator Task</h2>
              <p>
                Sed ut perspiciatis unde omnis iste natus error sit volupta...
              </p>
              <span class="btn btn-inprogress">Inprogress</span>
              <span class="btn btn-deadline">Dec 25 2023</span>
            </div>
          </div>
          <div class="task-card flex">
            <div class="task-icon">
              <span>JS</span>
            </div>
            <div class="task-details">
              <h2>Calculator Task</h2>
              <p>
                Sed ut perspiciatis unde omnis iste natus error sit volupta...
              </p>
              <span class="btn btn-inprogress">Inprogress</span>
              <span class="btn btn-deadline">Dec 25 2023</span>
            </div>
          </div>
        </div>
      </section> --> */}

      <main class="main-container">
        {/* <!-- Task Creation --> */}
        <div class="module-header-section flex">
          <div class="module-title-section flex">
            <h3>Calculator Task</h3>
          </div>
          <div class="task-create">
            <button class="btn primary-medium">Submit</button>
          </div>
        </div>

        <div class="task-details-header-container">
          <div class="background-div">
            <div class="task-label-container flex">
              <h3>Task Details</h3>
              <div class="horizon-line">
              </div>
            </div>

            <div class="student-task-details-main-container flex">
              <div class="student-task-type">
                <p>Task Type</p>
                <span>JavaScript</span>
              </div>
              <div class="student-task-status">
                <p>Status</p>
                <select name="" id="">
                  <option value="">Not yet Started</option>
                </select>
              </div>
              <div class="student-task-deadline">
                <p>Deadline</p>
                <span>Dec 25 2023</span>
              </div>
              <div class="sudent-task-supporting-doc">
                <p>Supporting File</p>
                <span>Calculator task document.doc</span>
                <img src="icons/download.svg" alt="" />
              </div>
            </div>

            <div class="task-editor-container">
              <p>Description</p>
              {/* <!-- <div class="task-editor"></div> --> */}
              <div class="task-instruction">
                <span
                  >Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Mauris vel augue eget elit commodo iaculis vehicula in
                  odio.</span
                >
                <ul>
                  <li>
                    Donec cursus felis sed enim tempor, sit amet pharetra nisl
                    bibendum.
                  </li>
                  <li>
                    Integer laoreet sapien sed mauris consectetur, a aliquam est
                    lacinia.Donec id nisi nec mauris tempus dictum eget eu
                    tortor.
                  </li>
                  <li>
                    Donec cursus felis sed enim tempor, sit amet pharetra nisl
                    bibendum.
                  </li>
                  <li>
                    Integer laoreet sapien sed mauris consectetur, a aliquam est
                    lacinia.Donec id nisi nec mauris tempus dictum eget eu
                    tortor.
                  </li>
                  <li>
                    Donec cursus felis sed enim tempor, sit amet pharetra nisl
                    bibendum.
                  </li>
                  <li>
                    Integer laoreet sapien sed mauris consectetur, a aliquam est
                    lacinia.Donec id nisi nec mauris tempus dictum eget eu
                    tortor.
                  </li>
                </ul>
              </div>
            </div>

            <div class="weightage-label-container flex">
              <h3>Weightage Details</h3>
              <div class="horizon-line">
              </div>
            </div>

            <div class="student-weightage-list flex">
              <div class="student-weightage-card">
                <p>UI Styling 25</p>
              </div>
              <div class="student-weightage-card">
                <p>UI Styling 25</p>
              </div>
            </div>
          </div>

          <div class="student-task-label-container flex">
            <h3>Task File</h3>
            <div class="horizon-line">
            </div>
          </div>
          <div class="student-task-file-container flex">
            <div class="file-content-container flex">
              <img src="icons/fileicon.svg" alt="" />
              <div class="file-details">
                <p>JS Calculator task.zip</p>
                <span>File size 12kb</span>
              </div>
            </div>
            <div class="file-download flex">
              <p>Download</p>
              <img src="icons/download.svg" alt="" />
            </div>
          </div>

          <div class="file-input-container">
            <div class="upload-icon-container flex">
              <img src="/icons/upload.svg" class="upload-icon" />
              <label for="file-input"
                >Drag your file or
                <span class="highlight"> click to upload your task</span></label
              >
            </div>
            <input type="file" class="file-input" />
          </div>
        </div>
      </main>
    </div>

    <script src="./index.js"></script>
  </body>
</html>
