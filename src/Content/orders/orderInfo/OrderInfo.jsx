import React from 'react';
import {connect} from 'react-redux';

import Loader from '../../../components/Loader';
import AddClient from './addClient/AddClient';
import StocksSelect from '../../../components/StocksSelect';
import DatePicker from '../../../components/datePickers/DatePicker';
import AddItems from './AddItems';
import HarpoonsList from './HarpoonsList';
import CommentField from '../../../components/CommentField';
import ResultPrices from './ResultPrices';
import {BaseApi} from '../../../services/base';
import {saveOrderInfoInStore} from '../../../AC/orders';
import {saveHarpoon} from '../../../AC/harpoons';
import {deleteItemsFromStore} from '../../../AC/items';
import {
    getNewHarpoon,
    getDateForServer,
    getItemsInfoParams,
    changeItemsStocks
} from '../../../services/utils';
import history from '../../../history';
import './styles.css';

class OrderInfo extends React.Component {
    baseApi = new BaseApi();
    comment = null;
    defaultStock = null;
    itemsResultPrice = 0;
    itemsPrepayment = 0;
    harpoonsResultPrice = 0;
    btnText = 'Добавить';

    constructor(props) {
        super(props);
        const {orderSave} = this.props;
        if (orderSave) {
            this.comment = orderSave.comment;
            this.itemsResultPrice = orderSave.itemsResultPrice;
            this.harpoonsResultPrice = this.getHarpoonsPrice(orderSave.harpoons);
            this.itemsPrepayment = orderSave.itemsPrepayment;
            this.state = {
                date: orderSave.date,
                stock: orderSave.stock,
                client: orderSave.client,
                items: orderSave.items,
                harpoons: orderSave.harpoons,
                openDialogWindow: false
            };
            const currentUrl = history.location.pathname;
            if (currentUrl.indexOf('edit') !== -1) this.btnText = 'Изменить';
        } else {
            this.state = {
                stock: null,
                client: null,
                date: null,
                items: [],
                harpoons: [],
                openDialogWindow: false
            };
        }
    }

    addClient = client => this.setState({client});

    addStock = stock => {
        let items = this.state.items;
        if (items.length) {
            const params = getItemsInfoParams(items);
            let serverItems;
            this.baseApi
                .get(`items/info/${params}`)
                .then(response => {
                    serverItems = response.data;
                    items = changeItemsStocks(items, serverItems, stock);
                    this.setState({stock, items});
                });
        } else {
            this.setState({stock, items});
        }
    };

    addDate = date => this.setState({date});

    addComment = comment => this.comment = comment;

    addItems = (items, resultPrise, resultPrepayment) => {
        this.itemsResultPrice = resultPrise;
        this.itemsPrepayment = resultPrepayment;
        this.setState({items});
    };

    dialogWindowState = () => this.setState({openDialogWindow: !this.state.openDialogWindow});

    handleAddHarpoon = () => this.addOrEditHarpoon();

    addOrEditHarpoon = (obj = {harpoon: null, client: this.state.client}) => {
        this.saveOrderInfo();
        this.props.saveHarpoon(obj);
        history.push(`/orders/add_order/add_harpoon`);
    };

    getHarpoonsPrice = harpoons => {
        let resultPrice = 0;
        for (const harpoon of harpoons)
            resultPrice += Number(harpoon.resultHarpoonPrice);
        return resultPrice;
    };

    removeHarpoonFromList = harpoon => {
        this.harpoonsResultPrice -= harpoon.resultHarpoonPrice;
        const newHarpoonsList = this.state.harpoons.filter(harpoonArr => harpoonArr.id !== harpoon.id);
        this.setState({harpoons: newHarpoonsList});
    };

    editHarpoon = harpoon => {
        const obj = {harpoon, client: this.state.client};
        this.addOrEditHarpoon(obj);
    };

    handleSubmit = event => {
        event.preventDefault();
        const newOrder = this.getNewOrder();
        this.props.handleSubmit(newOrder);
    };

    getNewOrder = () => {
        const {stock} = this.state;
        const orderStock = stock ? stock.id : this.defaultStock.id;
        const newOrder = {
            date: getDateForServer(this.state.date),
            client: this.state.client.id,
            stock: orderStock,
            comment: this.comment,
            items: this.getItems(),
            source: 1
        };
        newOrder.harpoons = this.state.harpoons.map(harpoon => {
            return getNewHarpoon(harpoon);
        });
        return newOrder;
    };

