import React, {Component} from 'react';
import {connect} from 'react-redux';

import Loader from '../../../../components/Loader';
import CategoryEditingPage from '../CategoryEditingPage/CategoryEditingPage';
import {
    getCategory,
    getSubcategories,
    editCategory,
    editSubcategory,
    addNewSubcategory
} from '../../store/actions/categories';
import {openModalWindow, closeModalWindow} from '../../../../AC/modal';
import {mapToArr} from '../../../../helpers';
import {EDIT_CATEGORY, EDIT_SUBCATEGORY, ADD_SUBCATEGORY} from '../../store/constantsCategory';
import './CategoryInfoPage.css';

class CategoryInfoPage extends Component {
    editSub;

    componentDidMount() {
        this.props.getCategory(this.props.match.params.categoryId);
        this.props.getSubcategories(this.props.match.params.categoryId);
    };

    addSubcategory = subcategory => {
        const {category} = this.props;
        this.props.addNewSubcategory(category.id, subcategory);
    };

    openEditSubcategoryDialog = sub => () => {
        this.editSub = sub;
        this.props.openModalWindow(EDIT_SUBCATEGORY);
    };

    editCategory = newCategory => {
        const {category} = this.props;
        this.props.editCategory(category.id, newCategory);
    };

    editSubcategory = subcategory => {
        const {category} = this.props;
        this.props.editSubcategory(category.id, this.editSub.id, subcategory);
    };

    closeDialog = () => this.props.closeModalWindow();

    getDialogWindow() {
        const {modal, category} = this.props;
        if (modal === EDIT_CATEGORY) {
            return (
                <CategoryEditingPage header={'Редактирование категории'}
                                     categoryName={category.name}
                                     handleSubmit={this.editCategory}
                                     close={this.closeDialog}/>
            )
        } else if (modal === EDIT_SUBCATEGORY) {
            return (
                <CategoryEditingPage header={'Редактирование подкатегории'}
                                     categoryName={this.editSub.name}
                                     handleSubmit={this.editSubcategory}
                                     close={this.closeDialog}/>
            )
        } else if (modal === ADD_SUBCATEGORY) {
            return (
                <CategoryEditingPage header={'Новая подкатегория'}
                                     handleSubmit={this.addSubcategory}
                                     close={this.closeDialog}/>
            )
        }
    }

    getSubcategories() {
        const {subcategories} = this.props;
        if (!subcategories.length) {
            return (
                <tr>
                    <td colSpan="2"
                        className="text-center">Нет подкатегорий
                    </td>
                </tr>
            )
        }
        return subcategories.map((sub, index) => (
            <tr key={sub.id}>
                <td className="table-cell-width-index">
                    <img onClick={this.openEditSubcategoryDialog(sub)} src="/public/edit.svg"
                         className="circle-button edit-button"/>
                         {++index}
                </td>
                <td>{sub.name}</td>
            </tr>
        ))
    }

    render() {
        if (this.props.isLoading) {
            return (
                <div className="pre-loader-container">
                    <Loader/>
                </div>
            );
        }
        return (
            <div>
                <div className="col-12">
                    {this.getDialogWindow()}
                    <h5>Список подкатегорий:</h5>
                    <table className="table table-bordered">
                        <thead className="thead-light">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Название</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.getSubcategories()}
                        </tbody>
                    </table>
                    <button type="button"
                            onClick={() => this.props.openModalWindow(EDIT_CATEGORY)}
                            className="btn btn-primary btn-sm">Редактировать
                    </button>
                    <button type="button"
                            onClick={() => this.props.openModalWindow(ADD_SUBCATEGORY)}
                            className="btn btn-success btn-sm">Добавить подкатегорию
                    </button>
                </div>
            </div>
        )
    }
}

export default connect(state => ({
    category: state.categories.category,
    subcategories: mapToArr(state.categories.subcategories),
    isLoading: state.categories.isLoading,
    modal: state.modal.modal
}), {
    getCategory,
    getSubcategories,
    editCategory,
    editSubcategory,
    openModalWindow,
    closeModalWindow,
    addNewSubcategory
})(CategoryInfoPage);