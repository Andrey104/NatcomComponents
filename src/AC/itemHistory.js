import {getUrlItemHistory} from "../services/utils";
import {GET_ALL_ITEM_HISTORY} from "../constans";

export function getAllItemHistory(itemId) {
    let callAPI = 'items/history/';
    callAPI += getUrlItemHistory(itemId);
    return {
        type: GET_ALL_ITEM_HISTORY,
        requestType: 'GET',
        callAPI
    }
}