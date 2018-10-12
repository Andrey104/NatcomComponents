import React from 'react';

import Loader from '../../../../components/Loader';
import RecipeInfo from '../../RecipeInfo';
import {BaseApi} from '../../../../services/base';
import {connect} from 'react-redux';
import {getRecipe} from '../../../../AC/recipes';

class EditRecipe extends React.Component {
    componentWillMount = () => {
        if (!this.props.recipe) {
            const urlId = this.props.match.params.recipeId;
            this.props.getRecipe(urlId);
        }
    };

    render() {
        const {recipe, isLoading} = this.props;
        if (isLoading || !recipe) {
            return (
                <div>
                    <Loader/>
                </div>
            );
        }

        return (
            <RecipeInfo handleSubmitRecipe={this.handleSubmitRecipe}
                        recipe={recipe}/>
        )
    }

    handleSubmitRecipe = editRecipe => {
        const baseApi = new BaseApi();
        const urlId = this.props.match.params.recipeId;

        baseApi
            .put(`recipes/${urlId}/`, editRecipe)
            .then(() => this.props.history.push(`/recipes/${urlId}`))
            .catch(err => alert(err));
    };
}

export default connect((state) => ({
    recipe: state.recipes.recipe,
    isLoading: state.recipes.isLoading
}), {getRecipe})(EditRecipe);
