import {START, SUCCESS} from '../../../../constans';
import {
    GET_CATEGORY,
    GET_ALL_CATEGORIES,
    GET_SUBCATEGORIES,
    SAVE_CATEGORIES,
    DELETE_CATEGORIES_FROM_STORE,
    SAVE_SUBCATEGORIES,
    SAVE_CATEGORY,
    EDIT_CATEGORY,
    EDIT_SUBCATEGORY
} from '../constantsCategory';
import {OrderedMap, Record} from 'immutable';
import {arrToMap, objToMap} from '../../../../helpers';

const CategoryRecord = Record({
    id: undefined,
    name: undefined,
});

const ReducerState = Record({
    isLoading: false,
    category: {},
    subcategories: new OrderedMap({}),
    entries: new OrderedMap({})
});

const defaultState = new ReducerState();

export default (categoryState = defaultState, actionTypeResponse) => {
    const {type, response, data} = actionTypeResponse;

    switch (type) {
        case GET_CATEGORY + START: {
            return categoryState.set('isLoading', true);
        }
        case GET_CATEGORY + SUCCESS: {
            return categoryState.set('category', objToMap(response.data, CategoryRecord))
                .set('isLoading', false);
        }
        case GET_ALL_CATEGORIES + START: {
            return categoryState.set('isLoading', true);
        }
        case GET_ALL_CATEGORIES + SUCCESS: {
            response.data.unshift({id: -1, name: 'Все'});
            const categoriesMap = arrToMap(response.data, CategoryRecord);
            return categoryState.set('entries', categoriesMap)
                .set('isLoading', false);
        }
        case GET_SUBCATEGORIES + START: {
            return categoryState.set('isLoading', true);
        }
        case GET_SUBCATEGORIES + SUCCESS: {
            response.data.unshift({id: -1, name: 'Все'});
            const subcategoriesMap = arrToMap(response.data, CategoryRecord);
            return categoryState.set('subcategories', subcategoriesMap)
                .set('isLoading', false);
        }
        case SAVE_CATEGORY: {
            return categoryState.set('category', data);
        }
        case EDIT_CATEGORY: {
            return categoryState.set('category', data);
        }
        case EDIT_SUBCATEGORY: {
            return categoryState
                .updateIn(['subcategories', data.id], sub => sub = data);
        }
        case SAVE_CATEGORIES: {
            const {categories, subcategories} = data;
            return categoryState.set('entries', arrToMap(categories, CategoryRecord))
                .set('subcategories', arrToMap(subcategories, CategoryRecord))
                .set('isLoading', false);
        }
        case DELETE_CATEGORIES_FROM_STORE: {
            return defaultState;
        }
        case SAVE_SUBCATEGORIES: {
            return categoryState.set('subcategories', arrToMap(data, CategoryRecord));
        }
    }
    return categoryState;
}