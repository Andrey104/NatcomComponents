import {
    GET_ALL_SUPPLIES, GET_SUPPLY, GET_NEXT_SUPPLIES,
    SUPPLY_FROM_DRAFT, SAVE_ORDER_INFO_IN_STORE, SAVE_SUPPLY_INFO_IN_STORE
} from '../constans';
import {BaseApi} from '../services/base';
import history from '../history';
import {getUrlSupplies} from "../services/utils";

export function getAllSupplies(params) {
    let callAPI = 'supplies/';
    callAPI += params ? params : '';
    return {
        type: GET_ALL_SUPPLIES,
        requestType: 'GET',
        callAPI
    }
}

export function getNextSupplies(page, supplier) {
    let callAPI = 'supplies/';
    callAPI += getUrlSupplies(page, supplier);
    return {
        type: GET_NEXT_SUPPLIES,
        requestType: 'GET',
        callAPI
    }
}

// export function saveSupplyInfoInStore(supplyInfo) {
//     return {
//         type: SAVE_SUPPLY_INFO_IN_STORE,
//         data: supplyInfo
//     }
// }

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

