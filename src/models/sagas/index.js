import { all, fork } from 'redux-saga/effects';
import homePageSaga from './homePage';

export default function* rootSaga () {
    yield all([
        homePageSaga()
    ])
}