import {BaseApi} from '../services/base';
import {closeModalWindow} from './modal';
import {GET_ALL_USERS, GET_USER, GET_NEXT_USERS} from '../constans';

export function getAllUsers() {
    return {
        type: GET_ALL_USERS,
        requestType: 'GET',
        callAPI: 'users/'
    }
}

export function getNextUsers(page) {
    return {
        type: GET_NEXT_USERS,
        requestType: 'GET',
        callAPI: `users/?page=${page}`
    }
}

export function getUser(userId) {
    return {
        type: GET_USER,
        requestType: 'GET',
        callAPI: `users/${userId}/`
    }
}

export function changeUserPassword(userId, password) {
    const baseApi = new BaseApi();
    return dispatch => {
        baseApi
            .post(`users/${userId}/change_password/`, password)
            .then(() => dispatch(closeModalWindow()));
    }
}

export function blockUser(userId) {
    const baseApi = new BaseApi();
    return dispatch => {
        baseApi
            .post(`users/${userId}/block/`)
            .then(() => {
                dispatch(getUser(userId));
                dispatch(closeModalWindow());
            });
    }
}