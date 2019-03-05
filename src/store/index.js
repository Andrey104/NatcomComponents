import {createStore, applyMiddleware} from 'redux';
import reducer from '../reducer';
import thunk from 'redux-thunk';
import api from '../middlewares/api';

const enhancer = applyMiddleware(thunk, api);

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), enhancer);


window.store = store;

export default store