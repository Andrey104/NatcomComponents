import {GET_ALL_COLORS, GET_ALL_TEXTURES} from '../constans';

export function getAllColors() {
    return {
        type: GET_ALL_COLORS,
        requestType: 'GET',
        callAPI: 'items/membranes/colors/'
    }
}

export function getAllTextures() {
    return {
        type: GET_ALL_TEXTURES,
        requestType: 'GET',
        callAPI: 'items/membranes/textures/'
    }
}