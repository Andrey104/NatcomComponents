import {OrderedMap, Record} from 'immutable';
import {
    GET_ALL_HARPOONS,
    GET_NEXT_HARPOONS,
    GET_HARPOON,
    SAVE_HARPOON,
    SUCCESS, START
} from '../constans';
import {arrToMap} from '../helpers';

const HarpoonRecord = Record({
    id: undefined,
    status: undefined,
    sum: undefined,
    membranes: undefined,
    services: undefined,
    harpoon_product: undefined,
    harpoon_count: undefined,
    stock: undefined,
    client: undefined,
    auto_date: undefined
});

const ReducerState = Record({
    isLoading: false,
    loaded: false,
    hasMoreHarpoons: false,
    harpoon: {},
    harpoonSave: {},
    harpoons: new OrderedMap({})
});

const defaultState = new ReducerState();

export default (harpoonState = defaultState, actionTypeResponse) => {

    const {type, response, data} = actionTypeResponse;

    switch (type) {
        case GET_ALL_HARPOONS + START: {
            return harpoonState.set('isLoading', true);
        }
        case GET_ALL_HARPOONS + SUCCESS: {
            let nextPage, harpoons = response.data.results;
            response.data.next === null ? nextPage = false : nextPage = true;
            return harpoonState.set('harpoons', arrToMap(harpoons, HarpoonRecord))
                .set('hasMoreHarpoons', nextPage)
                .set('loaded', true)
                .set('isLoading', false);
        }
        case GET_NEXT_HARPOONS + SUCCESS: {
            let nextPage, newHarpoons;
            response.data.next === null ? nextPage = false : nextPage = true;
            newHarpoons = arrToMap(response.data.results, HarpoonRecord);
            return harpoonState.update('harpoons', harpoons => harpoons.concat(newHarpoons))
                .set('hasMoreHarpoons', nextPage)
                .set('loaded', true);
        }
        case GET_HARPOON + SUCCESS: {
            return harpoonState.set('harpoon', response.data);
        }
        case SAVE_HARPOON: {
            return harpoonState.set('harpoonSave', data);
        }
    }

    return harpoonState;
}