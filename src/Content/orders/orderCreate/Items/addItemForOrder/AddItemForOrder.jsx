import React from 'react';

import DialogWindow from '../../../../../components/ModalWindow/index';
import MembranesFilters from '../../../../../components/MembranesFilters';
import {countFormat, displayError} from '../../../../../services/utils';
import styles from './styles.css';
import ProductsFilters from "../../../../../components/productsFilters/ProductsFilters";
import ItemsList from "../../../../../components/ItemList/ItemList";
import connect from "react-redux/es/connect/connect";
import {setItemDialogState} from "../../../../../AC/orders";

class AddItemForOrder extends React.Component {
    stockId;

    constructor(props) {
        super(props);
        const {stock} = this.props;
        this.stockId = stock.id;
    }

    selectChange = (event) => {
        // this.setState({
        //     isProducts: event.target.value === "products"
        // });
        this.props.setItemDialogState(event.target.value === "products");
    };

    selectStock = stockId => this.stockId = stockId;

    handleSubmit = (item) => {
        const {currentItems, stock} = this.props;
        const checkItems = currentItems.filter(itemArr => (
            itemArr.item.item === item.item
        ));
        // if (checkItems.length === 2 && !stock.main) {
        //     displayError();
        //     return;
        // }
        const stocks = item.stocks;
        const currentStock = stocks[0];
        this.props.selectedProducts(item, stocks, currentStock);
    };

    // getItemCount = item => {
    //     const count = item.stocks.find(stock => stock.stock.id === this.stockId).count;
    //     return countFormat(count);
    // };

    getItemsList() {
        return (
            <ItemsList client={this.props.client}
                       handleSubmit={this.handleSubmit}
                       membraneMode={!this.props.itemDialogIsProducts}
                       selectMode={true}/>
        )
    }

    getFilters() {
        let filters = null;
        if (this.props.itemDialogIsProducts) {
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

    getProductsMembraneSelectorValue() {
        if (this.props.itemDialogIsProducts) {
            return 'products'
        } else {
            return 'membranes'
        }
    }

    getProductsMembranesSelector() {
        const {returnChecked} = this.props;
        if (!returnChecked) {
            return(
                <div>
                    <label>Раздел</label>
                    <select className="form-control"
                            defaultValue={this.getProductsMembraneSelectorValue()}
                            onChange={this.selectChange}>
                        <option value="products">Товары</option>
                        <option value="membranes">Полотна</option>
                    </select>
                    <hr/>
                </div>
            );
        }
    }

    render() {
        return (
            <div>
                <div className='modal-body'>
                    <div className="row">
                        <div className="col-12 col-md-3">
                            {this.getProductsMembranesSelector()}
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

export default connect(state => ({
        itemDialogIsProducts: state.orders.itemDialogIsProducts
    }),
    {setItemDialogState})(DialogWindow(AddItemForOrder));