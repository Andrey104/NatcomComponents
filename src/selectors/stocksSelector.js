import {createSelector} from 'reselect';
import {mapToArr} from "../helpers";

const stocksGetter = state => state.stocks;

export const getStocksSelector = createSelector(stocksGetter, (stocks) => {
    return mapToArr(stocks.stocks);
});
