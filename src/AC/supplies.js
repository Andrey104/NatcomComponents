import {
    GET_ALL_SUPPLIES,
    GET_SUPPLY,
    GET_NEXT_SUPPLIES,
    SUPPLY_FROM_DRAFT,
    SAVE_ORDER_INFO_IN_STORE,
    DELETE_PRODUCTS_FROM_STORE,
    DELETE_SUPPLIES_FROM_STORE,

    SET_SUPPLIES_DATE, SET_ORDERS_DATE

} from '../constans';
import {BaseApi} from '../services/base';
import history from '../history';
import {getUrlSuppliers, getUrlSupplies} from "../services/utils";

export function getAllSupplies(params) {
    let callAPI = 'supplies/';
    callAPI += params ? params : '';
    return {
        type: GET_ALL_SUPPLIES,
        requestType: 'GET',
        callAPI
    }
}

// export function getAllSupplies(supplier) {
//     let callAPI = 'supplies/';
//     callAPI += getUrlSupplies(null, supplier);
//     return {
//         type: GET_ALL_SUPPLIES,
//         requestType: 'GET',
//         callAPI
//     }
// }


export function getNextSupplies(page, supplier, date) {
    let callAPI = 'supplies/';
    callAPI += getUrlSupplies(page, supplier, date);
    return {
        type: GET_NEXT_SUPPLIES,
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

export function setSuppliesDate(date) {
    return {
        type: SET_SUPPLIES_DATE,
        data: {date}
    }
}