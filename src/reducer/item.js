import {OrderedMap, Record} from 'immutable';
import {SAVE_ITEMS_INFO} from '../constans';
import {arrToMap} from '../helpers';

const ItemRecord = Record({
    item: undefined,
    stocks: undefined
});

const ReducerState = Record({
    items: new OrderedMap({})
});

const defaultState = new ReducerState();

export default (itemState = defaultState, actionTypeResponse) => {

    const {type, response} = actionTypeResponse;

    switch (type) {
        case SAVE_ITEMS_INFO: {
            const items = response.data;
            return itemState.set('items', arrToMap(items, ItemRecord))
        }

    }

    return itemState;
}