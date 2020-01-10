import {OrderedMap, Record} from 'immutable';
import {
    GET_SUPPLIES,
    GET_SUPPLY,
    SUPPLY_FROM_DRAFT,
    START,
    SUCCESS,
    DELETE_SUPPLIES_FROM_STORE,
    SET_SUPPLIES_FILTER
} from '../constans';
import {arrToMap} from '../helpers';

const SupplyRecord = Record({
    id: undefined,
    supplier: undefined,
    user: undefined,
    comment: undefined,
    status: undefined,
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
            return supplyState.set('supply', response.data)
                .set('isLoading', false);
        }
        case SUPPLY_FROM_DRAFT + SUCCESS: {
            // Не работает
            let newSupply = supplyState.supply;
            newSupply.set('draft', false);
            return supplyState.set('supply', newSupply);
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