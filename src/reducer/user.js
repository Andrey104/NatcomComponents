import {OrderedMap, Record} from 'immutable';
import {
    GET_ALL_USERS, GET_NEXT_USERS, GET_USER,
    START, SUCCESS
} from '../constans';
import {arrToMap} from '../helpers';

const UserRecord = Record({
    id: undefined,
    username: undefined,
    type: undefined,
    first_name: undefined,
    last_name: undefined,
    email: undefined,
    phone: undefined,
    telegram: undefined,
    blocked: undefined,
    stock: undefined,
});

const ReducerState = Record({
    isLoading: false,
    loaded: false,
    hasMoreUsers: false,
    user: undefined,
    users: new OrderedMap({})
});

const defaultState = new ReducerState();

export default (userState = defaultState, actionTypeResponse) => {

    const {type, response, data} = actionTypeResponse;

    switch (type) {
        case GET_ALL_USERS + START: {
            return userState.set('isLoading', true);
        }
        case GET_ALL_USERS + SUCCESS: {
            let nextPage, users = response.data.results;
            response.data.next === null ? nextPage = false : nextPage = true;
            return userState.set('users', arrToMap(users, UserRecord))
                .set('hasMoreUsers', nextPage)
                .set('loaded', true)
                .set('isLoading', false);
        }
        case GET_NEXT_USERS + SUCCESS: {
            let nextPage, newUsers;
            response.data.next === null ? nextPage = false : nextPage = true;
            newUsers = arrToMap(response.data.results, UserRecord);
            return userState.update('users', users => users.concat(newUsers))
                .set('hasMoreUsers', nextPage)
                .set('loaded', true);
        }
        case GET_USER + START: {
            return userState.set('isLoading', true);
        }
        case GET_USER + SUCCESS: {
            return userState.set('user', response.data)
                .set('isLoading', false);
        }
    }

    return userState;
}