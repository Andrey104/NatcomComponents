import {
    GET_ALL_CLIENTS,
    GET_NEXT_CLIENTS,
    GET_CLIENT,
    EDIT_CLIENT, GET_CLIENT_CREDIT
} from '../constans';
import {closeModalWindow} from './modal';
import {BaseApi} from '../services/base';
import history from '../history';

export function getAllClients(params) {
    let callAPI = 'clients/';
    callAPI += params ? params : '';
    return {
        type: GET_ALL_CLIENTS,
        requestType: 'GET',
        callAPI
    }
}

export function getNextClients(page) {
    return {
        type: GET_NEXT_CLIENTS,
        requestType: 'GET',
        callAPI: `clients/?page=${page}`
    }
}

export function getClient(clientId) {
    return {
        type: GET_CLIENT,
        requestType: 'GET',
        callAPI: `clients/${clientId}/`
    }
}

export function getClientCredit(clientId) {
    return {
        type: GET_CLIENT_CREDIT,
        requestType: 'GET',
        callAPI: `clients/${clientId}/credit/`
    }
}

export function addNewClient(client, isPush = true) {
    const baseApi = new BaseApi();
    return dispatch => {
        baseApi
            .post(`clients/`, client)
            .then(response => {
                dispatch(closeModalWindow());
                if (isPush) history.push(`/clients/${response.data.id}`);
            });
    }
}

export function editClient(clientId, client) {
    const baseApi = new BaseApi();
    return dispatch => {
        baseApi
            .put(`clients/${clientId}/`, client)
            .then(response => {
                dispatch(closeModalWindow());
                dispatch({type: EDIT_CLIENT, data: response.data})
            });
    }
}
