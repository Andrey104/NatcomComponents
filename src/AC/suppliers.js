import {
    ADD_NEW_SUPPLIER, GET_ALL_SUPPLIERS, GET_NEXT_SUPPLIERS,
    GET_SUPPLIER_DETAIL, EDIT_SUPPLIER, ADD_NEW_CONTACT, EDIT_CONTACT, DELETE_CONTACT
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

export function addNewContact(supplierId, data) {
    return {
        type: ADD_NEW_CONTACT,
        requestType: 'POST',
        callAPI: `suppliers/${supplierId}/contacts/`,
        data: data
    }
}

export function editContact(supplierId, contactId, data) {
    return {
        type: EDIT_CONTACT,
        requestType: 'PUT',
        callAPI: `suppliers/${supplierId}/contacts/${contactId}/`,
        data: data
    }
}

export function deleteContact(supplierId, contactId) {
    return {
        type: DELETE_CONTACT,
        requestType: 'DELETE',
        callAPI: `suppliers/${supplierId}/contacts/${contactId}/`
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