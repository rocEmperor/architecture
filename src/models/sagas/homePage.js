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
    console.log(444);
    yield takeEvery('changeName', goAge);
}

export default function* homePageSaga () {
    yield all([
        fork(goAgeSaga)
    ])
}