import {GET_PROFIT, GET_SUM} from "../constans";

export function getSum(date) {
    return {
        type: GET_SUM,
        requestType: 'GET',
        callAPI: `statistics/sum/?date=${date}`
    }
}


export function getProfit(date) {
    return {
        type: GET_PROFIT,
        requestType: 'GET',
        callAPI: `statistics/profit/?date=${date}`
    }
}