import {
    GET_ALL_RECIPES, GET_NEXT_RECIPES, GET_RECIPE,
    START, SUCCESS, FAIL
} from '../constans';
import {OrderedMap, Record} from 'immutable';
import {arrToMap} from '../helpers';

const RecipeRecord = Record({
    id: undefined,
    name: undefined
});

const ReducerState = Record({
    isLoading: false,
    loaded: false,
    hasMoreEntries: false,
    recipe: undefined,
    entries: new OrderedMap({})
});

const defaultState = new ReducerState();

export default (recipesState = defaultState, actionTypeResponse) => {
    const {type, response} = actionTypeResponse;
    let nextPage;

    switch (type) {
        case GET_ALL_RECIPES + START:
            return recipesState.set('isLoading', true);

        case GET_ALL_RECIPES + SUCCESS:
            let recipes = response.data.results;
            nextPage = response.data.next !== null;

            return recipesState.set('entries', arrToMap(recipes, RecipeRecord))
                .set('hasMoreEntries', nextPage)
                .set('loaded', true)
                .set('isLoading', false);

        case GET_NEXT_RECIPES + SUCCESS:
            nextPage = response.data.next !== null;
            let newRecipes = arrToMap(response.data.results, RecipeRecord);
            newRecipes = recipesState.entries.concat(newRecipes);

            return recipesState.set('entries', newRecipes)
                .set('hasMoreEntries', nextPage)
                .set('loaded', true);

        case GET_RECIPE + START:
            return recipesState.set('isLoading', true);

        case GET_RECIPE + SUCCESS:
            return recipesState.set('recipe', response.data)
                .set('isLoading', false);

    }
    return recipesState;
}
