import {OrderedMap, Record} from 'immutable';
import {} from '../constans';
import {arrToMap} from '../helpers';
import {GET_ALL_ITEM_HISTORY} from "../constans";
import {START} from "../constans";
import {SUCCESS} from "../constans";

const ItemHistoryRecord = Record({
    action: undefined,
    action_id: undefined,
    performer: undefined,
    count: undefined,
    date: undefined,
    sum: undefined,
    price: undefined,
});

const ReducerState = Record({
    isLoading: false,
    loaded: false,
    hasMoreEntries: false,
    itemHistory: undefined,
    filters: {
        item_id: undefined
    },
    entries: new OrderedMap({})
});

const defaultState = new ReducerState();

export default (itemHistoryState = defaultState, actionTypeResponse) => {

    const {type, response, data} = actionTypeResponse;

    switch (type) {
        case GET_ALL_ITEM_HISTORY + START: {
            return itemHistoryState.set('isLoading', true);
        }
        case GET_ALL_ITEM_HISTORY + SUCCESS: {
            let itemHistories = response.data;
            console.log(response.data);
            return itemHistoryState.set('entries', arrToMap(itemHistories, ItemHistoryRecord))
                .set('loaded', true)
                .set('isLoading', false)
        }
    }

    return itemHistoryState;
}