import {GET_ALL_DRIVERS, GET_NEXT_DRIVERS, GET_DRIVER} from '../constans';

export function getAllDrivers() {
    return {
        type: GET_ALL_DRIVERS,
        requestType: 'GET',
        callAPI: 'drivers/'
    }
}

export function getNextDrivers(page) {
    return {
        type: GET_NEXT_DRIVERS,
        requestType: 'GET',
        callAPI: `drivers/?page=${page}`
    }
}

export function getDriver(driverId) {
    return {
        type: GET_DRIVER,
        requestType: 'GET',
        callAPI: `drivers/${driverId}/`
    }
}
