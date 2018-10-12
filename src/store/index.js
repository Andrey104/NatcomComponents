import {createStore, applyMiddleware} from 'redux';
import reducer from '../reducer';
import thunk from 'redux-thunk';
import api from '../middlewares/api';

const enhancer = applyMiddleware(thunk, api);

const store = createStore(reducer, {}, enhancer);

window.store = store;

export default store