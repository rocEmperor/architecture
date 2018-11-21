import { combineReducers } from 'redux';

let reducerObj = {};
// 获取所有的reducers
const context = require.context('./', true, /\.js$/);
const keys = context.keys().filter(item => item !== './index.js');
keys.forEach((item) => {
  item = item.replace('./', '');
  let key = item.replace('.js', '')
  let reducer = require(`./${item}`).default;
  reducerObj[key] = reducer;
})

const rootReducer = combineReducers(reducerObj);
export default rootReducer
