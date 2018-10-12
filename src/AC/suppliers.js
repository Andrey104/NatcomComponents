import {
    ADD_NEW_SUPPLIER, GET_ALL_SUPPLIERS, GET_NEXT_SUPPLIERS,
    GET_SUPPLIER_DETAIL, EDIT_SUPPLIER
} from "../constans";

export function getAllSuppliers(params) {
    let callAPI = 'suppliers/';
    callAPI += params ? params : '';
    return {
        type: GET_ALL_SUPPLIERS,
        requestType: 'GET',
        callAPI
    }
}

export function getNextSuppliers(page) {
    return {
        type: GET_NEXT_SUPPLIERS,
        requestType: 'GET',
        callAPI: `suppliers/?page=${page}`
    }
}

export function addNewSupplier(data) {
    return {
        type: ADD_NEW_SUPPLIER,
        requestType: 'POST',
        callAPI: `suppliers/`,
        data: data
    }
}

export function getSupplierDetail(supplierId) {
    return {
        type: GET_SUPPLIER_DETAIL,
        requestType: 'GET',
        callAPI: `suppliers/${supplierId}/`,
    }
}

export function editSupplier(data) {
    return {
        type: EDIT_SUPPLIER,
        data: data
    }
}