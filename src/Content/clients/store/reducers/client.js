import {OrderedMap, Record} from 'immutable';
import {START, SUCCESS} from '../../../../constans';
import {
    GET_CLIENTS,
    GET_CLIENT,
    GET_CLIENT_CREDIT,
    DELETE_CLIENTS_FROM_STORE,
    DELETE_CLIENT_FROM_STORE,
    SET_CLIENTS_FILTER
} from '../constantsClient';
import {arrToMap, objToMap} from '../../../../helpers';

const ClientRecord = Record({
    id: undefined,
    first_name: undefined,
    last_name: undefined,
    phone1: undefined,
    phone2: undefined,
    email: undefined,
    group: undefined,
    id_from_shop: undefined,
    orders_credit: undefined,
    balance: undefined
});

const ReducerState = Record({
    isLoading: false,
    hasMoreClients: false,
    nextPageNumber: null,
    filter: null,
    client: {},
    credit: undefined,
    clients: new OrderedMap({})
});

const defaultState = new ReducerState();

export default (clientState = defaultState, actionTypeResponse) => {

    const {type, response, data} = actionTypeResponse;

    switch (type) {
        case GET_CLIENTS + START: {
            return clientState.set('isLoading', true)
        }
        case GET_CLIENTS + SUCCESS: {
            let nextPage, newClients, nextPageNumber;
            response.data.next ? nextPage = true : nextPage = false;
            newClients = arrToMap(response.data.results, ClientRecord);
            nextPageNumber = 2;

            if (!data.update) {
                nextPageNumber = clientState.get('nextPageNumber') + 1;
                newClients = clientState.clients.merge(newClients);
            }

            return clientState.set('clients', newClients)
                .set('nextPageNumber', nextPageNumber)
                .set('hasMoreClients', nextPage)
                .set('isLoading', false);
        }
        case GET_CLIENT + SUCCESS: {
            return clientState.set('client', response.data);
        }
        case GET_CLIENT_CREDIT + SUCCESS: {
            return clientState.set('credit', response.data);
        }
        case SET_CLIENTS_FILTER: {
            return clientState.set('filter', data.filter);
        }
        case DELETE_CLIENTS_FROM_STORE: {
            return defaultState;
        }
        case DELETE_CLIENT_FROM_STORE: {
            return clientState.set('client', {});
        }
    }
    return clientState;
}