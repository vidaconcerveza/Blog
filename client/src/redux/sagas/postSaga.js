import {
    POSTS_LOADING_FAILURE,
    POSTS_LOADING_REQUEST,
    POSTS_LOADING_SUCCESS
} from '../types';
import {
    all,
    call,
    fork,
    put,
    takeEvery
} from 'redux-saga/effects'
import {
    push
} from 'connected-react-router'
import axios from 'axios'

//All post Load
const loadPostAPI = () => {
    return axios.get("/api/post")
}

function* loadPosts() {
    try {

        const result = yield call(loadPostAPI)
        console.log(result);

        yield put({
            type: POSTS_LOADING_SUCCESS,
            payload: result.data
        })

    } catch (e) {

        yield put({
            type: POSTS_LOADING_FAILURE,
            payload: e
        })
    }
}

function* watchLoadPosts() {
    yield takeEvery(POSTS_LOADING_REQUEST, loadPosts);
    //console.log("WATCH LOAD POST FUNCTION**")
}

export default function* postSaga() {
    yield all([fork(watchLoadPosts)])
}