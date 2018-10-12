import {
    GET_ALL_CATEGORIES,
    GET_SUBCATEGORIES,
    SAVE_CATEGORIES,
    REMOVE_SUBCATEGORIES_FROM_STORAGE,
    START, SUCCESS,
    SAVE_SUBCATEGORIES,
    SAVE_CATEGORY,
    EDIT_CATEGORY,
    EDIT_SUBCATEGORY
} from '../constans';
import {OrderedMap, Record} from 'immutable';
import {arrToMap} from '../helpers';

const CategoryRecord = Record({
    id: undefined,
    name: undefined,
});

const ReducerState = Record({
    isLoading: true,
    isLoadingSubcategories: true,
    loaded: false,
    category: {},
    subcategories: new OrderedMap({}),
    entries: new OrderedMap({})
});

const defaultState = new ReducerState();

export default (categoryState = defaultState, actionTypeResponse) => {
    const {type, response, data} = actionTypeResponse;

    switch (type) {
        case GET_ALL_CATEGORIES + START: {
            return categoryState.set('isLoading', true);
        }
        case GET_ALL_CATEGORIES + SUCCESS: {
            const categoriesMap = arrToMap(response.data, CategoryRecord);
            return categoryState.set('entries', categoriesMap)
                .set('isLoading', false);
        }
        case GET_SUBCATEGORIES + START: {
            return categoryState.set('isLoadingSubcategories', true);
        }
        case GET_SUBCATEGORIES + SUCCESS: {
            const subcategoriesMap = arrToMap(response.data, CategoryRecord);
            return categoryState.set('subcategories', subcategoriesMap)
                .set('isLoadingSubcategories', false);
        }
        case SAVE_CATEGORY: {
            return categoryState.set('category', data)
                .set('isLoadingSubcategories', true);
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
        case REMOVE_SUBCATEGORIES_FROM_STORAGE: {
            return categoryState.set('subcategories', new OrderedMap({}));
        }
        case SAVE_SUBCATEGORIES: {
            return categoryState.set('subcategories', arrToMap(data, CategoryRecord));
        }
    }
    return categoryState;
}