import React from 'react';
import ReactDOM from 'react-dom';
import {Router} from 'react-router-dom';
import {Provider} from 'react-redux'

import store from './store'
import Root from 'Root';
import history from './history';

ReactDOM.render((
    <Provider store={store}>
        <Router history={history}>
            <Root />
        </Router>
    </Provider>),
        document.getElementById('root'));