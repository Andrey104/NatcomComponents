import {GET_SUM} from "../constans";

export function getSum(date) {
    return {
        type: GET_SUM,
        requestType: 'GET',
        callAPI: `statistics/sum/?date=${date}`
    }
}