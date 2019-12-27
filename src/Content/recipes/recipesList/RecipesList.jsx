import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import classNames from 'classnames/bind';
import {connect} from 'react-redux';

import Loader from '../../../components/Loader';
import AddButton from '../../../components/AddButton';
import RecipeCard from './RecipeCard';
import {getAllRecipes, getNextRecipes} from '../../../AC/recipes';
import {mapToArr} from '../../../helpers';
import styles from './styles.css';

let cx = classNames.bind(styles);

class RecipesList extends React.Component {
    componentWillMount = () => this.props.getAllRecipes();

    loadRecipes = page => this.props.getNextRecipes(page);

    getBody(recipes) {
        if (!recipes.length) return (
            <tr>
                <td colSpan='4'>Вы еще не добавили ни одного рецепта</td>
            </tr>
        );

        let number = 1;
        return recipes.map((recipe) => (
                <RecipeCard key={recipe.id}
                            number={number++}
                            history={this.props.history}
                            selectRecipeForAssembly={this.props.selectRecipeForAssembly}
                            selectedRecipe={this.props.selectedRecipe}
                            recipe={recipe}/>
            )
        );
    }

    addNewRecipe = () => this.props.history.push('recipes/add_recipe');

    getPageClasses() {
        return this.props.selectRecipeForAssembly ? 'recipes-list_dialog' : ''
    }

    render() {
        const {isLoading, recipes, hasMoreRecipes} = this.props;
        if (isLoading && !recipes.length) {
            return (
                <div className={cx('pre-loader-container')}>
                    <Loader/>
                </div>
            );
        }

        const button = this.props.selectRecipeForAssembly ? null : <AddButton openAdd={this.addNewRecipe}/>;
        return (
            <div className="row">
                <div className={cx('col-12', this.getPageClasses())}>
                    <InfiniteScroll
                        pageStart={1}
                        loadMore={this.loadRecipes}
                        hasMore={hasMoreRecipes}
                        useWindow={false}
                        loader={<Loader key={0}/>}>
                        <div className="row">
                            <div className="col-12">
                                <table className="table table-hover table-bordered">
                                    <thead className="thead">
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Название</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.getBody(recipes)}
                                    </tbody>
                                </table>
                            </div>
                            {button}
                        </div>
                    </InfiniteScroll>
                </div>
            </div>
        );
    }

}

export default connect((state) => ({
    recipes: mapToArr(state.recipes.entries),
    isLoading: state.recipes.isLoading,
    hasMoreRecipes: state.recipes.hasMoreEntries
}), {getAllRecipes, getNextRecipes})(RecipesList);
