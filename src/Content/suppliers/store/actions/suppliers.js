import {
    ADD_NEW_SUPPLIER,
    EDIT_SUPPLIER,
    OPEN_NEW_CONTACT_WINDOW,
    SET_SUPPLIERS_FILTER,
    GET_SUPPLIERS,
    DELETE_SUPPLIERS_FROM_STORE,
    DELETE_SUPPLIER_FROM_STORE,
    GET_SUPPLIER
} from "../constantsSupplier";
import {BaseApi} from "../../../../services/base";
import {getUrlSuppliers} from "../../../../services/utils";
import history from "../../../../history";

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

export function getSupplier(supplierId) {
    return {
        type: GET_SUPPLIER,
        requestType: 'GET',
        callAPI: `suppliers/${supplierId}/`,
    }
}

// export function addNewSupplier(data) {
//     return {
//         type: ADD_NEW_SUPPLIER,
//         requestType: 'POST',
//         callAPI: `suppliers/`,
//         data: data
//     }
// }
//
// export function editSupplier(supplierId, data) {
//     return {
//         type: EDIT_SUPPLIER,
//         requestType: 'PUT',
//         data: data,
//         callAPI: `suppliers/${supplierId}/`
//     }
// }

export function addNewSupplier(supplier) {
    const baseApi = new BaseApi();
    return () => {
        baseApi
            .post(`suppliers/`, supplier)
            .then(response => history.replace(`/suppliers/${response.data.id}`));
    }
}

export function editSupplier(supplierId, supplier) {
    const baseApi = new BaseApi();
    return () => {
        baseApi
            .put(`suppliers/${supplierId}/`, supplier)
            .then(response => history.replace(`/suppliers/${response.data.id}`));
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
                    dispatch(getSupplier(supplierId))
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
                    dispatch(getSupplier(supplierId))
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
                    dispatch(getSupplier(supplierId))
                }
            });
    }
}

export function deleteSuppliersFromStore() {
    return {
        type: DELETE_SUPPLIERS_FROM_STORE
    }
}

export function deleteSupplierFromStore() {
    return {
        type: DELETE_SUPPLIER_FROM_STORE
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