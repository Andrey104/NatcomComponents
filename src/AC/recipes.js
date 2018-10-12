import {GET_ALL_RECIPES, GET_NEXT_RECIPES, GET_RECIPE} from '../constans';

export function getAllRecipes() {
    return {
        type: GET_ALL_RECIPES,
        requestType: 'GET',
        callAPI: 'recipes/'
    }
}

export function getNextRecipes(page) {
    return {
        type: GET_NEXT_RECIPES,
        requestType: 'GET',
        callAPI: `recipes/?page=${page}`
    }
}

export function getRecipe(recipeId) {
    return {
        type: GET_RECIPE,
        requestType: 'GET',
        callAPI: `recipes/${recipeId}/`
    }
}
