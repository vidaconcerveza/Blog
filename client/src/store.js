import {
  createStore,
  compose,
  applyMiddleware
} from "redux";
import createSagaMiddleware from "redux-saga";

import {
  createBrowserHistory
} from 'history';

import {
  routerMiddleware
} from "connected-react-router";

import createRootReducer from "./redux/reducers/index";
import rootSaga from "./redux/sagas";

export const history = createBrowserHistory();

const sagaMiddleware = createSagaMiddleware();

const initialState = {}; // 초기 상태는 아무것도 없기때문에 비어있음

const middleware = [sagaMiddleware, routerMiddleware(history)];
const devtools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
const composeEnhancer =
  process.env.NODE_ENV === "production" ? compose : devtools || compose;

const store = createStore(
  createRootReducer(history),
  initialState,
  composeEnhancer(applyMiddleware(...middleware))
);
sagaMiddleware.run(rootSaga);

export default store;