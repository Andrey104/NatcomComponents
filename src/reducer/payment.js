import {OrderedMap, Record} from 'immutable';
import {
    CLEAR_PAYMENT_ADD_DATA,
    GET_ALL_PAYMENTS,
    GET_NEXT_PAYMENTS,
    GET_PAYMENTS_SUM, SET_PAYMENT_ADD_DATA,
    SET_PAYMENT_FILTER_PARAMS,
    START,
    SUCCESS
} from '../constans';
import {arrToMap} from '../helpers';

const PaymentRecord = Record({
    id: undefined,
    auto_date: undefined,
    client: undefined,
    payment_type: undefined,
    type: undefined,
    sum: undefined,
    comment: undefined
});

const ReducerState = Record({
    paymentAddData: undefined,
    isLoading: false,
    loaded: false,
    hasMorePayments: false,
    payment: undefined,
    nextPageNumber: null,
    date: null,
    searchText: null,
    paymentType: null,
    paymentStatistics: {
        cash : null,
        no_cahs: null,
        terminal: null,
        natcom: null,
        sum: null
    },
    payments: new OrderedMap({})
});

const defaultState = new ReducerState();

export default (paymentState = defaultState, actionTypeResponse) => {

    const {type, response, data} = actionTypeResponse;

    switch (type) {
        case GET_ALL_PAYMENTS + START: {
            return paymentState.set('isLoading', true);
        }
        case GET_ALL_PAYMENTS + SUCCESS: {
            let nextPage, payments = response.data.results;
            nextPage = !(response.data.next === null);
            return paymentState.set('payments', arrToMap(payments, PaymentRecord))
                .set('hasMorePayments', nextPage)
                .set('loaded', true)
                .set('nextPageNumber', 2)
                .set('isLoading', false);
        }
        case GET_NEXT_PAYMENTS + SUCCESS: {
            let nextPage, newPayments;
            response.data.next === null ? nextPage = false : nextPage = true;
            newPayments = arrToMap(response.data.results, PaymentRecord);
            let nextPageNumber = paymentState.get('nextPageNumber');
            return paymentState.update('payments', payments => payments.concat(newPayments))
                .set('hasMorePayments', nextPage)
                .set('nextPageNumber', nextPageNumber += 1)
                .set('loaded', true);
        }
        case SET_PAYMENT_FILTER_PARAMS: {
            const {date, searchText, paymentType} = data;
            return paymentState.set('date', date)
                .set('searchText', searchText)
                .set('paymentType', paymentType)
        }
        case GET_PAYMENTS_SUM + SUCCESS:
            return paymentState.set('paymentStatistics', response.data)
                .set('isLoading', false);

        case SET_PAYMENT_ADD_DATA:
            return paymentState.set('paymentAddData', data);

        case CLEAR_PAYMENT_ADD_DATA:
            return paymentState.set('paymentAddData', undefined);
    }

    return paymentState;
}