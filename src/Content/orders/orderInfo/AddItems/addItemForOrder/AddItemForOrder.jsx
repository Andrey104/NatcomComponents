import React from 'react';
import classNames from 'classnames/bind';

import DialogWindow from '../../../../../components/DialogWindow/index';
import ProductsPage from './productsPage/ProductsPage';
import MembranesPage from './membranesPage/MembranesPage';
import {countFormat} from '../../../../../services/utils';
import styles from './styles.css';



class AddItemForOrder extends React.Component {
    stockId;
    isProducts = true;
    client;

    constructor(props) {
        super(props);
        const {stock} = this.props;
        this.stockId = stock.id;
        this.state = {
            btnText: 'Пленки'
        };
    }

    getItems = () => {
        this.isProducts = !this.isProducts;
        const btnText = this.isProducts ? 'Пленки' : 'Товары';
        this.setState({btnText})
    };

    selectStock = stockId => this.stockId = stockId;

    handleSubmit = item => () => {
        const {currentItems, stock} = this.props;
        const checkItems = currentItems.filter(itemArr => (
            itemArr.item.item === item.item
        ));
        if (checkItems.length === 2 && !stock.main) return;
        if (checkItems.length === 1 && stock.main) return;
        const stocks = item.stocks.filter(stockArr => (
            stock.id === stockArr.stock.id || stockArr.stock.main
        ));
        const currentStock = stocks.find(stockArr => this.stockId === stockArr.stock.id);
        this.props.selectedProducts(item, stocks, currentStock);
    };

    getItemCount = item => {
        const count = item.stocks.find(stock => stock.stock.id === this.stockId).count;
        return countFormat(count);
    };

    getItemsList() {
        return this.isProducts ? this.getProductsInfo() : this.getMembranesInfo();
    }

    getProductsInfo() {
        return (
            <ProductsPage client={this.props.client}
                          getItemCount={this.getItemCount}
                          handleSubmit={this.handleSubmit}
                          selectStock={this.selectStock}
                          stock={this.props.stock}/>
        )
    }

    getMembranesInfo() {
        return (
            <MembranesPage client={this.props.client}
                           getItemCount={this.getItemCount}
                           handleSubmit={this.handleSubmit}/>
        )
    }

    render() {
        return (
            <div>
                <div className='modal-body content'>
                    <button type="button"
                            className="btn-dark"
                            onClick={this.getItems}>{this.state.btnText}
                    </button>
                    {this.getItemsList()}
                </div>
            </div>
        )
    }
}

export default DialogWindow(AddItemForOrder);