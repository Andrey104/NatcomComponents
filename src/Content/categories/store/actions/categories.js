import {SUCCESS} from '../../../../constans';
import {
    GET_ALL_CATEGORIES,
    GET_SUBCATEGORIES,
    REMOVE_SUBCATEGORIES_FROM_STORE,
    SAVE_CATEGORIES,
    SAVE_SUBCATEGORIES,
    SAVE_CATEGORY,
    EDIT_CATEGORY,
    EDIT_SUBCATEGORY
} from '../constantsCategory';
import {BaseApi} from '../../../../services/base';
import {closeModalWindow} from '../../../../AC/modal';
import history from '../../../../history';

export function getAllCategories() {
    return {
        type: GET_ALL_CATEGORIES,
        requestType: 'GET',
        callAPI: 'categories/'
    }
}

export function saveCategory(category) {
    return {
        type: SAVE_CATEGORY,
        data: category
    }
}

export function getSubcategories(categoryId) {
    return {
        type: GET_SUBCATEGORIES,
        requestType: 'GET',
        callAPI: `categories/${categoryId}/subcategories/`
    }
}

export function addNewCategory(category) {
    const baseApi = new BaseApi();
    return dispatch => {
        baseApi
            .post(`categories/`, category)
            .then(response => {
                dispatch(saveCategory(response.data));
                dispatch(closeModalWindow());
                history.push(`/categories/${response.data.id}`)
            })
    }
}

export function editCategory(categoryId, category) {
    const baseApi = new BaseApi();
    return dispatch => {
        baseApi
            .put(`categories/${categoryId}/`, category)
            .then(response => {
                const data = response.data;
                dispatch({type: EDIT_CATEGORY, data});
                dispatch(closeModalWindow());
            })
    }
}

export function addNewSubcategory(categoryId, subcategory) {
    const baseApi = new BaseApi();
    return dispatch => {
        baseApi
            .post(`categories/${categoryId}/subcategories/`, subcategory)
            .then(() => {
                dispatch(getSubcategories(categoryId));
                dispatch(closeModalWindow());
            })
    }
}

export function editSubcategory(categoryId, subcategoryId, subcategory) {
    const baseApi = new BaseApi();
    return dispatch => {
        baseApi
            .put(`categories/${categoryId}/subcategories/${subcategoryId}/`, subcategory)
            .then(response => {
                dispatch({type: EDIT_SUBCATEGORY, data: response.data});
                dispatch(closeModalWindow());
            });
    }
}

export function getCategoriesAndSubcategories() {
    const baseApi = new BaseApi();
    return dispatch => {
        let categories;
        dispatch(() => ({type: GET_ALL_CATEGORIES + SUCCESS}));
        baseApi
            .get(`categories/`)
            .then(response => {
                categories = response.data;
                return baseApi
                    .get(`categories/${categories[0].id}/subcategories/`);
            })
            .then(response => {
                const subcategories = response.data;
                categories.unshift({id: -1, name: 'Все'});
                subcategories.unshift({id: -1, name: 'Все'});
                dispatch(saveCategories(categories, subcategories));
            });
    }
}

export function saveCategories(categories, subcategories) {
    return {
        type: SAVE_CATEGORIES,
        data: {categories, subcategories}
    }
}

export function removeSubcategoriesFromStore() {
    return {
        type: REMOVE_SUBCATEGORIES_FROM_STORE
    }
}

export function saveSubcategories(subcategories) {
    return {
        type: SAVE_SUBCATEGORIES,
        data: subcategories
    }
}

export function getFilterByCategories(categoryId, params, action) {
    const baseApi = new BaseApi();
    return dispatch => {
        baseApi
            .get(`categories/${categoryId}/subcategories/`)
            .then(response => {
                if (response.data[0]) {
                    params += `&subcategory=${response.data[0].id}`;
                }
                dispatch(saveSubcategories(response.data));
                action(params);
            });
    }
}

