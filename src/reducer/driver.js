import {
    GET_ALL_DRIVERS, GET_NEXT_DRIVERS, GET_DRIVER,
    START, SUCCESS, FAIL, GET_CLIENT
} from '../constans';
import {OrderedMap, Record} from 'immutable';
import {arrToMap} from '../helpers';

const DriverRecord = Record({
    id: undefined,
    first_name: undefined,
    last_name: undefined,
    phone: undefined
});

const ReducerState = Record({
    isLoading: false,
    loaded: false,
    hasMoreEntries: false,
    driver: undefined,
    entries: new OrderedMap({})
});

const defaultState = new ReducerState();

export default (driverState = defaultState, actionTypeResponse) => {
    const {type, response, data} = actionTypeResponse;
    let nextPage;

    switch (type) {
        case GET_ALL_DRIVERS + START:
            return driverState.set('isLoading', true);

        case GET_ALL_DRIVERS + SUCCESS:
            let drivers = response.data.results;
            response.data.next === null ? nextPage = false : nextPage = true;

            return driverState.set('entries', arrToMap(drivers, DriverRecord))
                .set('hasMoreEntries', nextPage)
                .set('loaded', true)
                .set('isLoading', false);

        case GET_NEXT_DRIVERS + SUCCESS:
            let newDrivers;
            response.data.next === null ? nextPage = false : nextPage = true;
            newDrivers = arrToMap(response.data.results, DriverRecord);
            newDrivers = driverState.entries.concat(newDrivers);

            return driverState.set('entries', newDrivers)
                .set('hasMoreEntries', nextPage)
                .set('loaded', true);

        case GET_DRIVER + START:
            return driverState.set('isLoading', true);

        case GET_DRIVER + SUCCESS:
            return driverState.set('driver', response.data)
                .set('isLoading', false);

    }
    return driverState;
}
