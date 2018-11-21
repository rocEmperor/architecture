import React from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers';
import rootSaga from './sagas';
import logger from 'redux-logger'

const sagaMiddleware = createSagaMiddleware();

const middleWares = [
  sagaMiddleware,
  logger
];

let store = createStore(rootReducer, undefined, compose(
  applyMiddleware(...middleWares),
));

export default function configureStore() {
  // 运行saga
  sagaMiddleware.run(rootSaga);
  return { store }
}