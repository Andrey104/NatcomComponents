import {
    ADD_NEW_SUPPLIER, GET_ALL_SUPPLIERS, GET_NEXT_SUPPLIERS,
    GET_SUPPLIER_DETAIL, EDIT_SUPPLIER
} from "../constans";
import {getUrlSuppliers} from "../services/utils";

export function getAllSuppliers(text) {
    let callAPI = 'suppliers/';
    callAPI += getUrlSuppliers(null, text);
    return {
        type: GET_ALL_SUPPLIERS,
        requestType: 'GET',
        callAPI
    }
}

export function getNextSuppliers(page, text) {
    let callAPI = 'suppliers/';
    callAPI += getUrlSuppliers(page, text);
    return {
        type: GET_NEXT_SUPPLIERS,
        requestType: 'GET',
        callAPI
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