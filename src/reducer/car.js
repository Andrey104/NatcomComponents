import {
    GET_ALL_CARS, GET_NEXT_CARS, GET_CAR,
    START, SUCCESS, FAIL
} from '../constans';
import {OrderedMap, Record} from 'immutable';
import {arrToMap} from '../helpers';

const CarRecord = Record({
    id: undefined,
    name: undefined,
    number: undefined,
    driver: undefined
});

const ReducerState = Record({
    isLoading: false,
    loaded: false,
    hasMoreEntries: false,
    car: undefined,
    entries: new OrderedMap({})
});

const defaultState = new ReducerState();

export default (carState = defaultState, actionTypeResponse) => {
    const {type, response} = actionTypeResponse;
    let nextPage;

    switch (type) {
        case GET_ALL_CARS + START:
            return carState.set('isLoading', true);

        case GET_ALL_CARS + SUCCESS:
            let cars = response.data.results;
            nextPage = response.data.next !== null;

            return carState.set('entries', arrToMap(cars, CarRecord))
                .set('hasMoreEntries', nextPage)
                .set('loaded', true)
                .set('isLoading', false);

        case GET_NEXT_CARS + SUCCESS:
            let newCars;
            nextPage = response.data.next !== null;
            newCars = arrToMap(response.data.results, CarRecord);
            newCars = carState.entries.concat(newCars);

            return carState.set('entries', newCars)
                .set('hasMoreEntries', nextPage)
                .set('loaded', true);

        case GET_CAR + START:
            return carState.set('isLoading', true);

        case GET_CAR + SUCCESS:
            return carState.set('car', response.data)
                .set('isLoading', false);

    }
    return carState;
}
