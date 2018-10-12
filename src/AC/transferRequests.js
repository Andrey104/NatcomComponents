import {GET_ALL_TRANSFER_REQUESTS, GET_NEXT_TRANSFER_REQUESTS, GET_TRANSFER_REQUEST} from '../constans';

export function getAllTransferRequests() {
    return {
        type: GET_ALL_TRANSFER_REQUESTS,
        requestType: 'GET',
        callAPI: 'transfers/requests/'
    }
}

export function getNextTransferRequests(page) {
    return {
        type: GET_NEXT_TRANSFER_REQUESTS,
        requestType: 'GET',
        callAPI: `transfers/requests/?page=${page}`
    }
}

export function getTransferRequest(transferRequestId) {
    return {
        type: GET_TRANSFER_REQUEST,
        requestType: 'GET',
        callAPI: `transfers/requests/${transferRequestId}/`
    }
}
