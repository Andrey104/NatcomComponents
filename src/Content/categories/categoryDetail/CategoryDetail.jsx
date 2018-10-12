import React from 'react';
import {connect} from 'react-redux';

import Loader from '../../../components/Loader';
import AddOrEditCategory from '../addOrEditCategory/AddOrEditCategory';
import {
    getSubcategories,
    editCategory,
    editSubcategory,
    addNewSubcategory
} from '../../../AC/categories';
import {openModalWindow, closeModalWindow} from '../../../AC/modal';
import {mapToArr} from '../../../helpers';
import {EDIT_CATEGORY, EDIT_SUBCATEGORY, ADD_SUBCATEGORY} from '../../../constans';

class CategoryDetail extends React.Component {
    editSub;

    componentWillMount = () => {
        const {category} = this.props;
        this.props.getSubcategories(category.id);
    };

    editCategory = newCategory => {
        const {category} = this.props;
        this.props.editCategory(category.id, newCategory);
    };

    addSubcategory = subcategory => {
        const {category} = this.props;
        this.props.addNewSubcategory(category.id, subcategory);
    };

    openEditSubcategoryDialog = sub => () => {
        this.editSub = sub;
        this.props.openModalWindow(EDIT_SUBCATEGORY);
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
                <AddOrEditCategory header={'Редактирование категории'}
                                   categoryName={category.name}
                                   handleSubmit={this.editCategory}
                                   close={this.closeDialog}/>
            )
        } else if (modal === EDIT_SUBCATEGORY) {
            return (
                <AddOrEditCategory header={'Редактирование подкатегории'}
                                   categoryName={this.editSub.name}
                                   handleSubmit={this.editSubcategory}
                                   close={this.closeDialog}/>
            )
        } else if (modal === ADD_SUBCATEGORY) {
            return (
                <AddOrEditCategory header={'Новая подкатегория'}
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
                <td>{++index}</td>
                <td>{sub.name}</td>
                <td>
                    <button type="button"
                            onClick={this.openEditSubcategoryDialog(sub)}
                            className="btn btn-dark btn-sm">Редактировать
                    </button>
                </td>
            </tr>
        ))
    }

    render() {
        const {category, isLoading} = this.props;
        if (isLoading) {
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
                    <h3>Категория: {category.name}</h3>
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
    isLoading: state.categories.isLoadingSubcategories,
    modal: state.modal.modal
}), {
    getSubcategories,
    editCategory,
    editSubcategory,
    openModalWindow,
    closeModalWindow,
    addNewSubcategory
})(CategoryDetail);