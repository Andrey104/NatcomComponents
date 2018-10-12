import {GET_ALL_SERVICES, GET_NEXT_SERVICES, GET_SERVICE} from '../constans';

export function getAllServices(params) {
    let callAPI = 'services/';
    callAPI += params ? params : '';
    return {
        type: GET_ALL_SERVICES,
        requestType: 'GET',
        callAPI
    }
}

export function getNextServices(page) {
    return {
        type: GET_NEXT_SERVICES,
        requestType: 'GET',
        callAPI: `services/?page=${page}`
    }
}

export function getService(serviceId) {
    return {
        type: GET_SERVICE,
        requestType: 'GET',
        callAPI: `services/${serviceId}/`
    }
}
