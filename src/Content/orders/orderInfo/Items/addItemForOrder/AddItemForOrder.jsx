import React from 'react';

import DialogWindow from '../../../../../components/DialogWindow/index';
import MembranesFilters from '../../../../../components/MembranesFilters';
import {countFormat, displayError} from '../../../../../services/utils';
import styles from './styles.css';
import ProductsFilters from "../../../../../components/productsFilters/ProductsFilters";
import ProductsList from "../../../../../components/ItemList/ItemList";

class AddItemForOrder extends React.Component {
    stockId;
    constructor(props) {
        super(props);
        const {stock} = this.props;
        this.stockId = stock.id;
        this.state = {
            isProducts: true
        };
    }

    selectChange = (event) => {
        this.setState({
            isProducts: event.target.value === "products"
        });
    };

    selectStock = stockId => this.stockId = stockId;

    handleSubmit = (item) => {
        const {currentItems, stock} = this.props;
        const checkItems = currentItems.filter(itemArr => (
            itemArr.item.item === item.item
        ));
        if (checkItems.length === 2 && !stock.main) {
            displayError();
            return;
        }

        if (checkItems.length === 1 && stock.main) {
            displayError('Вы уже добавили этот товар!');
            return;
        }
        const stocks = item.stocks.filter(stockArr => (
            stock.id === stockArr.stock.id || stockArr.stock.main
        ));
        const currentStock = stocks.find(stockArr => this.stockId === stockArr.stock.id);
        this.props.selectedProducts(item, stocks, currentStock);
    };

    // getItemCount = item => {
    //     const count = item.stocks.find(stock => stock.stock.id === this.stockId).count;
    //     return countFormat(count);
    // };

    getItemsList() {
        return this.state.isProducts ? this.getProductsInfo() : this.getMembranesInfo();
    }

    getProductsInfo() {
        return (
            <ProductsList client={this.props.client}
                          handleSubmit={this.handleSubmit}
                          membraneMode={false}
                          selectMode={true}/>
        )
    }

    getMembranesInfo() {
        return (
            <ProductsList client={this.props.client}
                          handleSubmit={this.handleSubmit}
                          membraneMode={true}
                          selectMode={true}/>
        )
    }

    getFilters() {
        let filters = null;
        if (this.state.isProducts) {
            filters = (
                <div>
                    {/*<StockForOrder products={this.props.products}*/}
                                   {/*stock={this.stockId}*/}
                                   {/*selectStock={this.selectStock}/>*/}
                    <ProductsFilters/>
                </div>
            );
        } else {
            filters = (
                <div>
                    <MembranesFilters/>
                </div>
            );
        }
        return filters;
    }

    render() {
        return (
            <div>
                <div className='modal-body'>
                    <div className="row">
                        <div className="col-12 col-md-3">
                            <label>Раздел</label>
                            <select className="form-control"
                                    onChange={this.selectChange}>
                                <option value="products">Товары</option>
                                <option value="membranes">Полотна</option>
                            </select>
                            <hr/>
                            {this.getFilters()}
                        </div>
                        <div className="col-12 col-md-9 list-container">
                            {this.getItemsList()}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default DialogWindow(AddItemForOrder);