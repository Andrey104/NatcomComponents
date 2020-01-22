import {
    GET_SUPPLIES,
    GET_SUPPLY,
    DELETE_SUPPLIES_FROM_STORE,
    SET_SUPPLIES_FILTER
} from '../constantsSupply';
import {BaseApi} from '../../../../services/base';
import history from '../../../../history';
import {getUrlSupplies} from "../../../../services/utils";

export function getSupplies(page, filter, update) {
    let callAPI = 'supplies/';
    callAPI += getUrlSupplies(page, filter);
    return {
        type: GET_SUPPLIES,
        data: {update},
        requestType: 'GET',
        callAPI
    }
}

export function getSupply(supplyId) {
    return {
        type: GET_SUPPLY,
        requestType: 'GET',
        callAPI: `supplies/${supplyId}/`
    }
}

export function fromDraft(supplyId) {
    const baseApi = new BaseApi();
    return dispatch => {
        baseApi
            .post(`supplies/${supplyId}/apply/`)
            .then(() => dispatch(getSupply(supplyId)));
    }
}

export function addNewSupply(supply) {
    const baseApi = new BaseApi();
    return () => {
        baseApi
            .post(`supplies/`, supply)
            .then(response => history.replace(`/supplies/${response.data.id}`));
    }
}

export function editSupply(supplyId, supply) {
    const baseApi = new BaseApi();
    return () => {
        baseApi
            .put(`supplies/${supplyId}/`, supply)
            .then(response => history.replace(`/supplies/${response.data.id}`));
    }
}

export function deleteSuppliesFromStore() {
    return {
        type: DELETE_SUPPLIES_FROM_STORE
    }
}

export function setSuppliesFilter(filter) {
    return dispatch => {
        dispatch({
            type: SET_SUPPLIES_FILTER,
            data: {filter}
        });
        dispatch(getSupplies(null, filter, true));
    }
}