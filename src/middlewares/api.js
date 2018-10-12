import {BaseApi} from '../services/base';
import {START, SUCCESS, FAIL} from '../constans';

export default store => next => action => {
    const {callAPI, requestType, type, data} = action;

    if (!requestType) {
        return next(action);
    }

    next({
        type: type + START
    });

    const baseApi = new BaseApi();

    switch (requestType) {
        case 'GET': {
            baseApi
                .get(callAPI)
                .then(response => next({type: type + SUCCESS, response}));
            break;
        }
        case 'POST': {
            const {data} = action;
            baseApi
                .post(callAPI, data)
                .then(response => next({type: type + SUCCESS, response}));
            break;
        }
        case 'PUT': {
            const {data} = action;
            baseApi
                .put(callAPI, data)
                .then(response => next({type: type + SUCCESS, response}));
            break;
        }
        case 'DELETE': {
            baseApi
                .delete(callAPI)
                .then(response => next({type: type + SUCCESS, data}));
            break;
        }
    }

}
