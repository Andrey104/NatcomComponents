import {BaseApi} from '../services/base';
import history from '../history';
import {GET_ALL_PAYMENTS, GET_NEXT_PAYMENTS, GET_PAYMENT, SET_PAYMENT_FILTER_PARAMS} from '../constans';
import {getUrlPayments} from "../services/utils";

export function getAllPayments(date, searchText) {
    let callAPI = 'external_payments/';
    callAPI += getUrlPayments(date, searchText);
    return {
        type: GET_ALL_PAYMENTS,
        requestType: 'GET',
        callAPI
    }
}

export function getNextPayments(page, date, searchText) {
    let callAPI = 'external_payments/';
    callAPI += getUrlPayments(date, searchText, page);
    return {
        type: GET_NEXT_PAYMENTS,
        requestType: 'GET',
        callAPI
    }
}

export function addNewPayment(payment) {
    const baseApi = new BaseApi();
    return () => {
        baseApi
            .post(`external_payments/`, payment)
    }
}


export function setFilterParams(date, searchText) {
    return {
        type: SET_PAYMENT_FILTER_PARAMS,
        data: {date, searchText}
    }
}
