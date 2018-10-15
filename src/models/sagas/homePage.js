import { call, put, takeEvery, fork, all } from 'redux-saga/effects';

function* goAge (action) {
    yield put({
        type: 'changeNameStore',
        payload: {
            name: `小六子${Math.random()}`
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