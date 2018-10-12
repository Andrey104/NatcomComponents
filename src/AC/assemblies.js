import {GET_ALL_ASSEMBLIES, GET_NEXT_ASSEMBLIES, GET_ASSEMBLY} from '../constans';

export function getAllAssemblies(params) {
    let callAPI = 'assemblies/';
    callAPI += params ? params : '';
    return {
        type: GET_ALL_ASSEMBLIES,
        requestType: 'GET',
        callAPI
    }
}

export function getNextAssemblies(page) {
    return {
        type: GET_NEXT_ASSEMBLIES,
        requestType: 'GET',
        callAPI: `assemblies/?page=${page}`
    }
}

export function getAssembly(assemblyId) {
    return {
        type: GET_ASSEMBLY,
        requestType: 'GET',
        callAPI: `assemblies/${assemblyId}/`
    }
}
