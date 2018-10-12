import React from 'react';
import { render } from 'react-dom';
import Router from './router/index';
import { Provider } from 'react-redux';
import configureStore from './models/createStore';

const { store } = configureStore();
render(
    <Provider store={store}>
        <Router />
    </Provider>,
    document.getElementById('root')
);