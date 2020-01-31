import React from 'react';
import {connect} from 'react-redux';

import OrderInfo from '../orderCreate/OrderCreate';
import Loader from '../../../components/Loader';
import {getAllStocks} from '../../../AC/stocks';
import {saveOrderInfoInStore, editOrder} from '../store/actions/orders';
import {mapToArr} from '../../../helpers';

class EditOrder extends React.Component {
    itemsResultPrice;
    itemsPrepayment;

    constructor(props) {
        super(props);
        const {order} = this.props;
        const saveOrder = order;
        saveOrder.items = this.getItems(saveOrder);
        saveOrder.harpoons.map(harpoon => harpoon.resultHarpoonPrice = harpoon.sum);
        saveOrder.itemsResultPrice = this.itemsResultPrice;
        saveOrder.itemsPrepayment = this.itemsPrepayment;
        this.props.saveOrderInfoInStore(saveOrder);
        this.orderSave = true;
    }

    componentWillMount = () => this.props.getAllStocks();

    getItems = (saveOrder, order) => {
        this.itemsResultPrice = 0;
        this.itemsPrepayment = 0;
        return saveOrder.items.map(item => {
            const newItem = {
                item: item.item,
                stocks: this.getStocks(item),
                currentStock: {stock: item.stock.stock, count: item.stock.count},
                count: item.count
            };
            newItem.item.price = item.price;
            this.getItemPrice(item);
            return newItem;
        });
    };

    getStocks = orderItem => {
        const {items, order} = this.props;
        const infoCurrentItem = items.find(itemArr => (
            itemArr.item === orderItem.item.item
        ));
        let newStocks = [];
        newStocks.push(orderItem.stock);
        if (newStocks[0].stock.main && !order.stock.main) {
            const stock = infoCurrentItem.stocks.find(stockArr => (
               stockArr.stock.id === order.stock.id
            ));
            newStocks.push(stock);
        } else if (!newStocks[0].stock.main && !order.stock.main) {
            const stock = infoCurrentItem.stocks.find(stockArr => (
                stockArr.stock.main
            ));
            newStocks.push(stock);
        }
        return newStocks;
    };

    getItemPrice = item => {
        const resultPrice = Number(item.count) * Number(item.price);
        this.itemsResultPrice += resultPrice;
        if (item.item.requires_prepayment)
            this.itemsPrepayment += resultPrice;
    };

    handleSubmit = newOrder => {
        const {order} = this.props;
        this.props.editOrder(order.id, newOrder);
    };

    render() {
        const {stocks} = this.props;
        if (!stocks.length) {
            return <Loader/>
        }
        return (
            <OrderInfo stocks={stocks}
                       handleSubmit={this.handleSubmit}/>
        )
    }

    //componentWillUnmount = () => this.props.saveOrderInfoInStore(null);
}

export default connect((state) => ({
    order: state.orders.order,
    stocks: mapToArr(state.stocks.stocks),
    items: mapToArr(state.items.items)
}), {saveOrderInfoInStore, getAllStocks, editOrder})(EditOrder)