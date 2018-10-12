import {OrderedMap, Record} from 'immutable';
import {
    GET_ALL_CLIENTS, GET_CLIENT, GET_NEXT_CLIENTS,
    EDIT_CLIENT, START, SUCCESS
} from '../constans';
import {arrToMap} from '../helpers';

const ClientRecord = Record({
    id: undefined,
    first_name: undefined,
    last_name: undefined,
    phone1: undefined,
    phone2: undefined,
    email: undefined,
    group: undefined,
    id_from_shop: undefined,
    balance: undefined
});

const ReducerState = Record({
    isLoading: false,
    loaded: false,
    hasMoreClients: false,
    client: {},
    clients: new OrderedMap({})
});

const defaultState = new ReducerState();

export default (clientState = defaultState, actionTypeResponse) => {

    const {type, response, data} = actionTypeResponse;

    switch (type) {
        case GET_ALL_CLIENTS + START: {
            return clientState.set('isLoading', true);
        }
        case GET_ALL_CLIENTS + SUCCESS: {
            let nextPage, clients = response.data.results;
            response.data.next === null ? nextPage = false : nextPage = true;
            return clientState.set('clients', arrToMap(clients, ClientRecord))
                .set('hasMoreClients', nextPage)
                .set('loaded', true)
                .set('isLoading', false);
        }
        case GET_NEXT_CLIENTS + SUCCESS: {
            let nextPage, newClients;
            response.data.next === null ? nextPage = false : nextPage = true;
            newClients = arrToMap(response.data.results, ClientRecord);
            newClients = clientState.clients.concat(newClients);
            return clientState.set('clients', newClients)
                .set('hasMoreClients', nextPage)
                .set('loaded', true);
        }
        case GET_CLIENT + SUCCESS: {
            return clientState.set('client', response.data);
        }
        case EDIT_CLIENT: {
            return clientState.set('client', data);
        }
    }
    return clientState;
}