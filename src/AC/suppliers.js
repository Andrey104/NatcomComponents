import {
    ADD_NEW_SUPPLIER,
    GET_SUPPLIER_DETAIL,
    EDIT_SUPPLIER,
    OPEN_NEW_CONTACT_WINDOW,
} from "../constans";
import {getUrlSuppliers} from "../services/utils";
import {BaseApi} from "../services/base";
import {SET_SUPPLIERS_FILTER, GET_SUPPLIERS, DELETE_SUPPLIERS_FROM_STORE} from "../Content/suppliers/store/constantsSupplier";

export function getSuppliers(page, text, update) {
    let callAPI = 'suppliers/';
    callAPI += getUrlSuppliers(page, text);
    return {
        type: GET_SUPPLIERS,
        data: {update},
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

export function deleteSuppliersFromStore() {
    return {
        type: DELETE_SUPPLIERS_FROM_STORE
    }
}

export function setSuppliersFilter(filter) {
    return dispatch => {
        dispatch({
            type: SET_SUPPLIERS_FILTER,
            data: filter
        });
        dispatch(getSuppliers(null, filter, true));
    }
}