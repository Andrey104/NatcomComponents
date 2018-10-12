import {
    GET_ALL_ORDERS,
    GET_NEXT_ORDERS,
    GET_ORDER,
    SAVE_ORDER_INFO_IN_STORE,
    EDIT_HARPOON_IN_ORDER
} from '../constans';
import {BaseApi} from '../services/base';
import {closeModalWindow} from './modal';
import history from '../history';

export function getAllOrders(params) {
    let callAPI = 'orders/';
    callAPI += params ? params : '';
    return {
        type: GET_ALL_ORDERS,
        requestType: 'GET',
        callAPI
    }
}

export function getNextOrders(page) {
    return {
        type: GET_NEXT_ORDERS,
        requestType: 'GET',
        callAPI: `orders/?page=${page}`
    }
}

export function getOrder(orderId) {
    return {
        type: GET_ORDER,
        requestType: 'GET',
        callAPI: `orders/${orderId}/`
    }
}

export function saveOrderInfoInStore(orderInfo) {
    return {
        type: SAVE_ORDER_INFO_IN_STORE,
        data: orderInfo
    }
}

export function changeOrderStatus(changeUrl, orderId) {
    const baseApi = new BaseApi();
    return dispatch => {
        baseApi
            .post(`orders/${orderId}/${changeUrl}/`)
            .then(response => {
                if (response.status === 200) {
                    dispatch(getOrder(orderId));
                }
            });
    }
}

export function addPaymentInOrder(data, orderId) {
    const baseApi = new BaseApi();
    return dispatch => {
        baseApi
            .post(`orders/${orderId}/pay/`, data)
            .then(() => {
                dispatch(getOrder(orderId));
                dispatch(closeModalWindow());
            });
    }
}

export function rejectOrder(orderId) {
    const baseApi = new BaseApi();
    return dispath => {
        baseApi
            .delete(`orders/${orderId}/`)
            .then(() => {
                dispath(closeModalWindow());
                dispath(history.push(`/orders`));
            });
    }
}

export function addNewOrder(order) {
    const baseApi = new BaseApi();
    return () => {
        baseApi
            .post(`orders/`, order)
            .then(response => history.replace(`/orders/${response.data.id}`));
    }
}

export function editOrder(orderId, order) {
    const baseApi = new BaseApi();
    return () => {
        baseApi
            .put(`orders/${orderId}/`, order)
            .then(response => history.replace(`/orders/${response.data.id}`))
    }
}

export function editOrderHarpoon(harpoonId, newHarpoon) {
    return {
        type: EDIT_HARPOON_IN_ORDER,
        data: {harpoonId, newHarpoon}
    }
}