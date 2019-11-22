import {
    ADD_NEW_SUPPLIER,
    GET_ALL_SUPPLIERS,
    GET_NEXT_SUPPLIERS,
    GET_SUPPLIER_DETAIL,
    EDIT_SUPPLIER, OPEN_NEW_CONTACT_WINDOW
} from "../constans";
import {getUrlSuppliers} from "../services/utils";
import {BaseApi} from "../services/base";
import {getOrder} from "./orders";

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

export function openAddNewContactWindow(data) {
    return {
        type: OPEN_NEW_CONTACT_WINDOW,
        data: data
    };
}

export function addNewContact(supplierId, data) {
    const baseApi = new BaseApi();
    return dispatch => {
        baseApi
            .post(`suppliers/${supplierId}/contacts/`, data)
            .then(response => {
                if (response.status === 201) {
                    dispatch(getSupplierDetail(supplierId))
                }
            });
    }
}

export function editContact(supplierId, contactId, data) {
    const baseApi = new BaseApi();
    return dispatch => {
        baseApi
            .put(`suppliers/${supplierId}/contacts/${contactId}/`, data)
            .then(response => {
                if (response.status === 200) {
                    dispatch(getSupplierDetail(supplierId))
                }
            });
    }
}

export function deleteContact(supplierId, contactId) {
    const baseApi = new BaseApi();
    return dispatch => {
        baseApi
            .deleteRequest(`suppliers/${supplierId}/contacts/${contactId}/`)
            .then(response => {
                if (response.status === 204) {
                    dispatch(getSupplierDetail(supplierId))
                }
            });
    }
}

export function addPaymentInOrder(data, orderId) {
    const baseApi = new BaseApi();
    return dispatch => {
        baseApi
            .post(`orders/${orderId}/pay/`, data)
            .then(response => {
                if (response.status === 201) {
                    dispatch(getOrder(orderId));
                }
            });
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