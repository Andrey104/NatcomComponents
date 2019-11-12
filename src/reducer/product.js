import {OrderedMap, Record} from 'immutable';
import {
    GET_ALL_PRODUCTS,
    GET_NEXT_PRODUCTS,
    GET_PRODUCT,
    DELETE_PRODUCTS_FROM_STORE,
    START, SUCCESS,
    SAVE_PRODUCTS_FILTERS,
    SET_PRODUCTS_CLIENT
} from '../constans';
import {arrToMap} from '../helpers';

const ProductRecord = Record({
    id: undefined,
    main_image: undefined,
    stocks: undefined,
    name: undefined,
    vendor_code: undefined,
    unit: undefined,
    price: undefined,
    price_standard: undefined,
    price_good: undefined,
    price_best: undefined,
    price_in: undefined,
    item: undefined,
    requires_prepayment: undefined,
    type: undefined
});

const ReducerState = Record({
    isLoading: false,
    loaded: false,
    hasMoreProducts: false,
    client: null,
    filters: {
        searchText: null,
        category: null,
        subcategory: null
    },
    nextPageNumber: null,
    product: {},
    products: new OrderedMap({})
});

const defaultState = new ReducerState();

export default (productState = defaultState, actionTypeResponse) => {

    const {type, response, data} = actionTypeResponse;

    switch (type) {
        case GET_ALL_PRODUCTS + START: {
            return productState.set('isLoading', true);
        }
        case GET_ALL_PRODUCTS + SUCCESS: {
            console.log(response.data);
            let nextPage, products = response.data.results;
            response.data.next === null ? nextPage = false : nextPage = true;
            products = arrToMap(products, ProductRecord);
            let nextPageNumber = productState.get('nextPageNumber');
            return productState.set('products', products)
                .set('hasMoreProducts', nextPage)
                .set('loaded', true)
                .set('isLoading', false);
        }
        case GET_NEXT_PRODUCTS + SUCCESS: {
            let nextPage, newProducts;
            response.data.next === null ? nextPage = false : nextPage = true;
            newProducts = arrToMap(response.data.results, ProductRecord);
            newProducts = productState.products.merge(newProducts);
            let nextPageNumber = productState.get('nextPageNumber');
            return productState.set('products', newProducts)
                .set('hasMoreProducts', nextPage)
                .set('loaded', true);
        }
        case GET_PRODUCT + SUCCESS: {
            return productState.set('product', response.data);
        }
        case SAVE_PRODUCTS_FILTERS: {
            return productState.set('filters', data);
        }
        case DELETE_PRODUCTS_FROM_STORE: {
            return defaultState;
        }
        case SET_PRODUCTS_CLIENT: {
            return productState.set('client', data);
        }
    }
    return productState;
}