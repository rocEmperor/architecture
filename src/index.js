import React from 'react';
import { render } from 'react-dom';
import Router from './router/index';
import { Provider } from 'react-redux';
import configureStore from './models/createStore';
import ErrorBoundary from './common/ErrorBoundary/index';

const { store } = configureStore();
render(
  <ErrorBoundary>
    <Provider store={store}> 
      <Router />
    </Provider>
  </ErrorBoundary>,
  document.getElementById('root')
);