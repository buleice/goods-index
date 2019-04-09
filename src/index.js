import React from 'react';
import {render} from 'react-dom';
import './index.css';
import 'babel-polyfill';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux'
import { Router } from "react-router-dom";
import configureStore from './configureStore'
import './common/js/rem'
const createHistory= require("history").createBrowserHistory
const history = createHistory()
const store = configureStore()

// ReactDOM.render(
//     <Provider store={store}>
//         <App />
//     </Provider>,
//     document.getElementById('root'));

const renderApp = () =>
    render(
        <Provider store={store}>
            <Router history = {history}>   
                    <App />
            </Router>
        </Provider>,
        document.getElementById('root')
    )

if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./App', renderApp)
}

renderApp()

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
