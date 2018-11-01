import {BaseApi} from '../services/base';
import {closeModalWindow} from './modal';
import {GET_ALL_USERS, GET_USER, GET_NEXT_USERS} from '../constans';

export function getAllUsers() {
    return {
        type: GET_ALL_USERS,
        requestType: 'GET',
        callAPI: 'users/default/'
    }
}

export function getNextUsers(page) {
    return {
        type: GET_NEXT_USERS,
        requestType: 'GET',
        callAPI: `users/default/?page=${page}`
    }
}

export function getUser(userId) {
    return {
        type: GET_USER,
        requestType: 'GET',
        callAPI: `users/default/${userId}/`
    }
}

export function changeUserPassword(userId, password) {
    const baseApi = new BaseApi();
    return dispatch => {
        baseApi
            .post(`users/default/${userId}/change_password/`, password)
            .then(() => dispatch(closeModalWindow()));
    }
}

export function blockUser(userId) {
    const baseApi = new BaseApi();
    return dispatch => {
        baseApi
            .post(`users/default/${userId}/block/`)
            .then(() => {
                dispatch(getUser(userId));
                dispatch(closeModalWindow());
            });
    }
}