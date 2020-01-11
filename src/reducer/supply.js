import {OrderedMap, Record} from 'immutable';
import {
    GET_SUPPLIES,
    GET_SUPPLY,
    START,
    SUCCESS,
    DELETE_SUPPLIES_FROM_STORE,
    SET_SUPPLIES_FILTER
} from '../constans';
import {arrToMap, objToMap} from '../helpers';

const SupplyRecord = Record({
    id: undefined,
    supplier: undefined,
    user: undefined,
    comment: undefined,
    auto_date: undefined,
    draft: undefined,
    date: undefined,
    cost: undefined,
    items: undefined
});

const ReducerState = Record({
    isLoading: false,
    hasMoreSupplies: false,
    supply: {},
    nextPageNumber: null,
    filter: {
        date: null,
        text: null,
        supplierId: null
    },
    supplies: new OrderedMap({})
});

const defaultState = new ReducerState();

export default (supplyState = defaultState, actionTypeResponse) => {

    const {type, response, data} = actionTypeResponse;

    switch (type) {
        case GET_SUPPLIES + START: {
            return supplyState.set('isLoading', true);
        }
        case GET_SUPPLIES + SUCCESS: {
            let nextPage, newSupplies, nextPageNumber;
            response.data.next ? nextPage = true : nextPage = false;
            newSupplies = arrToMap(response.data.results, SupplyRecord);
            nextPageNumber = 2;

            if (!data.update) {
                nextPageNumber = supplyState.get('nextPageNumber') + 1;
                newSupplies = supplyState.supplies.merge(newSupplies);
            }

            return supplyState.set('supplies', newSupplies)
                .set('nextPageNumber', nextPageNumber)
                .set('hasMoreSupplies', nextPage)
                .set('isLoading', false);
        }
        case GET_SUPPLY + START: {
            return supplyState.set('isLoading', true);
        }
        case GET_SUPPLY + SUCCESS: {
            return supplyState.set('supply', objToMap(response.data, SupplyRecord))
                .set('isLoading', false);
        }
        case DELETE_SUPPLIES_FROM_STORE : {
            return defaultState;
        }
        case SET_SUPPLIES_FILTER: {
            return supplyState.set('filter', data.filter)
        }
    }

    return supplyState;
}