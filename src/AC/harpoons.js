import {
    GET_ALL_HARPOONS,
    GET_NEXT_HARPOONS,
    GET_HARPOON,
    SAVE_HARPOON_IN_ORDER,
    SAVE_HARPOON
} from '../constans';
import {BaseApi} from '../services/base';
import history from '../history';

export function getAllHarpoons(params) {
    let callAPI = 'harpoons/';
    callAPI += params ? params : '';
    return {
        type: GET_ALL_HARPOONS,
        requestType: 'GET',
        callAPI
    }
}

export function getNextHarpoons(page) {
    return {
        type: GET_NEXT_HARPOONS,
        requestType: 'GET',
        callAPI: `harpoons/?page=${page}`
    }
}

export function getHarpoon(harpoonId) {
    return {
        type: GET_HARPOON,
        requestType: 'GET',
        callAPI: `harpoons/${harpoonId}/`
    }
}

export function saveHarpoonInOrder(harpoon) {
    return {
        type: SAVE_HARPOON_IN_ORDER,
        data: harpoon
    }
}

export function saveHarpoon(data) {
    return {
        type: SAVE_HARPOON,
        data
    }
}

export function editHarpoon(harpoonId, harpoon) {
    const baseApi = new BaseApi();
    return () => {
        baseApi
            .put(`harpoons/${harpoonId}/`, harpoon)
            .then(response => {
                history.replace(`/harpoons/${response.data.id}`);
            });
    }
}