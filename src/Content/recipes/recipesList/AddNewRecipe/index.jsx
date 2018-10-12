import React from 'react';

import RecipeInfo from '../../RecipeInfo';
import {BaseApi} from '../../../../services/base';

export default class EditRecipe extends React.Component {
    render() {
        return (
            <RecipeInfo handleSubmitRecipe={this.handleSubmitRecipe}/>
        )
    }

    handleSubmitRecipe = (newRecipe) => {
        const baseApi = new BaseApi();

        baseApi
            .post(`recipes/`, newRecipe)
            .then((res) => this.props.history.push(`/recipes/${res.data.id}`))
            .catch(err => alert(err));
    };
}
