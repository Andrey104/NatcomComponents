import {EDIT_STOCK, GET_ALL_STOCKS, GET_STOCK_DETAIL} from '../constans';
import {closeModalWindow} from './modal';
import {BaseApi} from '../services/base';
import history from '../history';

export function getAllStocks() {
    return {
        type: GET_ALL_STOCKS,
        requestType: 'GET',
        callAPI: 'stocks/'
    }
}

export function addNewStock(stock) {
    const baseApi = new BaseApi();
    return dispatch => {
        baseApi
            .post(`stocks/`, stock)
            .then(response => {
                history.push(`/stocks/${response.data.id}`);
                dispatch(closeModalWindow());
            });
    }
}

export function getStockDetail(stockId) {
    return {
        type: GET_STOCK_DETAIL,
        requestType: 'GET',
        callAPI: `stocks/${stockId}/`,
    }
}

export function editStock(stockId, stock) {
    const baseApi = new BaseApi();
    return dispatch => {
        baseApi
            .put(`stocks/${stockId}/`, stock)
            .then(response => {
                dispatch({type: EDIT_STOCK, data: response.data});
                dispatch(closeModalWindow());
            });
    }
}
