import {
  combineReducers
} from "redux";
import {
  connectRouter
} from "connected-react-router";
import authReducer from './authReducer'
import postReducer from "./postReducer";

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    //authReducer를 auth로 불러와서.... => loginmodal로 전달해줌.
    auth: authReducer,
    post: postReducer
  });

export default createRootReducer;