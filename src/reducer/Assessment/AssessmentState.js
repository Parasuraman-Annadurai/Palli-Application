import { assessmentMode } from "../../utils/validate";


export const assessmentState = {
    token: null,
    user: null,
    batchId: null,
    editId: null,
    assessmentList: [],
    assessmentSearchWord: "",
    loading: false,
    students: [],
    selectedStudents: [],
    isDeleteModalOpen: false,
    isDraft: false,
    isStudentScoreOpen: true,
    activeWeightageIndex: null,
    isMode: "card",
    commentText: "",
    isCommentEditId: null,
    formErrors: {},
    weightageErrors: {},
    assigneeSearch: "",
    isAssigneeLoading: false,
    isAssessmentLoading: false
  };


 export const assessmentViewState = {
    studentScore: [],
    toggleAssigneeWeightage: "TEST" === assessmentMode ? 0 : 1,
    assigneeloader: false,
    assigneLoadingMessage: "",
    weightageLists: [],
    openComments: null,
    studentLoading: false,
    assignedUsers: [],
    assignedUsersSearch: "",
  };
  
  