import {
    GET_ALL_STOCKS,
    GET_STOCK_DETAIL,
    EDIT_STOCK,
    START, SUCCESS
} from '../constans';
import {Record, OrderedMap} from 'immutable';
import {arrToMap} from '../helpers';

const StockRecord = Record({
    id: undefined,
    name: undefined,
    address: undefined,
    main: undefined
});

const ReducerState = Record({
    isLoading: false,
    loaded: false,
    stock: {},
    stocks: new OrderedMap({})
});

const defaultState = new ReducerState();

export default (stockState = defaultState, actionTypeResponse) => {
    const {type, response, data} = actionTypeResponse;

    switch (type) {
        case GET_ALL_STOCKS + SUCCESS: {
            const stocks = response.data;
            return stockState.set('stocks', arrToMap(stocks, StockRecord))
                .set('loaded', true)
                .set('isLoading', false);
        }
        case GET_ALL_STOCKS + START: {
            return stockState.set('isLoading', true);
        }
        case GET_STOCK_DETAIL + START: {
            return stockState.set('isLoading', true)
        }
        case GET_STOCK_DETAIL + SUCCESS: {
            return stockState.set('stock', response.data)
                .set('loaded', true)
                .set('isLoading', false);
        }
        case EDIT_STOCK: {
            return stockState.set('stock', data);
        }
    }
    return stockState;
}