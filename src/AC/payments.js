import {BaseApi} from '../services/base';
import history from '../history';
import {
    CLEAR_PAYMENT_ADD_DATA,
    GET_ALL_PAYMENTS,
    GET_NEXT_PAYMENTS,
    GET_PAYMENT,
    GET_PAYMENTS_SUM, PAYMENT_CLIENT_ADD_MODAL, SET_PAYMENT_ADD_DATA,
    SET_PAYMENT_FILTER_PARAMS,
    SET_PAYMENT_TYPE_FILTER_PARAMS
} from '../constans';
import {getUrlPayments} from "../services/utils";
import {openModalWindow} from "./modal";
import {getClient} from "./clients";
import {getOrder} from "./orders";

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

export function addNewPayment(payment, order) {
    const baseApi = new BaseApi();
    return dispatch => {
        baseApi
            .post(`external_payments/`, payment)
            .then(response => {
                if (order) {
                    dispatch(getOrder(order.id));
                } else {
                    dispatch(getClient(payment.client));
                }
            });
    }
}


export function setFilterParams(date, searchText, paymentType) {
    return {
        type: SET_PAYMENT_FILTER_PARAMS,
        data: {date, searchText, paymentType}
    }
}

export function getPaymentsSum(date, paymentType) {
    let callAPI = 'components/external_payments/sum';
    callAPI += getUrlPayments(date, null, paymentType);
    return {
        type: GET_PAYMENTS_SUM,
        requestType: 'GET',
        callAPI
    }
}

export function setPaymentAddData(data) {
    return {
        type: SET_PAYMENT_ADD_DATA,
        data: data
    }
}

export function clearPaymentAddData(data) {
    return {
        type: CLEAR_PAYMENT_ADD_DATA,
        data: data
    }
}


export function openPaymentAddClientModal(data) {
    return dispatch => {
        dispatch(setPaymentAddData(data));
        dispatch(openModalWindow(PAYMENT_CLIENT_ADD_MODAL));
    }
}


