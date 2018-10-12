import React, { Component } from 'react';
import App from '../App';
import { HashRouter, Route } from 'react-router-dom';
import HomePageRouter from './homePage';

const routerList = [].concat(HomePageRouter);

class Router extends Component {
    render () {
        return (
            <HashRouter>
                <App>
                    {routerList.map((route, index) => {
                        return <Route exact path={route.path} component={route.component} key={index}/>
                    })}
                </App>
            </HashRouter>
        )
    }
}

export default Router;