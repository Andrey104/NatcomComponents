import {OrderedMap, Record} from 'immutable';
import {
    GET_ALL_ORDERS,
    GET_NEXT_ORDERS,
    SAVE_ORDER_INFO_IN_STORE,
    GET_ORDER,
    SUCCESS,
    START,
    SAVE_HARPOON_IN_ORDER,
    EDIT_HARPOON_IN_ORDER, SET_ITEM_DIALOG_STATE, RESET_ORDERS_PAGE, INCREMENT_ORDERS_PAGE, SET_ORDERS_DATE
} from '../constans';
import {arrToMap} from '../helpers';

const OrderRecord = Record({
    id: undefined,
    items: undefined,
    freePositions: undefined,
    services: undefined,
    harpoons: undefined,
    payments: undefined,
    auto_date: undefined,
    date: undefined,
    source: undefined,
    status: undefined,
    payment_status: undefined,
    sum: undefined,
    prepayment: undefined,
    comment: undefined,
    client: undefined,
    stock: undefined,
    return_order: undefined
});

const ReducerState = Record({
    isLoading: false,
    loaded: false,
    hasMoreOrders: false,
    order: {},
    orderSave: undefined,
    itemDialogIsProducts: true,
    nextPageNumber: null,
    date: null,
    orders: new OrderedMap({})
});

const defaultState = new ReducerState();

export default (orderState = defaultState, actionTypeResponse) => {

    const {type, response, data} = actionTypeResponse;

    switch (type) {
        case GET_ALL_ORDERS + START: {
            return orderState.set('isLoading', true);
        }
        case GET_ALL_ORDERS + SUCCESS: {
            let nextPage, orders = response.data.results;
            response.data.next === null ? nextPage = false : nextPage = true;
            return orderState.set('orders', arrToMap(orders, OrderRecord))
                .set('nextPageNumber', 2)
                .set('hasMoreOrders', nextPage)
                .set('loaded', true)
                .set('isLoading', false);
        }
        case GET_NEXT_ORDERS + SUCCESS: {
            let nextPage, newOrders;
            response.data.next === null ? nextPage = false : nextPage = true;
            newOrders = arrToMap(response.data.results, OrderRecord);
            let nextPageNumber = orderState.get('nextPageNumber');
            return orderState.update('orders', orders => orders.concat(newOrders))
                .set('hasMoreOrders', nextPage)
                .set('nextPageNumber', nextPageNumber += 1)
                .set('loaded', true);
        }
        case GET_ORDER + START: {
            return orderState.set('isLoading', true);
        }
        case GET_ORDER + SUCCESS: {
            return orderState.set('order', response.data)
                .set('isLoading', false);
        }
        case SAVE_ORDER_INFO_IN_STORE: {
            return orderState.set('orderSave', data);
        }
        case SAVE_HARPOON_IN_ORDER: {
            let arr = orderState.orderSave.harpoons;
            arr.push(data);
            orderState.orderSave.harpoons = arr;
            return orderState.set('orderSave', orderState.orderSave);
        }
        case EDIT_HARPOON_IN_ORDER: {
            const {harpoonId, newHarpoon} = data;
            let arr = orderState.orderSave.harpoons;
            arr = arr.map(orderHarpoon => {
                if (orderHarpoon.id === harpoonId) {
                    return newHarpoon;
                }
                return orderHarpoon;
            });
            orderState.orderSave.harpoons = arr;
            return orderState.set('orderSave', orderState.orderSave);
        }
        case SET_ITEM_DIALOG_STATE: {
            const {isProducts} = data;
            return orderState.set('itemDialogIsProducts', isProducts);
        }

        case SET_ORDERS_DATE: {
            const {date} = data;
            return orderState.set('date', date);
        }
    }

    return orderState;
}