    getItems = () => {
        let itemsArr = [];
        for (const arrItem of this.state.items) {
            itemsArr.push({
                item: arrItem.item.item,
                count: arrItem.count,
                stock: arrItem.currentStock.stock.id
            })
        }
        return itemsArr;
    };

    checkForm() {
        const {items, date, harpoons} = this.state;
        if ((!items.length && !harpoons.length) || !date) {
            return true;
        } else if (items.length) {
            for (const item of items) {
                if (item.count && !item.error) {
                    if (item.count === 0) return true;
                } else
                    return true;
            }
        }
        return false;
    }

    getAddItems() {
        if (this.state.client) {
            return (
                <AddItems client={this.state.client}
                          stock={this.state.stock || this.defaultStock}
                          addItems={this.addItems}
                          items={this.state.items}
                          itemsResultPrice={this.itemsResultPrice}
                          dialogWindowState={this.dialogWindowState}/>
            )
        }
    }

    getAddHarpoon() {
        if (this.state.client) {
            return (
                <div className="col-sm-12">
                    <button type="button"
                            onClick={this.handleAddHarpoon}
                            className="btn btn-primary btn-sm">Добавить гарпун
                    </button>
                </div>
            )
        }
    }

    getResultPrices() {
        if (this.state.items.length || this.state.harpoons.length) {
            return (
                <ResultPrices harpoonsResultPrice={this.harpoonsResultPrice}
                              itemsPrepayment={this.itemsPrepayment}
                              itemsResultPrice={this.itemsResultPrice}/>
            )
        }
    }

    render() {
        const {isLoading, stocks} = this.props;
        if (stocks.length === 0 || isLoading) {
            return (
                <div className="pre-loader-container">
                    <Loader/>
                </div>
            );
        }
        this.defaultStock = this.state.stock ? null : stocks[0];
        return (
            <div className="row">
                <div className="col-6">
                    <AddClient addClient={this.addClient}
                               dialogWindowState={this.dialogWindowState}
                               client={this.state.client}/>
                    <StocksSelect stocks={stocks}
                                  stock={this.state.stock}
                                  addStock={this.addStock}/>
                    <CommentField comment={this.comment}
                                  commentName={'заказу'}
                                  addComment={this.addComment}/>
                </div>
                <div className="col-6">
                    <DatePicker selectDate={this.addDate}
                                date={this.state.date}/>
                </div>
                {this.getAddItems()}
                {this.getAddHarpoon()}
                <HarpoonsList harpoons={this.state.harpoons}
                              harpoonsResultPrice={this.harpoonsResultPrice}
                              editHarpoon={this.editHarpoon}
                              removeHarpoonFromList={this.removeHarpoonFromList}/>
                {this.getResultPrices()}
                <div className="col-sm-12 text-right">
                    <button type="submit"
                            onClick={this.handleSubmit}
                            disabled={this.checkForm()}
                            className="btn btn-primary pull-right">{this.btnText}
                    </button>
                </div>
            </div>
        )
    }

    saveOrderInfo = () => {
        const order = this.state;
        order.comment = this.comment;
        order.itemsResultPrice = this.itemsResultPrice;
        order.itemsResultPrice = this.itemsResultPrice;
        order.itemsPrepayment = this.itemsPrepayment;
        order.harpoonsResultPrice = this.harpoonsResultPrice;
        order.stock = order.stock ? order.stock : this.defaultStock;
        this.props.saveOrderInfoInStore(order);
    };

    componentWillUnmount = () => {
        if (this.state.client) {
            const nextUrl = history.location.pathname;
            const isOrder = nextUrl.indexOf('orders');
            if ((isOrder === -1 || nextUrl === '/orders') && this.btnText !== 'Изменить') {
                const result = confirm('Сохранить результат?');
                result ? this.saveOrderInfo() : this.props.saveOrderInfoInStore(null);
            }
        }
        this.props.deleteItemsFromStore();
    }
}

export default connect((state) => ({
    orderSave: state.orders.orderSave,
}), {saveOrderInfoInStore, saveHarpoon, deleteItemsFromStore})(OrderInfo);