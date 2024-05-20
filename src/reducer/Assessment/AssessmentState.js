import { assessmentMode } from "../../utils/validate";


export const assessmentState = {
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
    toggleAssigneeWeightage: 0,
    assigneeloader: false,
    assigneLoadingMessage: "",
    weightageLists: [],
    openComments: null,
    studentLoading: false,
    assignedUsers: [],
    assignedUsersSearch: "",
    drawerContent : ""
  };
  
  