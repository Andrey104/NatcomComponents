import React from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames/bind';

import Loader from '../../../components/Loader';
import {getRecipe} from '../../../AC/recipes';
import DeleteRecipe from './DeleteRecipe'
import InputAndOutputProducts from './InputAndOutputProducts'
import styles from './styles.css';

let cx = classNames.bind(styles);

class RecipeDetail extends React.Component {
    state = {
        openDeleteRecipeDialog: false
    };

    componentWillMount = () => {
        const urlId = this.props.match.params.recipeId;
        this.props.getRecipe(urlId);
    };

    render() {
        const {recipe, isLoading} = this.props;
        if (isLoading || !recipe) {
            return (
                <div className={cx('pre-loader-container')}>
                    <Loader/>
                </div>
            );
        }

        return (
            <div className="col-12">
                {this.getDeleteRecipeDialogWindow(recipe)}
                <h5><i>Название:</i> {recipe.name}</h5>
                <InputAndOutputProducts obj={recipe}/>
                <div className='row'>
                    <button type="button"
                            onClick={() => this.props.history.push(`/recipes/${recipe.id}/edit_recipe`)}
                            className="btn btn-primary btn-sm">Редактировать
                    </button>
                    <button type="button"
                            onClick={this.deleteRecipeDialogState}
                            className="btn btn-danger btn-sm">Удалить
                    </button>
                </div>
            </div>
        )
    }

    getDeleteRecipeDialogWindow(recipe) {
        if (!this.state.openDeleteRecipeDialog) return null;
        return <DeleteRecipe header={`Удаление рецепта "${recipe.name}"`}
                             successDeleteRecipe={() => this.props.history.push('/recipes')}
                             close={this.deleteRecipeDialogState}
                             recipe={recipe}/>
    }

    deleteRecipeDialogState = () => {
        this.setState({openDeleteRecipeDialog: !this.state.openDeleteRecipeDialog})
    }
}

export default connect((state) => ({
    recipe: state.recipes.recipe,
    isLoading: state.recipes.isLoading
}), {getRecipe})(RecipeDetail);
