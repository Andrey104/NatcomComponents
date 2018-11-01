import {BaseApi} from '../services/base';
import {closeModalWindow} from './modal';
import {GET_CURRENT_USER} from "../constans";


export function getCurrentUser() {
    return {
        type: GET_CURRENT_USER,
        requestType: 'GET',
        callAPI: 'users/current/'
    }
}