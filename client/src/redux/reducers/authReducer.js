const {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  CLEAR_ERROR_SUCCESS,
  CLEAR_ERROR_REQUEST,
  CLEAR_ERROR_FAILURE,
  USER_LOADING_SUCCESS,
  USER_LOADING_REQUEST,
  USER_LOADING_FAILURE,
  REGISTER_SUCCESS,
  REGISTER_REQUEST,
  REGISTER_FAILURE,
} = require("../types");

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  isLoading: false,
  user: "",
  userId: "",
  userName: "",
  userRole: "",
  errorMsg: "",
  successMsg: "",
};

// ...state => ...은 얕은 복사를 의미.
// react라는 의미는 다시 액트! 재반응 함을 의미하므로, 기존것과 새로운것의 차이를 알기 위해서.
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGOUT_REQUEST:
    case REGISTER_REQUEST:
    case LOGIN_REQUEST:
      return {
        ...state,
        errorMsg: "",
          isLoading: true,
      };

    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        ...action.payload,
          isAuthenticated: true,
          isLoading: false,
          userId: action.payload.user.id,
          userRole: action.payload.user.role,
          errorMsg: "",
      };

    case REGISTER_FAILURE:
    case LOGOUT_FAILURE:
    case LOGIN_FAILURE:
      console.log('FAILURE')
      console.log(action.payload)
      localStorage.removeItem("token");
      return {
        ...state,
        ...action.payload,
          token: null,
          user: null,
          userId: null,
          isAuthenticated: false,
          isLoading: false,
          userRole: null,
          errorMsg: action.payload.data.message,
      };


    case CLEAR_ERROR_REQUEST:
      console.log("CLEAR ERROR REQUEST??")
      console.log(state);
      return {
        ...state,
        errorMsg: "ERROR!!"
      };

    case CLEAR_ERROR_SUCCESS:
      return {
        ...state,
        errorMsg: "",
      };

    case USER_LOADING_FAILURE:
      return {
        ...state,
        user: null,
          isAuthenticated: false,
          isLoading: false,
          userRole: "",
      };

    case USER_LOADING_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case USER_LOADING_SUCCESS:
      return {
        ...state,
        isLoading: false,
          isAuthenticated: true,
          user: action.payload,
          userId: action.payload._id,
          userName: action.payload.name,
          userRole: action.payload.role,
      };

    case CLEAR_ERROR_FAILURE:
      return {
        ...state,
        errorMsg: "",
      };

    case REGISTER_SUCCESS:
    case LOGOUT_SUCCESS:
      localStorage.removeItem("token");
      return {
        token: null,
          user: null,
          userId: null,
          isAuthenticated: false,
          isLoading: false,
          userRole: null,
          errorMsg: "",
      };

    default:
      return state;
  }
};

export default authReducer;