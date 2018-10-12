import {OrderedMap, Record} from 'immutable';
import {
    GET_ALL_CUSTOM_PRICES,
    DELETE_CUSTOM_PRICE,
    EDIT_CUSTOM_PRICE,
    START,
    SUCCESS
} from '../constans';
import {arrToMap} from '../helpers';

const PriceRecord = Record({
    id: undefined,
    item: undefined,
    price: undefined
});

const ReducerState = Record({
    isLoading: false,
    loaded: false,
    hasMorePrices: false,
    price: undefined,
    prices: new OrderedMap({})
});

const defaultState = new ReducerState();

export default (priceState = defaultState, actionTypeResponse) => {

    const {type, response, data} = actionTypeResponse;

    switch (type) {
        case GET_ALL_CUSTOM_PRICES + START: {
            return priceState.set('isLoading', true);
        }
        case GET_ALL_CUSTOM_PRICES + SUCCESS: {
            let nextPage, prices = response.data.results;
            response.data.next === null ? nextPage = false : nextPage = true;
            return priceState.set('prices', arrToMap(prices, PriceRecord))
                .set('hasMorePrices', nextPage)
                .set('loaded', true)
                .set('isLoading', false);
        }
        case DELETE_CUSTOM_PRICE + SUCCESS: {
            return priceState.deleteIn(['prices', data]);
        }
        case EDIT_CUSTOM_PRICE: {
            const newPrice = response.data;
            return priceState.updateIn(['prices', newPrice.id], price => price = newPrice);
        }
    }

    return priceState;

}