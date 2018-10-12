import React from 'react';

import DialogWindow from '../../../../../../components/DialogWindow/index';
import RecipesList from '../../../../../recipes/recipesList/RecipesList';
import {BaseApi} from "../../../../../../services/base";

class ChoiceRecipe extends React.Component {
    constructor(props) {
        super(props);
        const {recipe} = props;
        this.state = {
            selectedRecipe: recipe
        };
    }

    render() {
        return (
            <div>
                <div className="modal-body">
                    <RecipesList selectRecipeForAssembly={this.selectRecipeForAssembly}
                                 selectedRecipe={this.state.selectedRecipe}/>
                </div>
                <div className="modal-footer">
                    <button type="button"
                            onClick={this.props.close}
                            className="btn btn-secondary">Закрыть
                    </button>
                    <button type="button"
                            onClick={this.handleClick}
                            disabled={this.getDisabledState()}
                            className="btn btn-primary">Выбрать
                    </button>
                </div>
            </div>
        )
    }

    selectRecipeForAssembly = recipe => {
        this.setState({selectedRecipe: recipe});
    };

    handleClick = () => {
        const recipe = this.state.selectedRecipe;
        const baseApi = new BaseApi();

        baseApi
            .get(`recipes/${recipe.id}`)
            .then((resp) => this.props.choiceRecipe(resp.data))
            .catch(err => alert(err));
    };

    getDisabledState() {
        return !this.state.selectedRecipe
    }
}

export default DialogWindow(ChoiceRecipe);