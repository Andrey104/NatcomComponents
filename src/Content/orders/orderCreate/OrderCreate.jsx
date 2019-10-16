import React from 'react';
import {connect} from 'react-redux';

import Loader from '../../../components/Loader';
import AddClient from './addClient/AddClient';
import StocksSelect from '../../../components/StocksSelect';
import DatePickerInput from '../../../components/datePickers/DatePickerInput';
import Items from './Items';
import HarpoonsList from './HarpoonsList';
import CustomPositions from './customPositions/customPositions';
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

class OrderCreate extends React.Component {
    baseApi = new BaseApi();
    comment = null;
    defaultStock = null;
    itemsResultPrice = 0;
    itemsPrepayment = 0;
    harpoonsResultPrice = 0;
    btnText = 'Сохранить';
    currentUrl;


    constructor(props) {
        super(props);
        this.currentUrl = history.location.pathname;
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
                custom_positions: orderSave.custom_positions,
                openDialogWindow: false
            };
            if (this.currentUrl.indexOf('edit') !== -1) this.btnText = 'Изменить';
        } else {
            this.state = {
                stock: null,
                client: null,
                date: Date(),
                items: [],
                harpoons: [],
                custom_positions: [],
                openDialogWindow: false,
                returnChecked: false
            };
        }
    }

    updateCustomPositions = customPositions => {
        this.setState({custom_positions: customPositions});
    };

    addClient = client => {
        this.setState({client});
    };

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

    handleSubmit = event => {
        event.preventDefault();
        const newOrder = this.getNewOrder();
        this.props.handleSubmit(newOrder);
    };

    // Получение заказа, перед отправкой на сервер ---------------
    getNewOrder = () => {
        const {stock} = this.state;
        const orderStock = stock ? stock.id : this.defaultStock.id;
        const newOrder = {
            date: getDateForServer(this.state.date),
            client: this.state.client.id,
            stock: orderStock,
            comment: this.comment,
            items: this.getItems(),
            source: 1,
            custom_positions: this.state.custom_positions,
            return_order: this.state.returnChecked
        };

        // Если в данный момент заказ создается, а не редактируется
        if (this.currentUrl.indexOf('edit') === -1) {
            newOrder.harpoons = this.state.harpoons.map(harpoon => {
                return getNewHarpoon(harpoon);
            });
        } else {
            newOrder.harpoons = [];
        }
        return newOrder;
    };

    // Получаем товары и полотна
    getItems = () => {
        let itemsArr = [];
        if (this.state.returnChecked) {
            for (const arrItem of this.state.items) {
                itemsArr.push({
                    item: arrItem.item.item,
                    count: -(arrItem.count),
                    stock: arrItem.currentStock.stock.id
                })
            }
        } else {
            for (const arrItem of this.state.items) {
                itemsArr.push({
                    item: arrItem.item.item,
                    count: (arrItem.count),
                    stock: arrItem.currentStock.stock.id
                })
            }
        }

        return itemsArr;
    };

    // ----------------------------------------------------------------

    checkForm() {
        const {items, date, harpoons} = this.state;
        if ((!items.length && !harpoons.length) || !date) {
            return true;
        } else if (items.length) {
            // for (const item of items) {
            //     if (item.count && !item.error) {
            //         if (item.count === 0) return true;
            //     } else
            //         return true;
            // }
        }
        return false;
    }

    /* Harpoons ---------------------- */

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

    getHarpoonList() {
        if ((this.currentUrl.indexOf('edit') === -1) && (!this.state.returnChecked)) {
            return (
                <div className="harpoons col-12">
                    <HarpoonsList harpoons={this.state.harpoons}
                                  harpoonsResultPrice={this.harpoonsResultPrice}
                                  editHarpoon={this.editHarpoon}
                                  removeHarpoonFromList={this.removeHarpoonFromList}/>
                    <div className="col-sm-12">
                        <button type="button"
                                onClick={this.handleAddHarpoon}
                                className="btn btn-primary btn-sm">Добавить гарпун
                        </button>
                    </div>
                </div>
            );
        }
    }

    /* ------------------------------- */


    getPositionsBlock() {
        let block;
        if (this.state.client) {
            block = (
                <div className="row tables-block">
                    <div className="items col-12">
                        <Items client={this.state.client}
                               stock={this.state.stock || this.defaultStock}
                               addItems={this.addItems}
                               items={this.state.items}
                               itemsResultPrice={this.itemsResultPrice}
                               returnChecked={this.state.returnChecked}
                               dialogWindowState={this.dialogWindowState}/>
                    </div>
                    {this.getHarpoonList()}
                    <CustomPositions customPositions={this.state.custom_positions}
                                     update={this.updateCustomPositions}/>
                    {this.getResultPrices()}
                </div>
            );
        } else {
            block = null;
        }

        return block;
    }

    getCustomPositionsResultPrice() {
        let resultPrice = 0;
        if (this.state.custom_positions) {
            for (const position of this.state.custom_positions) {
                resultPrice += position.price * position.count;
            }
        }
        return resultPrice
    }


    getResultPrices() {
        return (
            <ResultPrices harpoonsResultPrice={this.harpoonsResultPrice}
                          itemsPrepayment={this.itemsPrepayment}
                          customPositionsResultPrice={this.getCustomPositionsResultPrice()}
                          itemsResultPrice={this.itemsResultPrice}/>
        )
    }

    returnCheckBoxChangeHandler = () => {
        this.setState({
            returnChecked: !this.state.returnChecked
        });
    };

    getReturnLabel() {
        if (this.state.returnChecked) {
            return (
                <h5 className="return-label">ВОЗВРАТ!</h5>
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
            <div>
                <div className="row order-head">
                    <div className="col-12 col-md-6">
                        <table className="table table-hover table-bordered">
                            <tbody>

                            <AddClient addClient={this.addClient}
                                       dialogWindowState={this.dialogWindowState}
                                       client={this.state.client}/>
                            <StocksSelect stocks={stocks}
                                          stock={this.state.stock}
                                          addStock={this.addStock}/>
                            </tbody>
                        </table>
                    </div>
                    <div className="col-12 col-md-6">
                        <label>Дата выдачи</label>
                        <DatePickerInput selectDate={this.addDate}
                                         defaultDate={this.state.date}/>
                        <input type="checkbox"
                               checked={this.state.returnChecked}
                               className="check-input"
                               onChange={this.returnCheckBoxChangeHandler}/>
                        <label className="check-label">Возврат</label>
                    </div>

                </div>
                <div className="row">
                    <div className="col-12 col-mb-6">
                        <CommentField comment={this.comment}
                                      commentName={'заказу'}
                                      addComment={this.addComment}/>
                    </div>
                </div>
                {this.getReturnLabel()}
                {this.getPositionsBlock()}
                <div className="row">
                    <div className="col-sm-12">
                        <button type="submit"
                                onClick={this.handleSubmit}
                                disabled={this.checkForm()}
                                className="btn btn-primary btn-lg btn-block">{this.btnText}
                        </button>
                    </div>
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
}), {saveOrderInfoInStore, saveHarpoon, deleteItemsFromStore})(OrderCreate);