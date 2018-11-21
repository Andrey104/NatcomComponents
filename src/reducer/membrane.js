import {OrderedMap, Record} from 'immutable';
import {
    GET_ALL_MEMBRANES,
    GET_NEXT_MEMBRANES,
    GET_MEMBRANE,
    START, SUCCESS,
    DELETE_MEMBRANES_FROM_STORE,
    SAVE_MEMBRANES_FILTERS
} from '../constans';
import {arrToMap} from '../helpers';

const MembraneRecord = Record({
    id: undefined,
    item: undefined,
    name: undefined,
    width: undefined,
    main_image: undefined,
    price_standard: undefined,
    price_good: undefined,
    price_best: undefined,
    price_standard_harpoon: undefined,
    price_good_harpoon: undefined,
    price_best_harpoon: undefined,
    barcode: undefined,
    vendor_code: undefined,
    category: undefined,
    subcategory: undefined,
    texture: undefined,
    color: undefined,
    can_harpoon: undefined,
    images: undefined,
    stocks: undefined,
    price: undefined
});

const ReducerState = Record({
    isLoading: false,
    loaded: false,
    hasMoreEntries: false,
    client: null,
    filters: {
        searchText: null,
        color: null,
        texture: null,
        harpoon: null
    },
    membrane: {},
    nextPageNumber: null,
    entries: new OrderedMap({})
});

const defaultState = new ReducerState();

export default (membraneState = defaultState, actionTypeResponse) => {

    const {type, response, data} = actionTypeResponse;

    switch (type) {
        case GET_ALL_MEMBRANES + START: {
            return membraneState.set('isLoading', true);
        }
        case GET_ALL_MEMBRANES + SUCCESS: {
            let nextPage, membranes = response.data.results;
            response.data.next === null ? nextPage = false : nextPage = true;
            return membraneState.set('entries', arrToMap(membranes, MembraneRecord))
                .set('hasMoreEntries', nextPage)
                .set('loaded', true)
                .set('isLoading', false)
                .set('nextPageNumber', 2)
        }
        case GET_NEXT_MEMBRANES + SUCCESS: {
            let nextPage, newMembranes;
            response.data.next === null ? nextPage = false : nextPage = true;
            newMembranes = arrToMap(response.data.results, MembraneRecord);
            let nextPageNumber = membraneState.get('nextPageNumber');
            return membraneState.update('entries', membranes => membranes.concat(newMembranes))
                .set('hasMoreEntries', nextPage)
                .set('nextPageNumber', nextPageNumber += 1)
                .set('loaded', true);
        }
        case GET_MEMBRANE + START: {
            return membraneState.set('isLoading', true);
        }
        case GET_MEMBRANE + SUCCESS: {
            return membraneState.set('membrane', response.data)
                .set('isLoading', false);
        }
        case SAVE_MEMBRANES_FILTERS: {
            return membraneState.set('filters', data);
        }
        case DELETE_MEMBRANES_FROM_STORE: {
            return defaultState;
        }
    }

    return membraneState;
}