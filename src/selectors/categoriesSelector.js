import {createSelector} from 'reselect';
import {mapToArr} from '../helpers';

const categoriesGetter = state => state.categories.entries;

export const getCategoriesSelector = createSelector(categoriesGetter, (entries) => {
    return mapToArr(entries);
});