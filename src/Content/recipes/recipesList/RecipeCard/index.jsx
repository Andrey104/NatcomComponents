import React from 'react';
import './styles.css'

export default class RecipeCard extends React.Component {
    render() {
        const {recipe, number} = this.props;
        return (
            <tr onClick={this.clickOnCarCard(recipe)}
                className={this.getRowClasses(recipe)}>
                <td scope="row" className='recipes-list__card__td__id_fixed-width'>{number}</td>
                <td className='recipes-list__card__td__name_fixed-width'>{recipe.name}</td>
            </tr>
        )
    }

    getRowClasses(recipe) {
        const {selectedRecipe} = this.props;
        let cls = 'recipes-list__card';
        if (selectedRecipe && recipe.id === selectedRecipe.id) cls += ' recipes-list__card_selected-recipe';
        return cls
    }

    clickOnCarCard = (recipe) => () => {
        if (this.props.selectRecipeForAssembly) {
            this.props.selectRecipeForAssembly(recipe)
        } else {
            this.props.history.push(`/recipes/${recipe.id}`)
        }
    };
}
