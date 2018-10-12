import React from 'react';
import Switch from "react-router-dom/es/Switch";
import Route from "react-router-dom/es/Route";
import NavLink from "react-router-dom/es/NavLink";
import {connect} from "react-redux";

import ComponentMenu from '../../components/ComponentMenu';
import RecipesList from './recipesList/RecipesList';
import AddNewRecipe from './recipesList/AddNewRecipe'
import RecipeDetail from './recipeDetail/RecipeDetail';
import EditRecipe from './recipeDetail/EditRecipe';
import '../styles.css';

class RecipesPage extends React.Component {
    render() {
        return (
            <div>
                <div className='breadcrumbs'>
                    {this.getMenu()}
                </div>
                <Switch>
                    <Route exact path='/recipes' component={RecipesList}/>
                    <Route exact path='/recipes/add_recipe' component={AddNewRecipe}/>
                    <Route exact path='/recipes/:recipeId' component={RecipeDetail}/>
                    <Route exact path='/recipes/:recipeId/edit_recipe' component={EditRecipe}/>
                </Switch>
            </div>
        )
    }

    getMenu() {
        let menu = (
            <NavLink to='/recipes'>
                <span>Рецепты</span>
            </NavLink>
        );

        if (this.props.match.url.indexOf('add_recipe') !== -1) {
            menu = (
                <ComponentMenu menu={menu} name={'Новый рецепт'}/>
            );
        }
        else {
            const urlId = this.props.match.params.recipeId;
            const {recipe} = this.props;
            if (urlId && recipe) {
                const isEditRecipe = this.props.match.url.indexOf('edit_recipe') !== -1;
                const name = isEditRecipe
                    ? <NavLink to={`/recipes/${recipe.id}`}>{recipe.name}</NavLink>
                    : <span>{recipe.name}</span>;

                if (Number(urlId) === recipe.id) {
                    menu = (
                        <ComponentMenu menu={menu} name={name}/>
                    );
                }

                if (isEditRecipe) {
                    menu = (
                        <ComponentMenu menu={menu} name='Редактирование'/>
                    );
                }
            }
        }
        return menu;
    }
}

export default connect((state) => ({
    recipe: state.recipes.recipe,
}))(RecipesPage);
