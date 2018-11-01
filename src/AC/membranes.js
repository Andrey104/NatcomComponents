import {
    DELETE_MEMBRANES_FROM_STORE,
    GET_ALL_MEMBRANES,
    GET_MEMBRANE,
    GET_NEXT_MEMBRANES,
    SAVE_MEMBRANES_FILTERS
} from '../constans';
import {getUrl, getUrlMembranes} from "../services/utils";

export function getAllMembranes(filters) {
    let callAPI = 'items/membranes/';
    callAPI += getUrlMembranes(filters);
    return {
        type: GET_ALL_MEMBRANES,
        requestType: 'GET',
        callAPI
    }
}

export function getNextMembranes(filters, page) {
    let callAPI = 'items/membranes/';
    callAPI += getUrlMembranes(filters, page);
    return {
        type: GET_NEXT_MEMBRANES,
        requestType: 'GET',
        callAPI
    }
}

export function getMembrane(membraneId) {
    return {
        type: GET_MEMBRANE,
        requestType: 'GET',
        callAPI: `items/membranes/${membraneId}/`
    }
}

export function getAllClientMembranesWithStocks(params) {
    let callAPI = `items/membranes/stocks/`;
    callAPI += params ? params : '';
    return {
        type: GET_ALL_MEMBRANES,
        requestType: 'GET',
        callAPI
    }
}

export function deleteMembranesFromStore() {
    return {
        type: DELETE_MEMBRANES_FROM_STORE
    }
}

export function saveMembranesFilters(filters) {
    return {
        type: SAVE_MEMBRANES_FILTERS,
        data: filters
    }
}