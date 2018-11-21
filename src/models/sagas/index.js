import { all, fork } from 'redux-saga/effects';

let rootSagaObj = [];
// 获取所有的reducers
const context = require.context('./', true, /\.js$/);
const keys = context.keys().filter(item => item !== './index.js');
keys.forEach((item) => {
  item = item.replace('./', '');
  let saga = require(`./${item}`).default;
  rootSagaObj.push(saga());
})

export default function* rootSaga () {
  yield all([
    ...rootSagaObj
  ]);
}