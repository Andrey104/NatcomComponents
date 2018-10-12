import {BaseApi} from '../services/base';
import {GET_ALL_CUSTOM_PRICES, DELETE_CUSTOM_PRICE, EDIT_CUSTOM_PRICE} from '../constans';
import {closeModalWindow} from './modal';

export function getCustomPrices(clientId) {
    return {
        type: GET_ALL_CUSTOM_PRICES,
        requestType: 'GET',
        callAPI: `clients/${clientId}/custom_prices/`
    }
}

export function addCustomPrices(clientId, items) {
    const baseApi = new BaseApi();
    return dispatch => {
        baseApi
            .post(`clients/${clientId}/custom_prices/`, items)
            .then(() => dispatch(getCustomPrices(clientId)));
    }
}

export function deleteCustomPrice(clientId, priceId) {
    return {
        type: DELETE_CUSTOM_PRICE,
        requestType: 'DELETE',
        callAPI: `clients/${clientId}/custom_prices/${priceId}/`,
        data: priceId
    }
}

export function editCustomPrice(clientId, priceId, price) {
    const baseApi = new BaseApi();
    return dispatch => {
        baseApi
            .put(`clients/${clientId}/custom_prices/${priceId}/`, price)
            .then(response => {
                dispatch({type: EDIT_CUSTOM_PRICE, response});
                dispatch(closeModalWindow());
            })
    }
}