import React from 'react';
import classNames from 'classnames/bind';
import {connect} from 'react-redux';
import history from '../../../history';

import Loader from '../../../components/Loader';
import ItemImages from '../../../components/addNewItem/ItemImages';
import SelectCategories from '../../../components/SelectCategories';
import AddStocksDialog from '../../../components/AddStocksDialog/AddStocksDialog';
import ItemStocks from '../../../components/addNewItem/ItemStocks';
import PricesList from '../../../components/addNewItem/PricesList';
import {BaseApi} from '../../../services/base';
import {getSubcategories, getCategoriesAndSubcategories, saveCategories} from '../../../AC/categories';
import {units} from '../../../constans';
import {mapToArr} from '../../../helpers';
import styles from './styles.scss';
import {getProduct} from "../../../AC/products";

let cx = classNames.bind(styles);

class EditProduct extends React.Component {
    urlId;

    baseApi = new BaseApi();
    stocks = [];
    prices = {
        priceGood: undefined,
        priceBest: undefined,
        priceStandard: undefined,
        priceIn: undefined
    };


    state = {
        name: null,
        unit: 1,
        harpoon: false,
        stocks: [],
        prepayment: false,
        images: [],
        openAddStocksDialog: false,
        category: null,
        subcategory: null,
        editMode: false
    };

    constructor(props) {
        super(props);
        // this.setEditProduct(product);
    }

    componentWillMount = () => {
        this.props.getCategoriesAndSubcategories();

        this.urlId = this.props.match.params.productId;
        if (this.urlId) {
            this.loadProduct(this.urlId);
        }

    };

    loadProduct(productId) {
        this.baseApi
            .get(`items/products/${productId}/`)
            .then(response => {
                this.setEditProduct(response.data);
            });
    }

    setCategoryAndSubcategory(category, subcategory) {
        this.props.getSubcategories(category.id);
        this.setState({
            category: category,
            subcategory: subcategory
        });

    }

    setEditProduct(product) {
        console.log(product);
        this.setState({
            name: product.name,
            unit: product.unit,
            harpoon: product.harpoon,
            stocks: product.stocks,
            prepayment: product.requires_prepayment,
            images: product.images,
            editMode: true
        });
        this.prices.priceGood = product.price_good;
        this.prices.priceStandard = product.price_standard;
        this.prices.priceBest = product.price_best;
        this.prices.priceIn = product.price_in;
        this.setCategoryAndSubcategory(product.category, product.subcategory);
        this.stocks = product.stocks;
        console.log(this.prices);

        //     name: this.state.name,
        //     unit: this.state.unit,
        //     harpoon: this.state.harpoon,
        //     requires_prepayment: this.state.prepayment,
        //     price_good: this.prices.priceGood,
        //     price_standard: this.prices.priceStandard,
        //     price_best: this.prices.priceBest,
        //     price_in: this.prices.priceIn,
        //     category: this.category,
        //     subcategory: this.subcategory,
        //     stocks: this.stocks,
        //     add_images: this.state.images
    }

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
        this.setState({
            category: categoryId
        });
        this.props.getSubcategories(categoryId);
    };

    selectSubcategory = subcategoryId => {this.setState({
        subcategory: subcategoryId
    })};

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
        if (this.state.editMode) {
            this.baseApi
                .put(`items/products/${this.urlId}/`, newProduct)
                .then(response => {
                    this.props.history.push(`/products/${response.data.id}`);
                });
        } else {
            this.baseApi
                .post(`items/products/`, newProduct)
                .then(response => {
                    this.props.history.push(`/products/${response.data.id}`);
                });
        }
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
            price_in: this.prices.priceIn,
            category: this.getDefaultCategory(),
            subcategory: this.getDefaultSubcategory(),
            stocks: this.getStocks(this.stocks),
            add_images: this.state.images
        };
    }

    getStocks(stocks) {
        var stocks = stocks.map(stock => ({
            stock: this.getStockID(stock),
            min_count: stock.min_count,
            desired_count: stock.desired_count
        }));
        return stocks;
    }

    getStockID(stock) {
        if (stock.stock) {
            return stock.stock.id;
        } else {
            return stock.id;
        }
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
            dialogWindow = <AddStocksDialog header={'Указать склады'}
                                            addStocks={this.addStocks}
                                            close={this.addStocksState}/>
        }
        return dialogWindow;
    }

    getDefaultCategory() {
        if (this.state.category.id) {
            return this.state.category.id;
        } else {
            return this.state.category;
        }
    }

    getDefaultSubcategory() {
        if (this.state.subcategory.id) {
            return this.state.subcategory.id;
        } else {
            return this.state.subcategory;
        }
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
                               value={this.state.name}
                               defaultValue={this.state.name}/>
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
                        <PricesList prices={this.prices}
                                    selectPricesList={this.selectPrices}/>
                    </div>
                </div>
                <SelectCategories categories={categories}
                                  subcategories={subcategories}
                                  defaultCategory={this.getDefaultCategory()}
                                  defaultSubcategory={this.getDefaultSubcategory()}
                                  selectCategory={this.selectCategory}
                                  selectSubcategory={this.selectSubcategory}/>
                <div className="form-group form-check">
                    <input type="checkbox"
                           name="harpoon"
                           onChange={this.handleChangeProductBoolean}
                           className="form-check-input"
                           id="harpoon"/>
                    <label className="form-check-label"
                           htmlFor="harpoon">Гарпун (Ставим, если товар представляет собой гарпун и им можно огарпунить
                        полотно. Для 99% товаров НЕ ставим)</label>
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
                        onClick={this.addStocksState}>Указать склады
                </button>
                <ItemStocks stocks={this.state.stocks}
                            addItemStocks={this.addItemStocks}/>
                <ItemImages handleItemImages={this.handleProductImages}/>
                <div className="col-12">
                    <button type="submit"
                            disabled={this.checkForm()}
                            className={cx('btn', 'btn-primary', 'submit-btn')}>Сохранить
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
        //this.getDefaultValues();
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
    product: state.products.product,
    isLoading: state.categories.isLoading
}), {getCategoriesAndSubcategories, getSubcategories, getProduct, saveCategories})(EditProduct);