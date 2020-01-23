import {BaseApi} from '../services/base';
import {START, SUCCESS} from '../constans';

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
                .then(response => next({type: type + SUCCESS, response, data}));
            break;
        }
        case 'POST': {
            const {data} = action;
            baseApi
                .post(callAPI, data)
                .then(response => next({type: type + SUCCESS, response, data}));
            break;
        }
        case 'PUT': {
            const {data} = action;
            baseApi
                .put(callAPI, data)
                .then(response => next({type: type + SUCCESS, response, data}));
            break;
        }
        case 'DELETE': {
            baseApi
                .deleteRequest(callAPI)
                .then(response => next({type: type + SUCCESS, response, data}));
            break;
        }
    }

}
