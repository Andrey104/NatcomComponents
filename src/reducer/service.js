import {
    GET_ALL_SERVICES, GET_NEXT_SERVICES, GET_SERVICE,
    START, SUCCESS, FAIL
} from '../constans';
import {OrderedMap, Record} from 'immutable';
import {arrToMap} from '../helpers';

const ServiceRecord = Record({
    id: undefined,
    name: undefined,
    type: undefined,
    price: undefined,
    price_standard: undefined,
    price_good: undefined,
    price_best: undefined
});

const ReducerState = Record({
    isLoading: false,
    loaded: false,
    hasMoreEntries: false,
    service: undefined,
    entries: new OrderedMap({})
});

const defaultState = new ReducerState();

export default (servicesState = defaultState, actionTypeResponse) => {
    const {type, response} = actionTypeResponse;
    let nextPage;

    switch (type) {
        case GET_ALL_SERVICES + START:
            return servicesState.set('isLoading', true);

        case GET_ALL_SERVICES + SUCCESS:
            let services = response.data.results;
            nextPage = response.data.next !== null;
            return servicesState.set('entries', arrToMap(services, ServiceRecord))
                .set('hasMoreEntries', nextPage)
                .set('loaded', true)
                .set('isLoading', false);

        case GET_NEXT_SERVICES + SUCCESS:
            nextPage = response.data.next !== null;
            let newServices = arrToMap(response.data.results, ServiceRecord);
            newServices = services.entries.concat(newServices);

            return servicesState.set('entries', newServices)
                .set('hasMoreEntries', nextPage)
                .set('loaded', true);

        case GET_SERVICE + START:
            return servicesState.set('isLoading', true);

        case GET_SERVICE + SUCCESS:
            return servicesState.set('service', response.data)
                .set('isLoading', false);

    }
    return servicesState;
}
