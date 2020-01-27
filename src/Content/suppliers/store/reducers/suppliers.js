import {OrderedMap, Record} from "immutable";
import {
    DELETE_SUPPLIERS_FROM_STORE,
    DELETE_SUPPLIER_FROM_STORE,
    GET_SUPPLIERS,
    SET_SUPPLIERS_FILTER,
    GET_SUPPLIER,
    ADD_NEW_SUPPLIER,
    EDIT_SUPPLIER,
    OPEN_NEW_CONTACT_WINDOW
} from "../constantsSupplier";
import {SUCCESS, START} from "../../../../constans";
import {arrToMap, objToMap} from "../../../../helpers";

const SupplierRecord = Record({
    id: undefined,
    name: undefined,
    address: undefined,
    comment: undefined,
    contacts: new OrderedMap({})
});

const ReducerState = Record({
    isLoading: false,
    searchText: null,
    hasMoreSuppliers: false,
    nextPageNumber: null,
    supplier: {},
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
        case ADD_NEW_SUPPLIER + START: {
            return supplierState.set('isLoading', true)
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
        case GET_SUPPLIER + START: {
            return supplierState.set('isLoading', true);
        }
        case GET_SUPPLIER + SUCCESS: {
            return supplierState.set('supplier', objToMap(response.data, SupplierRecord))
                .set('isLoading', false);
        }
        case EDIT_SUPPLIER + START: {
            return supplierState.set('isLoading', true);
        }
        case EDIT_SUPPLIER + SUCCESS: {
            return supplierState.set('supplier', data)
                .set('isLoading', false);
        }
        case DELETE_SUPPLIERS_FROM_STORE: {
            return defaultState;
        }
        case DELETE_SUPPLIER_FROM_STORE: {
            return supplierState.set('supplier', {});
        }
        case SET_SUPPLIERS_FILTER: {
            return supplierState.set('searchText', data);
        }
    }
    return supplierState;
}