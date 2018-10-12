import {OrderedMap, Record} from 'immutable';
import {GET_ALL_COLORS, GET_ALL_TEXTURES, SUCCESS} from '../constans';
import {arrToMap} from '../helpers';

const ParameterRecord = Record({
    id: undefined,
    description: undefined
});

const ReducerState = Record({
    colors: new OrderedMap({}),
    textures: new OrderedMap({})
});

const defaultState = new ReducerState();

export default (parameterState = defaultState, actionTypeResponse) => {

    const {type, response, data} = actionTypeResponse;

    switch (type) {
        case GET_ALL_COLORS + SUCCESS: {
            return parameterState.set('colors', arrToMap(response.data, ParameterRecord))
        }
        case GET_ALL_TEXTURES + SUCCESS: {
            return parameterState.set('textures', arrToMap(response.data, ParameterRecord))
        }
    }

    return parameterState;
}