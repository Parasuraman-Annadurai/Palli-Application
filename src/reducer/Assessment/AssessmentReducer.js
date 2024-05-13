

export const assessmentModuleReducer = (assessmentState, action) => {
    switch (action.type) {
      case "SET_TOKEN":
        return { ...assessmentState, token: action.payload };
      case "SET_USER":
        return { ...assessmentState, user: action.payload };
      case "SET_BATCH_ID":
        return { ...assessmentState, batchId: action.payload };
      case "SET_EDIT_ID":
        return { ...assessmentState, editId: action.payload };
      case "SET_ASSESSMENT_LIST":
        return { ...assessmentState, assessmentList: action.payload };
      case "SET_ASSESSMENT_SEARCH_WORD":
        return { ...assessmentState, assessmentSearchWord: action.payload };
      case "SET_LOADING":
        return { ...assessmentState, loading: action.payload };
      case "SET_STUDENTS":
        return { ...assessmentState, students: action.payload };
      case "SET_SELECTED_STUDENTS":
        return { ...assessmentState, selectedStudents: action.payload };
      case "SET_DELETE_MODAL_OPEN":
        return { ...assessmentState, isDeleteModalOpen: action.payload };
      case "SET_DRAFT":
        return { ...assessmentState, isDraft: action.payload };
      case "SET_STUDENT_SCORE_OPEN":
        return { ...assessmentState, isStudentScoreOpen: action.payload };
      case "SET_ACTIVE_WEIGHTAGE_INDEX":
        return { ...assessmentState, activeWeightageIndex: action.payload };
      case "SET_COMMENT_TEXT":
        return { ...assessmentState, commentText: action.payload };
      case "SET_COMMENT_EDIT_ID":
        return { ...assessmentState, isCommentEditId: action.payload };
      case "SET_FORM_ERRORS":
        return { ...assessmentState, formErrors: action.payload };
      case "SET_WEIGHTAGE_ERRORS":
        return { ...assessmentState, weightageErrors: action.payload };
      case "SET_ASSIGNEE_SEARCH":
        return { ...assessmentState, assigneeSearch: action.payload };
      case "SET_ASSIGNEE_LOADING":
        return { ...assessmentState, isAssigneeLoading: action.payload };
      case "SET_ASSESSMENT_LOADING":
        return { ...assessmentState, isAssessmentLoading: action.payload };
      default:
        return assessmentState;
    }
  };

export const assessmentViewReducer = (state, action) => {
    switch (action.type) {
      case "SET_STUDENT_SCORE":
        return { ...state, studentScore: action.payload };
      case "SET_TOGGLE_ASSIGNEE_WEIGHTAGE":
        return { ...state, toggleAssigneeWeightage: action.payload };
      case "SET_ASSIGNEELOADER":
        return { ...state, assigneeloader: action.payload };
      case "SET_ASSIGNE_LOADING_MESSAGE":
        return { ...state, assigneLoadingMessage: action.payload };
      case "SET_WEIGHTAGE_LISTS":
        return { ...state, weightageLists: action.payload };
      case "SET_OPEN_COMMENTS":
        return { ...state, openComments: action.payload };
      case "SET_STUDENT_LOADING":
        return { ...state, studentLoading: action.payload };
      case "SET_ASSIGNED_USERS":
        return { ...state, assignedUsers: action.payload };
      case "SET_ASSIGNED_USERS_SEARCH":
        return { ...state, assignedUsersSearch: action.payload };
      default:
        return state;
    }
};
  