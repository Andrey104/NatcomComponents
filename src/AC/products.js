import {
    GET_ALL_PRODUCTS,
    GET_NEXT_PRODUCTS,
    GET_PRODUCT,
    DELETE_PRODUCTS_FROM_STORE,
    SAVE_PRODUCTS_FILTERS
} from '../constans';
import {getUrl} from "../services/utils";

export function getAllProducts(filters) {
    let callAPI = 'items/products/';
    callAPI += getUrl(filters);
    return {
        type: GET_ALL_PRODUCTS,
        requestType: 'GET',
        callAPI
    }
}

export function getNextProducts(filters, page) {
    let callAPI = `items/products/`;
    callAPI += getUrl(filters, page);
    return {
        type: GET_NEXT_PRODUCTS,
        requestType: 'GET',
        callAPI
    }
}

export function getProduct(productId) {
    return {
        type: GET_PRODUCT,
        requestType: 'GET',
        callAPI: `items/products/${productId}/`
    }
}

export function getAllClientProductsWithStocks(params) {
    let callAPI = `items/products/stocks/`;
    callAPI += params ? params : '';
    return {
        type: GET_ALL_PRODUCTS,
        requestType: 'GET',
        callAPI
    }
}

export function deleteProductsFromStore() {
    return {
        type: DELETE_PRODUCTS_FROM_STORE
    }
}

export function saveProductsFilters(filters) {
    return {
        type: SAVE_PRODUCTS_FILTERS,
        data: filters
    }
}