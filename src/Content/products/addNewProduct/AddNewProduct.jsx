import React from 'react';
import classNames from 'classnames/bind';
import {connect} from 'react-redux';

import Loader from '../../../components/Loader';
import ItemImages from '../../../components/addNewItem/ItemImages';
import SelectCategories from '../../../components/SelectCategories';
import AddStocksDialog from '../../../components/AddStocksDialog/AddStocksDialog';
import ItemStocks from '../../../components/addNewItem/ItemStocks';
import PricesList from '../../../components/addNewItem/PricesList';
import {BaseApi} from '../../../services/base';
import {getSubcategories, getCategoriesAndSubcategories} from '../../../AC/categories';
import {units} from '../../../constans';
import {mapToArr} from '../../../helpers';
import styles from './styles.scss';

let cx = classNames.bind(styles);

class AddNewProduct extends React.Component {
    baseApi = new BaseApi();
    stocks = [];
    prices;
    category;
    subcategory;

    state = {
        name: null,
        unit: 1,
        harpoon: false,
        stocks: [],
        prepayment: false,
        images: [],
        openAddStocksDialog: false
    };

    componentWillMount = () => this.props.getCategoriesAndSubcategories();

    handleChangeProduct = event => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({[name]: value});
    };

    handleChangeProductBoolean = event => {
        const name = event.target.name;
        const value = Boolean(event.target.checked);
        this.setState({[name]: value});
    };

    selectPrices = prices => this.prices = prices;

    selectCategory = categoryId => {
        this.category = categoryId;
        this.props.getSubcategories(categoryId);
    };

    selectSubcategory = subcategoryId => this.subcategory = subcategoryId;

    addStocks = stocks => {
        this.setState({
            openAddStocksDialog: !this.state.openAddStocksDialog,
            stocks
        });
        this.stocks = stocks.map(stock => ({stock: stock.id}));
    };

    addStocksState = () => this.setState({openAddStocksDialog: !this.state.openAddStocksDialog});

    addItemStocks = (value, index, state) => {
        this.stocks[index][state] = Number(value);
    };

    handleProductImages = images => this.setState({images});

    handleSubmit = event => {
        event.preventDefault();
        const newProduct = this.getNewProduct();
        this.baseApi
            .post(`items/products/`, newProduct)
            .then(response => {
                this.props.history.push(`/products/${response.data.id}`);
            });
    };

    getNewProduct() {
        return {
            name: this.state.name,
            unit: this.state.unit,
            harpoon: this.state.harpoon,
            requires_prepayment: this.state.prepayment,
            price_good: this.prices.priceGood,
            price_standard: this.prices.priceStandard,
            price_best: this.prices.priceBest,
            category: this.category,
            subcategory: this.subcategory,
            stocks: this.stocks,
            add_images: this.state.images
        };
    }

    getDefaultValues() {
        const {categories, subcategories} = this.props;
        this.category = categories[0].id;
        this.subcategory = subcategories.length !== 0 ? subcategories[0].id : null;
    }

    checkForm() {
        if (!this.state.name) {
            return true;
        }
    }

    getDialogWindow() {
        let dialogWindow = null;
        if (this.state.openAddStocksDialog) {
            dialogWindow = <AddStocksDialog header={'Добавить склады'}
                                            addStocks={this.addStocks}
                                            close={this.addStocksState}/>
        }
        return dialogWindow;
    }

    getBody(categories, subcategories) {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="row">
                    <div className="col-6 form-group">
                        <label htmlFor="name"
                               className="required-area">Название</label>
                        <input type="text"
                               name="name"
                               onChange={this.handleChangeProduct}
                               className="form-control"
                               id="name"
                               placeholder="Введите название товара"/>
                    </div>
                    <div className="col-6 form-group">
                        <label className="required-area">Единица измерений</label>
                        <select className="form-control"
                                name="unit"
                                onChange={this.handleChangeProduct}
                                defaultValue={this.state.unit}>
                            {units.map((unit, index) => (
                                <option value={++index} key={index}>{unit}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <PricesList selectPricesList={this.selectPrices}/>
                    </div>
                </div>
                <SelectCategories categories={categories}
                                  subcategories={subcategories}
                                  selectCategory={this.selectCategory}
                                  selectSubcategory={this.selectSubcategory}/>
                <div className="form-group form-check">
                    <input type="checkbox"
                           name="harpoon"
                           onChange={this.handleChangeProductBoolean}
                           className="form-check-input"
                           id="harpoon"/>
                    <label className="form-check-label"
                           htmlFor="harpoon">Гарпун (Ставим, если товар представляет собой гарпун и им можно огарпунить полотно. Для 99% товаров НЕ ставим)</label>
                </div>
                <div className="form-group form-check">
                    <input type="checkbox"
                           name="prepayment"
                           onChange={this.handleChangeProductBoolean}
                           className="form-check-input"
                           id="prepayment"/>
                    <label className="form-check-label"
                           htmlFor="prepayment">Предоплата</label>
                </div>
                <button type="button"
                        className="btn btn-primary"
                        onClick={this.addStocksState}>Добавить склады
                </button>
                <ItemStocks stocks={this.state.stocks}
                            addItemStocks={this.addItemStocks}/>
                <ItemImages handleItemImages={this.handleProductImages}/>
                <div className="col-12">
                    <button type="submit"
                            disabled={this.checkForm()}
                            className={cx('btn', 'btn-primary', 'submit-btn')}>Добавить товар
                    </button>
                </div>
            </form>
        )
    }

    render() {
        const {isLoading, categories, subcategories} = this.props;
        if (isLoading || categories.length === 0) {
            return (
                <div className="pre-loader-container">
                    <Loader/>
                </div>
            );
        }
        const dialogWindow = this.getDialogWindow();
        this.getDefaultValues();
        const body = this.getBody(categories, subcategories);
        return (
            <div>
                {dialogWindow}
                {body}
            </div>
        )
    }
}

export default connect((state) => ({
    categories: mapToArr(state.categories.entries),
    subcategories: mapToArr(state.categories.subcategories),
    isLoading: state.categories.isLoading
}), {getCategoriesAndSubcategories, getSubcategories})(AddNewProduct);