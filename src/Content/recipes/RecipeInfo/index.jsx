import React from 'react';

import AddProductDialog from '../../../components/addProductDialog/AddProductDialog';
import SelectedProductsForRecipe from './SelectedProductsForRecipe';

export default class RecipeInfo extends React.Component {
    constructor(props) {
        super(props);
        const {recipe} = this.props;

        if (recipe) {
            this.state = recipe;
            this.state.isInputOrOutputProducts = '';
            this.state.openAddProductDialog = false;
        }
        else {
            this.state = {
                name: '',
                input_products: null,
                output_products: null,
                isInputOrOutputProducts: '',
                openAddProductDialog: false
            };
        }
    }

    handleChangeRecipeName = (event) => {
        this.setState({name: event.target.value});
    };

    addProductState = (isInputOrOutputProducts) => () => {
        this.setState({
            openAddProductDialog: !this.state.openAddProductDialog,
            isInputOrOutputProducts
        })
    };

    selectedProducts = (products) => {
        const productsList = products.map(product => ({
            product,
            count: 0
        }));

        this.setState({
            openAddProductDialog: false,
            [this.state.isInputOrOutputProducts]: productsList
        });
    };

    handleChangeProductCount = (isInputOrOutputProducts) => (e, index) => {
        const products = this.state[isInputOrOutputProducts];
        const count = e.target.value;
        if (!isFinite(count)) return;

        products[index].count = +count;
        this.setState({
            [isInputOrOutputProducts]: products
        })
    };

    getDialogWindow = () => {
        if (!this.state.openAddProductDialog) return null;
        return <AddProductDialog header={'Добавить товар'}
                                 selectedProducts={this.selectedProducts}
                                 close={this.addProductState('')}/>
    };

    getDisabledState() {
        return !this.state.name || !this.state.input_products || !this.state.output_products;
    }

    handleSubmit = () => {
        const input_products = this.state.input_products.map(item => ({
            product: item.product.id, count: item.count
        }));
        const output_products = this.state.output_products.map(item => ({
            product: item.product.id, count: item.count
        }));

        const newRecipe = {
            name: this.state.name,
            input_products, output_products
        };

        this.props.handleSubmitRecipe(newRecipe)
    };

    render() {
        return (
            <div>
                {this.getDialogWindow()}
                <div className="form-group">
                    <label>Название</label>
                    <input type="text"
                           value={this.state.name}
                           onChange={this.handleChangeRecipeName}
                           className="form-control"/>
                </div>
                <div className='row'>
                    <SelectedProductsForRecipe products={this.state.input_products}
                                               title={'Входные товары'}
                                               addProductState={this.addProductState('input_products')}
                                               handleChangeCount={this.handleChangeProductCount('input_products')}/>
                    <SelectedProductsForRecipe products={this.state.output_products}
                                               title={'Выходные товары'}
                                               addProductState={this.addProductState('output_products')}
                                               handleChangeCount={this.handleChangeProductCount('output_products')}/>
                </div>
                <div className="col-sm-12 text-right">
                    <button type="button"
                            onClick={this.handleSubmit}
                            disabled={this.getDisabledState()}
                            className="btn btn-primary pull-right">
                        {this.props.recipe ? 'Редактировать' : 'Добавить'}
                    </button>
                </div>
            </div>
        )
    }
}