import { call, put, takeEvery, fork, all } from 'redux-saga/effects';

function* goAge (action) {
    yield put({
        type: 'changeNameStore',
        payload: {
            name: action.payload.name
        }
    })
}

function* goAgeSaga () {
    yield takeEvery('changeName', goAge);
}

export default function* homePageSaga () {
    yield all([
        fork(goAgeSaga)
    ])
}