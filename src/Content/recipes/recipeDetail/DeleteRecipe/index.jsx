import React from 'react';

import DialogWindow from '../../../../components/DialogWindow';
import {BaseApi} from '../../../../services/base';

class DeleteRecipe extends React.Component {
    render() {
        return (
            <div>
                <div className="modal-body">
                    Вы действительно хотите удалить данный рецепт?
                </div>
                <div className="modal-footer">
                    <button type="button"
                            onClick={this.props.close}
                            className="btn btn-secondary">Отмена
                    </button>
                    <button type="submit"
                            onClick={this.handleSubmit}
                            className="btn btn-primary">Удалить
                    </button>
                </div>
            </div>
        )
    }

    handleSubmit = event => {
        event.preventDefault();
        this.deleteRecipe();
    };

    deleteRecipe() {
        const {recipe} = this.props;
        const baseApi = new BaseApi();
        baseApi
            .delete(`recipes/${recipe.id}/`)
            .then(() => this.props.successDeleteRecipe())
            .catch(err => alert(err));
    }
}

export default DialogWindow(DeleteRecipe);