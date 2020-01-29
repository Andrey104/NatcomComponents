import {
    GET_CLIENTS,
    GET_CLIENT,
    GET_CLIENT_CREDIT,
    DELETE_CLIENTS_FROM_STORE,
    DELETE_CLIENT_FROM_STORE,
    SET_CLIENTS_FILTER
} from '../constantsClient';
import {closeModalWindow} from '../../../../AC/modal';
import {BaseApi} from '../../../../services/base';
import history from '../../../../history';
import {getUrlClients} from "../../../../services/utils";

export function getClients(page, filter, update) {
    let callAPI = 'clients/';
    callAPI += getUrlClients(page, filter);
    return {
        type: GET_CLIENTS,
        data: {update},
        requestType: 'GET',
        callAPI
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
    return () => {
        baseApi
            .put(`clients/${clientId}/`, client)
            .then(response => history.replace(`/clients/${response.data.id}`));
    }
}

export function setClientsFilter(filter) {
    return dispatch => {
        dispatch({
            type: SET_CLIENTS_FILTER,
            data: filter
        });
        dispatch(getClients(null, filter, true));
    }
}

export function deleteClientsFromStore() {
    return {
        type: DELETE_CLIENTS_FROM_STORE
    }
}

export function deleteClientFromStore() {
    return {
        type: DELETE_CLIENT_FROM_STORE
    }
}