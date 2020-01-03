import {OrderedMap, Record} from 'immutable';
import {
    GET_ALL_SUPPLIES,
    GET_NEXT_SUPPLIES,
    GET_SUPPLY,
    SUPPLY_FROM_DRAFT,
    START,
    SUCCESS,
    DELETE_SUPPLIES_FROM_STORE,
    SET_SUPPLIES_DATE,
    SET_SUPPLIES_FILTER
} from '../constans';
import {arrToMap} from '../helpers';

const SupplyRecord = Record({
    id: undefined,
    supplier: undefined,
    user: undefined,
    auto_document: undefined,
    document: undefined,
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
    loaded: false,
    hasMoreSupplies: false,
    nextPageNumber: null,
    supply: {},
    date: null,
    text: null,
    supplies: new OrderedMap({})
});

const defaultState = new ReducerState();

export default (supplyState = defaultState, actionTypeResponse) => {

    const {type, response, data} = actionTypeResponse;

    switch (type) {
        case GET_ALL_SUPPLIES + START: {
            return supplyState.set('isLoading', true);
        }
        case GET_ALL_SUPPLIES + SUCCESS: {
            let nextPage, supplies = response.data.results;
            response.data.next === null ? nextPage = false : nextPage = true;
            return supplyState.set('supplies', arrToMap(supplies, SupplyRecord))
                .set('nextPageNumber', 2)
                .set('hasMoreSupplies', nextPage)
                .set('loaded', true)
                .set('isLoading', false);
        }
        case GET_NEXT_SUPPLIES + SUCCESS: {
            let nextPage, newSupplies;
            response.data.next === null ? nextPage = false : nextPage = true;
            newSupplies = arrToMap(response.data.results, SupplyRecord);
            let nextPageNumber = supplyState.get('nextPageNumber');
            return supplyState.update('supplies', supplies => supplies.concat(newSupplies))
                .set('hasMoreSupplies', nextPage)
                .set('nextPageNumber', nextPageNumber += 1)
                .set('loaded', true)
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
        case SET_SUPPLIES_DATE: {
            const {date} = data;
            return supplyState.set('date', date);
        }
        case SET_SUPPLIES_FILTER: {     //
            const {text} = data;
            return supplyState.set('text', text)
        }
    }

    return supplyState;
}