import {GET_ALL_CARS, GET_NEXT_CARS, GET_CAR} from '../constans';

export function getAllCars() {
    return {
        type: GET_ALL_CARS,
        requestType: 'GET',
        callAPI: 'cars/'
    }
}

export function getNextCars(page) {
    return {
        type: GET_NEXT_CARS,
        requestType: 'GET',
        callAPI: `cars/?page=${page}`
    }
}

export function getCar(carId) {
    return {
        type: GET_CAR,
        requestType: 'GET',
        callAPI: `cars/${carId}/`
    }
}
