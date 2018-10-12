import React from 'react';

import ChoiceRecipeDialog from './ChoiceRecipeDialog/index';
import InputAndOutputProducts from '../../../../recipes/recipeDetail/InputAndOutputProducts/index'
import {BaseApi} from "../../../../../services/base";

export default class AddNewAssembly extends React.Component {
    state = {
        recipe: null,
        count: '',
        openChoiceRecipeDialog: false
    };

    handleChangeAssemblyCount = (event) => {
        this.setState({count: event.target.value});
    };

    handleSubmit = event => {
        event.preventDefault();
        const newAssembly = {
            recipe: this.state.recipe.id,
            count: this.state.count
        };
        this.handleSubmitAssembly(newAssembly);
    };

    handleSubmitAssembly = (newAssembly) => {
        const baseApi = new BaseApi();
        baseApi
            .post(`assemblies/`, newAssembly)
            .then((res) => this.props.history.push(`/assemblies/${res.data.id}`))
            .catch(err => alert(err));
    };

    getDisabledState() {
        return !this.state.recipe || !this.state.count;
    }

    getDialogWindow = () => {
        if (!this.state.openChoiceRecipeDialog) return null;
        return <ChoiceRecipeDialog header={'Выберите рецепт'}
                                   choiceRecipe={this.choiceRecipe}
                                   recipe={this.state.recipe}
                                   close={this.choiceRecipeDialogState}/>
    };

    choiceRecipe = (recipe) => {
        this.setState({recipe});
        this.choiceRecipeDialogState();
    };

    choiceRecipeDialogState = () => {
        this.setState({openChoiceRecipeDialog: !this.state.openChoiceRecipeDialog});
    };

    getRecipe() {
        const {recipe} = this.state;
        if (!recipe) return <div>Выберите рецепт</div>;

        return (
            <div className='col-12'>
                <h5><i>Название:</i> {recipe.name}</h5>
                <InputAndOutputProducts obj={recipe}/>
            </div>
        )
    }

    render() {
        return (
            <div>
                <div>
                    {this.getDialogWindow()}
                    <h5>Рецепт</h5>
                    {this.getRecipe()}
                    <button type="button"
                            onClick={this.choiceRecipeDialogState}
                            className="btn btn-success btn-sm">Выбрать рецепт
                    </button>
                    <div className="form-group">
                        <label><h5>Количество</h5></label>
                        <input type="text"
                               value={this.state.count}
                               onChange={this.handleChangeAssemblyCount}
                               className="form-control"/>
                    </div>
                </div>
                <div className="col-sm-12 text-right">
                    <button type="submit"
                            onClick={this.handleSubmit}
                            disabled={this.getDisabledState()}
                            className="btn btn-primary">Добавить
                    </button>
                </div>
            </div>
        )
    }
}
