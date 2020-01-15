import {
    ADD_NEW_SUPPLIER, EDIT_SUPPLIER, GET_SUPPLIER_DETAIL, SUCCESS, START, OPEN_NEW_CONTACT_WINDOW
} from "../constans";
import {OrderedMap, Record} from "immutable";
import {arrToMap} from "../helpers";
import {DELETE_SUPPLIERS_FROM_STORE, GET_SUPPLIERS, SET_SUPPLIERS_FILTER} from "../Content/suppliers/store/constantsSupplier";

const SupplierRecord = Record({
    id: undefined,
    name: undefined,
    address: undefined,
    comment: undefined,
    contacts: undefined
});

const ReducerState = Record({
    isLoading: false,
    text: null,
    hasMoreSuppliers: false,
    nextPageNumber: null,
    supplier: null,
    suppliers: new OrderedMap({}),
    openAddNewContact: false,
    isEdit: false,
    contact: {}
});

const defaultState = new ReducerState();

export default (supplierState = defaultState, actionTypeResponse) => {
    const {type, response, data} = actionTypeResponse;
    switch (type) {
        case GET_SUPPLIERS + START: {
            return supplierState.set('isLoading', true);
        }
        case GET_SUPPLIERS + SUCCESS: {
            let nextPage, newSuppliers, nextPageNumber;
            response.data.next ? nextPage = true : nextPage = false;
            newSuppliers = arrToMap(response.data.results, SupplierRecord);
            nextPageNumber = 2;

            if (!data.update) {
                nextPageNumber = supplierState.get('nextPageNumber') + 1;
                newSuppliers = supplierState.suppliers.merge(newSuppliers);
            }

            return supplierState.set('suppliers', newSuppliers)
                .set('nextPageNumber', nextPageNumber)
                .set('hasMoreSuppliers', nextPage)
                .set('isLoading', false);
        }
        case ADD_NEW_SUPPLIER + SUCCESS: {
            let arr = [];
            arr.push(response.data);
            arr = arrToMap(arr, SupplierRecord);
            arr = supplierState.suppliers.concat(arr);
            return supplierState.set('suppliers', arr);
        }
        case OPEN_NEW_CONTACT_WINDOW: {
            return supplierState
                .set('openAddNewContact', data.isOpen)
                .set('isEdit', data.isEdit)
                .set('contact', data.contact)
        }
        case GET_SUPPLIER_DETAIL + START: {
            return supplierState.set('isLoading', true);
        }
        case GET_SUPPLIER_DETAIL + SUCCESS: {
            return supplierState.set('supplier', response.data)
                .set('isLoading', false);
        }
        case EDIT_SUPPLIER: {
            return supplierState.set('supplier', data);
        }
        case DELETE_SUPPLIERS_FROM_STORE: {
            return defaultState;
        }
        case SET_SUPPLIERS_FILTER: {
            return supplierState.set('text', data);
        }
    }
    return supplierState;
}