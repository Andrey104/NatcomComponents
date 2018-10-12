import {BaseApi} from '../services/base';
import history from '../history';
import {GET_ALL_PAYMENTS, GET_NEXT_PAYMENTS, GET_PAYMENT} from '../constans';

export function getAllPayments(params) {
    let callAPI = 'external_payments/';
    callAPI += params ? params : '';
    return {
        type: GET_ALL_PAYMENTS,
        requestType: 'GET',
        callAPI
    }
}

export function getNextPayments(page) {
    return {
        type: GET_NEXT_PAYMENTS,
        requestType: 'GET',
        callAPI: `external_payments/?page=${page}`
    }
}

export function addNewPayment(payment) {
    const baseApi = new BaseApi();
    return () => {
        baseApi
            .post(`external_payments/`, payment)
            .then(() => history.replace(`/clients/${payment.client}`))
    }
}