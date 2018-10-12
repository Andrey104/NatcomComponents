import {Record} from 'immutable';
import {OPEN_MODAL_WINDOW, CLOSE_MODAL_WINDOW} from '../constans';

const ReducerState = Record({
    modal: null
});

const defaultState = new ReducerState();

export default (modalState = defaultState, actionTypeResponse) => {

    const {type, data} = actionTypeResponse;

    switch (type) {
        case OPEN_MODAL_WINDOW: {
            return modalState.set('modal', data);
        }
        case CLOSE_MODAL_WINDOW: {
            return modalState.set('modal', null);
        }
    }

    return modalState;
}