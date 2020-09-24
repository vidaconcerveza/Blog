import axios from "axios";
import {
  all,
  call,
  put,
  takeEvery,
  fork
} from "redux-saga/effects";
import {
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOGIN_REQUEST,
  LOGOUT_FAILURE,
  LOGOUT_SUCCESS,
  LOGOUT_REQUEST,
  REGISTER_FAILURE,
  REGISTER_SUCCESS,
  REGISTER_REQUEST,
  USER_LOADING_SUCCESS,
  USER_LOADING_FAILURE,
  USER_LOADING_REQUEST,
  CLEAR_ERROR_FAILURE,
  CLEAR_ERROR_SUCCESS,
  CLEAR_ERROR_REQUEST


} from "../types";

//Login User API
const loginUserAPI = (loginData) => {
  console.log(loginData, "loginData");
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  return axios.post("api/auth", loginData, config);
};


function* loginUser(action) {
  try {
    const result = yield call(loginUserAPI, action.payload);
    console.log(result);
    yield put({
      type: LOGIN_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: LOGIN_FAILURE,
      payload: e.response,
    });
  }
}

function* watchLoginUser() {
  console.log("LOGIN_REQUEST")
  yield takeEvery(LOGIN_REQUEST, loginUser);
}


//LogOut
// 간단히 말해, LOGOUT_REQUEST가 있으면 => watchLogout => logout 
// 마지막엔 fork 추가
function* logout(action) {
  try {

    yield put({
      type: LOGOUT_SUCCESS,
    });
  } catch (e) {
    yield put({
      type: LOGOUT_FAILURE,
    });
    console.log(e)
  }
}

function* watchLogout() {
  yield takeEvery(LOGOUT_REQUEST, logout);
}
//대부분의 리덕스 패턴은 이렇게 되어 잇으니까 그냥 외우세요.

//Register User API
const registerUserAPI = (registerData) => {
  console.log(registerData, "registerData");
  //Config가 필요없어서 그냥 하면 됨
  return axios.post("api/users", registerData);
};


function* registerUser(action) {
  try {
    const result = yield call(registerUserAPI, action.payload);
    console.log(result);
    yield put({
      type: REGISTER_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: REGISTER_FAILURE,
      payload: e.response,
    });
  }
}

function* watchRegisterUser() {
  yield takeEvery(REGISTER_REQUEST, registerUser);
}


//User Loading
const userLoadingAPI = (token) => {
  console.log(token)
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (token) {
    config.headers["x-auth-token"] = token
  }

  return axios.get("api/auth/user", config);
};


function* userLoading(action) {
  try {
    console.log(action, "userLoading")
    const result = yield call(userLoadingAPI, action.payload);
    console.log(result);
    yield put({
      type: USER_LOADING_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: USER_LOADING_FAILURE,
      payload: e.response,
    });
  }
}

function* watchUserLoading() {
  yield takeEvery(USER_LOADING_REQUEST, userLoading);
}

//CLEAR ERROR SAGA
//API -> API 날리는 부분이 필요없음
function* clearError(action) {
  try {
    yield put({
      type: CLEAR_ERROR_SUCCESS
    })
  } catch (e) {
    console.log(e)
    yield put({
      type: CLEAR_ERROR_FAILURE
    })
  }
}

function* watchClearError() {
  yield takeEvery(CLEAR_ERROR_REQUEST, clearError)
}


export default function* authSaga() {
  yield all([
    fork(watchLoginUser),
    fork(watchLogout),
    fork(watchRegisterUser),
    fork(watchUserLoading),
    fork(watchClearError)
  ]);

}