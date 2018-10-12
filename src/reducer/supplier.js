import {
    ADD_NEW_SUPPLIER, EDIT_SUPPLIER, GET_ALL_SUPPLIERS,
    GET_NEXT_SUPPLIERS, GET_SUPPLIER_DETAIL, SUCCESS, START, FAIL
} from "../constans";
import {OrderedMap, Record} from "immutable";
import {arrToMap} from "../helpers";

const SupplierRecord = Record({
    id: undefined,
    name: undefined,
    address: undefined,
    comment: undefined
});

const ReducerState = Record({
    isLoading: false,
    loaded: false,
    hasMoreSuppliers: false,
    supplier: null,
    suppliers: new OrderedMap({})
});

const defaultState = new ReducerState();

export default (suppliersState = defaultState, actionTypeResponse) => {
    const {type, response, data} = actionTypeResponse;
    switch (type) {
        case GET_ALL_SUPPLIERS + START: {
            return suppliersState.set('isLoading', true);
        }
        case GET_ALL_SUPPLIERS + SUCCESS: {
            let nextPage, suppliers = response.data.results;
            response.data.next === null ? nextPage = false : nextPage = true;
            suppliers = arrToMap(suppliers, SupplierRecord);
            return suppliersState.set('suppliers', suppliers)
                .set('isLoading', false)
                .set('hasMoreSuppliers', nextPage);
        }
        case GET_NEXT_SUPPLIERS + SUCCESS: {
            let nextPage, newSuppliers;
            response.data.next === null ? nextPage = false : nextPage = true;
            newSuppliers = arrToMap(response.data.results, SupplierRecord);
            newSuppliers = suppliersState.suppliers.merge(newSuppliers);
            return suppliersState.set('suppliers', newSuppliers)
                .set('hasMoreSuppliers', nextPage)
                .set('loaded', true);
        }
        case ADD_NEW_SUPPLIER + SUCCESS: {
            let arr = [];
            arr.push(response.data);
            arr = arrToMap(arr, SupplierRecord);
            arr = suppliersState.suppliers.concat(arr);
            return suppliersState.set('suppliers', arr);
        }
        case GET_SUPPLIER_DETAIL + START: {
            return suppliersState.set('isLoading', true);
        }
        case GET_SUPPLIER_DETAIL + SUCCESS: {
            return suppliersState.set('supplier', response.data)
                .set('isLoading', false);
        }
        case EDIT_SUPPLIER: {
            return suppliersState.set('supplier', data);
        }
    }
    return suppliersState;
}