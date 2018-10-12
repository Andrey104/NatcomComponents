import {
    GET_ALL_TRANSFER_REQUESTS, GET_NEXT_TRANSFER_REQUESTS, GET_TRANSFER_REQUEST,
    START, SUCCESS, FAIL
} from '../constans';
import {OrderedMap, Record} from 'immutable';
import {arrToMap} from '../helpers';

const TransferRequestRecord = Record({
    id: undefined,
    type: undefined,
    count: undefined,
    transfer: undefined,
    request: undefined
});

const ReducerState = Record({
    isLoading: false,
    loaded: false,
    hasMoreEntries: false,
    transferRequest: undefined,
    entries: new OrderedMap({})
});

const defaultState = new ReducerState();

export default (transferRequestsState = defaultState, actionTypeResponse) => {
    const {type, response} = actionTypeResponse;
    let nextPage;

    switch (type) {
        case GET_ALL_TRANSFER_REQUESTS + START:
            return transferRequestsState.set('isLoading', true);

        case GET_ALL_TRANSFER_REQUESTS + SUCCESS:
            let transferRequests = response.data.results;
            nextPage = response.data.next !== null;

            return transferRequestsState.set('entries', arrToMap(transferRequests, TransferRequestRecord))
                .set('hasMoreEntries', nextPage)
                .set('loaded', true)
                .set('isLoading', false);

        case GET_NEXT_TRANSFER_REQUESTS + SUCCESS:
            nextPage = response.data.next !== null;
            let newTransferRequest = arrToMap(response.data.results, TransferRequestRecord);
            newTransferRequest = transferRequests.entries.concat(newTransferRequest);

            return transferRequestsState.set('entries', newTransferRequest)
                .set('hasMoreEntries', nextPage)
                .set('loaded', true);

        case GET_TRANSFER_REQUEST + START:
            return transferRequestsState.set('isLoading', true);

        case GET_TRANSFER_REQUEST + SUCCESS:
            return transferRequestsState.set('transferRequest', response.data)
                .set('isLoading', false);

    }
    return transferRequestsState;
}
