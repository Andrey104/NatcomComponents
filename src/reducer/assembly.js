import {
    GET_ALL_ASSEMBLIES, GET_NEXT_ASSEMBLIES, GET_ASSEMBLY,
    START, SUCCESS, FAIL
} from '../constans';
import {OrderedMap, Record} from 'immutable';
import {arrToMap} from '../helpers';

const AssemblyRecord = Record({
    id: undefined,
    name: undefined,
    auto_date: undefined,
    user: undefined,
    count: undefined,
    input_products: undefined,
    output_products: undefined
});

const ReducerState = Record({
    isLoading: false,
    loaded: false,
    hasMoreEntries: false,
    assembly: undefined,
    entries: new OrderedMap({})
});

const defaultState = new ReducerState();

export default (assembliesState = defaultState, actionTypeResponse) => {
    const {type, response} = actionTypeResponse;
    let nextPage;

    switch (type) {
        case GET_ALL_ASSEMBLIES + START:
            return assembliesState.set('isLoading', true);

        case GET_ALL_ASSEMBLIES + SUCCESS:
            let assemblies = response.data.results;
            nextPage = response.data.next !== null;

            return assembliesState.set('entries', arrToMap(assemblies, AssemblyRecord))
                .set('hasMoreEntries', nextPage)
                .set('loaded', true)
                .set('isLoading', false);

        case GET_NEXT_ASSEMBLIES + SUCCESS:
            nextPage = response.data.next !== null;
            let newAssembly = arrToMap(response.data.results, AssemblyRecord);
            newAssembly = assemblies.entries.concat(newAssembly);

            return assembliesState.set('entries', newAssembly)
                .set('hasMoreEntries', nextPage)
                .set('loaded', true);

        case GET_ASSEMBLY + START:
            return assembliesState.set('isLoading', true);

        case GET_ASSEMBLY + SUCCESS:
            return assembliesState.set('assembly', response.data)
                .set('isLoading', false);

    }
    return assembliesState;
}
