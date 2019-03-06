import {BaseApi} from '../services/base';
import history from '../history';
import {
    GET_ALL_PAYMENTS, GET_NEXT_PAYMENTS, GET_PAYMENT, GET_PAYMENTS_SUM, SET_PAYMENT_FILTER_PARAMS,
    SET_PAYMENT_TYPE_FILTER_PARAMS
} from '../constans';
import {getUrlPayments} from "../services/utils";

export function getAllPayments(date, searchText, paymentType) {
    let callAPI = 'external_payments/';
    callAPI += getUrlPayments(date, searchText, paymentType);
    return {
        type: GET_ALL_PAYMENTS,
        requestType: 'GET',
        callAPI
    }
}

export function getNextPayments(page, date, searchText, paymentType) {
    let callAPI = 'external_payments/';
    callAPI += getUrlPayments(date, searchText, paymentType, page);
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


export function setFilterParams(date, searchText, paymentType) {
    return {
        type: SET_PAYMENT_FILTER_PARAMS,
        data: {date, searchText, paymentType}
    }
}

export function getPaymentsSum(date, paymentType) {
    let callAPI = 'statistics/external_payments/sum';
    callAPI += getUrlPayments(date, null, paymentType);
    return {
        type: GET_PAYMENTS_SUM,
        requestType: 'GET',
        callAPI
    }
}
