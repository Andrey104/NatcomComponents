import {BaseApi} from '../services/base';
import {deleteMembranesFromStore} from './membranes';
import {deleteProductsFromStore} from './products';
import {SAVE_ITEMS_INFO} from '../constans';
import history from '../history';

export function deleteItemsFromStore() {
    return dispatch => {
        dispatch(deleteProductsFromStore());
        dispatch(deleteMembranesFromStore());
    }
}

export function getItemsInfo(orderId, params) {
    const baseApi = new BaseApi();
    return dispatch => {
        baseApi
            .get(`items/info/${params}`)
            .then(response => {
                dispatch({type: SAVE_ITEMS_INFO, response});
                history.push(`/orders/${orderId}/edit`);
            });
    }
}
