import {
    GET_SERVICE, GET_SUM, SUCCESS
} from '../constans';
import {Record} from 'immutable';


// const ServiceRecord = Record({
//     id: undefined,
//     name: undefined,
//     type: undefined,
//     price: undefined,
//     price_standard: undefined,
//     price_good: undefined,
//     price_best: undefined
// });

const ReducerState = Record({
    isLoading: false,
    loaded: false,
    sum: undefined,
});

const defaultState = new ReducerState();

export default (statisticsState = defaultState, actionTypeResponse) => {
    const {type, response} = actionTypeResponse;
    switch (type) {
        case GET_SUM + SUCCESS:
            return statisticsState.set('sum', response.data)
                .set('isLoading', false);

    }
    return statisticsState;
}