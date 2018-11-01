import {Record} from "immutable";
import {GET_CURRENT_USER, SUCCESS} from "../constans";

const CurrentUserRecord = Record({
    id: undefined,
    username: undefined,
    type: undefined,
    first_name: undefined,
    last_name: undefined,
    email: undefined,
    phone: undefined,
    telegram: undefined,
    blocked: undefined,
    stock: undefined
});

const ReducerState = Record({
    currentUser: undefined
});

const defaultState = new ReducerState();

export default (currentUserState = defaultState, actionTypeResponse) => {
    const {type, response} = actionTypeResponse;
    switch (type) {
        case GET_CURRENT_USER + SUCCESS: {
            let user = response.data;
            return currentUserState.set('currentUser', user);
        }
    }
    return currentUserState;
}