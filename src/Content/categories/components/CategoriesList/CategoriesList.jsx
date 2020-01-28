import React, {Component} from 'react';
import {connect} from 'react-redux';

import Loader from '../../../../components/Loader';
import AddButton from '../../../../components/AddButton';
import CategoryEditingPage from '../CategoryEditingPage/CategoryEditingPage';
import {getAllCategories, saveCategory, addNewCategory} from '../../store/actions/categories';
import {openModalWindow, closeModalWindow} from '../../../../AC/modal';
import {mapToArr} from '../../../../helpers';
import {ADD_NEW_CATEGORY} from '../../store/constantsCategory';

class CategoriesList extends Component {

    componentWillMount = () => this.props.getAllCategories();

    addNewCategory = client => this.props.addNewCategory(client);

    closeDialog = () => this.props.closeModalWindow();

    handleClick = category => () => {
        this.props.saveCategory(category);
        this.props.history.push(`/categories/${category.id}`);
    };

    getDialogWindow() {
        if (this.props.modal === ADD_NEW_CATEGORY) {
            return (
                <CategoryEditingPage header={'Новая категория'}
                                     handleSubmit={this.addNewCategory}
                                     close={this.closeDialog}/>
            )
        }
    };

    getBody(categories) {
        if (!categories.length) {
            return (
                <tr>
                    <td colSpan="2"
                        className="text-center">Нет категорий
                    </td>
                </tr>
            )
        }
        return (categories.map((category, index) => (
                <tr key={category.id}
                    onClick={this.handleClick(category)}>
                    <td>{++index}</td>
                    <td>{category.name}</td>
                </tr>
            )
        ))
    };

    render() {
        const {isLoading, categories, hasMoreCategories} = this.props;
        if (isLoading && categories.length === 0) {
            return (
                <div className="pre-loader-container">
                    <Loader/>
                </div>
            )
        }
        const loader = hasMoreCategories ? <Loader/> : false;
        return (
            <div className="row">
                {this.getDialogWindow()}
                <div className="col-12">
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
                                {this.getBody(categories)}
                                </tbody>
                            </table>
                            {loader}
                        </div>
                        <AddButton openAdd={() => this.props.openModalWindow(ADD_NEW_CATEGORY)}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect((state) => ({
    categories: mapToArr(state.categories.entries),
    isLoading: state.categories.isLoading,
    modal: state.modal.modal
}), {
    getAllCategories,
    saveCategory,
    addNewCategory,
    openModalWindow,
    closeModalWindow,
})(CategoriesList);